// ============================================================================
// particles.js — Subtle floating code particles on the background canvas
// Lightweight, no dependencies. Draws small syntax-like glyphs drifting upward.
// ============================================================================

(function () {
  'use strict';

  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const glyphs = [
    '{', '}', '()', '=>', '//', '/**/', '[]', '<>', '&&', '||',
    'fn', 'let', 'const', 'if', 'for', '...', '===', '!=',
    'def', 'class', 'import', 'async', 'await', 'return',
    '#', '##', '---', 'yaml:', 'true', 'null', '0x', '/**',
    'git', 'push', 'deploy', 'build', 'test', 'run',
  ];

  const colors = [
    'rgba(139, 92, 246, 0.12)',   // purple
    'rgba(88, 166, 255, 0.10)',   // blue
    'rgba(126, 231, 135, 0.08)',  // green
    'rgba(210, 168, 255, 0.10)',  // light purple
    'rgba(255, 123, 114, 0.06)', // red
  ];

  let particles = [];
  let animId;
  const PARTICLE_COUNT = 35;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      speed: 0.15 + Math.random() * 0.35,
      drift: (Math.random() - 0.5) * 0.3,
      glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 10 + Math.random() * 6,
      opacity: 0.3 + Math.random() * 0.5,
      rotation: (Math.random() - 0.5) * 0.3,
    };
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height; // spread initially
      particles.push(p);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.y -= p.speed;
      p.x += p.drift;
      p.rotation += 0.001;

      // Reset if off-screen
      if (p.y < -30 || p.x < -50 || p.x > canvas.width + 50) {
        particles[i] = createParticle();
        return;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.font = `${p.size}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fillText(p.glyph, 0, 0);
      ctx.restore();
    });

    animId = requestAnimationFrame(draw);
  }

  // Reduced motion support
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduced.matches) {
    canvas.style.display = 'none';
  } else {
    init();
    draw();
    window.addEventListener('resize', () => {
      resize();
    });
  }
})();
