/**
 * commitment-plan-card.js
 *
 * jQuery behaviour for the CommitmentPlanCard component.
 *
 * Usage in a plain HTML page:
 *   <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
 *   <script src="commitment-plan-card.js"></script>
 *
 * Clicking any `.plan-card` inside a `.plan-cards` wrapper:
 *   1. Removes `.plan-card--selected` from all sibling cards
 *   2. Adds `.plan-card--selected` to the clicked card
 *   3. Checks the hidden radio input inside the card
 *   4. Fires custom event `plan:change` on the `.plan-cards` wrapper
 *
 * Custom events fired on the `.plan-cards` wrapper:
 *   plan:change  →  (event, planValue)
 *
 * Programmatic API (via window.UI):
 *   window.UI.CommitmentPlanCard.select(planCardsSelector, value)
 *   window.UI.CommitmentPlanCard.getSelected(planCardsSelector) → string
 */

(function ($) {
  'use strict';

  $(document).on('click', '.plan-cards .plan-card', function () {
    var $card = $(this);
    var $wrapper = $card.closest('.plan-cards');

    // Update visual state
    $wrapper.find('.plan-card').removeClass('plan-card--selected');
    $card.addClass('plan-card--selected');

    // Sync hidden radio
    var $radio = $card.find('.plan-card__radio');
    $radio.prop('checked', true);

    var value = $radio.val();

    // Fire event
    $wrapper.trigger('plan:change', [value]);
  });

  // ── Programmatic API ─────────────────────────────────────────────────
  window.UI = window.UI || {};
  window.UI.CommitmentPlanCard = {
    /**
     * Programmatically select a plan card by its radio value.
     * @param {string} planCardsSelector  CSS selector for .plan-cards
     * @param {string} value              Radio value to select
     */
    select: function (planCardsSelector, value) {
      var $wrapper = $(planCardsSelector);
      $wrapper.find('.plan-card').removeClass('plan-card--selected');
      var $target = $wrapper.find('.plan-card__radio[value="' + value + '"]').closest('.plan-card');
      $target.addClass('plan-card--selected');
      $wrapper.find('.plan-card__radio[value="' + value + '"]').prop('checked', true);
    },

    /**
     * Get the currently selected plan value.
     * @param {string} planCardsSelector
     * @returns {string|undefined}
     */
    getSelected: function (planCardsSelector) {
      return $(planCardsSelector).find('.plan-card--selected .plan-card__radio').val();
    },
  };
})(window.jQuery || window.$);
