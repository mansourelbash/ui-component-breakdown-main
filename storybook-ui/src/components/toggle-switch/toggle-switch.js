/**
 * toggle-switch.js — Toggle Switch (jQuery / Bootstrap 3 style)
 *
 * Fires a custom event when toggled.
 *
 * Custom events on .toggle-switch:
 *   switch:change  — (event, checked)
 *
 * Programmatic API:
 *   window.UI.ToggleSwitch.setChecked(selector, true/false)
 *   window.UI.ToggleSwitch.getChecked(selector)  → boolean
 */
(function ($) {
  'use strict';

  $(document).on('change', '.toggle-switch__input', function () {
    var $input  = $(this);
    var $switch = $input.closest('.toggle-switch');
    $switch.trigger('switch:change', [$input.prop('checked')]);
  });

  // Programmatic API
  window.UI = window.UI || {};
  window.UI.ToggleSwitch = {
    setChecked: function (sel, checked) {
      var $input = $(sel).find('.toggle-switch__input');
      $input.prop('checked', !!checked).trigger('change');
    },
    getChecked: function (sel) {
      return $(sel).find('.toggle-switch__input').prop('checked');
    },
  };

})(window.jQuery || window.$);
