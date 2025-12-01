import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
      <div className="space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-charcoal/10 bg-white px-3 py-1 text-xs font-medium text-charcoal/70 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Builder-first mindset
        </div>
        <h1 className="font-heading text-3xl leading-tight tracking-tight text-charcoal md:text-4xl lg:text-5xl">
          Hi, I&apos;m Utkarsh — a customer-focused builder crafting products at the intersection of <span className="text-accent"> technology, data and design.</span>
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-charcoal/80">
        UCLA Anderson MBA candidate focused on Technology Leadership & Product Management. Previously a Senior Software Engineer at ServiceNow, 
        where I spent 6+ years building automation frameworks and AI-powered prototypes for enterprise workflows.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="#projects"
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow"
          >
            View projects
          </Link>
          <Link
            href="/Utkarsh_Rawat_Resume.pdf"
            className="rounded-full border border-charcoal/10 bg-white px-5 py-2 text-sm font-semibold text-charcoal shadow-sm transition hover:-translate-y-0.5 hover:shadow"
          >
            Download resume
          </Link>
        </div>

        <p className="text-sm font-medium uppercase tracking-[0.24em] text-charcoal/50">
          AI · Product strategy · Prototyping · Enterprise software · GenAI
        </p>
      </div>

      <div className="relative flex justify-center md:justify-end">
        <div className="gradient-card relative h-64 w-64 overflow-hidden rounded-3xl border border-white/60 shadow-soft lg:h-72 lg:w-72">
          <Image
            src="utkarsh-headshot.jpg"
            alt="Utkarsh Rawat headshot"
            fill
            priority
            sizes="(min-width: 1024px) 18rem, (min-width: 768px) 16rem, 14rem"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/50" />
        </div>
      </div>
    </div>
  );
}
