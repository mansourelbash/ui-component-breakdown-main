/**
 * Breadcrumb — breadcrumb.stories.js
 *
 * Renders a navigation path from an array of items.
 * No JavaScript required — pure HTML/CSS.
 */

/**
 * @param {{ items: Array<{label: string, href?: string}> }} args
 * @returns {string}
 */
function renderBreadcrumb({ items }) {
  const lis = items
    .map((item, i) => {
      const isLast = i === items.length - 1;
      if (isLast) {
        return `<li class="breadcrumb__item breadcrumb__item--active" aria-current="page">${item.label}</li>`;
      }
      return `<li class="breadcrumb__item"><a href="${item.href || '#'}" class="breadcrumb__link">${item.label}</a></li>`;
    })
    .join('\n    ');

  return `
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol class="breadcrumb__list">
    ${lis}
  </ol>
</nav>`;
}

// ─── Meta ──────────────────────────────────────────────────────────────
export default {
  title: 'Components/Breadcrumb',
  render: renderBreadcrumb,
  argTypes: {
    items: {
      description: 'Array of breadcrumb steps. The last item is treated as the current page (no link).',
      control: 'object',
      table: {
        type: { summary: 'Array<{ label: string, href?: string }>' },
        defaultValue: { summary: '[]' },
      },
    },
  },
};

// ─── Stories ───────────────────────────────────────────────────────────

/** Full navigation path — four levels deep */
export const Default = {
  args: {
    items: [
      { label: 'Personal', href: '#' },
      { label: 'Mobile Line Plans', href: '#' },
      { label: "Ma3ak Lines", href: '#' },
      { label: "Ma'ak 80" },
    ],
  },
};

/** Single item — user is on the root page */
export const SingleItem = {
  args: {
    items: [
      { label: 'Personal' },
    ],
  },
};

/** Two-level path */
export const TwoLevels = {
  args: {
    items: [
      { label: 'Personal', href: '#' },
      { label: 'Mobile Line Plans' },
    ],
  },
};

/** Very long labels — verifies wrapping behaviour */
export const LongPath = {
  args: {
    items: [
      { label: 'Personal', href: '#' },
      { label: 'Mobile & Internet Plans', href: '#' },
      { label: 'Ma3ak Postpaid Lines — All Options', href: '#' },
      { label: "Ma'ak 70 Postpaid 24-Month Commitment" },
    ],
  },
};
