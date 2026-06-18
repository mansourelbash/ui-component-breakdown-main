/**
 * NumberSelector — number-selector.stories.js
 *
 * A styled native <select> for choosing a phone number.
 * Uses the browser's native dropdown — no custom JS needed.
 * No JavaScript required — pure HTML/CSS.
 */

const CHEVRON_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <polyline points="6 9 12 15 18 9"/>
</svg>`;

/**
 * @param {{ label: string, required: boolean, options: string[], disabled: boolean }} args
 * @returns {string}
 */
function renderNumberSelector({ label, required, options, disabled }) {
  const optionHtml = options
    .map((opt, i) => `<option value="${opt}"${i === 0 ? ' selected' : ''}>${opt}</option>`)
    .join('\n      ');

  const requiredAttr = required ? 'required aria-required="true"' : '';
  const disabledAttr = disabled ? 'disabled' : '';

  return `
<div class="number-selector">
  <label class="number-selector__label" for="number-select">
    ${label}${required ? '<span class="number-selector__required" aria-hidden="true">*</span>' : ''}
  </label>
  <div class="number-selector__control">
    <select
      id="number-select"
      class="number-selector__select"
      ${requiredAttr}
      ${disabledAttr}
    >
      ${optionHtml}
    </select>
    <span class="number-selector__arrow">${CHEVRON_SVG}</span>
  </div>
</div>`;
}

// ─── Meta ──────────────────────────────────────────────────────────────
export default {
  title: 'Components/NumberSelector',
  render: renderNumberSelector,
  argTypes: {
    label: {
      description: 'Field label text shown above the select.',
      control: 'text',
    },
    required: {
      description: 'Marks the field as required and shows an asterisk.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    options: {
      description: 'Array of phone number strings to display as options.',
      control: 'object',
      table: { type: { summary: 'string[]' } },
    },
    disabled: {
      description: 'Disables the select input.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

// ─── Stories ───────────────────────────────────────────────────────────

const PHONE_NUMBERS = [
  '+962 776295799',
  '+962 776295800',
  '+962 776295801',
  '+962 776295802',
];

/** Standard required selector with several options */
export const Default = {
  args: {
    label: 'Select Number',
    required: true,
    disabled: false,
    options: PHONE_NUMBERS,
  },
};

/** Optional field — no asterisk */
export const Optional = {
  args: {
    label: 'Select Number',
    required: false,
    disabled: false,
    options: PHONE_NUMBERS,
  },
};

/** Disabled state */
export const Disabled = {
  args: {
    label: 'Select Number',
    required: true,
    disabled: true,
    options: PHONE_NUMBERS,
  },
};

/** Many options — tests scroll behaviour in the native dropdown */
export const ManyOptions = {
  args: {
    label: 'Select Number',
    required: true,
    disabled: false,
    options: Array.from({ length: 12 }, (_, i) => `+962 77629${5799 + i}`),
  },
};
