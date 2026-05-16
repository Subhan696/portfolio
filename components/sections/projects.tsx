"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Sparkles } from "lucide-react";
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
      eyebrow="Selected Work"
      title={
        <>
          Projects that <span className="gradient-text">shipped</span>
        </>
      }
      description="A curated selection — AI systems, computer vision, and full-stack apps."
    >
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-all",
              filter === cat
                ? "border-wine-500/60 bg-wine-600/15 text-ivory shadow-[0_0_25px_-5px_rgba(155,29,62,0.55)]"
                : "border-ivory/10 bg-ivory/[0.02] text-ivory/60 hover:text-ivory hover:bg-ivory/[0.05]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.article
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-ivory/[0.08] bg-ivory/[0.02] backdrop-blur-xl card-hover"
            >
              <button
                onClick={() => setActive(p)}
                className="block w-full text-left"
                aria-label={`Preview ${p.title}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  {p.featured && (
                    <Badge variant="accent" className="absolute left-3 top-3">
                      <Sparkles className="mr-1 h-3 w-3" /> Featured
                    </Badge>
                  )}
                  <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/10 backdrop-blur opacity-0 transition-all group-hover:opacity-100 group-hover:bg-wine-600">
                    <ArrowUpRight className="h-4 w-4 text-ivory" />
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap gap-1.5">
                    {p.category.map((c) => (
                      <Badge key={c} variant="outline">
                        {c}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ivory group-hover:gradient-text transition-all">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ivory/60">
                    {p.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-ivory/10 bg-ivory/[0.03] px-2 py-0.5 font-mono text-[10px] text-ivory/70"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 4 && (
                      <span className="rounded-md px-2 py-0.5 font-mono text-[10px] text-ivory/40">
                        +{p.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </button>

              <div className="flex items-center gap-2 border-t border-ivory/[0.06] px-5 py-3">
                {p.github && (
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="h-8 text-xs"
                  >
                    <Link
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-3.5 w-3.5" /> Code
                    </Link>
                  </Button>
                )}
                {p.demo && (
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="h-8 text-xs"
                  >
                    <Link href={p.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3.5 w-3.5" /> Live
                    </Link>
                  </Button>
                )}
                <button
                  onClick={() => setActive(p)}
                  className="ml-auto text-xs text-ivory/50 hover:text-ivory"
                >
                  Details →
                </button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent>
          {active && (
            <>
              <div className="relative -mx-6 -mt-6 mb-2 h-60 overflow-hidden rounded-t-2xl">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c12] via-transparent" />
              </div>
              <DialogHeader>
                <DialogTitle>{active.title}</DialogTitle>
                <DialogDescription>{active.summary}</DialogDescription>
              </DialogHeader>
              <p className="text-sm leading-relaxed text-ivory/75">
                {active.description}
              </p>
              <div>
                <p className="text-xs uppercase tracking-widest text-ivory/40">
                  Highlights
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-ivory/80">
                  {active.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-wine-600" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-ivory/40">
                  Tech Stack
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {active.tech.map((t) => (
                    <Badge key={t} variant="accent">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {active.github && (
                  <Button asChild variant="outline" size="sm">
                    <Link
                      href={active.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" /> View Code
                    </Link>
                  </Button>
                )}
                {active.demo && (
                  <Button asChild variant="accent" size="sm">
                    <Link
                      href={active.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" /> Live Demo
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
