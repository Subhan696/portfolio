"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40 });
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 16 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 16 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        const target = e.target as HTMLElement;
        setIsPointer(
          !!target.closest('a, button, [role="button"], input, textarea, [data-cursor="pointer"]')
        );
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("custom-cursor");
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        style={{ x: springX, y: springY }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className={`h-2 w-2 rounded-full bg-ivory transition-transform ${
            isPointer ? "scale-150" : "scale-100"
          }`}
        />
      </motion.div>
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[99] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className={`rounded-full border border-wine-300/40 transition-all duration-300 ${
            isPointer ? "h-12 w-12 bg-wine-300/10 border-wine-300/70" : "h-8 w-8"
          }`}
        />
      </motion.div>
      <motion.div
        style={{ x: springX, y: springY }}
        className="pointer-events-none fixed left-0 top-0 z-[98] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-64 w-64 rounded-full bg-wine-300/8 blur-3xl" />
      </motion.div>
    </>
  );
}
