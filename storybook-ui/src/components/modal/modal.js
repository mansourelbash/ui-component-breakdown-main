/**
 * modal.js — Bootstrap 3-style modal behaviour (jQuery)
 *
 * Open:   <button data-toggle="modal" data-target="#myModal">Open</button>
 * Close:  <button data-dismiss="modal"> or .modal__close button
 * Static: add data-backdrop="static" on .modal to prevent close-on-backdrop
 *
 * Custom events fired on .modal element:
 *   modal:open   — after modal opens
 *   modal:close  — after modal closes
 *
 * Programmatic API:
 *   window.UI.Modal.open('#myModal')
 *   window.UI.Modal.close('#myModal')
 */

(function ($) {
  'use strict';

  function openModal($modal) {
    if ($modal.hasClass('is-open')) return;

    // Create backdrop
    var $backdrop = $('<div class="modal-backdrop"></div>').insertBefore($modal);
    $('body').addClass('modal-open');

    // Force reflow for transition
    $backdrop[0].offsetHeight;
    $backdrop.addClass('is-visible');
    $modal.addClass('is-open');
    $modal.trigger('modal:open');

    // Move focus into modal
    setTimeout(function () {
      $modal.find('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])').first().trigger('focus');
    }, 150);
  }

  function closeModal($modal) {
    if (!$modal.hasClass('is-open')) return;

    var $backdrop = $modal.prev('.modal-backdrop');
    $modal.removeClass('is-open');
    $backdrop.removeClass('is-visible');

    setTimeout(function () {
      $backdrop.remove();
      $('body').removeClass('modal-open');
    }, 200);

    $modal.trigger('modal:close');
  }

  // Open via data-toggle="modal"
  $(document).on('click', '[data-toggle="modal"]', function () {
    var target = $(this).data('target');
    if (target) openModal($(target));
  });

  // Close via × button or data-dismiss="modal"
  $(document).on('click', '.modal__close, [data-dismiss="modal"]', function () {
    closeModal($(this).closest('.modal'));
  });

  // Close on backdrop click (unless data-backdrop="static")
  $(document).on('click', '.modal-backdrop', function () {
    var $modal = $(this).next('.modal');
    if (String($modal.data('backdrop')) !== 'static') {
      closeModal($modal);
    }
  });

  // Close on Escape
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      var $open = $('.modal.is-open');
      if ($open.length && String($open.data('backdrop')) !== 'static') {
        closeModal($open.last());
      }
    }
  });

  // Programmatic API
  window.UI = window.UI || {};
  window.UI.Modal = {
    open:  function (selector) { openModal($(selector)); },
    close: function (selector) { closeModal($(selector)); },
  };

})(window.jQuery || window.$);
