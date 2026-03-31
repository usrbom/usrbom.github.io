"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Milestone = {
  year: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  size: "wide" | "standard" | "tall";
};

const ENABLE_TIMELINE_SCROLL_LOCK = false;
const AUTO_SCROLL_EDGE_WIDTH = 140;
const AUTO_SCROLL_MAX_SPEED = 18;

const timeline: Milestone[] = [
  {
    year: "2015",
    title: "Indian Institute of Technology, Varanasi (IIT BHU)",
    description:
      "Started my undergraduate journey in Mining Engineering at IIT BHU, where I also served as a Training and Placement Cell representative and contributed to the Fine Arts and Aeromodelling clubs.",
    image: "/timeline/iit-bhu.jpg",
    imageAlt: "IIT BHU milestone visual",
    size: "wide",
  },
  {
    year: "2018",
    title: "Wipro Summer Internship",
    description:
      "Built workflow automations that reduced manual reporting effort, improved cross-team visibility, and contributed to an estimated $1.1M in annual operational savings.",
    image: "/timeline/wipro.jpg",
    imageAlt: "Wipro milestone visual",
    size: "tall",
  },
  {
    year: "2019",
    title: "ServiceNow Full-time",
    description:
      "Joined ServiceNow as an Associate Software Engineer and began building CRM workflows, automation systems, and enterprise product experiences at scale.",
    image: "/timeline/servicenow.jpg",
    imageAlt: "ServiceNow milestone visual",
    size: "standard",
  },
  {
    year: "2023",
    title: "Knowledge '23 Keynote demo",
    description:
      "Built a GenAI-powered recommendation experience for CRM agents that was featured during ServiceNow's Knowledge keynote in Las Vegas for thousands of enterprise customers.",
    image: "/timeline/knowledge23.jpg",
    imageAlt: "Knowledge 23 keynote milestone visual",
    size: "wide",
  },
  {
    year: "2025",
    title: "University of California, Los Angeles (UCLA) Anderson Full-Time MBA",
    description:
      "Moved to Los Angeles to pursue the full-time MBA at UCLA Anderson, expanding my technical background with deeper leadership, strategy, and product thinking.",
    image: "/timeline/ucla-mba.jpeg",
    imageAlt: "UCLA MBA milestone visual",
    size: "standard",
  },
  {
    year: "2025",
    title: "Penny, AI Insights Engine",
    description:
      "Designed Penny, an AI insights engine for the banking industry that improved product discovery for PNC and won first place at the Tepper Tech Innovation Challenge among 50 MBA teams from 16 leading business schools.",
    image: "/timeline/penny-pnc.jpeg",
    imageAlt: "Penny PNC milestone visual",
    size: "wide",
  },
];

const cardWidths: Record<Milestone["size"], number> = {
  wide: 512,
  standard: 384,
  tall: 352,
};

