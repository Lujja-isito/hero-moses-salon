/*
 * ============================================================
 * stylists.js
 * ============================================================
 * Handles the select / deselect behaviour on stylist cards.
 *
 * BEHAVIOUR:
 *   - All 4 cards start looking identical (no gold border)
 *   - Clicking a card SELECTS it:
 *       → gold border appears
 *       → card lifts up
 *       → "Book with..." button slides into view
 *   - Clicking the SAME card again DESELECTS it
 *       → card returns to default look
 *       → button slides back out of view
 *   - Clicking a DIFFERENT card:
 *       → deselects the previously selected card
 *       → selects the new one
 *   - Clicking the "Book with..." button:
 *       → opens the booking modal (modal.js handles this)
 *       → does NOT deselect the card
 * ============================================================
 */


document.addEventListener('DOMContentLoaded', function () {


  /* --------------------------------------------------------
     ELEMENT REFERENCES
     -------------------------------------------------------- */
  var cards = document.querySelectorAll('.stylist-card');

  /* Track which card is currently selected.
     null means no card is selected. */
  var selectedCard = null;


  /* ========================================================
     CARD CLICK HANDLER
     ======================================================== */
  cards.forEach(function (card) {

    card.addEventListener('click', function (e) {

      /* If the click was on the "Book with..." button or
         anything inside it, let modal.js handle it.
         Do NOT toggle the card selection state. */
      var ctaBtn = e.target.closest('.stylist-card__cta');
      if (ctaBtn) return;

      /* Same card clicked again — deselect it */
      if (selectedCard === card) {
        deselectCard(card);
        selectedCard = null;
        return;
      }

      /* Different card clicked — deselect the old one first */
      if (selectedCard) {
        deselectCard(selectedCard);
      }

      /* Select the new card */
      selectCard(card);
      selectedCard = card;

    });


    /* Keyboard accessibility — Enter or Space key selects card */
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });

  });


  /* ========================================================
     SELECT a card — adds gold border + reveals CTA button
     ======================================================== */
  function selectCard(card) {
    card.classList.add('stylist-card--selected');

    /* Update aria label to reflect selected state */
    var stylistName = card.getAttribute('data-stylist');
    card.setAttribute('aria-label', stylistName + ' selected — tap to book');
  }


  /* ========================================================
     DESELECT a card — removes gold border + hides CTA button
     ======================================================== */
  function deselectCard(card) {
    card.classList.remove('stylist-card--selected');

    /* Restore original aria label */
    var stylistName = card.getAttribute('data-stylist');
    card.setAttribute('aria-label', 'Select ' + stylistName);
  }


}); /* end DOMContentLoaded */