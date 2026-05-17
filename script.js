/* ============================================
   HARSHIT MISHRA — CINEMATIC PORTFOLIO
   script.js
   ============================================ */

'use strict';

/* ======================================================
   1. LOADING SCREEN
   ====================================================== */
(function initLoader() {
  const loader  = document.getElementById('loader');
  const bar     = document.getElementById('loaderBar');
  let  progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        triggerHeroEntrance();
      }, 500);
    }
    bar.style.width = progress + '%';
  }, 120);

  document.body.style.overflow = 'hidden';
})();

/* ======================================================
   2. HERO ENTRANCE
   ====================================================== */
function triggerHeroEntrance() {
  const lines = document.querySelectorAll('.name-line');
  lines.forEach((line, i) => {
    setTimeout(() => line.classList.add('visible'), i * 250);
  });

  const role = document.querySelector('.hero-role');
  const cta  = document.querySelector('.hero-cta');

  setTimeout(() => role && role.classList.add('visible'), 700);
  setTimeout(() => cta  && cta.classList.add('visible'), 1100);

  setTimeout(startTyping, 900);
}

/* ======================================================
   3. TYPING ANIMATION
   ====================================================== */
const ROLES = [
  'Frontend Developer',
  'Enthusiastic Coder',
  'Fast Learner',
  'Tech Explorer',
  'Creative Thinker',
];

function startTyping() {
  const el       = document.getElementById('typedText');
  if (!el) return;

  let roleIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;

  function tick() {
    const current = ROLES[roleIndex];

    if (isDeleting) {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex  = (roleIndex + 1) % ROLES.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 45);
    } else {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(tick, 1800);
        return;
      }
      setTimeout(tick, 90);
    }
  }

  tick();
}

/* ======================================================
   4. CURSOR GLOW
   ====================================================== */
(function initCursor() {
  const glow = document.getElementById('cursorGlow');
  const dot  = document.getElementById('cursorDot');
  if (!glow || !dot) return;

  let mouseX = 0, mouseY = 0;
  let dotX   = 0, dotY   = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.left = mouseX + 'px';
    glow.style.top  = mouseY + 'px';
  });

  function animateDot() {
    dotX += (mouseX - dotX) * 0.15;
    dotY += (mouseY - dotY) * 0.15;
    dot.style.left = dotX + 'px';
    dot.style.top  = dotY + 'px';
    requestAnimationFrame(animateDot);
  }
  animateDot();

  // Expand glow on hover over clickables
  const clickables = document.querySelectorAll(
    'a, button, .skill-card, .edu-card, .about-card, .cta-btn'
  );
  clickables.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      glow.style.width  = '500px';
      glow.style.height = '500px';
    });
    el.addEventListener('mouseleave', () => {
      glow.style.width  = '300px';
      glow.style.height = '300px';
    });
  });

  // Hide default cursor
  document.documentElement.style.cursor = 'none';
})();

/* ======================================================
   5. STAR / PARTICLE CANVAS
   ====================================================== */
