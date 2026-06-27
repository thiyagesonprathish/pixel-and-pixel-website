// ==========================================================================
// PIXEL & PIXEL — SHARED SITE SCRIPT
// Handles the mobile nav toggle. Same file is linked on every page.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });

    // Close the menu when a link is tapped (mobile UX nicety)
    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
      });
    });
  }
});

// ==========================================================================
// CONTACT FORM — Formspree AJAX submit
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');
  const successMsg = document.querySelector('#form-success');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.reset();
          form.style.display = 'none';
          successMsg.classList.add('show');
        } else {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
          alert('Something went wrong. Please try again or email us directly.');
        }
      } catch (error) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        alert('Something went wrong. Please try again or email us directly.');
      }
    });
  }
});

// ==========================================================================
// SCROLL REVEAL — IntersectionObserver fades/slides elements in on scroll
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');

  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
});

// ==========================================================================
// AMBIENT ORBS — single fixed background layer, visible behind whole page
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const layer = document.createElement('div');
  layer.className = 'ambient-layer';

  const orbs = [
    { size: 'size-lg', tone: 'tone-a', top: '5%',  left: '8%',  drift: 'drift-1' },
    { size: 'size-md', tone: 'tone-b', top: '15%', left: '78%', drift: 'drift-2' },
    { size: 'size-md', tone: 'tone-c', top: '45%', left: '15%', drift: 'drift-3' },
    { size: 'size-lg', tone: 'tone-b', top: '65%', left: '70%', drift: 'drift-1' },
    { size: 'size-sm', tone: 'tone-a', top: '85%', left: '40%', drift: 'drift-2' }
  ];

  orbs.forEach((o) => {
    const orb = document.createElement('div');
    orb.className = `bg-orb ${o.size} ${o.tone} ${o.drift}`;
    orb.style.top = o.top;
    orb.style.left = o.left;
    layer.appendChild(orb);
  });

  document.body.insertBefore(layer, document.body.firstChild);
});

// ==========================================================================
// CARD TILT — pricing/gap cards tilt toward cursor position
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const tiltCards = document.querySelectorAll('.pricing-card, .gap-card');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    tiltCards.forEach((card) => {
card.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * -6;
          const rotateY = ((x - centerX) / centerX) * 6;

          card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
});

// ==========================================================================
// COUNT-UP — pricing numbers animate from 0 when scrolled into view
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const priceEls = document.querySelectorAll('.pricing-price');

  priceEls.forEach((el) => {
    const match = el.textContent.match(/[\d,]+/);
    if (!match) return;

    const targetValue = parseInt(match[0].replace(/,/g, ''), 10);
    const suffix = el.querySelector('span') ? el.querySelector('span').outerHTML : '';
    const prefix = el.textContent.split(match[0])[0];

    el.dataset.target = targetValue;
    el.dataset.prefix = prefix;
    el.dataset.suffix = suffix;
  });

  if ('IntersectionObserver' in window && priceEls.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    priceEls.forEach((el) => counterObserver.observe(el));
  }

  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    const prefix = el.dataset.prefix;
    const suffix = el.dataset.suffix;
    const duration = 900;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      el.innerHTML = `${prefix}${current.toLocaleString()} ${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.innerHTML = `${prefix}${target.toLocaleString()} ${suffix}`;
      }
    }

    requestAnimationFrame(tick);
  }
});

// ==========================================================================
// TIMELINE LINE-DRAW — connector line grows on scroll, circles light up
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;

  const line = timeline; // ::before pseudo-element height is set via a CSS var
  const nums = timeline.querySelectorAll('.timeline-num');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) return;

  function updateLine() {
    const rect = timeline.getBoundingClientRect();
    const viewportH = window.innerHeight;

    // How far we've scrolled into the timeline, as a 0–1 fraction
    const scrolledPast = viewportH * 0.75 - rect.top;
    const totalHeight = rect.height;
    const progress = Math.max(0, Math.min(1, scrolledPast / totalHeight));

    timeline.style.setProperty('--line-progress', `${progress * 100}%`);

    nums.forEach((num) => {
      const numRect = num.getBoundingClientRect();
      const numCenter = numRect.top + numRect.height / 2;
      if (numCenter < viewportH * 0.75) {
        num.classList.add('is-lit');
      } else {
        num.classList.remove('is-lit');
      }
    });
  }

  window.addEventListener('scroll', () => {
    requestAnimationFrame(updateLine);
  });

  updateLine(); // run once on load in case the timeline is already in view
});
