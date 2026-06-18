"use client"

import { useState } from "react"
import { GitCompare, Share2, Heart } from "lucide-react"

interface ActionButtonsProps {
  onCompare?: () => void
  onShare?: () => void
  onWishlist?: () => void
}

export function ActionButtons({ onCompare, onShare, onWishlist }: ActionButtonsProps) {
  const [wishlisted, setWishlisted] = useState(false)

  const handleWishlist = () => {
    setWishlisted((prev) => !prev)
    onWishlist?.()
  }

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: document.title, url: window.location.href })
    }
    onShare?.()
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onCompare}
        className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--color-neutral-300)] bg-white text-sm text-[var(--color-neutral-700)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
        aria-label="Compare"
      >
        <GitCompare className="w-4 h-4" />
        <span>Compare</span>
      </button>

      <button
        onClick={handleShare}
        className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--color-neutral-300)] bg-white text-[var(--color-neutral-700)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
        aria-label="Share"
      >
        <Share2 className="w-4 h-4" />
      </button>

      <button
        onClick={handleWishlist}
        className={`w-9 h-9 flex items-center justify-center rounded-full border transition-colors ${
          wishlisted
            ? "bg-[var(--color-brand)] border-[var(--color-brand)] text-white"
            : "border-[var(--color-neutral-300)] bg-white text-[var(--color-neutral-700)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
        }`}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wishlisted}
      >
        <Heart className={`w-4 h-4 ${wishlisted ? "fill-white" : ""}`} />
      </button>
    </div>
  )
}
