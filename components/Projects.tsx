import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getAllProjects } from "@/lib/projects";

const projects = getAllProjects();

export default function Projects() {
  return (
    <div className="space-y-8">
      <Reveal className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div className="space-y-3">
          <p className="section-kicker">Selected work</p>
          <h2 className="font-heading text-3xl font-bold tracking-[-0.03em] text-charcoal md:text-4xl">
            Projects
          </h2>
          <p className="max-w-2xl text-base leading-7 text-charcoal/74">
            A more visual snapshot of the products, prototypes, and systems work
            that shaped how I build.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
        {projects.map((project, index) => (
          <Reveal
            key={project.title}
            as="article"
            delayMs={60 + index * 90}
            className="overflow-hidden rounded-[2rem] bg-white p-5 shadow-soft md:p-6"
          >
            <div className="space-y-5">
              <div className="relative overflow-hidden rounded-[1.6rem] bg-charcoal/6">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  width={1600}
                  height={1000}
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  className={`w-full object-cover ${
                    index % 3 === 0
                      ? "aspect-[16/10]"
                      : index % 3 === 1
                        ? "aspect-[16/11]"
                        : "aspect-[16/12]"
                  }`}
                />
              </div>

              <div className="space-y-3">
                <h3 className="max-w-4xl font-heading text-3xl font-semibold tracking-[-0.03em] text-charcoal md:text-[2.2rem]">
                  {project.title}
                </h3>
                <div className="space-y-1 text-charcoal/58">
                  <p className="text-base leading-7">{project.org}</p>
                  <p className="text-base leading-7">{project.timeframe}</p>
                </div>
              </div>

              <div className="max-w-4xl space-y-4 text-base leading-8 text-charcoal/74">
                <p>{project.summary}</p>
                {index !== 2 ? <p>{project.detail}</p> : null}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(1).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-pale-gray px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-charcoal/68"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.content.length > 0 ? (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-accent-bright hover:shadow"
                    >
                      Case study ↗
                    </Link>
                  ) : null}
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-surface-low px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent shadow-sm transition hover:-translate-y-0.5 hover:shadow"
                    >
                      GitHub ↗
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
