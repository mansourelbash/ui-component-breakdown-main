/**
 * PromoBanner — promo-banner.stories.js
 *
 * An orange-tinted informational banner used to highlight
 * promotional offers (e.g. extra data, exclusive pricing).
 * No JavaScript required — pure HTML/CSS.
 */

const ICON_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
  <line x1="7" y1="7" x2="7.01" y2="7"/>
</svg>`;

/**
 * @param {{ message: string, compact: boolean, showIcon: boolean }} args
 */
function renderPromoBanner({ message, compact, showIcon }) {
  const classes = [
    'promo-banner',
    compact ? 'promo-banner--compact' : '',
    !showIcon ? 'promo-banner--no-icon' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const iconHtml = showIcon
    ? `<span class="promo-banner__icon">${ICON_SVG}</span>`
    : '';

  return `
<div class="${classes}" role="note">
  ${iconHtml}
  <span class="promo-banner__text">${message}</span>
</div>`;
}

// ─── Meta ──────────────────────────────────────────────────────────────
export default {
  title: 'Components/PromoBanner',
  render: renderPromoBanner,
  argTypes: {
    message: {
      description: 'Promotional text displayed inside the banner.',
      control: 'text',
    },
    compact: {
      description: 'Reduces padding and font size for tighter layouts.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    showIcon: {
      description: 'Whether to show the tag icon on the left.',
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
  },
};

// ─── Stories ───────────────────────────────────────────────────────────

/** Default state with icon and standard padding */
export const Default = {
  args: {
    message: 'Get Extra 25% GB exclusively from our eShop',
    compact: false,
    showIcon: true,
  },
};

/** Long promotional message — tests text wrapping */
export const LongMessage = {
  args: {
    message: 'Subscribe now and get an extra 25% data bundle on top of your existing plan, valid for the entire contract period. Offer available exclusively through our online store.',
    compact: false,
    showIcon: true,
  },
};

/** Compact variant — for use inside tight cards or sidebars */
export const Compact = {
  args: {
    message: 'Extra 25% GB on eShop orders',
    compact: true,
    showIcon: true,
  },
};

/** No icon variant */
export const NoIcon = {
  args: {
    message: 'Get Extra 25% GB exclusively from our eShop',
    compact: false,
    showIcon: false,
  },
};
