type Milestone = {
  year: string;
  title: string;
  description: string;
};

const timeline: Milestone[] = [
  {
    year: "2015",
    title: "Indian Institute of Technology, Varanasi (IIT BHU)",
    description:
      "Began my Mining engineering major journey at the prestigious IIT BHU, actively contributing as a Training & Placement Cell representative and Fine Arts and Aeromodelling Club member."
  },
  {
    year: "2018",
    title: "Wipro Summer Intersnhip ",
    description:
      "Automated manual reporting workflows, helping save an estimated $1.1M in annual operational effort and accelerating activity tracking across teams.",
  },
  {
    year: "2019",
    title: "ServiceNow Full-time",
    description:
      "Joined ServiceNow as an Associate Software Engineer working on CRM workflows and automation, a role that grew into a six-year journey building enterprise products and systems.",
  },
  {
    year: "2023",
    title: "Knowledge '23 Keynote demo",
    description:
      "Built a GenAI-powered recommendation experience for CRM agents that was showcased during ServiceNow's Las Vegas Annual keynote to over 5,000+ enterprise customers.",
  },
  {
    year: "2025",
    title: "University of California, Los Angeles (UCLA) Anderson Full-Time MBA",
    description:
      "Moved to Los Angeles to pursue the full-time MBA at UCLA Anderson, building on my AI and systems experience to develop the leadership and product thinking",
  },
  {
    year: "2025",
    title: "Penny — AI Insights Engine",
    description:
      "Designed Penny, an AI-driven insights engine for highly regulated Banking industry to enhance product discovery for PNC, earning 1st place among 50 MBA teams across top 16 business schools at the Tepper Tech Innovation Challenge.",
  },
];

export default function Timeline() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-charcoal/50">
          Path so far
        </p>
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-charcoal">
          Timeline
        </h2>
        <p className="max-w-2xl text-sm text-charcoal/75">
          Moments that shaped how I think about product, customers, and technology.
        </p>
      </div>

      <div className="relative mt-8 pl-5">
        <div className="absolute left-2 top-0 h-full w-px bg-white/80" />

        <div className="space-y-8">
          {timeline.map((item) => (
            <div key={item.year} className="relative flex gap-4">
              <div className="absolute -left-[7px] mt-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-accent shadow-[0_4px_14px_rgba(37,99,235,0.4)]" />
              <div className="ml-4 space-y-1 rounded-2xl bg-white/60 p-4 ring-1 ring-white/80 backdrop-blur-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-charcoal/60">
                  {item.year}
                </div>
                <h3 className="font-heading text-base font-semibold text-charcoal">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-charcoal/80">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
