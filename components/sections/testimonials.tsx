"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const total = testimonials.length;

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % total), 6000);
    return () => clearInterval(t);
  }, [total]);

  const t = testimonials[i];

  return (
    <Section
      id="testimonials"
      eyebrow="Testimonials"
      title={
        <>
          Kind words from <span className="gradient-text">collaborators</span>
        </>
      }
    >
      <div className="relative mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border border-ivory/[0.08] bg-ivory/[0.02] p-6 backdrop-blur-xl sm:p-10">
          <Quote
            className="pointer-events-none absolute -top-6 -left-6 h-24 w-24 text-wine-600/15"
            aria-hidden
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-balance text-lg leading-relaxed text-ivory/85 sm:text-xl">
                "{t.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-wine-300 to-wine-600 font-display text-sm font-bold text-ivory">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-medium text-ivory">{t.name}</p>
                  <p className="text-xs text-ivory/55">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => setI((x) => (x - 1 + total) % total)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ivory/10 bg-ivory/[0.03] text-ivory/70 hover:text-ivory hover:border-wine-600/40 transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i
                    ? "w-6 bg-wine-600"
                    : "w-1.5 bg-ivory/20 hover:bg-ivory/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setI((x) => (x + 1) % total)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ivory/10 bg-ivory/[0.03] text-ivory/70 hover:text-ivory hover:border-wine-600/40 transition-all"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Section>
  );
}
