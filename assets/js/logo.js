/*
 * ============================================================
 * logo.js
 * ============================================================
 * Injects the real Hero Moses Hair Salon logo image into
 * every location it appears on the page.
 *
 * The logo is a PNG file stored at:
 *   assets/images/logo.png
 *
 * It appears in 4 places:
 *   - Navbar        (#navbar-logo)  → 38×38px
 *   - Hero panel    (#hero-logo)    → 140×140px
 *   - Modal header  (#modal-logo)   → 38×38px
 *   - Footer        (#footer-logo)  → 52×52px
 *
 * WHY USE JS TO INJECT?
 *   Keeps index.html clean. One place to update the image
 *   path if it ever changes — no hunting through HTML.
 * ============================================================
 */


/* ----------------------------------------------------------
   buildLogo(size)
   Returns an <img> tag string pointing to the real logo PNG.

   @param {number} size  - The display size in pixels (width = height)
   @returns {string}     - HTML string for the logo image
   ---------------------------------------------------------- */
function buildLogo(size) {
  return `
    <img
      src="assets/images/logo.png"
      alt="Hero Moses Hair Salon logo"
      class="logo-img"
      width="${size}"
      height="${size}"
      loading="eager"
    />
  `;
}


/* ----------------------------------------------------------
   injectLogos()
   Finds all 4 logo placeholder divs and fills each one
   with the correct size logo image.
   ---------------------------------------------------------- */
function injectLogos() {

  var logoSlots = [
    { id: 'navbar-logo', size: 38  },
    { id: 'hero-logo',   size: 140 },
    { id: 'modal-logo',  size: 38  },
    { id: 'cta-logo',    size: 72  },
    { id: 'footer-logo', size: 52  },
  ];

  logoSlots.forEach(function(slot) {
    var el = document.getElementById(slot.id);
    if (el) {
      el.innerHTML = buildLogo(slot.size);
    }
  });

}


/* ----------------------------------------------------------
   Run on page load
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', injectLogos);