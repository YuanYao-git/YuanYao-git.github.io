---
permalink: /
title: "关于我"
author_profile: true
layout: modern_home
lang: zh-CN
hero_title: "姚远"
hero_subtitle: " "
fullwidth: true
body_class: about-fonts
lang_alt_url: /en/
redirect_from: 
  - /about/zh/
  - /about/zh
  - /about/zh.html
---

{% assign blog_cards = site.data.blog_cards | where: "lang", "zh" | reverse %}
{% assign blog_cta = "阅读全文 ↗" %}

<div class="panel-container">

  <section id="intro" class="panel snap-section panel-intro" data-section-anchor="intro">
    <div class="panel-inner">
      <p class="eyebrow">个人简介</p>
      <h2>把微纳制造与工程实践结合起来。</h2>
      <p>我是北京大学电子学院的博士生，主要研究方向为微纳制造与激光加工。此前，我在吉林大学机械工程专业取得了学士学位，并且在日本东北大学交换过一学年。</p>
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
        <a class="button secondary contact-flip" href="mailto:me@yaoyuan.org" aria-label="发送邮件至 me@yaoyuan.org">
          <span class="contact-flip-inner" aria-hidden="true">
            <span class="contact-flip-face contact-flip-front">联系我</span>
            <span class="contact-flip-face contact-flip-back">me@yaoyuan.org</span>
          </span>
        </a>
      </div>
    </div>
  </section>

  <section id="achievements" class="panel snap-section panel-achievements" data-section-anchor="achievements">
    <div class="panel-inner">
      <h2>学术成果</h2>
      <div class="achievement-grid">
        <article class="achievement-card">
          <img src="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/images/PE-GA.jpg" alt="图片摘要">
          <div class="achievement-body">
            <p class="badge" lang="en">Precision Engineering</p>
            <h3>石英玻璃和CFRP激光透射焊接</h3>
            <p>验证石英玻璃和CFRP通过乙醇介导激光连接的可行性，最大剪切强度>5MPa</p>
            <a class="text-link" href="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/files/Acceptedmanuscript--PE.pdf">手稿 ↗</a>
            <p class="citation">
<strong>Yao, Y.</strong>, Dong, Y., An, H., Yang, Z., Qian, Y., & Huang, H. (2026). 
Non-optical-contact and clamp-free laser transmission welding of CFRP to fused silica via ethanol-assisted interfacial modification. 
<em>Precision Engineering</em>, 102, 442–454. 
<a href="https://doi.org/10.1016/j.precisioneng.2026.07.007">https://doi.org/10.1016/j.precisioneng.2026.07.007</a>. 
© Elsevier.
</p>
          </div>
        </article>
        <article class="achievement-card">
          <img src="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/images/fig1.png" alt="激光分离示意">
          <div class="achievement-body">
            <p class="badge" lang="en">IEEJ TEEE</p>
            <h3>二维激光内损伤实现硅层分离</h3>
            <p>通过优化激光隐切路径，实现无需分离层的激光剥离，兼容传统半导体高温工艺</p>
            <a class="text-link" href="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/files/IEEJ%20Transactions%20Elec%20Engng%20-%202025%20-%20Yao%20-%20Feasibility%20Study%20of%20Layer%20Separation%20Using%202D%20Patterned%20Internal%20Laser%20Damage.pdf">论文 ↗</a>
            <p class="citation">
<strong>Yao, Y.</strong>, Vergara, A., Tang, Z., & Tanaka, S. (2026). 
Feasibility Study of Layer Separation using 2D Patterned Internal Laser Damage in Silicon. 
<em>IEEJ Transactions on Electrical and Electronic Engineering</em>, 21(1), 143–148. 
<a href="https://doi.org/10.1002/tee.70136">https://doi.org/10.1002/tee.70136</a>. 
© OA Article.
</p>
          </div>
        </article>
        <article class="achievement-card">
          <img src="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/images/fig2.png" alt="会议演讲">
          <div class="achievement-body">
            <p class="badge" lang="en">MNC2024</p>
            <h3>国际微加工与纳米技术会议口头报告</h3>
            <p>在京都 MNC2024 会议（15D-2-3）分享微纳加工方案与实验结果。</p>
            <a class="text-link" href="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/files/MNC_slides.pdf">幻灯片 ↗</a>
            <p class="citation">
第37届国际微加工与纳米技术会议（MNC 2024）口头报告，京都，日本，2024年11月15日，报告编号：15D-2-3。© 报告幻灯片由作者依据会议规定发布。
</p>
          </div>
        </article>
        <article class="achievement-card">
          <img src="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/images/fig4.png" alt="超声划痕试验机">
          <div class="achievement-body">
            <p class="badge" lang="en">Actuators</p>
            <h3>超声振动划痕试验机</h3>
            <p>提出螺纹-V 型槽复合结构与模态匹配策略，实现稳定的超声振幅传递。</p>
            <a class="text-link" href="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/files/acatuators.pdf">论文 ↗</a>
            <p class="citation">
Huang, Y., Wu, H., <strong>Yao, Y.</strong>, Zhao, H., & Huang, H. (2024). 
An Ultrasonic Vibration Scratch Tester for Studying the Scratch Characteristics of Materials under Ultrasonic Vibration Contact Status. 
<em>Actuators</em>, 13(7), 262. 
<a href="https://doi.org/10.3390/act13070262">https://doi.org/10.3390/act13070262</a>. 
© OA Article.
</p>
          </div>
        </article>
        <article class="achievement-card">
          <img src="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/images/fig3.png" alt="超声振动专利">
          <div class="achievement-body">
            <p class="badge">实用新型专利</p>
            <h3>用于振动辅助划痕测试的超声振动装置</h3>
            <p>具备稳定振幅和易调节特性，为振动辅助划痕实验提供可靠振动源。</p>
            <a class="text-link" href="https://pub-435f283cdbe44123bb9e69b79358e329.r2.dev/files/patent.pdf">专利 ↗</a>
            <p class="citation">
黄虎；<strong>姚远</strong>；黄雅明；吴浩翔。一种用于振动辅助划痕测试的超声振动装置：中国实用新型专利，CN 220649966U，2024年3月22日授权。© 国家知识产权局授权公开文件。
</p>
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
    <h2>访客来源地</h2>
    
    <div id="v-map-final" class="map-container"></div>

    <div class="map-source-note">
      数据源自 Cloudflare 近 7 日唯一访客统计（含爬虫及索引噪声，真实访客约占 1/10）。
    </div>

  </div>
</section>

<script src="{{ '/assets/js/visitor-map.bundle.js' | relative_url }}"></script>
<script>
  initVisitorMap({
    containerId: 'v-map-final',
    lang: 'zh',
    apiEndpoint: {{ site.visitor_map.cloudflare_endpoint | default: "https://api.yaoyuan.org" | jsonify }},
    gaodeKey: {{ site.visitor_map.gaode_key | default: "" | jsonify }},
    gaodeSecurityKey: {{ site.visitor_map.gaode_security_key | default: "" | jsonify }},
    gaodeServiceHost: {{ site.visitor_map.gaode_service_host | default: "" | jsonify }}
  });
</script>

</div>
