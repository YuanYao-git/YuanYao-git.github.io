---
permalink: /en/
title: "About me"
author_profile: true
layout: modern_home
hero_title: "Yuan Yao"
hero_subtitle: "Jilin University | Micro/Nano Fabrication"
lang: en
fullwidth: true
redirect_from: 
  - /about/
  - /about.html
---

{% assign blog_cards = site.data.blog_cards | where: "lang", page.lang | slice: 0, 5 %}
{% assign blog_cta = "Read ↗" %}

<div class="panel-container">

  <section class="panel snap-section panel-intro">
    <div class="panel-inner">
      <p class="eyebrow">About</p>
      <h2>Combining micro-nano manufacturing with engineering practice.</h2>
      <p>I study Mechanical Engineering at Jilin University and focus on microfabrication and laser fabrication. I keep close ties with <a href="http://teachers.jlu.edu.cn/HuangLab">Hu Huang’s lab</a> and the <a href="http://www.mems.mech.tohoku.ac.jp">Shuji Tanaka MEMS Lab</a> at Tohoku University.</p>
      <p>In 2026 I will join <a href="http://mvdl.pku.edu.cn/en/">Prof. Xianlong Wei’s group</a> at Peking University for Ph.D. studies, continuing the same interests with a stronger experimental toolkit.</p>
      <ul class="quick-facts">
        <li><strong>Recent labs</strong><br>Hu Huang Lab (JLU) · Shuji Tanaka MEMS Lab (Tohoku).</li>
        <li><strong>Interests</strong><br>Micro/nano manufacturing · laser fabrication.</li>
        <li><strong>Next step</strong><br>Ph.D. student with Prof. Wei at PKU in 2026.</li>
      </ul>
      <div class="cta-group">
        <a class="button" href="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/files/cv_YuanYao_20250828.pdf">Download CV (PDF)</a>
        <a class="button secondary" href="mailto:yuanyao@ieee.org">Email me</a>
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
            <p class="citation">Citation: Yao, Y., Vergara, A., Tang, Z., Tanaka, S. “Feasibility Study of Layer Separation using 2D Patterned Internal Laser Damage in Silicon.” <em>IEEJ Transactions on Electrical and Electronic Engineering</em>. <a href="https://doi.org/10.1002/tee.70136">https://doi.org/10.1002/tee.70136</a>. © Open-access article reused under the IEEE OA license.</p>
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
            <p class="citation">Citation: Huang, Y.; Wu, H.; Yao, Y.; Zhao, H.; Huang, H. “An Ultrasonic Vibration Scratch Tester for Studying the Scratch Characteristics of Materials under Ultrasonic Vibration Contact Status.” <em>Actuators</em>. <a href="https://doi.org/10.3390/act13070262">https://doi.org/10.3390/act13070262</a>. © Open-access article cited per the MDPI license.</p>
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

</div>
