"use client";

import { useMemo, useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import { Article, ArticleCategory } from "@/lib/articles";

type FilterValue = "All" | ArticleCategory;

const filters: FilterValue[] = [
  "All",
  "AI",
  "Product Thinking",
  "Personal Notes",
];

export default function ArticlesFilter({
  articles,
}: {
  articles: Article[];
}) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");

  const filteredArticles = useMemo(() => {
    if (activeFilter === "All") {
      return articles;
    }

    return articles.filter((article) => article.category === activeFilter);
  }, [activeFilter, articles]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => {
          const isActive = filter === activeFilter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-accent-gradient text-white shadow-soft"
                  : "border border-charcoal/10 bg-white/80 text-charcoal/75 hover:border-charcoal/20 hover:text-charcoal"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {filteredArticles.map((article) => (
          <ArticleCard
            key={article.slug}
            article={article}
            variant="archive"
          />
        ))}
      </div>
    </div>
  );
}
