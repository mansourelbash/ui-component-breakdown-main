/**
 * navbar.js — Responsive Navbar (jQuery / Bootstrap 3 style)
 *
 * Behaviours:
 *   - .navbar__toggler click  → opens/closes .navbar__collapse on mobile
 *   - Click outside navbar    → closes open collapse
 *
 * Custom events fired on .navbar:
 *   navbar:open   — collapse opened
 *   navbar:close  — collapse closed
 *
 * Programmatic API:
 *   window.UI.Navbar.open('#myNav')
 *   window.UI.Navbar.close('#myNav')
 */
(function ($) {
  'use strict';

  function openNav($navbar) {
    $navbar.find('.navbar__toggler').addClass('is-open').attr('aria-expanded', 'true');
    $navbar.find('.navbar__collapse').addClass('is-open');
    $navbar.trigger('navbar:open');
  }

  function closeNav($navbar) {
    $navbar.find('.navbar__toggler').removeClass('is-open').attr('aria-expanded', 'false');
    $navbar.find('.navbar__collapse').removeClass('is-open');
    $navbar.trigger('navbar:close');
  }

  // Hamburger click
  $(document).on('click', '.navbar__toggler', function (e) {
    e.stopPropagation();
    var $navbar = $(this).closest('.navbar');
    if ($navbar.find('.navbar__collapse').hasClass('is-open')) {
      closeNav($navbar);
    } else {
      openNav($navbar);
    }
  });

  // Close when clicking outside
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.navbar').length) {
      $('.navbar .navbar__collapse.is-open').each(function () {
        closeNav($(this).closest('.navbar'));
      });
    }
  });

  // Close on Escape
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $('.navbar .navbar__collapse.is-open').each(function () {
        closeNav($(this).closest('.navbar'));
      });
    }
  });

  // Programmatic API
  window.UI = window.UI || {};
  window.UI.Navbar = {
    open:  function (sel) { openNav($(sel)); },
    close: function (sel) { closeNav($(sel)); },
  };

})(window.jQuery || window.$);
