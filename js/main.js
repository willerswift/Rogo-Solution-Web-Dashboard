/* ====================================================
   ROGO SOLUTIONS — main.js
   Interactions: Nav scroll, reveal, mobile menu
   ==================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky nav shadow on scroll ── */
  const nav = document.getElementById('main-nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Scroll reveal with IntersectionObserver ── */
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // stagger delay for sibling elements that are also being revealed
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        const idx = Array.from(siblings).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));

  /* ── Mobile hamburger menu ── */
  const hamburger = document.getElementById('hamburger-btn');
  const navLinks  = document.getElementById('nav-links');

  hamburger?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('nav-open');
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : ''; // Prevent scroll when menu open
  });

  /* ── Mobile dropdown toggle ── */
  document.querySelectorAll('.has-dropdown > a').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        toggle.parentElement.classList.toggle('active');
      }
    });
  });

  /* ── Close mobile menu on link click ── */
  navLinks?.querySelectorAll('a:not(.has-dropdown > a)').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('nav-open');
      hamburger?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  /* ── Nav active link ── */
  document.querySelectorAll('.nav-links > li > a').forEach(a => {
    a.addEventListener('click', e => {
      document.querySelectorAll('.nav-links > li > a').forEach(x => x.classList.remove('active'));
      a.classList.add('active');
    });
  });

  /* ── CTA button hooks ── */
  document.querySelectorAll('.btn-primary, .nav-cta').forEach(b => {
    b.addEventListener('click', () => {
      console.log('CTA clicked:', b.textContent.trim());
    });
  });

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
