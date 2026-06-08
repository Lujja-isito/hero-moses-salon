/*
 * ============================================================
 * gallery.js
 * ============================================================
 * Manages the gallery section behaviour.
 *
 * SOCIAL LINKS:
 *   All social links in index.html now point to real URLs.
 *   To update them, open index.html and search for
 *   "YOUR_HANDLE" — replace with the salon's real username.
 *
 *   Instagram: https://www.instagram.com/YOUR_HANDLE
 *   Facebook:  https://www.facebook.com/YOUR_PAGE
 *   TikTok:    https://www.tiktok.com/@YOUR_HANDLE
 *
 * HOW TO ADD REAL PHOTOS (no admin panel yet):
 *   1. Save photo to: assets/images/gallery/photo1.jpg
 *   2. Open gallery.css, find the cell you want to fill
 *   3. Add:
 *        background-image: url('../images/gallery/photo1.jpg');
 *
 * FUTURE PHASE 3:
 *   Lightbox (click to view full photo) and Firebase-based
 *   photo management will be added here.
 * ============================================================
 */


document.addEventListener('DOMContentLoaded', function () {

  /* --------------------------------------------------------
     GALLERY CELLS — placeholder for future lightbox
     -------------------------------------------------------- */
  var cells = document.querySelectorAll('.gallery__cell');

  cells.forEach(function (cell, index) {
    cell.addEventListener('click', function () {
      /* Phase 3: open lightbox with full-size photo here */
    });
  });

}); /* end DOMContentLoaded */