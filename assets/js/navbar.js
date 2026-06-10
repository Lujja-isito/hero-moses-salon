/*
 * navbar.js
 * Handles:
 *   1. Scroll shadow on navbar
 *   2. Active nav link via IntersectionObserver (home page only)
 *   3. Hamburger menu toggle on mobile
 *   4. Smooth scroll for anchor links only (#hours)
 *      Page links are handled by scroll.js (fade transition)
 */

document.addEventListener('DOMContentLoaded', function() {

  var navbar    = document.getElementById('navbar');
  var hamburger = document.getElementById('hamburger');
  var allLinks  = document.querySelectorAll('.navbar__link');
  var sections  = document.querySelectorAll('section[id]');


  /* 1. SCROLL SHADOW */
  function handleScroll() {
    if (window.scrollY > 10) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });


  /* 2. ACTIVE LINK via IntersectionObserver — home page only */
  if (sections.length > 0) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute('id');
        allLinks.forEach(function(link) { link.classList.remove('active'); });
        var match = document.querySelector('.navbar__link[data-section="' + id + '"]');
        if (match) match.classList.add('active');
      });
    }, { rootMargin: '-72px 0px 0px 0px', threshold: 0.35 });

    sections.forEach(function(section) { observer.observe(section); });
  }


  /* 3. HAMBURGER TOGGLE */
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      var isOpen = navbar.classList.toggle('navbar--menu-open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }


  /* 4. ANCHOR LINKS ONLY — smooth scroll for #hours etc
     Page links (services.html, gallery.html etc) are handled
     by scroll.js which adds the fade-out transition */
  allLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = link.getAttribute('href');

      /* Only handle pure anchor links here */
      if (href && href.charAt(0) === '#') {
        e.preventDefault();
        var target = document.getElementById(href.slice(1));
        if (target) {
          var offset = navbar.offsetHeight;
          var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
        /* Close mobile menu */
        navbar.classList.remove('navbar--menu-open');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      } else {
        /* Page link — just close mobile menu, let scroll.js handle fade */
        navbar.classList.remove('navbar--menu-open');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

});