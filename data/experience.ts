export type Experience = {
  role: string;
  company: string;
  location?: string;
  period: string;
  type: "Work" | "Internship" | "Research";
  description: string;
  highlights: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    role: "Trainee AI Engineer",
    company: "Rabix Technologies",
    location: "Lahore, Pakistan",
    period: "Feb 2026 — May 2026",
    type: "Work",
    description:
      "Engineered autonomous LLM pipelines and enterprise automation workflows, transitioning manual operational processes into reliable agentic solutions.",
    highlights: [
      "Built multi-step LLM orchestration pipelines that automated manual internal workflows, substantially cutting staff time spent on repetitive tasks.",
      "Engineered Retrieval-Augmented Generation (RAG) pipelines and structured prompt templates over internal knowledge bases, eliminating hallucinated responses.",
      "Integrated GenAI automation into existing developer tools via high-performance Python REST API services.",
    ],
    stack: ["LangChain", "OpenAI", "RAG", "FastAPI", "Python", "Vector Databases", "Prompt Engineering"],
  },
  {
    role: "Junior Software Engineer (Full-time)",
    company: "Dev&Mark",
    location: "Lahore, Pakistan",
    period: "May 2025 — Aug 2025",
    type: "Work",
    description:
      "Delivered production-grade full-stack web applications and scalable REST backend services in close collaboration with senior software architects.",
    highlights: [
      "Built and shipped full-stack features end-to-end (React frontend, Node.js / Express REST APIs) from initial requirements through production deployment.",
      "Boosted API response speeds and database reliability by optimizing PostgreSQL & MongoDB queries, creating strategic indexes, and eliminating redundant server logic.",
      "Collaborated in Agile sprints, conducting code reviews and ensuring strict TypeScript type safety across application boundaries.",
    ],
    stack: ["React.js", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "REST APIs", "JWT Auth"],
  },
  {
    role: "Full Stack Developer (Internship)",
    company: "Dev&Mark",
    location: "Lahore, Pakistan",
    period: "Feb 2025 — Apr 2025",
    type: "Internship",
    description:
      "Crafted responsive UI components and backend endpoints under senior mentorship, contributing directly to live client platforms.",
    highlights: [
      "Architected clean, reusable React UI components and stateful client modules under senior mentorship, shipping directly to production.",
      "Implemented and validated RESTful API endpoints in Node.js & Express connected to PostgreSQL, powering core application workflows.",
      "Streamlined frontend data fetching with optimistic updates and caching.",
    ],
    stack: ["React.js", "JavaScript (ES6+)", "Express.js", "Node.js", "CSS3", "Git"],
  },
];
