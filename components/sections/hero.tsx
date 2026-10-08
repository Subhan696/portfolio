"use client";

import Link from "next/link";
import { ArrowRight, FileText, Sparkles, Github } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="pt-6 pb-14 sm:pb-18">
      {/* Availability Status Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/20 bg-amber-400/[0.04] text-[11px] font-mono text-muted-foreground mb-6">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-foreground/80">Available for AI Engineering & Full-Stack Roles</span>
      </div>

      {/* Role label */}
      <p className="mb-3 font-mono text-xs sm:text-sm text-primary tracking-wide uppercase">
        {siteConfig.title}
      </p>

      {/* Main luxury editorial headline */}
      <h1 className="font-serif text-[2.2rem] sm:text-[2.85rem] lg:text-[3.25rem] font-medium leading-[1.1] tracking-tight text-foreground mb-6 text-balance">
        Building intelligent systems for{" "}
        <span className="gold-gradient-text italic font-normal">
          language
        </span>
        , autonomous agents, and the web.
      </h1>

      {/* Bio */}
      <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-xl text-pretty mb-8">
        I architect and ship production AI systems — multi-tenant WhatsApp sales agents with LangGraph, real-time Voice AI coaches, Retrieval-Augmented Generation (RAG) platforms, and scalable full-stack web software with clean architecture and thoughtful user experiences.
      </p>

      {/* Call to Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={() => scrollTo("projects")}>
          <HoverBorderGradient
            as="div"
            containerClassName="rounded-full shadow-[0_0_25px_rgba(229,195,120,0.18)]"
            className="flex items-center gap-2 text-xs font-mono font-medium py-2 px-4.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Featured Projects</span>
            <ArrowRight className="h-3.5 w-3.5 text-primary" />
          </HoverBorderGradient>
        </button>

        <button
          onClick={() => scrollTo("resume")}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-mono text-foreground hover:bg-white/[0.06] hover:border-amber-400/30 transition-all cursor-pointer"
        >
          <FileText className="h-3.5 w-3.5 text-primary" />
          <span>Career & Resume</span>
        </button>

        <button
          onClick={() => scrollTo("github")}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-mono text-foreground hover:bg-white/[0.06] hover:border-amber-400/30 transition-all cursor-pointer"
        >
          <Github className="h-3.5 w-3.5 text-primary" />
          <span>GitHub Repos</span>
        </button>
      </div>
    </section>
  );
}
