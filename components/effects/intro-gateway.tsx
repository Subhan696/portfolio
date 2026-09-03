"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { audioEngine } from "@/lib/audio-engine";

interface IntroGatewayProps {
  onEnter?: () => void;
}

export function IntroGateway({ onEnter }: IntroGatewayProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleEnter = () => {
    audioEngine.playGatewaySound();
    audioEngine.startMusic();
    setIsOpen(false);
    document.body.style.overflow = "unset";
    onEnter?.();
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="gateway"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(20px)",
            transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black overflow-hidden select-none"
          style={{ width: "100vw", height: "100vh" }}
        >
          {/* Deep Space Cosmic Starlight Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] pointer-events-none" />

          {/* Minimalist Central LET'S GO Button in Liquid Chrome */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleEnter}
              className="group relative flex items-center justify-center gap-3.5 px-11 py-5 rounded-full bg-gradient-to-r from-white via-slate-200 to-slate-400 text-black font-extrabold tracking-widest uppercase text-base sm:text-lg shadow-[0_0_45px_rgba(255,255,255,0.8)] hover:shadow-[0_0_80px_rgba(255,255,255,1.0)] transition-all duration-300 cursor-pointer"
            >
              {/* Corner Chrome Accent Markers */}
              <div className="hud-bracket-tl" />
              <div className="hud-bracket-tr" />
              <div className="hud-bracket-bl" />
              <div className="hud-bracket-br" />

              <Sparkles className="h-4 w-4 text-black animate-pulse" />
              <span>LET&apos;S GO</span>
              <ArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover:translate-x-1.5" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
