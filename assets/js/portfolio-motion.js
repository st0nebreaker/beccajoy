(function () {
  'use strict';
  if (window.beccaPortfolioMotionInstalled) return;
  window.beccaPortfolioMotionInstalled = true;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const precision = window.matchMedia('(hover: hover) and (pointer: fine)');
  const sidebar = document.getElementById('_sidebar');
  let observer;

  function observeHeading() {
    if (observer) observer.disconnect();
    const heading = document.getElementById('featured-case-studies');
    if (!heading) return;
    heading.classList.remove('ink-pending', 'ink-revealed');
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('ink-revealed');
        entry.target.classList.remove('ink-pending');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    heading.classList.add('ink-pending');
    observer.observe(heading);
  }

  observeHeading();
  document.addEventListener('hy-push-state-load', observeHeading);
  reduced.addEventListener('change', observeHeading);
  if (!sidebar) return;

  let active = false;
  let frame = 0;
  let exitTimer = 0;
  let previousTime = 0;
  let bounds;
  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;

  function position() {
    sidebar.style.setProperty('--pointer-x', x.toFixed(2) + 'px');
    sidebar.style.setProperty('--pointer-y', y.toFixed(2) + 'px');
  }

  function follow(time) {
    frame = 0;
    if (!active) return;
    const delta = previousTime ? Math.min(time - previousTime, 64) : 1000 / 60;
    previousTime = time;
    // Equivalent to 0.12 per frame at 60Hz, consistent on faster displays.
    const amount = 1 - Math.pow(0.88, delta / (1000 / 60));
    x += (targetX - x) * amount;
    y += (targetY - y) * amount;
    if (Math.abs(targetX - x) < 0.1 && Math.abs(targetY - y) < 0.1) {
      x = targetX;
      y = targetY;
      previousTime = 0;
    } else {
      frame = requestAnimationFrame(follow);
    }
    position();
  }

  function linkIntensity(event) {
    sidebar.classList.toggle('is-focus-link', !!event.target.closest('a, button'));
  }

  function enter(event) {
    if (!precision.matches || reduced.matches || event.pointerType === 'touch') return;
    clearTimeout(exitTimer);
    bounds = sidebar.getBoundingClientRect();
    x = targetX = event.clientX - bounds.left;
    y = targetY = event.clientY - bounds.top;
    position();
    active = true;
    sidebar.classList.remove('is-focus-leaving');
    sidebar.classList.add('is-focus-active');
    linkIntensity(event);
  }

  function leave() {
    active = false;
    cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
    sidebar.classList.remove('is-focus-active', 'is-focus-link');
    sidebar.classList.add('is-focus-leaving');
    clearTimeout(exitTimer);
    exitTimer = setTimeout(function () {
      sidebar.classList.remove('is-focus-leaving');
    }, 750);
  }

  sidebar.addEventListener('pointerenter', enter);
  sidebar.addEventListener('pointermove', function (event) {
    if (!active) return;
    targetX = event.clientX - bounds.left;
    targetY = event.clientY - bounds.top;
    linkIntensity(event);
    if (!frame) frame = requestAnimationFrame(follow);
  }, { passive: true });
  sidebar.addEventListener('pointerover', function (event) {
    if (active) linkIntensity(event);
  });
  sidebar.addEventListener('pointerleave', leave);
  sidebar.addEventListener('pointercancel', leave);
  precision.addEventListener('change', leave);
  reduced.addEventListener('change', leave);
  window.addEventListener('resize', leave, { passive: true });
  window.addEventListener('blur', leave);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) leave();
  });
})();
