/**
 * Tooltip — tooltip.stories.js
 *
 * Hover or focus the trigger element to show the tooltip.
 * jQuery handles show/hide via mouseenter/focusin events.
 */

function renderTooltip({ text, placement, variant, triggerLabel, triggerType }) {
  const variantClass = variant === 'brand' ? ' tooltip-bubble--brand' : '';
  const bubbleClass  = 'tooltip-bubble tooltip-bubble--' + placement + variantClass;

  const trigger = triggerType === 'text'
    ? `<span style="cursor:default; border-bottom: 1.5px dashed var(--color-brand); padding-bottom:2px;"
         data-toggle="tooltip" tabindex="0">${triggerLabel}</span>`
    : `<button class="modal-btn modal-btn--primary" data-toggle="tooltip" tabindex="0">${triggerLabel}</button>`;

  // Extra padding so the bubble is never clipped by the story canvas edge
  const padding = placement === 'top'    ? 'padding: 80px 60px 20px' :
                  placement === 'bottom' ? 'padding: 20px 60px 80px' :
                  placement === 'left'   ? 'padding: 40px 20px 40px 160px' :
                                           'padding: 40px 160px 40px 20px';

  return `<div style="${padding}; display:flex; align-items:center; justify-content:center;">
  <span class="tooltip-wrap" data-placement="${placement}">
    ${trigger}
    <span class="${bubbleClass}">${text}</span>
  </span>
</div>`;
}

export default {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  render: renderTooltip,
  argTypes: {
    text:         { control: 'text',  description: 'Tooltip message.' },
    placement:    { control: 'radio', options: ['top', 'bottom', 'left', 'right'], description: 'Bubble placement.' },
    variant:      { control: 'radio', options: ['default', 'brand'], description: 'Colour theme.' },
    triggerLabel: { control: 'text',  description: 'Trigger element text.' },
    triggerType:  { control: 'radio', options: ['button', 'text'],  description: 'Trigger element type.' },
  },
};

/** Top — default placement */
export const Top = {
  args: { text: 'Hover to see this tooltip', placement: 'top', variant: 'default', triggerLabel: 'Hover me', triggerType: 'button' },
};

/** Bottom */
export const Bottom = {
  args: { text: 'Tooltip below the element', placement: 'bottom', variant: 'default', triggerLabel: 'Hover me', triggerType: 'button' },
};

/** Left */
export const Left = {
  args: { text: 'Tooltip on the left', placement: 'left', variant: 'default', triggerLabel: 'Hover me', triggerType: 'button' },
};

/** Right */
export const Right = {
  args: { text: 'Tooltip on the right', placement: 'right', variant: 'default', triggerLabel: 'Hover me', triggerType: 'button' },
};

/** Brand orange variant */
export const BrandOrange = {
  args: { text: 'Ooredoo Exclusive Offer!', placement: 'top', variant: 'brand', triggerLabel: 'Exclusive Deal', triggerType: 'button' },
};

/** On inline text */
export const OnText = {
  args: { text: 'Up to 187.5 GB every month', placement: 'top', variant: 'default', triggerLabel: 'What does unlimited mean?', triggerType: 'text' },
};

/** Long message */
export const LongMessage = {
  args: { text: 'Available on all Ma\'ak postpaid plans', placement: 'bottom', variant: 'brand', triggerLabel: 'Learn more', triggerType: 'button' },
};
