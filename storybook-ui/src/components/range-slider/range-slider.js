/**
 * range-slider.js — Dual range slider (jQuery / Bootstrap 3 style)
 *
 * HTML structure:
 *   <div class="range-slider" data-min="0" data-max="100">
 *     <span class="range-slider__label">Price Range</span>
 *     <div class="range-slider__body">
 *       <input type="number" class="range-slider__number range-slider__number--min" />
 *       <div class="range-slider__track-wrap">
 *         <div class="range-slider__track"></div>
 *         <div class="range-slider__fill"></div>
 *         <input type="range" class="range-slider__range range-slider__range--min" />
 *         <input type="range" class="range-slider__range range-slider__range--max" />
 *       </div>
 *       <input type="number" class="range-slider__number range-slider__number--max" />
 *     </div>
 *     <div class="range-slider__hint">
 *       <span class="range-slider__hint-min"></span>
 *       <span class="range-slider__hint-max"></span>
 *     </div>
 *   </div>
 *
 * Custom events on .range-slider:
 *   range:change  — (event, { min, max })
 */
(function ($) {
  'use strict';

  function updateFill($rs) {
    var absMin  = parseFloat($rs.data('min')) || 0;
    var absMax  = parseFloat($rs.data('max')) || 100;
    var minVal  = parseFloat($rs.find('.range-slider__range--min').val());
    var maxVal  = parseFloat($rs.find('.range-slider__range--max').val());
    var range   = absMax - absMin;

    var leftPct  = ((minVal - absMin) / range) * 100;
    var rightPct = ((absMax - maxVal) / range) * 100;

    $rs.find('.range-slider__fill').css({ left: leftPct + '%', right: rightPct + '%' });
    $rs.find('.range-slider__number--min').val(minVal);
    $rs.find('.range-slider__number--max').val(maxVal);
    $rs.find('.range-slider__hint-min').text(minVal);
    $rs.find('.range-slider__hint-max').text(maxVal);
  }

  // Range thumb moved
  $(document).on('input', '.range-slider__range', function () {
    var $range = $(this);
    var $rs    = $range.closest('.range-slider');
    var minVal = parseFloat($rs.find('.range-slider__range--min').val());
    var maxVal = parseFloat($rs.find('.range-slider__range--max').val());

    // Prevent min > max overlap
    if ($range.hasClass('range-slider__range--min') && minVal > maxVal) {
      $range.val(maxVal); minVal = maxVal;
    }
    if ($range.hasClass('range-slider__range--max') && maxVal < minVal) {
      $range.val(minVal); maxVal = minVal;
    }

    // When both are at max, bring max to top
    var absMax = parseFloat($rs.data('max')) || 100;
    $rs.find('.range-slider__range--max').toggleClass('is-top', minVal >= absMax);

    updateFill($rs);
    $rs.trigger('range:change', [{ min: minVal, max: maxVal }]);
  });

  // Number input changed
  $(document).on('change', '.range-slider__number', function () {
    var $num  = $(this);
    var $rs   = $num.closest('.range-slider');
    var absMin = parseFloat($rs.data('min')) || 0;
    var absMax = parseFloat($rs.data('max')) || 100;
    var val   = Math.min(Math.max(parseFloat($num.val()) || absMin, absMin), absMax);
    $num.val(val);

    if ($num.hasClass('range-slider__number--min')) {
      var maxVal = parseFloat($rs.find('.range-slider__range--max').val());
      val = Math.min(val, maxVal);
      $rs.find('.range-slider__range--min').val(val);
    } else {
      var minVal = parseFloat($rs.find('.range-slider__range--min').val());
      val = Math.max(val, minVal);
      $rs.find('.range-slider__range--max').val(val);
    }

    updateFill($rs);
    var mn = parseFloat($rs.find('.range-slider__range--min').val());
    var mx = parseFloat($rs.find('.range-slider__range--max').val());
    $rs.trigger('range:change', [{ min: mn, max: mx }]);
  });

  // Init on page load
  $(function () { $('.range-slider').each(function () { updateFill($(this)); }); });

  // Programmatic API
  window.UI = window.UI || {};
  window.UI.RangeSlider = {
    setValues: function (sel, min, max) {
      var $rs = $(sel);
      $rs.find('.range-slider__range--min').val(min);
      $rs.find('.range-slider__range--max').val(max);
      updateFill($rs);
    },
    getValues: function (sel) {
      var $rs = $(sel);
      return {
        min: parseFloat($rs.find('.range-slider__range--min').val()),
        max: parseFloat($rs.find('.range-slider__range--max').val()),
      };
    },
  };

})(window.jQuery || window.$);
