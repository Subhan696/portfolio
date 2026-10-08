"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[100] h-[3px] w-full origin-left bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-500 shadow-[0_0_14px_rgba(56,189,248,0.9)]"
      style={{ scaleX }}
    />
  );
}
