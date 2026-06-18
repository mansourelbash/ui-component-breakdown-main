/**
 * Calendar — calendar.stories.js
 *
 * Interactive month-view calendar. Click prev/next to navigate months.
 * Click a day to select it. jQuery (calendar.js) powers all interactions.
 */

function calendarHTML(year, month) {
  const MONTHS   = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const WEEKDAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  const weekdayHtml = WEEKDAYS.map(d => `<span class="calendar__weekday">${d}</span>`).join('');

  return `
<div class="calendar" data-view-year="${year}" data-view-month="${month}" style="display:inline-flex;">
  <div class="calendar__header">
    <button class="calendar__nav calendar__nav--prev" aria-label="Previous month">&#8249;</button>
    <span class="calendar__month-year">${MONTHS[month]} ${year}</span>
    <button class="calendar__nav calendar__nav--next" aria-label="Next month">&#8250;</button>
  </div>
  <div class="calendar__weekdays">${weekdayHtml}</div>
  <div class="calendar__grid"><!-- filled by calendar.js --></div>
  <div class="calendar__footer">
    <button class="calendar__today-btn">Today</button>
    <span class="calendar__selected-display">No date selected</span>
  </div>
</div>`;
}

function renderCalendar({ year, month }) {
  return calendarHTML(year, month);
}

const NOW = new Date();

export default {
  title: 'Components/Calendar',
  tags: ['autodocs'],
  render: renderCalendar,
  argTypes: {
    year:  { control: 'number', description: 'Year to display initially.' },
    month: { control: 'number', description: 'Month to display (0 = January … 11 = December).' },
  },
};

export const CurrentMonth = {
  args: { year: NOW.getFullYear(), month: NOW.getMonth() },
};
export const January2026 = {
  name: 'January 2026',
  args: { year: 2026, month: 0 },
};
export const June2026 = {
  name: 'June 2026 (current)',
  args: { year: 2026, month: 5 },
};
export const December2026 = {
  name: 'December 2026',
  args: { year: 2026, month: 11 },
};
export const NextYear = {
  name: 'January 2027',
  args: { year: 2027, month: 0 },
};
