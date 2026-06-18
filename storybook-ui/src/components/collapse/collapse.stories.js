/**
 * Collapse — collapse.stories.js
 *
 * Click any panel header to expand/collapse.
 * Set data-accordion="true" on .collapse-group for accordion mode.
 */

const CHEVRON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`;

function renderItem(item) {
  return `
  <div class="collapse-item${item.open ? ' is-open' : ''}">
    <div class="collapse-item__header" role="button" tabindex="0" aria-expanded="${!!item.open}">
      <span class="collapse-item__title">${item.title}</span>
      <span class="collapse-item__icon">${CHEVRON}</span>
    </div>
    <div class="collapse-item__body">
      <p>${item.body}</p>
    </div>
  </div>`;
}

function renderCollapse({ items, accordion }) {
  return `<div class="collapse-group" data-accordion="${accordion}">
  ${items.map(renderItem).join('')}
</div>`;
}

const FAQ = [
  {
    title: "What is included in the Ma'ak 70 plan?",
    body:  "The Ma'ak 70 plan includes 187.5 GB of data (with +25% bonus), free 5G service, unlimited local minutes and SMS, and 1,000 international minutes to Orange Palestine.",
    open:  true,
  },
  {
    title: 'Can I change my commitment period later?',
    body:  'You can upgrade your commitment plan after your current period ends. Visit any Orange store or contact customer support for assistance.',
    open:  false,
  },
  {
    title: 'What free add-ons are included?',
    body:  "All Ma'ak plans include TOD, Anghami Plus, and OSN+ streaming subscriptions at no extra charge for the duration of your contract.",
    open:  false,
  },
  {
    title: 'How do I transfer my existing number?',
    body:  'You can port your number by selecting an available number during checkout or by visiting an Orange Jordan branch with a valid ID and your existing SIM card.',
    open:  false,
  },
];

export default {
  title: 'Components/Collapse',
  tags: ['autodocs'],
  render: renderCollapse,
  argTypes: {
    items:     { control: 'object',  description: 'Array of { title, body, open } objects.' },
    accordion: { control: 'boolean', description: 'Allow only one panel open at a time.' },
  },
};

/** Default — first item open, independent panels */
export const Default = {
  args: { items: FAQ, accordion: false },
};

/** Accordion mode — only one open at a time */
export const Accordion = {
  args: { items: FAQ, accordion: true },
};

/** All closed */
export const AllClosed = {
  args: { items: FAQ.map(i => ({ ...i, open: false })), accordion: false },
};

/** All open */
export const AllOpen = {
  args: { items: FAQ.map(i => ({ ...i, open: true })), accordion: false },
};

/** Single item */
export const SingleItem = {
  args: { items: [FAQ[0]], accordion: false },
};

/** Two items */
export const TwoItems = {
  args: { items: FAQ.slice(0, 2), accordion: true },
};
