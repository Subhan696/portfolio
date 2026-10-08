/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillGroups } from "@/data/skills";
import { X, Sparkles } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const techIcons = [
  { name: "Python", slug: "python" },
  { name: "FastAPI", slug: "fastapi" },
  { name: "LangChain", slug: "langchain" },
  { name: "OpenAI", slug: "openai" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "React", slug: "react" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Docker", slug: "docker" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Redis", slug: "redis" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Git", slug: "git" },
];

export default function TechMarquee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const items = [...techIcons, ...techIcons];

  return (
    <section id="tech-stack" className="py-12 border-t border-amber-400/10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary">
              Core Technologies
            </span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          </div>
          <h2 className="section-heading mb-0">Tech Stack</h2>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        >
          View Full Stack
        </button>
      </div>

      {/* Marquee Banner */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee gap-10 py-3">
          {items.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.06] bg-obsidian-900/60 backdrop-blur-sm hover:border-amber-400/40 hover:bg-obsidian-850 transition-all duration-300 group select-none"
            >
              <img
                src={`https://cdn.simpleicons.org/${tech.slug}`}
                alt={tech.name}
                className="h-4 w-4 object-contain brightness-0 invert opacity-70 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <span className="font-mono text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Full Stack Modal Dialog */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full max-w-xl max-h-[80vh] overflow-y-auto rounded-2xl border border-amber-400/25 bg-obsidian-900 p-6 sm:p-8 shadow-2xl scrollbar-thin"
            >
              <div className="flex items-start justify-between border-b border-white/[0.08] pb-4 mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-foreground">
                    Complete Technology Stack
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground mt-1">
                    Specialized frameworks, databases, and LLM tooling
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                {skillGroups.map((group) => (
                  <div key={group.category}>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-primary mb-1.5">
                      {group.category}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      {group.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((s) => (
                        <HoverBorderGradient
                          key={s.name}
                          as="span"
                          containerClassName="rounded-full"
                          className="px-2.5 py-0.5 text-[11px] font-mono"
                          duration={1.5}
                        >
                          {s.name}
                        </HoverBorderGradient>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
