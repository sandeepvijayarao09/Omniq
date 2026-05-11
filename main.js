/* ===========================
   OMNIQ — MAIN JS
   =========================== */

// ── Nav scroll effect ──────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Mobile hamburger ───────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav__links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav__links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Role tabs ──────────────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('tab-btn--active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('tab-panel--active'));

    btn.classList.add('tab-btn--active');
    document.getElementById(`tab-${tab}`).classList.add('tab-panel--active');
  });
});

// ── Intersection observer for fade-in-up ──────────────────────────
const fadeEls = document.querySelectorAll(
  '.problem-card, .feature-card, .flow__step, .testimonial-card, .pricing-card, .result-item, .security-point'
);

fadeEls.forEach(el => el.classList.add('fade-in-up'));

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ── Terminal typing animation ──────────────────────────────────────
const queries = [
  { q: 'What is our current hiring plan for Q3?',      r: 'Based on the Q3 roadmap (indexed Jul 12): Engineering is targeting 8 hires — 3 senior backend, 2 ML, 2 frontend, 1 DevOps. Budget approved. Recruiter briefed.' },
  { q: 'Summarize last quarter\'s top support issues',  r: 'Top 3 issues Q2: (1) SSO timeout — 34% of tickets, patch released Jun 18. (2) Export limits — 28%, roadmap item Q3. (3) Mobile perf — 18%, fix shipped Jul 2.' },
  { q: 'What are our onboarding steps for new hires?', r: 'Onboarding (indexed from HR handbook): Week 1 — IT setup, org overview, team intro. Week 2 — Role training. Week 3-4 — Shadowing + first project. All steps logged.' },
];

let qIdx = 0;
const typedQuery    = document.getElementById('typed-query');
const typedResponse = document.getElementById('typed-response');

function typeString(el, text, speed, cb) {
  el.textContent = '';
  let i = 0;
  const tick = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) { clearInterval(tick); if (cb) setTimeout(cb, 600); }
  }, speed);
}

function runTerminal() {
  const { q, r } = queries[qIdx % queries.length];
  qIdx++;
  typedResponse.textContent = '';
  typeString(typedQuery, q, 38, () => {
    typeString(typedResponse, r, 16, () => {
      setTimeout(runTerminal, 3200);
    });
  });
}

// Start after a short delay so the page can settle
setTimeout(runTerminal, 1400);

// ── Contact form ───────────────────────────────────────────────────
const form    = document.getElementById('contact-form');
const success = document.getElementById('form-success');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name     = document.getElementById('name').value;
  const company  = document.getElementById('company').value;
  const email    = document.getElementById('email').value;
  const size     = document.getElementById('size').value;
  const interest = document.getElementById('interest').value;
  const message  = document.getElementById('message').value;

  const subject = encodeURIComponent(`Omniq Demo Request — ${company}`);
  const body    = encodeURIComponent(
    `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nTeam Size: ${size}\nInterest: ${interest}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:sandeepvijayarao09@gmail.com?subject=${subject}&body=${body}`;

  form.style.display    = 'none';
  success.style.display = 'block';
});

// ── Smooth scroll for all anchor links ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Highlight active nav link on scroll ───────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--c-text)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));
