/**
 * ActionButtons — action-buttons.stories.js
 *
 * A row of utility buttons: Compare, Share, and Wishlist toggle.
 * jQuery handles wishlist active-state toggling and the share fallback.
 *
 * Plain HTML usage:
 *   - Wrapper: class="action-buttons"
 *   - Compare: class="action-btn action-btn--compare"
 *   - Share:   class="action-btn action-btn--share"
 *   - Wishlist: class="action-btn action-btn--wishlist" (add action-btn--active when active)
 */

const ICONS = {
  compare: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  share: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  heartFilled: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
};

/**
 * @param {{ showCompare:boolean, showShare:boolean, showWishlist:boolean, wishlistActive:boolean }} args
 * @returns {string}
 */
function renderActionButtons({ showCompare, showShare, showWishlist, wishlistActive }) {
  const buttons = [];

  if (showCompare) {
    buttons.push(`
    <button class="action-btn action-btn--compare" aria-label="Compare this product">
      ${ICONS.compare}
      <span class="action-btn__label">Compare</span>
    </button>`);
  }

  if (showShare) {
    buttons.push(`
    <button class="action-btn action-btn--share" aria-label="Share this product">
      ${ICONS.share}
    </button>`);
  }

  if (showWishlist) {
    const activeClass = wishlistActive ? ' action-btn--active' : '';
    const icon = wishlistActive ? ICONS.heartFilled : ICONS.heart;
    const label = wishlistActive ? 'Remove from wishlist' : 'Add to wishlist';
    buttons.push(`
    <button
      class="action-btn action-btn--wishlist${activeClass}"
      aria-label="${label}"
      aria-pressed="${wishlistActive}"
    >${icon}</button>`);
  }

  return `<div class="action-buttons">${buttons.join('')}</div>`;
}

// ─── Meta ──────────────────────────────────────────────────────────────
export default {
  title: 'Components/ActionButtons',
  tags: ['autodocs'],
  render: renderActionButtons,
  argTypes: {
    showCompare: {
      description: 'Show the Compare button.',
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    showShare: {
      description: 'Show the Share button.',
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    showWishlist: {
      description: 'Show the Wishlist button.',
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    wishlistActive: {
      description: 'Whether the item is currently in the wishlist.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

// ─── Stories ───────────────────────────────────────────────────────────

/** Default — all three buttons, wishlist inactive */
export const Default = {
  args: {
    showCompare: true,
    showShare: true,
    showWishlist: true,
    wishlistActive: false,
  },
};

/** Wishlist active — heart filled, orange background */
export const WishlistActive = {
  args: {
    showCompare: true,
    showShare: true,
    showWishlist: true,
    wishlistActive: true,
  },
};

/** Compare and Share only — no wishlist */
export const NoWishlist = {
  args: {
    showCompare: true,
    showShare: true,
    showWishlist: false,
    wishlistActive: false,
  },
};

/** Wishlist only */
export const WishlistOnly = {
  args: {
    showCompare: false,
    showShare: false,
    showWishlist: true,
    wishlistActive: false,
  },
};
