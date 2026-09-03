"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Download,
  Github,
  Mail,
  Sparkles,
  Bot,
  Mic,
  FileCode2,
  Cpu,
  Radio,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { audioEngine } from "@/lib/audio-engine";

const roles = [
  "Autonomous AI Sales Agents",
  "Voice AI Personal Trainers",
  "NLP Automated Grading Platforms",
  "Full-Stack Web Architectures",
  "RAG & Multi-Agent Workflows",
];

function useTypewriter(words: string[], typingSpeed = 70, pause = 1600) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
          );
        },
        deleting ? typingSpeed / 2 : typingSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typingSpeed, pause]);

  return text;
}

export default function Hero() {
  const role = useTypewriter(roles);
  const orbRef = useRef<HTMLDivElement | null>(null);

  // Parallax orb on mouse move
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      orbRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-28 pb-16 sm:pt-24 sm:pb-20"
    >
      {/* Cyber Ambient Glows */}
      <div
        ref={orbRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyber-magenta/15 blur-[140px] transition-transform duration-300"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-[20%] h-80 w-80 rounded-full bg-cyber-violet/20 blur-[120px]"
      />

      <div className="container relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          
          {/* Top HUD Telemetry Pill + Radar Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-wrap items-center justify-center gap-3"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyber-magenta/30 bg-[#08080e]/80 px-4 py-1.5 text-xs text-ivory/80 backdrop-blur-xl shadow-[0_0_20px_rgba(255,0,127,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyber-magenta opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyber-magenta" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-cyber-magenta">
                RADAR ONLINE
              </span>
              <span className="text-ivory/30">•</span>
              <span>03 Live Systems Deployed</span>
            </div>

            {/* Radar Mini Visualizer */}
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-ivory/10 bg-[#08080e]/60 px-3 py-1 text-[11px] font-mono text-ivory/60 backdrop-blur">
              <div className="relative h-3.5 w-3.5 rounded-full border border-cyber-magenta/40 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 rounded-full border-t border-cyber-magenta animate-spin" />
                <span className="h-1 w-1 rounded-full bg-cyber-magenta" />
              </div>
              <span>LATENCY &lt; 85ms</span>
            </div>
          </motion.div>

          {/* Main Headline with Subhan Kashif */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-ivory sm:text-7xl md:text-8xl lg:text-9xl text-balance"
          >
            SUBHAN{" "}
            <span className="relative inline-block">
              <span className="gradient-text">KASHIF</span>
              <span className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-cyber-magenta/30 via-cyber-hotpink/25 to-cyber-violet/30 blur-3xl" />
            </span>
          </motion.h1>

          {/* Kinetic Role Cycler */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 font-mono text-sm sm:text-lg md:text-xl text-ivory/90"
          >
            <span className="rounded border border-cyber-magenta/40 bg-cyber-magenta/10 px-2 py-0.5 text-xs text-cyber-magenta font-bold">
              AI ENGINEER
            </span>
            <span className="text-ivory/30">•</span>
            <span className="text-ivory/60">BUILDING</span>
            <span className="min-h-[1.5em] text-ivory font-semibold">{role}</span>
            <span className="inline-block h-5 w-[3px] bg-cyber-magenta animate-blink sm:h-6" />
          </motion.div>

          {/* Subtitle / Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-2xl text-base text-ivory/70 sm:text-lg leading-relaxed text-balance"
          >
            I architect and ship production AI systems — autonomous WhatsApp sales agents,
            real-time Voice AI assistants, and intelligent full-stack platforms.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 grid w-full max-w-md grid-cols-1 gap-3 sm:flex sm:w-auto sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center"
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-white via-slate-200 to-slate-300 text-black font-extrabold tracking-wide hover:shadow-[0_0_35px_rgba(255,255,255,0.8)] transition-all cursor-pointer"
              onMouseEnter={() => audioEngine.playHoverSound()}
            >
              <Link href="#projects">
                <Sparkles className="h-4 w-4 mr-1 text-black" />
                Explore 03 Live Projects
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white/20 bg-white/[0.04] text-white hover:border-white/60 hover:bg-white/10 cursor-pointer"
              onMouseEnter={() => audioEngine.playHoverSound()}
            >
              <a href={siteConfig.resume} download>
                <Download className="h-4 w-4 mr-1" />
                Download Resume
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto text-white/70 hover:text-white cursor-pointer"
              onMouseEnter={() => audioEngine.playHoverSound()}
            >
              <Link href="#contact">
                <Mail className="h-4 w-4 mr-1" />
                Contact Me
              </Link>
            </Button>
          </motion.div>

          {/* Telemetry Footer with GitHub */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 flex items-center gap-5"
          >
            <Link
              href={siteConfig.github}
              target="_blank"
              className="flex items-center gap-2 text-xs font-mono text-ivory/50 hover:text-cyber-magenta transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="h-4 w-4" />
              <span>GITHUB // SUBHAN696</span>
            </Link>
            <span className="h-3 w-px bg-ivory/15" />
            <span className="font-mono text-xs text-ivory/40 flex items-center gap-1.5">
              <span>COMMANDS:</span>
              <kbd className="rounded border border-ivory/15 px-1.5 py-0.5 bg-ivory/[0.04]">⌘K</kbd>
            </span>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1, duration: 0.6 },
            y: { delay: 1, duration: 2, repeat: Infinity },
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <Link
            href="#capabilities"
            className="flex flex-col items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-ivory/40 hover:text-cyber-magenta transition-colors"
          >
            <span>SCROLL DOWN</span>
            <ArrowDown className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
