"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { ArrowIcon } from "@/components/ui/icons";
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

/** Round arrow over the edge of the thumbnail strip. */
function StripArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  // Mouse-only convenience: touch users swipe, keyboard users tab through the
  // thumbnails (the browser scrolls the focused one into view).
  return (
    <button
      type="button"
      aria-hidden="true"
      tabIndex={-1}
      onClick={onClick}
      className={cn(
        "bg-surface text-text absolute top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full shadow-md",
        direction === "prev" ? "left-1" : "right-1",
      )}
    >
      <ArrowIcon
        size={16}
        className={direction === "prev" ? "rotate-180" : undefined}
      />
    </button>
  );
}

/**
 * Large photo plus a single-row thumbnail strip that scrolls sideways when the
 * photos don't fit (swipe, or the edge arrows); clicking a thumbnail swaps the
 * photo.
 */
export function ProductGallery({ images, label }: ProductGalleryProps) {
  const [activeId, setActiveId] = useState(images[0]?.id);
  const [canScroll, setCanScroll] = useState({ prev: false, next: false });
  const stripRef = useRef<HTMLUListElement>(null);
  const active = images.find((image) => image.id === activeId) ?? images[0];

  const updateArrows = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const prev = strip.scrollLeft > 1;
    const next = strip.scrollLeft + strip.clientWidth < strip.scrollWidth - 1;
    setCanScroll((state) =>
      state.prev === prev && state.next === next ? state : { prev, next },
    );
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    updateArrows();
    const observer = new ResizeObserver(updateArrows);
    observer.observe(strip);
    return () => observer.disconnect();
  }, [updateArrows, images.length]);

  const scrollStrip = (direction: 1 | -1) =>
    stripRef.current?.scrollBy({
      left: direction * stripRef.current.clientWidth * 0.8,
      behavior: "smooth",
    });

  // Scrolls only the strip (not the page) so the clicked thumbnail is fully visible.
  const revealThumb = (thumb: HTMLElement) => {
    const strip = stripRef.current;
    if (!strip) return;
    const left = thumb.offsetLeft;
    const right = left + thumb.offsetWidth;
    if (left < strip.scrollLeft)
      strip.scrollTo({ left: left - 8, behavior: "smooth" });
    else if (right > strip.scrollLeft + strip.clientWidth)
      strip.scrollTo({
        left: right - strip.clientWidth + 8,
        behavior: "smooth",
      });
  };

  if (!active) return null;

  return (
    <div className="tablet:gap-3.5 flex min-w-0 flex-col gap-3">
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
        <div className="relative">
          {/* the padding / negative margin leave room for the focus ring, which overflow would clip */}
          <ul
            ref={stripRef}
            aria-label={label}
            onScroll={updateArrows}
            className="tablet:gap-3 relative -m-1.5 flex snap-x scroll-pl-1.5 [scrollbar-width:none] gap-2.5 overflow-x-auto p-1.5 [&::-webkit-scrollbar]:hidden"
          >
            {images.map((image) => (
              <li key={image.id} className="shrink-0 snap-start">
                <button
                  type="button"
                  aria-label={image.alt}
                  aria-pressed={image.id === active.id}
                  onClick={(event) => {
                    setActiveId(image.id);
                    revealThumb(event.currentTarget.parentElement!);
                  }}
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
          {canScroll.prev && (
            <StripArrow direction="prev" onClick={() => scrollStrip(-1)} />
          )}
          {canScroll.next && (
            <StripArrow direction="next" onClick={() => scrollStrip(1)} />
          )}
        </div>
      )}
    </div>
  );
}
