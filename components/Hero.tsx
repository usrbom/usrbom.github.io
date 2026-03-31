import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function Hero() {
  return (
    <div className="grid items-start gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
      <div className="space-y-8 pt-8 lg:pt-12">
        <Reveal delayMs={80}>
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal/65 shadow-soft backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-signal" />
          Builder-first mindset
          </div>
        </Reveal>

        <Reveal delayMs={180}>
          <div>
          <h1 className="max-w-5xl font-heading text-5xl font-bold leading-[0.92] tracking-[-0.04em] text-charcoal md:text-6xl lg:text-7xl">
            Hi, I&apos;m Utkarsh, a customer-focused builder crafting products
            at the intersection of{" "}
            <span className="text-accent">technology, data and design.</span>
          </h1>
          </div>
        </Reveal>

        <Reveal delayMs={300}>
          <p className="max-w-3xl text-base leading-8 text-charcoal/78 md:text-lg">
          UCLA Anderson MBA candidate focused on Technology Leadership &amp;
          Product Management. Previously a Senior Software Engineer at
          ServiceNow, where I spent 6+ years building automation frameworks and
          AI-powered prototypes for enterprise workflows.
          </p>
        </Reveal>

        <Reveal delayMs={420}>
          <div className="flex flex-wrap gap-3">
          <Link
            href="#projects"
            className="rounded-md bg-accent-gradient px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
          >
            View projects
          </Link>
          <Link
            href="/Utkarsh_Rawat_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-surface-white/80 px-5 py-3 text-sm font-semibold text-charcoal shadow-soft ring-1 ring-accent/10 transition hover:-translate-y-0.5"
          >
            View resume
          </Link>
          </div>
        </Reveal>

        <Reveal delayMs={520}>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-charcoal/50">
          AI · Product strategy · Prototyping · Enterprise software · GenAI
          </p>
        </Reveal>
      </div>

      <Reveal
        delayMs={260}
        className="relative flex justify-center pt-6 lg:justify-end lg:pt-28"
      >
        <div className="surface-panel relative w-full max-w-sm overflow-hidden rounded-[2rem] p-4 shadow-float">
          <div className="relative aspect-[0.9] overflow-hidden rounded-[1.6rem] bg-surface-low">
            <Image
              src="/utkarsh-cropped-tieless.png"
              alt="Utkarsh Rawat headshot"
              fill
              priority
              sizes="(min-width: 1024px) 24rem, (min-width: 768px) 20rem, 18rem"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_45%,rgba(9,29,45,0.12)_100%)]" />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
