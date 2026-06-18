"use client"

interface QuantityStepperProps {
  label?: string
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
}

export function QuantityStepper({
  label = "Quantity",
  value,
  min = 1,
  max = 10,
  onChange,
}: QuantityStepperProps) {
  const decrement = () => {
    if (value > min) onChange(value - 1)
  }

  const increment = () => {
    if (value < max) onChange(value + 1)
  }

  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-neutral-500)] mb-3">
        {label}
      </p>
      <div
        className="inline-flex items-center border border-[var(--color-neutral-300)] rounded-lg overflow-hidden"
        role="group"
        aria-label={`${label} stepper`}
      >
        <button
          onClick={decrement}
          disabled={value <= min}
          className="w-10 h-10 flex items-center justify-center text-lg bg-white text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)] disabled:text-[var(--color-neutral-300)] disabled:cursor-not-allowed transition-colors"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span
          className="w-12 h-10 flex items-center justify-center text-sm font-semibold border-x border-[var(--color-neutral-300)] text-[var(--color-neutral-900)]"
          aria-live="polite"
          aria-label={`Quantity: ${value}`}
        >
          {value}
        </span>
        <button
          onClick={increment}
          disabled={value >= max}
          className="w-10 h-10 flex items-center justify-center text-lg bg-white text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)] disabled:text-[var(--color-neutral-300)] disabled:cursor-not-allowed transition-colors"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  )
}
