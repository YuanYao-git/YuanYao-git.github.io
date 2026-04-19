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

  <section id="intro" class="panel snap-section panel-intro" data-section-anchor="intro">
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

  <section id="achievements" class="panel snap-section panel-achievements" data-section-anchor="achievements">
    <div class="panel-inner">
      <h2>Academic Achievements</h2>
      <div class="achievement-grid">
        <article class="achievement-card">
          <img src="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/images/fig1.png" alt="Laser separation graphic">
          <div class="achievement-body">
            <p class="badge">IEEJ TEEE</p>
            <h3>Laser-enabled silicon layer separation</h3>
            <p>Optimises the laser stealth-cut path to achieve layer separation without a sacrificial layer, remaining compatible with high-temperature semiconductor processes.</p>
            <a class="text-link" href="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/files/IEEJ%20Transactions%20Elec%20Engng%20-%202025%20-%20Yao%20-%20Feasibility%20Study%20of%20Layer%20Separation%20Using%202D%20Patterned%20Internal%20Laser%20Damage.pdf">Paper ↗</a>
            <p class="citation">Citation: Yao, Y., Vergara, A., Tang, Z., Tanaka, S. “Feasibility Study of Layer Separation using 2D Patterned Internal Laser Damage in Silicon.” <em>IEEJ Transactions on Electrical and Electronic Engineering</em>. <a href="https://doi.org/10.1002/tee.70136">https://doi.org/10.1002/tee.70136</a>. © Open-access article</p>
          </div>
        </article>
        <article class="achievement-card">
          <img src="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/images/fig2.png" alt="Conference slide">
          <div class="achievement-body">
            <p class="badge">MNC2024</p>
            <h3>International Microprocesses & Nanotechnology Conference — Oral Presentation</h3>
            <p>Presented microfabrication solutions and experimental results at MNC 2024 in Kyoto (session 15D-2-3).</p>
            <a class="text-link" href="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/files/MNC_slides.pdf">Slides ↗</a>
            <p class="citation">Citation: 37th International Microprocesses and Nanotechnology Conference (MNC 2024) oral presentation, Kyoto, The Japan Society of Applied Physics, 15 Nov 2024, session 15D-2-3. © Slides distributed lawfully by the author under the conference agreement.</p>
          </div>
        </article>
        <article class="achievement-card">
          <img src="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/images/fig4.png" alt="Ultrasonic tester">
          <div class="achievement-body">
            <p class="badge">Actuators</p>
            <h3>Ultrasonic vibration scratch tester</h3>
            <p>Proposes a thread–V-groove composite structure with a modal-matching strategy to achieve stable ultrasonic amplitude transmission.</p>
            <a class="text-link" href="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/files/acatuators.pdf">Paper ↗</a>
            <p class="citation">Citation: Huang, Y.; Wu, H.; Yao, Y.; Zhao, H.; Huang, H. “An Ultrasonic Vibration Scratch Tester for Studying the Scratch Characteristics of Materials under Ultrasonic Vibration Contact Status.” <em>Actuators</em>. <a href="https://doi.org/10.3390/act13070262">https://doi.org/10.3390/act13070262</a>. © Open-access article</p>
          </div>
        </article>
        <article class="achievement-card">
          <img src="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/images/fig3.png" alt="Ultrasonic device patent">
          <div class="achievement-body">
            <p class="badge">Utility patent</p>
            <h3>Ultrasonic vibration device for vibration-assisted scratch testing</h3>
            <p>Features stable amplitude and easy adjustment, providing a reliable vibration source for vibration-assisted scratch experiments.</p>
            <a class="text-link" href="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/files/patent.pdf">Patent ↗</a>
            <p class="citation">Citation: Hu Huang; Yuan Yao; Yaming Huang; Haoxiang Wu. “Ultrasonic Vibration Device for Vibration-Assisted Scratch Testing.” Utility Patent CN 220649966U, China, 22 Mar 2024. © Public record released by CNIPA.</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section id="blog" class="panel snap-section panel-blog" data-section-anchor="blog">
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
<section id="map" class="panel snap-section panel-map" data-section-anchor="map">
  <div class="panel-inner">
    <p class="eyebrow">Visitor Geography</p>
    
    <div id="v-map-final" class="map-container"></div>

    <div class="map-source-note">
      Data sourced from Cloudflare 7-day unique visitor stats (includes crawlers and indexing noise; true visitors ~1/10).
    </div>

    <footer class="site-footer-main">
      <div class="footer-quote-block">
        <span class="quote-mark">&#10077;</span>
        <span class="quote-text">Any sufficiently advanced technology is indistinguishable from magic.</span>
        <span class="quote-mark quote-mark--close">&#10078;</span>
        <span class="quote-author">&mdash; Arthur C. Clarke</span>
      </div>
      <span class="footer-copyright">&copy; 2026 Yuan Yao. Crafted with &#10024; Vibe Coding.</span>
    </footer>
  </div>
</section>

<script src="{{ '/assets/js/visitor-map.js' | relative_url }}"></script>
<script>
  initVisitorMap({ containerId: 'v-map-final', lang: 'en' });
</script>

</div>
