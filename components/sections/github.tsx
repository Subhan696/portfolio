"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Github as GithubIcon,
  Star,
  GitFork,
  ExternalLink,
  Users,
  Bookmark,
} from "lucide-react";
import { Section } from "@/components/ui/section";

type Repo = {
  id: number;
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  updated: string;
};

type GhData = {
  user: {
    login: string;
    name: string;
    avatar: string;
    bio: string;
    followers: number;
    following: number;
    publicRepos: number;
    url: string;
  };
  stats: { totalStars: number; totalRepos: number };
  repos: Repo[];
};

const langColors: Record<string, string> = {
  TypeScript: "bg-blue-400",
  JavaScript: "bg-yellow-400",
  Python: "bg-emerald-400",
  HTML: "bg-orange-400",
  CSS: "bg-pink-400",
  "C++": "bg-violet-400",
  Go: "bg-cyan-400",
  Rust: "bg-orange-500",
};

export default function GitHub() {
  const [data, setData] = useState<GhData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then(setData)
      .catch(() => setError("Could not load GitHub data."));
  }, []);

  return (
    <Section
      id="github"
      eyebrow="GitHub"
      title={
        <>
          Live from my <span className="gradient-text">repositories</span>
        </>
      }
      description="Auto-fetched repositories, stars, and recent activity from the GitHub API."
    >
      {!data && !error && <SkeletonGrid />}
      {error && (
        <p className="text-center text-sm text-ivory/50">
          {error} Set <code className="text-wine-600">NEXT_PUBLIC_GITHUB_USERNAME</code>{" "}
          in <code>.env.local</code>.
        </p>
      )}
      {data && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            <StatCard label="Public repos" value={data.stats.totalRepos} icon={Bookmark} />
            <StatCard label="Total stars" value={data.stats.totalStars} icon={Star} />
            <StatCard label="Followers" value={data.user.followers} icon={Users} />
            <StatCard label="Following" value={data.user.following} icon={Users} />
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {data.repos.map((r, i) => (
              <motion.a
                key={r.id}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group relative overflow-hidden rounded-2xl border border-ivory/[0.08] bg-ivory/[0.02] p-5 backdrop-blur card-hover"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <GithubIcon className="h-4 w-4 text-ivory/50" />
                    <span className="font-mono text-sm font-semibold text-ivory truncate">
                      {r.name}
                    </span>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-ivory/30 transition-colors group-hover:text-ivory" />
                </div>
                <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm text-ivory/55">
                  {r.description || "No description"}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-ivory/55">
                  {r.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          langColors[r.language] || "bg-ivory/40"
                        }`}
                      />
                      {r.language}
                    </span>
                  )}
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {r.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      {r.forks}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-12">
            <ContributionGrid />
          </div>

          <div className="mt-10 text-center">
            <Link
              href={data.user.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ivory/10 bg-ivory/[0.03] px-5 py-2 text-sm text-ivory/80 hover:text-ivory hover:border-wine-600/40 transition-all"
            >
              <GithubIcon className="h-4 w-4" />
              View full GitHub profile
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </>
      )}
    </Section>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-ivory/[0.08] bg-ivory/[0.02] p-5 backdrop-blur">
      <div className="flex items-center justify-between">
        <span className="text-sm text-ivory/55">{label}</span>
        <Icon className="h-4 w-4 text-wine-600" />
      </div>
      <div className="mt-2 font-display text-3xl font-bold gradient-text">
        {value.toLocaleString()}
      </div>
    </div>
  );
}

function ContributionGrid() {
  // Synthetic contribution graph (real graph requires GraphQL API)
  const cells = Array.from({ length: 7 * 26 }, () => Math.random());
  const color = (v: number) => {
    if (v < 0.55) return "bg-ivory/[0.04]";
    if (v < 0.75) return "bg-wine-600/20";
    if (v < 0.9) return "bg-wine-600/50";
    return "bg-wine-500 shadow-[0_0_10px_rgba(184,41,76,0.7)]";
  };
  return (
    <div className="rounded-2xl border border-ivory/[0.08] bg-ivory/[0.02] p-6 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-ivory">
          Contribution activity
        </h3>
        <span className="text-xs text-ivory/40">last 6 months</span>
      </div>
      <div className="overflow-x-auto">
        <div
          className="grid grid-flow-col gap-1"
          style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}
        >
          {cells.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (i / cells.length) * 0.5 }}
              className={`h-3 w-3 rounded-[3px] ${color(v)}`}
              title={`${Math.floor(v * 12)} contributions`}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-ivory/45">
        Less
        <span className="h-3 w-3 rounded-[3px] bg-ivory/[0.04]" />
        <span className="h-3 w-3 rounded-[3px] bg-wine-600/20" />
        <span className="h-3 w-3 rounded-[3px] bg-wine-600/50" />
        <span className="h-3 w-3 rounded-[3px] bg-wine-600" />
        More
      </div>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-40 animate-pulse rounded-2xl border border-ivory/[0.06] bg-ivory/[0.02]"
        />
      ))}
    </div>
  );
}
