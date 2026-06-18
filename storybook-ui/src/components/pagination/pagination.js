/**
 * pagination.js — Pagination (jQuery / Bootstrap 3 style)
 *
 * The pagination component is primarily HTML/CSS. This JS layer
 * tracks the current page state and fires events when pages change.
 *
 * Usage: add data-total-pages="N" and data-current-page="N" on .pagination
 *
 * Custom events on .pagination:
 *   pagination:change  — (event, page)
 *
 * Programmatic API:
 *   window.UI.Pagination.goTo(selector, page)
 *   window.UI.Pagination.getPage(selector) → number
 */
(function ($) {
  'use strict';

  function goTo($pag, page) {
    var total   = parseInt($pag.data('total-pages'), 10) || 1;
    var current = Math.max(1, Math.min(page, total));
    $pag.data('current-page', current);

    // Update active state
    $pag.find('.pagination__item').each(function () {
      var p = parseInt($(this).data('page'), 10);
      $(this).toggleClass('pagination__item--active', p === current);
    });

    // Update prev/next disabled state
    $pag.find('.pagination__btn--prev').prop('disabled', current <= 1);
    $pag.find('.pagination__btn--next').prop('disabled', current >= total);

    $pag.trigger('pagination:change', [current]);
  }

  // Page item click
  $(document).on('click', '.pagination__item:not([disabled]):not(.pagination__item--active)', function () {
    var $pag = $(this).closest('.pagination');
    goTo($pag, parseInt($(this).data('page'), 10));
  });

  // Prev / Next
  $(document).on('click', '.pagination__btn--prev:not([disabled])', function () {
    var $pag = $(this).closest('.pagination');
    goTo($pag, (parseInt($pag.data('current-page'), 10) || 1) - 1);
  });

  $(document).on('click', '.pagination__btn--next:not([disabled])', function () {
    var $pag = $(this).closest('.pagination');
    goTo($pag, (parseInt($pag.data('current-page'), 10) || 1) + 1);
  });

  // Programmatic API
  window.UI = window.UI || {};
  window.UI.Pagination = {
    goTo:    function (sel, page) { goTo($(sel), page); },
    getPage: function (sel) { return parseInt($(sel).data('current-page'), 10) || 1; },
  };

})(window.jQuery || window.$);
