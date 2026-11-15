(function () {
  'use strict';
  if (window.beccaGlobeInstalled) return;
  window.beccaGlobeInstalled = true;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const precision = matchMedia('(hover: hover) and (pointer: fine)');
  const compact = matchMedia('(max-width: 760px)');
  let dispose = function () {};

  function setup() {
    dispose();
    const globe = document.querySelector('[data-topographic-globe]');
    if (!globe) return;
    const surface = globe.querySelector('.topographic-globe__surface');
    const canvas = globe.querySelector('canvas');
    const context = canvas.getContext('2d');
    if (!context) { globe.hidden = true; return; }
    const markers = Array.from(globe.querySelectorAll('.topographic-globe__marker'));
    const hint = globe.querySelector('.topographic-globe__hint');
    const listeners = [];
    let frame = 0;
    let visible = false;
    let previous = 0;
    let yaw = -0.3;
    let pitch = 0.18;
    let tilt = 0;
    let targetTilt = 0;
    let velocity = 0;
    let dragging = false;
    let hovering = false;
    let focused = false;
    let lastX = 0;
    let lastY = 0;
    let dead = false;
    const canMove = () => !reduced.matches && precision.matches && !compact.matches;
    const canRun = () => !dead && globe.isConnected && visible && !document.hidden && canMove();
    const coordinates = [[0.45, -0.85], [-0.38, 0.05], [0.62, 1.15], [-0.65, 2.0], [0.05, -2.45], [-0.15, 2.95]];

    function point(latitude, longitude, radius) {
      return [radius * Math.cos(latitude) * Math.sin(longitude), radius * Math.sin(latitude), radius * Math.cos(latitude) * Math.cos(longitude)];
    }

    // Precompute the contours; each frame only rotates and projects these points.
    const contours = [];
    for (let band = -12; band <= 12; band++) {
      const latitude = band / 12 * 1.47;
      const ring = [];
      for (let step = 0; step <= 144; step++) {
        const longitude = step / 144 * Math.PI * 2;
        const wave = 0.045 * Math.sin(longitude * 3 + latitude * 4) + 0.025 * Math.sin(longitude * 5 - latitude * 3);
        const warped = latitude + wave * Math.cos(latitude);
        ring.push(point(warped, longitude, 1 + 0.018 * Math.sin(longitude * 4 + latitude * 5)));
      }
      contours.push(ring);
    }

    function draw() {
      const cy = Math.cos(yaw + tilt), sy = Math.sin(yaw + tilt);
      const cp = Math.cos(pitch), sp = Math.sin(pitch);
      function project(p) {
        const x = p[0] * cy + p[2] * sy;
        const z = p[2] * cy - p[0] * sy;
        return [140 + x * 116, 140 - (p[1] * cp - z * sp) * 116, z * cp + p[1] * sp];
      }
      context.clearRect(0, 0, 280, 280);
      context.beginPath();
      context.arc(140, 140, 117, 0, Math.PI * 2);
      context.fillStyle = 'rgba(232, 224, 212, 0.3)';
      context.fill();
      context.strokeStyle = 'rgba(196, 146, 59, 0.25)';
      context.lineWidth = 0.7;
      context.stroke();
      const projected = contours.map(ring => ring.map(project));
      [false, true].forEach(front => {
        context.strokeStyle = front ? 'rgba(156, 112, 43, 0.65)' : 'rgba(156, 112, 43, 0.14)';
        context.lineWidth = front ? 0.85 : 0.65;
        context.beginPath();
        projected.forEach(ring => {
          let connected = false;
          ring.forEach(p => {
            if ((p[2] >= 0) !== front) { connected = false; return; }
            if (connected) context.lineTo(p[0], p[1]);
            else context.moveTo(p[0], p[1]);
            connected = true;
          });
        });
        context.stroke();
      });
      markers.forEach((marker, index) => {
        const coordinate = coordinates[index % coordinates.length];
        const p = project(point(coordinate[0], coordinate[1], 1.02));
        marker.style.left = (p[0] / 280 * 100).toFixed(3) + '%';
        marker.style.top = (p[1] / 280 * 100).toFixed(3) + '%';
        marker.style.opacity = p[2] < 0 ? '0.45' : '1';
        marker.dataset.side = p[0] < 85 ? 'left' : p[0] > 195 ? 'right' : 'center';
      });
    }

    function tick(time) {
      frame = 0;
      if (!canRun()) return;
      const delta = previous ? Math.min(time - previous, 50) / 1000 : 0;
      previous = time;
      if (!dragging && !focused) {
        if (!hovering) yaw += delta * Math.PI * 2 / 60;
        yaw += velocity * delta;
        velocity *= Math.exp(-delta * 5);
      }
      tilt += (targetTilt - tilt) * (1 - Math.exp(-delta * 8));
      draw();
      if (!focused) frame = requestAnimationFrame(tick);
    }

    function restart() {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      globe.classList.toggle('is-interactive', canMove());
      hint.textContent = canMove() ? 'Drag to turn · Select a point to explore' : 'Select a point to explore';
      draw();
      if (canRun() && !focused) frame = requestAnimationFrame(tick);
    }

    function listen(target, type, callback, options) {
      target.addEventListener(type, callback, options);
      listeners.push(() => target.removeEventListener(type, callback, options));
    }

    listen(surface, 'pointerenter', () => { hovering = true; });
    listen(surface, 'pointerleave', () => { hovering = false; targetTilt = 0; });
    listen(surface, 'pointerdown', event => {
      if (!canMove() || event.button !== 0 || event.target.closest('a')) return;
      dragging = true;
      velocity = 0;
      lastX = event.clientX;
      lastY = event.clientY;
      surface.setPointerCapture(event.pointerId);
      globe.classList.add('is-dragging');
      event.preventDefault();
    });
    listen(surface, 'pointermove', event => {
      if (!canMove()) return;
      if (dragging) {
        const distance = event.clientX - lastX;
        yaw += distance * 0.009;
        pitch = Math.max(-0.65, Math.min(0.65, pitch + (event.clientY - lastY) * 0.004));
        velocity = Math.max(-0.8, Math.min(0.8, distance * 0.06));
        lastX = event.clientX;
        lastY = event.clientY;
      } else {
        const bounds = surface.getBoundingClientRect();
        targetTilt = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.18;
      }
    }, { passive: true });
    function release() { dragging = false; globe.classList.remove('is-dragging'); }
    listen(surface, 'pointerup', release);
    listen(surface, 'pointercancel', release);
    listen(surface, 'lostpointercapture', release);
    listen(surface, 'focusin', () => { focused = true; restart(); });
    listen(surface, 'focusout', event => {
      if (surface.contains(event.relatedTarget)) return;
      focused = false;
      restart();
    });
    listen(reduced, 'change', restart);
    listen(precision, 'change', restart);
    listen(compact, 'change', restart);
    listen(document, 'visibilitychange', restart);

    const resize = new ResizeObserver(() => {
      const size = surface.clientWidth;
      if (!size) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(size * ratio);
      canvas.height = Math.round(size * ratio);
      context.setTransform(canvas.width / 280, 0, 0, canvas.height / 280, 0, 0);
      draw();
    });
    resize.observe(surface);
    const visibility = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      restart();
    });
    visibility.observe(surface);
    restart();
    dispose = () => {
      dead = true;
      cancelAnimationFrame(frame);
      listeners.forEach(remove => remove());
      resize.disconnect();
      visibility.disconnect();
    };
  }

  setup();
  document.addEventListener('hy-push-state-load', setup);
})();
