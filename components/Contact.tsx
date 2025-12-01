import Link from "next/link";

export default function Contact() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-charcoal/50">
          Connect
        </p>
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-charcoal">
          Let&apos;s talk
        </h2>
        <p className="max-w-2xl text-sm text-charcoal/75">
          I&apos;m always up to chat about product management, AI, and creative
          side projects.
        </p>
      </div>

      <div className="space-y-2 text-sm text-charcoal/80">
        <p>
          Email: {" "}
          <a
            href="mailto:utkarshrawat27@gmail.com"
            className="font-semibold text-charcoal underline decoration-accent/50 decoration-2 underline-offset-4"
          >
            utkarshrawat27@gmail.com
          </a>
        </p>
        <p>
          LinkedIn: {" "}
          <Link
            href="https://linkedin.com/in/utkarsh-rawat/"
            className="font-semibold text-charcoal underline decoration-accent/50 decoration-2 underline-offset-4"
          >
            linkedin.com/in/utkarsh-rawat/
          </Link>
        </p>
        <p>
          GitHub: {" "}
          <Link
            href="https://github.com/usrbom"
            className="font-semibold text-charcoal underline decoration-accent/50 decoration-2 underline-offset-4"
          >
            github.com/usrbom
          </Link>
        </p>
      </div>

      <Link
        href="https://calendly.com/utkarshrawat-g/30min"
        className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow"
      >
        Book a 30-min chat
      </Link>
    </div>
  );
}
