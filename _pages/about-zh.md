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

  <section id="intro" class="panel snap-section panel-intro" data-section-anchor="intro">
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

  <section id="achievements" class="panel snap-section panel-achievements" data-section-anchor="achievements">
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

  <section id="blog" class="panel snap-section panel-blog" data-section-anchor="blog">
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

<section id="map" class="panel snap-section panel-map" data-section-anchor="map">
  <div class="panel-inner">
    <p class="eyebrow">访客来源地</p>
    
    <div id="v-map-final" class="map-container"></div>

    <div class="map-source-note">
      数据源自 Cloudflare 近 7 日唯一访客统计（含爬虫及索引噪声，真实访客约占 1/10）。
    </div>

    <footer class="site-footer-main">
      <div class="footer-quote-block">
        <span class="quote-mark">&#10077;</span>
        <span class="quote-text">任何足够先进的技术，初看都与魔法无异。</span>
        <span class="quote-mark quote-mark--close">&#10078;</span>
        <span class="quote-author">&mdash; 亚瑟·克拉克</span>
      </div>
      <span class="footer-copyright">&copy; 2026 Yuan Yao. Crafted with &#10024; Vibe Coding.</span>
    </footer>
  </div>
</section>

<script src="{{ '/assets/js/visitor-map.js' | relative_url }}"></script>
<script>
  initVisitorMap({ containerId: 'v-map-final', lang: 'zh' });
</script>

</div>
