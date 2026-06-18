/**
 * QuantityStepper — quantity-stepper.stories.js
 *
 * A −/value/+ counter for product quantity selection.
 * jQuery manages increment/decrement, min/max guards, and direct input.
 *
 * Plain HTML usage:
 *   - Add class="qty-stepper" to the wrapper
 *   - Set data-min and data-max attributes
 *   - Decrement btn needs class="qty-stepper__btn qty-stepper__btn--dec"
 *   - Increment btn needs class="qty-stepper__btn qty-stepper__btn--inc"
 *   - The number input needs class="qty-stepper__input"
 */

/**
 * @param {{ label: string, value: number, min: number, max: number, compact: boolean }} args
 * @returns {string}
 */
function renderQuantityStepper({ label, value, min, max, compact }) {
  const classes = ['qty-stepper', compact ? 'qty-stepper--compact' : ''].filter(Boolean).join(' ');

  return `
<div class="${classes}" data-min="${min}" data-max="${max}">
  ${label ? `<span class="qty-stepper__label">${label}</span>` : ''}
  <div class="qty-stepper__control" role="group" aria-label="${label || 'Quantity'}">
    <button
      class="qty-stepper__btn qty-stepper__btn--dec"
      aria-label="Decrease quantity"
      ${value <= min ? 'disabled' : ''}
    >−</button>
    <input
      type="number"
      class="qty-stepper__input"
      value="${value}"
      min="${min}"
      max="${max}"
      aria-label="Quantity"
    />
    <button
      class="qty-stepper__btn qty-stepper__btn--inc"
      aria-label="Increase quantity"
      ${value >= max ? 'disabled' : ''}
    >+</button>
  </div>
</div>`;
}

// ─── Meta ──────────────────────────────────────────────────────────────
export default {
  title: 'Components/QuantityStepper',
  tags: ['autodocs'],
  render: renderQuantityStepper,
  argTypes: {
    label: {
      description: 'Section label displayed above the control. Leave empty to hide.',
      control: 'text',
    },
    value: {
      description: 'Initial quantity value.',
      control: { type: 'number', min: 1, max: 99 },
    },
    min: {
      description: 'Minimum allowed quantity.',
      control: { type: 'number', min: 0 },
      table: { defaultValue: { summary: '1' } },
    },
    max: {
      description: 'Maximum allowed quantity.',
      control: { type: 'number', min: 1 },
      table: { defaultValue: { summary: '99' } },
    },
    compact: {
      description: 'Reduces the control size for tighter layouts.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

// ─── Stories ───────────────────────────────────────────────────────────

/** Default — mid-range value, both buttons enabled */
export const Default = {
  args: {
    label: 'Quantity',
    value: 1,
    min: 1,
    max: 10,
    compact: false,
  },
};

/** At minimum — decrement button is disabled */
export const AtMinimum = {
  args: {
    label: 'Quantity',
    value: 1,
    min: 1,
    max: 10,
    compact: false,
  },
};

/** At maximum — increment button is disabled */
export const AtMaximum = {
  args: {
    label: 'Quantity',
    value: 10,
    min: 1,
    max: 10,
    compact: false,
  },
};

/** Mid value — both buttons enabled */
export const MidValue = {
  args: {
    label: 'Quantity',
    value: 5,
    min: 1,
    max: 10,
    compact: false,
  },
};

/** Compact variant */
export const Compact = {
  args: {
    label: 'Qty',
    value: 2,
    min: 1,
    max: 10,
    compact: true,
  },
};

/** No label */
export const NoLabel = {
  args: {
    label: '',
    value: 1,
    min: 1,
    max: 99,
    compact: false,
  },
};
