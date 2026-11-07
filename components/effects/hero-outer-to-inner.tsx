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
    <section className="mb-12 flex flex-col justify-center mt-2 max-w-full overflow-hidden">
      <div className="max-w-xl w-full">
        {/* Role Subtitle: GPU-composited Outer-to-Inner Arrival */}
        <motion.p
          style={{ transformOrigin: "left center", willChange: "transform, opacity" }}
          initial={{ scale: 1.4, opacity: 0, y: 15 }}
          animate={
            isLaunched
              ? { scale: 1, opacity: 1, y: 0 }
              : { scale: 1.4, opacity: 0, y: 15 }
          }
          transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 font-mono text-sm text-gray-500 dark:text-gray-400 md:text-base"
        >
          Full-Stack &amp; Machine Learning Engineer
        </motion.p>

        {/* Main Headline: GPU-composited Grand Outer-to-Inner Warp Convergence */}
        <motion.h1
          style={{ transformOrigin: "left center", willChange: "transform, opacity" }}
          initial={{ scale: 1.65, opacity: 0, y: 24 }}
          animate={
            isLaunched
              ? { scale: 1, opacity: 1, y: 0 }
              : { scale: 1.65, opacity: 0, y: 24 }
          }
          transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[2.15rem] font-medium leading-[1.1] tracking-tight mb-6 text-balance md:text-[2.6rem] lg:text-[3rem]"
        >
          {headline}
        </motion.h1>

        {/* Bio Paragraph: GPU-composited Outer-to-Inner Settlement */}
        <motion.p
          style={{ transformOrigin: "left center", willChange: "transform, opacity" }}
          initial={{ scale: 1.3, opacity: 0, y: 16 }}
          animate={
            isLaunched
              ? { scale: 1, opacity: 1, y: 0 }
              : { scale: 1.3, opacity: 0, y: 16 }
          }
          transition={{ duration: 0.75, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
          className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-6 text-pretty max-w-lg"
        >
          {bio}
        </motion.p>
      </div>
    </section>
  );
}
