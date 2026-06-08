/*
 * navbar.js
 * Handles scroll shadow, hamburger menu, and smart
 * link behaviour — page links navigate, anchor links scroll.
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
  window.addEventListener('scroll', handleScroll);


  /* 2. ACTIVE LINK via IntersectionObserver
     Only runs on pages that have sections (index.html).
     On inner pages (stylists.html etc) there are no sections
     so the observer does nothing — active class is set in HTML. */
  if (sections.length > 0) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute('id');
        allLinks.forEach(function(link) {
          link.classList.remove('active');
        });
        var match = document.querySelector('.navbar__link[data-section="' + id + '"]');
        if (match) match.classList.add('active');
      });
    }, { rootMargin: '-72px 0px 0px 0px', threshold: 0.35 });

    sections.forEach(function(section) {
      observer.observe(section);
    });
  }


  /* 3. HAMBURGER TOGGLE */
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      var isOpen = navbar.classList.toggle('navbar--menu-open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }


  /* 4. SMART LINK HANDLER
     Rule: if href starts with '#' → smooth scroll (same page anchor)
           if href contains '.html' → let browser navigate (page link)
           anything else → let browser handle normally */
  allLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {

      var href = link.getAttribute('href');

      /* ANCHOR LINK — starts with # → smooth scroll */
      if (href.charAt(0) === '#') {
        e.preventDefault();
        var target = document.getElementById(href.slice(1));
        if (target) {
          var offset = navbar.offsetHeight;
          var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
        navbar.classList.remove('navbar--menu-open');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
        return;
      }

      /* PAGE LINK — contains .html → navigate normally, just close menu */
      navbar.classList.remove('navbar--menu-open');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      /* No e.preventDefault() — browser handles the navigation */

    });
  });


});