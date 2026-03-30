import Image from "next/image";

const projects = [
  {
    title: "Agentic AI Interview Engine (Healthcare)",
    org: "Google Opal workflow",
    timeframe: "Spring 2026",
    summary:
      "Developed a no-code agentic workflow in Google Opal to simulate high-stakes triage interviews using multimodal inputs, orchestration agents, and structured evaluations.",
    detail:
      "I iteratively refined prompt-driven workflows while working through non-determinism, debugging, and system-design tradeoffs. The project also surfaced real risks around bias, over-standardization, and AI dependency in hiring.",
    tags: ["Project", "Agentic AI", "Healthcare"],
    image: "/projects/homepage/agentic-ai-interview-engine-homepage.png",
    imageAlt: "Agentic AI Interview Engine healthcare project visual.",
  },
  {
    title: "Penny: AI Insights Engine for PNC",
    org: "UCLA Anderson x PNC",
    timeframe: "Winter 2025",
    summary:
      "Designed an AI insights engine that helped product teams surface customer needs, market signals, and decision-ready recommendations across fragmented banking data.",
    detail:
      "The concept won first place at the Tepper Tech Innovation Challenge and became a strong example of how I like to work at the intersection of product strategy, enterprise AI, and storytelling.",
    tags: ["Project", "AI Strategy"],
    image: "/timeline/penny-pnc.jpeg",
    imageAlt: "Penny AI insights engine concept for PNC.",
  },
  {
    title: "CRM GenAI Recommendations at ServiceNow",
    org: "ServiceNow",
    timeframe: "2023",
    summary:
      "Built a recommendation experience for CRM agents that surfaced next-best actions using workflow context and LLM-assisted reasoning.",
    detail:
      "The prototype was later featured in ServiceNow's Knowledge keynote as part of a broader push toward more useful, embedded AI experiences inside enterprise tools.",
    tags: ["Project", "GenAI"],
    image: "/timeline/knowledge23.jpg",
    imageAlt: "ServiceNow Knowledge keynote demo for a CRM GenAI recommendation prototype.",
  },
  {
    title: "Enterprise Workflow Automation Foundations",
    org: "ServiceNow",
    timeframe: "2019-2024",
    summary:
      "Worked across CRM workflows, automation systems, and enterprise product experiences that sharpened how I think about reliability, scale, and user adoption.",
    detail:
      "This period gave me the engineering depth behind my product lens: shipping systems, understanding process friction, and learning where automation actually earns trust.",
    tags: ["Project", "Enterprise Systems"],
    image: "/timeline/servicenow.jpg",
    imageAlt: "ServiceNow product and workflow systems work.",
  },
  {
    title: "VaccineNow: Application for Vaccine Distribution Management",
    org: "ServiceNow hackathon prototype",
    timeframe: "2020",
    summary:
      "Conceptualized and prototyped a vaccine distribution workflow to support citizen registration, appointment scheduling, site operations, and rollout coordination during a ServiceNow hackathon.",
    detail:
      "Collaborated with three engineers, scoped the MVP by researching public-sector rollout requirements, and deliberated on tradeoffs across registration, inventory, eligibility, and check-in flows. The concept ranked in the top 10% of the hackathon, validating the business opportunity. The company later productized a vaccine distribution app for large-scale public deployment for NHS Scotland.",
    tags: ["Project", "Healthcare"],
    image: "/timeline/wipro.jpg",
    imageAlt: "Workflow research and operational systems prototype visual.",
  },
];

export default function Projects() {
  return (
    <div className="space-y-8">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
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
        <p className="max-w-sm text-sm leading-7 text-charcoal/62 lg:justify-self-end">
          Product strategy, enterprise AI, and workflow thinking presented as a
          cleaner project feed.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className="overflow-hidden rounded-[2rem] bg-white p-5 shadow-soft md:p-6"
          >
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-[#d9f3c7] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">
                  {project.tags[0]}
                </span>
              </div>

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
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
