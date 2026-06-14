/*
 * scroll.js
 * Controls:
 *   1. Scroll to top on every page load
 *   2. Floating Book Now button visibility
 *   3. Page fade-in transition on load
 *   4. Smooth fade-out before navigating to another page
 */

document.addEventListener('DOMContentLoaded', function() {

  /* ========================================================
     1. FORCE SCROLL TO TOP ON EVERY PAGE LOAD
     Browsers remember scroll position — this overrides that.
     ======================================================== */
  window.scrollTo({ top: 0, behavior: 'instant' });

  /* Also handle the browser back/forward cache */
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  });


  /* ========================================================
     2. PAGE FADE-IN ON LOAD
     Body starts invisible (opacity 0) via CSS.
     We fade it in after DOM is ready.
     ======================================================== */
  document.body.classList.add('page--loaded');


  /* ========================================================
     3. FLOATING BOOK NOW BUTTON
     Lower threshold on inner pages, higher on home page.
     ======================================================== */
  var floatingBtn = document.getElementById('floating-btn');
  if (floatingBtn) {
    var isHomePage = document.querySelector('.hero') !== null;
    var THRESHOLD  = isHomePage ? 300 : 100;

    function handleFloatingBtn() {
      if (window.scrollY > THRESHOLD) {
        floatingBtn.classList.add('floating-btn--visible');
      } else {
        floatingBtn.classList.remove('floating-btn--visible');
      }
    }

    handleFloatingBtn();
    window.addEventListener('scroll', handleFloatingBtn, { passive: true });
  }


  /* ========================================================
     4. SMOOTH FADE-OUT BEFORE PAGE NAVIGATION
     When any internal page link is clicked, fade out the
     current page before the browser navigates away.
     Only applies to same-site page links (not anchors,
     not external links, not Book Now buttons).
     ======================================================== */
  /* Event delegation — one handler on the document reads the href
     from the ACTUAL clicked link at click time. This avoids the
     closure bug where a delayed navigation could use the wrong
     link's href and send the user to the wrong page. */
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href');

    /* Only intercept internal page links */
    if (!href) return;
    if (href.charAt(0) === '#') return;           /* anchor — skip */
    if (href.startsWith('http')) return;          /* external — skip */
    if (href.startsWith('mailto')) return;        /* email — skip */
    if (href.startsWith('tel')) return;           /* phone — skip */
    if (href.indexOf('#') !== -1 && href.indexOf('index') !== 0) return; /* on-page anchor — skip */

    e.preventDefault();

    /* Capture the target now, from the clicked link itself */
    var target = href;

    /* Fade out body, then navigate */
    document.body.classList.remove('page--loaded');
    setTimeout(function() {
      window.location.href = target;
    }, 280);
  });

});