---
layout: base
title: Becca Steinbrecher
cover: false
---

<div class="intro-block">
  <div class="intro-lead">
    <p class="intro-tagline">UX / Design Engineer &amp; Product Professional</p>
    <p class="intro-bio">
      I sit at an unusual junction: <strong>tech and nonprofits</strong>. Six years building 
      user-facing software with React, Vue, TypeScript, and Figma layered on top of a decade 
      inside mission-driven organizations: conservation, social impact, and community wellness.
    </p>
    <p class="intro-bio">
      That combination is the throughline of my work. I know what it’s like to need a polished, 
      accessible, user-first product without a big engineering org to build it, needs and constraints 
      that lean NGO teams and startups both live with. I bridge product strategy, project management, 
      design systems thinking, and hands-on frontend and design development, helping teams and missions 
      turn ideas into thoughtful, practical products with craft and pragmatism.
    </p>
    <div class="intro-cta">
      <a href="/work/" class="btn btn--outlin">See My Work</a>
      <a href="/resume/" class="btn btn--outline">View Résumé</a>
    </div>
  </div>
</div>

---

## Featured Work
{:.section-heading}

<div class="featured-work-grid">
{% assign featured = site.work | where: "featured", true | limit: 3 %}
{% for item in featured %}
  {% include work-card.html work=item %}
{% endfor %}
</div>

<div class="section-cta">
  <a href="/work/" class="btn btn--outline">All Work &rarr;</a>
</div>
