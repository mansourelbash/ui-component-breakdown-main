/**
 * toggle-group.js
 *
 * jQuery behaviour for the ToggleGroup component.
 *
 * Usage in a plain HTML page:
 *   <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
 *   <script src="toggle-group.js"></script>
 *
 * Listens to click events on any `.toggle-btn` inside a
 * `[data-toggle-group]` wrapper and manages the active class.
 *
 * Custom events fired on the wrapper element:
 *   toggle:change  →  (event, groupName, selectedValue)
 *
 * Programmatic API (via window.UI):
 *   window.UI.ToggleGroup.setValue(wrapperSelector, value)
 *   window.UI.ToggleGroup.getValue(wrapperSelector)  → string
 */

(function ($) {
  'use strict';

  // ── Event delegation — works for dynamically inserted markup ──────────
  $(document).on('click', '[data-toggle-group] .toggle-btn', function () {
    var $btn = $(this);

    // Do nothing if the button is already active or disabled
    if ($btn.hasClass('toggle-btn--active') || $btn.prop('disabled')) return;

    var $wrapper = $btn.closest('[data-toggle-group]');
    var groupName = $wrapper.data('toggle-group');
    var value = $btn.data('value');

    // Swap active class
    $wrapper.find('.toggle-btn').removeClass('toggle-btn--active');
    $btn.addClass('toggle-btn--active');

    // Fire custom event so consuming pages can react
    $wrapper.trigger('toggle:change', [groupName, value]);
  });

  // ── Programmatic API ─────────────────────────────────────────────────
  window.UI = window.UI || {};
  window.UI.ToggleGroup = {
    /**
     * Programmatically set the active value.
     * @param {string} wrapperSelector  CSS selector for [data-toggle-group]
     * @param {string} value            The data-value to activate
     */
    setValue: function (wrapperSelector, value) {
      var $wrapper = $(wrapperSelector);
      $wrapper.find('.toggle-btn').removeClass('toggle-btn--active');
      $wrapper.find('.toggle-btn[data-value="' + value + '"]').addClass('toggle-btn--active');
    },

    /**
     * Get the currently active value.
     * @param {string} wrapperSelector  CSS selector for [data-toggle-group]
     * @returns {string|undefined}
     */
    getValue: function (wrapperSelector) {
      return $(wrapperSelector).find('.toggle-btn--active').data('value');
    },
  };
})(window.jQuery || window.$);