const sizeClasses: Record<Milestone["size"], string> = {
  wide: "w-[32rem]",
  standard: "w-[24rem]",
  tall: "w-[22rem]",
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function Timeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [hoverDirection, setHoverDirection] = useState<"left" | "right" | null>(null);
  const autoScrollVelocityRef = useRef(0);

  const trackWidth = useMemo(() => {
    const gaps = 20 * (timeline.length - 1);
    const padding = 24;
    return timeline.reduce((sum, item) => sum + cardWidths[item.size], 0) + gaps + padding;
  }, []);

  useEffect(() => {
    if (!ENABLE_TIMELINE_SCROLL_LOCK) {
      setProgress(0);
      return;
    }

    const updateBounds = () => {
      const section = sectionRef.current;
      const viewport = viewportRef.current;
      if (!section || !viewport) return;

      const viewportWidth = viewport.clientWidth;
      const maxScrollable = Math.max(trackWidth - viewportWidth, 1);
      setProgress((current) => clamp(current, 0, 1));
      return maxScrollable;
    };

    const onWheel = (event: WheelEvent) => {
      if (window.innerWidth < 1024) return;

      const section = sectionRef.current;
      const sticky = stickyRef.current;
      const viewport = viewportRef.current;
      if (!section || !sticky || !viewport) return;

      const stickyRect = sticky.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const inCaptureZone =
        stickyRect.top <= 80 &&
        stickyRect.bottom >= window.innerHeight - 80 &&
        sectionRect.top <= 120;

      if (!inCaptureZone) return;

      const delta = event.deltaY;
      const scrollingDown = delta > 0;
      const scrollingUp = delta < 0;
      const canAdvance = scrollingDown && progress < 1;
      const canRewind = scrollingUp && progress > 0;

      if (!canAdvance && !canRewind) return;

      event.preventDefault();
      const maxScrollable = Math.max(trackWidth - viewport.clientWidth, 1);
      const deltaProgress = delta / maxScrollable;
      setProgress((current) => clamp(current + deltaProgress, 0, 1));
    };

    updateBounds();
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", updateBounds);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", updateBounds);
    };
  }, [progress, trackWidth]);

  useEffect(() => {
    if (ENABLE_TIMELINE_SCROLL_LOCK) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    const syncProgress = () => {
      const maxScrollable = Math.max(viewport.scrollWidth - viewport.clientWidth, 1);
      const nextProgress = clamp(viewport.scrollLeft / maxScrollable, 0, 1);
      setProgress(nextProgress);
    };

    syncProgress();
    viewport.addEventListener("scroll", syncProgress, { passive: true });

    return () => {
      viewport.removeEventListener("scroll", syncProgress);
    };
  }, []);

  useEffect(() => {
    if (ENABLE_TIMELINE_SCROLL_LOCK) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    let frameId = 0;

    const tick = () => {
      const velocity = autoScrollVelocityRef.current;

      if (Math.abs(velocity) > 0.1) {
        const maxScrollable = Math.max(viewport.scrollWidth - viewport.clientWidth, 0);
        const nextScrollLeft = clamp(viewport.scrollLeft + velocity, 0, maxScrollable);
        viewport.scrollLeft = nextScrollLeft;
        frameId = window.requestAnimationFrame(tick);
      } else {
        frameId = 0;
      }
    };

    const start = () => {
      if (frameId !== 0) return;
      frameId = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      autoScrollVelocityRef.current = 0;
      setHoverDirection(null);
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = viewport.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const distanceToRight = rect.width - offsetX;

      let velocity = 0;

      if (distanceToRight < AUTO_SCROLL_EDGE_WIDTH) {
        const ratio = 1 - distanceToRight / AUTO_SCROLL_EDGE_WIDTH;
        velocity = ratio * AUTO_SCROLL_MAX_SPEED;
        setHoverDirection("right");
      } else if (offsetX < AUTO_SCROLL_EDGE_WIDTH) {
        const ratio = 1 - offsetX / AUTO_SCROLL_EDGE_WIDTH;
        velocity = -ratio * AUTO_SCROLL_MAX_SPEED;
        setHoverDirection("left");
      } else {
        setHoverDirection(null);
      }

      autoScrollVelocityRef.current = velocity;

      if (Math.abs(velocity) > 0.1) {
        start();
      } else {
        stop();
      }
    };

    viewport.addEventListener("pointermove", handlePointerMove);
    viewport.addEventListener("pointerleave", stop);

    return () => {
      viewport.removeEventListener("pointermove", handlePointerMove);
      viewport.removeEventListener("pointerleave", stop);
      stop();
    };
  }, []);

  const viewportWidth = viewportRef.current?.clientWidth ?? 0;
  const maxTranslate = Math.max(trackWidth - viewportWidth, 0);
  const translateX = ENABLE_TIMELINE_SCROLL_LOCK ? maxTranslate * progress : 0;
  const activeIndex = Math.min(
    timeline.length - 1,
    Math.round(progress * (timeline.length - 1))
  );

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="section-kicker">Path so far</p>
        <h2 className="font-heading text-3xl font-bold tracking-[-0.03em] text-charcoal md:text-4xl">
          Timeline
        </h2>
        <p className="max-w-2xl text-base leading-7 text-charcoal/74">
          Key milestones across engineering, product-building, and business
          school that shaped how I approach technology and leadership today.
        </p>
      </div>

      <section
        ref={sectionRef}
        className={ENABLE_TIMELINE_SCROLL_LOCK ? "relative min-h-screen" : "relative"}
      >
        <div
          ref={stickyRef}
          className={
            ENABLE_TIMELINE_SCROLL_LOCK
              ? "sticky top-0 flex min-h-screen flex-col justify-center"
              : "flex flex-col"
          }
        >
          <div className="surface-panel overflow-hidden rounded-[2rem] p-5 shadow-soft md:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal/48">
                <span className="rounded-full bg-charcoal px-3 py-1 text-white">
                  Career Journey
                </span>
                {ENABLE_TIMELINE_SCROLL_LOCK ? (
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">
                    Scroll to explore
                  </span>
                ) : null}
              </div>
            </div>

            <div
              ref={viewportRef}
              className={
                ENABLE_TIMELINE_SCROLL_LOCK
                  ? "overflow-hidden rounded-[1.75rem] pb-3"
                  : `relative overflow-x-auto rounded-[1.75rem] pb-3 ${
                      hoverDirection ? "cursor-none" : "cursor-default"
                    }`
              }
            >
              {!ENABLE_TIMELINE_SCROLL_LOCK && hoverDirection ? (
                <div
                  className={`pointer-events-none fixed top-1/2 z-[80] -translate-y-1/2 ${
                    hoverDirection === "right" ? "right-6" : "left-6"
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/90 text-xl text-white shadow-float">
                    <span aria-hidden className="leading-none">
                      {hoverDirection === "right" ? "→" : "←"}
                    </span>
                  </div>
                </div>
              ) : null}
              <div
                className="flex w-max items-start gap-5 pr-6"
                style={{
                  transform: `translate3d(-${translateX}px, 0, 0)`,
                  transition: ENABLE_TIMELINE_SCROLL_LOCK
                    ? "transform 60ms linear"
                    : undefined,
                }}
              >
                {timeline.map((item, index) => (
                  <article
                    key={`${item.year}-${item.title}`}
                    className={`flex shrink-0 flex-col gap-4 ${sizeClasses[item.size]}`}
                  >
                    <div className="relative overflow-hidden rounded-[1.35rem]">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        width={1600}
                        height={1200}
                        sizes="(min-width: 1024px) 32rem, 24rem"
                        className={`h-auto w-full rounded-[1.35rem] ${
                          index === activeIndex ? "ring-1 ring-accent/12" : ""
                        }`}
                      />
                    </div>

                    <div className="max-w-[24rem] space-y-3 px-1">
                      <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal/48">
                        <span className="text-accent">{item.year}</span>
                        {index + 1} / {timeline.length}
                      </div>
                      <h3 className="font-heading text-2xl font-semibold leading-8 tracking-[-0.03em] text-charcoal">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-7 text-charcoal/72 md:text-base">
                        {item.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
