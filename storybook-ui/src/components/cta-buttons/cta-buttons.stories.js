/**
 * CTAButtons — cta-buttons.stories.js
 *
 * The primary action row: "Buy Now" (dark) and "Add to Cart" (orange).
 * jQuery fires custom events and manages loading / disabled states.
 *
 * Plain HTML usage:
 *   - Wrapper: class="cta-buttons"
 *   - Buy Now:      class="cta-btn cta-btn--primary"  data-action="buy-now"
 *   - Add to Cart:  class="cta-btn cta-btn--secondary" data-action="add-to-cart"
 */

const CART_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;

/**
 * @param {{ primaryLabel:string, secondaryLabel:string, showIcon:boolean, primaryDisabled:boolean, secondaryDisabled:boolean, primaryLoading:boolean, secondaryLoading:boolean }} args
 * @returns {string}
 */
function renderCTAButtons({
  primaryLabel,
  secondaryLabel,
  showIcon,
  primaryDisabled,
  secondaryDisabled,
  primaryLoading,
  secondaryLoading,
}) {
  const spinner = '<span class="cta-btn__spinner" aria-hidden="true"></span>';

  const primaryContent = primaryLoading
    ? spinner + 'Processing…'
    : primaryLabel;

  const secondaryContent = secondaryLoading
    ? spinner + 'Adding…'
    : (showIcon ? CART_ICON : '') + secondaryLabel;

  return `
<div class="cta-buttons">
  <button
    class="cta-btn cta-btn--primary${primaryLoading ? ' cta-btn--loading' : ''}"
    data-action="buy-now"
    ${primaryDisabled ? 'disabled' : ''}
    aria-label="${primaryLabel}"
  >${primaryContent}</button>

  <button
    class="cta-btn cta-btn--secondary${secondaryLoading ? ' cta-btn--loading' : ''}"
    data-action="add-to-cart"
    ${secondaryDisabled ? 'disabled' : ''}
    aria-label="${secondaryLabel}"
  >${secondaryContent}</button>
</div>`;
}

// ─── Meta ──────────────────────────────────────────────────────────────
export default {
  title: 'Components/CTAButtons',
  tags: ['autodocs'],
  render: renderCTAButtons,
  argTypes: {
    primaryLabel: {
      description: 'Label for the primary (Buy Now) button.',
      control: 'text',
    },
    secondaryLabel: {
      description: 'Label for the secondary (Add to Cart) button.',
      control: 'text',
    },
    showIcon: {
      description: 'Show a cart icon inside the secondary button.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    primaryDisabled: {
      description: 'Disable the primary button.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    secondaryDisabled: {
      description: 'Disable the secondary button.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    primaryLoading: {
      description: 'Show loading spinner on the primary button.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    secondaryLoading: {
      description: 'Show loading spinner on the secondary button.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

// ─── Stories ───────────────────────────────────────────────────────────

/** Default — both buttons enabled */
export const Default = {
  args: {
    primaryLabel: 'Buy Now',
    secondaryLabel: 'Add to Cart',
    showIcon: false,
    primaryDisabled: false,
    secondaryDisabled: false,
    primaryLoading: false,
    secondaryLoading: false,
  },
};

/** With cart icon on secondary */
export const WithCartIcon = {
  args: {
    primaryLabel: 'Buy Now',
    secondaryLabel: 'Add to Cart',
    showIcon: true,
    primaryDisabled: false,
    secondaryDisabled: false,
    primaryLoading: false,
    secondaryLoading: false,
  },
};

/** Both buttons disabled */
export const BothDisabled = {
  args: {
    primaryLabel: 'Buy Now',
    secondaryLabel: 'Add to Cart',
    showIcon: false,
    primaryDisabled: true,
    secondaryDisabled: true,
    primaryLoading: false,
    secondaryLoading: false,
  },
};

/** Primary loading */
export const PrimaryLoading = {
  args: {
    primaryLabel: 'Buy Now',
    secondaryLabel: 'Add to Cart',
    showIcon: false,
    primaryDisabled: false,
    secondaryDisabled: false,
    primaryLoading: true,
    secondaryLoading: false,
  },
};

/** Secondary loading */
export const SecondaryLoading = {
  args: {
    primaryLabel: 'Buy Now',
    secondaryLabel: 'Add to Cart',
    showIcon: false,
    primaryDisabled: false,
    secondaryDisabled: false,
    primaryLoading: false,
    secondaryLoading: true,
  },
};
