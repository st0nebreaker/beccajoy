---
layout: base
title: Becca Joy
cover: false
image:
  path: /assets/img/beccajoy-social-preview.jpg
description: >
  Designer, engineer, and project manager connecting tech and mission-driven causes.
---

<div class="intro-block">
  <div class="intro-lead">
    <img src="{{ '/assets/img/becca-portrait.png' | relative_url }}" alt="Becca Steinbrecher" class="intro-portrait">
    <p class="intro-tagline">Product + UX Engineer, Product Designer, Project Manager</p>
    <p class="intro-bio">
      I bring five years of experience designing and building software, alongside a decade working across conservation, social impact, and community wellness.
    </p>
    <p class="intro-bio">
      I’m passionate about creating meaningful technology that enhances people’s lives. I bring together product strategy, project management, design, and front-end development to turn ideas into thoughtful, accessible, and engaging products. I enjoy working across disciplines, solving creative problems, and building polished, user-first experiences, whether on a lean team or within a larger organization.
    </p>
    <p class="intro-bio">
      I’m open to opportunities at the intersection of technology, lifestyle, culture, and community, where I can do good work with good people for a good goal.
    </p>
    <div class="intro-cta">
      <a href="/work/" class="btn btn--outline">Case Studies</a>
      <a href="/resume/" class="btn btn--outline">Resume</a>
    </div>
  </div>
</div>

---

## Featured Case Studies
{:.section-heading}

<div class="featured-work-grid">
  {% assign featured = site.work | where: "featured", true | sort: "featured_order" %}
  {% for item in featured limit:3 %}
    {% include work-card.html work=item %}
  {% endfor %}
</div>

<div class="section-cta">
  <a href="/work/" class="btn btn--outline">All Case Studies &rarr;</a>
</div>
