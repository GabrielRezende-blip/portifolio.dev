/* =============================================
   GABRIEL TEIXEIRA — PORTFOLIO
   script.js
   ============================================= */

/* ---------- TEMA CLARO / ESCURO ---------- */
// Aplica o tema salvo ANTES da página renderizar (evita flash)
(function () {
  if (localStorage.getItem('gt-theme') === 'light') {
    document.body.classList.add('light');
  }
})();

// Conecta o botão DEPOIS que o HTML carregou
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('tb');

  // Atualiza o ícone conforme o tema atual
  btn.textContent = document.body.classList.contains('light') ? '🌙' : '☀️';

  btn.addEventListener('click', function () {
    document.body.classList.toggle('light');
    var isLight = document.body.classList.contains('light');
    localStorage.setItem('gt-theme', isLight ? 'light' : 'dark');
    btn.textContent = isLight ? '🌙' : '☀️';
  });
});

/* ---------- CURSOR PERSONALIZADO ---------- */
var cur  = document.getElementById('cur');
var dot  = document.getElementById('dot');
var ring = document.getElementById('ring');
var mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', function (e) {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});

/* Anel segue com atraso suave */
(function loop() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();

/* Cursor expande ao passar em elementos interativos */
document.querySelectorAll('a, button, .sc2, .pj').forEach(function (el) {
  el.addEventListener('mouseenter', function () {
    cur.style.width   = '32px';
    cur.style.height  = '32px';
    ring.style.width  = '64px';
    ring.style.height = '64px';
  });
  el.addEventListener('mouseleave', function () {
    cur.style.width   = '22px';
    cur.style.height  = '22px';
    ring.style.width  = '46px';
    ring.style.height = '46px';
  });
});

/* ---------- NAVBAR — FUNDO AO ROLAR ---------- */
var nav = document.getElementById('nav');

window.addEventListener('scroll', function () {
  nav.classList[window.scrollY > 60 ? 'add' : 'remove']('sc');
});

/* ---------- SCROLL SUAVE NOS ATALHOS DO HEADER ---------- */
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var id = this.getAttribute('href');
    if (id === '#') return;
    var target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---------- ANIMAÇÃO DE REVEAL AO ROLAR ---------- */
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.rv').forEach(function (el) {
  revealObserver.observe(el);
});

/* ---------- CONTADORES ANIMADOS ---------- */
var counted = false;

var statsObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting && !counted) {
      counted = true;

      document.querySelectorAll('[data-to]').forEach(function (el) {
        var target = parseInt(el.dataset.to);
        var suffix = target === 100 ? '%' : '+';
        var t0 = performance.now();

        (function tick(now) {
          var progress = Math.min((now - t0) / 1400, 1);
          var ease     = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(ease * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }
  });
}, { threshold: 0.5 });

var statsBar = document.querySelector('.sb');
if (statsBar) statsObserver.observe(statsBar);