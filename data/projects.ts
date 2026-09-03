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
    title: "WhatsApp AI Sales Agent",
    summary: "Autonomous multi-tenant conversational sales & commerce agent on WhatsApp.",
    description:
      "Production-ready WhatsApp sales agent built with LangGraph, Claude / OpenAI LLMs, and Meta WhatsApp Cloud API. Features multi-tenant isolation, stateful conversation persistence via PostgreSQL, automated product discovery, dynamic order management, and real-time dashboard analytics.",
    category: ["AI", "Full Stack"],
    tech: ["FastAPI", "LangGraph", "Meta Cloud API", "PostgreSQL", "Claude AI", "OpenAI", "Docker", "Python"],
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    github: "https://github.com/Subhan696/Whatsapp-Sales-Agent",
    demo: "http://56.228.9.238:8000/admin",
    highlights: [
      "Stateful multi-turn LangGraph sales workflow",
      "Meta WhatsApp Cloud API integration for automated commerce",
      "PostgreSQL async checkpointing with multi-tenant architecture",
    ],
    featured: true,
  },
  {
    slug: "ai-fitness-trainer",
    title: "AI Fitness Trainer",
    summary: "Voice-enabled AI personal trainer for customized workouts and diet plans.",
    description:
      "An intelligent fitness companion with real-time Voice AI interaction via Vapi and Gemini AI. Generates personalized workout regimens and nutritional diets based on user goals, with Clerk authentication and Convex real-time database.",
    category: ["AI", "Full Stack", "Web"],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Gemini AI", "Vapi Voice AI", "Convex", "Clerk"],
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80",
    github: "https://github.com/Subhan696/AI-Fitness-Trainer",
    demo: "https://ai-fitness-trainer-woad.vercel.app",
    highlights: [
      "Real-time Voice AI assistant powered by Vapi & Gemini",
      "Instant personalized workout & custom diet generation",
      "Real-time data synchronization with Convex & Clerk Auth",
    ],
    featured: true,
  },
  {
    slug: "gradewave",
    title: "GradeWave",
    summary: "AI-powered automated grading and NLP assessment platform.",
    description:
      "A smart academic grading platform using Natural Language Processing (NLP) to evaluate student assignments, provide contextual feedback, and streamline performance tracking with FastAPI and React.",
    category: ["AI", "Full Stack", "Web"],
    tech: ["React", "Vite", "FastAPI", "Python", "NLP", "Tailwind CSS", "Redux Toolkit", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80",
    github: "https://github.com/sikandermukhtar/gradewave-final",
    demo: "https://gradewave-final.vercel.app",
    highlights: [
      "NLP-driven automated grading & semantic evaluation",
      "Real-time score calculation and detailed feedback",
      "FastAPI async backend with PostgreSQL storage",
    ],
    featured: true,
  },
];

export const projectCategories: (ProjectCategory | "All")[] = [
  "All",
  "AI",
  "Full Stack",
  "Web",
];
