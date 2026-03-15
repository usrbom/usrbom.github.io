import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCarousel from "@/components/ArticleCarousel";
import Navbar from "@/components/Navbar";
import ArticleCard from "@/components/ArticleCard";
import {
  ArticleContentBlock,
  formatArticleDate,
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/articles";

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

function renderBlock(block: ArticleContentBlock, index: number) {
  switch (block.type) {
    case "heading":
      return (
        <h2
          key={`${block.type}-${index}`}
          className="pt-4 font-heading text-2xl font-semibold tracking-tight text-charcoal"
        >
          {block.text}
        </h2>
      );
    case "list":
      return (
        <ul
          key={`${block.type}-${index}`}
          className="space-y-3 pl-5 text-base leading-8 text-charcoal/82 marker:text-accent"
        >
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote
          key={`${block.type}-${index}`}
          className="rounded-3xl border border-white/80 bg-white/70 px-6 py-5 font-heading text-xl leading-relaxed text-charcoal shadow-soft"
        >
          {block.text}
        </blockquote>
      );
    case "paragraph":
      return (
        <p
          key={`${block.type}-${index}`}
          className="text-base leading-8 text-charcoal/82"
        >
          {block.text}
        </p>
      );
    default:
      return null;
  }
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article Not Found | Utkarsh Rawat",
    };
  }

  return {
    title: `${article.title} | Utkarsh Rawat`,
    description: article.summary,
  };
}

export default function ArticleDetailPage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article);

  return (
    <main className="min-h-screen bg-pale-gray">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="space-y-8">
            <div className="space-y-5">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-sm font-medium text-charcoal/65 transition hover:text-charcoal"
              >
                <span aria-hidden>←</span>
                Back to articles
              </Link>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal/55">
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">
                    {article.category}
                  </span>
                  <span>{formatArticleDate(article.publishedAt)}</span>
                  <span>{article.readingTime}</span>
                </div>

                <h1 className="max-w-4xl font-heading text-3xl font-semibold tracking-tight text-charcoal md:text-5xl">
                  {article.title}
                </h1>

                <p className="max-w-3xl text-lg leading-relaxed text-charcoal/72">
                  {article.summary}
                </p>
              </div>
            </div>

            <div className="space-y-6 rounded-[2rem] border border-white/80 bg-white/60 p-8 shadow-soft backdrop-blur-sm md:p-10">
              {article.content.map((block, index) => renderBlock(block, index))}

              {article.image ? (
                <figure className="space-y-3 pt-4">
                  <div className="overflow-hidden rounded-[1.5rem] border border-white/80 bg-white shadow-soft">
                    <Image
                      src={article.image.src}
                      alt={article.image.alt}
                      width={768}
                      height={768}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                  {article.image.caption ? (
                    <figcaption className="text-sm text-charcoal/60">
                      {article.image.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}

              {article.images && article.images.length > 0 ? (
                <ArticleCarousel images={article.images} />
              ) : null}
            </div>
          </article>

          {relatedArticles.length > 0 ? (
            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-charcoal/50">
                  Related
                </p>
                <h2 className="font-heading text-xl font-semibold tracking-tight text-charcoal">
                  More in {article.category}
                </h2>
              </div>

              <div className="space-y-4">
                {relatedArticles.map((relatedArticle) => (
                  <ArticleCard
                    key={relatedArticle.slug}
                    article={relatedArticle}
                    variant="archive"
                  />
                ))}
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </main>
  );
}
