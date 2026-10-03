// ── NAV SCROLL ────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── SCROLL REVEAL ─────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// ── FAQ ACCORDION ─────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ── CAROUSEL ──────────────────────────────────────────
const carousel = document.getElementById('carousel');
const cards = carousel.querySelectorAll('.dep-card');
const dots = document.querySelectorAll('.dot');
const total = cards.length;
let current = 0;

function getVisible() {
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth + 24;
  carousel.style.transform = `translateX(-${current * cardWidth}px)`;
  carousel.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

document.getElementById('prev').addEventListener('click', () => {
  const visible = getVisible();
  const maxScroll = total - visible;
  current = current > 0 ? current - 1 : maxScroll;
  updateCarousel();
});

document.getElementById('next').addEventListener('click', () => {
  const visible = getVisible();
  const maxScroll = total - visible;
  current = current < maxScroll ? current + 1 : 0;
  updateCarousel();
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => { current = i; updateCarousel(); });
});

window.addEventListener('resize', updateCarousel);
