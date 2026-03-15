import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getRecentArticles } from "@/lib/articles";

export default function RecentArticles() {
  const articles = getRecentArticles(3);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-charcoal/50">
            Thinking in public
          </p>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-charcoal">
            Recent Articles
          </h2>
          <p className="max-w-2xl text-sm text-charcoal/75">
            Notes on AI systems, product thinking, and building practical tools
            that earn user trust.
          </p>
        </div>

        <Link
          href="/articles"
          className="inline-flex items-center gap-2 rounded-full border border-charcoal/10 bg-white px-4 py-2 text-sm font-semibold text-charcoal shadow-sm transition hover:-translate-y-0.5 hover:shadow"
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
