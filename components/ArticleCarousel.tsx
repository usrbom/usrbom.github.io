"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Article } from "@/lib/articles";

type CarouselImage = NonNullable<Article["images"]>[number];

export default function ArticleCarousel({
  images,
}: {
  images: CarouselImage[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goTo = (index: number) => {
    const normalizedIndex = (index + images.length) % images.length;
    setActiveIndex(normalizedIndex);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = touchStartX.current - touchEndX;

    if (Math.abs(delta) > 40) {
      goTo(activeIndex + (delta > 0 ? 1 : -1));
    }

    touchStartX.current = null;
  };

  const handleSlideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - bounds.left;
    const isLeftHalf = clickX < bounds.width / 2;

    goTo(activeIndex + (isLeftHalf ? -1 : 1));
  };

  return (
    <section className="space-y-4 pt-4">
      <div
        className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-soft"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((image) => (
            <figure key={image.src} className="min-w-full">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-pale-gray">
                <Image
                  src={image.src}
                  alt=""
                  fill
                  aria-hidden
                  sizes="100vw"
                  className="scale-110 object-cover blur-2xl"
                />
                <div className="absolute inset-0 bg-white/30" />
                <div
                  className="absolute inset-0 flex cursor-pointer items-center justify-center p-4 md:p-6"
                  onClick={handleSlideClick}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1200}
                    height={900}
                    sizes="(min-width: 1024px) 900px, 100vw"
                    className="max-h-full w-auto max-w-full rounded-[1.25rem] object-contain shadow-soft"
                  />
                </div>
              </div>
              {image.caption ? (
                <figcaption className="border-t border-charcoal/8 px-5 py-4 text-sm text-charcoal/60">
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {images.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={image.src}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goTo(index)}
                className={`h-2.5 rounded-full transition ${
                  isActive
                    ? "w-8 bg-charcoal"
                    : "w-2.5 bg-charcoal/20 hover:bg-charcoal/35"
                }`}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            className="rounded-full border border-charcoal/10 bg-white px-4 py-2 text-sm font-medium text-charcoal shadow-sm transition hover:-translate-y-0.5 hover:shadow"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            className="rounded-full border border-charcoal/10 bg-white px-4 py-2 text-sm font-medium text-charcoal shadow-sm transition hover:-translate-y-0.5 hover:shadow"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
