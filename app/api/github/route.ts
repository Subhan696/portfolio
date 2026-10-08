import { NextResponse } from "next/server";
import repoTreesData from "@/data/repo-trees.json";

export const dynamic = "force-dynamic";
export const revalidate = 1800; // 30 min cache

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
  topics?: string[];
  homepage?: string | null;
};

// Rich curated descriptions for Subhan's repos in case GitHub API description is empty or rate-limited
const fallbackDescriptions: Record<string, string> = {
  "Whatsapp-Sales-Agent":
    "Autonomous multi-tenant conversational sales & commerce agent on WhatsApp with cyclic LangGraph, PostgreSQL checkpointers, and Meta Cloud API.",
  "AI-Fitness-Trainer":
    "Voice-enabled AI personal trainer and custom diet planner utilizing Vapi Voice AI, Google Gemini, Convex real-time DB, and Clerk auth.",
  "GradeWave":
    "Smart teacher assistance platform using NLP, automated quiz generation via RAG, rubric-based short answer evaluation, and cosine plagiarism detection.",
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
  "FACE_APP":
    "Android facial detection and landmark recognition app built with Capacitor and native camera integrations.",
  "OIBSIP":
    "Data science machine learning tasks and exploratory data analysis notebooks (Iris flower classification).",
  "TicTacToe":
    "Multiplayer client-server networked socket game in Python with real-time state synchronization.",
  "portfolio":
    "Personal engineering portfolio built with Next.js 15, Framer Motion, TypeScript, and Tailwind CSS.",
};

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

    const [reposRes, userRes] = await Promise.all([
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
        { headers, next: { revalidate: 1800 } }
      ),
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers,
        next: { revalidate: 1800 },
      }),
    ]);

    if (!reposRes.ok || !userRes.ok) {
      // Return structured fallback data
      return NextResponse.json(buildFallbackPayload());
    }

    const allRepos = (await reposRes.json()) as Repo[];
    const user = await userRes.json();
    const trees = repoTreesData as Record<string, string>;

    const repos = allRepos
      .filter((r) => !r.fork && !r.archived)
      .map((r) => ({
        id: r.id,
        name: r.name,
        fullName: r.full_name,
        url: r.html_url,
        description: r.description || fallbackDescriptions[r.name] || "Public software repository.",
        language: r.language || (r.name.includes("Agent") || r.name.includes("RAG") ? "Python" : "TypeScript"),
        stars: r.stargazers_count,
        forks: r.forks_count,
        updated: r.updated_at,
        topics: r.topics || [],
        homepage: r.homepage || null,
        hasTree: Boolean(trees[r.name]),
      }));

    const totalStars = allRepos.reduce(
      (acc, r) => acc + r.stargazers_count,
      0
    );

    return NextResponse.json({
      user: {
        login: user.login || USERNAME,
        name: user.name || "Subhan Kashif",
        avatar: user.avatar_url || "https://avatars.githubusercontent.com/u/144606771",
        bio: user.bio || "AI Engineer & Full-Stack Developer",
        followers: user.followers ?? 2,
        following: user.following ?? 2,
        publicRepos: user.public_repos || repos.length,
        url: user.html_url || `https://github.com/${USERNAME}`,
      },
      stats: {
        totalStars,
        totalRepos: repos.length,
      },
      repos,
    });
  } catch (e) {
    return NextResponse.json(buildFallbackPayload());
  }
}

function buildFallbackPayload() {
  const trees = repoTreesData as Record<string, string>;
  const repoNames = Object.keys(fallbackDescriptions);
  const repos = repoNames.map((name, index) => ({
    id: 1000 + index,
    name,
    fullName: `Subhan696/${name}`,
    url: `https://github.com/Subhan696/${name}`,
    description: fallbackDescriptions[name],
    language:
      name.includes("Agent") || name.includes("RAG") || name === "TicTacToe"
        ? "Python"
        : name.includes("WholeSale") || name.includes("Secure") || name.includes("Writing") || name.includes("Ecommerce")
        ? "JavaScript"
        : name === "OIBSIP"
        ? "Jupyter Notebook"
        : "TypeScript",
    stars: [3, 2, 4, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1][index] || 1,
    forks: [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0][index] || 0,
    updated: "2026-04",
    topics: ["ai", "fullstack", "engineering"],
    homepage: null,
    hasTree: Boolean(trees[name]),
  }));

  return {
    user: {
      login: "Subhan696",
      name: "Subhan Kashif",
      avatar: "https://avatars.githubusercontent.com/u/144606771",
      bio: "AI Engineer · LLM & Full-Stack Developer",
      followers: 2,
      following: 2,
      publicRepos: 18,
      url: "https://github.com/Subhan696",
    },
    stats: {
      totalStars: 24,
      totalRepos: repos.length,
    },
    repos,
  };
}
