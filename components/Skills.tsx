import Image from "next/image";
import Reveal from "@/components/Reveal";

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
      { name: "Slack", icon: "/skills/icons/slack_icon.svg", mark: "Sl", tileClassName: "bg-[#fff7fb]", markClassName: "text-[#611f69]" },
      { name: "Wispr Flow", icon: "/skills/icons/wispr.svg", mark: "WF", tileClassName: "bg-[#eef8ff]", markClassName: "text-[#2b79b8]" },
      { name: "Granola", icon: "/skills/icons/granola.png", mark: "Gr", tileClassName: "bg-[#fff6ec]", markClassName: "text-[#b06a2c]" },
      { name: "Gamma", icon: "/skills/icons/gamma.png", mark: "G", tileClassName: "bg-[#f7f4ff]", markClassName: "text-[#5e4bd6]" },
    ],
  },
  {
    title: "AI / GenAI",
    tone: "bg-[#f2fbff] ring-signal/20",
    tools: [
      { name: "Codex", icon: "/skills/icons/openai.svg", mark: "C", tileClassName: "bg-white", markClassName: "text-charcoal" },
      { name: "Claude", icon: "/skills/icons/claude.svg", mark: "Cl", tileClassName: "bg-[#fff8f2]", markClassName: "text-[#c46e43]" },
      { name: "Cursor", icon: "/skills/icons/cursor.svg", mark: "Cu", tileClassName: "bg-[#f4f4ff]", markClassName: "text-[#4d57d9]" },
      { name: "Google Opal", icon: "/skills/icons/google-opal.png", mark: "GO", tileClassName: "bg-[#f5fbff]", markClassName: "text-[#4d57d9]" },
      { name: "Lovable", icon: "/skills/icons/lovable.svg", mark: "L", tileClassName: "bg-[#fff4ff]", markClassName: "text-[#b14be0]", iconClassName: "h-[1.62rem] w-[1.62rem]" },
      { name: "LangChain", icon: "/skills/icons/langchain.svg", mark: "LC", tileClassName: "bg-[#f3fff6]", markClassName: "text-[#248a4c]" },
    ],
  },
  {
    title: "Product Management",
    tone: "bg-[#eef5ff] ring-accent/10",
    tools: [
      { name: "Notion", icon: "/skills/icons/notion.svg", mark: "N", tileClassName: "bg-white", markClassName: "text-charcoal" },
      { name: "Miro", icon: "/skills/icons/miro.svg", mark: "M", tileClassName: "bg-[#fff8dc]", markClassName: "text-[#1a1a1a]" },
      { name: "Figma", icon: "/skills/icons/figma.svg", mark: "F", tileClassName: "bg-[#fff1eb]", markClassName: "text-[#f05a28]" },
      { name: "Canva", icon: "/skills/icons/canva.svg", mark: "Ca", tileClassName: "bg-[#eefcff]", markClassName: "text-[#00a7cf]", iconClassName: "h-11 w-11" },
      { name: "Jira", icon: "/skills/icons/jira.svg", mark: "J", tileClassName: "bg-white", markClassName: "text-[#1d6ff2]" },
      { name: "Confluence", icon: "/skills/icons/confluence.svg", mark: "C", tileClassName: "bg-white", markClassName: "text-[#2768e8]" },
    ],
  },
  {
    title: "Analytics",
    tone: "bg-[#f6f8ff] ring-accent/10",
    tools: [
      { name: "SQL", icon: "/skills/icons/sql.svg", mark: "SQL", tileClassName: "bg-[#f2f6ff]", markClassName: "text-accent text-sm" },
      { name: "Python", icon: "/skills/icons/python.svg", mark: "Py", tileClassName: "bg-[#f9f6ff]", markClassName: "text-[#3f5fa9]", iconClassName: "h-12 w-12" },
      { name: "Google Analytics", icon: "/skills/icons/googleanalytics.svg", mark: "GA", tileClassName: "bg-[#fff7ef]", markClassName: "text-[#f59a23]" },
      { name: "Tableau", icon: "/skills/icons/tableau.svg", mark: "Tb", tileClassName: "bg-[#fff7f1]", markClassName: "text-[#e7741e]" },
      { name: "BigQuery", icon: "/skills/icons/bigquery.svg", mark: "BQ", tileClassName: "bg-[#effbff]", markClassName: "text-[#1b88b8]" },
    ],
  },
  {
    title: "Technical / Platform",
    tone: "bg-[#f8f7ff] ring-accent/10",
    tools: [
      { name: "ServiceNow", icon: "/skills/icons/ServiceNow.png", mark: "SN", tileClassName: "bg-[#f7fff2]", markClassName: "text-[#2f8f2a]", iconClassName: "h-[1.73rem] w-[1.73rem]" },
      { name: "Java", icon: "/skills/icons/java.svg", mark: "Jv", tileClassName: "bg-[#fff6f2]", markClassName: "text-[#d56b39]", iconClassName: "h-[1.73rem] w-[1.73rem]" },
      { name: "Javascript", icon: "/skills/icons/javascript.svg", mark: "JS", tileClassName: "bg-[#fffbd8]", markClassName: "text-[#8f7600]" },
    ],
  },
];

export default function Skills() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="section-kicker">Toolbox</p>
        <h2 className="font-heading text-3xl font-bold tracking-[-0.03em] text-charcoal dark:text-pale-gray md:text-4xl">
          Skills
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {skillGroups.map((group, index) => (
          <Reveal
            key={group.title}
            as="section"
            delayMs={80 + index * 70}
            className={`rounded-[1.4rem] p-4 shadow-soft ring-1 dark:!bg-dark-surface dark:!ring-white/8 ${group.tone}${
              index === skillGroups.length - 1 ? " sm:col-span-2" : ""
            }`}
          >
            <div className="space-y-3">
              <h3 className="font-heading text-base font-semibold tracking-[-0.02em] text-charcoal dark:text-pale-gray md:text-lg">
                {group.title}
              </h3>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {group.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-2 rounded-xl bg-white/70 px-2.5 py-2 ring-1 ring-charcoal/6 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(9,29,45,0.08)] dark:bg-dark-surface-high dark:ring-white/10 dark:hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)]"
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.9rem] ring-1 ring-charcoal/6 dark:!bg-white/95 dark:ring-white/10 ${tool.tileClassName}`}
                    >
                      {tool.icon ? (
                        <Image
                          src={tool.icon}
                          alt={tool.name}
                          width={28}
                          height={28}
                          className={`${tool.iconClassName ?? "h-5 w-5"} ${tool.markClassName}`}
                        />
                      ) : (
                        <span
                          className={`font-heading text-sm font-bold tracking-[-0.03em] ${tool.markClassName}`}
                        >
                          {tool.mark}
                        </span>
                      )}
                    </div>

                    <span className="min-w-0 text-xs font-medium leading-4 text-charcoal/78 dark:text-pale-gray/75">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
