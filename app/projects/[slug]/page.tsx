import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCarousel from "@/components/ArticleCarousel";
import Navbar from "@/components/Navbar";
import InteractiveGridBackground from "@/components/InteractiveGridBackground";
import {
  ProjectContentBlock,
  getAllProjects,
  getProjectBySlug,
  getProjectReadingTime,
  ProjectImageItem,
} from "@/lib/projects";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

function renderBlock(block: ProjectContentBlock, index: number) {
  switch (block.type) {
    case "heading":
      return (
        <h2
          key={`${block.type}-${index}`}
          className="pt-4 font-heading text-2xl font-semibold tracking-tight text-charcoal dark:text-pale-gray"
        >
          {block.text}
        </h2>
      );
    case "list":
      return (
        <ul
          key={`${block.type}-${index}`}
          className="space-y-3 pl-5 text-base leading-8 text-charcoal/82 marker:text-accent dark:text-pale-gray/80"
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
          className="rounded-3xl border border-white/80 bg-white/70 px-6 py-5 font-heading text-xl leading-relaxed text-charcoal shadow-soft dark:border-white/10 dark:bg-white/5 dark:text-pale-gray"
        >
          {block.text}
        </blockquote>
      );
    case "paragraph":
      return (
        <p
          key={`${block.type}-${index}`}
          className="text-base leading-8 text-charcoal/82 dark:text-pale-gray/80"
        >
          {block.text}
        </p>
      );
    case "cta-row":
      return (
        <div
          key={`${block.type}-${index}`}
          className="grid grid-cols-2 gap-4"
        >
          {block.items.map((item) => {
            const isLinkedIn = item.href.includes("linkedin.com");
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col gap-2 rounded-2xl px-5 py-4 transition hover:-translate-y-0.5 hover:shadow ${
                  isLinkedIn
                    ? "bg-[#f0f7ff] hover:bg-[#e3f0ff] dark:bg-dark-surface dark:hover:bg-dark-surface-high"
                    : "bg-pale-gray hover:bg-charcoal/5 dark:bg-white/8 dark:hover:bg-white/12"
                }`}
              >
                {item.description ? (
                  <span className="text-xs leading-5 text-charcoal/58 dark:text-pale-gray/55">
                    {item.description}
                  </span>
                ) : null}
                <span
                  className={`text-sm font-semibold ${
                    isLinkedIn ? "text-[#0a66c2]" : "text-charcoal"
                  }`}
                >
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      );
    case "cta": {
      const isLinkedIn = block.href.includes("linkedin.com");
      return (
        <div
          key={`${block.type}-${index}`}
          className={`flex items-center justify-between gap-6 rounded-2xl border px-6 py-5 ${
            isLinkedIn
              ? "border-[#0a66c2]/15 bg-[#f0f7ff] dark:border-[#0a66c2]/25 dark:bg-dark-surface"
              : "border-charcoal/8 bg-pale-gray dark:border-white/10 dark:bg-white/8"
          }`}
        >
          <div className="space-y-0.5">
            <p className="text-sm font-semibold text-charcoal dark:text-pale-gray">
              {block.description}
            </p>
          </div>
          <a
            href={block.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`shrink-0 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition ${
              isLinkedIn
                ? "bg-[#0a66c2] hover:bg-[#004182]"
                : "bg-charcoal hover:bg-charcoal/80"
            }`}
          >
            {block.label}
          </a>
        </div>
      );
    }
    case "image-pair":
      return (
        <div
          key={`${block.type}-${index}`}
          className="grid grid-cols-2 gap-4 pt-2"
        >
          {block.images.map((img: ProjectImageItem) => (
            <figure key={img.src} className="space-y-2">
              <div className="overflow-hidden rounded-[1.25rem] border border-white/80 bg-white shadow-soft dark:border-white/10 dark:bg-dark-surface">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={500}
                  className="h-auto w-full object-cover"
                />
              </div>
              {img.caption ? (
                <figcaption className="text-xs leading-5 text-charcoal/60 dark:text-pale-gray/50">
                  {img.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export function generateStaticParams() {
  return getAllProjects()
    .filter((project) => project.content.length > 0)
    .map((project) => ({
      slug: project.slug,
    }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found | Utkarsh Rawat",
    };
  }

  return {
    title: `${project.title} | Utkarsh Rawat`,
    description: project.summary,
  };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project || project.content.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-pale-gray dark:bg-dark-bg">
      <Navbar />
      <InteractiveGridBackground interactive={false}>
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 md:px-8 lg:pb-32 lg:pt-32">
          <article className="space-y-8">
            <div className="surface-panel rounded-[2rem] p-8 shadow-soft md:p-10">
              <div className="space-y-5">
                <Link
                  href="/#projects"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal/58 transition hover:text-accent dark:text-pale-gray/55 dark:hover:text-pale-gray"
                >
                  <span aria-hidden>←</span>
                  All projects
                </Link>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    {project.tags.filter((tag) => tag !== "Project").map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-[#d9f3c7] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal dark:bg-[#1a3d1a] dark:text-pale-gray"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h1 className="max-w-4xl font-heading text-4xl font-bold tracking-[-0.03em] text-charcoal dark:text-pale-gray md:text-5xl">
                    {project.title}
                  </h1>

                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal/55 dark:text-pale-gray/50">
                    <span>{project.org}</span>
                    <span>{project.timeframe}</span>
                    <span>{getProjectReadingTime(project.content)}</span>
                  </div>

                  <p className="max-w-3xl text-lg leading-8 text-charcoal/72 dark:text-pale-gray/70">
                    {project.summary}
                  </p>
                </div>

                <div className="overflow-hidden rounded-[1.6rem] bg-charcoal/6 dark:bg-white/6">
                  <Image
                    src={project.heroImage ?? project.image}
                    alt={project.imageAlt}
                    width={1600}
                    height={900}
                    sizes="(min-width: 1024px) 900px, 100vw"
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="surface-panel space-y-6 rounded-[2rem] p-8 shadow-soft md:p-10">
              {project.content.map((block, index) => renderBlock(block, index))}

              {project.images && project.images.length > 0 ? (
                <ArticleCarousel images={project.images} />
              ) : null}
            </div>
          </article>
        </div>
      </InteractiveGridBackground>
    </main>
  );
}
