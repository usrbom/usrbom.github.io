"use client";

import {
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type RevealProps<T extends ElementType = "div"> = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  as?: T;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function Reveal<T extends ElementType = "div">({
  children,
  className,
  delayMs = 0,
  as: Tag = "div",
  once = true,
  threshold = 0.2,
  rootMargin = "0px 0px -8% 0px",
  ...rest
}: RevealProps<T>) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? "is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--reveal-delay": `${delayMs}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
