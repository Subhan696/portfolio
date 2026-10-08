"use client";

import GithubContributions from "@/components/sections/github-contributions";
import GithubRepos from "@/components/sections/github-repos";
import { GitBranch, Sparkles } from "lucide-react";

export default function GitHubSection() {
  return (
    <section id="github" className="py-16 sm:py-20 border-t border-white/[0.08]">
      {/* Eyebrow and Headline */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-sky-400">
              Open Source & Code
            </span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            GitHub Chart & Repositories
          </h2>
          <p className="text-sm text-white/60 max-w-xl mt-2 leading-relaxed">
            Directly from Subhan&apos;s GitHub. Inspect live contributions, explore all 18 public repositories, and view full project file trees and README documentation.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-white/50 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          <GitBranch className="h-3.5 w-3.5 text-sky-400" />
          <span>18 Public Repositories</span>
        </div>
      </div>

      {/* 1. Contribution Heatmap */}
      <GithubContributions />

      {/* 2. All Public Repositories Explorer */}
      <GithubRepos />
    </section>
  );
}
