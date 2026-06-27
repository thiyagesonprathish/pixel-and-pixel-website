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