(function initStars() {
  const canvas = document.getElementById('starCanvas');
  if (!canvas) return;
  const ctx    = canvas.getContext('2d');

  let W, H, stars = [], nebulae = [];

  const COUNT       = 200;
  const NEBULA_COUNT = 4;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildStars();
    buildNebulae();
  }

  function buildStars() {
    stars = [];
    for (let i = 0; i < COUNT; i++) {
      stars.push({
        x:       Math.random() * W,
        y:       Math.random() * H,
        r:       Math.random() * 1.5 + 0.3,
        alpha:   Math.random() * 0.6 + 0.2,
        speed:   Math.random() * 0.12 + 0.02,
        twinkle: Math.random() * Math.PI * 2,
      });
    }
  }

  function buildNebulae() {
    nebulae = [];
    const colors = [
      'rgba(76,29,149,',
      'rgba(139,58,58,',
      'rgba(124,58,237,',
      'rgba(192,80,77,',
    ];
    for (let i = 0; i < NEBULA_COUNT; i++) {
      nebulae.push({
        x:     Math.random() * W,
        y:     Math.random() * H,
        rx:    Math.random() * 300 + 200,
        ry:    Math.random() * 200 + 150,
        alpha: Math.random() * 0.06 + 0.02,
        color: colors[i % colors.length],
        drift: Math.random() * 0.002 + 0.001,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  function drawNebulae(t) {
    nebulae.forEach((n) => {
      const alpha = n.alpha * (0.7 + 0.3 * Math.sin(t * n.drift + n.phase));
      const grad  = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, Math.max(n.rx, n.ry));
      grad.addColorStop(0,   n.color + alpha + ')');
      grad.addColorStop(1,   n.color + '0)');
      ctx.save();
      ctx.scale(1, n.ry / n.rx);
      ctx.beginPath();
      ctx.arc(n.x, n.y * (n.rx / n.ry), n.rx, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    });
  }

  function drawStars(t) {
    stars.forEach((s) => {
      s.twinkle += 0.015;
      const a = s.alpha * (0.5 + 0.5 * Math.sin(s.twinkle));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fill();

      // Slow drift downward (parallax feel)
      s.y += s.speed * 0.15;
      if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
    });
  }

  let frame = 0;
  function render() {
    frame++;
    ctx.clearRect(0, 0, W, H);
    drawNebulae(frame);
    drawStars(frame);
    requestAnimationFrame(render);
  }

  window.addEventListener('resize', resize);
  resize();
  render();
})();

/* ======================================================
   6. SCROLL REVEAL
   ====================================================== */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        const delay = parseInt(el.dataset.delay || '0', 10);
        setTimeout(() => el.classList.add('visible'), delay);
        observer.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach((el) => observer.observe(el));
})();

/* ======================================================
   7. SMOOTH SCROLL FOR ANCHOR LINKS
   ====================================================== */
document.querySelectorAll('.scroll-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ======================================================
   8. MOTIVATIONAL QUOTES
   ====================================================== */
const QUOTES = [
  { text: 'The best way to predict the future is to invent it.', author: 'Alan Kay' },
  { text: 'Code is like humor. When you have to explain it, it is bad.', author: 'Cory House' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' },
  { text: 'Every expert was once a beginner. Keep pushing.', author: 'Anonymous' },
  { text: 'Programs must be written for people to read, and only incidentally for machines to execute.', author: 'Harold Abelson' },
  { text: 'In the middle of every difficulty lies opportunity.', author: 'Albert Einstein' },
  { text: 'Your most unhappy customers are your greatest source of learning.', author: 'Bill Gates' },
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { text: 'Consistency is the true foundation of trust.', author: 'Roy T. Bennett' },
  { text: 'Stay hungry, stay foolish.', author: 'Steve Jobs' },
  { text: 'Don\'t watch the clock; do what it does. Keep going.', author: 'Sam Levenson' },
  { text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
  { text: 'Imagination is more important than knowledge.', author: 'Albert Einstein' },
  { text: 'Believe you can and you\'re halfway there.', author: 'Theodore Roosevelt' },
];

let lastQuoteIndex = -1;

function getRandomQuote() {
  let index;
  do { index = Math.floor(Math.random() * QUOTES.length); }
  while (index === lastQuoteIndex);
  lastQuoteIndex = index;
  return QUOTES[index];
}

function renderQuote(animate) {
  const textEl   = document.getElementById('quoteText');
  const authorEl = document.getElementById('quoteAuthor');
  if (!textEl || !authorEl) return;

  const q = getRandomQuote();

  if (animate) {
    textEl.style.transition   = 'opacity 0.4s ease, transform 0.4s ease';
    authorEl.style.transition = 'opacity 0.4s ease';
    textEl.style.opacity    = '0';
    textEl.style.transform  = 'translateY(12px)';
    authorEl.style.opacity  = '0';

    setTimeout(() => {
      textEl.textContent   = '"' + q.text + '"';
      authorEl.textContent = '— ' + q.author;

      textEl.style.opacity    = '1';
      textEl.style.transform  = 'translateY(0)';
      authorEl.style.opacity  = '1';
    }, 400);
  } else {
    textEl.textContent   = '"' + q.text + '"';
    authorEl.textContent = '— ' + q.author;
  }
}

// Initial render
renderQuote(false);

// Refresh button
const refreshBtn = document.getElementById('quoteRefresh');
if (refreshBtn) {
  refreshBtn.addEventListener('click', () => renderQuote(true));
}

/* ======================================================
   9. MUSIC TOGGLE
   ====================================================== */
(function initMusic() {
  const btn   = document.getElementById('musicBtn');
  const icon  = document.getElementById('musicIcon');
  const audio = document.getElementById('bgMusic');
  if (!btn || !audio) return;

  // Volume: subtle ambient
  audio.volume = 0.15;

  let playing = false;

  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      icon.className = 'fas fa-music';
      btn.classList.remove('playing');
      playing = false;
    } else {
      audio.play().catch(() => {
        // Autoplay policy: silently fail, user triggered so should work
      });
      icon.className = 'fas fa-pause';
      btn.classList.add('playing');
      playing = true;
    }
  });
})();

/* ======================================================
   10. PARALLAX HERO NAME ON SCROLL
   ====================================================== */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Subtle parallax on hero text
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
    heroContent.style.opacity   = Math.max(0, 1 - scrollY / (window.innerHeight * 0.7));
  }

  // Portfolio text bg parallax
  const portText = document.querySelector('.portfolio-text-bg');
  if (portText) {
    const section = document.getElementById('portfolio-section');
    if (section) {
      const rect   = section.getBoundingClientRect();
      const offset = -rect.top * 0.15;
      portText.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;
    }
  }
});

