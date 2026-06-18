/**
 * Badge — badge.stories.js
 *
 * Inline status labels, counters, and tag indicators.
 * No JavaScript required — pure HTML / CSS.
 */

function renderBadge({ label, variant, size, outline, showDot }) {
  const outlineSuffix = outline ? ' badge--outline' : '';
  const sizeSuffix    = size !== 'default' ? ' badge--' + size : '';
  const cls = `badge badge--${variant}${outlineSuffix}${sizeSuffix}`;
  const dot = showDot ? '<span class="badge__dot"></span>' : '';
  return `<span class="${cls}">${dot}${label}</span>`;
}

export default {
  title: 'Components/Badge',
  tags: ['autodocs'],
  render: renderBadge,
  argTypes: {
    label:   { control: 'text',    description: 'Badge text.' },
    variant: { control: 'radio',   options: ['brand', 'brand-light', 'success', 'error', 'warning', 'info', 'neutral'], description: 'Colour theme.' },
    size:    { control: 'radio',   options: ['default', 'sm', 'lg'], description: 'Size.' },
    outline: { control: 'boolean', description: 'Outline / ghost style.' },
    showDot: { control: 'boolean', description: 'Show a status dot before text.' },
  },
};

export const BrandFilled    = { args: { label: 'New',       variant: 'brand',       size: 'default', outline: false, showDot: false } };
export const BrandLight     = { args: { label: 'Exclusive', variant: 'brand-light', size: 'default', outline: false, showDot: false } };
export const Success        = { args: { label: 'Active',    variant: 'success',     size: 'default', outline: false, showDot: true  } };
export const Error          = { args: { label: 'Expired',   variant: 'error',       size: 'default', outline: false, showDot: true  } };
export const Warning        = { args: { label: 'Pending',   variant: 'warning',     size: 'default', outline: false, showDot: true  } };
export const Info           = { args: { label: '5G',        variant: 'info',        size: 'default', outline: false, showDot: false } };
export const Neutral        = { args: { label: 'Prepaid',   variant: 'neutral',     size: 'default', outline: false, showDot: false } };
export const Outline        = { args: { label: 'Postpaid',  variant: 'brand',       size: 'default', outline: true,  showDot: false } };
export const Small          = { args: { label: 'Sale',      variant: 'brand',       size: 'sm',      outline: false, showDot: false } };
export const Large          = { args: { label: 'Featured',  variant: 'brand',       size: 'lg',      outline: false, showDot: false } };

/** Multiple badges together — typical product-page row */
export const BadgeRow = {
  render: () => `
<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
  <span class="badge badge--brand">New</span>
  <span class="badge badge--success"><span class="badge__dot"></span>Active</span>
  <span class="badge badge--info">5G</span>
  <span class="badge badge--brand-light">Exclusive eShop</span>
  <span class="badge badge--warning"><span class="badge__dot"></span>Limited Time</span>
  <span class="badge badge--neutral badge--outline">Postpaid</span>
</div>`,
};
