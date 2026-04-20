/**
 * Visitor map — AntV L7 + Gaode basemap (bundled from this file).
 * Build: npm run build:visitor-map
 */
import { Scene, PolygonLayer, PointLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';

// Capital city coordinates (not country centroids)
var COORDS = {
  'United States': [-77.04, 38.91],   // Washington D.C.
  China: [116.39, 39.91],             // Beijing
  Germany: [13.41, 52.52],            // Berlin
  Norway: [10.75, 59.91],             // Oslo
  Canada: [-75.70, 45.42],            // Ottawa
  France: [2.35, 48.86],              // Paris
  Netherlands: [4.90, 52.37],         // Amsterdam
  India: [77.21, 28.63],              // New Delhi
  Singapore: [103.82, 1.35],          // Singapore (city-state)
  Japan: [139.69, 35.69],             // Tokyo
  'United Kingdom': [-0.13, 51.51],   // London
  Russia: [37.62, 55.75],             // Moscow
  'South Korea': [126.98, 37.57],     // Seoul
  Switzerland: [7.45, 46.95],         // Bern
  Italy: [12.50, 41.90],              // Rome
  Australia: [149.13, -35.28],        // Canberra
  Brazil: [-47.93, -15.78],           // Brasília
  Spain: [-3.70, 40.42],              // Madrid
  Sweden: [18.07, 59.33],             // Stockholm
  Poland: [21.02, 52.23],             // Warsaw
  Portugal: [-9.14, 38.72],           // Lisbon
  Mexico: [-99.13, 19.43],            // Mexico City
  Indonesia: [106.85, -6.21],         // Jakarta
  Thailand: [100.52, 13.75],          // Bangkok
  Vietnam: [105.85, 21.03],           // Hanoi
  Philippines: [120.98, 14.60],       // Manila
  Malaysia: [101.69, 3.14],           // Kuala Lumpur
  Turkey: [32.86, 39.93],             // Ankara
  Egypt: [31.25, 30.06],              // Cairo
  'South Africa': [28.19, -25.75],    // Pretoria
  Argentina: [-58.40, -34.61],        // Buenos Aires
  Chile: [-70.67, -33.45],            // Santiago
  Colombia: [-74.08, 4.71],           // Bogotá
  Ukraine: [30.52, 50.45],            // Kyiv
  Romania: [26.10, 44.44],            // Bucharest
  'Czech Republic': [14.42, 50.09],   // Prague
  Austria: [16.37, 48.21],            // Vienna
  Belgium: [4.35, 50.85],             // Brussels
  Denmark: [12.57, 55.68],            // Copenhagen
  Finland: [24.94, 60.17],            // Helsinki
  Ireland: [-6.27, 53.33],            // Dublin
  'New Zealand': [174.78, -41.29],    // Wellington
  Israel: [35.22, 31.77],             // Jerusalem
  'Saudi Arabia': [46.72, 24.69],     // Riyadh
  'United Arab Emirates': [54.37, 24.47], // Abu Dhabi
  Pakistan: [73.04, 33.72],           // Islamabad
  Bangladesh: [90.41, 23.81],         // Dhaka
  Nigeria: [7.49, 9.07],              // Abuja
  Kenya: [36.82, -1.29],              // Nairobi
};

var zhDict = {
  Afghanistan: '阿富汗',
  Angola: '安哥拉',
  Albania: '阿尔巴尼亚',
  'United Arab Emirates': '阿联酋',
  Argentina: '阿根廷',
  Armenia: '亚美尼亚',
  Australia: '澳大利亚',
  Austria: '奥地利',
  Azerbaijan: '阿塞拜疆',
  Burundi: '布隆迪',
  Belgium: '比利时',
  Benin: '贝宁',
  'Burkina Faso': '布基纳法索',
  Bangladesh: '孟加拉国',
  Bulgaria: '保加利亚',
  'The Bahamas': '巴哈马',
  'Bosnia and Herz.': '波黑',
  Belarus: '白俄罗斯',
  Belize: '伯利兹',
  Bolivia: '玻利维亚',
  Brazil: '巴西',
  Brunei: '文莱',
  Bhutan: '不丹',
  Botswana: '博茨瓦纳',
  'Central African Rep.': '中非',
  Canada: '加拿大',
  Switzerland: '瑞士',
  Chile: '智利',
  China: '中国',
  'Ivory Coast': '科特迪瓦',
  Cameroon: '喀麦隆',
  'Dem. Rep. Congo': '刚果(金)',
  Congo: '刚果(布)',
  Colombia: '哥伦比亚',
  'Costa Rica': '哥斯达黎加',
  Cuba: '古巴',
  Cyprus: '塞浦路斯',
  'Czech Rep.': '捷克',
  Germany: '德国',
  Djibouti: '吉布提',
  Denmark: '丹麦',
  'Dominican Rep.': '多米尼加',
  Algeria: '阿尔及利亚',
  Ecuador: '厄瓜多尔',
  Egypt: '埃及',
  Spain: '西班牙',
  Estonia: '爱沙尼亚',
  Ethiopia: '埃塞俄比亚',
  Finland: '芬兰',
  France: '法国',
  Gabon: '加蓬',
  'United Kingdom': '英国',
  Georgia: '格鲁吉亚',
  Ghana: '加纳',
  Guinea: '几内亚',
  Greece: '希腊',
  Greenland: '格陵兰',
  Guatemala: '危地马拉',
  Guyana: '圭亚那',
  Honduras: '洪都拉斯',
  Croatia: '克罗地亚',
  Haiti: '海地',
  Hungary: '匈牙利',
  Indonesia: '印度尼西亚',
  India: '印度',
  Ireland: '爱尔兰',
  Iran: '伊朗',
  Iraq: '伊拉克',
  Iceland: '冰岛',
  Israel: '以色列',
  Italy: '意大利',
  Japan: '日本',
  Jordan: '约旦',
  Kazakhstan: '哈萨克斯坦',
  Kenya: '肯尼亚',
  Cambodia: '柬埔寨',
  Korea: '韩国',
  'South Korea': '韩国',
  Kuwait: '科威特',
  Laos: '老挝',
  Lebanon: '黎巴嫩',
  Libya: '利比亚',
  'Sri Lanka': '斯里兰卡',
  Lithuania: '立陶宛',
  Luxembourg: '卢森堡',
  Latvia: '拉脱维亚',
  Morocco: '摩洛哥',
  Moldova: '摩尔多瓦',
  Madagascar: '马达加斯加',
  Mexico: '墨西哥',
  Myanmar: '缅甸',
  Montenegro: '黑山',
  Mongolia: '蒙古',
  Mozambique: '莫桑比克',
  Mauritania: '毛里塔尼亚',
  Malawi: '马拉维',
  Malaysia: '马来西亚',
  Namibia: '纳米比亚',
  Niger: '尼日尔',
  Nigeria: '尼日利亚',
  Nicaragua: '尼加拉瓜',
  Netherlands: '荷兰',
  Norway: '挪威',
  Nepal: '尼泊尔',
  'New Zealand': '新西兰',
  Oman: '阿曼',
  Pakistan: '巴基斯坦',
  Panama: '巴拿马',
  Peru: '秘鲁',
  Philippines: '菲律宾',
  Poland: '波兰',
  Portugal: '葡萄牙',
  Paraguay: '巴拉圭',
  Qatar: '卡塔尔',
  Romania: '罗马尼亚',
  Russia: '俄罗斯',
  Rwanda: '卢旺达',
  'Saudi Arabia': '沙特阿拉伯',
  Sudan: '苏丹',
  Senegal: '塞内加尔',
  'Sierra Leone': '塞拉利昂',
  Somalia: '索马里',
  Serbia: '塞尔维亚',
  Slovakia: '斯洛伐克',
  Slovenia: '斯洛文尼亚',
  Sweden: '瑞典',
  Syria: '叙利亚',
  Singapore: '新加坡',
  'Czech Republic': '捷克',
  Chad: '查德',
  Thailand: '泰国',
  Tajikistan: '塔吉克斯坦',
  Turkmenistan: '土库曼斯坦',
  Tunisia: '突尼斯',
  Turkey: '土耳其',
  Tanzania: '坦桑尼亚',
  Uganda: '乌干达',
  Ukraine: '乌克兰',
  Uruguay: '乌拉圭',
  'United States': '美国',
  Uzbekistan: '乌兹别克斯坦',
  Venezuela: '委内瑞拉',
  Vietnam: '越南',
  Yemen: '也门',
  'South Africa': '南非',
  Zambia: '赞比亚',
  Zimbabwe: '津巴布韦',
};

var activeScene = null;
var activeAmapMarkers = [];

function fetchJson(primaryUrl, fallbackUrl) {
  return fetch(primaryUrl, { cache: 'no-cache' }).then(function (response) {
    if (!response.ok) throw new Error('fetch-failed');
    return response.json();
  }).catch(function () {
    if (!fallbackUrl) throw new Error('fetch-failed');
    return fetch(fallbackUrl, { cache: 'no-cache' }).then(function (response) {
      if (!response.ok) throw new Error('fetch-failed');
      return response.json();
    });
  });
}

function showMessage(el, message) {
  el.innerHTML =
    '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#6a6762;font-size:0.9rem;text-align:center;padding:16px;">' +
    message +
    '</div>';
}

function buildTooltip(el) {
  var tip = document.createElement('div');
  tip.style.cssText = [
    'position:absolute',
    'pointer-events:none',
    'z-index:4',
    'display:none',
    'padding:8px 10px',
    'border-radius:10px',
    'background:rgba(36,34,31,0.92)',
    'color:#f8f5f1',
    'font-size:12px',
    'line-height:1.4',
    'box-shadow:0 10px 28px rgba(0,0,0,0.18)',
    'white-space:nowrap',
  ].join(';');
  el.appendChild(tip);
  return tip;
}

function destroyActiveScene() {
  if (activeAmapMarkers.length) {
    activeAmapMarkers.forEach(function (m) { try { m.setMap ? m.setMap(null) : m.remove(); } catch (e) {} });
    activeAmapMarkers = [];
  }
  if (activeScene) {
    try { activeScene.destroy(); } catch (e) {}
    activeScene = null;
  }
}

/**
 * 高德开放平台「JS API 安全密钥」：须在加载 JS API（含 L7 / amap-jsapi-loader）之前设置。
 * 代理：仅 serviceHost；明文：仅 securityJsCode（二者择一，与官方文档一致，代理优先）。
 * @see https://lbs.amap.com/api/javascript-api-v2/guide/abc/load
 */
function applyAmapSecurityConfig(serviceHost, securityJsCode) {
  var host = (serviceHost || '').trim();
  var code = (securityJsCode || '').trim();
  if (host) {
    window._AMapSecurityConfig = {
      serviceHost: host,
    };
    return;
  }
  if (code) {
    window._AMapSecurityConfig = {
      securityJsCode: code,
    };
  }
}

function createL7Map(el, worldJson, data, lang, token, serviceHost, securityJsCode) {
  applyAmapSecurityConfig(serviceHost, securityJsCode);

  var isZh = lang.indexOf('zh') === 0;
  var statsData = data.stats || data;
  var mapList = statsData.map_countries || statsData.countries || [];
  var totalUniques = statsData.total_uniques || 0;
  var totalRequests = Math.max(1, statsData.total_requests || 0);

  var dots = mapList
    .filter(function (item) {
      return COORDS[item.name];
    })
    .map(function (item) {
      var visitors = totalUniques
        ? Math.max(1, Math.ceil(totalUniques * (item.requests / totalRequests)))
        : item.requests;
      var lon = COORDS[item.name][0];
      var lat = COORDS[item.name][1];
      return {
        name: item.name,
        label: isZh ? zhDict[item.name] || item.name : item.name,
        requests: item.requests,
        visitors: visitors,
        lng: lon,
        lat: lat,
      };
    });

  var maxVisitors = dots.reduce(function (cur, item) {
    return Math.max(cur, item.visitors);
  }, 1);

  dots.forEach(function (d) {
    var t = Math.pow(d.visitors / maxVisitors, 0.6);
    d.size = 5 + t * 14;
    d.glowSize = d.size * 2;
  });

  destroyActiveScene();

  el.innerHTML = '';
  el.style.position = 'relative';

  var mapDiv = document.createElement('div');
  var elH = el.getBoundingClientRect().height || el.offsetHeight || 400;
  mapDiv.style.cssText = 'width:100%;height:' + elH + 'px;';
  el.appendChild(mapDiv);

  if (typeof ResizeObserver !== 'undefined') {
    var ro = new ResizeObserver(function (entries) {
      var h = entries[0].contentRect.height;
      if (h > 0) mapDiv.style.height = h + 'px';
    });
    ro.observe(el);
  }

  var tooltip = buildTooltip(el);

  var scene;
  var loadTimer = window.setTimeout(function () {
    console.warn('[visitor-map] Scene loaded 超时（30s），请用 /amap-smoke-test/ 单独测高德 JS API');
    showMessage(
      el,
      isZh
        ? '地图加载超时。请打开 /amap-smoke-test/ 测试 Key 与安全密钥；并在高德控制台确认：服务平台为「Web端(JS API)」、Referer 含当前域名（本地需加 localhost / 127.0.0.1）。'
        : 'Map timeout. Open /amap-smoke-test/ to test AMap; check console key platform + referer whitelist.'
    );
  }, 30000);

  try {
    scene = new Scene({
      id: mapDiv,
      map: new GaodeMap({
        token: token,
        version: '2.0',
        style: 'light',
        showLabel: false,
        center: [104, 35],
        pitch: 0,
        zoom: 2,
        minZoom: 2,
        maxZoom: 8,
      }),
    });
  } catch (err) {
    window.clearTimeout(loadTimer);
    console.error('[visitor-map] Scene 初始化失败', err);
    showMessage(
      el,
      isZh
        ? '地图初始化失败：' + (err && err.message ? err.message : String(err)) + '（详见控制台）'
        : 'Map init failed: ' + (err && err.message ? err.message : String(err))
    );
    return;
  }

  activeScene = scene;

  scene.on('loaded', function () {
    window.clearTimeout(loadTimer);
    console.log('[visitor-map] Scene loaded');

    var amapMap = scene.mapService && scene.mapService.map;
    if (!amapMap || typeof AMap === 'undefined' || !AMap.Marker) {
      console.warn('[visitor-map] AMap.Marker 不可用');
      return;
    }

    function positionTooltip(px, py) {
      var rect = el.getBoundingClientRect();
      tooltip.style.left = Math.min(rect.width - 200, px + 12) + 'px';
      tooltip.style.top = Math.max(8, py - 52) + 'px';
    }

    var markers = [];

    dots.forEach(function (d) {
      var r = Math.ceil(d.size / 2);
      // Single div: box-shadow provides glow ring; anchor:'center' pins the center to the coordinate
      var content =
        '<div style="' +
          'width:' + (r * 2) + 'px;height:' + (r * 2) + 'px;' +
          'border-radius:50%;' +
          'background:#a85c68;' +
          'opacity:0.92;' +
          'box-shadow:0 0 ' + d.size + 'px ' + d.size + 'px rgba(196,30,58,0.10),' +
                    '0 0 0 1.2px rgba(255,255,255,0.82);' +
          'cursor:pointer;' +
        '"></div>';

      var marker = new AMap.Marker({
        position: [d.lng, d.lat],
        content: content,
        anchor: 'center',
        zIndex: 110,
        bubble: true,
      });

      marker.on('mouseover', function (e) {
        tooltip.innerHTML =
          '<strong>' + d.label + '</strong><br>' +
          (isZh ? '访客数: ' : 'Visitors: ') + Number(d.visitors).toLocaleString('en-US') + '<br>' +
          (isZh ? '请求数: ' : 'Requests: ') + Number(d.requests).toLocaleString('en-US');
        tooltip.style.display = 'block';
        var px = e.pixel || { x: 0, y: 0 };
        positionTooltip(px.x, px.y);
      });

      marker.on('mouseout', function () { tooltip.style.display = 'none'; });

      markers.push(marker);
    });

    amapMap.add(markers);
    activeAmapMarkers = markers;
  });
}

function readGaodeKeyFromMeta() {
  if (typeof document === 'undefined') return '';
  var m = document.querySelector('meta[name="visitor-map-gaode-key"]');
  if (!m || !m.getAttribute('content')) return '';
  return String(m.getAttribute('content')).trim();
}

function readGaodeSecurityFromMeta() {
  if (typeof document === 'undefined') return '';
  var m = document.querySelector('meta[name="visitor-map-gaode-security"]');
  if (!m || !m.getAttribute('content')) return '';
  return String(m.getAttribute('content')).trim();
}

function readGaodeServiceFromMeta() {
  if (typeof document === 'undefined') return '';
  var m = document.querySelector('meta[name="visitor-map-gaode-service-host"]');
  if (!m || !m.getAttribute('content')) return '';
  return String(m.getAttribute('content')).trim();
}

function initVisitorMap(opts) {
  var containerId = opts.containerId || 'v-map-final';
  var lang = opts.lang || 'en';
  var apiEndpoint = (opts.apiEndpoint || 'https://api.yaoyuan.org/').replace(/\/*$/, '');
  var gaodeKey = (opts.gaodeKey || '').trim() || readGaodeKeyFromMeta();
  var gaodeServiceHost =
    (opts.gaodeServiceHost || '').trim() || readGaodeServiceFromMeta();
  var gaodeSecurityKey =
    (opts.gaodeSecurityKey || '').trim() || readGaodeSecurityFromMeta();
  var isZh = lang.indexOf('zh') === 0;
  var el = document.getElementById(containerId);

  if (!el) return;

  if (!gaodeKey) {
    showMessage(
      el,
      isZh
        ? '请在 _config.yml 的 visitor_map.gaode_key 中配置高德地图 Web 端 Key'
        : 'Set visitor_map.gaode_key in _config.yml (Gaode Maps Web API key).'
    );
    return;
  }

  if (!gaodeServiceHost && !gaodeSecurityKey) {
    showMessage(
      el,
      isZh
        ? '请配置高德安全：二选一 — 生产环境填 visitor_map.gaode_service_host（代理 /_AMapService），或开发环境填 visitor_map.gaode_security_key（明文 securityJsCode）'
        : 'Set visitor_map.gaode_service_host (proxy) or visitor_map.gaode_security_key (plaintext per AMap security docs).'
    );
    return;
  }

  applyAmapSecurityConfig(gaodeServiceHost, gaodeSecurityKey);

  showMessage(el, isZh ? '加载地图数据中…' : 'Loading map data…');

  Promise.all([
    fetchJson('/assets/data/world.json', apiEndpoint + '/geo'),
    fetchJson('/assets/data/visitor-map.json', apiEndpoint),
  ])
    .then(function (results) {
      createL7Map(el, results[0], results[1], lang, gaodeKey, gaodeServiceHost, gaodeSecurityKey);
    })
    .catch(function (error) {
      console.error('Visitor map error:', error);
      showMessage(el, isZh ? '地图暂时无法加载，请刷新重试' : 'Map unavailable. Please refresh.');
    });
}

window.initVisitorMap = initVisitorMap;
