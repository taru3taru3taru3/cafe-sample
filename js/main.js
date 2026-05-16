/* ============================================================
   ÉPURE — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ---- Elements ---- */
  const nav         = document.getElementById('nav');
  const hero        = document.getElementById('hero');
  const progressBar = document.getElementById('progress-bar');
  const hamburger   = document.querySelector('.nav-hamburger');
  const navLinks    = document.querySelector('.nav-links');


  /* ---- Hero: trigger Ken Burns on load ---- */
  window.addEventListener('load', () => {
    if (hero) hero.classList.add('loaded');
  });


  /* ---- Scroll: nav + progress bar ---- */
  function onScroll() {
    const scrollY   = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Nav transparency toggle
    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Scroll progress bar (gold, 2px top)
    if (progressBar && docHeight > 0) {
      progressBar.style.width = ((scrollY / docHeight) * 100).toFixed(2) + '%';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on init


  /* ---- Intersection Observer: fade-in elements ---- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window && fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px'
    });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: just show everything
    fadeEls.forEach(el => el.classList.add('visible'));
  }


  /* ---- Mobile hamburger toggle ---- */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close nav when a link is tapped
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close nav on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* ---- Smooth anchor scroll with offset for fixed nav ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navH   = nav ? nav.offsetHeight : 0;
      const top    = target.getBoundingClientRect().top + window.scrollY - navH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
