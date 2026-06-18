/**
 * collapse.js — Bootstrap 3-style collapse / accordion behaviour (jQuery)
 *
 * Usage:
 *   <div class="collapse-group" data-accordion="true">
 *     <div class="collapse-item is-open">
 *       <div class="collapse-item__header">…</div>
 *       <div class="collapse-item__body">…</div>
 *     </div>
 *   </div>
 *
 * Custom events fired on .collapse-item:
 *   collapse:open   — panel opened
 *   collapse:close  — panel closed
 *
 * Programmatic API:
 *   window.UI.Collapse.open('#myItem')
 *   window.UI.Collapse.close('#myItem')
 *   window.UI.Collapse.toggle('#myItem')
 */

(function ($) {
  'use strict';

  $(document).on('click keydown', '.collapse-item__header', function (e) {
    if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
    if (e.type === 'keydown') e.preventDefault();

    var $item  = $(this).closest('.collapse-item');
    var $group = $item.closest('.collapse-group');
    var accordion = String($group.data('accordion')) === 'true';
    var isOpen = $item.hasClass('is-open');

    if (accordion) {
      $group.find('.collapse-item.is-open').not($item).each(function () {
        $(this).removeClass('is-open').trigger('collapse:close');
      });
    }

    if (isOpen) {
      $item.removeClass('is-open').trigger('collapse:close');
    } else {
      $item.addClass('is-open').trigger('collapse:open');
    }
  });

  // Programmatic API
  window.UI = window.UI || {};
  window.UI.Collapse = {
    open:   function (sel) { $(sel).addClass('is-open').trigger('collapse:open'); },
    close:  function (sel) { $(sel).removeClass('is-open').trigger('collapse:close'); },
    toggle: function (sel) {
      var $el = $(sel);
      if ($el.hasClass('is-open')) {
        $el.removeClass('is-open').trigger('collapse:close');
      } else {
        $el.addClass('is-open').trigger('collapse:open');
      }
    },
  };

})(window.jQuery || window.$);
