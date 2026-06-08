document.addEventListener('DOMContentLoaded', function() {

  var today = new Date().getDay();
  var allRows = document.querySelectorAll('.hours-row');

  if (!allRows.length) return;

  allRows.forEach(function(row) {
    var rowDay = parseInt(row.getAttribute('data-day'), 10);
    var dot = row.querySelector('.hours-row__dot');
    var tag = row.querySelector('.hours-row__today-tag');

    if (rowDay === today) {
      row.classList.add('hours-row--today');
    } else {
      if (dot) dot.style.display = 'none';
      if (tag) tag.style.display = 'none';
    }
  });

});