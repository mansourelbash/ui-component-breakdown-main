import Image from "next/image"

interface ProductImageProps {
  src: string
  alt: string
}

export function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div className="bg-[var(--color-neutral-100)] rounded-2xl flex items-center justify-center p-8 min-h-[280px]">
      <div className="relative w-full max-w-[220px] aspect-square">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, 220px"
        />
      </div>
    </div>
  )
}
