import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getRecentArticles } from "@/lib/articles";

export default function RecentArticles() {
  const articles = getRecentArticles(3);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="section-kicker">Thinking in public</p>
          <h2 className="font-heading text-3xl font-bold tracking-[-0.03em] text-charcoal dark:text-pale-gray md:text-4xl">
            Recent Articles
          </h2>
          <p className="max-w-2xl text-base leading-7 text-charcoal/74 dark:text-pale-gray/72">
            Notes on AI systems, product thinking, and building practical tools
            that earn user trust.
          </p>
        </div>

        <Link
          href="/articles"
          className="inline-flex items-center gap-2 rounded-md bg-accent-gradient px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-1"
        >
          View all articles
          <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            article={article}
            variant="featured"
          />
        ))}
      </div>
    </div>
  );
}
