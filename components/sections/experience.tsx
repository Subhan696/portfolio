"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Download,
  ExternalLink,
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronDown,
  FileText,
  Sparkles,
} from "lucide-react";
import { experiences } from "@/data/experience";
import { educationHistory } from "@/data/education";
import { siteConfig } from "@/lib/site";

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="py-16 sm:py-20 border-t border-white/[0.08]">
      {/* Header & Resume Download CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-sky-400">
              Career & Credentials
            </span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Experience & Education
          </h2>
          <p className="text-sm text-white/60 max-w-xl mt-2 leading-relaxed">
            Professional background from Subhan&apos;s resume: AI engineering, LLM orchestration, full-stack software development, and academic milestones.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <a
            href={siteConfig.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-white transition-all"
          >
            <FileText className="h-3.5 w-3.5 text-sky-400" />
            <span>View Resume PDF</span>
            <ExternalLink className="h-3 w-3 text-white/40" />
          </a>

          <a
            href={siteConfig.resume}
            download="Subhan_Kashif_Resume.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-xs font-mono font-medium text-white shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Resume</span>
          </a>
        </div>
      </div>

      {/* Tabs: Work Experience vs Education */}
      <div className="flex items-center gap-2 mb-8">
        <button
          onClick={() => setActiveTab("experience")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
            activeTab === "experience"
              ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
              : "bg-white/[0.03] text-white/60 hover:text-white border border-white/[0.06]"
          }`}
        >
          <Briefcase className="h-3.5 w-3.5 text-sky-400" />
          <span>Work Experience</span>
        </button>

        <button
          onClick={() => setActiveTab("education")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
            activeTab === "education"
              ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
              : "bg-white/[0.03] text-white/60 hover:text-white border border-white/[0.06]"
          }`}
        >
          <GraduationCap className="h-3.5 w-3.5 text-sky-400" />
          <span>Education History</span>
        </button>
      </div>

      {/* Timeline Container with Scroll Progress Line */}
      <div ref={containerRef} className="relative pl-6 sm:pl-8 space-y-6">
        {/* Animated Vertical Line */}
        <div className="absolute left-2.5 sm:left-3 top-3 bottom-3 w-[2px] bg-white/[0.06]">
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="w-full h-full bg-gradient-to-b from-sky-400 via-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
          />
        </div>

        {/* WORK EXPERIENCE TAB */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            {experiences.map((exp, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div
                  key={exp.company + idx}
                  className="relative group rounded-2xl border border-white/[0.08] bg-[#0A0D15]/80 hover:bg-[#0E1320] hover:border-sky-400/30 backdrop-blur-md transition-all p-5 sm:p-6 shadow-lg"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[27px] sm:-left-[35px] top-6 h-3 w-3 rounded-full bg-sky-400 border-2 border-[#08090D] shadow-[0_0_8px_rgba(56,189,248,0.8)] group-hover:scale-125 transition-transform" />

                  {/* Header Row */}
                  <div
                    onClick={() => toggleExpand(idx)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold font-mono text-white group-hover:text-sky-300 transition-colors">
                          {exp.role}
                        </h3>
                        <span className="text-xs font-mono text-sky-400 px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20">
                          {exp.company}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono text-white/50 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-sky-400" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-white/40" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <button className="text-white/40 hover:text-white p-1 self-end sm:self-center">
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-sky-400" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Description & Highlights */}
                  <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-3">
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Bullet Points */}
                    <div className="space-y-2 pt-1">
                      {exp.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-white/75">
                          <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.stack.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/[0.04] border border-white/10 text-white/70 hover:text-white transition-colors"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* EDUCATION HISTORY TAB */}
        {activeTab === "education" && (
          <div className="space-y-6">
            {educationHistory.map((edu, idx) => (
              <div
                key={edu.institution + idx}
                className="relative group rounded-2xl border border-white/[0.08] bg-[#0A0D15]/80 hover:bg-[#0E1320] hover:border-sky-400/30 backdrop-blur-md transition-all p-5 sm:p-6 shadow-lg"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[27px] sm:-left-[35px] top-6 h-3 w-3 rounded-full bg-indigo-400 border-2 border-[#08090D] shadow-[0_0_8px_rgba(129,140,248,0.8)] group-hover:scale-125 transition-transform" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold font-mono text-white group-hover:text-indigo-300 transition-colors">
                        {edu.degree}
                      </h3>
                      {edu.grade && (
                        <span className="text-xs font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                          {edu.grade}
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-mono text-white/50 mt-1">
                      {edu.institution}
                    </p>
                  </div>

                  <span className="text-xs font-mono text-white/40 self-start sm:self-center">
                    {edu.period}
                  </span>
                </div>

                {edu.description && (
                  <p className="text-xs sm:text-sm text-white/65 leading-relaxed mb-3">
                    {edu.description}
                  </p>
                )}

                {edu.coursework && (
                  <div className="pt-3 border-t border-white/[0.06]">
                    <span className="text-[11px] font-mono text-white/40 block mb-2 uppercase tracking-wider">
                      Relevant Coursework
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((c) => (
                        <span
                          key={c}
                          className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/[0.04] border border-white/10 text-white/70"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
