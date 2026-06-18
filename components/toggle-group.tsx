"use client"

interface ToggleOption {
  label: string
  value: string
}

interface ToggleGroupProps {
  label: string
  options: ToggleOption[]
  value: string
  onChange: (value: string) => void
  name: string
}

export function ToggleGroup({ label, options, value, onChange, name }: ToggleGroupProps) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-neutral-500)] mb-3">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label={label}>
        {options.map((option) => {
          const isSelected = value === option.value
          return (
            <button
              key={option.value}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                isSelected
                  ? "bg-[var(--color-brand)] border-[var(--color-brand)] text-white"
                  : "bg-white border-[var(--color-neutral-300)] text-[var(--color-neutral-700)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
