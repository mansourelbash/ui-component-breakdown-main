import { Tag } from "lucide-react"

interface PromoBannerProps {
  message: string
}

export function PromoBanner({ message }: PromoBannerProps) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-lg border"
      style={{
        background: "var(--color-brand-light)",
        borderColor: "var(--color-brand-border)",
      }}
      role="note"
      aria-label="Promotion"
    >
      <span
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full"
        style={{ background: "var(--color-brand-border)" }}
        aria-hidden="true"
      >
        <Tag className="w-4 h-4" style={{ color: "var(--color-brand)" }} />
      </span>
      <p className="text-sm text-[var(--color-neutral-700)]">{message}</p>
    </div>
  )
}
