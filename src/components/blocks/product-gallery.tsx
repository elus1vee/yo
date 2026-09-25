"use client";

import Image from "next/image";
import { useState } from "react";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cn } from "@/lib/utils";
import { type CardTint, cardTintClass } from "./types";

export interface GalleryImage {
  id: string;
  alt: string;
  /** Without a src the striped placeholder (with `caption`) is shown. */
  src?: string;
  tint: CardTint;
  /** Describes a missing photo, e.g. "упаковка сзади" (placeholder only). */
  caption?: string;
}

export interface ProductGalleryProps {
  images: GalleryImage[];
  /** aria-label of the thumbnail group, e.g. "Фотографии товара". */
  label: string;
}

function Frame({
  image,
  sizes,
  showCaption,
  captionClassName,
}: {
  image: GalleryImage;
  sizes: string;
  showCaption?: boolean;
  captionClassName?: string;
}) {
  return image.src ? (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      className="object-cover"
    />
  ) : (
    <ImagePlaceholder
      variant="tint"
      tint={image.tint}
      caption={showCaption ? image.caption : undefined}
      captionClassName={captionClassName}
    />
  );
}

/** Large photo plus a row of thumbnails; clicking a thumbnail swaps the photo. */
export function ProductGallery({ images, label }: ProductGalleryProps) {
  const [activeId, setActiveId] = useState(images[0]?.id);
  const active = images.find((image) => image.id === activeId) ?? images[0];
  if (!active) return null;

  return (
    <div className="tablet:gap-3.5 flex flex-col gap-3">
      <div
        className={cn(
          "tablet:h-[440px] tablet:rounded-lg rounded-panel-sm relative h-[340px] overflow-hidden",
          cardTintClass[active.tint],
        )}
      >
        <Frame image={active} sizes="(min-width: 1024px) 660px, 100vw" />
        {/* placeholders carry no alt text of their own */}
        {!active.src && <span className="sr-only">{active.alt}</span>}
      </div>

      {images.length > 1 && (
        <ul aria-label={label} className="tablet:gap-3 flex gap-2.5">
          {images.map((image) => (
            <li key={image.id}>
              <button
                type="button"
                aria-label={image.alt}
                aria-pressed={image.id === active.id}
                onClick={() => setActiveId(image.id)}
                className={cn(
                  "tablet:size-[100px] rounded-photo-sm block size-[76px] border-2 p-0 transition-colors",
                  "focus-ring",
                  image.id === active.id
                    ? "border-primary"
                    : "hover:border-border-strong border-transparent",
                )}
              >
                <span
                  className={cn(
                    "tablet:rounded-field relative block size-full overflow-hidden rounded-sm",
                    cardTintClass[image.tint],
                  )}
                >
                  <Frame
                    image={image}
                    sizes="100px"
                    showCaption
                    captionClassName="px-1 text-center text-[7px] tracking-[0.04em] tablet:text-[8px]"
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
