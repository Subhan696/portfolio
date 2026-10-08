import { NextResponse } from "next/server";
import repoTreesData from "@/data/repo-trees.json";

export const dynamic = "force-dynamic";
export const revalidate = 1800; // cache 30 mins

const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Subhan696";
const TOKEN = process.env.GITHUB_TOKEN;

type Repo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  homepage?: string | null;
  topics?: string[];
};

const repoDescriptions: Record<string, string> = {
  "Whatsapp-Sales-Agent":
    "Autonomous multi-tenant conversational sales & commerce agent on WhatsApp with LangGraph, PostgreSQL checkpointers, and Meta Cloud API.",
  "AI-Fitness-Trainer":
    "Voice-enabled AI personal trainer and nutrition planner using Vapi Voice AI, Google Gemini, Convex real-time DB, and Clerk auth.",
  "GradeWave":
    "NLP-powered automated grading, short-answer assessment, and plagiarism detection platform using FastAPI, LangChain, and Pinecone.",
  "Logistic-MCP-server":
    "Model Context Protocol (MCP) server for automated email & PDF invoice parsing, data extraction, and logistics verification.",
  "RAG":
    "Production Retrieval-Augmented Generation pipeline with document chunking, semantic vector search, reranking, and citation generation.",
  "dat-agent":
    "Desktop extension and cloud worker agent with Drizzle ORM, browser automation, and LLM tool calling.",
  "B2B-agent":
    "B2B research and sales prospecting agent featuring automated scraping, web synthesis, and LLM reasoning.",
  "Al-Touheed-WholeSale":
    "Offline-first Electron desktop application for wholesale warehouse inventory, thermal receipt POS printing, and order accounting.",
  "Secure-Haven":
    "Cryptographically verifiable online voting system with role-based JWT auth, bcrypt ballot security, and live tallying.",
  "SecureHaven":
    "Full-stack React & Express online election portal with interactive live results dashboard and voter registration.",
  "movie-rag-chatbot":
    "Context-aware movie recommendation chatbot powered by conversational memory and vector retrieval.",
  "AI-Writing-Assistant":
    "Full-stack AI content drafting assistant with OpenAI API integration, per-user usage limits, and generation history.",
  "Invoice-Generator":
    "Web application for automated invoice calculations, tax itemization, and instant client PDF invoice generation.",
  "Ecommerce-store_":
    "Full-stack e-commerce marketplace frontend and backend with shopping cart and product catalog.",
  "OIBSIP":
    "Data science machine learning tasks and exploratory data analysis notebooks (Iris flower classification).",
  "FACE_APP":
    "Android facial detection and landmark recognition app built with Capacitor and native camera integrations.",
  "TicTacToe":
    "Multiplayer client-server networked socket game in Python with real-time state synchronization.",
  "portfolio":
    "Personal engineering portfolio built with Next.js, Framer Motion, and luxury typography.",
};

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "User-Agent": "PortfolioApp/1.0",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

    const [reposRes, userRes, contribRes] = await Promise.all([
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
        { headers, next: { revalidate: 1800 } }
      ).catch(() => null),
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers,
        next: { revalidate: 1800 },
      }).catch(() => null),
      fetch(
        `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
        { headers: { "User-Agent": "PortfolioApp/1.0" }, next: { revalidate: 1800 } }
      ).catch(() => null),
    ]);

    let allRepos: Repo[] = [];
    if (reposRes && reposRes.ok) {
      allRepos = (await reposRes.json()) as Repo[];
    }

    let user = {
      login: USERNAME,
      name: "Subhan Kashif",
      avatar: "https://github.com/Subhan696.png",
      bio: "AI Engineer & Full-Stack Developer",
      followers: 4,
      following: 5,
      publicRepos: 18,
      url: `https://github.com/${USERNAME}`,
    };

    if (userRes && userRes.ok) {
      const u = await userRes.json();
      user = {
        login: u.login,
        name: u.name || "Subhan Kashif",
        avatar: u.avatar_url || "https://github.com/Subhan696.png",
        bio: u.bio || "AI Engineer & Full-Stack Developer",
        followers: u.followers ?? 4,
        following: u.following ?? 5,
        publicRepos: u.public_repos ?? 18,
        url: u.html_url || `https://github.com/${USERNAME}`,
      };
    }

    let contributionsData = null;
    if (contribRes && contribRes.ok) {
      contributionsData = await contribRes.json();
    }

    const trees = repoTreesData as Record<string, string>;

    const repos = allRepos
      .filter((r) => !r.archived)
      .map((r) => ({
        id: r.id,
        name: r.name,
        url: r.html_url,
        description: r.description || repoDescriptions[r.name] || "Repository by Subhan Kashif",
        language: r.language || (r.name.includes("agent") ? "Python" : "TypeScript"),
        stars: r.stargazers_count,
        forks: r.forks_count,
        updated: r.updated_at,
        homepage: r.homepage || null,
        structure: trees[r.name] || `├── src/\n│   └── index.ts\n├── README.md\n└── package.json`,
      }));

    const totalStars = allRepos.reduce(
      (acc, r) => acc + r.stargazers_count,
      0
    );

    return NextResponse.json({
      user,
      stats: {
        totalStars,
        totalRepos: repos.length || 18,
      },
      repos,
      contributions: contributionsData,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
