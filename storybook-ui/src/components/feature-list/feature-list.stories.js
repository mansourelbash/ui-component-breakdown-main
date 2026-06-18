/**
 * FeatureList — feature-list.stories.js
 *
 * Renders a labelled list of features with orange bullet dots.
 * Reused for both "Main Features" and "Extra Features" sections.
 * No JavaScript required — pure HTML/CSS.
 */

/**
 * @param {{ title: string, items: string[], compact: boolean }} args
 * @returns {string}
 */
function renderFeatureList({ title, items, compact }) {
  const classes = [
    'feature-list',
    compact ? 'feature-list--compact' : '',
    !title ? 'feature-list--no-title' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const listItems = items
    .map(
      (text) => `
    <li class="feature-list__item">
      <span class="feature-list__bullet" aria-hidden="true"></span>
      <span class="feature-list__text">${text}</span>
    </li>`
    )
    .join('');

  return `
<div class="${classes}">
  ${title ? `<h3 class="feature-list__title">${title}</h3>` : ''}
  <ul class="feature-list__items" role="list">
    ${listItems}
  </ul>
</div>`;
}

// ─── Meta ──────────────────────────────────────────────────────────────
export default {
  title: 'Components/FeatureList',
  render: renderFeatureList,
  argTypes: {
    title: {
      description: 'Section heading displayed above the list in uppercase. Leave empty to hide.',
      control: 'text',
    },
    items: {
      description: 'Array of feature strings to display as bullet points.',
      control: 'object',
      table: { type: { summary: 'string[]' } },
    },
    compact: {
      description: 'Reduces item gap and font size for denser layouts.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

// ─── Stories ───────────────────────────────────────────────────────────

/** Main features — five items as seen on the product page */
export const MainFeatures = {
  args: {
    title: 'Main Features',
    compact: false,
    items: [
      'Main data bundle: 187.5 GB Internet (Including +25% GB)',
      'Free 5G service',
      'Max it rewards',
      'Unlimited minutes & SMS to local networks',
      'International minutes: 1,000 min to Orange Palestine + 300 min call world',
    ],
  },
};

/** Extra features section */
export const ExtraFeatures = {
  args: {
    title: 'Extra Features',
    compact: false,
    items: [
      'Data carry over to the next month',
      'Missed Call Alert',
      'Private Number',
      'Discounts on a wide range of 5G handsets',
      '300 minutes to receive calls while roaming',
    ],
  },
};

/** Compact variant — for sidebars or tighter containers */
export const Compact = {
  args: {
    title: 'Included',
    compact: true,
    items: [
      'Free 5G service',
      'Unlimited local minutes & SMS',
      'Data carry over',
    ],
  },
};

/** No title — just the bullet list */
export const NoTitle = {
  args: {
    title: '',
    compact: false,
    items: [
      'Free 5G service',
      'Unlimited local minutes & SMS',
    ],
  },
};

/** Single item edge case */
export const SingleItem = {
  args: {
    title: 'Highlight',
    compact: false,
    items: ['Free 5G service'],
  },
};
