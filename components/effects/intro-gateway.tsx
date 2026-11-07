"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { audioEngine } from "@/lib/audio-engine";
import { useIntro } from "./intro-context";
import { pauseLenis, resumeLenis } from "@/lib/lenis-scroll";

interface IntroGatewayProps {
  onEnter?: () => void;
}

export function IntroGateway({ onEnter }: IntroGatewayProps) {
  const { isLaunched, launchPhase, triggerLaunch } = useIntro();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock mobile & desktop scrolling completely while intro gateway is displayed
  useEffect(() => {
    if (!isLaunched) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.touchAction = "none";
      document.documentElement.style.height = "100%";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.body.style.height = "100%";
      pauseLenis();
    } else {
      document.documentElement.style.overflow = "";
      document.documentElement.style.touchAction = "";
      document.documentElement.style.height = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.height = "";
      resumeLenis();
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.touchAction = "";
      document.documentElement.style.height = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.height = "";
      resumeLenis();
    };
  }, [isLaunched]);

  const handleEnter = () => {
    if (launchPhase !== "idle") return;
    audioEngine.playGatewaySound();
    audioEngine.startMusic();
    triggerLaunch();
    onEnter?.();
  };

  // If already launched in this session, do not render gateway
  if (mounted && isLaunched && launchPhase === "arrived") {
    return null;
  }

  return (
    <AnimatePresence>
      {!isLaunched && (
        <motion.div
          key="gateway"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.96,
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
          onTouchMove={(e) => e.preventDefault()}
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black overflow-hidden select-none touch-none overscroll-none"
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
