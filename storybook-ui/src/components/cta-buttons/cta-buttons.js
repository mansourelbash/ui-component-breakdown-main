/**
 * cta-buttons.js
 *
 * jQuery behaviour for the CTAButtons component.
 *
 * Usage in a plain HTML page:
 *   <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
 *   <script src="cta-buttons.js"></script>
 *
 * Behaviours:
 *   - .cta-btn[data-action="buy-now"]     → fires cta:buy-now
 *   - .cta-btn[data-action="add-to-cart"] → fires cta:add-to-cart
 *   - Both respect .cta-btn--loading state (prevents double-clicks)
 *
 * Custom events fired on the button element:
 *   cta:buy-now      →  (event)
 *   cta:add-to-cart  →  (event)
 *
 * Programmatic API (via window.UI):
 *   window.UI.CTAButtons.setLoading(buttonSelector, isLoading, loadingText)
 *   window.UI.CTAButtons.setDisabled(buttonSelector, isDisabled)
 */

(function ($) {
  'use strict';

  // ── Click handlers ────────────────────────────────────────────────────
  $(document).on('click', '.cta-btn[data-action]', function () {
    var $btn = $(this);
    if ($btn.hasClass('cta-btn--loading') || $btn.prop('disabled')) return;

    var action = $btn.data('action');
    $btn.trigger('cta:' + action);
  });

  // ── Programmatic API ─────────────────────────────────────────────────
  window.UI = window.UI || {};
  window.UI.CTAButtons = {
    /**
     * Set a button into loading state.
     * @param {string}  selector     CSS selector for .cta-btn
     * @param {boolean} isLoading
     * @param {string}  [loadingText]  Text to show while loading (optional)
     */
    setLoading: function (selector, isLoading, loadingText) {
      var $btn = $(selector);
      if (isLoading) {
        // Store original content for restoration
        if (!$btn.data('original-html')) {
          $btn.data('original-html', $btn.html());
        }
        var spinner = '<span class="cta-btn__spinner" aria-hidden="true"></span>';
        var text = loadingText || 'Loading…';
        $btn.addClass('cta-btn--loading').html(spinner + text);
      } else {
        var original = $btn.data('original-html');
        if (original) {
          $btn.html(original).removeData('original-html');
        }
        $btn.removeClass('cta-btn--loading');
      }
    },

    /**
     * Enable / disable a button.
     * @param {string}  selector
     * @param {boolean} isDisabled
     */
    setDisabled: function (selector, isDisabled) {
      $(selector).prop('disabled', isDisabled);
    },
  };
})(window.jQuery || window.$);
