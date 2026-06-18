/**
 * drawer.js — Slide-in drawer (jQuery / Bootstrap 3 style)
 *
 * Open:   <button data-toggle="drawer" data-target="#myDrawer">Open</button>
 * Close:  <button data-dismiss="drawer"> inside the drawer
 *
 * Custom events on .drawer:
 *   drawer:open   — after drawer opens
 *   drawer:close  — after drawer closes
 *
 * Programmatic API:
 *   window.UI.Drawer.open('#myDrawer')
 *   window.UI.Drawer.close('#myDrawer')
 */
(function ($) {
  'use strict';

  function openDrawer($drawer) {
    if ($drawer.hasClass('is-open')) return;
    var $backdrop = $('<div class="drawer-backdrop"></div>').insertBefore($drawer);
    $('body').addClass('drawer-open');
    $backdrop[0].offsetHeight; // force reflow
    $backdrop.addClass('is-visible');
    $drawer.addClass('is-open');
    $drawer.trigger('drawer:open');
    // Store backdrop ref
    $drawer.data('backdrop', $backdrop);
  }

  function closeDrawer($drawer) {
    if (!$drawer.hasClass('is-open')) return;
    var $backdrop = $drawer.data('backdrop');
    $drawer.removeClass('is-open');
    if ($backdrop) { $backdrop.removeClass('is-visible'); }
    setTimeout(function () {
      if ($backdrop) { $backdrop.remove(); }
      $('body').removeClass('drawer-open');
    }, 300);
    $drawer.trigger('drawer:close');
  }

  // Trigger button
  $(document).on('click', '[data-toggle="drawer"]', function () {
    var target = $(this).data('target');
    if (target) openDrawer($(target));
  });

  // Close button inside drawer
  $(document).on('click', '.drawer__close, [data-dismiss="drawer"]', function () {
    closeDrawer($(this).closest('.drawer'));
  });

  // Backdrop click
  $(document).on('click', '.drawer-backdrop', function () {
    var $backdrop = $(this);
    // Find the drawer that owns this backdrop
    $('.drawer.is-open').each(function () {
      if ($(this).data('backdrop') && $(this).data('backdrop').is($backdrop)) {
        closeDrawer($(this));
      }
    });
  });

  // Escape key
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $('.drawer.is-open').last().each(function () { closeDrawer($(this)); });
    }
  });

  // Programmatic API
  window.UI = window.UI || {};
  window.UI.Drawer = {
    open:  function (sel) { openDrawer($(sel)); },
    close: function (sel) { closeDrawer($(sel)); },
  };

})(window.jQuery || window.$);
