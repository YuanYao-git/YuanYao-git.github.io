const GRAPHQL_ENDPOINT = "https://api.cloudflare.com/client/v4/graphql";
const KV_KEY = "visitor_map_cache";

const ISO_TO_NAME = {
  US:"United States",CN:"China",HK:"China",MO:"China",DE:"Germany",NO:"Norway",
  CA:"Canada",FR:"France",NL:"Netherlands",IN:"India",SG:"Singapore",
  JP:"Japan",GB:"United Kingdom",RU:"Russia",KR:"South Korea",CH:"Switzerland",
  IT:"Italy",AU:"Australia",BR:"Brazil",ES:"Spain",TW:"Taiwan",SE:"Sweden",
  PL:"Poland",PT:"Portugal",MX:"Mexico",ID:"Indonesia",TH:"Thailand",
  VN:"Vietnam",PH:"Philippines",MY:"Malaysia",TR:"Turkey",EG:"Egypt",
  ZA:"South Africa",AR:"Argentina",CL:"Chile",CO:"Colombia",UA:"Ukraine",
  RO:"Romania",CZ:"Czech Republic",AT:"Austria",BE:"Belgium",DK:"Denmark",
  FI:"Finland",IE:"Ireland",NZ:"New Zealand",IL:"Israel",SA:"Saudi Arabia",
  AE:"United Arab Emirates",PK:"Pakistan",BD:"Bangladesh",NG:"Nigeria",KE:"Kenya",
};

