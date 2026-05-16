"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 sm:py-24 lg:py-32 scroll-mt-20 sm:scroll-mt-24",
        className
      )}
    >
      <div className={cn("container relative", containerClassName)}>
        {(eyebrow || title || description) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-10 max-w-3xl text-center sm:mb-16"
          >
            {eyebrow && (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ivory/10 bg-ivory/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-widest text-ivory/70 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-wine-600 animate-pulse" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ivory sm:text-4xl md:text-5xl text-balance">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-5 text-base text-ivory/60 sm:text-lg text-balance">
                {description}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
