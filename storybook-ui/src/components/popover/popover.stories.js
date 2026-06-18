/**
 * Popover — popover.stories.js
 *
 * Click the trigger button to open/close. Click the × or outside to close.
 * popover.js handles all interactions.
 */

function renderPopover({ title, body, placement, showFooter, triggerLabel }) {
  const padding =
    placement === 'top'    ? 'padding: 140px 60px 20px' :
    placement === 'bottom' ? 'padding: 20px 60px 140px' :
    placement === 'left'   ? 'padding: 60px 20px 60px 260px' :
                             'padding: 60px 260px 60px 20px';

  const footerHtml = showFooter ? `
    <div class="popover__footer">
      <button class="popover__btn popover__btn--ghost popover__close">Dismiss</button>
      <button class="popover__btn popover__btn--primary">Learn More</button>
    </div>` : '';

  return `
<div style="${padding}; display:flex; align-items:center; justify-content:center;">
  <div class="popover-wrap">
    <button class="modal-btn modal-btn--primary" data-toggle="popover">
      ${triggerLabel}
    </button>
    <div class="popover-bubble popover-bubble--${placement}">
      <div class="popover__header">
        <h4 class="popover__title">${title}</h4>
        <button class="popover__close" aria-label="Close">&times;</button>
      </div>
      <div class="popover__body">${body}</div>
      ${footerHtml}
    </div>
  </div>
</div>`;
}

export default {
  title: 'Components/Popover',
  tags: ['autodocs'],
  render: renderPopover,
  argTypes: {
    title:        { control: 'text',  description: 'Popover heading.' },
    body:         { control: 'text',  description: 'Body text or HTML.' },
    placement:    { control: 'radio', options: ['top', 'bottom', 'left', 'right'], description: 'Popup position.' },
    showFooter:   { control: 'boolean', description: 'Show action footer buttons.' },
    triggerLabel: { control: 'text',  description: 'Trigger button text.' },
  },
};

const BASE = {
  title: 'Ma\'ak 70 Plan',
  body: 'Includes 187.5 GB data, free 5G, and unlimited local calls. Exclusive eShop offer.',
  placement: 'bottom', showFooter: false, triggerLabel: 'View Details',
};

export const Default       = { args: { ...BASE } };
export const Top           = { args: { ...BASE, placement: 'top' } };
export const Left          = { args: { ...BASE, placement: 'left',  triggerLabel: 'Info' } };
export const Right         = { args: { ...BASE, placement: 'right', triggerLabel: 'Info' } };
export const WithFooter    = { args: { ...BASE, showFooter: true } };
export const PlanPrice     = {
  args: { ...BASE, title: 'First Month Cost', body: 'JD 20.42 Including Tax. Subsequent months: JD 17.22.', placement: 'top', showFooter: true },
};
export const AddOnDetails  = {
  args: { ...BASE, title: 'Free Add-Ons', body: 'TOD · Anghami Plus · OSN+ included for the full contract duration.', placement: 'bottom', showFooter: false },
};
