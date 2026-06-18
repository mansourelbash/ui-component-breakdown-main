/**
 * CommitmentPlanCard — commitment-plan-card.stories.js
 *
 * Selectable pricing cards for choosing a contract commitment period.
 * jQuery manages selection state and fires a `plan:change` event.
 *
 * Plain HTML usage:
 *   - Wrap all cards in a div with class="plan-cards"
 *   - Each card has class="plan-card" and an optional "plan-card--selected"
 *   - A hidden <input type="radio"> inside the card provides the value
 */

/**
 * Renders a single plan card HTML string.
 * @param {{ title:string, value:string, firstPayment:string, monthlyFees:string, tax:string, simCard:string, monthlyRecurring:string, selected:boolean }} plan
 * @returns {string}
 */
function renderCard(plan) {
  const selectedClass = plan.selected ? ' plan-card--selected' : '';
  return `
  <div class="plan-card${selectedClass}" tabindex="0" role="radio" aria-checked="${plan.selected}">
    <input
      type="radio"
      class="plan-card__radio"
      name="commitment"
      value="${plan.value}"
      ${plan.selected ? 'checked' : ''}
      aria-label="${plan.title}"
    />
    <div class="plan-card__header">
      <span class="plan-card__radio-icon" aria-hidden="true"></span>
      <span class="plan-card__title">${plan.title}</span>
    </div>

    <div class="plan-card__row">
      <span class="plan-card__key">First Month Payment</span>
      <span class="plan-card__value plan-card__value--highlight">JD ${plan.firstPayment}</span>
    </div>
    <p class="plan-card__sub-note">Including Tax</p>

    <div class="plan-card__row">
      <span class="plan-card__key">Monthly Fees</span>
      <span class="plan-card__value">JD ${plan.monthlyFees}</span>
    </div>
    <div class="plan-card__row">
      <span class="plan-card__key">Tax</span>
      <span class="plan-card__value">JD ${plan.tax}</span>
    </div>
    <div class="plan-card__row">
      <span class="plan-card__key">SIM Card</span>
      <span class="plan-card__value">JD ${plan.simCard}</span>
    </div>

    <div class="plan-card__footer">
      <span class="plan-card__footer-key">Monthly Recurring Fees</span>
      <div class="plan-card__monthly-price">
        <span class="plan-card__monthly-amount">JD ${plan.monthlyRecurring}</span>
        <span class="plan-card__monthly-suffix">/month<br>Including Tax</span>
      </div>
    </div>
  </div>`;
}

/**
 * @param {{ selectedValue: string }} args
 * @returns {string}
 */
function renderPlanCards({ selectedValue }) {
  const plans = [
    {
      title: '24 Months Commitment',
      value: '24',
      firstPayment: '20.42',
      monthlyFees: '17.04',
      tax: '17.94',
      simCard: '3.02',
      monthlyRecurring: '17.22',
      selected: selectedValue === '24',
    },
    {
      title: '12 Months Commitment',
      value: '12',
      firstPayment: '13.50',
      monthlyFees: '15.00',
      tax: '15.00',
      simCard: '3.02',
      monthlyRecurring: '15.00',
      selected: selectedValue === '12',
    },
  ];

  return `<div class="plan-cards">${plans.map(renderCard).join('')}</div>`;
}

// ─── Meta ──────────────────────────────────────────────────────────────
export default {
  title: 'Components/CommitmentPlanCard',
  render: renderPlanCards,
  argTypes: {
    selectedValue: {
      description: 'Which plan is currently selected. Matches the radio input value.',
      control: 'radio',
      options: ['24', '12'],
      table: { defaultValue: { summary: '"24"' } },
    },
  },
};

// ─── Stories ───────────────────────────────────────────────────────────

/** 24-month plan pre-selected (default product page state) */
export const Selected24Months = {
  args: { selectedValue: '24' },
};

/** 12-month plan pre-selected */
export const Selected12Months = {
  args: { selectedValue: '12' },
};

/** Neither card selected (uncontrolled initial state) */
export const NoneSelected = {
  args: { selectedValue: '' },
};

/** Single card — for plans with only one commitment option */
export const SingleCard = {
  render: () => `
<div class="plan-cards">
  ${renderCard({
    title: '24 Months Commitment',
    value: '24',
    firstPayment: '20.42',
    monthlyFees: '17.04',
    tax: '17.94',
    simCard: '3.02',
    monthlyRecurring: '17.22',
    selected: true,
  })}
</div>`,
};
