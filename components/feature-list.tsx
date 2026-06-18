interface FeatureListProps {
  title: string
  features: string[]
  accentColor?: string
}

export function FeatureList({ title, features, accentColor = "var(--color-brand)" }: FeatureListProps) {
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-neutral-500)] mb-3">
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2.5 text-sm text-[var(--color-neutral-700)]">
            <span
              className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: accentColor }}
              aria-hidden="true"
            />
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
