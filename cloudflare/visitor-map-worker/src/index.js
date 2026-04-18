const GRAPHQL_ENDPOINT = "https://api.cloudflare.com/client/v4/graphql";

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

      const dataset = await fetchVisitorDataset(env);

      if (url.pathname === "/embed") {
        return new Response(renderEmbedHtml(dataset, request.url), {
          headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "public, max-age=900",
          },
        });
      }

      return jsonResponse({
        embed_url: new URL("/embed", url.origin).toString(),
        description: `Showing the last ${dataset.range_days} days of Cloudflare visitor geography.`,
        ...dataset,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return jsonResponse(
        {
          error: error.message || "Unexpected Worker error.",
        },
        status,
      );
    }
  },
};


async function fetchVisitorDataset(env) {
  assertEnv(env);

  // 免费版 AdaptiveGroups 限制为 1w1d，锁定为 7 天以保证稳定
  const days = clampNumber(env.VISITOR_MAP_DAYS, 7, 1, 7);
  const limit = clampNumber(env.VISITOR_MAP_LIMIT, 8, 3, 12);
  const now = new Date();
  
  const tasks = [];
  for (let i = 0; i < days; i++) {
    const start = new Date(now.getTime() - (i + 1) * 24 * 60 * 60 * 1000).toISOString();
    const end = new Date(now.getTime() - i * 24 * 60 * 60 * 1000).toISOString();
    tasks.push(fetchOneDayUV(env, start, end));
  }

  const results = await Promise.all(tasks);
  const totals = new Map();

  results.flat().forEach(row => {
    if (!row) return;
    const country = row.dimensions.clientCountryName || "Unknown";
    // Check both potential field names to be safe across GraphQL dataset versions
    const count = Number(row.count || 0);
    totals.set(country, (totals.get(country) || 0) + count);
  });

  const countries = Array.from(totals.entries())
    .map(([name, count]) => ({
      name: name,
      requests: count,
      visits: count
    }))
    .filter(c => c.requests > 0 && c.name !== "Unknown")
    .sort((a, b) => b.requests - a.requests)
    .slice(0, limit);

  const totalRequests = countries.reduce((sum, r) => sum + r.requests, 0);

  const enrichedCountries = countries.map((country, index) => ({
    ...country,
    share: totalRequests ? Number(((country.requests / totalRequests) * 100).toFixed(1)) : 0,
    marker: markerForIndex(index),
  }));

  return {
    generated_at: now.toISOString(),
    range_days: days,
    total_requests: totalRequests,
    total_visits: totalRequests,
    countries: enrichedCountries,
  };
}

async function fetchOneDayUV(env, start, end) {
  const query = `
    query GetUV($tag: String, $s: String, $e: String) {
      viewer {
        zones(filter: { zoneTag: $tag }) {
          httpRequestsAdaptiveGroups(
            limit: 100
            filter: { 
              datetime_geq: $s, 
              datetime_lt: $e
            }
          ) {
            count
            dimensions { clientCountryName }
          }
        }
      }
    }
  `;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.CF_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        tag: env.CF_ZONE_TAG,
        s: start,
        e: end
      }
    }),
  });

  const payload = await response.json();
  if (payload.errors) throw createError("GraphQL UV API Error: " + JSON.stringify(payload.errors), 500);
  
  return payload?.data?.viewer?.zones?.[0]?.httpRequestsAdaptiveGroups || [];
}

