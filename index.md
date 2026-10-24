---
layout: base
title: Becca Steinbrecher
cover: false
---

<div class="intro-block">
  <div class="intro-lead">
    <p class="intro-tagline">Product Designer &amp; UX / Frontend Engineer &amp; Project Manager</p>
    <p class="intro-bio">
      I sit at an unusual junction: <strong>tech and nonprofits</strong>.
      I bring six years of experience designing and building user-facing
      software with React, Vue, TypeScript, and Figma, alongside a decade
      in mission-driven organizations spanning conservation, social impact,
      and community wellness.
    </p>
    <p class="intro-bio">
      That combination is the throughline of my work. I know what it’s like to need a polished, accessible, user-first product without a big
      engineering org to build it. Lean NGO and startup teams share those needs and constraints. I bring together product strategy, project
      management, interface design, and frontend development to help teams turn ideas into thoughtful, practical products.
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
