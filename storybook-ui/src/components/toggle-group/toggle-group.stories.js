/**
 * ToggleGroup — toggle-group.stories.js
 *
 * A radio-style button group. Only one option can be active at a time.
 * jQuery manages active-class swapping and fires a `toggle:change` event.
 *
 * Plain HTML usage:
 *   - Wrap options in a div with [data-toggle-group="<name>"]
 *   - Each button needs class="toggle-btn" and data-value="<value>"
 *   - The active button also receives class="toggle-btn--active"
 */

/**
 * @param {{ label: string, groupName: string, activeValue: string, options: Array<{label:string, value:string}>, showDot: boolean, disabled: boolean }} args
 * @returns {string}
 */
function renderToggleGroup({ label, groupName, activeValue, options, showDot, disabled }) {
  const buttons = options
    .map((opt) => {
      const isActive = opt.value === activeValue;
      const classes = ['toggle-btn', isActive ? 'toggle-btn--active' : ''].filter(Boolean).join(' ');
      const dot = showDot ? '<span class="toggle-btn__dot" aria-hidden="true"></span>' : '';
      const disabledAttr = disabled ? 'disabled' : '';
      return `<button class="${classes}" data-value="${opt.value}" role="radio" aria-checked="${isActive}" ${disabledAttr}>${dot}${opt.label}</button>`;
    })
    .join('\n      ');

  return `
<div class="toggle-group" data-toggle-group="${groupName}">
  <p class="toggle-group__label">${label}</p>
  <div class="toggle-group__options" role="radiogroup" aria-label="${label}">
    ${buttons}
  </div>
</div>`;
}

// ─── Meta ──────────────────────────────────────────────────────────────
export default {
  title: 'Components/ToggleGroup',
  render: renderToggleGroup,
  argTypes: {
    label: {
      description: 'Section label displayed above the buttons.',
      control: 'text',
    },
    groupName: {
      description: 'Unique identifier for the group (used in data-toggle-group and the toggle:change event).',
      control: 'text',
    },
    activeValue: {
      description: 'The value of the currently active button.',
      control: 'text',
    },
    options: {
      description: 'Array of { label, value } objects for each button.',
      control: 'object',
    },
    showDot: {
      description: 'Show a small radio-indicator dot inside each button.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      description: 'Disables all buttons in the group.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

// ─── Stories ───────────────────────────────────────────────────────────

/** Line type — Postpaid selected (default product page state) */
export const LineTypePostpaid = {
  name: 'Line Type — Postpaid Selected',
  args: {
    label: 'Choose Line Type',
    groupName: 'line-type',
    activeValue: 'postpaid',
    showDot: false,
    disabled: false,
    options: [
      { label: 'Prepaid', value: 'prepaid' },
      { label: 'Postpaid', value: 'postpaid' },
    ],
  },
};

/** Line type — Prepaid selected */
export const LineTypePrepaid = {
  name: 'Line Type — Prepaid Selected',
  args: {
    label: 'Choose Line Type',
    groupName: 'line-type',
    activeValue: 'prepaid',
    showDot: false,
    disabled: false,
    options: [
      { label: 'Prepaid', value: 'prepaid' },
      { label: 'Postpaid', value: 'postpaid' },
    ],
  },
};

/** SIM type — SIM Card selected */
export const SimTypeSIMCard = {
  name: 'SIM Type — SIM Card Selected',
  args: {
    label: 'Choose SIM Type',
    groupName: 'sim-type',
    activeValue: 'sim',
    showDot: false,
    disabled: false,
    options: [
      { label: 'SIM Card', value: 'sim' },
      { label: 'eSIM', value: 'esim' },
    ],
  },
};

/** SIM type — eSIM selected */
export const SimTypeESIM = {
  name: 'SIM Type — eSIM Selected',
  args: {
    label: 'Choose SIM Type',
    groupName: 'sim-type',
    activeValue: 'esim',
    showDot: false,
    disabled: false,
    options: [
      { label: 'SIM Card', value: 'sim' },
      { label: 'eSIM', value: 'esim' },
    ],
  },
};

/** With radio dot indicators */
export const WithDotIndicators = {
  args: {
    label: 'Choose Line Type',
    groupName: 'line-type-dot',
    activeValue: 'postpaid',
    showDot: true,
    disabled: false,
    options: [
      { label: 'Prepaid', value: 'prepaid' },
      { label: 'Postpaid', value: 'postpaid' },
    ],
  },
};

/** Three options */
export const ThreeOptions = {
  args: {
    label: 'Choose Plan',
    groupName: 'plan',
    activeValue: 'monthly',
    showDot: false,
    disabled: false,
    options: [
      { label: 'Daily', value: 'daily' },
      { label: 'Monthly', value: 'monthly' },
      { label: 'Yearly', value: 'yearly' },
    ],
  },
};

/** Disabled state */
export const Disabled = {
  args: {
    label: 'Choose Line Type',
    groupName: 'line-type-disabled',
    activeValue: 'postpaid',
    showDot: false,
    disabled: true,
    options: [
      { label: 'Prepaid', value: 'prepaid' },
      { label: 'Postpaid', value: 'postpaid' },
    ],
  },
};
