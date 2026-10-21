"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Compass, Zap } from "lucide-react";
import { audioEngine } from "@/lib/audio-engine";
import { useIntro } from "./intro-context";

interface IntroGatewayProps {
  onEnter?: () => void;
}

export function IntroGateway({ onEnter }: IntroGatewayProps) {
  const { isLaunched, launchPhase, triggerLaunch } = useIntro();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLaunched) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
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

  const isLaunching = launchPhase === "charging" || launchPhase === "warp";

  return (
    <AnimatePresence>
      {!isLaunched && (
        <motion.div
          key="gateway"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.15,
            filter: "blur(20px)",
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md overflow-hidden select-none"
          style={{ width: "100vw", height: "100vh" }}
        >
          {/* Subtle Ambient Cosmic Cockpit Grid & Vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,rgba(0,0,0,0.85)_75%)]" />

          {/* Spaceship Warp Shockwave Rings (triggered on launch) */}
          {isLaunching && (
            <>
              <motion.div
                initial={{ scale: 0.2, opacity: 0.9 }}
                animate={{ scale: 28, opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.12, 0.8, 0.32, 1] }}
                className="pointer-events-none absolute rounded-full border-2 border-cyan-400/80 shadow-[0_0_60px_rgba(34,211,238,0.8)]"
                style={{ width: "80px", height: "80px" }}
              />
              <motion.div
                initial={{ scale: 0.1, opacity: 1 }}
                animate={{ scale: 22, opacity: 0 }}
                transition={{ duration: 1.0, delay: 0.15, ease: [0.12, 0.8, 0.32, 1] }}
                className="pointer-events-none absolute rounded-full border border-white/90 shadow-[0_0_40px_rgba(255,255,255,0.9)]"
                style={{ width: "100px", height: "100px" }}
              />
              {/* Warp Speed Hyperspace Flash */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-white/40 to-blue-500/30 backdrop-blur-sm"
              />
            </>
          )}

          {/* Central Spaceship Launch Control Console */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            {/* Top Telemetry / Cockpit Status Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center gap-2 mb-6 font-mono text-[11px] sm:text-xs tracking-widest text-cyan-400/80 uppercase"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>{isLaunching ? "WARP DRIVE ENGAGED // SYSTEMS 100%" : "SPACESHIP SYSTEM READY // VECTOR LOCKED"}</span>
            </motion.div>

            {/* Launch Button with HUD Bracket Accents */}
            <div className="relative group">
              {/* Futuristic HUD Corner Brackets */}
              <div className="pointer-events-none absolute -inset-3.5 border border-cyan-500/20 rounded-2xl transition-all duration-300 group-hover:border-cyan-500/50 group-hover:scale-105" />
              <div className="pointer-events-none absolute -inset-3.5 flex justify-between items-between">
                <span className="w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400/80 -translate-x-0.5 -translate-y-0.5" />
                <span className="w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400/80 translate-x-0.5 -translate-y-0.5" />
              </div>
              <div className="pointer-events-none absolute -inset-3.5 flex justify-between items-end">
                <span className="w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400/80 -translate-x-0.5 translate-y-0.5" />
                <span className="w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400/80 translate-x-0.5 translate-y-0.5" />
              </div>

              {/* Pulsing Energy Glow */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-600/30 blur-md opacity-50 group-hover:opacity-100 transition duration-300" />

              <motion.button
                whileHover={!isLaunching ? { scale: 1.05 } : {}}
                whileTap={!isLaunching ? { scale: 0.95 } : {}}
                onClick={handleEnter}
                disabled={isLaunching}
                className="group relative flex items-center justify-center gap-3 px-11 py-4 sm:px-14 sm:py-5 rounded-full bg-white text-black font-semibold tracking-[0.2em] uppercase text-sm sm:text-base border border-white/60 hover:bg-neutral-100 transition-all duration-200 cursor-pointer shadow-[0_0_35px_rgba(255,255,255,0.4)]"
              >
                {isLaunching ? (
                  <div className="flex items-center gap-3 text-cyan-900 font-mono font-bold tracking-widest text-xs sm:text-sm">
                    <Zap className="h-4 w-4 animate-bounce text-cyan-600" />
                    <span>LAUNCHING...</span>
                  </div>
                ) : (
                  <>
                    <span>LET&apos;S GO</span>
                    <ArrowRight className="h-4 w-4 text-black transition-transform duration-300 group-hover:translate-x-1.5" />
                  </>
                )}
              </motion.button>
            </div>

            {/* Bottom Subtitle / Mission Specs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 flex items-center gap-3 text-neutral-400 text-xs font-mono tracking-wider"
            >
              <Compass className="h-3.5 w-3.5 text-neutral-500" />
              <span>SUBHAN KASHIF // PORTFOLIO MISSION</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
