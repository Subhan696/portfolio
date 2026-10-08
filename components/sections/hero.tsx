"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  GitBranch,
  Terminal,
  Cpu,
} from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function Hero() {
  return (
    <section id="hero" className="pt-12 pb-16 sm:pt-16 sm:pb-20 relative">
      {/* Status Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-400/25 bg-sky-500/10 mb-6"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-xs font-mono font-medium text-sky-300">
          AI Engineer &amp; Full-Stack Developer • Available for Opportunities
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 font-display"
      >
        Building autonomous{" "}
        <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
          AI agents
        </span>
        , RAG systems &amp; modern web platforms.
      </motion.h1>

      {/* Bio / Professional Summary */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed mb-8"
      >
        Hi, I&apos;m <span className="text-white font-semibold">Subhan Kashif</span>. I ship production-grade AI applications end-to-end — from multi-turn LangGraph sales agents and Pinecone RAG pipelines to responsive full-stack architectures in React, Next.js, FastAPI, and Node.js.
      </motion.p>

      {/* Quick Action CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap items-center gap-3.5 mb-10"
      >
        <a
          href="#github"
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-mono text-xs sm:text-sm font-semibold shadow-[0_0_25px_rgba(56,189,248,0.35)] transition-all"
        >
          <GitBranch className="h-4 w-4" />
          <span>Explore Public Repos &amp; Chart</span>
        </a>

        <a
          href={siteConfig.resume}
          download="Subhan_Kashif_Resume.pdf"
          className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25 text-white font-mono text-xs sm:text-sm font-medium transition-all"
        >
          <Download className="h-4 w-4 text-sky-400" />
          <span>Download Resume</span>
        </a>

        <a
          href="#contact"
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/60 hover:text-white font-mono text-xs sm:text-sm transition-colors"
        >
          <span>Get in touch →</span>
        </a>
      </motion.div>

      {/* Metric Cards Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-white/[0.08]"
      >
        <div className="p-3.5 rounded-xl border border-white/[0.06] bg-[#0A0D15]/60">
          <span className="text-xl sm:text-2xl font-bold font-mono text-sky-300 block">
            18
          </span>
          <span className="text-xs text-white/50 font-mono">Public GitHub Repos</span>
        </div>

        <div className="p-3.5 rounded-xl border border-white/[0.06] bg-[#0A0D15]/60">
          <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 block">
            247+
          </span>
          <span className="text-xs text-white/50 font-mono">Commits in 2025–26</span>
        </div>

        <div className="p-3.5 rounded-xl border border-white/[0.06] bg-[#0A0D15]/60">
          <span className="text-xl sm:text-2xl font-bold font-mono text-indigo-400 block">
            Production
          </span>
          <span className="text-xs text-white/50 font-mono">LLM &amp; RAG Systems</span>
        </div>

        <div className="p-3.5 rounded-xl border border-white/[0.06] bg-[#0A0D15]/60">
          <span className="text-xl sm:text-2xl font-bold font-mono text-amber-300 block">
            COMSATS
          </span>
          <span className="text-xs text-white/50 font-mono">B.S. Computer Science</span>
        </div>
      </motion.div>
    </section>
  );
}
