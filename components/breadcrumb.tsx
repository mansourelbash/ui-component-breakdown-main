import { ChevronRight } from "lucide-react"
import Link from "next/link"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight className="w-3 h-3 text-[var(--color-neutral-500)]" aria-hidden="true" />
              )}
              {isLast || !item.href ? (
                <span
                  className={`text-xs ${isLast ? "text-[var(--color-neutral-900)] font-medium" : "text-[var(--color-neutral-500)]"}`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-xs text-[var(--color-neutral-500)] hover:underline hover:text-[var(--color-brand)] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
