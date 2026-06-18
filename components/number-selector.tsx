"use client"

import { ChevronDown } from "lucide-react"

interface NumberSelectorProps {
  label?: string
  required?: boolean
  numbers: string[]
  value: string
  onChange: (value: string) => void
}

export function NumberSelector({
  label = "Select Number",
  required = true,
  numbers,
  value,
  onChange,
}: NumberSelectorProps) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-[var(--color-neutral-700)] mb-2">
        {label}
        {required && (
          <span className="text-[var(--color-brand)] ml-0.5" aria-label="required">
            *
          </span>
        )}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none px-4 py-3 pr-10 rounded-lg border border-[var(--color-neutral-300)] bg-white text-[14px] text-[var(--color-neutral-900)] cursor-pointer focus:outline-none focus:border-[var(--color-brand)] transition-colors"
          aria-label={label}
          aria-required={required}
        >
          {numbers.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-500)] pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
