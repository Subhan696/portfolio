"use client";

import { motion } from "framer-motion";
import { Bot, Mic, FileCode2, Cpu, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { audioEngine } from "@/lib/audio-engine";

const capabilities = [
  {
    num: "01",
    icon: Bot,
    title: "Autonomous AI Agents",
    subtitle: "Conversational & Commerce Workflows",
    description:
      "Stateful multi-agent systems with LangGraph, PostgreSQL persistence, and Meta WhatsApp Cloud API integration that qualify leads, manage carts, and execute sales 24/7.",
    tags: ["LangGraph", "FastAPI", "Meta WhatsApp API", "Multi-Tenant", "PostgreSQL"],
    gradient: "from-cyber-magenta/20 via-transparent to-transparent",
    accent: "text-cyber-magenta border-cyber-magenta/40",
  },
  {
    num: "02",
    icon: Mic,
    title: "Voice AI & Multimodal Models",
    subtitle: "Low-Latency Audio & Vision Pipelines",
    description:
      "Ultra-low latency conversational Voice AI agents built with Vapi and Gemini AI for interactive fitness training, live coaching, and dynamic program synthesis.",
    tags: ["Vapi Voice AI", "Gemini 2.0", "Convex DB", "Clerk Auth", "Realtime WebSockets"],
    gradient: "from-cyber-violet/20 via-transparent to-transparent",
    accent: "text-cyber-violet border-cyber-violet/40",
  },
  {
    num: "03",
    icon: FileCode2,
    title: "Intelligent NLP Systems",
    subtitle: "Automated Evaluation & Document AI",
    description:
      "Context-aware NLP evaluation engines like GradeWave that process student submissions, generate granular semantic feedback, and automate grading workflows.",
    tags: ["NLP", "Python", "FastAPI", "Redux Toolkit", "PostgreSQL"],
    gradient: "from-cyber-magenta/20 via-transparent to-transparent",
    accent: "text-cyber-magenta border-cyber-magenta/40",
  },
  {
    num: "04",
    icon: Cpu,
    title: "High-Performance Full-Stack",
    subtitle: "Scalable Next.js 15 & Cloud Architectures",
    description:
      "Production web applications built with Next.js 15 App Router, React 19, TypeScript, and modern design systems engineered for speed, SEO, and visual polish.",
    tags: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Docker"],
    gradient: "from-cyber-violet/20 via-transparent to-transparent",
    accent: "text-cyber-violet border-cyber-violet/40",
  },
];

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      eyebrow="Core Competencies"
      title={
        <>
          What I <span className="gradient-text">engineer & ship</span>
        </>
      }
      description="Tailored AI architectures, intelligent agents, and modern full-stack systems built for performance."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {capabilities.map((cap, i) => {
          const Icon = cap.icon;
          return (
            <motion.div
              key={cap.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => audioEngine.playHoverSound()}
              className="group relative overflow-hidden rounded-2xl border border-ivory/10 bg-[#08080E]/70 p-8 backdrop-blur-xl transition-all duration-500 hover:border-cyber-magenta/40 hover:shadow-[0_0_35px_rgba(255,0,127,0.2)]"
            >
              {/* Corner HUD Brackets */}
              <div className="hud-bracket-tl opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="hud-bracket-tr opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="hud-bracket-bl opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="hud-bracket-br opacity-0 transition-opacity group-hover:opacity-100" />

              {/* Ambient Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cap.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none`}
              />

              {/* Top Row: Number & Icon */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-2xl font-bold text-cyber-magenta">
                  {cap.num}
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-ivory/10 bg-ivory/[0.03] transition-transform duration-300 group-hover:scale-110 group-hover:border-cyber-magenta/50">
                  <Icon className="h-5 w-5 text-ivory group-hover:text-cyber-magenta transition-colors" />
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="relative z-10 mt-6">
                <h3 className="font-display text-2xl font-bold text-ivory group-hover:gradient-text transition-all">
                  {cap.title}
                </h3>
                <p className="mt-1 text-xs font-mono uppercase tracking-widest text-cyber-magenta/80">
                  {cap.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ivory/70">
                  {cap.description}
                </p>
              </div>

              {/* Tags */}
              <div className="relative z-10 mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-ivory/[0.06]">
                {cap.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-ivory/10 bg-ivory/[0.02] px-2.5 py-1 font-mono text-[11px] text-ivory/60 transition-colors group-hover:border-cyber-magenta/20 group-hover:text-ivory/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
