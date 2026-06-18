/**
 * table.js — Sortable table (jQuery / Bootstrap 3 style)
 *
 * Add data-sort="colKey" to <th> elements and class="table__th--sortable".
 * The data cells must be in the same column order.
 *
 * Custom events on .table:
 *   table:sort  — (event, { column, direction })
 */
(function ($) {
  'use strict';

  $(document).on('click', '.table__th--sortable', function () {
    var $th    = $(this);
    var $table = $th.closest('.table');
    var col    = $th.index();
    var isAsc  = $th.hasClass('table__th--asc');

    // Reset all headers
    $table.find('.table__th').removeClass('table__th--asc table__th--desc');

    // Toggle direction
    var dir = isAsc ? 'desc' : 'asc';
    $th.addClass('table__th--' + dir);

    // Sort rows
    var $tbody = $table.find('.table__body');
    var rows   = $tbody.find('.table__row').toArray();

    rows.sort(function (a, b) {
      var aText = $(a).find('.table__td').eq(col).text().trim();
      var bText = $(b).find('.table__td').eq(col).text().trim();
      // Numeric sort
      var aNum = parseFloat(aText.replace(/[^0-9.\-]/g, ''));
      var bNum = parseFloat(bText.replace(/[^0-9.\-]/g, ''));
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return dir === 'asc' ? aNum - bNum : bNum - aNum;
      }
      // String sort
      return dir === 'asc'
        ? aText.localeCompare(bText)
        : bText.localeCompare(aText);
    });

    $tbody.append(rows);
    $table.trigger('table:sort', [{ column: $th.data('sort') || col, direction: dir }]);
  });

})(window.jQuery || window.$);
