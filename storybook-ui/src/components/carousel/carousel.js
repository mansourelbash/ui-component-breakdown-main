/**
 * carousel.js — Bootstrap 3-style carousel behaviour (jQuery)
 *
 * HTML attributes on .carousel:
 *   data-loop="true"      — wrap around at ends
 *   data-interval="3000"  — auto-advance every N ms (0 = off)
 *
 * Custom events fired on .carousel:
 *   carousel:change  — (event, slideIndex)
 *
 * Programmatic API:
 *   window.UI.Carousel.goTo('#myCarousel', 2)
 */

(function ($) {
  'use strict';

  function getCurrent($carousel) {
    return parseInt($carousel.data('current'), 10) || 0;
  }

  function goTo($carousel, index) {
    var $slides = $carousel.find('.carousel__slide');
    var total = $slides.length;
    if (!total) return;

    var loop = String($carousel.data('loop')) === 'true';
    if (loop) {
      index = ((index % total) + total) % total;
    } else {
      index = Math.max(0, Math.min(index, total - 1));
    }

    $carousel.data('current', index);
    $carousel.find('.carousel__track').css('transform', 'translateX(-' + (index * 100) + '%)');
    $carousel.find('.carousel__dot').removeClass('is-active').eq(index).addClass('is-active');

    if (!loop) {
      $carousel.find('.carousel__btn--prev').prop('disabled', index === 0);
      $carousel.find('.carousel__btn--next').prop('disabled', index === total - 1);
    } else {
      $carousel.find('.carousel__btn').prop('disabled', false);
    }

    $carousel.trigger('carousel:change', [index]);
  }

  // Auto-play
  $(document).ready(function () {
    $('.carousel[data-interval]').each(function () {
      var $c = $(this);
      var ms = parseInt($c.data('interval'), 10);
      if (ms > 0) {
        setInterval(function () {
          var total = $c.find('.carousel__slide').length;
          goTo($c, (getCurrent($c) + 1) % total);
        }, ms);
      }
    });
  });

  $(document).on('click', '.carousel__btn--prev', function () {
    var $c = $(this).closest('.carousel');
    goTo($c, getCurrent($c) - 1);
  });

  $(document).on('click', '.carousel__btn--next', function () {
    var $c = $(this).closest('.carousel');
    goTo($c, getCurrent($c) + 1);
  });

  $(document).on('click', '.carousel__dot', function () {
    var $dots = $(this).closest('.carousel__dots');
    var $c = $dots.closest('.carousel');
    goTo($c, $dots.find('.carousel__dot').index(this));
  });

  // Programmatic API
  window.UI = window.UI || {};
  window.UI.Carousel = {
    goTo: function (selector, index) { goTo($(selector), index); },
  };

})(window.jQuery || window.$);
