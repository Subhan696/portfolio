"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { skillGroups } from "@/data/skills";

const categoryColors: Record<string, string> = {
  Frontend: "from-wine-300/30 to-ivory/10",
  Backend: "from-wine-600/30 to-wine-900/10",
  "AI / ML": "from-wine-700/30 to-wine-600/10",
  Databases: "from-ivory/30 to-wine-300/10",
  Tools: "from-wine-900/30 to-wine-700/10",
};

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={
        <>
          Tools I use to <span className="gradient-text">build & break</span> things
        </>
      }
      description="A modern, opinionated stack covering AI, full-stack web, and developer experience."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, idx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.07 }}
            className="group relative overflow-hidden rounded-2xl border border-ivory/[0.08] bg-ivory/[0.02] p-6 backdrop-blur-xl card-hover"
          >
            <div
              className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${
                categoryColors[group.category] ?? ""
              } opacity-30 blur-2xl`}
              aria-hidden
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-ivory">
                  {group.category}
                </h3>
                <span className="text-xs text-ivory/40">
                  {group.skills.length} tools
                </span>
              </div>
              <p className="mt-1 text-sm text-ivory/55">{group.description}</p>

              <ul className="mt-6 space-y-3">
                {group.skills.map((s, i) => (
                  <li key={s.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ivory/85">{s.name}</span>
                      <span className="font-mono text-xs text-ivory/40">
                        {s.level}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ivory/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.1,
                          delay: 0.1 + i * 0.05,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative h-full rounded-full bg-gradient-to-r from-wine-300 via-wine-600 to-wine-700"
                      >
                        <span className="absolute inset-0 animate-pulse-glow bg-ivory/20" />
                      </motion.div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
