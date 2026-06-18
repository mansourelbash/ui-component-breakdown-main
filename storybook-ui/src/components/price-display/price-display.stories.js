/**
 * PriceDisplay — price-display.stories.js
 *
 * Shows a currency + amount combination with an optional
 * tax/note line. Used in the cart total row and plan cards.
 * No JavaScript required — pure HTML/CSS.
 */

/**
 * @param {{ currency: string, amount: string, note: string, align: string, size: string }} args
 * @returns {string}
 */
function renderPriceDisplay({ currency, amount, note, align, size }) {
  const classes = [
    'price-display',
    align === 'left' ? 'price-display--left' : 'price-display--right',
    size === 'large' ? 'price-display--large' : '',
    size === 'small' ? 'price-display--small' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const noteHtml = note ? `<span class="price-display__note">${note}</span>` : '';

  return `
<div class="${classes}">
  <span class="price-display__currency">${currency}</span>
  <span class="price-display__amount">${amount}</span>
  ${noteHtml}
</div>`;
}

// ─── Meta ──────────────────────────────────────────────────────────────
export default {
  title: 'Components/PriceDisplay',
  render: renderPriceDisplay,
  argTypes: {
    currency: {
      description: 'Currency label (e.g. "JD", "$", "€").',
      control: 'text',
    },
    amount: {
      description: 'Formatted price amount string (e.g. "85.96").',
      control: 'text',
    },
    note: {
      description: 'Optional footnote beneath the amount (e.g. "Including Tax"). Leave empty to hide.',
      control: 'text',
    },
    align: {
      description: 'Horizontal alignment of the price.',
      control: 'radio',
      options: ['right', 'left'],
      table: { defaultValue: { summary: 'right' } },
    },
    size: {
      description: 'Size variant of the amount numeral.',
      control: 'radio',
      options: ['default', 'small', 'large'],
      table: { defaultValue: { summary: 'default' } },
    },
  },
};

// ─── Stories ───────────────────────────────────────────────────────────

/** Cart total — right-aligned with tax note */
export const Default = {
  args: {
    currency: 'JD',
    amount: '85.96',
    note: 'Including Tax',
    align: 'right',
    size: 'default',
  },
};

/** Left-aligned variant */
export const AlignLeft = {
  args: {
    currency: 'JD',
    amount: '85.96',
    note: 'Including Tax',
    align: 'left',
    size: 'default',
  },
};

/** Large hero price */
export const LargeAmount = {
  args: {
    currency: 'JD',
    amount: '199.00',
    note: 'Per year, Including Tax',
    align: 'right',
    size: 'large',
  },
};

/** Small — for use inside plan cards */
export const SmallAmount = {
  args: {
    currency: 'JD',
    amount: '17.22',
    note: '/month',
    align: 'left',
    size: 'small',
  },
};

/** No note */
export const NoNote = {
  args: {
    currency: 'JD',
    amount: '85.96',
    note: '',
    align: 'right',
    size: 'default',
  },
};