/* ======================================================
   11. EDUCATION CARD HOVER TILT
   ====================================================== */
document.querySelectorAll('.edu-card, .about-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);

    const tiltX = -dy * 6;
    const tiltY =  dx * 6;

    card.style.transform = `translateY(-8px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform  = '';
    card.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
  });
});

/* ======================================================
   12. SKILL CARD MAGNETIC EFFECT
   ====================================================== */
document.querySelectorAll('.skill-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const dx   = e.clientX - (rect.left + rect.width  / 2);
    const dy   = e.clientY - (rect.top  + rect.height / 2);
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxD = 80;

    if (dist < maxD) {
      const strength = (1 - dist / maxD) * 8;
      card.style.transform  = `translateY(-10px) scale(1.05) translate(${dx * strength / dist}px, ${dy * strength / dist}px)`;
      card.style.transition = 'transform 0.1s ease';
    }
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform  = '';
    card.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
  });
});

/* ======================================================
   13. SECTION AMBIENT GLOW ON SCROLL INTO VIEW
   ====================================================== */
(function initSectionGlow() {
  const sections = document.querySelectorAll('section');
  const body     = document.body;

  const palettes = {
    hero:              'rgba(76,29,149,0.3)',
    'portfolio-section': 'rgba(192,80,77,0.2)',
    about:             'rgba(124,58,237,0.2)',
    education:         'rgba(139,58,58,0.2)',
    skills:            'rgba(76,29,149,0.25)',
    quote:             'rgba(124,58,237,0.15)',
    footer:            'rgba(7,5,16,1)',
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id    = entry.target.id;
          const color = palettes[id] || 'transparent';
          body.style.setProperty('--section-color', color);
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => observer.observe(s));
})();

/* ======================================================
   14. LOADING SCREEN LETTER GLITCH ON HM TEXT
   ====================================================== */
(function glitchLoader() {
  const el = document.querySelector('.loader-logo-text');
  if (!el) return;

  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
  const orig  = el.textContent;

  const glitch = () => {
    let count = 0;
    const interval = setInterval(() => {
      el.textContent = orig
        .split('')
        .map((c, i) => {
          if (count > 8 || Math.random() > 0.3) return c;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');
      count++;
      if (count > 12) {
        clearInterval(interval);
        el.textContent = orig;
      }
    }, 60);
  };

  setInterval(glitch, 1800);
})();
