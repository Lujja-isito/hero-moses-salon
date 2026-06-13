/*
 * modal.js
 * Handles the booking modal — open, close, validate, and
 * redirect to WhatsApp with pre-filled booking message.
 *
 * WHATSAPP NUMBER:
 * Replace BLESSING_WHATSAPP_NUMBER with Blessing's full
 * international WhatsApp number — no spaces, no + sign.
 * Example: Uganda +256 757 541 061 becomes 256757541061
 */

var WHATSAPP_NUMBER = '256757541061';

document.addEventListener('DOMContentLoaded', function() {

  /* --------------------------------------------------------
     ELEMENT REFERENCES
     -------------------------------------------------------- */
  var overlay   = document.getElementById('modal-overlay');
  var modal     = document.getElementById('modal');
  var closeBtn  = document.getElementById('modal-close');
  var form      = document.getElementById('booking-form');
  var submitBtn = document.getElementById('booking-submit');
  var openBtns  = document.querySelectorAll('.open-modal');

  var nameInput    = document.getElementById('booking-name');
  var phoneInput   = document.getElementById('booking-phone');
  var codeInput    = document.getElementById('booking-code');
  var serviceInput = document.getElementById('booking-service');
  var dateInput    = document.getElementById('booking-date');

  var errorName    = document.getElementById('error-name');
  var errorPhone   = document.getElementById('error-phone');
  var errorService = document.getElementById('error-service');
  var errorDate    = document.getElementById('error-date');

  if (!overlay || !modal) return;


  /* ========================================================
     1. OPEN MODAL
     ======================================================== */
  openBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      openModal();
    });
  });

  function openModal() {
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    /* ── DATE RESTRICTIONS ──────────────────────────────────
       Use local date methods — NOT toISOString() which uses
       UTC and can return yesterday's date in UTC+3 Uganda.
    ─────────────────────────────────────────────────────── */
    var now     = new Date();

    /* Build today's date string in YYYY-MM-DD using local time */
    var yyyy    = now.getFullYear();
    var mm      = String(now.getMonth() + 1).padStart(2, '0');
    var dd      = String(now.getDate()).padStart(2, '0');
    var todayStr = yyyy + '-' + mm + '-' + dd;

    /* Build max date string — 30 days from today */
    var maxDate  = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30);
    var maxYyyy  = maxDate.getFullYear();
    var maxMm    = String(maxDate.getMonth() + 1).padStart(2, '0');
    var maxDd    = String(maxDate.getDate()).padStart(2, '0');
    var maxStr   = maxYyyy + '-' + maxMm + '-' + maxDd;

    dateInput.setAttribute('min', todayStr);   /* blocks all past dates */
    dateInput.setAttribute('max', maxStr);     /* blocks beyond 30 days */

    setTimeout(function() {
      if (nameInput) nameInput.focus();
    }, 100);
  }


  /* ========================================================
     2. CLOSE MODAL
     ======================================================== */
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.style.display === 'flex') {
      closeModal();
    }
  });

  function closeModal() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    setTimeout(resetForm, 200);
  }


  /* ========================================================
     3. VALIDATE FORM
     ======================================================== */
  function validateForm() {
    var isValid = true;
    clearErrors();

    if (!nameInput.value.trim()) {
      showError(nameInput, errorName, 'Please enter your full name');
      isValid = false;
    }

    /* Phone: strip non-digits, drop a leading 0, check length range
       for the selected country (data-min / data-max on the option). */
    var rawPhone = phoneInput.value.replace(/\D/g, '').replace(/^0+/, '');
    if (!rawPhone) {
      showError(phoneInput, errorPhone, 'Please enter your phone number');
      isValid = false;
    } else if (codeInput) {
      var opt = codeInput.options[codeInput.selectedIndex];
      var min = parseInt(opt.getAttribute('data-min') || '6', 10);
      var max = parseInt(opt.getAttribute('data-max') || '15', 10);
      if (rawPhone.length < min || rawPhone.length > max) {
        if (min === max) {
          showError(phoneInput, errorPhone, 'That number should be ' + min + ' digits for this country');
        } else {
          showError(phoneInput, errorPhone, 'Please enter a valid phone number');
        }
        isValid = false;
      }
    }

    if (!serviceInput.value) {
      showError(serviceInput, errorService, 'Please select a service');
      isValid = false;
    }

    if (!dateInput.value) {
      showError(dateInput, errorDate, 'Please choose a preferred date');
      isValid = false;
    } else {
      /* ── SUNDAY CHECK ─────────────────────────────────────
         Parse the selected date and check if it is a Sunday.
         getDay() returns 0 for Sunday.
         We add T00:00:00 to avoid timezone shifts that can
         cause the date to roll back by one day.
      ───────────────────────────────────────────────────── */
      var selectedDate = new Date(dateInput.value + 'T00:00:00');
      if (selectedDate.getDay() === 0) {
        showError(dateInput, errorDate, 'We open at 10 AM on Sundays — please call us to confirm availability on this day');
        isValid = false;
      }
    }

    return isValid;
  }

  function showError(inputEl, errorEl, message) {
    inputEl.classList.add('input--error');
    errorEl.textContent = message;
  }

  function clearErrors() {
    [nameInput, phoneInput, serviceInput, dateInput].forEach(function(el) {
      el.classList.remove('input--error');
    });
    [errorName, errorPhone, errorService, errorDate].forEach(function(el) {
      el.textContent = '';
    });
  }

  if (codeInput) codeInput.addEventListener('change', function() {
    phoneInput.classList.remove('input--error');
    if (errorPhone) errorPhone.textContent = '';
  });

  [nameInput, phoneInput, serviceInput, dateInput].forEach(function(input) {
    input.addEventListener('input', function() {
      input.classList.remove('input--error');
    });
    input.addEventListener('change', function() {
      input.classList.remove('input--error');
    });
  });


  /* ========================================================
     4. FORM SUBMIT — validate then open WhatsApp
     ======================================================== */
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      if (!validateForm()) return;

      /* Build the WhatsApp message with all booking details */
      var name    = nameInput.value.trim();
      /* Build full international number: code + digits (no leading 0) */
      var phoneDigits = phoneInput.value.replace(/\D/g, '').replace(/^0+/, '');
      var countryCode = codeInput ? codeInput.value : '';
      var phone = (countryCode ? countryCode + ' ' : '') + phoneDigits;
      var service = serviceInput.options[serviceInput.selectedIndex].text;
      var date    = dateInput.value;

      /* Format the date nicely — from YYYY-MM-DD to DD/MM/YYYY */
      var dateParts   = date.split('-');
      var formattedDate = dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0];

      /* Compose the message Blessing will receive */
      var message =
        'Hello Hero Moses Hair Salon!' +
        '\n\nI would like to book an appointment:' +
        '\n\nName: ' + name +
        '\nPhone: ' + phone +
        '\nService: ' + service +
        '\nPreferred Date: ' + formattedDate +
        '\n\nPlease confirm my booking. Thank you!';

      /* Encode the message for a URL */
      var encodedMessage = encodeURIComponent(message);

      /* Build the WhatsApp URL */
      var whatsappURL = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodedMessage;

      /* Show confirmation on the button */
      submitBtn.textContent = 'Redirecting to WhatsApp...';
      submitBtn.classList.add('modal__submit--confirmed');
      submitBtn.disabled = true;

      /* Open WhatsApp after a short delay so client sees the feedback */
      setTimeout(function() {
        window.open(whatsappURL, '_blank');
        closeModal();
      }, 800);

    });
  }


  /* ========================================================
     5. RESET FORM
     ======================================================== */
  function resetForm() {
    form.reset();
    clearErrors();
    submitBtn.textContent = 'CONFIRM BOOKING';
    submitBtn.classList.remove('modal__submit--confirmed');
    submitBtn.disabled = false;
  }


});