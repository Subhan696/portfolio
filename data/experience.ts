export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  skills: string[];
}

export const experiences: Experience[] = [
  {
    company: "Rabix Technologies",
    role: "Trainee AI Engineer",
    location: "Lahore, Pakistan",
    period: "Feb 2026 — May 2026",
    description:
      "Engineered multi-step LLM orchestration pipelines and production RAG services to automate repetitive internal operations and enhance knowledge accessibility.",
    highlights: [
      "Built multi-step LLM orchestration pipelines that automated repetitive internal workflows, reducing staff hands-on operational time.",
      "Improved LLM output relevance and precision via prompt engineering and RAG over internal knowledge bases, minimizing hallucinations.",
      "Integrated GenAI automation directly into existing software systems through high-performance Python REST API services.",
    ],
    skills: [
      "Python",
      "FastAPI",
      "LangChain",
      "LangGraph",
      "RAG",
      "OpenAI GPT-4o",
      "Pinecone",
      "REST APIs",
    ],
  },
  {
    company: "Dev&Mark",
    role: "Junior Software Engineer (Internship)",
    location: "Lahore, Pakistan",
    period: "May 2025 — Aug 2025",
    description:
      "Delivered production full-stack web capabilities, developed backend RESTful endpoints, and optimized database query execution for scalability.",
    highlights: [
      "Shipped full-stack features from initial requirement specifications to deployment utilizing React and Node.js/Express REST APIs.",
      "Optimized PostgreSQL and MongoDB queries, implemented targeted indexing, and refactored redundant API logic to enhance response speeds and system reliability.",
      "Collaborated in an agile cross-functional team to review architecture, test endpoints, and refine client-facing components.",
    ],
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "REST APIs",
      "JWT Auth",
    ],
  },
];
