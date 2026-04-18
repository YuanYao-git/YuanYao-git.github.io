---
permalink: /en/
title: "About me"
author_profile: true
layout: modern_home
hero_title: "Yuan Yao"
hero_subtitle: "Jilin University | Micro/Nano Fabrication"
lang: en
fullwidth: true
body_class: about-fonts
redirect_from: 
  - /about/
  - /about.html
---

{% assign blog_cards = site.data.blog_cards | where: "lang", page.lang | reverse | slice: 0, 5 %}
{% assign blog_cta = "Read ↗" %}

<div class="panel-container">

  <section class="panel snap-section panel-intro">
    <div class="panel-inner">
      <p class="eyebrow">About</p>
      <h2>Combining micro-nano manufacturing with engineering practice.</h2>
      <p>I study Mechanical Engineering at Jilin University and focus on microfabrication and laser fabrication. I keep close ties with <a href="http://teachers.jlu.edu.cn/HuangLab">Hu Huang’s lab</a> and the <a href="http://www.mems.mech.tohoku.ac.jp">Shuji Tanaka MEMS Lab</a> at Tohoku University.</p>
      <p>In 2026 I will join <a href="http://mvdl.pku.edu.cn/en/">Prof. Xianlong Wei’s group</a> at Peking University for Ph.D. studies, continuing the same interests with a stronger experimental toolkit.</p>
      <div class="edu-journey">
        <div class="edu-stop">
          <a href="https://www.jlu.edu.cn/" target="_blank" rel="noopener noreferrer">
            <img src="https://www.jlu.edu.cn/__local/0/5B/64/8C8DCC05EE61C79B65D1DFE86D2_14822F50_437B9.jpg" alt="Jilin University">
          </a>
          <span class="edu-stop-name">Jilin University</span>
          <span class="edu-stop-year">2021 – 2026</span>
        </div>
        <div class="edu-stop">
          <a href="https://www.tohoku.ac.jp/en/" target="_blank" rel="noopener noreferrer">
            <img src="https://www.tohoku.ac.jp/assets/img/svgs/logo.svg" alt="Tohoku University">
          </a>
          <span class="edu-stop-name">Tohoku University</span>
          <span class="edu-stop-year">2024</span>
        </div>
        <div class="edu-stop">
          <a href="https://www.pku.edu.cn/" target="_blank" rel="noopener noreferrer">
            <img src="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/images/%E6%A0%87%E5%BF%97_%E7%BA%A2%E8%89%B2.png" alt="Peking University">
          </a>
          <span class="edu-stop-name">Peking University</span>
          <span class="edu-stop-year">2026 –</span>
        </div>
      </div>

      <div class="cta-group">
        <a class="button" href="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/files/cv_yuanyao_2026.pdf">Download CV (PDF)</a>
        <a class="button secondary" href="mailto:me@yaoyuan.org">Email me</a>
      </div>
    </div>
  </section>

  <section class="panel snap-section panel-achievements">
    <div class="panel-inner">
      <h2>Academic Achievements</h2>
      <div class="achievement-grid">
        <article class="achievement-card">
          <img src="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/images/fig1.png" alt="Laser separation graphic">
          <div class="achievement-body">
            <p class="badge">IEEJ TEEE</p>
            <h3>Laser-enabled silicon layer separation</h3>
            <p>Two-dimensional laser delamination removes the need for sacrificial layers, maintaining compatibility with high-temperature semiconductor flows.</p>
            <a class="text-link" href="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/files/IEEJ%20Transactions%20Elec%20Engng%20-%202025%20-%20Yao%20-%20Feasibility%20Study%20of%20Layer%20Separation%20Using%202D%20Patterned%20Internal%20Laser%20Damage.pdf">Paper ↗</a>
            <p class="citation">Citation: Yao, Y., Vergara, A., Tang, Z., Tanaka, S. “Feasibility Study of Layer Separation using 2D Patterned Internal Laser Damage in Silicon.” <em>IEEJ Transactions on Electrical and Electronic Engineering</em>. <a href="https://doi.org/10.1002/tee.70136">https://doi.org/10.1002/tee.70136</a>. © Open-access article</p>
          </div>
        </article>
        <article class="achievement-card">
          <img src="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/images/fig2.png" alt="Conference slide">
          <div class="achievement-body">
            <p class="badge">MNC2024 Oral</p>
            <h3>International Microprocesses & Nanotechnology Conference</h3>
            <p>Spoke in Kyoto (session 15D-2-3) about microfabrication methods for high-aspect-ratio silicon structures.</p>
            <a class="text-link" href="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/files/MNC_slides.pdf">Slides ↗</a>
            <p class="citation">Citation: 37th International Microprocesses and Nanotechnology Conference (MNC 2024) oral presentation, Kyoto, The Japan Society of Applied Physics, 15 Nov 2024, session 15D-2-3. © Slides distributed lawfully by the author under the conference agreement.</p>
          </div>
        </article>
        <article class="achievement-card">
          <img src="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/images/fig4.png" alt="Ultrasonic tester">
          <div class="achievement-body">
            <p class="badge">Actuators</p>
            <h3>Ultrasonic vibration scratch tester</h3>
            <p>A thread–V-groove transfer path plus modal tuning enables stable ultrasonic excitation for scratch testing.</p>
            <a class="text-link" href="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/files/acatuators.pdf">Paper ↗</a>
            <p class="citation">Citation: Huang, Y.; Wu, H.; Yao, Y.; Zhao, H.; Huang, H. “An Ultrasonic Vibration Scratch Tester for Studying the Scratch Characteristics of Materials under Ultrasonic Vibration Contact Status.” <em>Actuators</em>. <a href="https://doi.org/10.3390/act13070262">https://doi.org/10.3390/act13070262</a>. © Open-access article</p>
          </div>
        </article>
        <article class="achievement-card">
          <img src="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/images/fig3.png" alt="Ultrasonic device patent">
          <div class="achievement-body">
            <p class="badge">Utility patent</p>
            <h3>Ultrasonic vibration device for scratch testing</h3>
            <p>Co-invented a stable, adjustable ultrasonic source filed as CN 220649966U to support vibration-assisted scratch experiments.</p>
            <a class="text-link" href="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/files/patent.pdf">Patent ↗</a>
            <p class="citation">Citation: Hu Huang; Yuan Yao; Yaming Huang; Haoxiang Wu. “Ultrasonic Vibration Device for Vibration-Assisted Scratch Testing.” Utility Patent CN 220649966U, China, 22 Mar 2024. © Public record released by CNIPA.</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="panel snap-section panel-blog">
    <div class="panel-inner">
      <h2>Blog</h2>
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
    <p class="eyebrow" style="text-align: center; font-size: 1.1rem; letter-spacing: 0.2em; margin-bottom: 30px;">Visitor Geography</p>
    
    <div id="v-map-final" style="width: 100%; height: 450px; background: transparent;"></div>

    <div style="text-align: center; margin-top: 35px; color: #888; font-size: 0.95rem; letter-spacing: 0.02em; line-height: 1.6;">
      Data sourced from Cloudflare Unique Visitors over the last 7 days (includes some automated traffic).
    </div>

    <footer style="text-align: center; margin-top: 45px; color: #aaa; font-size: 0.95rem; border-top: 1px solid #eee; padding-top: 25px; line-height: 1.8;">
      © 2026 Yuan Yao. Crafted with ✨ Vibe Coding.<br>
      <span style="font-style: italic; font-size: 0.85rem; color: #999;">"Any sufficiently advanced technology is indistinguishable from magic." — Arthur C. Clarke</span>
    </footer>
  </div>
