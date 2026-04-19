/**
 * Shared Visitor Map Module
 * Renders a local canvas-based world visitor map without external dependencies.
 * Usage: initVisitorMap({ containerId, lang, apiEndpoint })
 */
(function () {
  'use strict';

  var PACIFIC_CENTER_LON = 180;
  var MAX_PIXEL_RATIO = 2;

  var COORDS = {
    "United States": [-95.71, 37.09],
    "China": [104.19, 35.86],
    "Germany": [10.45, 51.16],
    "Norway": [8.47, 60.47],
    "Canada": [-106.35, 56.13],
    "France": [2.21, 46.23],
    "Netherlands": [5.29, 52.13],
    "India": [78.96, 20.59],
    "Singapore": [103.82, 1.35],
    "Japan": [138.25, 36.2],
    "United Kingdom": [-3.44, 55.38],
    "Russia": [105.32, 61.52],
    "South Korea": [127.77, 35.91],
    "Switzerland": [8.23, 46.82],
    "Italy": [12.57, 41.87],
    "Australia": [133.78, -25.27],
    "Brazil": [-51.93, -14.24],
    "Spain": [-3.75, 40.46],
    "Taiwan": [120.96, 23.7],
    "Sweden": [18.64, 60.13],
    "Poland": [19.15, 51.92],
    "Portugal": [-8.22, 39.4],
    "Mexico": [-102.55, 23.63],
    "Indonesia": [113.92, -0.79],
    "Thailand": [100.99, 15.87],
    "Vietnam": [108.28, 14.06],
    "Philippines": [121.77, 12.88],
    "Malaysia": [108.03, 4.21],
    "Turkey": [35.24, 38.96],
    "Egypt": [30.8, 26.82],
    "South Africa": [22.94, -30.56],
    "Argentina": [-63.62, -38.42],
    "Chile": [-71.54, -35.68],
    "Colombia": [-74.3, 4.57],
    "Ukraine": [31.17, 48.38],
    "Romania": [24.97, 45.94],
    "Czech Republic": [15.47, 49.82],
    "Austria": [14.55, 47.52],
    "Belgium": [4.47, 50.5],
    "Denmark": [9.5, 56.26],
    "Finland": [25.75, 61.92],
    "Ireland": [-8.24, 53.41],
    "New Zealand": [174.89, -40.9],
    "Israel": [34.85, 31.05],
    "Saudi Arabia": [45.08, 23.89],
    "United Arab Emirates": [53.85, 23.42],
    "Pakistan": [69.35, 30.38],
    "Bangladesh": [90.36, 23.68],
    "Nigeria": [8.68, 9.08],
    "Kenya": [37.91, -0.02]
  };

  var zhDict = {
    'Afghanistan':'阿富汗','Angola':'安哥拉','Albania':'阿尔巴尼亚','United Arab Emirates':'阿联酋','Argentina':'阿根廷','Armenia':'亚美尼亚','Australia':'澳大利亚','Austria':'奥地利','Azerbaijan':'阿塞拜疆','Burundi':'布隆迪','Belgium':'比利时','Benin':'贝宁','Burkina Faso':'布基纳法索','Bangladesh':'孟加拉国','Bulgaria':'保加利亚','The Bahamas':'巴哈马','Bosnia and Herz.':'波黑','Belarus':'白俄罗斯','Belize':'伯利兹','Bolivia':'玻利维亚','Brazil':'巴西','Brunei':'文莱','Bhutan':'不丹','Botswana':'博茨瓦纳','Central African Rep.':'中非','Canada':'加拿大','Switzerland':'瑞士','Chile':'智利','China':'中国','Ivory Coast':'科特迪瓦','Cameroon':'喀麦隆','Dem. Rep. Congo':'刚果(金)','Congo':'刚果(布)','Colombia':'哥伦比亚','Costa Rica':'哥斯达黎加','Cuba':'古巴','Cyprus':'塞浦路斯','Czech Rep.':'捷克','Germany':'德国','Djibouti':'吉布提','Denmark':'丹麦','Dominican Rep.':'多米尼加','Algeria':'阿尔及利亚','Ecuador':'厄瓜多尔','Egypt':'埃及','Spain':'西班牙','Estonia':'爱沙尼亚','Ethiopia':'埃塞俄比亚','Finland':'芬兰','France':'法国','Gabon':'加蓬','United Kingdom':'英国','Georgia':'格鲁吉亚','Ghana':'加纳','Guinea':'几内亚','Greece':'希腊','Greenland':'格陵兰','Guatemala':'危地马拉','Guyana':'圭亚那','Honduras':'洪都拉斯','Croatia':'克罗地亚','Haiti':'海地','Hungary':'匈牙利','Indonesia':'印度尼西亚','India':'印度','Ireland':'爱尔兰','Iran':'伊朗','Iraq':'伊拉克','Iceland':'冰岛','Israel':'以色列','Italy':'意大利','Japan':'日本','Jordan':'约旦','Kazakhstan':'哈萨克斯坦','Kenya':'肯尼亚','Cambodia':'柬埔寨','Korea':'韩国','South Korea':'韩国','Kuwait':'科威特','Laos':'老挝','Lebanon':'黎巴嫩','Libya':'利比亚','Sri Lanka':'斯里兰卡','Lithuania':'立陶宛','Luxembourg':'卢森堡','Latvia':'拉脱维亚','Morocco':'摩洛哥','Moldova':'摩尔多瓦','Madagascar':'马达加斯加','Mexico':'墨西哥','Myanmar':'缅甸','Montenegro':'黑山','Mongolia':'蒙古','Mozambique':'莫桑比克','Mauritania':'毛里塔尼亚','Malawi':'马拉维','Malaysia':'马来西亚','Namibia':'纳米比亚','Niger':'尼日尔','Nigeria':'尼日利亚','Nicaragua':'尼加拉瓜','Netherlands':'荷兰','Norway':'挪威','Nepal':'尼泊尔','New Zealand':'新西兰','Oman':'阿曼','Pakistan':'巴基斯坦','Panama':'巴拿马','Peru':'秘鲁','Philippines':'菲律宾','Poland':'波兰','Portugal':'葡萄牙','Paraguay':'巴拉圭','Qatar':'卡塔尔','Romania':'罗马尼亚','Russia':'俄罗斯','Rwanda':'卢旺达','Saudi Arabia':'沙特阿拉伯','Sudan':'苏丹','Senegal':'塞内加尔','Sierra Leone':'塞拉利昂','Somalia':'索马里','Serbia':'塞尔维亚','Slovakia':'斯洛伐克','Slovenia':'斯洛文尼亚','Sweden':'瑞典','Syria':'叙利亚','Singapore':'新加坡','Taiwan':'台湾','Czech Republic':'捷克','Chad':'查德','Thailand':'泰国','Tajikistan':'塔吉克斯坦','Turkmenistan':'土库曼斯坦','Tunisia':'突尼斯','Turkey':'土耳其','Tanzania':'坦桑尼亚','Uganda':'乌干达','Ukraine':'乌克兰','Uruguay':'乌拉圭','United States':'美国','Uzbekistan':'乌兹别克斯坦','Venezuela':'委内瑞拉','Vietnam':'越南','Yemen':'也门','South Africa':'南非','Zambia':'赞比亚','Zimbabwe':'津巴布韦'
  };

  function wrapLongitude(lon, centerLon) {
    var wrapped = lon - centerLon;
    while (wrapped < -180) wrapped += 360;
    while (wrapped >= 180) wrapped -= 360;
    return wrapped;
  }

  function projectPoint(lon, lat, width, height, padding) {
    var wrappedLon = wrapLongitude(lon, PACIFIC_CENTER_LON);
    var usableWidth = Math.max(1, width - padding * 2);
    var usableHeight = Math.max(1, height - padding * 2);
    return {
      x: padding + ((wrappedLon + 180) / 360) * usableWidth,
      y: padding + ((90 - lat) / 180) * usableHeight
    };
  }

  function createProjection(width, height, padding, worldBounds) {
    var usableWidth = Math.max(1, width - padding * 2);
    var usableHeight = Math.max(1, height - padding * 2);
    var boundsWidth = Math.max(1, worldBounds.maxX - worldBounds.minX);
    var boundsHeight = Math.max(1, worldBounds.maxY - worldBounds.minY);
    var scale = Math.min(usableWidth / boundsWidth, usableHeight / boundsHeight);
    var offsetX = padding + ((usableWidth - boundsWidth * scale) / 2) - (worldBounds.minX * scale);
    var offsetY = padding + ((usableHeight - boundsHeight * scale) / 2) - (worldBounds.minY * scale);

    return function (lon, lat) {
      var wrappedLon = wrapLongitude(lon, PACIFIC_CENTER_LON);
      var baseX = wrappedLon + 180;
      var baseY = 90 - lat;
      return {
        x: offsetX + baseX * scale,
        y: offsetY + baseY * scale
      };
    };
  }

  function updateWorldBounds(bounds, lon, lat) {
    var wrappedLon = wrapLongitude(lon, PACIFIC_CENTER_LON);
    var x = wrappedLon + 180;
    var y = 90 - lat;
    bounds.minX = Math.min(bounds.minX, x);
    bounds.maxX = Math.max(bounds.maxX, x);
    bounds.minY = Math.min(bounds.minY, y);
    bounds.maxY = Math.max(bounds.maxY, y);
  }

  function getWorldBounds(geoJson) {
    var features = geoJson && geoJson.features ? geoJson.features : [];
    var bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };

    features.forEach(function (feature) {
      var geometry = feature && feature.geometry;
      if (!geometry) return;

      if (geometry.type === 'Polygon') {
        geometry.coordinates.forEach(function (ring) {
          ring.forEach(function (coord) {
            updateWorldBounds(bounds, coord[0], coord[1]);
          });
        });
      } else if (geometry.type === 'MultiPolygon') {
        geometry.coordinates.forEach(function (polygon) {
          polygon.forEach(function (ring) {
            ring.forEach(function (coord) {
              updateWorldBounds(bounds, coord[0], coord[1]);
            });
          });
        });
      }
    });

    if (!isFinite(bounds.minX)) {
      return { minX: 0, minY: 0, maxX: 360, maxY: 180 };
    }

    return bounds;
  }

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

  function drawGraticule(ctx, width, height, padding, project) {
    var lat;
    var lon;
    ctx.save();
    ctx.strokeStyle = 'rgba(106, 103, 98, 0.08)';
    ctx.lineWidth = 1;

    for (lat = -60; lat <= 60; lat += 30) {
      var latY = project(0, lat).y;
      ctx.beginPath();
      ctx.moveTo(padding, latY);
      ctx.lineTo(width - padding, latY);
      ctx.stroke();
    }

    for (lon = -150; lon <= 180; lon += 30) {
      var lonX = project(lon, 0).x;
      ctx.beginPath();
      ctx.moveTo(lonX, padding);
      ctx.lineTo(lonX, height - padding);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawRing(ctx, ring, width, height, padding, project) {
    var i;
    var point;
    var prevWrapped;
    var currWrapped;
    var prevLat;
    var lat;
    var diff;
    var nextWrapped;
    var boundary;
    var t;
    var seamLat;
    var seamPoint;
    var oppositePoint;

    if (!ring || !ring.length) return;

    point = project(ring[0][0], ring[0][1]);
    prevWrapped = wrapLongitude(ring[0][0], PACIFIC_CENTER_LON);
    prevLat = ring[0][1];
    ctx.moveTo(point.x, point.y);

    for (i = 1; i < ring.length; i += 1) {
      currWrapped = wrapLongitude(ring[i][0], PACIFIC_CENTER_LON);
      lat = ring[i][1];
      diff = currWrapped - prevWrapped;

      if (Math.abs(diff) > 180) {
        nextWrapped = currWrapped;
        if (diff > 180) {
          nextWrapped -= 360;
          boundary = -180;
        } else {
          nextWrapped += 360;
          boundary = 180;
        }

        t = (boundary - prevWrapped) / (nextWrapped - prevWrapped);
        seamLat = prevLat + ((lat - prevLat) * t);
        seamPoint = {
          x: boundary === 180 ? width - padding : padding,
          y: project(0, seamLat).y
        };
        oppositePoint = {
          x: boundary === 180 ? padding : width - padding,
          y: seamPoint.y
        };

        ctx.lineTo(seamPoint.x, seamPoint.y);
        ctx.moveTo(oppositePoint.x, oppositePoint.y);
      }

      point = project(ring[i][0], lat);
      ctx.lineTo(point.x, point.y);
      prevWrapped = currWrapped;
      prevLat = lat;
    }
  }

  function drawWorld(ctx, geoJson, width, height, padding, project) {
    var features = geoJson && geoJson.features ? geoJson.features : [];
    var i;
    var j;
    var geometry;
    var rings;

    ctx.save();
    ctx.beginPath();
    for (i = 0; i < features.length; i += 1) {
      geometry = features[i] && features[i].geometry;
      if (!geometry) continue;

      if (geometry.type === 'Polygon') {
        rings = geometry.coordinates || [];
        for (j = 0; j < rings.length; j += 1) {
          drawRing(ctx, rings[j], width, height, padding, project);
        }
      } else if (geometry.type === 'MultiPolygon') {
        rings = geometry.coordinates || [];
        rings.forEach(function (polygon) {
          polygon.forEach(function (ring) {
            drawRing(ctx, ring, width, height, padding, project);
          });
        });
      }
    }
    ctx.strokeStyle = 'rgba(132, 124, 116, 0.58)';
    ctx.lineWidth = 0.9;
    ctx.stroke();
    ctx.restore();
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
      'white-space:nowrap'
    ].join(';');
    el.appendChild(tip);
    return tip;
  }

  function showMessage(el, message) {
    el.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#6a6762;font-size:0.9rem;text-align:center;padding:16px;">' + message + '</div>';
  }

  function createCanvasMap(el, worldJson, data, lang) {
    var isZh = lang.indexOf('zh') === 0;
    var padding = 18;
    var dpr = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    var canvas = document.createElement('canvas');
    var tooltip;
    var resizeTimer = null;
    var worldBounds = getWorldBounds(worldJson);
    var mapList = data.map_countries || data.countries || [];
    var totalUniques = data.total_uniques || 0;
    var totalRequests = Math.max(1, data.total_requests || 0);
    var dots = mapList.filter(function (item) {
      return COORDS[item.name];
    }).map(function (item) {
      var visitors = totalUniques ? Math.max(1, Math.ceil(totalUniques * (item.requests / totalRequests))) : item.requests;
      return {
        name: item.name,
        label: isZh ? (zhDict[item.name] || item.name) : item.name,
        requests: item.requests,
        visitors: visitors,
        lon: COORDS[item.name][0],
        lat: COORDS[item.name][1]
      };
    });
    var maxVisitors = dots.reduce(function (current, item) {
      return Math.max(current, item.visitors);
    }, 1);
    var hitDots = [];

    el.innerHTML = '';
    el.style.position = 'relative';
    canvas.style.cssText = 'display:block;width:100%;height:100%;';
    el.appendChild(canvas);
    tooltip = buildTooltip(el);

    function draw() {
      var rect = el.getBoundingClientRect();
      var width = Math.max(320, Math.round(rect.width));
      var height = Math.max(220, Math.round(rect.height));
      var ctx;
      var project = createProjection(width, height, padding, worldBounds);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      var background = ctx.createLinearGradient(0, 0, 0, height);
      background.addColorStop(0, 'rgba(255,255,255,0.88)');
      background.addColorStop(1, 'rgba(240,234,228,0.96)');
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      drawGraticule(ctx, width, height, padding, project);
      drawWorld(ctx, worldJson, width, height, padding, project);

      hitDots = [];
      dots.forEach(function (dot) {
        var point = project(dot.lon, dot.lat);
        var radius = 3 + Math.pow(dot.visitors / maxVisitors, 0.6) * 11;

        ctx.beginPath();
        ctx.arc(point.x, point.y, radius * 1.9, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(196, 30, 58, 0.08)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168, 92, 104, 0.92)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.82)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        hitDots.push({
          x: point.x,
          y: point.y,
          radius: Math.max(10, radius + 5),
          label: dot.label,
          visitors: dot.visitors,
          requests: dot.requests
        });
      });

      ctx.fillStyle = 'rgba(106,103,98,0.92)';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(isZh ? '太平洋中心投影' : 'Pacific-centered projection', padding, height - 10);
    }

    function findDot(x, y) {
      var i;
      var dot;
      var dx;
      var dy;
      for (i = hitDots.length - 1; i >= 0; i -= 1) {
        dot = hitDots[i];
        dx = x - dot.x;
        dy = y - dot.y;
        if ((dx * dx) + (dy * dy) <= dot.radius * dot.radius) return dot;
      }
      return null;
    }

    canvas.addEventListener('mousemove', function (event) {
      var rect = canvas.getBoundingClientRect();
      var dot = findDot(event.clientX - rect.left, event.clientY - rect.top);
      if (!dot) {
        tooltip.style.display = 'none';
        canvas.style.cursor = 'default';
        return;
      }

      tooltip.style.display = 'block';
      tooltip.style.left = Math.min(rect.width - 150, event.clientX - rect.left + 12) + 'px';
      tooltip.style.top = Math.max(8, event.clientY - rect.top - 44) + 'px';
      tooltip.innerHTML = '<strong>' + dot.label + '</strong><br>' +
        (isZh ? '访客数: ' : 'Visitors: ') + dot.visitors.toLocaleString('en-US') + '<br>' +
        (isZh ? '请求数: ' : 'Requests: ') + dot.requests.toLocaleString('en-US');
      canvas.style.cursor = 'pointer';
    });

    canvas.addEventListener('mouseleave', function () {
      tooltip.style.display = 'none';
      canvas.style.cursor = 'default';
    });

    window.addEventListener('resize', function () {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(draw, 80);
    }, { passive: true });

    draw();
  }

  window.initVisitorMap = function (opts) {
    var containerId = opts.containerId || 'v-map-final';
    var lang = opts.lang || 'en';
    var apiEndpoint = (opts.apiEndpoint || 'https://api.yaoyuan.org/').replace(/\/*$/, '');
    var isZh = lang.indexOf('zh') === 0;
    var el = document.getElementById(containerId);

    if (!el) return;

    showMessage(el, isZh ? '加载地图数据中…' : 'Loading map data…');

    Promise.all([
      fetchJson('/assets/data/world.json', apiEndpoint + '/geo'),
      fetchJson('/assets/data/visitor-map.json', apiEndpoint)
    ]).then(function (results) {
      createCanvasMap(el, results[0], results[1], lang);
    }).catch(function (error) {
      console.error('Visitor map error:', error);
      showMessage(el, isZh ? '地图暂时无法加载，请刷新重试' : 'Map unavailable. Please refresh.');
    });
  };
})();
