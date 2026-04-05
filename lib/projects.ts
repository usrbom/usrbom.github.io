export type ProjectImageItem = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProjectContentBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "quote";
      text: string;
    }
  | {
      type: "image-pair";
      images: [ProjectImageItem, ProjectImageItem];
    }
  | {
      type: "cta";
      label: string;
      href: string;
      description?: string;
    }
  | {
      type: "cta-row";
      items: Array<{
        label: string;
        href: string;
        description?: string;
      }>;
    };

export type Project = {
  slug: string;
  title: string;
  org: string;
  timeframe: string;
  summary: string;
  detail: string;
  tags: string[];
  image: string;
  imageAlt: string;
  heroImage?: string;
  githubUrl?: string;
  content: ProjectContentBlock[];
  images?: Array<{
    src: string;
    alt: string;
    caption?: string;
    objectPosition?: string;
  }>;
};

const projects: Project[] = [
  {
    slug: "agentic-ai-interview-engine",
    title: "Agentic Triage Clinician Simulator",
    org: "Google Opal workflow",
    timeframe: "Spring 2026",
    summary:
      "Developed a no-code agentic workflow in Google Opal to simulate high-stakes triage interviews using multimodal inputs, orchestration agents, and structured evaluations.",
    detail:
      "I iteratively refined prompt-driven workflows while working through non-determinism, debugging, and system design tradeoffs. The project also surfaced real risks around bias, over-standardization, and AI dependency in hiring.",
    tags: ["Project", "Agentic AI", "Healthcare"],
    image: "/projects/homepage/agentic-ai-interview-engine-homepage.png",
    imageAlt: "Agentic Triage Clinician Simulator project visual.",
    heroImage: "/projects/details/simulation-screen.png",
    content: [
      {
        type: "quote",
        text: "Give candidates tasks that were impossible a year ago.",
      },
      {
        type: "paragraph",
        text: "At first, it sounded like a clever way to think about interviews. But the more I sat with it, the more uncomfortable it became. If the nature of work is changing because of AI, then interviews, our way of evaluating people, should be changing too. And yet, in most domains, they haven't. That's the thread we decided to pull on.",
      },
      {
        type: "heading",
        text: "Starting from the Ground Reality",
      },
      {
        type: "paragraph",
        text: "We didn't begin with AI. We began with the job. One of our teammates had experience working closely with triage clinicians, so instead of abstracting the problem, I asked him to walk us through the reality. What does a typical day look like? How are decisions actually made? What pressures do clinicians operate under? And just as importantly: how are they evaluated today?",
      },
      {
        type: "paragraph",
        text: "Triage clinicians are often the first point of contact in high-stakes environments, whether emergency rooms, urgent care, or phone-based support systems. They operate in short windows, often 15 to 30 minutes, where they need to assess symptoms, identify risk (including suicide risk), and determine the appropriate next step. The work is not just about knowledge; it's about judgment under time pressure, ambiguity, and incomplete information.",
      },
      {
        type: "paragraph",
        text: "But when we looked at how they are interviewed, the structure felt disconnected from the reality of the job. Most processes rely on static case vignettes, behavioral questions, or hypothetical reasoning exercises. These do test some aspects of clinical thinking, but they miss something increasingly important: how someone makes decisions when AI is part of the loop. That gap became the core of our project.",
      },
      {
        type: "heading",
        text: "Reframing the Problem",
      },
      {
        type: "paragraph",
        text: "We started by listing the skills that actually matter in triage: clinical reasoning, risk assessment, prioritization, and adaptability. Then we asked a different kind of question: what happens to these skills when AI becomes part of the workflow?",
      },
      {
        type: "paragraph",
        text: "Two directions emerged naturally. The first was on the system side. Could AI be used to create more realistic, dynamic interview environments? Instead of static prompts, could we simulate the evolving nature of real patient interactions? The second was on the candidate side. If AI is going to be part of the job, the ability to use it effectively becomes a skill in itself. But how do you evaluate that? Not just whether someone can use a tool, but whether they can use AI to improve the quality of care without blindly relying on it.",
      },
      {
        type: "paragraph",
        text: "At that point, the problem stopped looking like an 'AI feature' problem. It started looking like a workflow design problem.",
      },
      {
        type: "heading",
        text: "From Prompts to Systems",
      },
      {
        type: "paragraph",
        text: "We built our prototype using Google Opal, but the interesting shift wasn't the tool. It was the way we started thinking about the system. Instead of designing a single interaction, we began to treat the interview as a multi-step, agentic workflow: different components handling scenario generation, candidate interaction, probing decisions, and evaluating responses.",
      },
      {
        type: "paragraph",
        text: "Early versions were naive. We started by giving candidates full cases upfront, similar to traditional vignettes. It worked, but it didn't feel real. In practice, triage is not about reading a case and responding; it's about uncovering information step by step. So we moved to a turn-by-turn conversational format. The system would reveal information gradually, forcing the candidate to ask the right questions and adapt as new details emerged.",
      },
      {
        type: "paragraph",
        text: "Then we introduced voice. It's a small change on the surface, but it changes how seriously people engage with the scenario. A voice-based interaction adds friction in the right way: it slows you down, forces you to listen, and makes the situation feel less like a test and more like a responsibility.",
      },
      {
        type: "heading",
        text: "Rethinking What It Means to Use AI Well",
      },
      {
        type: "paragraph",
        text: "One of the more interesting pivots we made was around how we evaluated AI usage. Initially, we thought about testing whether candidates could handle multiple cases simultaneously using AI tools. That felt aligned with where systems are heading: parallelization, scale, efficiency. But the more we discussed it, the more it felt like the wrong metric. Handling more cases is not the same as making better decisions.",
      },
      {
        type: "paragraph",
        text: "So we stepped back and simplified the question: can someone use AI effectively in a single, high-stakes scenario? Instead of giving candidates pre-built tools, we asked them to write their own prompts to an AI assistant. This shifted the evaluation from tool usage to intent. Prompting, in this context, is not about clever phrasing. It's about understanding what information you need, how to ask for it, and how to interpret the response. In a world where interfaces will keep evolving, this ability to structure a request, to translate judgment into queries, is likely to remain a durable skill.",
      },
      {
        type: "heading",
        text: "What Building in an Agentic Framework Taught Us",
      },
      {
        type: "paragraph",
        text: "Working in Opal made one thing clear very quickly: the hard part is not generating outputs, it's controlling systems. Prompt design stopped being about getting a good response and started becoming a form of system design. The initial structure of the workflow, what gets asked, in what order, with what constraints, had a disproportionate impact on everything that followed.",
      },
      {
        type: "list",
        items: [
          "Editing existing workflows was often harder than rebuilding them. State accumulates in subtle ways, and small changes can have unexpected downstream effects.",
          "Debugging a multi-step system means tracing reasoning across steps, not just evaluating outputs.",
          "Non-determinism isn't necessarily a bug. For an interview simulation, a certain level of variability is desirable; it introduces unpredictability that is closer to real life.",
        ],
      },
      {
        type: "image-pair",
        images: [
          {
            src: "/projects/details/triage-clinician-workflow.jpeg",
            alt: "Triage Clinician Simulator workflow in Google Opal with candidate input, triage simulation, and report generation nodes.",
            caption: "Triage Clinician Simulator: multi-turn orchestration workflow with memory.",
          },
          {
            src: "/projects/details/prompt-grader-workflow.jpeg",
            alt: "Prompt Grader agentic workflow in Google Opal with nodes for transcript generation, AI evaluation, and report rendering.",
            caption: "Prompt Grader: Opal workflow for evaluating AI prompts used in clinical contexts.",
          },
        ],
      },
      {
        type: "heading",
        text: "What We Ended Up With",
      },
      {
        type: "paragraph",
        text: "By the end of the project, we had a system that could simulate dynamic triage scenarios, interact with candidates in a conversational and voice-based format, and evaluate not just what decisions were made, but how they were made. More importantly, we had a way to observe something that traditional interviews struggle to capture: how someone operates inside an AI-augmented environment. Not just whether they can arrive at an answer, but whether they know when to trust the system, when to question it, and how to use it without giving up their own judgment.",
      },
      {
        type: "heading",
        text: "The Uncomfortable Questions",
      },
      {
        type: "paragraph",
        text: "As we built this, a different set of concerns started to emerge. If AI systems begin to play a role in evaluating candidates, what happens to diversity of thought? Do we start standardizing what 'good judgment' looks like? Do we unintentionally penalize unconventional but valid approaches because they don't align with the model's internal patterns? And over time, as people adapt to these systems, do they begin to optimize for what the AI rewards? These are not immediate problems, but they feel inevitable if such systems are deployed at scale.",
      },
      {
        type: "heading",
        text: "What This Means Going Forward",
      },
      {
        type: "paragraph",
        text: "We're moving toward a world where work is no longer performed in isolation. It happens inside systems, often AI-driven, often collaborative, often opaque. If that's the case, then evaluation needs to evolve as well. The question is no longer just whether someone can do the job. It's whether they can do the job when the system itself is part of the decision-making process. And that changes what we need to look for.",
      },
      {
        type: "heading",
        text: "Try It Yourself",
      },
      {
        type: "paragraph",
        text: "We've shared a working version of the prototype. If you try it, I'd be especially interested in where it breaks, what feels realistic, and what doesn't, particularly from clinicians or people building AI-driven workflows.",
      },
      {
        type: "quote",
        text: "The best operators in an AI-native world won't be the ones who use AI the most. They'll be the ones who know when it's helpful and when it's not.",
      },
      {
        type: "cta-row",
        items: [
          {
            label: "Open prototype ↗",
            href: "https://opal.google/app/1S4993-NcdVuMdlTCsuFcQvfu7FVYGY2f",
            description: "Try the triage simulation on Google Opal",
          },
          {
            label: "Like on LinkedIn ↗",
            href: "https://www.linkedin.com/posts/utkarsh-rawat_agenticai-aiworkflows-automation-ugcPost-7444881456109187072-25sS?utm_source=share&utm_medium=member_desktop&rcm=ACoAACAafYgBv0ZwKAHjq8x_0H-2y_FR8nUqNQQ",
            description: "If this resonated, drop a like on the post",
          },
        ],
      },
    ],
    images: [
      {
        src: "/projects/details/presentation.png",
        alt: "Team presenting the Agentic Triage Clinician Simulator project at UCLA Anderson School of Management.",
        caption: "Final presentation at UCLA Anderson, Enterprise AI course showcase.",
      },
      {
        src: "/projects/details/simulation-report.png",
        alt: "Evaluator Report for candidate Utkarsh showing risk assessment 6/10, communication 8/10, and decision-making 7/10 scores.",
        caption: "Evaluator Report: structured candidate assessment with risk signals and recommendations.",
      },
      {
        src: "/projects/details/prompt-grader-report.png",
        alt: "AI Prompt Evaluation Report showing a score of 96/100 with breakdowns across prompt clarity, clinical relevance, hallucination control, and output structure.",
        caption: "Prompt Grader output: structured evaluation report with dimension scores and strengths.",
      },
    ],
  },
  {
    slug: "penny-ai-insights-engine",
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
    content: [],
  },
  {
    slug: "crm-genai-servicenow",
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
    content: [],
  },
  {
    slug: "vaccinenow",
    title: "VaccineNow: Application for Vaccine Distribution Management",
    org: "ServiceNow hackathon prototype",
    timeframe: "2020",
    summary:
      "Conceptualized and prototyped a vaccine distribution workflow to support citizen registration, appointment scheduling, site operations, and rollout coordination during a ServiceNow hackathon.",
    detail:
      "Collaborated with three engineers, scoped the MVP by researching public-sector rollout requirements, and deliberated on tradeoffs across registration, inventory, eligibility, and check-in flows. The concept ranked in the top 10% of the hackathon, validating the business opportunity. The company later productized a vaccine distribution app for large-scale public deployment for NHS Scotland.",
    tags: ["Project", "Healthcare"],
    image: "/projects/homepage/vaccine-distribution-homepage.jpeg",
    imageAlt: "Workflow research and operational systems prototype visual.",
    content: [],
  },
  {
    slug: "neo-health-assistant",
    title: "Neo Health Assistant",
    org: "IIT BHU Design & Innovation Hub",
    timeframe: "Summer 2017",
    summary:
      "Built an Android health-support app selected by the IIT BHU Design & Innovation Hub to help students monitor mental-health signals, complete PHQ-9 style assessments, and access a conversational chatbot experience.",
    detail:
      "The two-month project combined Android Studio, Firebase, and Dialogflow to support sign-up, data capture, offline sync, comparative analysis, and a chatbot named Neo designed to make the experience more approachable.",
    tags: ["Project", "Health Tech"],
    image: "/projects/homepage/neo-health.png",
    imageAlt: "Neo Health Assistant student health application project visual.",
    githubUrl: "https://github.com/usrbom/Neo-Health-Assistant-Chatbot",
    content: [],
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectReadingTime(content: ProjectContentBlock[]): string {
  const wordCount = content.reduce((total, block) => {
    if (block.type === "paragraph" || block.type === "heading" || block.type === "quote") {
      return total + block.text.split(/\s+/).filter(Boolean).length;
    }
    if (block.type === "list") {
      return total + block.items.join(" ").split(/\s+/).filter(Boolean).length;
    }
    return total;
  }, 0);
  const minutes = Math.max(1, Math.round(wordCount / 200));
  return `${minutes} min read`;
}