function renderEmbedHtml(dataset, requestUrl) {
  const escape = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const requestOrigin = new URL(requestUrl).origin;
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

  const markers = dataset.countries
    .map(
      (country) => `
        <div class="marker" style="left:${country.marker.left};top:${country.marker.top};">
          <span class="marker-dot"></span>
          <span class="marker-label">${escape(shortCountryLabel(country.name))}</span>
        </div>
      `,
    )
    .join("");

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
      min-height: 100vh;
      font-family: "Georgia", "Source Serif 4", serif;
      color: var(--ink);
      background:
        radial-gradient(circle at 20% 15%, rgba(196, 30, 58, 0.12), transparent 22%),
        radial-gradient(circle at 85% 70%, rgba(0, 0, 0, 0.08), transparent 18%),
        linear-gradient(135deg, #fcfbf8, var(--bg));
    }
    .wrap {
      min-height: 100vh;
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
      position: relative;
      overflow: hidden;
      padding: 18px;
      min-height: 220px;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(243, 236, 229, 0.94)),
        repeating-linear-gradient(90deg, rgba(26, 26, 26, 0.04) 0, rgba(26, 26, 26, 0.04) 1px, transparent 1px, transparent 54px),
        repeating-linear-gradient(0deg, rgba(26, 26, 26, 0.04) 0, rgba(26, 26, 26, 0.04) 1px, transparent 1px, transparent 42px);
    }
    .map-title {
      position: relative;
      z-index: 2;
      margin: 0 0 6px;
      font-size: 1rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--accent);
    }
    .map-subtitle {
      position: relative;
      z-index: 2;
      margin: 0;
      max-width: 34ch;
      color: var(--muted);
      font-size: 0.92rem;
      line-height: 1.55;
    }
    .orbital {
      position: absolute;
      inset: 18% 10% 16% 10%;
      border-radius: 999px;
      border: 1px solid rgba(26, 26, 26, 0.08);
      background:
        radial-gradient(circle at center, rgba(196, 30, 58, 0.08), transparent 48%),
        radial-gradient(circle at 50% 52%, rgba(0, 0, 0, 0.06) 0 20%, transparent 21%);
    }
    .orbital::before,
    .orbital::after {
      content: "";
      position: absolute;
      inset: 12%;
      border-radius: 999px;
      border: 1px dashed rgba(26, 26, 26, 0.08);
    }
    .orbital::after {
      inset: 26%;
    }
    .marker {
      position: absolute;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 8px;
      transform: translate(-50%, -50%);
    }
    .marker-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 0 7px rgba(196, 30, 58, 0.12);
    }
    .marker-label {
      padding: 4px 8px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(26, 26, 26, 0.08);
      font-size: 0.72rem;
      letter-spacing: 0.08em;
    }
    .meta-panel {
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
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
    @media (max-width: 720px) {
      .wrap {
        grid-template-columns: 1fr;
      }
      .stats {
        grid-template-columns: 1fr 1fr;
      }
      .stat:last-child {
        grid-column: span 2;
      }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <section class="panel map-panel">
      <p class="map-title">Visitor Map</p>
      <p class="map-subtitle">Top countries based on Cloudflare eyeball traffic for the last ${escape(dataset.range_days)} days.</p>
      <div class="orbital" aria-hidden="true"></div>
      ${markers}
    </section>
    <section class="panel meta-panel">
      <div class="stats">
        <div class="stat">
          <span class="stat-label">Requests</span>
          <span class="stat-value">${escape(dataset.total_requests.toLocaleString("en-US"))}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Visits</span>
          <span class="stat-value">${escape(dataset.total_visits.toLocaleString("en-US"))}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Window</span>
          <span class="stat-value">${escape(String(dataset.range_days))} days</span>
        </div>
      </div>
      <ol class="country-list">${countries || '<li class="country-row"><span class="country-name">No visitor data yet.</span></li>'}</ol>
      <div class="footer">
        Generated ${escape(formatDate(dataset.generated_at))} via Cloudflare GraphQL Analytics API.
        <br>
        Served from <a href="${escape(requestOrigin)}" target="_blank" rel="noopener noreferrer">${escape(requestOrigin)}</a>.
      </div>
    </section>
  </div>
</body>
</html>`;
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
      "cache-control": status >= 400 ? "no-store" : "public, max-age=900",
      ...buildCorsHeaders(),
    },
  });
}

function assertEnv(env) {
  if (!env.CF_API_TOKEN) {
    throw createError("Missing CF_API_TOKEN secret.", 500);
  }

  if (!env.CF_ZONE_TAG) {
    throw createError("Missing CF_ZONE_TAG variable.", 500);
  }
}

function clampNumber(value, fallback, min, max) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
}

function markerForIndex(index) {
  const markers = [
    { left: "18%", top: "58%" },
    { left: "33%", top: "38%" },
    { left: "48%", top: "52%" },
    { left: "58%", top: "34%" },
    { left: "72%", top: "46%" },
    { left: "80%", top: "63%" },
    { left: "43%", top: "72%" },
    { left: "25%", top: "28%" },
    { left: "66%", top: "68%" },
    { left: "86%", top: "30%" },
    { left: "52%", top: "22%" },
    { left: "12%", top: "40%" },
  ];

  return markers[index % markers.length];
}

function formatDate(iso) {
  const date = new Date(iso);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });
}

function shortCountryLabel(name) {
  const normalized = String(name || "Unknown").trim();
  if (!normalized) return "Unknown";

  const compact = normalized
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

  if (compact) return compact;
  return normalized.slice(0, 8);
}

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}
