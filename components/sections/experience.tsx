"use client";

import { motion } from "framer-motion";
import { Briefcase, Code2, FlaskConical } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { experiences, type Experience } from "@/data/experience";

const typeIcons: Record<Experience["type"], React.ComponentType<{ className?: string }>> = {
  Work: Briefcase,
  Project: Code2,
  Research: FlaskConical,
};

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={
        <>
          A timeline of <span className="gradient-text">work & exploration</span>
        </>
      }
      description="Freelance work, research, and projects that taught me what shipping actually looks like."
    >
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-wine-600/40 to-transparent md:left-1/2 md:-translate-x-1/2" />

        <ol className="space-y-10">
          {experiences.map((exp, i) => {
            const Icon = typeIcons[exp.type];
            const leftSide = i % 2 === 0;
            return (
              <motion.li
                key={exp.role + i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative md:grid md:grid-cols-2 md:gap-12"
              >
                <div className="absolute left-4 top-1 z-10 md:left-1/2 md:-translate-x-1/2">
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-wine-600/40 bg-ink-900">
                    <Icon className="h-3.5 w-3.5 text-wine-600" />
                    <span className="absolute inset-0 rounded-full bg-wine-600/20 blur-md animate-pulse-glow" />
                  </div>
                </div>

                <div
                  className={`pl-14 md:pl-0 ${
                    leftSide ? "md:text-right" : "md:col-start-2"
                  }`}
                >
                  <div className="inline-block rounded-2xl border border-ivory/[0.08] bg-ivory/[0.02] p-5 backdrop-blur-xl text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="accent">{exp.type}</Badge>
                      <span className="font-mono text-xs text-ivory/50">
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold text-ivory">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-wine-300">{exp.company}</p>
                    <p className="mt-2 text-sm text-ivory/65">
                      {exp.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {exp.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-ivory/10 bg-ivory/[0.03] px-2 py-0.5 font-mono text-[10px] text-ivory/70"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
