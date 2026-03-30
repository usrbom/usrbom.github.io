import type { ReactNode } from "react";
import Link from "next/link";

type SocialLink = {
  href: string;
  label: string;
  icon: ReactNode;
};

const socialLinks: SocialLink[] = [
  {
    href: "mailto:utkarshrawat27@gmail.com",
    label: "Gmail",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none">
        <path
          d="M3 6.75 12 13.5l9-6.75"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 5.25h15A1.5 1.5 0 0 1 21 6.75v10.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.25V6.75a1.5 1.5 0 0 1 1.5-1.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com/in/utkarsh-rawat/",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M6.75 8.25a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM5.25 9.75h3v9h-3v-9ZM10.5 9.75h2.88v1.23h.04c.4-.72 1.39-1.48 2.86-1.48 3.06 0 3.63 2.01 3.63 4.62v4.63h-3v-4.1c0-.98-.02-2.24-1.37-2.24-1.37 0-1.58 1.07-1.58 2.17v4.17h-3v-9Z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/usrbom",
    label: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M12 3.75a8.25 8.25 0 0 0-2.61 16.08c.41.08.56-.18.56-.39v-1.53c-2.27.5-2.75-.96-2.75-.96-.37-.94-.91-1.19-.91-1.19-.74-.5.06-.49.06-.49.82.06 1.25.84 1.25.84.73 1.25 1.91.89 2.37.68.07-.53.29-.89.52-1.09-1.81-.21-3.71-.91-3.71-4.07 0-.9.32-1.63.84-2.21-.08-.2-.36-1.04.08-2.16 0 0 .69-.22 2.26.84a7.8 7.8 0 0 1 4.12 0c1.57-1.06 2.25-.84 2.25-.84.44 1.12.16 1.96.08 2.16.52.58.84 1.31.84 2.21 0 3.17-1.9 3.86-3.71 4.07.3.26.56.76.56 1.54v2.29c0 .21.15.47.57.39A8.25 8.25 0 0 0 12 3.75Z" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-accent-gradient p-8 text-white shadow-float md:p-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
              Connect
            </p>
            <h2 className="font-heading text-4xl font-bold tracking-[-0.04em] text-white md:text-5xl">
              Let&apos;s talk
            </h2>
            <p className="max-w-2xl text-base leading-7 text-white/80">
              I&apos;m always up to chat about product management, AI, and
              creative side projects.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:max-w-3xl xl:grid-cols-3">
            {socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="social-link group flex items-center gap-4 rounded-2xl border border-white/14 bg-white/10 px-4 py-3 backdrop-blur-sm transition duration-300 hover:border-white/28 hover:bg-white/14"
              >
                <span className="social-icon-roll relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/16 bg-white/14 text-white">
                  <span className="social-icon-roll__glyph">{item.icon}</span>
                  <span className="social-icon-roll__glyph">{item.icon}</span>
                </span>
                <span className="min-w-0 text-sm font-semibold text-white">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] bg-white/10 p-6 backdrop-blur-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/68">
            Next step
          </p>
          <p className="mt-3 text-sm leading-7 text-white/82">
            If you&apos;re exploring product, AI, prototyping, or operator
            roles, I&apos;m happy to compare notes.
          </p>
          <Link
            href="https://calendly.com/utkarshrawat-g/30min"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-accent shadow-soft transition hover:-translate-y-0.5"
          >
            Book a 30-min chat
          </Link>
        </div>
      </div>
    </div>
  );
}
