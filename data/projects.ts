export type ProjectCategory = "AI" | "Web" | "Full Stack";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: ProjectCategory[];
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
  highlights: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "whatsapp-ai-sales-agent",
    title: "WhatsApp Business AI Sales Agent & CRM",
    summary: "Full-stack autonomous multi-turn sales agent & CRM on WhatsApp with LangGraph.",
    description:
      "A production-ready cyclic AI sales agent on WhatsApp. Converses with leads, searches product catalogs, quotes real-time pricing, handles cash-on-delivery and bank transfer checkouts, and records stateful session history using LangGraph and PostgreSQL checkpointers. Includes a full mobile-responsive CRM dashboard with live chat transcripts and lead tracking.",
    category: ["AI", "Full Stack"],
    tech: ["FastAPI", "Python", "LangGraph", "LangChain", "PostgreSQL", "Node.js", "Docker", "Meta Cloud API"],
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    github: "https://github.com/Subhan696/Whatsapp-Sales-Agent",
    highlights: [
      "Cyclic agent graph in LangGraph with PostgreSQL checkpointing for persistent memory",
      "Integrated CRM dashboard tracking leads from discovery through closed-won",
      "Dockerized microservices: FastAPI backend, Node.js WhatsApp bridge, and PostgreSQL",
    ],
    featured: true,
  },
  {
    slug: "gradewave",
    title: "GradeWave — Smart Teacher Assistance Using NLP",
    summary: "NLP-driven automated grading, quiz generation, and plagiarism detection platform.",
    description:
      "Final Year Project: Full-stack AI grading ecosystem that generates quizzes from uploaded course documents, auto-grades short answers via GPT-4o rubric evaluation, and detects cross-student plagiarism via cosine similarity. Built with FastAPI, PostgreSQL, Pinecone, and deployed with both a React TypeScript web app and a React Native Expo mobile app.",
    category: ["AI", "Full Stack", "Web"],
    tech: ["FastAPI", "React", "React Native (Expo)", "Pinecone", "LangChain", "OpenAI GPT-4o", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80",
    github: "https://github.com/Subhan696/GradeWave",
    highlights: [
      "RAG pipeline using LangChain, OpenAI embeddings & Pinecone vector indexing",
      "Hybrid grading combining deterministic MCQs and GPT-4o rubric short-answer analysis",
      "Unified FastAPI backend servicing web (React) and mobile (Expo React Native)",
    ],
    featured: true,
  },
  {
    slug: "ai-fitness-trainer",
    title: "AI Fitness Trainer & Voice Coach",
    summary: "Real-time Voice AI personal trainer generating dynamic workouts & diet plans.",
    description:
      "An intelligent fitness companion with conversational Voice AI powered by Vapi and Gemini AI. Synthesizes customized workout routines and nutritional plans tailored to user biometrics, synchronized in real time via Convex DB and secured by Clerk authentication.",
    category: ["AI", "Full Stack", "Web"],
    tech: ["Next.js", "React", "TypeScript", "Vapi Voice AI", "Gemini AI", "Convex", "Clerk Auth", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80",
    github: "https://github.com/Subhan696/AI-Fitness-Trainer",
    highlights: [
      "Real-time Voice AI conversation through Vapi SDK & Google Gemini models",
      "Reactive database streaming workout updates with Convex",
      "End-to-end user authentication and profile state management with Clerk",
    ],
    featured: true,
  },
  {
    slug: "logistic-mcp-server",
    title: "Logistics MCP Server & Invoice Extractor",
    summary: "Model Context Protocol (MCP) server for automated email & logistics document parsing.",
    description:
      "Production Model Context Protocol (MCP) backend for supply chain automation. Listens to logistics IMAP mailboxes, extracts PDF rate sheets and invoices with AI, parses structured payloads, and validates invoices against database schemas with Prisma and SQLite/PostgreSQL.",
    category: ["AI", "Full Stack"],
    tech: ["TypeScript", "Model Context Protocol (MCP)", "Prisma", "IMAP", "AI PDF Parsing", "Node.js"],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    github: "https://github.com/Subhan696/Logistic-MCP-server",
    highlights: [
      "Anthropic Model Context Protocol (MCP) tool integration",
      "Automated IMAP ingestion with intelligent PDF invoice processing",
      "Prisma schema migrations and automated invoice verification",
    ],
    featured: true,
  },
  {
    slug: "securehaven",
    title: "SecureHaven — Online Voting System",
    summary: "Secure digital voting platform with cryptographic ballot integrity & live tallying.",
    description:
      "A full-stack online voting web system built with React, Express, Node.js, and MongoDB. Features role-based access control, cryptographic bcrypt verification, JWT session authentication to prevent duplicate votes, and real-time tallying dashboards.",
    category: ["Web", "Full Stack"],
    tech: ["React.js", "Express.js", "Node.js", "MongoDB", "JWT Auth", "bcrypt"],
    image:
      "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&q=80",
    github: "https://github.com/Subhan696/Secure-Haven",
    highlights: [
      "Role-based access control (Admins, Candidates, Verified Voters)",
      "Tamper-resistant vote tallying and audit logging",
      "Live interactive results dashboard with dynamic visual charts",
    ],
    featured: false,
  },
  {
    slug: "atg-pos",
    title: "ATG Wholesale Warehouse & POS System",
    summary: "Offline-first cross-platform desktop application for inventory & billing.",
    description:
      "A cross-platform Electron.js desktop application engineered for high-throughput wholesale operations. Provides real-time stock deduction, barcode/receipt thermal printing, purchase orders, customer ledgers, and low-inventory telemetry on an offline-first SQLite database.",
    category: ["Full Stack", "Web"],
    tech: ["Electron.js", "React.js", "SQLite", "Node.js", "IPC Channels"],
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80",
    github: "https://github.com/Subhan696/Al-Touheed-WholeSale",
    highlights: [
      "Offline-first architecture with ACID-compliant SQLite schema",
      "Thermal printer hardware integration for instant POS receipts",
      "Analytics reporting for sales metrics, profit margins, and inventory alerts",
    ],
    featured: false,
  },
];

export const projectCategories: (ProjectCategory | "All")[] = [
  "All",
  "AI",
  "Full Stack",
  "Web",
];
