"use client"

export interface CommitmentPlan {
  id: string
  title: string
  firstMonthPayment: number
  monthlyFees: number
  tax: number
  simCard: number
  monthlyRecurringFees: number
}

interface CommitmentPlanCardProps {
  plan: CommitmentPlan
  selected: boolean
  onSelect: (id: string) => void
  currency?: string
}

export function CommitmentPlanCard({
  plan,
  selected,
  onSelect,
  currency = "JD",
}: CommitmentPlanCardProps) {
  return (
    <button
      onClick={() => onSelect(plan.id)}
      className={`flex-1 text-left rounded-xl border-[1.5px] p-4 transition-all cursor-pointer ${
        selected
          ? "border-[var(--color-brand)] bg-[var(--color-brand-light)]"
          : "border-[var(--color-neutral-300)] bg-white hover:border-[var(--color-brand)]"
      }`}
      role="radio"
      aria-checked={selected}
      aria-label={plan.title}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${
            selected
              ? "border-[var(--color-brand)] bg-[var(--color-brand)]"
              : "border-[var(--color-neutral-300)]"
          }`}
          aria-hidden="true"
        >
          {selected && (
            <span className="block w-full h-full rounded-full scale-50 bg-white" />
          )}
        </span>
        <span
          className={`text-sm font-semibold ${
            selected ? "text-[var(--color-brand)]" : "text-[var(--color-neutral-700)]"
          }`}
        >
          {plan.title}
        </span>
      </div>

      {/* First Month Payment */}
      <div className="flex items-start justify-between mb-0.5">
        <span className="text-[13px] text-[var(--color-neutral-500)]">First Month Payment</span>
        <span className="text-base font-bold text-[var(--color-neutral-900)]">
          {currency} {plan.firstMonthPayment.toFixed(2)}
        </span>
      </div>
      <p className="text-[11px] text-[var(--color-neutral-500)] mb-3">Including Tax</p>

      {/* Breakdown */}
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex justify-between text-[13px]">
          <span className="text-[var(--color-neutral-500)]">Monthly Fees</span>
          <span className="text-[var(--color-neutral-700)]">{currency} {plan.monthlyFees.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[13px]">
          <span className="text-[var(--color-neutral-500)]">Tax</span>
          <span className="text-[var(--color-neutral-700)]">{currency} {plan.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[13px]">
          <span className="text-[var(--color-neutral-500)]">SIM Card</span>
          <span className="text-[var(--color-neutral-700)]">{currency} {plan.simCard.toFixed(2)}</span>
        </div>
      </div>

      {/* Monthly Recurring */}
      <div className="border-t border-[var(--color-neutral-300)] pt-3 flex items-center justify-between">
        <span className="text-[13px] text-[var(--color-neutral-500)]">Monthly Recurring Fees</span>
        <span className="text-base font-bold text-[var(--color-neutral-900)]">
          {currency} {plan.monthlyRecurringFees.toFixed(2)}
          <span className="text-[11px] font-normal text-[var(--color-neutral-500)]">/month</span>
        </span>
      </div>
    </button>
  )
}
