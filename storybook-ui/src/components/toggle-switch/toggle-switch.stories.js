/**
 * ToggleSwitch — toggle-switch.stories.js
 *
 * On/Off switch control. Fires switch:change event when toggled.
 * toggle-switch.js powers event firing.
 */

function renderToggleSwitch({ label, subLabel, checked, size, disabled, labelPosition }) {
  const cls = ['toggle-switch', size !== 'default' ? 'toggle-switch--' + size : '', disabled ? 'toggle-switch--disabled' : '', labelPosition === 'left' ? 'toggle-switch--label-left' : ''].filter(Boolean).join(' ');

  return `
<label class="${cls}">
  <input type="checkbox" class="toggle-switch__input" ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} />
  <span class="toggle-switch__track">
    <span class="toggle-switch__thumb"></span>
  </span>
  ${label ? `<span class="toggle-switch__label">
    ${label}
    ${subLabel ? `<span class="toggle-switch__label-sub">${subLabel}</span>` : ''}
  </span>` : ''}
</label>`;
}

export default {
  title: 'Components/ToggleSwitch',
  tags: ['autodocs'],
  render: renderToggleSwitch,
  argTypes: {
    label:         { control: 'text',    description: 'Main label text.' },
    subLabel:      { control: 'text',    description: 'Optional secondary line under label.' },
    checked:       { control: 'boolean', description: 'Initial checked (on) state.' },
    size:          { control: 'radio',   options: ['default', 'sm', 'lg'], description: 'Size variant.' },
    disabled:      { control: 'boolean', description: 'Disabled state.' },
    labelPosition: { control: 'radio',   options: ['right', 'left'], description: 'Label position relative to track.' },
  },
};

export const Off        = { args: { label: 'Enable Notifications', subLabel: '', checked: false, size: 'default', disabled: false, labelPosition: 'right' } };
export const On         = { args: { label: 'Enable Notifications', subLabel: '', checked: true,  size: 'default', disabled: false, labelPosition: 'right' } };
export const WithSub    = { name: 'With Sub-label', args: { label: 'Data Carry Over', subLabel: 'Unused data rolls to next month', checked: true, size: 'default', disabled: false, labelPosition: 'right' } };
export const Small      = { args: { label: '5G',               subLabel: '', checked: true,  size: 'sm',      disabled: false, labelPosition: 'right' } };
export const Large      = { args: { label: 'Auto-Renew',       subLabel: '', checked: false, size: 'lg',      disabled: false, labelPosition: 'right' } };
export const Disabled   = { args: { label: 'Roaming (Locked)', subLabel: '', checked: false, size: 'default', disabled: true,  labelPosition: 'right' } };
export const LabelLeft  = { name: 'Label on Left',  args: { label: 'eSIM', subLabel: '', checked: true, size: 'default', disabled: false, labelPosition: 'left' } };
export const NoLabel    = { args: { label: '', subLabel: '', checked: true, size: 'default', disabled: false, labelPosition: 'right' } };

/** Typical settings panel */
export const SettingsGroup = {
  render: () => `
<div style="display:flex;flex-direction:column;gap:16px;max-width:360px;">
  <label class="toggle-switch">
    <input type="checkbox" class="toggle-switch__input" checked />
    <span class="toggle-switch__track"><span class="toggle-switch__thumb"></span></span>
    <span class="toggle-switch__label">Data Carry Over<span class="toggle-switch__label-sub">Unused data rolls to next month</span></span>
  </label>
  <label class="toggle-switch">
    <input type="checkbox" class="toggle-switch__input" />
    <span class="toggle-switch__track"><span class="toggle-switch__thumb"></span></span>
    <span class="toggle-switch__label">International Roaming<span class="toggle-switch__label-sub">Charges apply outside Jordan</span></span>
  </label>
  <label class="toggle-switch">
    <input type="checkbox" class="toggle-switch__input" checked />
    <span class="toggle-switch__track"><span class="toggle-switch__thumb"></span></span>
    <span class="toggle-switch__label">SMS Notifications</span>
  </label>
  <label class="toggle-switch toggle-switch--disabled">
    <input type="checkbox" class="toggle-switch__input" disabled />
    <span class="toggle-switch__track"><span class="toggle-switch__thumb"></span></span>
    <span class="toggle-switch__label">5G Service<span class="toggle-switch__label-sub">Not available on this plan</span></span>
  </label>
</div>`,
};
