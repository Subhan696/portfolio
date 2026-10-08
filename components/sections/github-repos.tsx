"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Star,
  GitFork,
  ExternalLink,
  Search,
  FolderTree,
  FileText,
  Filter,
  Sparkles,
  Code2,
} from "lucide-react";
import { RepoModal } from "@/components/sections/repo-modal";

export type RepoItem = {
  id: number;
  name: string;
  fullName: string;
  url: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updated: string;
  hasTree?: boolean;
};

const langColors: Record<string, string> = {
  Python: "bg-emerald-400",
  TypeScript: "bg-sky-400",
  JavaScript: "bg-amber-400",
  HTML: "bg-orange-400",
  "HTML / JS": "bg-orange-400",
  "Jupyter Notebook": "bg-purple-400",
  Java: "bg-red-400",
  "C++": "bg-indigo-400",
};

export default function GithubRepos() {
  const [repos, setRepos] = useState<RepoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedLang, setSelectedLang] = useState<string>("All");
  const [selectedRepo, setSelectedRepo] = useState<RepoItem | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (data.repos && Array.isArray(data.repos)) {
          setRepos(data.repos);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const languages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((r) => {
      if (r.language) set.add(r.language);
    });
    return ["All", ...Array.from(set)];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    return repos.filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.description?.toLowerCase().includes(search.toLowerCase()) ||
        r.language?.toLowerCase().includes(search.toLowerCase());

      const matchesLang =
        selectedLang === "All" || r.language === selectedLang;

      return matchesSearch && matchesLang;
    });
  }, [repos, search, selectedLang]);

  return (
    <div className="mt-8 space-y-6">
      {/* Controls: Search Bar & Language Filter Chips */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search all 18 repositories by name, stack, or feature..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-[#0C1017] text-white text-xs sm:text-sm placeholder:text-white/40 focus:outline-none focus:border-sky-400/50 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {languages.map((lang) => {
            const active = selectedLang === lang;
            return (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap ${
                  active
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                    : "bg-white/[0.03] text-white/60 hover:text-white border border-white/[0.06] hover:bg-white/[0.06]"
                }`}
              >
                {lang}
              </button>
            );
          })}
        </div>
      </div>

      {/* Repos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        <AnimatePresence>
          {filteredRepos.map((repo, idx) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.3) }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              onClick={() => setSelectedRepo(repo)}
              className="group relative flex flex-col justify-between p-5 rounded-2xl border border-white/[0.08] bg-[#0A0E17]/80 hover:bg-[#0E1422] hover:border-sky-400/35 backdrop-blur-md shadow-lg transition-all cursor-pointer"
            >
              {/* Top Row: Repo Title + Star/Fork + External */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <Github className="h-4 w-4 text-sky-400 flex-shrink-0" />
                    <h3 className="text-sm font-bold font-mono text-white group-hover:text-sky-300 transition-colors truncate">
                      {repo.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="flex items-center gap-1 text-[11px] font-mono text-white/50">
                      <Star className="h-3 w-3 text-amber-300" />
                      {repo.stars}
                    </span>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 rounded-md text-white/30 hover:text-white hover:bg-white/[0.08] transition-colors"
                      title="Open on GitHub"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-white/65 leading-relaxed line-clamp-3 mb-4">
                  {repo.description}
                </p>
              </div>

              {/* Bottom Row: Language + Action Pill */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-mono text-white/60">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      langColors[repo.language] || "bg-sky-400"
                    }`}
                  />
                  <span>{repo.language}</span>
                </div>

                <div className="flex items-center gap-1.5 text-sky-400 group-hover:text-sky-300 font-mono text-[11px] font-medium">
                  <FolderTree className="h-3 w-3" />
                  <span>Inspect Code & Tree →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredRepos.length === 0 && !loading && (
        <div className="py-16 text-center rounded-2xl border border-white/[0.08] bg-white/[0.02]">
          <Code2 className="h-8 w-8 text-white/30 mx-auto mb-2" />
          <p className="text-sm text-white/70">No repositories found matching &ldquo;{search}&rdquo;.</p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedLang("All");
            }}
            className="mt-3 text-xs text-sky-400 hover:underline font-mono"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Repo Detail Modal */}
      {selectedRepo && (
        <RepoModal
          repoName={selectedRepo.name}
          isOpen={!!selectedRepo}
          onClose={() => setSelectedRepo(null)}
          stars={selectedRepo.stars}
          forks={selectedRepo.forks}
          language={selectedRepo.language}
          description={selectedRepo.description}
          url={selectedRepo.url}
        />
      )}
    </div>
  );
}
