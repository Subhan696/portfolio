"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Code2,
  Server,
  Layout,
  Database,
  Wrench,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { techStackCategories } from "@/data/skills";
import TechMarquee from "@/components/sections/tech-marquee";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Code2,
  Server,
  Layout,
  Database,
  Wrench,
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "All Technologies", icon: Sparkles },
    ...techStackCategories.map((c) => ({
      id: c.id,
      name: c.name,
      icon: iconMap[c.icon] || Sparkles,
    })),
  ];

  const displayedCategories =
    activeCategory === "all"
      ? techStackCategories
      : techStackCategories.filter((c) => c.id === activeCategory);

  return (
    <section id="skills" className="py-16 sm:py-20 border-t border-white/[0.08]">
      {/* Eyebrow & Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-sky-400">
              Technical Arsenal
            </span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Tech Stack & Capabilities
          </h2>
          <p className="text-sm text-white/60 max-w-xl mt-2 leading-relaxed">
            Directly from Subhan&apos;s resume: production LLM orchestration, RAG architectures, full-stack frameworks, databases, and DevOps tooling.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all whitespace-nowrap ${
                active
                  ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                  : "bg-white/[0.03] text-white/60 hover:text-white border border-white/[0.06] hover:bg-white/[0.06]"
              }`}
            >
              <Icon className="h-3.5 w-3.5 text-sky-400" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        <AnimatePresence>
          {displayedCategories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Sparkles;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group relative flex flex-col justify-between p-6 rounded-2xl border border-white/[0.08] bg-[#0A0D15]/80 hover:bg-[#0E1320] hover:border-sky-400/30 backdrop-blur-md transition-all shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="text-base font-bold font-mono text-white">
                        {cat.name}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-white/40">
                      {cat.skills.length} skills
                    </span>
                  </div>

                  <p className="text-xs text-white/55 leading-relaxed mb-5">
                    {cat.description}
                  </p>

                  {/* Skills List with Progress */}
                  <div className="space-y-3">
                    {cat.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-white/80 font-medium">
                            {skill.name}
                          </span>
                          <span className="text-white/40 font-mono text-[11px]">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Kinetic Tech Marquee */}
      <div className="mt-12">
        <TechMarquee />
      </div>
    </section>
  );
}
