/* eslint-disable @next/next/no-img-element */
"use client";

import { ExternalLink, ArrowUpRight } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export interface LiveBuildItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  imageUrl: string;
  badge: string;
  technologies: string[];
}

export const liveBuilds: LiveBuildItem[] = [
  {
    id: "helio",
    title: "Helio Commerce",
    subtitle: "WhatsApp AI Sales Agent & CRM",
    description:
      "Enterprise autonomous AI sales agent operating on WhatsApp Cloud API. Synchronizes real-time product catalogs, conducts automated conversational checkouts in English & Urdu, and powers a multi-tenant CRM overview dashboard.",
    url: "https://www.helio.software/admin#overview",
    imageUrl: "/live-builds/helio.png",
    badge: "Production App",
    technologies: ["WhatsApp Cloud API", "LangGraph", "FastAPI", "React", "PostgreSQL", "Docker"],
  },
  {
    id: "gradewave",
    title: "GradeWave",
    subtitle: "AI-Assisted Grading & Classroom Simulator",
    description:
      "Modern end-to-end educational platform for automated document-grounded quiz creation, multi-modal student answer grading, real-time feedback generation, and comprehensive classroom analytics.",
    url: "https://gradewave.vercel.app/",
    imageUrl: "/live-builds/gradewave.png",
    badge: "Live Web App",
    technologies: ["FastAPI", "React", "Expo React Native", "RAG", "Celery", "Redis"],
  },
  {
    id: "shredmentor",
    title: "ShredMentor",
    subtitle: "AI Fitness Trainer & Voice Assistant",
    description:
      "Interactive voice-first fitness and nutrition coach. Features conversational voice interaction with ultra-low latency, custom diet plan formulation, and generative workout routines tailored to individual biometric goals.",
    url: "https://ai-fitness-trainer-woad.vercel.app/",
    imageUrl: "/live-builds/ai-fitness-trainer.png",
    badge: "Live Web App",
    technologies: ["Next.js 15", "Vapi Voice AI", "Gemini LLM", "TypeScript", "Convex DB"],
  },
];

export function LiveBuilds() {
  return (
    <div className="space-y-8">
      {liveBuilds.map((item) => (
        <article
          key={item.id}
          className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-700 hover:shadow-2xl hover:shadow-zinc-900/50"
        >
          {/* Main page UI Image preview */}
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative aspect-[16/10] w-full overflow-hidden border-b border-zinc-200/60 dark:border-zinc-800/80 bg-zinc-950"
          >
            <img
              src={item.imageUrl}
              alt={`${item.title} UI Preview`}
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
            
            {/* Ambient vignette and overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

            {/* Live Status Badge */}
            <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-black/75 px-3 py-1 text-[11px] font-mono text-emerald-400 shadow-lg backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>{item.badge}</span>
            </div>

            {/* Launch link chip */}
            <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-[11px] font-mono text-zinc-300 shadow-lg backdrop-blur-md group-hover:border-white/40 group-hover:text-white transition-all">
              <span>Visit</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>

          {/* Project Details Content */}
          <div className="p-5 sm:p-6">
            <div className="mb-2 flex items-start justify-between gap-4">
              <div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xl font-semibold tracking-tight hover:underline underline-offset-4 decoration-zinc-400"
                >
                  <span>{item.title}</span>
                  <ExternalLink className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>
                <p className="mt-0.5 font-mono text-xs text-zinc-400 dark:text-zinc-500">
                  {item.subtitle}
                </p>
              </div>
            </div>

            <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {item.description}
            </p>

            {/* Technologies */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {item.technologies.map((tech) => (
                <HoverBorderGradient
                  key={tech}
                  as="span"
                  containerClassName="rounded-full"
                  className="px-2.5 py-0.5 text-[10px] font-mono"
                  duration={1.5}
                >
                  {tech}
                </HoverBorderGradient>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
