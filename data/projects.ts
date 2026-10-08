export type ProjectCategory = "AI" | "Web" | "Full Stack" | "Systems";

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
  period: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "whatsapp-ai-sales-agent",
    title: "WhatsApp Business AI Sales Agent & CRM",
    summary:
      "Autonomous conversational WhatsApp sales agent with LangGraph cyclic state graph and full-stack CRM dashboard.",
    description:
      "Autonomous sales and commerce agent operating on the Meta WhatsApp Cloud API. Handles real-time product discovery, instant pricing calculations, automated Cash-On-Delivery and bank-transfer checkout, and anti-hallucination guardrails via a cyclic LangGraph state machine with PostgreSQL checkpointing. Accompanied by a mobile-responsive CRM dashboard for live chat monitoring, order management, and lead lifecycle tracking.",
    category: ["AI", "Full Stack"],
    tech: [
      "Python",
      "FastAPI",
      "LangGraph",
      "LangChain",
      "PostgreSQL",
      "Node.js",
      "Docker Compose",
      "Nginx",
    ],
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    github: "https://github.com/Subhan696/Whatsapp-Sales-Agent",
    period: "June 2026",
    highlights: [
      "Cyclic LangGraph agent with PostgreSQL checkpointer and tool calling",
      "End-to-end checkout flow supporting COD & bank verification",
      "Mobile-responsive CRM dashboard with real-time order lifecycle tracking",
      "Dockerized FastAPI & Node.js bridge with SSL via Nginx & Certbot",
    ],
    featured: true,
  },
  {
    slug: "gradewave",
    title: "GradeWave — Smart Teacher Assistance (FYP)",
    summary:
      "AI grading platform automating quiz generation, rubric-based short-answer scoring, and cosine plagiarism detection.",
    description:
      "Final year project built by a 3-person team automating teacher workflows. Features an end-to-end RAG pipeline using LangChain, OpenAI embeddings, and Pinecone for automated syllabus-grounded quiz generation, a GPT-4o rubric-based grader for short answers, and cosine-similarity vector plagiarism analysis across student submissions. Unified FastAPI backend serving both a React+TypeScript web portal and an Expo React Native mobile application.",
    category: ["AI", "Full Stack", "Web"],
    tech: [
      "React",
      "React Native (Expo)",
      "FastAPI",
      "PostgreSQL",
      "LangChain",
      "OpenAI GPT-4o",
      "Pinecone",
    ],
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80",
    github: "https://github.com/Subhan696/GradeWave",
    period: "Jul 2025 — May 2026",
    highlights: [
      "RAG pipeline (LangChain, OpenAI embeddings, Pinecone) for syllabus quiz creation",
      "GPT-4o rubric-driven short-answer evaluator with contextual feedback",
      "Vector cosine-similarity engine detecting inter-submission plagiarism",
      "Cross-platform support: React web app + React Native (Expo) mobile app",
    ],
    featured: true,
  },
  {
    slug: "ai-fitness-trainer",
    title: "AI Fitness Trainer & Voice Assistant",
    summary:
      "Voice-enabled AI personal trainer and nutrition advisor using Vapi Voice AI and Google Gemini.",
    description:
      "An interactive voice-first health platform delivering real-time voice consultations with Vapi Voice AI and Gemini LLM. Dynamically generates tailored workout regimens and nutritional meal plans based on individual body metrics, dietary restrictions, and fitness objectives. Features real-time state synchronization with Convex and secure Clerk authentication.",
    category: ["AI", "Full Stack", "Web"],
    tech: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Gemini AI",
      "Vapi Voice AI",
      "Convex DB",
      "Clerk Auth",
    ],
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80",
    github: "https://github.com/Subhan696/AI-Fitness-Trainer",
    demo: "https://ai-fitness-trainer-woad.vercel.app",
    period: "Mar 2026",
    highlights: [
      "Sub-second voice conversations powered by Vapi AI and Google Gemini",
      "Dynamic workout routine and caloric nutrition plan generator",
      "Reactive database architecture with Convex and Clerk identity",
    ],
    featured: true,
  },
  {
    slug: "securehaven-voting",
    title: "SecureHaven — Online Voting System",
    summary:
      "Cryptographically secure online voting platform with duplicate-vote prevention and real-time dashboard.",
    description:
      "Full-stack electronic election system designed with tamper-evident ballot integrity. Incorporates role-based access control, cryptographic bcrypt ballot hashing, JSON Web Token session security, and anti-duplicate vote constraints, providing a live real-time dashboard for instantaneous election tally monitoring.",
    category: ["Web", "Full Stack"],
    tech: [
      "React.js",
      "Express.js",
      "Node.js",
      "MongoDB",
      "JWT",
      "Bcrypt",
      "Tailwind CSS",
    ],
    image:
      "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&q=80",
    github: "https://github.com/Subhan696/Secure-Haven",
    period: "Jan 2024 — May 2024",
    highlights: [
      "Tamper-resistant ballot storage with duplicate-vote prevention locks",
      "Role-based access control with secure JWT auth & bcrypt encryption",
      "Live election analytics dashboard with instant vote count updates",
    ],
    featured: true,
  },
  {
    slug: "atg-warehouse-pos",
    title: "ATG Warehouse Management & POS Billing",
    summary:
      "Offline-first cross-platform desktop application for inventory tracking, POS billing, and receipt printing.",
    description:
      "Desktop software developed with Electron.js and React for wholesale distribution. Supports offline-first inventory management, supplier purchase orders, point-of-sale thermal receipt generation, sales profit analytics, and automatic low-stock notifications backed by local SQLite storage.",
    category: ["Systems", "Full Stack"],
    tech: [
      "Electron.js",
      "React.js",
      "SQLite",
      "Node.js",
      "IPC Architecture",
      "Thermal Print SDK",
    ],
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80",
    github: "https://github.com/Subhan696/Al-Touheed-WholeSale",
    period: "Jun 2024 — Oct 2024",
    highlights: [
      "100% offline-first local database operation with zero latency",
      "Automated thermal receipt formatting and ESC/POS printer driver support",
      "Comprehensive inventory tracking with automated reorder alerts",
    ],
    featured: false,
  },
  {
    slug: "logistic-mcp-server",
    title: "Logistic MCP Server",
    summary:
      "Model Context Protocol (MCP) server for automated email & PDF invoice parsing and data extraction.",
    description:
      "Standardized Model Context Protocol server enabling LLMs to securely interact with logistics records, IMAP email inboxes, and multimodal PDF documents. Employs Prisma ORM and structured AI extraction services to parse freight invoices, reconcile billing statements, and update database registries automatically.",
    category: ["AI", "Systems"],
    tech: [
      "TypeScript",
      "Model Context Protocol (MCP)",
      "Prisma",
      "SQLite",
      "Node.js",
      "IMAP SDK",
    ],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    github: "https://github.com/Subhan696/Logistic-MCP-server",
    period: "Feb 2026",
    highlights: [
      "Compliant with Anthropic Model Context Protocol (MCP) specification",
      "Automated IMAP attachment extraction and structured LLM parsing",
      "Prisma ORM schema with migration tracking and test suites",
    ],
    featured: false,
  },
];

export const projectCategories: (ProjectCategory | "All")[] = [
  "All",
  "AI",
  "Full Stack",
  "Web",
  "Systems",
];
