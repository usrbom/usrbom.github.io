import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ArticlesFilter from "@/components/ArticlesFilter";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Ideas & Reflections | Utkarsh Rawat",
  description: "Notes on AI systems and product thinking.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen bg-pale-gray">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-28">
        <section className="space-y-10">
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-charcoal/65 transition hover:text-charcoal"
            >
              <span aria-hidden>←</span>
              Back home
            </Link>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-charcoal/50">
                Archive
              </p>
              <h1 className="font-heading text-3xl font-semibold tracking-tight text-charcoal md:text-4xl">
                Ideas & Reflections
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-charcoal/75">
                Notes on AI systems and product thinking.
              </p>
            </div>
          </div>

          <ArticlesFilter articles={articles} />
        </section>
      </div>
    </main>
  );
}
