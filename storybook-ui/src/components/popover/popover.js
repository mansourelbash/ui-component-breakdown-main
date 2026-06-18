/**
 * popover.js — Popover (jQuery / Bootstrap 3 style)
 *
 * Usage:
 *   <div class="popover-wrap">
 *     <button data-toggle="popover">Trigger</button>
 *     <div class="popover-bubble popover-bubble--bottom">…</div>
 *   </div>
 *
 * Custom events on trigger:
 *   popover:show   — popover opened
 *   popover:hide   — popover closed
 */
(function ($) {
  'use strict';

  function showPopover($trigger) {
    var $bubble = $trigger.closest('.popover-wrap').find('.popover-bubble');
    $bubble.addClass('is-visible');
    $trigger.trigger('popover:show');
  }

  function hidePopover($trigger) {
    var $bubble = $trigger.closest('.popover-wrap').find('.popover-bubble');
    $bubble.removeClass('is-visible');
    $trigger.trigger('popover:hide');
  }

  // Toggle on click
  $(document).on('click', '[data-toggle="popover"]', function (e) {
    e.stopPropagation();
    var $t = $(this);
    var $bubble = $t.closest('.popover-wrap').find('.popover-bubble');
    if ($bubble.hasClass('is-visible')) { hidePopover($t); } else { showPopover($t); }
  });

  // Close button inside popover
  $(document).on('click', '.popover__close', function (e) {
    e.stopPropagation();
    var $trigger = $(this).closest('.popover-wrap').find('[data-toggle="popover"]');
    hidePopover($trigger);
  });

  // Close on outside click
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.popover-wrap').length) {
      $('.popover-bubble.is-visible').each(function () {
        var $trigger = $(this).closest('.popover-wrap').find('[data-toggle="popover"]');
        hidePopover($trigger);
      });
    }
  });

  // Close on Escape
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $('.popover-bubble.is-visible').each(function () {
        var $trigger = $(this).closest('.popover-wrap').find('[data-toggle="popover"]');
        hidePopover($trigger);
      });
    }
  });

  // Programmatic API
  window.UI = window.UI || {};
  window.UI.Popover = {
    show: function (wrapSelector) { showPopover($(wrapSelector).find('[data-toggle="popover"]')); },
    hide: function (wrapSelector) { hidePopover($(wrapSelector).find('[data-toggle="popover"]')); },
  };

})(window.jQuery || window.$);
