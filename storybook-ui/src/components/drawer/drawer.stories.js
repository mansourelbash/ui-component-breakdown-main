/**
 * Drawer — drawer.stories.js
 *
 * Slide-in side panel. Click the "Open Drawer" button in the canvas.
 * drawer.js handles open/close with backdrop.
 */

function renderDrawer({ title, body, placement, showFooter, triggerLabel, size }) {
  const sizeClass   = size !== 'default' ? ' drawer--' + size : '';
  const drawerClass = `drawer drawer--${placement}${sizeClass}`;

  return `
<div style="padding:40px;display:flex;justify-content:center;">
  <button class="drawer__btn drawer__btn--primary" data-toggle="drawer" data-target="#story-drawer">
    ${triggerLabel}
  </button>
</div>

<div class="${drawerClass}" id="story-drawer" role="dialog" aria-modal="true" aria-labelledby="story-drawer-title">
  <div class="drawer__header">
    <h3 class="drawer__title" id="story-drawer-title">${title}</h3>
    <button class="drawer__close" data-dismiss="drawer" aria-label="Close">&times;</button>
  </div>
  <div class="drawer__body">${body}</div>
  ${showFooter ? `
  <div class="drawer__footer">
    <button class="drawer__btn drawer__btn--secondary" data-dismiss="drawer">Cancel</button>
    <button class="drawer__btn drawer__btn--primary">Save Changes</button>
  </div>` : ''}
</div>`;
}

const BODY = `
<p style="color:var(--color-text-secondary);margin-bottom:16px;">Review your selected plan details before confirming.</p>
<div style="display:flex;flex-direction:column;gap:12px;">
  <div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--color-neutral-200);">
    <span style="color:var(--color-text-secondary);">Plan</span>
    <strong>Ma'ak 70 Line</strong>
  </div>
  <div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--color-neutral-200);">
    <span style="color:var(--color-text-secondary);">Commitment</span>
    <strong>24 Months</strong>
  </div>
  <div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--color-neutral-200);">
    <span style="color:var(--color-text-secondary);">First Payment</span>
    <strong style="color:var(--color-brand);">JD 20.42</strong>
  </div>
  <div style="display:flex;justify-content:space-between;padding:12px 0;">
    <span style="color:var(--color-text-secondary);">Monthly</span>
    <strong>JD 17.22</strong>
  </div>
</div>`;

export default {
  title: 'Components/Drawer',
  tags: ['autodocs'],
  render: renderDrawer,
  argTypes: {
    title:        { control: 'text',  description: 'Drawer panel title.' },
    body:         { control: 'text',  description: 'Body HTML content.' },
    placement:    { control: 'radio', options: ['right', 'left', 'bottom'], description: 'Which edge the drawer slides from.' },
    size:         { control: 'radio', options: ['default', 'narrow', 'wide'],  description: 'Panel width.' },
    showFooter:   { control: 'boolean', description: 'Show footer with action buttons.' },
    triggerLabel: { control: 'text',  description: 'Trigger button label.' },
  },
};

export const Right      = { args: { title: 'Order Summary',    body: BODY, placement: 'right',  size: 'default', showFooter: true,  triggerLabel: 'Open Summary' } };
export const Left       = { args: { title: 'Navigation Menu',  body: BODY, placement: 'left',   size: 'default', showFooter: false, triggerLabel: 'Open Menu' } };
export const Bottom     = { args: { title: 'Select Number',    body: BODY, placement: 'bottom', size: 'default', showFooter: true,  triggerLabel: 'Choose Number' } };
export const Narrow     = { args: { title: 'Filters',          body: BODY, placement: 'right',  size: 'narrow',  showFooter: true,  triggerLabel: 'Open Filters' } };
export const Wide       = { args: { title: 'Plan Comparison',  body: BODY, placement: 'right',  size: 'wide',    showFooter: true,  triggerLabel: 'Compare Plans' } };
export const NoFooter   = { args: { title: 'Help & Support',   body: BODY, placement: 'right',  size: 'default', showFooter: false, triggerLabel: 'Get Help' } };
