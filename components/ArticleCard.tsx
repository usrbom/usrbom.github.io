import Link from "next/link";
import { Article, formatArticleDate } from "@/lib/articles";

type ArticleCardProps = {
  article: Article;
  variant?: "featured" | "archive";
};

export default function ArticleCard({
  article,
  variant = "archive",
}: ArticleCardProps) {
  const isFeatured = variant === "featured";

  return (
    <Link
      href={`/articles/${article.slug}`}
      className={`group gradient-card flex h-full flex-col rounded-3xl border border-white/70 shadow-soft transition hover:-translate-y-1 hover:shadow-lg ${
        isFeatured ? "p-6 md:p-7" : "p-5"
      }`}
    >
      <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal/55">
        <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">
          {article.category}
        </span>
        <span>{formatArticleDate(article.publishedAt)}</span>
        <span>{article.readingTime}</span>
      </div>

      <h3
        className={`mt-5 font-heading font-semibold tracking-tight text-charcoal ${
          isFeatured ? "text-xl md:text-2xl" : "text-lg"
        }`}
      >
        {article.title}
      </h3>

      <p
        className={`mt-3 leading-relaxed text-charcoal/78 ${
          isFeatured ? "text-sm md:text-base" : "text-sm"
        }`}
      >
        {article.summary}
      </p>

      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-charcoal">
        Read article
        <span
          aria-hidden
          className="transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </div>
    </Link>
  );
}
