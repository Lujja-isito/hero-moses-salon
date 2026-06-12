/*
 * stylists.js
 * Select / deselect behaviour on stylist cards.
 * Uses EVENT DELEGATION on document so cards loaded
 * dynamically from Firebase work exactly like static ones.
 */

document.addEventListener('DOMContentLoaded', function () {

  var selectedCard = null;

  function selectCard(card) {
    card.classList.add('stylist-card--selected');
    var name = card.getAttribute('data-stylist');
    card.setAttribute('aria-label', name + ' selected — tap to book');
  }

  function deselectCard(card) {
    card.classList.remove('stylist-card--selected');
    var name = card.getAttribute('data-stylist');
    card.setAttribute('aria-label', 'Select ' + name);
  }

  /* One listener handles every card — present now or added later */
  document.addEventListener('click', function (e) {
    var card = e.target.closest('.stylist-card');
    if (!card) return;

    /* Book button inside the card — modal.js handles it */
    if (e.target.closest('.stylist-card__cta')) return;

    if (selectedCard === card) {
      deselectCard(card);
      selectedCard = null;
      return;
    }
    if (selectedCard) deselectCard(selectedCard);
    selectCard(card);
    selectedCard = card;
  });

  /* Keyboard accessibility */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var card = e.target.closest('.stylist-card');
    if (!card) return;
    e.preventDefault();
    card.click();
  });

});