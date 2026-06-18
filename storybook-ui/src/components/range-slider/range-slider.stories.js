/**
 * RangeSlider — range-slider.stories.js
 *
 * Dual-thumb range slider with number text inputs on left (min) and right (max).
 * Drag the orange thumbs or type directly into the inputs.
 * range-slider.js powers all interactions.
 */

function renderRangeSlider({ label, minVal, maxVal, absMin, absMax, unit, showHint }) {
  const fillLeft  = ((minVal - absMin) / (absMax - absMin)) * 100;
  const fillRight = ((absMax - maxVal) / (absMax - absMin)) * 100;

  return `
<div class="range-slider" data-min="${absMin}" data-max="${absMax}" style="max-width:480px;">
  ${label ? `<span class="range-slider__label">${label}</span>` : ''}
  <div class="range-slider__body">
    <input type="number" class="range-slider__number range-slider__number--min"
      value="${minVal}" min="${absMin}" max="${absMax}"
      aria-label="Minimum ${label || 'value'}" />

    <div class="range-slider__track-wrap">
      <div class="range-slider__track"></div>
      <div class="range-slider__fill" style="left:${fillLeft}%;right:${fillRight}%;"></div>
      <input type="range" class="range-slider__range range-slider__range--min"
        min="${absMin}" max="${absMax}" value="${minVal}" aria-label="Minimum slider" />
      <input type="range" class="range-slider__range range-slider__range--max"
        min="${absMin}" max="${absMax}" value="${maxVal}" aria-label="Maximum slider" />
    </div>

    <input type="number" class="range-slider__number range-slider__number--max"
      value="${maxVal}" min="${absMin}" max="${absMax}"
      aria-label="Maximum ${label || 'value'}" />
  </div>
  ${showHint ? `
  <div class="range-slider__hint">
    <span class="range-slider__hint-min">${unit}${minVal}</span>
    <span class="range-slider__hint-max">${unit}${maxVal}</span>
  </div>` : ''}
</div>`;
}

export default {
  title: 'Components/RangeSlider',
  tags: ['autodocs'],
  render: renderRangeSlider,
  argTypes: {
    label:    { control: 'text',    description: 'Label above the slider.' },
    minVal:   { control: 'number',  description: 'Initial minimum value.' },
    maxVal:   { control: 'number',  description: 'Initial maximum value.' },
    absMin:   { control: 'number',  description: 'Absolute minimum of the range.' },
    absMax:   { control: 'number',  description: 'Absolute maximum of the range.' },
    unit:     { control: 'text',    description: 'Unit prefix shown in hint (e.g. "JD ").' },
    showHint: { control: 'boolean', description: 'Show min/max values below the slider.' },
  },
};

export const Default = {
  args: { label: 'Price Range', minVal: 15, maxVal: 30, absMin: 0, absMax: 50, unit: 'JD ', showHint: true },
};
export const DataRange = {
  name: 'Data Amount (GB)',
  args: { label: 'Data Bundle', minVal: 50, maxVal: 200, absMin: 0, absMax: 300, unit: '', showHint: true },
};
export const FullRange = {
  name: 'Full Range Selected',
  args: { label: 'Monthly Budget', minVal: 0, maxVal: 50, absMin: 0, absMax: 50, unit: 'JD ', showHint: true },
};
export const NarrowRange = {
  name: 'Narrow Selection',
  args: { label: 'Price Range', minVal: 18, maxVal: 22, absMin: 0, absMax: 50, unit: 'JD ', showHint: true },
};
export const NoLabel = {
  name: 'No Label',
  args: { label: '', minVal: 20, maxVal: 80, absMin: 0, absMax: 100, unit: '', showHint: false },
};
export const Percentage = {
  name: 'Percentage Range',
  args: { label: 'Discount Range', minVal: 10, maxVal: 40, absMin: 0, absMax: 100, unit: '', showHint: true },
};
export const CommitmentMonths = {
  name: 'Commitment Months',
  args: { label: 'Contract Duration', minVal: 6, maxVal: 24, absMin: 1, absMax: 36, unit: '', showHint: true },
};
