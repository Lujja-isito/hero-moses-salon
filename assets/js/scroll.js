/*
 * scroll.js
 * Controls the floating Book Now button visibility.
 *
 * On index.html  — button appears after 300px (full hero section)
 * On inner pages — button appears after 100px (shorter pages)
 */

document.addEventListener('DOMContentLoaded', function() {

  var floatingBtn = document.getElementById('floating-btn');
  if (!floatingBtn) return;

  /* Use a lower threshold on inner pages (no full-screen hero) */
  var isHomePage = document.querySelector('.hero') !== null;
  var THRESHOLD  = isHomePage ? 300 : 100;

  function handleFloatingBtn() {
    if (window.scrollY > THRESHOLD) {
      floatingBtn.classList.add('floating-btn--visible');
    } else {
      floatingBtn.classList.remove('floating-btn--visible');
    }
  }

  /* Run once on load — shows button immediately if already scrolled */
  handleFloatingBtn();

  window.addEventListener('scroll', handleFloatingBtn, { passive: true });

});