</section>

<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js"></script>
<script>
(function() {
  const chart = echarts.init(document.getElementById('v-map-final'));
  
  // 1. Standard ISO code to GeoJSON English name mapping (core: ensure match with world.json)
  const isoToGeoName = {
    "US": "United States", "CN": "China", "HK": "China", "DE": "Germany", 
    "NO": "Norway", "CA": "Canada", "FR": "France", "NL": "Netherlands", 
    "IN": "India", "SG": "Singapore", "JP": "Japan", "GB": "United Kingdom",
    "RU": "Russia", "KR": "Korea", "CH": "Switzerland", "IT": "Italy",
    "AU": "Australia", "BR": "Brazil", "ES": "Spain"
  };

  fetch('https://raw.githubusercontent.com/apache/echarts/master/test/data/map/json/world.json')
    .then(res => res.json())
    .then(worldJson => {
      echarts.registerMap('world', worldJson);
      
      const option = {
        tooltip: { 
          trigger: 'item', 
          formatter: p => {
            const name = p.name;
            return p.data ? `<b>${name}</b><br/>Visitors: ${p.value}` : `<b>${name}</b>`;
          }
        },
        visualMap: { 
          show: false, min: 0, max: 200, 
          inRange: { color: ['#f1f5f9', '#93c5fd', '#1d4ed8'] } 
        },
        series: [{
          type: 'map', map: 'world', roam: false,
          selectedMode: false, // 彻底禁用点击选中状态
          emphasis: {
            itemStyle: { areaColor: '#bfdbfe' }, // 鼠标划过显示淡蓝色，不再变黄
            label: { show: false }
          },
          select: {
            disabled: true // 禁用点击后的视觉反馈（变黄）
          },
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
        name: isoToGeoName[c.name] || c.name, 
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
