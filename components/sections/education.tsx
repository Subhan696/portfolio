"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { education } from "@/data/education";

export default function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title={
        <>
          Foundations in <span className="gradient-text">CS & AI</span>
        </>
      }
      description="Formal study in computer science, with deep focus on AI and web development."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {education.map((e, i) => (
          <motion.div
            key={e.degree}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-ivory/[0.08] bg-ivory/[0.02] p-6 backdrop-blur-xl card-hover"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-wine-300/15 blur-3xl transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-wine-300 to-wine-600 text-ivory">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold text-ivory">
                    {e.degree}
                  </h3>
                  <p className="text-sm text-wine-300">{e.school}</p>
                  <p className="font-mono text-xs text-ivory/45">{e.period}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-ivory/65">{e.description}</p>
              <div className="mt-5">
                <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-ivory/45">
                  <BookOpen className="h-3.5 w-3.5" /> Relevant coursework
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {e.coursework.map((c) => (
                    <Badge key={c}>{c}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
