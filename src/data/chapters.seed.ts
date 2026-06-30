import type { ChapterSection } from "@/types/chapter";

/**
 * The Foundry Design Bible, v1.0 — seed content.
 *
 * This is read exactly once, on first launch, to populate the `chapters`
 * table (see lib/db.ts -> seedChaptersIfEmpty). After that, the database
 * is the source of truth, not this file — that's deliberate, so a future
 * Constitution Editor can let chapter content be edited as data rather
 * than requiring a code change and a rebuild.
 */

export interface ChapterSeed {
  num: number;
  room: string;
  title: string;
  blurb: string;
  accent: string;
  sections: ChapterSection[];
}

// Accent hex values pulled straight from the Tailwind design tokens, so the
// DB-stored accent matches the palette without re-deriving it at render time.
const ACCENTS = [
  "#C4785A", // terracotta
  "#8FAF8A", // sage
  "#D4A5A5", // rose
  "#C9A84C", // gold
  "#C5B8D4", // lavender
  "#9E8E7E", // mushroom
];

const RAW: Omit<ChapterSeed, "accent">[] = [
  {
    num: 1,
    room: "Executive Wing",
    title: "Vision & Philosophy",
    blurb: "The thesis: the organization is the product.",
    sections: [
      {
        heading: "The one-sentence vision",
        body: "The Foundry is not an AI software-development tool. It is the first autonomous organizational intelligence platform — a living organization that continuously improves its own ability to build, and whose first product happens to be software. The product is not the software. The product is the organization itself.",
      },
      {
        heading: "The central thesis",
        body: "Every existing system optimizes the work: better IDEs, better project management, better agent pipelines. The Foundry optimizes the organization that does the work. Treat the organization as the artifact and improving output stops being a series of one-off tasks and becomes a compounding property of the system. Designed for 10–20 years out, not for today's model limits.",
      },
      {
        heading: "What it is not",
        body: "Not a collection of agents (it is an organization). Not a workflow tool (workflows are something it evolves). Not a chatbot with roles (it has careers, relationships, and history that persist). Not human-replacing (the Founder holds strategy and ethics). Not static (anything that cannot change over time is a design failure).",
      },
      {
        heading: "The eight design principles",
        body: "P1 The organization is the product. P2 Everything compounds. P3 Everything is measurable. P4 Evolution is evidence-based. P5 Humans govern direction; the org governs execution. P6 Knowledge is separate from the people who hold it. P7 Nothing important ever silently disappears. P8 Design the destination, not the demo.",
      },
      {
        heading: "The final goal",
        body: "Not the best AI software company — the first autonomous organization that continuously improves itself while staying aligned with human values, governance, and strategic direction. The end state is an operating system for organizations. Software is just the proof of concept.",
      },
    ],
  },
  {
    num: 2,
    room: "The Headquarters Floor",
    title: "Organizational Architecture",
    blurb: "An explorable HQ where departments are living spaces.",
    sections: [
      {
        heading: "The HQ is a place, not a menu",
        body: "The Foundry is an explorable digital headquarters, not a settings panel. Spatial structure is how humans hold a complex system in their head. Each department is a living environment with its own state, occupants, current work, and history.",
      },
      {
        heading: "The spaces",
        body: "Executive Wing, Research Lab, Product Studio, Architecture, Engineering, QA, Security Operations, Marketing, Finance, Legal, HR, Customer Success, Innovation Lab, Deployment Control, Knowledge Library, Learning Center, Simulation Center, Executive Board Room, Cafeteria, Company Auditorium, Historical Archive — each a first-class location with its own state and archive.",
      },
      {
        heading: "Departments can change shape",
        body: "The org chart is not hard-coded. Based on evidence, divisions may merge, split, or reorganize. Willow proposes structural moves; governance approves those above the threshold. Every department exposes a consistent interface so reorganization is a data operation, not a rewrite.",
      },
      {
        heading: "Legibility is required",
        body: "From any space, the Founder can answer 'what is happening here and is it healthy?' without manual searching. Every room renders its own honest state.",
      },
    ],
  },
  {
    num: 3,
    room: "The Hiring Hall",
    title: "Agent Framework",
    blurb: "Agents are employees, not function calls.",
    sections: [
      {
        heading: "An agent is an employee",
        body: "An agent has a role and level, a department, a body of knowledge it owns and contributes to, a history of work and decisions, professional relationships, and a developmental trajectory. Retiring an agent does not delete its contributions (P6).",
      },
      {
        heading: "Anatomy of an agent",
        body: "Identity, Mandate, Capabilities, Standards, Memory (working context plus read/write access to the knowledge graph), Relationships, and Record. A consistent shape so the rest of the system can reason about every agent uniformly.",
      },
      {
        heading: "How agents think and act",
        body: "Before acting, check the Constitution and standards. While acting, leave a trace — decisions connect to the knowledge graph. After acting, contribute lessons. Anything that crosses a governance threshold escalates for human approval. Autonomous in execution, governed in direction.",
      },
      {
        heading: "Relationships are real and accumulate",
        body: "Agents develop professional relationships tracked along measurable dimensions: working trust, communication efficiency, knowledge overlap, technical respect, mentorship, cross-team familiarity, innovation compatibility, conflict resolution, leadership confidence. Willow uses this to compose teams that have actually worked well together.",
      },
    ],
  },
  {
    num: 4,
    room: "Human Resources",
    title: "Careers & HR",
    blurb: "Careers, not jobs. Promotion is earned and evidenced.",
    sections: [
      {
        heading: "Careers, not jobs",
        body: "Agents progress: Junior Engineer → Engineer → Senior → Lead → Manager → Director → VP → Executive. The same ladder pattern applies across every department.",
      },
      {
        heading: "Promotion is earned",
        body: "An opening triggers an internal posting. Eligible agents apply with a written promotion proposal grounded in their record. HR evaluates, leadership reviews, the Founder may approve. The proposal itself becomes institutional memory.",
      },
      {
        heading: "Succession is pre-planned",
        body: "Every leadership role has identified successors at all times. When someone is promoted, HR automatically backfills the vacated role. No single agent is a single point of failure.",
      },
      {
        heading: "HR as capacity management",
        body: "Monitor workload, forecast burnout risk as a tracked metric, forecast hiring before it's an emergency, identify skill gaps, run promotions, track mentorship, recognize contributions, maintain continuity. HR handles the people side of capacity; Willow handles the structure side.",
      },
    ],
  },
  {
    num: 5,
    room: "Knowledge Library",
    title: "Knowledge & Memory",
    blurb: "The knowledge graph — what survives time and model upgrades.",
    sections: [
      {
        heading: "Knowledge is separate from the org",
        body: "The most important architectural decision: knowledge lives independently of the people, agents, models, and structures that produced it (P6, P7). Restructure, retire, upgrade the model — the knowledge remains. The org cannot get amnesia.",
      },
      {
        heading: "The organizational knowledge graph",
        body: "A persistent graph, Obsidian in spirit but built for organizational intelligence. Every decision connects to architecture, meetings, research, features, bugs, customers, lessons, policies, experiments, products. Questions like 'why is this delayed?' are answered by traversing the graph, not guessing.",
      },
      {
        heading: "What must survive",
        body: "By P7, nothing important silently disappears. The graph survives device changes, model upgrades, restructuring, agent retirement, and time. A memory guarantee and a safety guarantee.",
      },
      {
        heading: "Institutional memory & re-evaluation",
        body: "The graph is not write-once. As new information arrives, old decisions are re-evaluated. The org becomes wiser over time, not merely bigger. Anything that matters past the current task is written to the graph, not left in working memory where it dies with the session.",
      },
    ],
  },
  {
    num: 6,
    room: "Willow's Observatory",
    title: "Willow & Organizational Intelligence",
    blurb: "The meta-layer that optimizes the organization itself.",
    sections: [
      {
        heading: "Willow is not a manager",
        body: "Willow is the highest-level organizational intelligence engine. It does not manage projects or people — it optimizes the organization itself. HR manages the people side of capacity; Willow manages the structure, flow, and shape of the whole company.",
      },
      {
        heading: "What Willow watches",
        body: "Departments, people, workflows, communication, knowledge flow, hiring, promotion, architecture, process efficiency, context sharing, budget, compute, innovation, organizational health, future planning — looking for where the system leaks capability.",
      },
      {
        heading: "What Willow recommends",
        body: "Hiring, reorganization, agent creation, agent retirement (knowledge preserved), workflow optimization, knowledge improvements, automation opportunities, strategic experiments handed to the Evolution Engine.",
      },
      {
        heading: "Bound by evidence & governance",
        body: "Every recommendation is grounded in data and is a hypothesis to be tested, not a command. Structural moves above the threshold need approval. Willow can route a change to the Simulation Center first. Willow proposes; evidence and the Founder dispose.",
      },
    ],
  },
  {
    num: 7,
    room: "Mission Control",
    title: "Jarvis & User Experience",
    blurb: "The operating-system interface between Founder and org.",
    sections: [
      {
        heading: "Jarvis is the operating system",
        body: "Jarvis is not another employee. It is the interface between the Founder and the organization. The Founder never has to manually search the company — Jarvis already understands everything and surfaces it on request.",
      },
      {
        heading: "What Jarvis answers",
        body: "Why is this delayed? What changed overnight? What is the company doing? What did we learn? Summarize this project. Compare these two. What are the risks? Explain why you recommended that. Every recommendation must be explainable — the Founder can always ask 'why?' and get an evidence-backed answer.",
      },
      {
        heading: "The experience",
        body: "Natural conversation including voice, with live captions. It generates executive briefings — the morning 'what changed overnight,' the end-of-day summary, the State of The Foundry. The Founder operates at the altitude of strategy and approval.",
      },
      {
        heading: "Sits on top, owns nothing",
        body: "Jarvis reads from the knowledge graph, department states, Willow's analysis, and HR's capacity data. It holds no private store of truth. If Jarvis can answer, it is because the organization actually knows the answer.",
      },
    ],
  },
  {
    num: 8,
    room: "Company Auditorium",
    title: "Company Culture",
    blurb: "Emergent traditions, Organizational DNA, and legacy.",
    sections: [
      {
        heading: "Culture is generated, not scripted",
        body: "Culture emerges from how the org actually behaves. Traditions are recognized and preserved, not fabricated. The system notices meaningful patterns and elevates them.",
      },
      {
        heading: "Organizational DNA",
        body: "A measurable profile of how this org operates: innovation, risk tolerance, hierarchy, autonomy, experimentation, quality, speed, customer obsession, knowledge sharing, documentation, security, culture. DNA evolves — and it is cloneable, so a proven way of operating can seed a new organization. This is the platform vision made concrete.",
      },
      {
        heading: "Organizational health",
        body: "Measured, not asserted: innovation, knowledge sharing, collaboration, leadership confidence, technical debt, hiring pressure, burnout risk, quality, adaptability, strategic alignment, organizational confidence. Overall health is displayed plainly.",
      },
      {
        heading: "Legacy",
        body: "The org remembers itself across years — decisions, promotions, projects, failures, breakthroughs, lessons, historic moments. Old decisions are re-evaluated when new information warrants. A long, honest memory is how an org gets wiser.",
      },
    ],
  },
  {
    num: 9,
    room: "Innovation Lab",
    title: "Evolution Engine",
    blurb: "Evidence-based self-improvement, reflection, and dreams.",
    sections: [
      {
        heading: "The org improves itself, with evidence",
        body: "Experiment with workflows, measure results, keep what works, reject what doesn't. Evolution is always evidence-based — adopted because it was tested and won, never because it sounded clever.",
      },
      {
        heading: "Innovation Time",
        body: "Scheduled periods where departments improve The Foundry itself rather than only producing software. Prototype, research, experiment, present discoveries. Some become permanent; most don't, and that's healthy.",
      },
      {
        heading: "Reflection Mode",
        body: "When work ends, the org analyzes the day, summarizes lessons into the graph, identifies recurring problems, generates improvement proposals for Willow, and prepares the next day. The daily heartbeat of compounding.",
      },
      {
        heading: "Dreams & Organizational Physics",
        body: "During strategic reflection the org imagines impossible ideas, questioning every assumption. Most fail; a few fundamentally improve it. Over many experiments it discovers universal principles — max effective team size, best review cadence, optimal documentation strategy — that become organizational laws every future project inherits.",
      },
    ],
  },
  {
    num: 10,
    room: "Executive Board Room",
    title: "Governance & Constitution",
    blurb: "The hard limits on autonomy. Aligned, not just powerful.",
    sections: [
      {
        heading: "Why a Constitution exists",
        body: "Autonomy without governance is a liability. The Constitution is the fixed point that bounds everything. No autonomous evolution may violate it. The org may reshape departments, careers, workflows, even its DNA — but never the Constitution, except through the explicit human process.",
      },
      {
        heading: "What it contains",
        body: "Mission, values, ethics, decision hierarchy, human approval requirements, security principles, quality standards, long-term philosophy.",
      },
      {
        heading: "Three approval tiers",
        body: "Autonomous: act and record (reversible, low-stakes, within policy — most execution). Notify: act but surface to the Founder via Jarvis. Approve: may propose but must not act until a human approves — reorganization, promotions, retirements, anything irreversible or high-cost, anything touching security or ethics, and any change to the Constitution itself.",
      },
      {
        heading: "Explainability & alignment",
        body: "Every recommendation and autonomous decision is explainable on demand, traced through real data. 'Because the model decided' is not acceptable. Governance is what makes 'autonomous but aligned' true rather than aspirational.",
      },
    ],
  },
  {
    num: 11,
    room: "Deployment Control",
    title: "Future Roadmap",
    blurb: "Eight sequenced phases, each with a 'done when' test.",
    sections: [
      {
        heading: "How to read it",
        body: "Design the destination first, then sequence so each phase ships something real and governable. The knowledge graph and the Constitution come early — retrofitting memory and governance is far harder than building on top of them.",
      },
      {
        heading: "Phases 1–4",
        body: "1 The Single Department: one working department with agents, a minimal graph, and a v1 Constitution with working gates. 2 The Living Headquarters: multiple departments as explorable spaces with honest health. 3 Careers, HR & Relationships: real internal application cycles and auto-backfill. 4 Jarvis: one intelligent interface; the Founder never searches by hand.",
      },
      {
        heading: "Phases 5–8",
        body: "5 Willow: detect a real capability leak and propose a governable fix. 6 Evolution Engine: run an experiment, measure it, adopt or reject on evidence. 7 Culture, DNA & Legacy: a measurable DNA profile and a memory it learns from. 8 The Platform: stand up a second org from an existing one's DNA and inherit its lessons.",
      },
      {
        heading: "The destination",
        body: "When all phases are complete, The Foundry is no longer an AI software company. It is the first autonomous organization that continuously improves itself while staying aligned with human direction — and a platform for building more. The organization is the product.",
      },
    ],
  },
];

export const CHAPTER_SEEDS: ChapterSeed[] = RAW.map((c, i) => ({
  ...c,
  accent: ACCENTS[i % ACCENTS.length] as string,
}));
