"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { audioEngine } from "@/lib/audio-engine";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SoundEqualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const unsub = audioEngine.subscribe((playing, muted) => {
      setIsPlaying(playing);
      setIsMuted(muted);
    });
    return unsub;
  }, []);

  const handleToggle = () => {
    if (!isPlaying) {
      audioEngine.startMusic();
    } else {
      audioEngine.toggleMute();
    }
  };

  const active = isPlaying && !isMuted;

  if (!isPlaying) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-6 right-6 z-50 select-none"
    >
      <button
        onClick={handleToggle}
        className={cn(
          "group relative flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-xl transition-all duration-300 shadow-lg cursor-pointer",
          active
            ? "border-neutral-700/60 bg-neutral-950/90 text-white shadow-[0_0_20px_rgba(255,255,255,0.15)] dark:border-neutral-600 dark:bg-black/90"
            : "border-neutral-300/60 bg-white/80 text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-400 hover:text-black dark:hover:text-white"
        )}
        aria-label={active ? "Mute audio" : "Play ambient audio"}
      >
        {/* Equalizer Visualizer Bars */}
        <div className="flex items-end gap-1 h-3.5">
          <span
            className={cn(
              "w-0.5 rounded-full transition-all duration-300",
              active ? "bg-white animate-equalizer" : "bg-neutral-400 h-1"
            )}
            style={{ animationDelay: "0ms" }}
          />
          <span
            className={cn(
              "w-0.5 rounded-full transition-all duration-300",
              active ? "bg-white animate-equalizer" : "bg-neutral-400 h-1.5"
            )}
            style={{ animationDelay: "200ms" }}
          />
          <span
            className={cn(
              "w-0.5 rounded-full transition-all duration-300",
              active ? "bg-white animate-equalizer" : "bg-neutral-400 h-1"
            )}
            style={{ animationDelay: "400ms" }}
          />
          <span
            className={cn(
              "w-0.5 rounded-full transition-all duration-300",
              active ? "bg-white animate-equalizer" : "bg-neutral-400 h-2"
            )}
            style={{ animationDelay: "150ms" }}
          />
        </div>

        {/* Status text */}
        <div className="flex flex-col text-left max-w-[160px] truncate">
          <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 leading-none">
            {active ? "PLAYING AUDIO" : "AUDIO MUTED"}
          </span>
          <span className="text-xs font-medium text-neutral-900 dark:text-neutral-100 truncate group-hover:underline">
            {active ? siteConfig.audioTitle || "Night Blooming Jasmine" : "Play Audio"}
          </span>
        </div>

        {/* Icon */}
        <div className="ml-1 flex items-center justify-center">
          {active ? (
            <Volume2 className="h-4 w-4 text-white animate-pulse" />
          ) : (
            <VolumeX className="h-4 w-4 text-neutral-400" />
          )}
        </div>
      </button>
    </motion.div>
  );
}
