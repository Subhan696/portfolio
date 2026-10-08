"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github, Sparkles, CheckCircle2, Layers } from "lucide-react";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-20 border-t border-white/[0.08]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-sky-400">
              Featured Engineering
            </span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Flagship Projects
          </h2>
          <p className="text-sm text-white/60 max-w-xl mt-2 leading-relaxed">
            Full-stack AI architectures, multi-tenant conversational agents, real-time voice systems, and offline-first desktop tools.
          </p>
        </div>

        <a
          href="#github"
          className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>View all 18 repositories below ↓</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, idx) => (
          <motion.article
            key={p.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-white/[0.08] bg-[#0A0D15]/80 hover:bg-[#0E1320] hover:border-sky-400/30 backdrop-blur-md transition-all shadow-lg"
          >
            <div>
              {/* Header: Period & Links */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono text-sky-400 font-medium">
                  {p.period}
                </span>

                <div className="flex items-center gap-2">
                  {p.github && (
                    <Link
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.title} on GitHub`}
                      className="p-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors"
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
                      className="p-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold font-mono text-white group-hover:text-sky-300 transition-colors mb-2">
                {p.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-white/65 leading-relaxed mb-4">
                {p.description}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 mb-5">
                {p.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-white/75">
                    <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech tags */}
            <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5 mt-auto">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/[0.04] border border-white/10 text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
