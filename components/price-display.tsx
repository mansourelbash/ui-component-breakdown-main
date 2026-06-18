interface PriceDisplayProps {
  amount: number
  currency?: string
  note?: string
  align?: "left" | "right"
}

export function PriceDisplay({
  amount,
  currency = "JD",
  note = "Including Tax",
  align = "right",
}: PriceDisplayProps) {
  return (
    <div className={`flex flex-col ${align === "right" ? "items-end" : "items-start"}`}>
      <div className="flex items-baseline gap-0.5">
        <span className="text-sm font-semibold text-[var(--color-neutral-900)] align-super leading-none mr-0.5">
          {currency}
        </span>
        <span className="text-3xl font-bold text-[var(--color-neutral-900)] leading-none">
          {amount.toFixed(2)}
        </span>
      </div>
      {note && (
        <span className="text-[11px] text-[var(--color-neutral-500)] mt-0.5">{note}</span>
      )}
    </div>
  )
}
