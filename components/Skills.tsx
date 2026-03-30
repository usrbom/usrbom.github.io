import Image from "next/image";

type SkillTool = {
  name: string;
  icon?: string;
  mark: string;
  tileClassName: string;
  markClassName: string;
  iconClassName?: string;
};

type SkillGroup = {
  title: string;
  tone: string;
  tools: SkillTool[];
};

const skillGroups: SkillGroup[] = [
  {
    title: "Productivity / Workflow",
    tone: "bg-[#fffaf1] ring-amber/20",
    tools: [
      { name: "Google Workspace", icon: "/skills/icons/google.svg", mark: "GW", tileClassName: "bg-[#f3fbff]", markClassName: "text-[#1a74d8]" },
      { name: "Microsoft Office", icon: "/skills/icons/ms-office.svg", mark: "MS", tileClassName: "bg-[#fff3ef]", markClassName: "text-[#d4652f]" },
      { name: "Gamma", icon: "/skills/icons/gamma.png", mark: "G", tileClassName: "bg-[#f7f4ff]", markClassName: "text-[#5e4bd6]" },
      { name: "Granola", icon: "/skills/icons/granola.png", mark: "Gr", tileClassName: "bg-[#fff6ec]", markClassName: "text-[#b06a2c]" },
      { name: "Wispr Flow", icon: "/skills/icons/wispr.svg", mark: "WF", tileClassName: "bg-[#eef8ff]", markClassName: "text-[#2b79b8]" },
    ],
  },
  {
    title: "AI / GenAI",
    tone: "bg-[#f2fbff] ring-signal/20",
    tools: [
      { name: "Google Opal", icon: "/skills/icons/google-opal.png", mark: "GO", tileClassName: "bg-[#f5fbff]", markClassName: "text-[#4d57d9]" },
      { name: "LangChain", icon: "/skills/icons/langchain.svg", mark: "LC", tileClassName: "bg-[#f3fff6]", markClassName: "text-[#248a4c]" },
      { name: "Claude", icon: "/skills/icons/claude.svg", mark: "Cl", tileClassName: "bg-[#fff8f2]", markClassName: "text-[#c46e43]" },
      { name: "Codex", icon: "/skills/icons/openai.svg", mark: "C", tileClassName: "bg-white", markClassName: "text-charcoal" },
      { name: "Cursor", icon: "/skills/icons/cursor.svg", mark: "Cu", tileClassName: "bg-[#f4f4ff]", markClassName: "text-[#4d57d9]" },
      { name: "Lovable", icon: "/skills/icons/lovable.webp", mark: "L", tileClassName: "bg-[#fff4ff]", markClassName: "text-[#b14be0]", iconClassName: "h-9 w-9" },
    ],
  },
  {
    title: "Product Management",
    tone: "bg-[#eef5ff] ring-accent/10",
    tools: [
      { name: "Jira", icon: "/skills/icons/jira.svg", mark: "J", tileClassName: "bg-white", markClassName: "text-[#1d6ff2]" },
      { name: "Confluence", icon: "/skills/icons/confluence.svg", mark: "C", tileClassName: "bg-white", markClassName: "text-[#2768e8]" },
      { name: "Notion", icon: "/skills/icons/notion.svg", mark: "N", tileClassName: "bg-white", markClassName: "text-charcoal" },
      { name: "Miro", icon: "/skills/icons/miro.svg", mark: "M", tileClassName: "bg-[#fff8dc]", markClassName: "text-[#1a1a1a]" },
      { name: "Figma", icon: "/skills/icons/figma.svg", mark: "F", tileClassName: "bg-[#fff1eb]", markClassName: "text-[#f05a28]" },
      { name: "Canva", icon: "/skills/icons/canva.svg", mark: "Ca", tileClassName: "bg-[#eefcff]", markClassName: "text-[#00a7cf]", iconClassName: "h-11 w-11" },
    ],
  },
  {
    title: "Analytics",
    tone: "bg-[#f6f8ff] ring-accent/10",
    tools: [
      { name: "SQL", icon: "/skills/icons/sql.svg", mark: "SQL", tileClassName: "bg-[#f2f6ff]", markClassName: "text-accent text-sm" },
      { name: "Python", icon: "/skills/icons/python.svg", mark: "Py", tileClassName: "bg-[#f9f6ff]", markClassName: "text-[#3f5fa9]", iconClassName: "h-12 w-12" },
      { name: "BigQuery", icon: "/skills/icons/bigquery.svg", mark: "BQ", tileClassName: "bg-[#effbff]", markClassName: "text-[#1b88b8]" },
      { name: "Tableau", icon: "/skills/icons/tableau.svg", mark: "Tb", tileClassName: "bg-[#fff7f1]", markClassName: "text-[#e7741e]" },
      { name: "Google Analytics", icon: "/skills/icons/googleanalytics.svg", mark: "GA", tileClassName: "bg-[#fff7ef]", markClassName: "text-[#f59a23]" },
    ],
  },
  {
    title: "Technical / Platform",
    tone: "bg-[#f8f7ff] ring-accent/10",
    tools: [
      { name: "ServiceNow", icon: "/skills/icons/ServiceNow.png", mark: "SN", tileClassName: "bg-[#f7fff2]", markClassName: "text-[#2f8f2a]", iconClassName: "h-[2.4rem] w-[2.4rem]" },
      { name: "Java", icon: "/skills/icons/java.png", mark: "Jv", tileClassName: "bg-[#fff6f2]", markClassName: "text-[#d56b39]", iconClassName: "h-[2.4rem] w-[2.4rem]" },
      { name: "Javascript", icon: "/skills/icons/javascript.svg", mark: "JS", tileClassName: "bg-[#fffbd8]", markClassName: "text-[#8f7600]" },
    ],
  },
];

