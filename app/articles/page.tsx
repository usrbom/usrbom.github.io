import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ArticlesFilter from "@/components/ArticlesFilter";
import InteractiveGridBackground from "@/components/InteractiveGridBackground";
import Reveal from "@/components/Reveal";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Ideas & Reflections | Utkarsh Rawat",
  description: "Notes on AI systems and product thinking.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen bg-pale-gray dark:bg-dark-bg">
      <Navbar />
      <InteractiveGridBackground interactive={false}>
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 md:px-8 lg:pb-32 lg:pt-32">
          <section className="space-y-10">
          <Reveal className="surface-panel rounded-[2rem] p-8 shadow-soft md:p-10">
            <div className="space-y-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal/58 transition hover:text-accent dark:text-pale-gray/55 dark:hover:text-pale-gray"
              >
                <span aria-hidden>←</span>
                Home
              </Link>
              <div className="space-y-3">
                <h1 className="font-heading text-4xl font-bold tracking-[-0.03em] text-charcoal dark:text-pale-gray md:text-5xl">
                  Ideas & Reflections
                </h1>
                <p className="max-w-2xl text-base leading-7 text-charcoal/74 dark:text-pale-gray/72">
                  Notes on AI systems, product thinking, and building useful
                  tools that earn trust.
                </p>
              </div>
            </div>
          </Reveal>

            <Reveal delayMs={80}>
              <div className="surface-panel rounded-[2rem] p-6 shadow-soft md:p-8">
                <ArticlesFilter articles={articles} />
              </div>
            </Reveal>
          </section>
        </div>
      </InteractiveGridBackground>
    </main>
  );
}
