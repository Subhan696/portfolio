"use client";

import { motion } from "framer-motion";
import { Award, Trophy, BadgeCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { certifications, achievements } from "@/data/education";

export default function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications & Achievements"
      title={
        <>
          Badges, awards, and{" "}
          <span className="gradient-text">milestones</span>
        </>
      }
      description="A few learning milestones and recognitions along the way."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-semibold text-ivory">
            <BadgeCheck className="h-5 w-5 text-wine-300" /> Certifications
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {certifications.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-ivory/[0.08] bg-ivory/[0.02] p-4 backdrop-blur card-hover"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-wine-300 to-wine-600 text-ivory">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-ivory">{c.name}</p>
                    <p className="text-xs text-ivory/55">
                      {c.issuer} · {c.date}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-semibold text-ivory">
            <Trophy className="h-5 w-5 text-wine-700" /> Achievements
          </h3>
          <div className="space-y-3">
            {achievements.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group flex items-start gap-4 rounded-2xl border border-ivory/[0.08] bg-ivory/[0.02] p-4 backdrop-blur card-hover"
              >
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-wine-700 to-wine-600 text-ivory">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-ivory">{a.title}</p>
                    <span className="font-mono text-xs text-ivory/45">
                      {a.year}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-ivory/60">
                    {a.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
