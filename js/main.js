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