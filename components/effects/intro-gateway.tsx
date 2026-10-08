"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { audioEngine } from "@/lib/audio-engine";

interface IntroGatewayProps {
  onEnter?: () => void;
}

export function IntroGateway({ onEnter }: IntroGatewayProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="gateway"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.98,
            filter: "blur(10px)",
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black overflow-hidden select-none"
          style={{ width: "100vw", height: "100vh" }}
        >
          {/* Minimalist Central Solid LET'S GO Button */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEnter}
              className="group relative flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-white text-black font-semibold tracking-widest uppercase text-sm sm:text-base border border-neutral-300 hover:bg-neutral-100 transition-colors duration-200 cursor-pointer shadow-md"
            >
              <span>LET&apos;S GO</span>
              <ArrowRight className="h-4 w-4 text-black transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
