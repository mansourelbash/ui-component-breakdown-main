/**
 * Datepicker — datepicker.stories.js
 *
 * Text input that opens a calendar popup on click.
 * Click a day to select and close. datepicker.js + calendar.js power interactions.
 */

function buildCalendarInner(year, month) {
  const MONTHS   = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const WEEKDAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  return `
  <div class="calendar" data-view-year="${year}" data-view-month="${month}">
    <div class="calendar__header">
      <button class="calendar__nav calendar__nav--prev" aria-label="Previous month">&#8249;</button>
      <span class="calendar__month-year">${MONTHS[month]} ${year}</span>
      <button class="calendar__nav calendar__nav--next" aria-label="Next month">&#8250;</button>
    </div>
    <div class="calendar__weekdays">${WEEKDAYS.map(d => `<span class="calendar__weekday">${d}</span>`).join('')}</div>
    <div class="calendar__grid"><!-- filled by calendar.js --></div>
    <div class="calendar__footer">
      <button class="calendar__today-btn">Today</button>
      <span class="calendar__selected-display">Click a date</span>
    </div>
  </div>`;
}

const CALENDAR_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;

function renderDatepicker({ label, placeholder, defaultOpen, alignRight }) {
  const NOW = new Date();
  const dpClass = ['datepicker', alignRight ? 'datepicker--align-right' : ''].filter(Boolean).join(' ');
  return `
<div style="padding:${defaultOpen ? '20px 20px 340px' : '20px'}; max-width:320px;">
  <div class="${dpClass}${defaultOpen ? ' is-open' : ''}">
    ${label ? `<label class="datepicker__label">${label}</label>` : ''}
    <div class="datepicker__wrap">
      <input type="text" class="datepicker__input" placeholder="${placeholder}" readonly />
      <span class="datepicker__icon">${CALENDAR_ICON}</span>
    </div>
    <div class="datepicker__panel${defaultOpen ? ' is-open' : ''}">
      ${buildCalendarInner(NOW.getFullYear(), NOW.getMonth())}
    </div>
  </div>
</div>`;
}

export default {
  title: 'Components/Datepicker',
  tags: ['autodocs'],
  render: renderDatepicker,
  argTypes: {
    label:       { control: 'text',    description: 'Field label shown above the input.' },
    placeholder: { control: 'text',    description: 'Placeholder text in the input.' },
    defaultOpen: { control: 'boolean', description: 'Start with the calendar panel open.' },
    alignRight:  { control: 'boolean', description: 'Align calendar popup to the right edge.' },
  },
};

export const Default      = { args: { label: 'Start Date', placeholder: 'Select a date', defaultOpen: false, alignRight: false } };
export const OpenByDefault = { name: 'Open by Default', args: { label: 'Contract Start Date', placeholder: 'Select a date', defaultOpen: true,  alignRight: false } };
export const NoLabel      = { args: { label: '', placeholder: 'Pick date', defaultOpen: false, alignRight: false } };
export const AlignRight   = { name: 'Right-aligned panel', args: { label: 'End Date', placeholder: 'Select a date', defaultOpen: true, alignRight: true } };
export const FilterDate   = { name: 'Filter / Search Bar', args: { label: '', placeholder: '📅 Filter by date', defaultOpen: false, alignRight: false } };
