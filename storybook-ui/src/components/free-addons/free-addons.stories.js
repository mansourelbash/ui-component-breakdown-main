/**
 * FreeAddOns — free-addons.stories.js
 *
 * Renders a list of bundled free services (streaming, entertainment, etc.)
 * with optional logo images and a short description.
 * No JavaScript required — pure HTML/CSS.
 */

/**
 * @param {{ title: string, addons: Array<{name: string, logoUrl?: string, description: string}> }} args
 * @returns {string}
 */
function renderFreeAddOns({ title, addons }) {
  const items = addons
    .map((addon) => {
      const logoHtml = addon.logoUrl
        ? `<img src="${addon.logoUrl}" alt="${addon.name} logo" class="addon-item__logo" />`
        : `<span class="addon-item__logo-text">${addon.name}</span>`;

      return `
    <li class="addon-item">
      <div class="addon-item__logo-wrap">${logoHtml}</div>
      <p class="addon-item__description">${addon.description}</p>
    </li>`;
    })
    .join('');

  return `
<div class="addons">
  <h3 class="addons__title">${title}</h3>
  <ul class="addons__list" role="list">
    ${items}
  </ul>
</div>`;
}

// ─── Meta ──────────────────────────────────────────────────────────────
export default {
  title: 'Components/FreeAddOns',
  render: renderFreeAddOns,
  argTypes: {
    title: {
      description: 'Section heading (e.g. "FREE ADD-ONS").',
      control: 'text',
    },
    addons: {
      description: 'Array of add-on objects. Each item has a name, optional logoUrl, and description.',
      control: 'object',
      table: {
        type: { summary: 'Array<{ name: string, logoUrl?: string, description: string }>' },
      },
    },
  },
};

// ─── Stories ───────────────────────────────────────────────────────────

const THREE_ADDONS = [
  {
    name: 'TOD',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/TOD_MENA.svg/200px-TOD_MENA.svg.png',
    description: 'Watch the top leagues, tournaments, series and movies wherever you are on your mobile with TOD.',
  },
  {
    name: 'Anghami Plus',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Anghami_Logo.png/200px-Anghami_Logo.png',
    description: 'Stream the hottest hits, trending podcasts, and exclusive music experiences anytime, anywhere with Anghami.',
  },
  {
    name: 'OSN+',
    logoUrl: '',
    description: 'Catch the latest blockbusters, exclusive series, and Hollywood hits wherever you go with OSN+ on your mobile.',
  },
];

/** Full set — three bundled streaming services */
export const Default = {
  args: {
    title: 'Free Add-Ons',
    addons: THREE_ADDONS,
  },
};

/** Single add-on — for plans with fewer bundles */
export const SingleAddon = {
  args: {
    title: 'Free Add-On',
    addons: [THREE_ADDONS[0]],
  },
};

/** No logos — all fallback to text badge */
export const TextFallback = {
  args: {
    title: 'Free Add-Ons',
    addons: [
      { name: 'TOD', logoUrl: '', description: 'Watch sports and entertainment on TOD.' },
      { name: 'Anghami Plus', logoUrl: '', description: 'Stream unlimited music.' },
    ],
  },
};
