/**
 * Shared Visitor Map Module
 * Renders an ECharts world map with Cloudflare visitor data.
 * Usage: initVisitorMap({ containerId, lang, apiEndpoint })
 */
(function () {
  'use strict';

  // [longitude, latitude] for effectScatter — covers all countries in the Worker's ISO_TO_NAME
  var COORDS = {
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

  // GeoJSON name → Chinese display name (tooltip only)
  var zhDict = {
    'Afghanistan':'阿富汗','Angola':'安哥拉','Albania':'阿尔巴尼亚','United Arab Emirates':'阿联酋','Argentina':'阿根廷','Armenia':'亚美尼亚','Australia':'澳大利亚','Austria':'奥地利','Azerbaijan':'阿塞拜疆','Burundi':'布隆迪','Belgium':'比利时','Benin':'贝宁','Burkina Faso':'布基纳法索','Bangladesh':'孟加拉国','Bulgaria':'保加利亚','The Bahamas':'巴哈马','Bosnia and Herz.':'波黑','Belarus':'白俄罗斯','Belize':'伯利兹','Bolivia':'玻利维亚','Brazil':'巴西','Brunei':'文莱','Bhutan':'不丹','Botswana':'博茨瓦纳','Central African Rep.':'中非','Canada':'加拿大','Switzerland':'瑞士','Chile':'智利','China':'中国','Ivory Coast':'科特迪瓦','Cameroon':'喀麦隆','Dem. Rep. Congo':'刚果(金)','Congo':'刚果(布)','Colombia':'哥伦比亚','Costa Rica':'哥斯达黎加','Cuba':'古巴','Cyprus':'塞浦路斯','Czech Rep.':'捷克','Germany':'德国','Djibouti':'吉布提','Denmark':'丹麦','Dominican Rep.':'多米尼加','Algeria':'阿尔及利亚','Ecuador':'厄瓜多尔','Egypt':'埃及','Spain':'西班牙','Estonia':'爱沙尼亚','Ethiopia':'埃塞俄比亚','Finland':'芬兰','France':'法国','Gabon':'加蓬','United Kingdom':'英国','Georgia':'格鲁吉亚','Ghana':'加纳','Guinea':'几内亚','Greece':'希腊','Greenland':'格陵兰','Guatemala':'危地马拉','Guyana':'圭亚那','Honduras':'洪都拉斯','Croatia':'克罗地亚','Haiti':'海地','Hungary':'匈牙利','Indonesia':'印度尼西亚','India':'印度','Ireland':'爱尔兰','Iran':'伊朗','Iraq':'伊拉克','Iceland':'冰岛','Israel':'以色列','Italy':'意大利','Japan':'日本','Jordan':'约旦','Kazakhstan':'哈萨克斯坦','Kenya':'肯尼亚','Cambodia':'柬埔寨','Korea':'韩国','South Korea':'韩国','Kuwait':'科威特','Laos':'老挝','Lebanon':'黎巴嫩','Libya':'利比亚','Sri Lanka':'斯里兰卡','Lithuania':'立陶宛','Luxembourg':'卢森堡','Latvia':'拉脱维亚','Morocco':'摩洛哥','Moldova':'摩尔多瓦','Madagascar':'马达加斯加','Mexico':'墨西哥','Myanmar':'缅甸','Montenegro':'黑山','Mongolia':'蒙古','Mozambique':'莫桑比克','Mauritania':'毛里塔尼亚','Malawi':'马拉维','Malaysia':'马来西亚','Namibia':'纳米比亚','Niger':'尼日尔','Nigeria':'尼日利亚','Nicaragua':'尼加拉瓜','Netherlands':'荷兰','Norway':'挪威','Nepal':'尼泊尔','New Zealand':'新西兰','Oman':'阿曼','Pakistan':'巴基斯坦','Panama':'巴拿马','Peru':'秘鲁','Philippines':'菲律宾','Poland':'波兰','Portugal':'葡萄牙','Paraguay':'巴拉圭','Qatar':'卡塔尔','Romania':'罗马尼亚','Russia':'俄罗斯','Rwanda':'卢旺达','Saudi Arabia':'沙特阿拉伯','Sudan':'苏丹','Senegal':'塞内加尔','Sierra Leone':'塞拉利昂','Somalia':'索马里','Serbia':'塞尔维亚','Slovakia':'斯洛伐克','Slovenia':'斯洛文尼亚','Sweden':'瑞典','Syria':'叙利亚','Singapore':'新加坡','Taiwan':'台湾','Czech Republic':'捷克','Czech Rep.':'捷克','Chad':'查德','Thailand':'泰国','Tajikistan':'塔吉克斯坦','Turkmenistan':'土库曼斯坦','Tunisia':'突尼斯','Turkey':'土耳其','Tanzania':'坦桑尼亚','Uganda':'乌干达','Ukraine':'乌克兰','Uruguay':'乌拉圭','United States':'美国','Uzbekistan':'乌兹别克斯坦','Venezuela':'委内瑞拉','Vietnam':'越南','Yemen':'也门','South Africa':'南非','Zambia':'赞比亚','Zimbabwe':'津巴布韦'
  };

  window.initVisitorMap = function (opts) {
    var containerId = opts.containerId || 'v-map-final';
    var lang = opts.lang || 'en';
    var apiEndpoint = opts.apiEndpoint || 'https://visitor-map-api.a1393691489.workers.dev/';
    var isZh = lang.indexOf('zh') === 0;

    var el = document.getElementById(containerId);
    if (!el) return;

    el.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#aaa;font-size:0.9rem;">' +
      (isZh ? '加载地图数据中…' : 'Loading map data…') + '</div>';

    // Primary: proxied through our own Worker edge cache; fallback: jsdelivr
    var geoJsonUrl = apiEndpoint.replace(/\/*$/, '') + '/geo';
    var geoFallbackUrl = 'https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/json/world.json';

    function loadECharts(cb) {
      if (typeof echarts !== 'undefined') { cb(); return; }
      var s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/echarts@5.6.0/dist/echarts.min.js';
      s.onload = cb;
      s.onerror = function () {
        el.innerHTML = '<div style="color:#999;font-size:0.85rem;padding:16px;text-align:center;">' +
          (isZh ? '地图加载失败，请刷新重试' : 'Map failed to load. Please refresh.') + '</div>';
      };
      document.head.appendChild(s);
    }

    function initChart() {
      var chart = echarts.init(el);
      chart.showLoading({
        text: isZh ? '加载中…' : 'Loading…',
        color: '#c41e3a', textColor: '#6a6762',
        maskColor: 'rgba(255,255,255,0)', fontSize: 12,
      });

      var fetchGeo = fetch(geoJsonUrl)
        .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
        .catch(function () { return fetch(geoFallbackUrl).then(function (r) { return r.json(); }); });

      Promise.all([
        fetchGeo,
        fetch(apiEndpoint, { cache: 'no-cache' }).then(function (r) { return r.json(); }),
      ]).then(function (results) {
        var worldJson = results[0];
        var data      = results[1];

        echarts.registerMap('world', worldJson);
        chart.hideLoading();

        // map_countries = all countries with known coords (not capped by list limit)
        // falls back to countries if worker hasn't been redeployed yet
        var mapList = data.map_countries || data.countries || [];
        var totalUniques  = data.total_uniques  || 0;
        var totalRequests = data.total_requests || 1;

        // Distribute unique visitors proportionally by request share per country
        var scatterData = mapList
          .filter(function (c) { return COORDS[c.name]; })
          .map(function (c) {
            var uv = totalUniques
              ? Math.max(1, Math.ceil(totalUniques * (c.requests / totalRequests)))
              : c.requests;
            return { name: c.name, value: [COORDS[c.name][0], COORDS[c.name][1], uv] };
          });

        var max = scatterData.reduce(function (m, c) { return Math.max(m, c.value[2]); }, 1);

        chart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: function (p) {
              if (p.componentType !== 'series') return '';
              var display = isZh ? (zhDict[p.name] || p.name) : p.name;
              var req = p.value && p.value[2] != null ? p.value[2] : p.value;
              return '<b>' + display + '</b><br/>' +
                (isZh ? '访客数: ' : 'Visitors: ') +
                Number(req).toLocaleString('en-US');
            }
          },
          geo: {
            map: 'world',
            roam: false,
            itemStyle: { areaColor: '#f0ebe5', borderColor: '#c8c0b8', borderWidth: 0.5 },
            emphasis: {
              itemStyle: { areaColor: '#e8d8d0' },
              label: { show: false },
            },
            select: { disabled: true },
          },
          series: [{
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: scatterData,
            symbolSize: function (val) {
              // cubic scale: tiny countries stay tiny, top countries stand out
              var ratio = val[2] / max;
              return Math.round(3 + Math.pow(ratio, 0.6) * 14);
            },
            showEffectOn: 'render',
            rippleEffect: { brushType: 'stroke', scale: 2, period: 4 },
            label: { show: false },
            itemStyle: {
              color: '#a85c68',
              shadowBlur: 5,
              shadowColor: 'rgba(168,92,104,0.3)',
            },
            emphasis: {
              itemStyle: { color: '#c07080', shadowBlur: 12 },
              label: {
                show: true,
                formatter: function (p) {
                  return isZh ? (zhDict[p.name] || p.name) : p.name;
                },
                position: 'right',
                fontSize: 11,
                fontWeight: 'bold',
                color: '#3a3a3a',
                textBorderColor: 'rgba(255,255,255,0.95)',
                textBorderWidth: 2,
              },
            },
            zlevel: 2,
          }],
        });
      }).catch(function (err) {
        console.error('Visitor map error:', err);
        chart.hideLoading();
      });

      window.addEventListener('resize', function () { chart.resize(); });
    }

    loadECharts(initChart);
  };
})();