// [longitude, latitude] — ECharts geo coordinate order
const COUNTRY_COORDS = {
  "United States":          [-95.71, 37.09],
  "China":                  [104.19, 35.86],
  "Germany":                [10.45,  51.16],
  "Norway":                 [8.47,   60.47],
  "Canada":                 [-106.35,56.13],
  "France":                 [2.21,   46.23],
  "Netherlands":            [5.29,   52.13],
  "India":                  [78.96,  20.59],
  "Singapore":              [103.82,  1.35],
  "Japan":                  [138.25, 36.20],
  "United Kingdom":         [-3.44,  55.38],
  "Russia":                 [105.32, 61.52],
  "South Korea":            [127.77, 35.91],
  "Switzerland":            [8.23,   46.82],
  "Italy":                  [12.57,  41.87],
  "Australia":              [133.78,-25.27],
  "Brazil":                 [-51.93,-14.24],
  "Spain":                  [-3.75,  40.46],
  "Taiwan":                 [120.96, 23.70],
  "Sweden":                 [18.64,  60.13],
  "Poland":                 [19.15,  51.92],
  "Portugal":               [-8.22,  39.40],
  "Mexico":                 [-102.55,23.63],
  "Indonesia":              [113.92, -0.79],
  "Thailand":               [100.99, 15.87],
  "Vietnam":                [108.28, 14.06],
  "Philippines":            [121.77, 12.88],
  "Malaysia":               [108.03,  4.21],
  "Turkey":                 [35.24,  38.96],
  "Egypt":                  [30.80,  26.82],
  "South Africa":           [22.94, -30.56],
  "Argentina":              [-63.62,-38.42],
  "Chile":                  [-71.54,-35.68],
  "Colombia":               [-74.30,  4.57],
  "Ukraine":                [31.17,  48.38],
  "Romania":                [24.97,  45.94],
  "Czech Republic":         [15.47,  49.82],
  "Austria":                [14.55,  47.52],
  "Belgium":                [4.47,   50.50],
  "Denmark":                [9.50,   56.26],
  "Finland":                [25.75,  61.92],
  "Ireland":                [-8.24,  53.41],
  "New Zealand":            [174.89,-40.90],
  "Israel":                 [34.85,  31.05],
  "Saudi Arabia":           [45.08,  23.89],
  "United Arab Emirates":   [53.85,  23.42],
  "Pakistan":               [69.35,  30.38],
  "Bangladesh":             [90.36,  23.68],
  "Nigeria":                [8.68,    9.08],
  "Kenya":                  [37.91,  -0.02],
};

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);

      if (request.method === "OPTIONS") {
        return new Response(null, { headers: buildCorsHeaders() });
      }

      if (url.pathname === "/healthz") {
        return jsonResponse({ ok: true }, 200);
      }

      if (url.pathname === "/geo") {
        return proxyWorldGeo();
      }

      if (url.pathname === "/refresh") {
        const dataset = await refreshCache(env);
        return jsonResponse({ ok: true, generated_at: dataset.generated_at, total_uniques: dataset.total_uniques });
      }

      const dataset = await getDataset(env);

      if (url.pathname === "/embed") {
        return new Response(renderEmbedHtml(dataset, request.url), {
          headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      }

      return jsonResponse({
        embed_url: new URL("/embed", url.origin).toString(),
        description: `Showing the last ${dataset.range_days} days of Cloudflare unique visitor geography.`,
        ...dataset,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return jsonResponse({ error: error.message || "Unexpected Worker error." }, status);
    }
  },

  // Cron Trigger: runs daily at 02:00 UTC, refreshes KV cache
  async scheduled(event, env, ctx) {
    ctx.waitUntil(refreshCache(env));
  },
};

// Read from KV; fall back to live GraphQL if cache is cold
async function getDataset(env) {
  if (env.VISITOR_CACHE) {
    const cached = await env.VISITOR_CACHE.get(KV_KEY, "json");
    if (cached) return cached;
  }
  return fetchAndCache(env);
}

// Fetch from GraphQL and write result to KV
async function refreshCache(env) {
  const dataset = await fetchVisitorDataset(env);
  if (env.VISITOR_CACHE) {
    await env.VISITOR_CACHE.put(KV_KEY, JSON.stringify(dataset), {
      expirationTtl: 90000, // ~25 hours safety margin
    });
  }
  return dataset;
}

async function fetchAndCache(env) {
  const dataset = await fetchVisitorDataset(env);
  if (env.VISITOR_CACHE) {
    // fire-and-forget: don't block the response
    env.VISITOR_CACHE.put(KV_KEY, JSON.stringify(dataset), {
      expirationTtl: 90000,
    }).catch(() => {});
  }
  return dataset;
}

async function fetchVisitorDataset(env) {
  assertEnv(env);

  const days = clampNumber(env.VISITOR_MAP_DAYS, 7, 1, 7);
  const limit = clampNumber(env.VISITOR_MAP_LIMIT, 8, 3, 12);
  const now = new Date();
  const datetimeStart = new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();

  // date string for httpRequests1dGroups (YYYY-MM-DD)
  const dateStart = datetimeStart.slice(0, 10);

  // httpRequestsAdaptiveGroups free plan: max 1d per query → fetch day-by-day in parallel
  const dayTasks = [];
  for (let i = 0; i < days; i++) {
    const s = new Date(now.getTime() - (i + 1) * 24 * 60 * 60 * 1000).toISOString();
    const e = new Date(now.getTime() - i * 24 * 60 * 60 * 1000).toISOString();
    dayTasks.push(fetchCountryRequests(env, s, e));
  }

  const [dailyResults, totalUniqIp] = await Promise.all([
    Promise.all(dayTasks),
    fetchTotalUniqIp(env, dateStart),
  ]);

  const totals = new Map();
  dailyResults.flat().forEach(row => {
    if (!row) return;
    const iso = row.dimensions.clientCountryName || "Unknown";
    const country = ISO_TO_NAME[iso] || iso;
    const count = Number(row.count || 0);
    totals.set(country, (totals.get(country) || 0) + count);
  });

  const allSorted = Array.from(totals.entries())
    .map(([name, count]) => ({ name, requests: count }))
    .filter(c => c.requests > 0 && c.name !== "Unknown")
    .sort((a, b) => b.requests - a.requests);

  const topCountries = allSorted.slice(0, limit);
  const totalRequests = topCountries.reduce((sum, r) => sum + r.requests, 0);

  const enrichedCountries = topCountries.map((country) => ({
    ...country,
    share: totalRequests ? Number(((country.requests / totalRequests) * 100).toFixed(1)) : 0,
  }));

  // map_countries: all countries that have known coordinates, not capped by limit
  const mapCountries = allSorted
    .filter(c => Object.prototype.hasOwnProperty.call(COUNTRY_COORDS, c.name))
    .map(c => ({ name: c.name, requests: c.requests }));

  return {
    generated_at: now.toISOString(),
    range_days: days,
    total_uniques: totalUniqIp,
    total_requests: totalRequests,
    countries: enrichedCountries,
    map_countries: mapCountries,
  };
}

// Country distribution by request count (httpRequestsAdaptiveGroups supports count, not uniqIp)
async function fetchCountryRequests(env, start, end) {
  const host = env.CF_HOST_FILTER || null;

  const query = `
    query GetCountryMap($tag: String, $s: String, $e: String${host ? ', $host: String' : ''}) {
      viewer {
        zones(filter: { zoneTag: $tag }) {
          httpRequestsAdaptiveGroups(
            limit: 100
            filter: { datetime_geq: $s, datetime_lt: $e${host ? ', clientRequestHTTPHost: $host' : ''} }
          ) {
            count
            dimensions { clientCountryName }
          }
        }
      }
    }
  `;

  const vars = { tag: env.CF_ZONE_TAG, s: start, e: end };
  if (host) vars.host = host;
  const payload = await graphql(env, query, vars);
  return payload?.data?.viewer?.zones?.[0]?.httpRequestsAdaptiveGroups || [];
}

// True unique IP count — httpRequests1dGroups supports uniq { uniques } across wider time ranges
async function fetchTotalUniqIp(env, dateStart) {
  const query = `
    query GetUniqIp($tag: String, $since: Date) {
      viewer {
        zones(filter: { zoneTag: $tag }) {
          httpRequests1dGroups(
            limit: 7
            filter: { date_geq: $since }
          ) {
            uniq { uniques }
          }
        }
      }
    }
  `;

  const payload = await graphql(env, query, { tag: env.CF_ZONE_TAG, since: dateStart });
  const groups = payload?.data?.viewer?.zones?.[0]?.httpRequests1dGroups || [];
  return groups.reduce((sum, g) => sum + Number(g.uniq?.uniques || 0), 0);
}

async function graphql(env, query, variables) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.CF_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const payload = await response.json();
  if (payload.errors) throw createError("GraphQL error: " + JSON.stringify(payload.errors), 500);
  return payload;
}

