"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Bot,
  Eye,
  Layers,
  Network,
  Sparkles,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import AnimatedCounter from "@/components/animated-counter";

const focusAreas = [
  {
    icon: Bot,
    title: "RAG Chatbots",
    description:
      "Retrieval-augmented systems with vector search, grounded reasoning, and clean conversational UX.",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description:
      "Object detection, tracking, stereo vision, and depth estimation — from prototype to production.",
  },
  {
    icon: Layers,
    title: "Full Stack Apps",
    description:
      "Next.js + Node.js apps with secure auth, real-time UI, and scalable APIs.",
  },
  {
    icon: Network,
    title: "Parallel Programming",
    description:
      "High-performance computation with Cilk, multi-threading, and benchmarked scaling.",
  },
  {
    icon: Brain,
    title: "AI-Powered Systems",
    description:
      "Transformers, ViTs, GANs — and the glue code that makes them useful.",
  },
  {
    icon: Sparkles,
    title: "Premium Interfaces",
    description:
      "Glassmorphism, fluid motion, accessible interactions — the front end models deserve.",
  },
];

const stats = [
  { label: "Projects shipped", value: 25, suffix: "+" },
  { label: "Models trained", value: 40, suffix: "+" },
  { label: "GitHub commits", value: 1200, suffix: "+" },
  { label: "Coffee consumed", value: 9999, suffix: "+" },
];

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          Engineer obsessed with{" "}
          <span className="gradient-text">intelligence & craft</span>
        </>
      }
      description="I sit at the intersection of AI research and shipping software. I love clean code, clean models, and clean interfaces — and the work it takes to make all three coexist."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-ivory/[0.08] bg-ivory/[0.02] p-6 backdrop-blur-xl sm:p-8 lg:col-span-1"
        >
          <div className="pointer-events-none absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-wine-600/10 blur-3xl" />
          <div className="relative">
            <p className="text-sm uppercase tracking-widest text-wine-600/80">
              Bio
            </p>
            <p className="mt-3 text-lg leading-relaxed text-ivory/85">
              I'm a Computer Science student and AI engineer building
              production-grade systems with deep learning, computer vision,
              and modern web stacks.
            </p>
            <p className="mt-4 leading-relaxed text-ivory/65">
              My current obsessions: retrieval-augmented generation,
              real-time vision pipelines, and shipping AI features that don't
              feel like demos. I care about latency, evaluation, and
              user-facing polish — not just notebooks.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-ivory/[0.06] bg-ivory/[0.02] p-4"
                >
                  <div className="font-display text-2xl font-bold gradient-text">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-xs text-ivory/55">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {focusAreas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-ivory/[0.08] bg-ivory/[0.02] p-6 backdrop-blur transition-all hover:border-wine-600/30 hover:bg-ivory/[0.04]"
            >
              <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-wine-600/10 via-transparent to-wine-300/10" />
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-ivory/10 bg-ivory/[0.04] text-wine-600 transition-all group-hover:bg-wine-600/10 group-hover:text-ivory">
                <area.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-ivory">
                {area.title}
              </h3>
              <p className="mt-2 text-sm text-ivory/60">{area.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
