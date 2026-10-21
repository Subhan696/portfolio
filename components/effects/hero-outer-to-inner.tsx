"use client";

import { motion } from "framer-motion";
import { useIntro } from "./intro-context";

interface HeroOuterToInnerProps {
  headline: string;
  bio: string;
}

export function HeroOuterToInner({ headline, bio }: HeroOuterToInnerProps) {
  const { isLaunched } = useIntro();

  return (
    <section className="mb-12 flex flex-col justify-center mt-2">
      <div className="max-w-xl">
        {/* Role Subtitle: Outer-to-Inner Spaceship Arrival */}
        <motion.p
          initial={{ scale: 2.1, opacity: 0, filter: "blur(14px)", y: 20 }}
          animate={
            isLaunched
              ? { scale: 1, opacity: 1, filter: "blur(0px)", y: 0 }
              : { scale: 2.1, opacity: 0, filter: "blur(14px)", y: 20 }
          }
          transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 font-mono text-sm text-gray-400 md:text-base flex items-center gap-2"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400/80 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <span>Full-Stack &amp; Machine Learning Engineer</span>
        </motion.p>

        {/* Main Headline: Grand Outer-to-Inner 3D Warp Convergence */}
        <motion.h1
          initial={{ scale: 2.5, opacity: 0, filter: "blur(22px)", y: 35 }}
          animate={
            isLaunched
              ? { scale: 1, opacity: 1, filter: "blur(0px)", y: 0 }
              : { scale: 2.5, opacity: 0, filter: "blur(22px)", y: 35 }
          }
          transition={{ duration: 1.15, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[2.2rem] font-medium leading-[1.1] tracking-tight mb-6 text-balance md:text-[2.75rem] lg:text-[3.25rem] text-white"
        >
          {headline}
        </motion.h1>

        {/* Bio Paragraph: Outer-to-Inner Settlement */}
        <motion.p
          initial={{ scale: 1.7, opacity: 0, filter: "blur(12px)", y: 25 }}
          animate={
            isLaunched
              ? { scale: 1, opacity: 1, filter: "blur(0px)", y: 0 }
              : { scale: 1.7, opacity: 0, filter: "blur(12px)", y: 25 }
          }
          transition={{ duration: 1.0, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
          className="text-gray-400 text-sm md:text-base leading-6 text-pretty max-w-lg"
        >
          {bio}
        </motion.p>
      </div>
    </section>
  );
}
