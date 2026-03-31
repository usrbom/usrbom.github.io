"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, useCallback } from "react";

const sections = [
  { href: "#home", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#timeline", label: "Timeline" },
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
    <header className="fixed left-0 right-0 top-0 z-30">
      <nav className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-full bg-pale-gray/70 px-4 py-3 backdrop-blur-[20px] md:px-6">
        <Link
          href={isHomePage ? "#home" : "/#home"}
          onClick={(event) => handleScroll(event, "#home")}
          className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-accent transition hover:text-charcoal md:text-[15px]"
        >
          Utkarsh Rawat
        </Link>

        <div className="hidden items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-charcoal/60 md:flex">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={isHomePage ? section.href : `/${section.href}`}
              onClick={(event) => handleScroll(event, section.href)}
              className="transition hover:text-accent"
            >
              {section.label}
            </Link>
          ))}
          <Link href="/articles" className="transition hover:text-accent">
            Articles
          </Link>
        </div>

        <Link
          href={isHomePage ? "#contact" : "/#contact"}
          onClick={(event) => handleScroll(event, "#contact")}
          className="rounded-md bg-accent-gradient px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-soft transition hover:-translate-y-0.5"
        >
          Let&apos;s talk
        </Link>
      </nav>
    </header>
  );
}
