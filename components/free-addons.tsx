interface AddOn {
  name: string
  logoText: string
  logoColor: string
  description: string
}

interface FreeAddOnsProps {
  addons: AddOn[]
}

export function FreeAddOns({ addons }: FreeAddOnsProps) {
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-neutral-500)] mb-4">
        Free Add-Ons
      </h3>
      <div className="flex flex-col gap-5">
        {addons.map((addon, index) => (
          <div key={index}>
            <div
              className="inline-block mb-1.5 px-3 py-1 rounded text-sm font-bold"
              style={{ color: addon.logoColor, border: `1.5px solid ${addon.logoColor}` }}
              aria-label={addon.name}
            >
              {addon.logoText}
            </div>
            <p className="text-[13px] text-[var(--color-neutral-500)] leading-relaxed">{addon.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
