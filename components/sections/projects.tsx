"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Sparkles, Radio, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  projects,
  projectCategories,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { audioEngine } from "@/lib/audio-engine";
import { cn } from "@/lib/utils";

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const [active, setActive] = useState<Project | null>(null);

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category.includes(filter as ProjectCategory)),
    [filter]
  );

  return (
    <Section
      id="projects"
      eyebrow="Live Deployments"
      title={
        <>
          Production <span className="gradient-text">Systems & Builds</span>
        </>
      }
      description="Live autonomous agents, Voice AI models, and NLP assessment engines currently in production."
    >
      {/* Filter Tabs */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              audioEngine.playClickSound();
              setFilter(cat);
            }}
            onMouseEnter={() => audioEngine.playHoverSound()}
            className={cn(
              "rounded-full border px-5 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-300",
              filter === cat
                ? "border-cyber-magenta bg-cyber-magenta/20 text-ivory shadow-[0_0_25px_rgba(255,0,127,0.45)]"
                : "border-ivory/10 bg-ivory/[0.02] text-ivory/60 hover:text-ivory hover:border-ivory/25"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Editorial Numbered Project List */}
      <div className="space-y-10">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => {
            const indexNumber = `0${i + 1}`;
            return (
              <motion.article
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onMouseEnter={() => audioEngine.playHoverSound()}
                className="group relative overflow-hidden rounded-3xl border border-ivory/10 bg-[#08080e]/85 backdrop-blur-2xl transition-all duration-500 hover:border-cyber-magenta/50 hover:shadow-[0_0_45px_rgba(255,0,127,0.25)]"
              >
                {/* Corner HUD Brackets */}
                <div className="hud-bracket-tl" />
                <div className="hud-bracket-tr" />
                <div className="hud-bracket-bl" />
                <div className="hud-bracket-br" />

                <div className="grid gap-8 lg:grid-cols-12 items-center p-6 sm:p-10">
                  {/* Left Column: Image Preview with Cyber Frame */}
                  <div className="lg:col-span-6">
                    <div
                      onClick={() => {
                        audioEngine.playClickSound();
                        setActive(p);
                      }}
                      className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl border border-ivory/15 bg-black cursor-pointer group/img"
                    >
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover/img:scale-105 opacity-90 group-hover/img:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08080e] via-transparent to-transparent" />

                      {/* Live Radar Pill */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-cyber-magenta/40 bg-black/70 px-3 py-1 text-[11px] font-mono text-cyber-magenta backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-cyber-magenta animate-ping" />
                        <span>LIVE DEPLOYMENT</span>
                      </div>

                      {/* Click to Preview Overlay */}
                      <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-cyber-magenta text-white opacity-0 group-hover/img:opacity-100 shadow-[0_0_20px_rgba(255,0,127,0.6)] transition-all duration-300">
                        <ArrowUpRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Metadata, Highlights & Actions */}
                  <div className="lg:col-span-6 flex flex-col justify-between">
                    <div>
                      {/* Top Telemetry Header */}
                      <div className="flex items-center justify-between text-xs font-mono text-ivory/40">
                        <span className="text-2xl font-bold font-mono text-cyber-magenta">
                          {indexNumber}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full border border-ivory/15 px-2.5 py-0.5 text-[10px] text-ivory/70">
                            RELEASE // 2026
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => {
                          audioEngine.playClickSound();
                          setActive(p);
                        }}
                        className="mt-3 font-display text-2xl sm:text-3xl font-bold text-ivory group-hover:gradient-text transition-all cursor-pointer"
                      >
                        {p.title}
                      </h3>

                      {/* Summary */}
                      <p className="mt-3 text-sm leading-relaxed text-ivory/70">
                        {p.description}
                      </p>

                      {/* Highlights */}
                      <ul className="mt-4 space-y-1.5 text-xs text-ivory/80 font-mono">
                        {p.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-cyber-magenta flex-none mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack Pills */}
                      <div className="mt-6 flex flex-wrap gap-1.5">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-ivory/10 bg-ivory/[0.03] px-2.5 py-1 font-mono text-[11px] text-ivory/70"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-ivory/10">
                      {p.demo && (
                        <Button
                          asChild
                          className="bg-gradient-to-r from-cyber-magenta to-cyber-violet text-white font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(255,0,127,0.5)]"
                          onMouseEnter={() => audioEngine.playHoverSound()}
                        >
                          <Link href={p.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                            View Live System
                          </Link>
                        </Button>
                      )}

                      {p.github && (
                        <Button
                          asChild
                          variant="outline"
                          className="border-ivory/20 bg-ivory/[0.02] text-ivory hover:border-cyber-magenta/50 hover:bg-cyber-magenta/10 text-xs font-mono"
                          onMouseEnter={() => audioEngine.playHoverSound()}
                        >
                          <Link href={p.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3.5 w-3.5 mr-1.5" />
                            Source Code
                          </Link>
                        </Button>
                      )}

                      <button
                        onClick={() => {
                          audioEngine.playClickSound();
                          setActive(p);
                        }}
                        onMouseEnter={() => audioEngine.playHoverSound()}
                        className="ml-auto text-xs font-mono text-ivory/50 hover:text-cyber-magenta transition-colors"
                      >
                        System Specs →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Modal Dialog for Deep Specs */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-2xl bg-[#08080e] border-cyber-magenta/30 text-ivory">
          {active && (
            <>
              <div className="relative -mx-6 -mt-6 mb-4 h-64 overflow-hidden rounded-t-2xl">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080e] via-transparent" />
              </div>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-ivory">{active.title}</DialogTitle>
                <DialogDescription className="text-ivory/60 font-mono text-xs">{active.summary}</DialogDescription>
              </DialogHeader>
              <p className="text-sm leading-relaxed text-ivory/80">
                {active.description}
              </p>
              <div>
                <p className="text-xs uppercase tracking-widest font-mono text-cyber-magenta">
                  Architecture & Highlights
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-ivory/85">
                  {active.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-cyber-magenta" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-mono text-cyber-magenta">
                  Technologies
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {active.tech.map((t) => (
                    <Badge key={t} className="bg-cyber-magenta/20 border border-cyber-magenta/40 text-ivory font-mono text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 pt-4 border-t border-ivory/10">
                {active.demo && (
                  <Button asChild className="bg-gradient-to-r from-cyber-magenta to-cyber-violet text-white font-bold text-xs">
                    <Link href={active.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1.5" />
                      Open Live Site
                    </Link>
                  </Button>
                )}
                {active.github && (
                  <Button asChild variant="outline" className="border-ivory/20 text-ivory text-xs font-mono">
                    <Link href={active.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-1.5" />
                      GitHub Repository
                    </Link>
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}
