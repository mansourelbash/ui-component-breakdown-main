"use client"

interface CTAButtonsProps {
  onBuyNow?: () => void
  onAddToCart?: () => void
  disabled?: boolean
  loading?: boolean
}

export function CTAButtons({
  onBuyNow,
  onAddToCart,
  disabled = false,
  loading = false,
}: CTAButtonsProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onBuyNow}
        disabled={disabled || loading}
        className="flex-1 py-4 rounded-full text-sm font-bold uppercase tracking-wider bg-[var(--color-neutral-900)] text-white hover:bg-[var(--color-neutral-700)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Buy now"
      >
        {loading ? "Processing..." : "Buy Now"}
      </button>
      <button
        onClick={onAddToCart}
        disabled={disabled || loading}
        className="flex-1 py-4 rounded-full text-sm font-bold uppercase tracking-wider bg-[var(--color-brand)] text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        aria-label="Add to cart"
      >
        Add to Cart
      </button>
    </div>
  )
}
