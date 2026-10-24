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
    <p class="intro-tagline">Product Designer, UX / Front End Engineer, Project Manager</p>
    <p class="intro-bio">
      I connect tech and mission-driven work. I bring six years designing and 
      building software and a decade across conservation, social impact, 
      and community wellness. I’m looking for opportunities with mission-driven organizations or products and services rooted in lifestyle, culture, and community.
    </p>
    <p class="intro-bio">
      I know what it’s like to need a polished, accessible, user-first product 
      without a big team to make it happen. Lean NGOs and startups share 
      those constraints, making creative problem-solving essential. I bring 
      product strategy, project management, design, and front end development 
      to help teams turn ideas into thoughtful, practical, and engaging products.
    </p>
    <div class="intro-cta">
      <a href="/work/" class="btn btn--outline">See My Work</a>
      <a href="/resume/" class="btn btn--outline">View Resume</a>
    </div>
  </div>
</div>

---

## Featured Work
{:.section-heading}

<div class="featured-work-grid">
  {% assign featured = site.work | where: "featured", true | sort: "featured_order" %}
  {% for item in featured limit:3 %}
    {% include work-card.html work=item %}
  {% endfor %}
</div>

<div class="section-cta">
  <a href="/work/" class="btn btn--outline">All Work &rarr;</a>
</div>
