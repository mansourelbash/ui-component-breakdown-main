/**
 * tooltip.js — Bootstrap 3-style tooltip behaviour (jQuery)
 *
 * Usage:
 *   Wrap trigger in .tooltip-wrap with data-placement and data-tooltip:
 *   <span class="tooltip-wrap" data-placement="top" data-tooltip="Hello">
 *     <button data-toggle="tooltip">Hover me</button>
 *     <span class="tooltip-bubble tooltip-bubble--top">Hello</span>
 *   </span>
 *
 * Or use data-toggle="tooltip" with data-title (auto-creates bubble).
 */

(function ($) {
  'use strict';

  function showTooltip($trigger) {
    var $wrap = $trigger.closest('.tooltip-wrap');
    if (!$wrap.length) return;
    $wrap.find('.tooltip-bubble').addClass('is-visible');
  }

  function hideTooltip($trigger) {
    var $wrap = $trigger.closest('.tooltip-wrap');
    if (!$wrap.length) return;
    $wrap.find('.tooltip-bubble').removeClass('is-visible');
  }

  $(document).on('mouseenter focusin', '[data-toggle="tooltip"]', function () {
    showTooltip($(this));
  });

  $(document).on('mouseleave focusout', '[data-toggle="tooltip"]', function () {
    hideTooltip($(this));
  });

  // Programmatic API
  window.UI = window.UI || {};
  window.UI.Tooltip = {
    show: function (selector) { showTooltip($(selector)); },
    hide: function (selector) { hideTooltip($(selector)); },
  };

})(window.jQuery || window.$);
