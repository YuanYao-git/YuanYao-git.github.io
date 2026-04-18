---
permalink: /
title: "关于我"
author_profile: true
layout: modern_home
lang: zh-CN
hero_title: "姚远"
hero_subtitle: "吉林大学 · 微纳制造"
fullwidth: true
body_class: about-fonts
redirect_from: 
  - /about/zh/
  - /about/zh
  - /about/zh.html
---

{% assign blog_cards = site.data.blog_cards | where: "lang", "zh" | reverse | slice: 0, 5 %}
{% assign blog_cta = "阅读全文 ↗" %}

<div class="panel-container">

  <section class="panel snap-section panel-intro">
    <div class="panel-inner">
      <p class="eyebrow">个人简介</p>
      <h2>把微纳制造与工程实践结合起来。</h2>
      <p>我在吉林大学机械工程专业学习，主要研究微纳制造与激光加工。先后在<a href="http://teachers.jlu.edu.cn/HuangLab">黄虎老师课题组</a>和<a href="http://www.mems.mech.tohoku.ac.jp">田中秀治 MEMS Lab</a>参与项目。</p>
      <p>2026 年，我将加入北京大学<a href="http://mvdl.pku.edu.cn/zh/">魏贤龙老师课题组</a>攻读博士，沿着同样的方向继续扎实推进。</p>
      <div class="edu-journey">
        <div class="edu-stop">
          <a href="https://www.jlu.edu.cn/" target="_blank" rel="noopener noreferrer">
            <img src="https://www.jlu.edu.cn/__local/0/5B/64/8C8DCC05EE61C79B65D1DFE86D2_14822F50_437B9.jpg" alt="吉林大学校徽">
          </a>
          <span class="edu-stop-name">吉林大学</span>
          <span class="edu-stop-year">2021 – 2026</span>
        </div>
        <div class="edu-stop">
          <a href="https://www.tohoku.ac.jp/" target="_blank" rel="noopener noreferrer">
            <img src="https://www.tohoku.ac.jp/assets/img/svgs/logo.svg" alt="東北大学校章">
          </a>
          <span class="edu-stop-name">东北大学</span>
          <span class="edu-stop-year">2024</span>
        </div>
        <div class="edu-stop">
          <a href="https://www.pku.edu.cn/" target="_blank" rel="noopener noreferrer">
            <img src="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/images/%E6%A0%87%E5%BF%97_%E7%BA%A2%E8%89%B2.png" alt="北京大学校徽">
          </a>
          <span class="edu-stop-name">北京大学</span>
          <span class="edu-stop-year">2026 –</span>
        </div>
      </div>

      <div class="cta-group">
        <a class="button" href="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/files/%E7%AE%80%E5%8E%86-%E5%A7%9A%E8%BF%9C-2026.pdf">下载简历 (PDF)</a>
        <a class="button secondary" href="mailto:me@yaoyuan.org">联系我</a>
      </div>
    </div>
  </section>

  <section class="panel snap-section panel-achievements">
    <div class="panel-inner">
      <h2>学术成果</h2>
      <div class="achievement-grid">
        <article class="achievement-card">
          <img src="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/images/fig1.png" alt="激光分离示意">
          <div class="achievement-body">
            <p class="badge">IEEJ TEEE</p>
            <h3>二维激光内损伤实现硅层分离</h3>
            <p>通过优化激光隐切路径，实现无需分离层的激光剥离，兼容传统半导体高温工艺。</p>
            <a class="text-link" href="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/files/IEEJ%20Transactions%20Elec%20Engng%20-%202025%20-%20Yao%20-%20Feasibility%20Study%20of%20Layer%20Separation%20Using%202D%20Patterned%20Internal%20Laser%20Damage.pdf">论文 ↗</a>
            <p class="citation">引用：Yao, Y., Vergara, A., Tang, Z., Tanaka, S. Feasibility Study of Layer Separation using 2D Patterned Internal Laser Damage in Silicon. <em>IEEJ Transactions on Electrical and Electronic Engineering</em>. <a href="https://doi.org/10.1002/tee.70136">https://doi.org/10.1002/tee.70136</a>. © OA 文章。</p>
          </div>
        </article>
        <article class="achievement-card">
          <img src="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/images/fig2.png" alt="会议演讲">
          <div class="achievement-body">
            <p class="badge">MNC2024</p>
            <h3>国际微工艺与纳米技术会议口头报告</h3>
            <p>在京都 MNC2024 会议（15D-2-3）分享微纳加工方案与实验结果。</p>
            <a class="text-link" href="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/files/MNC_slides.pdf">幻灯片 ↗</a>
            <p class="citation">引用：第 37 届国际微处理器与纳米技术会议 (MNC 2024) 口头汇报, 京都: 日本应用物理协会, 2024-11-15, 15D-2-3. 幻灯片。© 幻灯片由作者依会议协议分发。</p>
          </div>
        </article>
        <article class="achievement-card">
          <img src="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/images/fig4.png" alt="超声划痕试验机">
          <div class="achievement-body">
            <p class="badge">Actuators</p>
            <h3>超声振动划痕试验机</h3>
            <p>提出螺纹-V 型槽复合结构与模态匹配策略，实现稳定的超声振幅传递。</p>
            <a class="text-link" href="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/files/acatuators.pdf">论文 ↗</a>
            <p class="citation">引用： Huang, Y.; Wu, H.; Yao, Y.; Zhao, H.; Huang, H. An Ultrasonic Vibration Scratch Tester for Studying the Scratch Characteristics of Materials under Ultrasonic Vibration Contact Status. <em>Actuators</em>. <a href="https://doi.org/10.3390/act13070262">https://doi.org/10.3390/act13070262</a>. © OA 文章</p>
          </div>
        </article>
        <article class="achievement-card">
          <img src="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/images/fig3.png" alt="超声振动专利">
          <div class="achievement-body">
            <p class="badge">实用新型专利</p>
            <h3>用于振动辅助划痕测试的超声振动装置</h3>
            <p>具备稳定振幅和易调节特性，为振动辅助划痕实验提供可靠振动源。</p>
            <a class="text-link" href="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/files/patent.pdf">专利 ↗</a>
            <p class="citation">引用：已发表实用新型专利: 黄虎；姚远；黄雅明；吴浩翔. 一种用于振动辅助划痕测试的超声振动装置: 中国, 2024-03-22. CN 220649966U. © 国家知识产权局公开文件。</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="panel snap-section panel-blog">
    <div class="panel-inner">
      <h2>博客</h2>
      <div class="blog-grid">
        {% for card in blog_cards %}
        <article class="blog-card">
          <div class="badge">{{ card.badge }}</div>
          <img src="{{ card.image }}" alt="{{ card.title }}">
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
          <a class="text-link" href="{{ card.link }}">{{ blog_cta }}</a>
        </article>
        {% endfor %}
      </div>
    </div>
  </section>
