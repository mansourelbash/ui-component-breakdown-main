/**
 * datepicker.js — Datepicker popup (jQuery / Bootstrap 3 style)
 *
 * Usage:
 *   <div class="datepicker">
 *     <label class="datepicker__label">Start Date</label>
 *     <div class="datepicker__wrap">
 *       <input type="text" class="datepicker__input" placeholder="Select date" readonly />
 *       <span class="datepicker__icon">…svg…</span>
 *     </div>
 *     <div class="datepicker__panel">
 *       <!-- .calendar element here — handled by calendar.js -->
 *     </div>
 *   </div>
 *
 * Custom events on .datepicker:
 *   datepicker:select  — (event, isoString)
 */
(function ($) {
  'use strict';

  function openPicker($dp) {
    $dp.addClass('is-open');
    $dp.find('.datepicker__panel').addClass('is-open');
  }

  function closePicker($dp) {
    $dp.removeClass('is-open');
    $dp.find('.datepicker__panel').removeClass('is-open');
  }

  // Toggle on input or icon click
  $(document).on('click', '.datepicker__input, .datepicker__icon', function (e) {
    e.stopPropagation();
    var $dp = $(this).closest('.datepicker');
    if ($dp.hasClass('is-open')) { closePicker($dp); } else { openPicker($dp); }
  });

  // Close on outside click
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.datepicker').length) {
      $('.datepicker.is-open').each(function () { closePicker($(this)); });
    }
  });

  // When calendar selects a date → sync to input + close
  $(document).on('calendar:select', '.datepicker .calendar', function (e, iso) {
    var $dp = $(this).closest('.datepicker');
    $dp.find('.datepicker__input').val(iso);
    closePicker($dp);
    $dp.trigger('datepicker:select', [iso]);
  });

  // Close on Escape
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') { $('.datepicker.is-open').each(function () { closePicker($(this)); }); }
  });

  // Programmatic API
  window.UI = window.UI || {};
  window.UI.Datepicker = {
    open:       function (sel) { openPicker($(sel)); },
    close:      function (sel) { closePicker($(sel)); },
    getValue:   function (sel) { return $(sel).find('.datepicker__input').val(); },
    setValue:   function (sel, iso) { $(sel).find('.datepicker__input').val(iso); },
  };

})(window.jQuery || window.$);
