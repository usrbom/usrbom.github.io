"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, useCallback } from "react";

const sections = [
  { href: "#home", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#timeline", label: "Timeline" },
  { href: "#articles", label: "Articles" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleScroll = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!isHomePage) {
        return;
      }

      event.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [isHomePage]
  );

  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/70 bg-pale-gray/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href={isHomePage ? "#home" : "/#home"}
          onClick={(event) => handleScroll(event, "#home")}
          className="text-sm font-semibold tracking-tight transition hover:text-accent"
        >
          Utkarsh Singh Rawat
        </Link>
        <div className="hidden items-center gap-5 text-sm text-charcoal/70 md:flex">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={isHomePage ? section.href : `/${section.href}`}
              onClick={(event) => handleScroll(event, section.href)}
              className="transition hover:text-charcoal"
            >
              {section.label}
            </Link>
          ))}
        </div>
        <Link
          href={isHomePage ? "#contact" : "/#contact"}
          onClick={(event) => handleScroll(event, "#contact")}
          className="rounded-full border border-charcoal/10 bg-white px-3 py-1 text-xs font-medium text-charcoal shadow-sm transition hover:-translate-y-0.5 hover:shadow"
        >
          Let&apos;s talk
        </Link>
      </nav>
    </header>
  );
}
