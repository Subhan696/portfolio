"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Star,
  GitFork,
  ExternalLink,
  FolderTree,
  Search,
  Copy,
  Check,
  ChevronDown,
  Layers,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import repoTreesData from "@/data/repo-trees.json";

type RepoItem = {
  id: number;
  name: string;
  url: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updated: string;
  structure?: string;
};

const initialRepos: RepoItem[] = [
  {
    id: 1,
    name: "Whatsapp-Sales-Agent",
    url: "https://github.com/Subhan696/Whatsapp-Sales-Agent",
    description:
      "Autonomous multi-tenant conversational sales & commerce agent on WhatsApp with LangGraph, PostgreSQL checkpointers, and Meta Cloud API.",
    language: "Python",
    stars: 3,
    forks: 1,
    updated: "2026-04",
  },
  {
    id: 2,
    name: "AI-Fitness-Trainer",
    url: "https://github.com/Subhan696/AI-Fitness-Trainer",
    description:
      "Voice-enabled AI personal trainer and nutrition planner using Vapi Voice AI, Google Gemini, Convex real-time DB, and Clerk auth.",
    language: "TypeScript",
    stars: 2,
    forks: 0,
    updated: "2026-03",
  },
  {
    id: 3,
    name: "GradeWave",
    url: "https://github.com/Subhan696/GradeWave",
    description:
      "NLP-powered automated grading, short-answer assessment, and plagiarism detection platform using FastAPI, LangChain, and Pinecone.",
    language: "Python",
    stars: 4,
    forks: 2,
    updated: "2026-04",
  },
  {
    id: 4,
    name: "Logistic-MCP-server",
    url: "https://github.com/Subhan696/Logistic-MCP-server",
    description:
      "Model Context Protocol (MCP) server for automated email & PDF invoice parsing, data extraction, and logistics verification.",
    language: "TypeScript",
    stars: 2,
    forks: 0,
    updated: "2026-02",
  },
  {
    id: 5,
    name: "RAG",
    url: "https://github.com/Subhan696/RAG",
    description:
      "Production Retrieval-Augmented Generation pipeline with document chunking, semantic vector search, reranking, and citation generation.",
    language: "Python",
    stars: 1,
    forks: 0,
    updated: "2026-02",
  },
  {
    id: 6,
    name: "dat-agent",
    url: "https://github.com/Subhan696/dat-agent",
    description:
      "Desktop extension and cloud worker agent with Drizzle ORM, browser automation, and LLM tool calling.",
    language: "TypeScript",
    stars: 1,
    forks: 0,
    updated: "2026-01",
  },
  {
    id: 7,
    name: "B2B-agent",
    url: "https://github.com/Subhan696/B2B-agent",
    description:
      "B2B research and sales prospecting agent featuring automated scraping, web synthesis, and LLM reasoning.",
    language: "Python",
    stars: 1,
    forks: 0,
    updated: "2026-01",
  },
  {
    id: 8,
    name: "Al-Touheed-WholeSale",
    url: "https://github.com/Subhan696/Al-Touheed-WholeSale",
    description:
      "Offline-first Electron desktop application for wholesale warehouse inventory, thermal receipt POS printing, and order accounting.",
    language: "JavaScript",
    stars: 2,
    forks: 0,
    updated: "2025-11",
  },
  {
    id: 9,
    name: "Secure-Haven",
    url: "https://github.com/Subhan696/Secure-Haven",
    description:
      "Cryptographically verifiable online voting system with role-based JWT auth, bcrypt ballot security, and live tallying.",
    language: "JavaScript",
    stars: 1,
    forks: 0,
    updated: "2025-09",
  },
  {
    id: 10,
    name: "SecureHaven",
    url: "https://github.com/Subhan696/SecureHaven",
    description:
      "Full-stack React & Express online election portal with interactive live results dashboard and voter registration.",
    language: "JavaScript",
    stars: 1,
    forks: 0,
    updated: "2025-09",
  },
  {
    id: 11,
    name: "movie-rag-chatbot",
    url: "https://github.com/Subhan696/movie-rag-chatbot",
    description:
      "Context-aware movie recommendation chatbot powered by conversational memory and vector retrieval.",
    language: "Python",
    stars: 1,
    forks: 0,
    updated: "2025-08",
  },
  {
    id: 12,
    name: "AI-Writing-Assistant",
    url: "https://github.com/Subhan696/AI-Writing-Assistant",
    description:
      "Full-stack AI content drafting assistant with OpenAI API integration, per-user usage limits, and generation history.",
    language: "JavaScript",
    stars: 2,
    forks: 1,
    updated: "2025-07",
  },
  {
    id: 13,
    name: "Invoice-Generator",
    url: "https://github.com/Subhan696/Invoice-Generator",
    description:
      "Web application for automated invoice calculations, tax itemization, and instant client PDF invoice generation.",
    language: "HTML / JS",
    stars: 1,
    forks: 0,
    updated: "2025-06",
  },
  {
    id: 14,
    name: "Ecommerce-store_",
    url: "https://github.com/Subhan696/Ecommerce-store_",
    description:
      "Full-stack e-commerce marketplace frontend and backend with shopping cart and product catalog.",
    language: "JavaScript",
    stars: 1,
    forks: 0,
    updated: "2025-05",
  },
  {
    id: 15,
    name: "FACE_APP",
    url: "https://github.com/Subhan696/FACE_APP",
    description:
      "Android facial detection and landmark recognition app built with Capacitor and native camera integrations.",
    language: "TypeScript",
    stars: 1,
    forks: 0,
    updated: "2025-04",
  },
  {
    id: 16,
    name: "OIBSIP",
    url: "https://github.com/Subhan696/OIBSIP",
    description:
      "Data science machine learning tasks and exploratory data analysis notebooks (Iris flower classification).",
    language: "Jupyter Notebook",
    stars: 1,
    forks: 0,
    updated: "2025-03",
  },
  {
    id: 17,
    name: "TicTacToe",
    url: "https://github.com/Subhan696/TicTacToe",
    description:
      "Multiplayer client-server networked socket game in Python with real-time state synchronization.",
    language: "Python",
    stars: 1,
    forks: 0,
    updated: "2024-12",
  },
  {
    id: 18,
    name: "portfolio",
    url: "https://github.com/Subhan696/portfolio",
    description:
      "Personal engineering portfolio built with Next.js, Framer Motion, and luxury typography.",
    language: "TypeScript",
    stars: 1,
    forks: 0,
    updated: "2026-04",
  },
];

