/**
 * action-buttons.js
 *
 * jQuery behaviour for the ActionButtons component.
 *
 * Usage in a plain HTML page:
 *   <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
 *   <script src="action-buttons.js"></script>
 *
 * Behaviours:
 *   - .action-btn--wishlist  → toggles .action-btn--active; fires wishlist:change
 *   - .action-btn--share     → tries Web Share API, falls back to clipboard copy
 *   - .action-btn--compare   → fires compare:click; consumer handles the panel
 *
 * Custom events fired on the button element:
 *   wishlist:change  →  (event, isActive)
 *   compare:click    →  (event)
 */

(function ($) {
  'use strict';

  // ── Wishlist toggle ───────────────────────────────────────────────────
  $(document).on('click', '.action-btn--wishlist', function () {
    var $btn = $(this);
    var wasActive = $btn.hasClass('action-btn--active');

    $btn.toggleClass('action-btn--active');

    // Update accessible label
    var label = wasActive ? 'Add to wishlist' : 'Remove from wishlist';
    $btn.attr('aria-label', label);
    $btn.attr('aria-pressed', !wasActive);

    $btn.trigger('wishlist:change', [!wasActive]);
  });

  // ── Share ─────────────────────────────────────────────────────────────
  $(document).on('click', '.action-btn--share', function () {
    var $btn = $(this);

    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: window.location.href,
        })
        .catch(function () {
          /* User dismissed the share sheet — no action needed */
        });
    } else {
      // Clipboard fallback
      var url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          var $label = $btn.find('.action-btn__label');
          if ($label.length) {
            var original = $label.text();
            $label.text('Copied!');
            setTimeout(function () {
              $label.text(original);
            }, 2000);
          }
        });
      }
    }
  });

  // ── Compare ───────────────────────────────────────────────────────────
  $(document).on('click', '.action-btn--compare', function () {
    $(this).trigger('compare:click');
  });
})(window.jQuery || window.$);
