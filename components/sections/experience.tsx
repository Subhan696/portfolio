"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { experiences } from "@/data/experience";

export default function Experience() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

  return (
    <section id="experience" className="py-12">
      <div className="hairline mb-8" />
      <h2 className="section-heading">Experience</h2>

      <div className="space-y-0">
        {experiences.map((exp, i) => {
          const isOpen = expanded.has(i);
          return (
            <div key={i} className="border-b border-border last:border-b-0">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                aria-expanded={isOpen}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                    <span className="font-medium text-foreground text-sm">
                      {exp.company}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {exp.role}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {exp.period}
                  </p>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground flex-none mt-1 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="pb-5">
                  <p className="text-sm leading-relaxed text-muted-foreground mb-3">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.map((s) => (
                      <span key={s} className="tech-pill">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
