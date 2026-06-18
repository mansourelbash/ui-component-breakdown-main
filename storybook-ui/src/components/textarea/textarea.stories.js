/**
 * Textarea — textarea.stories.js
 *
 * Multi-line input with label, helper text, validation states,
 * auto-resize, and character counter.
 */

function renderTextarea({ label, placeholder, helper, state, required, disabled, rows, autoResize, maxlength, showCounter }) {
  const stateClass = state !== 'default' ? ' textarea-field--' + state : '';
  const fieldClass = 'textarea-field' + stateClass;

  const taClass = [
    'textarea-field__textarea',
    autoResize ? 'textarea-field__textarea--auto-resize' : '',
  ].filter(Boolean).join(' ');

  const maxlenAttr = maxlength ? `data-maxlength="${maxlength}"` : '';
  const reqAttr    = required  ? 'required data-required="true"' : '';

  const labelHtml = label ? `
  <label class="textarea-field__label" for="demo-textarea">
    ${label}${required ? '<span class="textarea-field__required" aria-hidden="true">*</span>' : ''}
  </label>` : '';

  const hasFooter = helper || (showCounter && maxlength);
  const footerHtml = hasFooter ? `
  <div class="textarea-field__footer">
    ${helper ? `<span class="textarea-field__helper">${helper}</span>` : '<span></span>'}
    ${showCounter && maxlength ? `<span class="textarea-field__counter">0 / ${maxlength}</span>` : ''}
  </div>` : '';

  return `
<div class="${fieldClass}" style="max-width:480px;">
  ${labelHtml}
  <textarea
    id="demo-textarea"
    class="${taClass}"
    placeholder="${placeholder}"
    rows="${rows}"
    ${maxlenAttr}
    ${reqAttr}
    ${disabled ? 'disabled' : ''}
  ></textarea>
  ${footerHtml}
</div>`;
}

export default {
  title: 'Components/Textarea',
  tags: ['autodocs'],
  render: renderTextarea,
  argTypes: {
    label:       { control: 'text',    description: 'Field label. Leave empty to hide.' },
    placeholder: { control: 'text',    description: 'Placeholder text.' },
    helper:      { control: 'text',    description: 'Helper / error / success message.' },
    state:       { control: 'radio',   options: ['default', 'error', 'success'], description: 'Validation state.' },
    required:    { control: 'boolean', description: 'Mark as required (validates on blur).' },
    disabled:    { control: 'boolean' },
    rows:        { control: 'number',  description: 'Initial visible row count.' },
    autoResize:  { control: 'boolean', description: 'Expand height as user types.' },
    maxlength:   { control: 'number',  description: 'Character limit shown in counter. 0 = unlimited.' },
    showCounter: { control: 'boolean', description: 'Show live character counter.' },
  },
};

/** Default */
export const Default = {
  args: { label: 'Message', placeholder: 'Type your message here…', helper: '', state: 'default', required: false, disabled: false, rows: 4, autoResize: false, maxlength: 0, showCounter: false },
};

/** Required */
export const Required = {
  args: { label: 'Support Request', placeholder: 'Describe your issue in detail…', helper: 'Please be as detailed as possible.', state: 'default', required: true, disabled: false, rows: 5, autoResize: false, maxlength: 0, showCounter: false },
};

/** Error state */
export const WithError = {
  args: { label: 'Support Request', placeholder: 'Describe your issue…', helper: 'This field is required.', state: 'error', required: true, disabled: false, rows: 4, autoResize: false, maxlength: 0, showCounter: false },
};

/** Success state */
export const WithSuccess = {
  args: { label: 'Feedback', placeholder: 'Your feedback…', helper: 'Thank you — your message looks great!', state: 'success', required: false, disabled: false, rows: 4, autoResize: false, maxlength: 0, showCounter: false },
};

/** Disabled */
export const Disabled = {
  args: { label: 'Admin Notes', placeholder: 'No notes added.', helper: 'This field is read-only.', state: 'default', required: false, disabled: true, rows: 3, autoResize: false, maxlength: 0, showCounter: false },
};

/** Character counter */
export const WithCounter = {
  args: { label: 'Short Bio', placeholder: 'Tell us about yourself…', helper: 'Used on your profile page.', state: 'default', required: false, disabled: false, rows: 4, autoResize: false, maxlength: 200, showCounter: true },
};

/** Auto-resize */
export const AutoResize = {
  args: { label: 'Notes', placeholder: 'Start typing — the field grows automatically…', helper: 'Height adjusts as you type.', state: 'default', required: false, disabled: false, rows: 3, autoResize: true, maxlength: 0, showCounter: false },
};

/** Auto-resize + counter */
export const AutoResizeWithCounter = {
  args: { label: 'Plan Comment', placeholder: "Share your thoughts on the Ma'ak plan…", helper: '', state: 'default', required: false, disabled: false, rows: 3, autoResize: true, maxlength: 300, showCounter: true },
};

/** No label */
export const NoLabel = {
  args: { label: '', placeholder: 'Enter a message…', helper: '', state: 'default', required: false, disabled: false, rows: 3, autoResize: false, maxlength: 0, showCounter: false },
};