export default function Skills() {
  return (
    <div className="space-y-8">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div className="space-y-3">
          <p className="section-kicker">Toolbox</p>
          <h2 className="font-heading text-3xl font-bold tracking-[-0.03em] text-charcoal md:text-4xl">
            Skills
          </h2>
        </div>
      </div>

      <article className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,rgba(231,240,255,0.95)_0%,rgba(245,250,255,0.92)_52%,rgba(250,244,255,0.94)_100%)] p-6 shadow-soft ring-1 ring-white/70 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal/50">
              Everyday stack
            </p>
            <h3 className="font-heading text-3xl font-semibold tracking-[-0.04em] text-charcoal md:text-[2.4rem]">
              Tools I rely on across product, data, and AI work.
            </h3>
            <p className="max-w-md text-base leading-8 text-charcoal/68">
              A practical mix of collaboration tools, analytics platforms,
              prototyping systems, and technical workflows that support how I
              move from ambiguity to execution.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <section
                key={group.title}
                className={`rounded-[1.6rem] p-4 shadow-soft ring-1 ${group.tone} md:p-5`}
              >
                <div className="space-y-4">
                  <h4 className="font-heading text-lg font-semibold tracking-[-0.02em] text-charcoal">
                    {group.title}
                  </h4>

                  <div className="flex flex-wrap gap-3">
                    {group.tools.map((tool) => (
                      <div key={tool.name} className="group relative">
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-[1.15rem] shadow-[0_12px_28px_rgba(9,29,45,0.05)] ring-1 ring-charcoal/6 transition duration-200 group-hover:-translate-y-0.5 ${tool.tileClassName}`}
                        >
                          {tool.icon ? (
                            <Image
                              src={tool.icon}
                              alt={tool.name}
                              width={32}
                              height={32}
                              className={`${tool.iconClassName ?? "h-6 w-6"} ${tool.markClassName}`}
                            />
                          ) : (
                            <span
                              className={`font-heading text-lg font-bold tracking-[-0.03em] ${tool.markClassName}`}
                            >
                              {tool.mark}
                            </span>
                          )}
                        </div>

                        <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-charcoal px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white opacity-0 shadow-soft transition duration-200 group-hover:translate-y-0.5 group-hover:opacity-100">
                          {tool.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
