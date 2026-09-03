"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
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
      transition={{ duration: 0.5 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <button
        onClick={handleToggle}
        onMouseEnter={() => audioEngine.playHoverSound()}
        className={cn(
          "group relative flex items-center gap-3 px-4 py-2.5 rounded-full border backdrop-blur-2xl transition-all duration-300 select-none",
          active
            ? "border-cyber-magenta/50 bg-[#0a0a12]/80 text-ivory shadow-[0_0_25px_rgba(255,0,127,0.35)]"
            : "border-ivory/10 bg-[#0a0a12]/60 text-ivory/50 hover:text-ivory hover:border-ivory/20"
        )}
        aria-label={active ? "Mute audio" : "Play ambient audio"}
      >
        {/* Equalizer Visualizer Bars */}
        <div className="flex items-end gap-0.5 h-4">
          <span
            className={cn(
              "w-0.5 rounded-full bg-cyber-magenta transition-all",
              active ? "animate-equalizer" : "h-1"
            )}
            style={{ animationDelay: "0ms" }}
          />
          <span
            className={cn(
              "w-0.5 rounded-full bg-cyber-hotpink transition-all",
              active ? "animate-equalizer" : "h-1.5"
            )}
            style={{ animationDelay: "200ms" }}
          />
          <span
            className={cn(
              "w-0.5 rounded-full bg-cyber-violet transition-all",
              active ? "animate-equalizer" : "h-1"
            )}
            style={{ animationDelay: "400ms" }}
          />
          <span
            className={cn(
              "w-0.5 rounded-full bg-cyber-magenta transition-all",
              active ? "animate-equalizer" : "h-2"
            )}
            style={{ animationDelay: "150ms" }}
          />
        </div>

        {/* Status text */}
        <div className="flex flex-col text-left max-w-[170px] truncate">
          <span className="text-[10px] font-mono uppercase tracking-wider text-ivory/40 leading-none">
            {active ? "PLAYING AUDIO" : "AUDIO MUTED"}
          </span>
          <span className="text-xs font-semibold text-ivory group-hover:text-cyber-magenta transition-colors truncate">
            {active ? siteConfig.audioTitle || "Night Blooming Jasmine" : "Play Audio"}
          </span>
        </div>

        {/* Icon */}
        <div className="ml-1 flex items-center justify-center">
          {active ? (
            <Volume2 className="h-4 w-4 text-cyber-magenta animate-pulse" />
          ) : (
            <VolumeX className="h-4 w-4 text-ivory/40" />
          )}
        </div>
      </button>
    </motion.div>
  );
}
