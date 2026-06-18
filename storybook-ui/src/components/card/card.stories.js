/**
 * Card — card.stories.js
 *
 * Flexible content card with optional image, eyebrow, title, text, tags and footer.
 * No JavaScript required — pure HTML / CSS.
 */

function renderCard({ eyebrow, title, text, showImage, imageEmoji, tags, showFooter, price, priceNote, btnLabel, btnVariant, layout, hoverable, selected }) {
  const cardClass = ['card', layout === 'horizontal' ? 'card--horizontal' : '', hoverable ? 'card--hoverable' : '', selected ? 'card--selected' : ''].filter(Boolean).join(' ');
  const tagsHtml  = tags.length ? `<div class="card__tags">${tags.map(t => `<span class="badge badge--brand-light">${t}</span>`).join('')}</div>` : '';
  const imageHtml = showImage
    ? `<div class="card__image"><span style="font-size:${layout === 'horizontal' ? '48px' : '64px'}">${imageEmoji}</span></div>` : '';
  const footerHtml = showFooter ? `
    <div class="card__footer">
      <div>
        <span class="card__price">${price}</span>
        ${priceNote ? `<span class="card__price-note">${priceNote}</span>` : ''}
      </div>
      <button class="card__btn${btnVariant === 'outline' ? ' card__btn--outline' : ''}">${btnLabel}</button>
    </div>` : '';

  return `
<div class="${cardClass}" style="max-width:${layout === 'horizontal' ? '480px' : '320px'};">
  ${imageHtml}
  <div class="card__body">
    ${eyebrow ? `<span class="card__eyebrow">${eyebrow}</span>` : ''}
    <h3 class="card__title">${title}</h3>
    <p class="card__text">${text}</p>
    ${tagsHtml}
  </div>
  ${footerHtml}
</div>`;
}

export default {
  title: 'Components/Card',
  tags: ['autodocs'],
  render: renderCard,
  argTypes: {
    eyebrow:     { control: 'text',    description: 'Small uppercase label above title.' },
    title:       { control: 'text',    description: 'Card heading.' },
    text:        { control: 'text',    description: 'Body / description text.' },
    showImage:   { control: 'boolean', description: 'Show image / media area.' },
    imageEmoji:  { control: 'text',    description: 'Emoji placeholder for image slot.' },
    tags:        { control: 'object',  description: 'Array of tag labels.' },
    showFooter:  { control: 'boolean', description: 'Show price + CTA footer.' },
    price:       { control: 'text',    description: 'Price string.' },
    priceNote:   { control: 'text',    description: 'Small note under price.' },
    btnLabel:    { control: 'text',    description: 'CTA button text.' },
    btnVariant:  { control: 'radio',   options: ['filled', 'outline'], description: 'Button style.' },
    layout:      { control: 'radio',   options: ['vertical', 'horizontal'], description: 'Card orientation.' },
    hoverable:   { control: 'boolean', description: 'Lift and highlight on hover.' },
    selected:    { control: 'boolean', description: 'Selected / active state.' },
  },
};

const BASE = {
  eyebrow: 'Mobile Plan', title: "Ma'ak 70 Line",
  text: '187.5 GB · Free 5G · Unlimited Local Minutes & SMS',
  showImage: true, imageEmoji: '📱',
  tags: ['5G', 'Postpaid'],
  showFooter: true, price: 'JD 20.42', priceNote: '/first month',
  btnLabel: 'Subscribe', btnVariant: 'filled',
  layout: 'vertical', hoverable: false, selected: false,
};

export const Default       = { args: { ...BASE } };
export const Hoverable     = { args: { ...BASE, hoverable: true } };
export const Selected      = { args: { ...BASE, selected: true } };
export const NoImage       = { args: { ...BASE, showImage: false } };
export const NoFooter      = { args: { ...BASE, showFooter: false } };
export const OutlineButton = { args: { ...BASE, btnVariant: 'outline' } };
export const Horizontal    = { args: { ...BASE, layout: 'horizontal' } };
export const NoTags        = { args: { ...BASE, tags: [] } };
export const LongText      = {
  args: {
    ...BASE,
    text: 'The Ma\'ak 70 plan gives you 187.5 GB of high-speed data including a +25% bonus data bundle, free 5G service, unlimited local minutes and SMS, plus 1,000 international minutes to Orange Palestine.',
  },
};
