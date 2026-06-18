/**
 * textarea.js — Textarea enhancements (jQuery)
 *
 * Features:
 *   - Auto-resize      — add class .textarea-field__textarea--auto-resize
 *   - Character counter — add data-maxlength="N" + .textarea-field__counter sibling
 *   - Required validation on blur
 */

(function ($) {
  'use strict';

  function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }

  // Auto-resize
  $(document).on('input', '.textarea-field__textarea--auto-resize', function () {
    autoResize(this);
  });

  // Character counter
  $(document).on('input', '.textarea-field__textarea[data-maxlength]', function () {
    var $ta = $(this);
    var max = parseInt($ta.data('maxlength'), 10);
    var current = $ta.val().length;
    var $counter = $ta.closest('.textarea-field').find('.textarea-field__counter');
    if ($counter.length) {
      $counter.text(current + ' / ' + max);
      $counter.css('color', current > max ? '#DC2626' : '');
    }
  });

  // Required validation on blur
  $(document).on('blur', '.textarea-field__textarea[data-required]', function () {
    var $ta = $(this);
    var $field = $ta.closest('.textarea-field');
    if (!$ta.val().trim()) {
      $field.removeClass('textarea-field--success').addClass('textarea-field--error');
      var $helper = $field.find('.textarea-field__helper');
      if (!$helper.length) {
        $field.find('.textarea-field__footer').prepend('<span class="textarea-field__helper">This field is required.</span>');
      } else {
        $helper.text('This field is required.');
      }
    } else {
      $field.removeClass('textarea-field--error').addClass('textarea-field--success');
    }
  });

})(window.jQuery || window.$);
