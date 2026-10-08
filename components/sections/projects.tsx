"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Github, ChevronDown } from "lucide-react";
import { projects } from "@/data/projects";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section id="projects" className="py-14 border-t border-amber-400/10">
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary">
            Selected Work
          </span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
        </div>
        <h2 className="section-heading mb-1">Featured Projects</h2>
        <p className="text-sm text-muted-foreground max-w-lg">
          Production AI systems, intelligent agent architectures, and full-stack software.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {visibleProjects.map((p) => (
          <article
            key={p.slug}
            className="luxury-card rounded-2xl p-6 flex flex-col justify-between group transition-all duration-300"
          >
            <div>
              {/* Header: Title + Links */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-semibold text-foreground text-base tracking-tight group-hover:text-primary transition-colors leading-snug">
                  {p.title}
                </h3>
                <div className="flex items-center gap-2 flex-none mt-0.5">
                  {p.github && (
                    <Link
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.title} on GitHub`}
                      className="p-1 rounded text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </Link>
                  )}
                  {p.demo && (
                    <Link
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.title} live demo`}
                      className="p-1 rounded text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3 mb-4">
                {p.description || p.summary}
              </p>
            </div>

            {/* Tech pills using HoverBorderGradient / luxury style */}
            <div className="mt-2.5 flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.05]">
              {p.tech.slice(0, 5).map((t) => (
                <HoverBorderGradient
                  key={t}
                  as="span"
                  containerClassName="rounded-full"
                  className="px-2.5 py-0.5 text-[10px] font-mono"
                  duration={1.5}
                >
                  {t}
                </HoverBorderGradient>
              ))}
            </div>
          </article>
        ))}
      </div>

      {projects.length > 4 && (
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-mono font-medium text-muted-foreground hover:text-primary transition-colors tracking-widest uppercase inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>{showAll ? "Show less" : "Show all projects"}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                showAll ? "rotate-180" : ""
              }`}
            />
          </button>

          <Link
            href="#github"
            className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
          >
            Browse All Repositories ↓
          </Link>
        </div>
      )}
    </section>
  );
}
