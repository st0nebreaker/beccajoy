---
layout: base
title: Becca Steinbrecher
cover: false
---

<div class="intro-block">
  <div class="intro-lead">
    <img src="{{ '/assets/img/becca-portrait.png' | relative_url }}" alt="Becca Steinbrecher" class="intro-portrait">
    <p class="intro-tagline">Product Designer • UX / Front End Engineer • Project Manager</p>
    <p class="intro-bio">
      I sit at an unusual junction: <strong>tech and nonprofits</strong>.
      I bring six years of experience designing and building user-facing
      software with React, Vue, TypeScript, and Figma, alongside a decade
      in mission-driven organizations spanning conservation, social impact,
      and community wellness.
    </p>
    <p class="intro-bio">
      That combination is the throughline of my work. I know what it’s like to need a polished, accessible, user-first product without a big engineering team to build it. Lean NGOs and startups share those constraints, making creative problem-solving essential. I bring together product strategy, project management, interface design, and front end development to help teams turn ideas into thoughtful, practical, and engaging products.
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
{% assign featured = site.work | where: "featured", true | limit: 3 %}
{% for item in featured %}
  {% include work-card.html work=item %}
{% endfor %}
</div>

<div class="section-cta">
  <a href="/work/" class="btn btn--outline">All Work &rarr;</a>
</div>
