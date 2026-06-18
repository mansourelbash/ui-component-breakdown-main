/**
 * calendar.js — Interactive calendar (jQuery / Bootstrap 3 style)
 *
 * HTML structure required:
 *   <div class="calendar" data-view-year="2026" data-view-month="5">
 *     <div class="calendar__header">
 *       <button class="calendar__nav calendar__nav--prev">‹</button>
 *       <span class="calendar__month-year"></span>
 *       <button class="calendar__nav calendar__nav--next">›</button>
 *     </div>
 *     <div class="calendar__weekdays">…</div>
 *     <div class="calendar__grid">…</div>   ← filled by JS
 *     <div class="calendar__footer">
 *       <button class="calendar__today-btn">Today</button>
 *       <span class="calendar__selected-display"></span>
 *     </div>
 *   </div>
 *
 * Custom events on .calendar:
 *   calendar:select  — (event, isoString, { day, month, year })
 *
 * Programmatic API:
 *   window.UI.Calendar.goTo('#cal', year, month)
 *   window.UI.Calendar.getSelected('#cal')  → { d, m, y } or null
 */
(function ($) {
  'use strict';

  var MONTHS    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var WEEKDAYS  = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
  function firstDay(y, m)    { return new Date(y, m, 1).getDay(); }

  function pad(n) { return String(n).padStart(2, '0'); }

  function buildGrid(y, m, selected) {
    var today    = new Date();
    var days     = daysInMonth(y, m);
    var start    = firstDay(y, m);
    var prevDays = daysInMonth(y, m - 1);
    var cells    = [];

    // Prev-month padding
    for (var p = start - 1; p >= 0; p--) {
      var rm = m - 1, ry = y;
      if (rm < 0) { rm = 11; ry--; }
      cells.push({ d: prevDays - p, m: rm, y: ry, other: true });
    }
    // Current month
    for (var d = 1; d <= days; d++) {
      cells.push({ d: d, m: m, y: y, other: false });
    }
    // Next-month padding
    var remaining = 42 - cells.length;
    for (var n = 1; n <= remaining; n++) {
      var nm = m + 1, ny = y;
      if (nm > 11) { nm = 0; ny++; }
      cells.push({ d: n, m: nm, y: ny, other: true });
    }

    return cells.map(function (c) {
      var isToday    = c.d === today.getDate() && c.m === today.getMonth() && c.y === today.getFullYear();
      var isSelected = selected && c.d === selected.d && c.m === selected.m && c.y === selected.y;
      var cls = ['calendar__day'];
      if (c.other)    cls.push('calendar__day--other-month');
      if (isToday)    cls.push('calendar__day--today');
      if (isSelected) cls.push('calendar__day--selected');
      return '<button class="' + cls.join(' ') + '" data-d="' + c.d + '" data-m="' + c.m + '" data-y="' + c.y + '">' + c.d + '</button>';
    }).join('');
  }

  function refreshCalendar($cal) {
    var y   = parseInt($cal.data('view-year'),  10);
    var m   = parseInt($cal.data('view-month'), 10);
    var sel = $cal.data('cal-selected') || null;

    $cal.find('.calendar__grid').html(buildGrid(y, m, sel));
    $cal.find('.calendar__month-year').text(MONTHS[m] + ' ' + y);

    var $display = $cal.find('.calendar__selected-display');
    if ($display.length) {
      $display.text(sel ? (sel.y + '-' + pad(sel.m + 1) + '-' + pad(sel.d)) : 'No date selected');
    }
  }

  // Initialise all calendars on page load
  $(function () { $('.calendar').each(function () { refreshCalendar($(this)); }); });

  // Prev / Next navigation
  $(document).on('click', '.calendar__nav--prev', function () {
    var $cal = $(this).closest('.calendar');
    var y = parseInt($cal.data('view-year'), 10);
    var m = parseInt($cal.data('view-month'), 10) - 1;
    if (m < 0)  { m = 11; y--; }
    $cal.data('view-year', y).data('view-month', m);
    refreshCalendar($cal);
  });

  $(document).on('click', '.calendar__nav--next', function () {
    var $cal = $(this).closest('.calendar');
    var y = parseInt($cal.data('view-year'), 10);
    var m = parseInt($cal.data('view-month'), 10) + 1;
    if (m > 11) { m = 0; y++; }
    $cal.data('view-year', y).data('view-month', m);
    refreshCalendar($cal);
  });

  // Day selection
  $(document).on('click', '.calendar__day:not(.calendar__day--disabled)', function () {
    var $btn = $(this);
    var $cal = $btn.closest('.calendar');
    var sel = { d: parseInt($btn.data('d')), m: parseInt($btn.data('m')), y: parseInt($btn.data('y')) };
    $cal.data('cal-selected', sel);
    refreshCalendar($cal);
    var iso = sel.y + '-' + pad(sel.m + 1) + '-' + pad(sel.d);
    $cal.trigger('calendar:select', [iso, { day: sel.d, month: sel.m + 1, year: sel.y }]);
  });

  // Today button
  $(document).on('click', '.calendar__today-btn', function () {
    var $cal = $(this).closest('.calendar');
    var now  = new Date();
    $cal.data('view-year', now.getFullYear()).data('view-month', now.getMonth());
    refreshCalendar($cal);
  });

  // Programmatic API
  window.UI = window.UI || {};
  window.UI.Calendar = {
    goTo: function (sel, y, m) {
      var $cal = $(sel);
      $cal.data('view-year', y).data('view-month', m);
      refreshCalendar($cal);
    },
    getSelected: function (sel) { return $(sel).data('cal-selected') || null; },
  };

})(window.jQuery || window.$);