const langColors: Record<string, string> = {
  Python: "bg-emerald-400",
  TypeScript: "bg-blue-400",
  JavaScript: "bg-amber-400",
  HTML: "bg-orange-400",
  "HTML / JS": "bg-orange-400",
  "Jupyter Notebook": "bg-orange-500",
};

export default function GithubRepos() {
  const [repos, setRepos] = useState<RepoItem[]>(initialRepos);
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [expandedTree, setExpandedTree] = useState<string | null>(null);
  const [copiedName, setCopiedName] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (data.repos && data.repos.length > 0) {
          setRepos(data.repos);
        }
      })
      .catch(() => {});
  }, []);

  const trees = repoTreesData as Record<string, string>;

  const filteredRepos = repos.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.description?.toLowerCase().includes(search.toLowerCase()) ||
      r.language?.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === "All") return true;
    if (filter === "AI & Agents")
      return (
        r.name.toLowerCase().includes("agent") ||
        r.name.toLowerCase().includes("rag") ||
        r.name.toLowerCase().includes("ai") ||
        r.name.toLowerCase().includes("mcp") ||
        r.description.toLowerCase().includes("llm")
      );
    if (filter === "Full Stack")
      return (
        r.language === "TypeScript" ||
        r.language === "JavaScript" ||
        r.description.toLowerCase().includes("full-stack") ||
        r.description.toLowerCase().includes("web")
      );
    if (filter === "Python") return r.language === "Python";
    return true;
  });

  const handleCopyTree = (name: string, treeText: string) => {
    navigator.clipboard.writeText(treeText);
    setCopiedName(name);
    toast.success(`Copied ${name} project structure to clipboard`);
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <section id="github" className="py-14 border-t border-amber-400/10">
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary">
            Open Source & Repositories
          </span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
        </div>
        <h2 className="section-heading mb-1">Public GitHub Repositories</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          All public open-source projects, autonomous AI agents, and architectures with live directory trees.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {["All", "AI & Agents", "Full Stack", "Python"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-mono transition-all cursor-pointer ${
                filter === cat
                  ? "bg-primary text-obsidian-950 font-semibold shadow-[0_0_15px_rgba(229,195,120,0.3)]"
                  : "bg-white/[0.04] text-muted-foreground hover:text-foreground hover:bg-white/[0.08] border border-white/[0.06]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search repositories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-white/[0.08] bg-obsidian-900/60 pl-8 pr-4 py-1.5 text-xs font-mono text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-amber-400/50 transition-colors"
          />
        </div>
      </div>

      {/* Repositories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredRepos.map((repo) => {
          const isTreeOpen = expandedTree === repo.name;
          const treeContent =
            repo.structure ||
            trees[repo.name] ||
            `├── src/\n│   ├── index.ts\n├── README.md\n└── package.json`;

          return (
            <div
              key={repo.name}
              className="luxury-card rounded-2xl p-5 flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                {/* Header: Name, Lang, Stars */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <Github className="h-4 w-4 text-primary flex-none" />
                    <Link
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm font-semibold text-foreground hover:text-primary transition-colors truncate"
                    >
                      {repo.name}
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 flex-none text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber-400/80" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      {repo.forks}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                  {repo.description}
                </p>
              </div>

              <div>
                {/* Badges & Actions */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/[0.05] text-xs font-mono">
                  {/* Language */}
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        langColors[repo.language] || "bg-primary"
                      }`}
                    />
                    <span>{repo.language}</span>
                  </div>

                  {/* Toggle Structure & Open Repo */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setExpandedTree(isTreeOpen ? null : repo.name)
                      }
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
                        isTreeOpen
                          ? "bg-primary/20 text-primary border border-primary/40"
                          : "bg-white/[0.04] text-muted-foreground hover:text-foreground hover:bg-white/[0.08]"
                      }`}
                      title="View Project Structure"
                    >
                      <FolderTree className="h-3 w-3" />
                      <span>{isTreeOpen ? "Hide Tree" : "Project Structure"}</span>
                      <ChevronDown
                        className={`h-3 w-3 transition-transform duration-200 ${
                          isTreeOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <Link
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded text-muted-foreground hover:text-primary transition-colors"
                      title="Open on GitHub"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Expandable Project Structure Tree */}
                <AnimatePresence>
                  {isTreeOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden mt-3"
                    >
                      <div className="rounded-xl border border-amber-400/20 bg-obsidian-950/80 p-3.5 text-xs font-mono">
                        <div className="flex items-center justify-between mb-2 text-primary text-[11px] font-semibold border-b border-white/[0.06] pb-1.5">
                          <span className="flex items-center gap-1.5">
                            <FolderTree className="h-3 w-3" />
                            📁 Project Structure
                          </span>
                          <button
                            onClick={() =>
                              handleCopyTree(repo.name, treeContent)
                            }
                            className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                          >
                            {copiedName === repo.name ? (
                              <>
                                <Check className="h-2.5 w-2.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-2.5 w-2.5" />
                                <span>Copy Tree</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="max-h-56 overflow-y-auto text-[11px] leading-relaxed text-ivory/85 scrollbar-thin">
                          <code>{treeContent}</code>
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* GitHub Profile Callout */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl border border-amber-400/20 bg-gradient-to-r from-obsidian-900/90 to-obsidian-850/90 backdrop-blur-xl gap-4">
        <div>
          <h3 className="font-serif text-lg font-medium text-foreground">
            Explore All 18 Repositories on GitHub
          </h3>
          <p className="text-xs font-mono text-muted-foreground mt-0.5">
            Active repositories, stars, and code contributions updated regularly.
          </p>
        </div>

        <Link
          href="https://github.com/Subhan696"
          target="_blank"
          rel="noopener noreferrer"
        >
          <HoverBorderGradient
            as="div"
            containerClassName="rounded-full"
            className="flex items-center gap-2 text-xs font-mono font-medium py-2 px-4"
          >
            <Github className="h-4 w-4 text-primary" />
            <span>github.com/Subhan696</span>
            <ExternalLink className="h-3 w-3 text-primary" />
          </HoverBorderGradient>
        </Link>
      </div>
    </section>
  );
}