<section class="panel snap-section panel-map" style="background: var(--panel); min-height: 600px; display: flex; align-items: center; border-top: 1px solid var(--line);">
  <div class="panel-inner" style="width: 100%; max-width: 1100px; margin: 0 auto; padding: 40px 20px;">
    <p class="eyebrow" style="text-align: center; font-size: 1.1rem; letter-spacing: 0.2em; margin-bottom: 30px;">访客来源地</p>
    
    <div id="v-map-final" style="width: 100%; height: 450px; background: transparent;"></div>

    <div style="text-align: center; margin-top: 35px; color: #888; font-size: 0.95rem; letter-spacing: 0.02em; line-height: 1.6;">
      数据源自 Cloudflare 近 7 日唯一访客统计 (含部分自动化流量)。
    </div>

    <footer style="text-align: center; margin-top: 45px; color: #aaa; font-size: 0.95rem; border-top: 1px solid #eee; padding-top: 25px; line-height: 1.8;">
      © 2026 Yuan Yao. Crafted with ✨ Vibe Coding ✨.<br>
      <span style="font-style: italic; font-size: 0.85rem; color: #999;">“任何足够先进的技术，初看都与魔法无异。” — 亚瑟·克拉克</span>
    </footer>
  </div>
</section>

<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js"></script>
<script>
(function() {
  const chart = echarts.init(document.getElementById('v-map-final'));
  
  // 1. 严格匹配 world.json 内部的英文 Key (着色关键)
  const isoToGeo = {
    "US": "United States", "CN": "China", "HK": "China", "DE": "Germany", 
    "NO": "Norway", "CA": "Canada", "FR": "France", "NL": "Netherlands", 
    "IN": "India", "SG": "Singapore", "JP": "Japan", "GB": "United Kingdom",
    "RU": "Russia", "KR": "Korea", "CH": "Switzerland", "IT": "Italy",
    "AU": "Australia", "BR": "Brazil", "ES": "Spain"
  };

  // 2. 200+ 国家全量中文字典 (仅用于 Tooltip 显示)
  const zhDict = {
    'Afghanistan':'阿富汗','Angola':'安哥拉','Albania':'阿尔巴尼亚','United Arab Emirates':'阿联酋','Argentina':'阿根廷','Armenia':'亚美尼亚','Australia':'澳大利亚','Austria':'奥地利','Azerbaijan':'阿塞拜疆','Burundi':'布隆迪','Belgium':'比利时','Benin':'贝宁','Burkina Faso':'布基纳法索','Bangladesh':'孟加拉国','Bulgaria':'保加利亚','The Bahamas':'巴哈马','Bosnia and Herz.':'波黑','Belarus':'白俄罗斯','Belize':'伯利兹','Bermuda':'百幕大','Bolivia':'玻利维亚','Brazil':'巴西','Brunei':'文莱','Bhutan':'不丹','Botswana':'博茨瓦纳','Central African Rep.':'中非','Canada':'加拿大','Switzerland':'瑞士','Chile':'智利','China':'中国','Ivory Coast':'科特迪瓦','Cameroon':'喀麦隆','Dem. Rep. Congo':'刚果(金)','Congo':'刚果(布)','Colombia':'哥伦比亚','Costa Rica':'哥斯达黎加','Cuba':'古巴','Northern Cyprus':'北塞浦路斯','Cyprus':'塞浦路斯','Czech Rep.':'捷克','Germany':'德国','Djibouti':'吉布提','Denmark':'丹麦','Dominican Rep.':'多米尼加','Algeria':'阿尔及利亚','Ecuador':'厄瓜多尔','Egypt':'埃及','Eritrea':'厄立特里亚','Spain':'西班牙','Estonia':'爱沙尼亚','Ethiopia':'埃塞俄比亚','Finland':'芬兰','Fiji':'斐济','Falkland Is.':'马尔维纳斯群岛','France':'法国','Gabon':'加蓬','United Kingdom':'英国','Georgia':'格鲁吉亚','Ghana':'加纳','Guinea':'几内亚','Gambia':'冈比亚','Guinea-Bissau':'几内亚比绍','Eq. Guinea':'赤道几内亚','Greece':'希腊','Greenland':'格陵兰','Guatemala':'危地马拉','French Guiana':'法属圭亚那','Guyana':'圭亚那','Honduras':'洪都拉斯','Croatia':'克罗地亚','Haiti':'海地','Hungary':'匈牙利','Indonesia':'印度尼西亚','India':'印度','Ireland':'爱尔兰','Iran':'伊朗','Iraq':'伊拉克','Iceland':'冰岛','Israel':'以色列','Italy':'意大利','Jamaica':'牙买加','Jordan':'约旦','Japan':'日本','Kazakhstan':'哈萨克斯坦','Kenya':'肯尼亚','Kyrgyzstan':'吉尔吉斯斯坦','Cambodia':'柬埔寨','Korea':'韩国','Kosovo':'科索沃','Kuwait':'科威特','Laos':'老挝','Lebanon':'黎巴嫩','Liberia':'利比里亚','Libya':'利比亚','Sri Lanka':'斯里兰卡','Lesotho':'莱索托','Lithuania':'立陶宛','Luxembourg':'卢森堡','Latvia':'拉脱维亚','Morocco':'摩洛哥','Moldova':'摩尔多瓦','Madagascar':'马达加斯加','Mexico':'墨西哥','Macedonia':'马其顿','Mali':'马里','Myanmar':'缅甸','Montenegro':'黑山','Mongolia':'蒙古','Mozambique':'莫桑比克','Mauritania':'毛里塔尼亚','Malawi':'马拉维','Malaysia':'马来西亚','Namibia':'纳米比亚','New Caledonia':'新喀里多尼亚','Niger':'尼日尔','Nigeria':'尼日利亚','Nicaragua':'尼加拉瓜','Netherlands':'荷兰','Norway':'挪威','Nepal':'尼泊尔','New Zealand':'新西兰','Oman':'阿曼','Pakistan':'巴基斯坦','Panama':'巴拿马','Peru':'秘鲁','Philippines':'菲律宾','Papua New Guinea':'巴布亚新几内亚','Poland':'波兰','Puerto Rico':'波多黎各','North Korea':'朝鲜','Portugal':'葡萄牙','Paraguay':'巴拉圭','Qatar':'卡塔尔','Romania':'罗马尼亚','Russia':'俄罗斯','Rwanda':'卢旺达','W. Sahara':'西撒哈拉','Saudi Arabia':'沙特阿拉伯','Sudan':'苏丹','S. Sudan':'南苏丹','Senegal':'塞内加尔','Solomon Is.':'所罗门群岛','Sierra Leone':'塞拉利昂','El Salvador':'萨尔瓦多','Somaliland':'索马里兰','Somalia':'索马里','Serbia':'塞尔维亚','Suriname':'苏里南','Slovakia':'斯洛伐克','Slovenia':'斯洛文尼亚','Sweden':'瑞典','Swaziland':'斯威士兰','Syria':'叙利亚','Chad':'查德','Togo':'多哥','Thailand':'泰国','Tajikistan':'塔吉克斯坦','Turkmenistan':'土库曼斯坦','East Timor':'东帝汶','Trinidad and Tobago':'特立尼达和多巴哥','Tunisia':'突尼斯','Turkey':'土耳其','Tanzania':'坦桑尼亚','Uganda':'乌干达','Ukraine':'乌克兰','Uruguay':'乌拉圭','United States':'美国','Uzbekistan':'乌兹别克斯坦','Venezuela':'委内瑞拉','Vietnam':'越南','Vanuatu':'瓦努阿图','West Bank':'西岸','Yemen':'也门','South Africa':'南非','Zambia':'赞比亚','Zimbabwe':'津巴布韦'
  };

  fetch('https://raw.githubusercontent.com/apache/echarts/master/test/data/map/json/world.json')
    .then(res => res.json())
    .then(worldJson => {
      echarts.registerMap('world', worldJson);
      
      const option = {
        tooltip: { 
          trigger: 'item', 
          formatter: p => {
            // 翻译逻辑：在这里把英文名转成中文显示
            const cnName = zhDict[p.name] || p.name;
            return p.data ? `<b>${cnName}</b><br/>访客数: ${p.value}` : `<b>${cnName}</b>`;
          }
        },
        visualMap: { 
          show: false, min: 0, max: 200, 
          inRange: { color: ['#f1f5f9', '#93c5fd', '#1d4ed8'] } 
        },
        series: [{
          type: 'map', map: 'world', roam: false,
          selectedMode: false, // 彻底禁用点击选中功能
          emphasis: {
            itemStyle: { areaColor: '#bfdbfe' }, // 划过显示淡蓝，不再变黄
            label: { show: false }
          },
          select: { disabled: true }, // 禁用选中视觉效果
          itemStyle: { areaColor: '#f8fafc', borderColor: '#cbd5e1', borderWidth: 0.5 },
          data: []
        }]
      };
      chart.setOption(option);

      return fetch('https://visitor-map-api.a1393691489.workers.dev/');
    })
    .then(res => res.json())
    .then(data => {
      const rawList = data.countries || [];
      const formatted = rawList.map(c => ({
        name: isoToGeo[c.name] || c.name, 
        value: c.requests
      }));

      const maxVal = Math.max(...formatted.map(i => i.value), 20);
      chart.setOption({ 
        visualMap: { max: maxVal },
        series: [{ data: formatted }] 
      });
    })
    .catch(err => console.error("Map Pipeline Error:", err));

  window.addEventListener('resize', () => chart.resize());
})();
</script>

</div>
