/**
 * Navbar — navbar.stories.js
 *
 * Responsive navigation bar with brand, links, CTA buttons and a hamburger.
 * Resize the canvas below 768 px to see the mobile hamburger menu.
 */

const LINKS = [
  { label: 'Personal',  active: true  },
  { label: 'Business',  active: false },
  { label: 'Devices',   active: false },
  { label: 'Support',   active: false },
];

function renderNavbar({ variant, sticky, brandText, showCTA, links }) {
  const cls = ['navbar', variant !== 'light' ? 'navbar--' + variant : '', sticky ? 'navbar--sticky' : ''].filter(Boolean).join(' ');
  const linksHtml = links.map(l =>
    `<li><a href="#" class="navbar__link${l.active ? ' navbar__link--active' : ''}">${l.label}</a></li>`
  ).join('');
  const ctaHtml = showCTA
    ? `<a href="#" class="navbar__cta navbar__cta--outline">Login</a>
       <a href="#" class="navbar__cta navbar__cta--primary">My Orange</a>`
    : '';

  const navbar = `
<nav class="${cls}">
  <a href="#" class="navbar__brand">${brandText}</a>
  <button class="navbar__toggler" aria-label="Toggle menu" aria-expanded="false">
    <span class="navbar__toggler-bar"></span>
    <span class="navbar__toggler-bar"></span>
    <span class="navbar__toggler-bar"></span>
  </button>
  <div class="navbar__collapse">
    <ul class="navbar__nav">${linksHtml}</ul>
    <div class="navbar__actions">${ctaHtml}</div>
  </div>
</nav>`;

  if (sticky) {
    return `<div style="height:340px;overflow-y:auto;border:1px dashed var(--color-neutral-300);border-radius:8px;">
  ${navbar}
  <div style="padding:24px 24px 200px;"><p style="color:var(--color-text-secondary);">↑ Scroll up to see the sticky bar stay fixed.</p></div>
</div>`;
  }
  return navbar;
}

export default {
  title: 'Components/Navbar',
  tags: ['autodocs'],
  render: renderNavbar,
  argTypes: {
    variant:   { control: 'radio',   options: ['light', 'dark', 'brand'], description: 'Visual theme.' },
    sticky:    { control: 'boolean', description: 'Stick navbar to top of viewport on scroll.' },
    brandText: { control: 'text',    description: 'Brand / logo text.' },
    showCTA:   { control: 'boolean', description: 'Show Login + My Orange CTA buttons.' },
    links:     { control: 'object',  description: 'Nav link array: [{label, active}].' },
  },
};

export const Light = { args: { variant: 'light', sticky: false, brandText: 'Orange', showCTA: true, links: LINKS } };
export const Dark  = { args: { variant: 'dark',  sticky: false, brandText: 'Orange', showCTA: true, links: LINKS } };
export const Brand = { args: { variant: 'brand', sticky: false, brandText: 'Orange', showCTA: true, links: LINKS } };

export const StickyLight = {
  name: 'Sticky — Light',
  args: { variant: 'light', sticky: true, brandText: 'Orange', showCTA: true, links: LINKS },
};
export const StickyDark = {
  name: 'Sticky — Dark',
  args: { variant: 'dark', sticky: true, brandText: 'Orange', showCTA: true, links: LINKS },
};
export const NoCTA = {
  name: 'No CTA Buttons',
  args: { variant: 'light', sticky: false, brandText: 'Orange', showCTA: false, links: LINKS },
};
export const FewLinks = {
  name: 'Two Links Only',
  args: { variant: 'light', sticky: false, brandText: 'Orange', showCTA: true, links: LINKS.slice(0, 2) },
};
