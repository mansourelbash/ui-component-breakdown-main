/**
 * Modal — modal.stories.js
 *
 * Bootstrap 3-style modal. Click "Open Modal" in the canvas to see it.
 * jQuery handles open/close/backdrop/keyboard.
 */

function renderModal({ title, body, size, variant, showFooter, staticBackdrop, primaryLabel, secondaryLabel }) {
  const dialogClass = ['modal__dialog', size !== 'default' ? 'modal__dialog--' + size : ''].filter(Boolean).join(' ');
  const modalClass  = ['modal', variant !== 'default' ? 'modal--' + variant : ''].filter(Boolean).join(' ');
  const backdropAttr = staticBackdrop ? 'data-backdrop="static"' : '';
  const footer = showFooter ? `
    <div class="modal__footer">
      <button class="modal-btn modal-btn--secondary" data-dismiss="modal">${secondaryLabel}</button>
      <button class="modal-btn modal-btn--${variant === 'danger' ? 'danger' : 'primary'}">${primaryLabel}</button>
    </div>` : '';

  return `
<div style="padding: 40px; display: flex; justify-content: center;">
  <button class="modal-btn modal-btn--primary" data-toggle="modal" data-target="#story-modal">
    Open Modal
  </button>
</div>

<div class="${modalClass}" id="story-modal" ${backdropAttr} role="dialog" aria-modal="true" aria-labelledby="story-modal-title">
  <div class="${dialogClass}">
    <div class="modal__header">
      <h2 class="modal__title" id="story-modal-title">${title}</h2>
      <button class="modal__close" aria-label="Close">&times;</button>
    </div>
    <div class="modal__body">${body}</div>
    ${footer}
  </div>
</div>`;
}

export default {
  title: 'Components/Modal',
  tags: ['autodocs'],
  render: renderModal,
  argTypes: {
    title:          { control: 'text',  description: 'Modal header title.' },
    body:           { control: 'text',  description: 'Body content (HTML string).' },
    size:           { control: 'radio', options: ['default', 'sm', 'lg'], description: 'Dialog width.' },
    variant:        { control: 'radio', options: ['default', 'danger'],   description: 'Visual theme.' },
    showFooter:     { control: 'boolean', description: 'Show footer with action buttons.' },
    staticBackdrop: { control: 'boolean', description: 'Prevent close on backdrop click.' },
    primaryLabel:   { control: 'text' },
    secondaryLabel: { control: 'text' },
  },
};

/** Default — confirmation modal */
export const Default = {
  args: {
    title: 'Confirm Your Plan',
    body: "<p>You are about to subscribe to the <strong>Ma'ak 70</strong> plan for <strong>24 months</strong>. Please review your details before continuing.</p>",
    size: 'default', variant: 'default', showFooter: true, staticBackdrop: false,
    primaryLabel: 'Confirm', secondaryLabel: 'Cancel',
  },
};

/** Small dialog */
export const Small = {
  args: {
    title: 'Session Expiring',
    body: '<p>Your session will expire in 5 minutes. Save your changes to continue.</p>',
    size: 'sm', variant: 'default', showFooter: true, staticBackdrop: false,
    primaryLabel: 'Got it', secondaryLabel: 'Dismiss',
  },
};

/** Large dialog — plan details */
export const Large = {
  args: {
    title: 'Plan Details',
    body: "<p>The Ma'ak 70 plan includes 187.5 GB data (+25% bonus), free 5G, unlimited local minutes &amp; SMS, 1,000 min to Ooredoo Palestine, and free TOD, Anghami, and OSN+ add-ons.</p><br/><p>Commitment period: 24 or 12 months. Early termination fees apply.</p>",
    size: 'lg', variant: 'default', showFooter: true, staticBackdrop: false,
    primaryLabel: 'Subscribe Now', secondaryLabel: 'Go Back',
  },
};

/** Danger — destructive action */
export const Danger = {
  args: {
    title: 'Cancel Subscription',
    body: '<p>Are you sure you want to cancel? This action <strong>cannot be undone</strong> and you will lose your remaining data balance.</p>',
    size: 'default', variant: 'danger', showFooter: true, staticBackdrop: true,
    primaryLabel: 'Yes, Cancel', secondaryLabel: 'Keep Plan',
  },
};

/** No footer */
export const NoFooter = {
  args: {
    title: 'About This Offer',
    body: '<p>This exclusive eShop offer includes an extra 25% data bundle valid for your full contract period. Close using the × button or press Escape.</p>',
    size: 'default', variant: 'default', showFooter: false, staticBackdrop: false,
    primaryLabel: 'OK', secondaryLabel: 'Cancel',
  },
};

/** Static backdrop — must use buttons to close */
export const StaticBackdrop = {
  args: {
    title: 'Required Step',
    body: '<p>You must complete this action before proceeding. Clicking outside will <strong>not</strong> close this dialog.</p>',
    size: 'default', variant: 'default', showFooter: true, staticBackdrop: true,
    primaryLabel: 'Continue', secondaryLabel: 'Cancel',
  },
};
