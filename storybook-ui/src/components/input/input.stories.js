/**
 * Input — input.stories.js
 *
 * Styled text input with label, helper text, icon slots,
 * validation states (error / success), sizes, and disabled/readonly.
 */

const ICONS = {
  search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  mail:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  phone:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.08-1.08a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  error:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  check:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
};

function renderInput({ label, placeholder, helper, state, size, type, required, disabled, readonly, iconLeft, iconRight }) {
  const stateClass = state !== 'default' ? ' input-field--' + state : '';
  const sizeClass  = size  !== 'default' ? ' input-field--' + size  : '';
  const fieldClass = 'input-field' + stateClass + sizeClass;

  // Auto icon-right for error/success states
  const autoIconRight = state === 'error' ? ICONS.error : state === 'success' ? ICONS.check : '';
  const effectiveIconRight = iconRight || autoIconRight;

  const inputClass = [
    'input-field__input',
    iconLeft          ? 'input-field__input--icon-left'  : '',
    effectiveIconRight ? 'input-field__input--icon-right' : '',
  ].filter(Boolean).join(' ');

  const labelHtml = label ? `
  <label class="input-field__label" for="demo-input">
    ${label}${required ? '<span class="input-field__required" aria-hidden="true">*</span>' : ''}
  </label>` : '';

  const helperHtml = helper ? `<span class="input-field__helper">${helper}</span>` : '';

  return `
<div class="${fieldClass}" style="max-width:400px;">
  ${labelHtml}
  <div class="input-field__wrap">
    ${iconLeft ? `<span class="input-field__icon input-field__icon--left">${iconLeft}</span>` : ''}
    <input
      id="demo-input"
      type="${type}"
      class="${inputClass}"
      placeholder="${placeholder}"
      ${required ? 'required data-required="true"' : ''}
      ${disabled ? 'disabled' : ''}
      ${readonly ? 'readonly' : ''}
    />
    ${effectiveIconRight ? `<span class="input-field__icon input-field__icon--right">${effectiveIconRight}</span>` : ''}
  </div>
  ${helperHtml}
</div>`;
}

export default {
  title: 'Components/Input',
  tags: ['autodocs'],
  render: renderInput,
  argTypes: {
    label:       { control: 'text',  description: 'Field label. Leave empty to hide.' },
    placeholder: { control: 'text',  description: 'Placeholder text.' },
    helper:      { control: 'text',  description: 'Helper / error / success message below the field.' },
    state:       { control: 'radio', options: ['default', 'error', 'success'], description: 'Validation state.' },
    size:        { control: 'radio', options: ['default', 'sm', 'lg'],         description: 'Input size.' },
    type:        { control: 'radio', options: ['text', 'email', 'password', 'tel', 'number'], description: 'Input type.' },
    required:    { control: 'boolean', description: 'Mark as required (shows asterisk).' },
    disabled:    { control: 'boolean' },
    readonly:    { control: 'boolean' },
    iconLeft:    { control: 'text',  description: 'SVG string for left icon (optional).' },
    iconRight:   { control: 'text',  description: 'SVG string for right icon (optional). Auto-set for error/success states.' },
  },
};

/** Default */
export const Default = {
  args: { label: 'Full Name', placeholder: 'Enter your full name', helper: '', state: 'default', size: 'default', type: 'text', required: false, disabled: false, readonly: false, iconLeft: '', iconRight: '' },
};

/** Email with icon */
export const EmailWithIcon = {
  args: { label: 'Email Address', placeholder: 'you@example.com', helper: 'We will send your confirmation here.', state: 'default', size: 'default', type: 'email', required: true, disabled: false, readonly: false, iconLeft: ICONS.mail, iconRight: '' },
};

/** Error state */
export const WithError = {
  args: { label: 'Email Address', placeholder: 'you@example.com', helper: 'Please enter a valid email address.', state: 'error', size: 'default', type: 'email', required: true, disabled: false, readonly: false, iconLeft: ICONS.mail, iconRight: '' },
};

/** Success state */
export const WithSuccess = {
  args: { label: 'Email Address', placeholder: 'you@example.com', helper: 'Email address is valid.', state: 'success', size: 'default', type: 'email', required: false, disabled: false, readonly: false, iconLeft: ICONS.mail, iconRight: '' },
};

/** Disabled */
export const Disabled = {
  args: { label: 'Account Number', placeholder: 'JO-000-0000', helper: 'This field cannot be edited.', state: 'default', size: 'default', type: 'text', required: false, disabled: true, readonly: false, iconLeft: '', iconRight: '' },
};

/** Small size */
export const Small = {
  args: { label: 'Promo Code', placeholder: 'Enter code', helper: '', state: 'default', size: 'sm', type: 'text', required: false, disabled: false, readonly: false, iconLeft: '', iconRight: '' },
};

/** Large size */
export const Large = {
  args: { label: 'Phone Number', placeholder: '+962 7x xxx xxxx', helper: 'Jordan mobile number required.', state: 'default', size: 'lg', type: 'tel', required: true, disabled: false, readonly: false, iconLeft: ICONS.phone, iconRight: '' },
};

/** Search input (no label) */
export const SearchInput = {
  args: { label: '', placeholder: 'Search plans…', helper: '', state: 'default', size: 'default', type: 'text', required: false, disabled: false, readonly: false, iconLeft: ICONS.search, iconRight: '' },
};

/** Password */
export const Password = {
  args: { label: 'Password', placeholder: 'Enter your password', helper: 'Minimum 8 characters.', state: 'default', size: 'default', type: 'password', required: true, disabled: false, readonly: false, iconLeft: '', iconRight: '' },
};

/** Readonly */
export const Readonly = {
  args: { label: 'Selected Number', placeholder: '', helper: 'Auto-assigned from availability.', state: 'default', size: 'default', type: 'text', required: false, disabled: false, readonly: true, iconLeft: ICONS.phone, iconRight: '' },
};
