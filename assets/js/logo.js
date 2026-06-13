/*
 * ============================================================
 * logo.js
 * ============================================================
 * Injects the Hero Moses Hair Salon logo into every location.
 *
 * The logo is now served from CLOUDINARY (fast CDN, optimized
 * per device) instead of a local PNG. Each placement requests
 * the image already resized to its display size, so the navbar
 * never downloads a huge file for a 38px slot.
 * ============================================================
 */

/* Base Cloudinary image (without transforms) */
var LOGO_BASE = 'https://res.cloudinary.com/dkfutt4jr/image/upload';
var LOGO_ID   = 'v1781345172/kfwdez5yd5v9zlgrhf1j.jpg';

/* Build a Cloudinary URL sized for the slot.
   - w_,h_,c_fill  → deliver exactly the pixels needed (retina x2)
   - f_auto,q_auto → lightest modern format, auto quality
   - dpr_2.0       → crisp on high-resolution phone screens */
function logoUrl(size) {
  var px = size * 2; /* 2x for retina sharpness */
  return LOGO_BASE
    + '/f_auto,q_auto,dpr_2.0,w_' + px + ',h_' + px + ',c_fill'
    + '/' + LOGO_ID;
}

function buildLogo(size) {
  return '\n    <img\n      src="' + logoUrl(size) + '"\n'
    + '      alt="Hero Moses Hair Salon logo"\n'
    + '      class="logo-img"\n'
    + '      width="' + size + '"\n'
    + '      height="' + size + '"\n'
    + '      loading="eager"\n'
    + '      fetchpriority="high"\n'
    + '    />\n  ';
}

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
    if (el) el.innerHTML = buildLogo(slot.size);
  });
}

document.addEventListener('DOMContentLoaded', injectLogos);