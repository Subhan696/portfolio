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
  Code2,
  Brain,
  Eye,
  Cpu,
  Database,
  Boxes,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const roles = [
  "AI Engineer",
  "Full Stack Developer",
  "Computer Vision Engineer",
  "Web Developer",
  "Deep Learning Enthusiast",
];

const floatingIcons = [
  { Icon: Brain, x: "10%", y: "20%", delay: 0, color: "text-wine-600" },
  { Icon: Eye, x: "85%", y: "30%", delay: 0.4, color: "text-wine-300" },
  { Icon: Code2, x: "8%", y: "75%", delay: 0.8, color: "text-wine-700" },
  { Icon: Cpu, x: "88%", y: "70%", delay: 1.2, color: "text-wine-600" },
  { Icon: Database, x: "15%", y: "50%", delay: 1.6, color: "text-wine-300" },
  { Icon: Boxes, x: "82%", y: "50%", delay: 2.0, color: "text-wine-700" },
];

function useTypewriter(words: string[], typingSpeed = 80, pause = 1600) {
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
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      orbRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-24 pb-16 sm:pt-20 sm:pb-20"
    >
      {/* Glow orbs */}
      <div
        ref={orbRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-wine-600/20 blur-[120px] transition-transform duration-300"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-[20%] h-72 w-72 rounded-full bg-wine-300/20 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[5%] bottom-[15%] h-80 w-80 rounded-full bg-wine-700/15 blur-[120px]"
      />

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, x, y, delay, color }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.8 }}
          style={{ left: x, top: y }}
          className="pointer-events-none absolute hidden lg:block"
          aria-hidden
        >
          <motion.div
            animate={{
              y: [0, -14, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-ivory/10 bg-ivory/[0.03] backdrop-blur ${color}`}
          >
            <Icon className="h-5 w-5" />
          </motion.div>
        </motion.div>
      ))}

      <div className="container relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-ivory/10 bg-ivory/[0.04] px-3 py-1 text-xs text-ivory/70 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ivory sm:text-6xl md:text-7xl lg:text-8xl text-balance"
          >
            Hey, I'm{" "}
            <span className="relative inline-block">
              <span className="gradient-text">{siteConfig.name}</span>
              <span className="absolute -inset-2 -z-10 rounded-2xl bg-gradient-to-r from-wine-300/20 via-wine-600/20 to-wine-700/20 blur-2xl" />
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-base sm:text-xl md:text-2xl text-ivory/80"
          >
            <Sparkles className="h-4 w-4 text-wine-600 sm:h-5 sm:w-5" />
            <span className="text-ivory/40">{`>`}</span>
            <span className="min-h-[1.5em]">{role}</span>
            <span className="inline-block h-5 w-[3px] bg-wine-600 animate-blink sm:h-6" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-2xl text-base text-ivory/60 sm:text-lg text-balance"
          >
            I build production AI systems — RAG chatbots, computer vision pipelines,
            and full-stack apps that actually ship. Obsessed with elegant code,
            fast UX, and models that hold up in production.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 grid w-full max-w-md grid-cols-1 gap-3 sm:mt-10 sm:flex sm:w-auto sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center"
          >
            <Button asChild variant="accent" size="lg" className="w-full sm:w-auto">
              <Link href="#projects">
                <Sparkles className="h-4 w-4" />
                View Projects
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href={siteConfig.resume} download>
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
              <Link href="#contact">
                <Mail className="h-4 w-4" />
                Contact Me
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex items-center gap-4"
          >
            <Link
              href={siteConfig.github}
              target="_blank"
              className="text-ivory/50 hover:text-ivory transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <span className="hidden h-4 w-px bg-ivory/10 sm:inline-block" />
            <span className="hidden font-mono text-xs text-ivory/40 sm:inline-flex sm:items-center sm:gap-1">
              press <kbd className="rounded border border-ivory/15 px-1.5 py-0.5">⌘K</kbd> for commands
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1, duration: 0.6 },
            y: { delay: 1, duration: 2, repeat: Infinity },
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <Link
            href="#about"
            className="flex flex-col items-center gap-2 text-xs text-ivory/40 hover:text-ivory transition-colors"
          >
            <span className="uppercase tracking-widest">Scroll</span>
            <ArrowDown className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
