const projects = [
  {
    title: "Penny — AI Insights Engine for PNC",
    role: "Product lead, Tech Innovation Challenge",
    timeframe: "2025",
    summary:
      "Reimagined product discovery for PNC product managers with an AI insights engine that surfaces customer needs, trends, and risks across data silos.",
    tags: ["Product Strategy", "AI", "Competition Winner"],
  },
  {
    title: "ServiceNow CRM GenAI Recommendation Prototype",
    role: "Product-minded engineer / prototyper",
    timeframe: "2023",
    summary:
      "Built a GenAI-powered recommendation experience for CRM agents, using LLMs and workflow data to suggest next best actions inside ServiceNow.",
    tags: ["GenAI", "Enterprise", "Prototyping"],
  },
  {
    title: "Vaccine Distribution Workflow Prototype",
    role: "Product-minded engineer / workflow research",
    timeframe: "2020",
    summary:
      "Researched vaccine distribution workflows used by U.S. government agencies like the CDC and built a prototype to streamline allocation, prioritization, and distribution tracking. Ranked in the top 10% in a national workflow automation hackathon.",
    tags: ["Healthcare", "Workflow Design", "Research", "Hackathon"],
  },
  {
    title: "Neo Health Assistant — AI Chatbot for Student Well-Being",
    role: "Developer / conversational AI prototype",
    timeframe: "2018",
    summary:
      "Built an early conversational assistant to help students reflect on stress patterns, track mood over time, and access well-being resources. Experimented with intent classification and rule-based responses to explore how AI could support mental health conversations.",
    tags: ["AI", "Chatbots", "Mental Health", "Prototyping"],
    link: "https://github.com/usrbom/Neo-Health-Assistant-Chatbot",
  },
];

export default function Projects() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-charcoal/50">
          Selected work
        </p>
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-charcoal">
          Projects
        </h2>
        <p className="max-w-2xl text-sm text-charcoal/75">
          A snapshot of products and prototypes that reflect how I think about
          AI, product strategy, and systems.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group gradient-card flex h-full flex-col rounded-3xl border border-white/70 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-charcoal/60">
              <span>{project.timeframe}</span>
              <span className="inline-flex items-center gap-2 font-medium text-charcoal/70">
                <span className="h-1 w-8 rounded-full bg-accent/70 transition group-hover:w-10 group-hover:bg-accent" />
                {project.role}
              </span>
            </div>
            <h3 className="mt-4 font-heading text-xl font-semibold text-charcoal">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/80">
              {project.summary}
            </p>
            {project.link ? (
              <a
                href={project.link}
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:gap-3"
              >
                View on GitHub
                <span aria-hidden>→</span>
              </a>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-pale-gray px-3 py-1 text-xs font-medium text-charcoal/80 ring-1 ring-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
