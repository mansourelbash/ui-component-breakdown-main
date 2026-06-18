/**
 * quantity-stepper.js
 *
 * jQuery behaviour for the QuantityStepper component.
 *
 * Usage in a plain HTML page:
 *   <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
 *   <script src="quantity-stepper.js"></script>
 *
 * HTML attributes read from the `.qty-stepper` wrapper:
 *   data-min  (default: 1)
 *   data-max  (default: 99)
 *
 * Custom events fired on the `.qty-stepper` wrapper:
 *   qty:change  →  (event, newValue)
 *
 * Programmatic API (via window.UI):
 *   window.UI.QuantityStepper.setValue(wrapperSelector, value)
 *   window.UI.QuantityStepper.getValue(wrapperSelector) → number
 */

(function ($) {
  'use strict';

  function updateButtonStates($stepper) {
    var min = parseInt($stepper.data('min'), 10) || 1;
    var max = parseInt($stepper.data('max'), 10) || 99;
    var val = parseInt($stepper.find('.qty-stepper__input').val(), 10) || min;

    $stepper.find('.qty-stepper__btn--dec').prop('disabled', val <= min);
    $stepper.find('.qty-stepper__btn--inc').prop('disabled', val >= max);
  }

  // ── Increment / Decrement ─────────────────────────────────────────────
  $(document).on('click', '.qty-stepper__btn', function () {
    var $btn = $(this);
    var $stepper = $btn.closest('.qty-stepper');
    var $input = $stepper.find('.qty-stepper__input');
    var min = parseInt($stepper.data('min'), 10) || 1;
    var max = parseInt($stepper.data('max'), 10) || 99;
    var val = parseInt($input.val(), 10) || min;

    if ($btn.hasClass('qty-stepper__btn--inc')) {
      val = Math.min(val + 1, max);
    } else if ($btn.hasClass('qty-stepper__btn--dec')) {
      val = Math.max(val - 1, min);
    }

    $input.val(val);
    updateButtonStates($stepper);
    $stepper.trigger('qty:change', [val]);
  });

  // ── Direct input typing ───────────────────────────────────────────────
  $(document).on('change', '.qty-stepper__input', function () {
    var $input = $(this);
    var $stepper = $input.closest('.qty-stepper');
    var min = parseInt($stepper.data('min'), 10) || 1;
    var max = parseInt($stepper.data('max'), 10) || 99;
    var val = parseInt($input.val(), 10);

    if (isNaN(val)) val = min;
    val = Math.min(Math.max(val, min), max);

    $input.val(val);
    updateButtonStates($stepper);
    $stepper.trigger('qty:change', [val]);
  });

  // ── Initialise button states on page load ─────────────────────────────
  $(function () {
    $('.qty-stepper').each(function () {
      updateButtonStates($(this));
    });
  });

  // ── Programmatic API ─────────────────────────────────────────────────
  window.UI = window.UI || {};
  window.UI.QuantityStepper = {
    /**
     * Set the quantity value programmatically.
     * @param {string} wrapperSelector  CSS selector for .qty-stepper
     * @param {number} value
     */
    setValue: function (wrapperSelector, value) {
      var $stepper = $(wrapperSelector);
      var min = parseInt($stepper.data('min'), 10) || 1;
      var max = parseInt($stepper.data('max'), 10) || 99;
      var clamped = Math.min(Math.max(parseInt(value, 10) || min, min), max);
      $stepper.find('.qty-stepper__input').val(clamped);
      updateButtonStates($stepper);
    },

    /**
     * Get the current quantity value.
     * @param {string} wrapperSelector
     * @returns {number}
     */
    getValue: function (wrapperSelector) {
      return parseInt($(wrapperSelector).find('.qty-stepper__input').val(), 10) || 1;
    },
  };
})(window.jQuery || window.$);
