/**
 * input.js — Input field enhancements (jQuery)
 *
 * Features:
 *   - Live character counter  — add data-maxlength="N" + .input-field__counter sibling
 *   - Required validation     — on blur, marks error/success if data-required is set
 */

(function ($) {
  'use strict';

  // Character counter
  $(document).on('input', '.input-field__input[data-maxlength]', function () {
    var $input = $(this);
    var max = parseInt($input.data('maxlength'), 10);
    var current = $input.val().length;
    var $counter = $input.closest('.input-field').find('.input-field__counter');
    if ($counter.length) {
      $counter.text(current + ' / ' + max);
      $counter.css('color', current > max ? '#DC2626' : '');
    }
  });

  // Required validation on blur
  $(document).on('blur', '.input-field__input[data-required]', function () {
    var $input = $(this);
    var $field = $input.closest('.input-field');
    if (!$input.val().trim()) {
      $field.removeClass('input-field--success').addClass('input-field--error');
      var $helper = $field.find('.input-field__helper');
      if (!$helper.length) {
        $field.append('<span class="input-field__helper">This field is required.</span>');
      } else {
        $helper.text('This field is required.');
      }
    } else {
      $field.removeClass('input-field--error').addClass('input-field--success');
    }
  });

})(window.jQuery || window.$);