function renderEmbedHtml(dataset, requestUrl) {
  const escape = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const countries = dataset.countries
    .map(
      (country, index) => `
        <li class="country-row">
          <span class="country-rank">${index + 1}</span>
          <span class="country-name">${escape(country.name)}</span>
          <span class="country-metric">${escape(country.requests.toLocaleString("en-US"))} req</span>
          <span class="country-bar"><span style="width:${Math.max(country.share, 8)}%"></span></span>
        </li>
      `,
    )
    .join("");

  // Serialize chart data for inline script — escape </script> to prevent injection
  const safeJson = (obj) => JSON.stringify(obj).replace(/<\/script>/gi, "<\\/script>");
  // map_countries: all countries with known coords (not capped by list limit)
  const chartDataJson = safeJson(dataset.map_countries || dataset.countries.map(c => ({ name: c.name, requests: c.requests })));
  const coordsJson = safeJson(COUNTRY_COORDS);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Visitor Map</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f6f1ec;
      --panel: rgba(255, 255, 255, 0.86);
      --ink: #1a1a1a;
      --muted: #6a6762;
      --accent: #c41e3a;
      --line: rgba(26, 26, 26, 0.08);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Georgia", "Source Serif 4", serif;
      color: var(--ink);
      background:
        radial-gradient(circle at 20% 15%, rgba(196, 30, 58, 0.12), transparent 22%),
        radial-gradient(circle at 85% 70%, rgba(0, 0, 0, 0.08), transparent 18%),
        linear-gradient(135deg, #fcfbf8, var(--bg));
    }
    .wrap {
      min-height: 500px;
      padding: 18px;
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 16px;
    }
    .panel {
      border: 1px solid var(--line);
      border-radius: 18px;
      background: var(--panel);
      backdrop-filter: blur(12px);
      box-shadow: 0 18px 50px rgba(22, 23, 26, 0.08);
    }
    .map-panel {
      overflow: hidden;
      padding: 18px 18px 10px;
      display: flex;
      flex-direction: column;
      min-height: 320px;
    }
    .map-title {
      margin: 0 0 4px;
      font-size: 1rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--accent);
      flex-shrink: 0;
    }
    .map-subtitle {
      margin: 0 0 10px;
      color: var(--muted);
      font-size: 0.88rem;
      line-height: 1.5;
      flex-shrink: 0;
    }
    #chart {
      flex: 1;
      min-height: 260px;
      width: 100%;
      background:
        radial-gradient(circle, rgba(26,26,26,0.06) 1px, transparent 1px);
      background-size: 20px 20px;
    }
    .meta-panel {
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .stat {
      padding: 12px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.62);
      border: 1px solid rgba(26, 26, 26, 0.06);
    }
    .stat-label {
      display: block;
      font-size: 0.72rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 8px;
    }
    .stat-value {
      font-size: 1.15rem;
      font-weight: 700;
    }
    .country-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .country-row {
      display: grid;
      grid-template-columns: 24px minmax(0, 1fr) auto;
      gap: 10px;
      align-items: center;
      font-size: 0.9rem;
    }
    .country-rank { color: var(--muted); }
    .country-name {
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .country-metric {
      color: var(--muted);
      font-variant-numeric: tabular-nums;
    }
    .country-bar {
      grid-column: 2 / span 2;
      height: 7px;
      overflow: hidden;
      border-radius: 999px;
      background: rgba(26, 26, 26, 0.08);
    }
    .country-bar span {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, #d34b62, var(--accent));
    }
    .footer {
      color: var(--muted);
      font-size: 0.74rem;
      line-height: 1.5;
    }
    .footer a { color: inherit; }
    .data-note {
      font-size: 0.7rem;
      color: var(--muted);
      opacity: 0.75;
      margin-top: 4px;
    }
    @media (max-width: 720px) {
      .wrap { grid-template-columns: 1fr; }
      .stats { grid-template-columns: 1fr 1fr; }
      #chart { min-height: 280px; }
      .map-panel { min-height: 360px; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <section class="panel map-panel">
      <p class="map-title">Visitor Map</p>
      <p class="map-subtitle">Unique visitors by country · last ${escape(String(dataset.range_days))} days · via Cloudflare Analytics.</p>
      <div id="chart"></div>
    </section>
    <section class="panel meta-panel">
      <div class="stats">
        <div class="stat">
          <span class="stat-label">Unique Visitors</span>
          <span class="stat-value">${escape(dataset.total_uniques.toLocaleString("en-US"))}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Window</span>
          <span class="stat-value">${escape(String(dataset.range_days))} days</span>
        </div>
      </div>
      <ol class="country-list">${countries || '<li class="country-row"><span class="country-name">No visitor data yet.</span></li>'}</ol>
      <div class="footer">
        Updated ${escape(formatDate(dataset.generated_at))} · cached via Cloudflare KV.
        <p class="data-note">数据含背景噪声，预计真实学术访客约为 10%–15%</p>
      </div>
    </section>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/echarts@5.6.0/dist/echarts.min.js"></script>
  <script>
    const COORDS = ${coordsJson};
    const CHART_DATA = ${chartDataJson};

    (async () => {
      const el = document.getElementById('chart');
      try {
        const chart = echarts.init(el, null, { renderer: 'canvas' });
        chart.showLoading({
          text: 'Loading map…',
          color: '#c41e3a',
          textColor: '#6a6762',
          maskColor: 'rgba(252,251,248,0)',
          fontSize: 12,
          zlevel: 0,
        });

        const geoUrl = new URL('/geo', location.origin).toString();
        const worldGeo = await fetch(geoUrl).then(r => r.ok ? r.json() : Promise.reject())
          .catch(() => fetch('https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/json/world.json').then(r => r.json()));
        echarts.registerMap('world', worldGeo);
        chart.hideLoading();

        const scatterData = CHART_DATA
          .map(c => {
            const coord = COORDS[c.name];
            return coord ? { name: c.name, value: [coord[0], coord[1], c.requests] } : null;
          })
          .filter(Boolean);

        chart.setOption({
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'item',
            formatter: p => p.name + ': ' + Number(p.value[2]).toLocaleString('en-US') + ' req'
          },
          geo: {
            map: 'world',
            roam: false,
            silent: true,
            itemStyle: {
              areaColor: '#f0ebe5',
              borderColor: '#c8c0b8',
              borderWidth: 0.5
            },
            emphasis: { disabled: true },
            select:   { disabled: true }
          },
          series: [{
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: scatterData,
            symbolSize: function(val) {
              // rank-based: top country gets 20px, last gets 10px
              const max = scatterData[0] ? scatterData[0].value[2] : 1;
              return Math.round(10 + (val[2] / max) * 10);
            },
            showEffectOn: 'render',
            rippleEffect: { brushType: 'stroke', scale: 3, period: 3 },
            label: {
              formatter: '{b}',
              position: 'right',
              show: true,
              fontSize: 11,
              fontFamily: 'Georgia, serif',
              color: '#1a1a1a',
              textBorderColor: 'rgba(255,255,255,0.85)',
              textBorderWidth: 2
            },
            itemStyle: {
              color: '#c41e3a',
              shadowBlur: 10,
              shadowColor: 'rgba(196,30,58,0.5)'
            },
            zlevel: 2
          }]
        });

        window.addEventListener('resize', () => chart.resize());
      } catch (_) {
        el.style.background = 'none';
        el.innerHTML = '<p style="color:#6a6762;font-size:0.8rem;padding:20px;text-align:center">Map unavailable — please refresh</p>';
      }
    })();
  </script>
</body>
</html>`;
}

// Proxy world.json through Cloudflare edge — avoids third-party CDN blocks
async function proxyWorldGeo() {
  const upstream = await fetch(
    "https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/json/world.json",
    { cf: { cacheTtl: 86400, cacheEverything: true } }
  );
  if (!upstream.ok) throw createError("Failed to fetch world geo", 502);
  const body = await upstream.text();
  return new Response(body, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=86400",
      ...buildCorsHeaders(),
    },
  });
}

function buildCorsHeaders() {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,OPTIONS",
    "access-control-allow-headers": "content-type",
  };
}

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-cache",
      ...buildCorsHeaders(),
    },
  });
}

function assertEnv(env) {
  if (!env.CF_API_TOKEN) throw createError("Missing CF_API_TOKEN secret.", 500);
  if (!env.CF_ZONE_TAG) throw createError("Missing CF_ZONE_TAG variable.", 500);
}

function clampNumber(value, fallback, min, max) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
}

function formatDate(iso) {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
    timeZone: "UTC", timeZoneName: "short",
  });
}

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}
