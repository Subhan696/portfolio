"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  Download,
  Briefcase,
  GraduationCap,
  Sparkles,
  ChevronDown,
  FileText,
  Calendar,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Code,
  X,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import { experiences } from "@/data/experience";
import { education } from "@/data/education";
import { skillGroups } from "@/data/skills";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function ResumeSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
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
    <section id="resume" className="py-16 border-t border-amber-400/10 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary">
              Curriculum Vitae
            </span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          </div>
          <h2 className="section-heading mb-2">Resume & Career Path</h2>
          <p className="text-sm text-muted-foreground max-w-lg">
            Engineering background in LLM orchestration, RAG architectures, and production full-stack systems.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-mono text-foreground hover:bg-white/[0.06] hover:border-amber-400/30 transition-all cursor-pointer"
          >
            <FileText className="h-3.5 w-3.5 text-primary" />
            <span>Interactive View</span>
          </button>

          <a href={siteConfig.resume} download="Subhan_Kashif_Resume.pdf">
            <HoverBorderGradient
              as="div"
              containerClassName="rounded-full shadow-[0_0_20px_rgba(229,195,120,0.15)]"
              className="flex items-center gap-2.5 text-xs font-mono font-medium py-2 px-4"
            >
              <Download className="h-4 w-4 text-primary animate-pulse" />
              <span>Download Resume</span>
            </HoverBorderGradient>
          </a>
        </div>
      </div>

      {/* Interactive Timeline Container */}
      <div ref={timelineRef} className="relative pl-6 sm:pl-8">
        {/* Animated Vertical Progress Track */}
        <div className="absolute left-2 sm:left-3 top-3 bottom-3 w-[2px] bg-white/[0.06]">
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="w-full h-full bg-gradient-to-b from-[#E5C378] via-[#D4AF37] to-amber-200 shadow-[0_0_12px_rgba(229,195,120,0.8)]"
          />
        </div>

        {/* Section 1: Work Experience */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-amber-400/15 border border-amber-400/40 text-primary">
              <Briefcase className="h-3.5 w-3.5" />
            </div>
            <h3 className="font-serif text-xl font-medium text-foreground tracking-tight">
              Work Experience
            </h3>
          </div>

          <div className="space-y-4">
            {experiences.map((exp, idx) => {
              const isOpen = expandedIndex === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  className={`luxury-card rounded-2xl p-5 transition-all duration-300 relative ${
                    isOpen ? "border-amber-400/35 bg-obsidian-850/80" : ""
                  }`}
                >
                  {/* Timeline Node Point */}
                  <div
                    className={`absolute -left-[27px] sm:-left-[35px] top-6 h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                      isOpen
                        ? "bg-[#E5C378] border-white shadow-[0_0_10px_rgba(229,195,120,0.8)] scale-125"
                        : "bg-obsidian-950 border-amber-400/40"
                    }`}
                  />

                  {/* Header Row */}
                  <div
                    onClick={() => toggleExpand(idx)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer select-none"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-semibold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors">
                          {exp.role}
                        </h4>
                        <span className="text-xs font-mono text-primary/80">
                          @ {exp.company}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {exp.period}
                        </span>
                        {exp.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {exp.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      className="self-end sm:self-center p-1 rounded-full text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Expand milestone"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pt-4 mt-3 border-t border-white/[0.06]"
                      >
                        <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-3">
                          {exp.description}
                        </p>

                        <div className="space-y-2 mb-4">
                          {exp.highlights.map((item, hIdx) => (
                            <div
                              key={hIdx}
                              className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-none mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Pills */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {exp.stack.map((tech) => (
                            <span key={tech} className="tech-pill">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Education */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-amber-400/15 border border-amber-400/40 text-primary">
              <GraduationCap className="h-3.5 w-3.5" />
            </div>
            <h3 className="font-serif text-xl font-medium text-foreground tracking-tight">
              Education & Academia
            </h3>
          </div>

          <div className="space-y-4">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="luxury-card rounded-2xl p-5 relative"
              >
                {/* Timeline node */}
                <div className="absolute -left-[27px] sm:-left-[35px] top-6 h-3 w-3 rounded-full border-2 bg-obsidian-950 border-amber-400/40" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">
                    {edu.degree}
                  </h4>
                  <span className="text-xs font-mono text-muted-foreground">
                    {edu.period}
                  </span>
                </div>

                <p className="text-xs font-mono text-primary mb-2">
                  {edu.school}
                </p>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                  {edu.description}
                </p>

                {edu.coursework && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {edu.coursework.map((c) => (
                      <span
                        key={c}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.05] text-muted-foreground"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 3: Core Technical Competencies */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-amber-400/15 border border-amber-400/40 text-primary">
              <Code className="h-3.5 w-3.5" />
            </div>
            <h3 className="font-serif text-xl font-medium text-foreground tracking-tight">
              Core Technical Competencies
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillGroups.map((group, idx) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="luxury-card rounded-2xl p-4 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-primary mb-1">
                    {group.category}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    {group.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((s) => (
                    <span
                      key={s.name}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/[0.03] border border-amber-400/15 text-foreground/80 hover:border-amber-400/40 hover:text-primary transition-colors"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Resume Modal Dialog */}
      <AnimatePresence>
        {isPreviewOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPreviewOpen(false)}
              className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-amber-400/25 bg-obsidian-900 p-6 sm:p-8 shadow-2xl scrollbar-thin"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-white/[0.08] pb-4 mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-foreground">
                    Subhan Kashif
                  </h3>
                  <p className="text-xs font-mono text-primary mt-0.5">
                    AI Engineer • LLM & Full-Stack Developer
                  </p>
                  <p className="text-xs font-mono text-muted-foreground mt-1">
                    Lahore, Pakistan • subhankashif696@gmail.com • 0321-1017677
                  </p>
                </div>

                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-1 rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-primary mb-2">
                  Professional Summary
                </h4>
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                  AI Engineer and Computer Science graduate specializing in end-to-end LLM orchestration, Retrieval-Augmented Generation (RAG) pipelines, and full-stack web architectures across React, FastAPI, Node.js, and Python. Experienced in bridging complex AI capabilities into production-ready software with robust data models and elegant user interfaces.
                </p>
              </div>

              {/* Work History */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-primary mb-3">
                  Experience
                </h4>
                <div className="space-y-4">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border-l-2 border-amber-400/30 pl-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-foreground">
                          {exp.role} — {exp.company}
                        </span>
                        <span className="text-muted-foreground font-mono">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 mb-1.5">
                        {exp.description}
                      </p>
                      <ul className="list-disc list-inside text-[11px] text-foreground/75 space-y-1">
                        {exp.highlights.map((h, hi) => (
                          <li key={hi}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-primary mb-3">
                  Education
                </h4>
                <div className="space-y-3">
                  {education.map((edu, i) => (
                    <div key={i} className="text-xs">
                      <div className="flex items-center justify-between font-semibold text-foreground">
                        <span>{edu.degree}</span>
                        <span className="font-mono text-muted-foreground">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-primary font-mono text-[11px]">
                        {edu.school}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer with download */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <span>github.com/Subhan696</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                <a href={siteConfig.resume} download="Subhan_Kashif_Resume.pdf">
                  <HoverBorderGradient
                    as="div"
                    containerClassName="rounded-full"
                    className="flex items-center gap-2 text-xs font-mono font-medium py-1.5 px-4"
                  >
                    <Download className="h-3.5 w-3.5 text-primary" />
                    <span>Download Official PDF</span>
                  </HoverBorderGradient>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
