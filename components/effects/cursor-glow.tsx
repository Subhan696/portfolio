"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface StarParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export default function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [particles, setParticles] = useState<StarParticle[]>([]);

  // Mouse coordinates with high-speed response
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const boardX = useSpring(mouseX, { stiffness: 800, damping: 45 });
  const boardY = useSpring(mouseY, { stiffness: 800, damping: 45 });

  const auraX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const auraY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const [angle, setAngle] = useState(-45);
  const lastPosRef = useRef({ x: -100, y: -100, time: 0 });
  const particleIdRef = useRef(0);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setMounted(true);
    document.documentElement.classList.add("custom-cursor-active");

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const now = performance.now();

      mouseX.set(x);
      mouseY.set(y);

      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const dt = now - lastPosRef.current.time;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Rotate surfboard in the direction of velocity
      if (dist > 3 && dt > 0) {
        const rad = Math.atan2(dy, dx);
        const deg = (rad * 180) / Math.PI + 90; // Align nose with direction
        setAngle((prev) => {
          // Smooth angular interpolation
          let diff = deg - prev;
          while (diff < -180) diff += 360;
          while (diff > 180) diff -= 360;
          return prev + diff * 0.45;
        });

        // Emit cosmic starlight trail particles
        if (Math.random() > 0.4) {
          particleIdRef.current += 1;
          const newParticle: StarParticle = {
            id: particleIdRef.current,
            x: x - (dx / dist) * 18 + (Math.random() - 0.5) * 6,
            y: y - (dy / dist) * 18 + (Math.random() - 0.5) * 6,
            size: 2 + Math.random() * 3,
            opacity: 0.9,
          };
          setParticles((prev) => [...prev.slice(-15), newParticle]);
        }
      }

      lastPosRef.current = { x, y, time: now };

      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = !!target.closest(
          'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"], .cursor-pointer'
        );
        setIsPointer(clickable);
      }
    };

    const onDown = () => setIsClicked(true);
    const onUp = () => setIsClicked(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // Particle cleanup loop
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.08, size: p.size * 0.92 }))
          .filter((p) => p.opacity > 0.1)
      );
    }, 40);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      clearInterval(interval);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[99999999] overflow-hidden select-none">
      {/* 1. Trailing Cosmic Star Dust Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
          }}
          className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-white via-sky-200 to-slate-300 shadow-[0_0_8px_#ffffff]"
        />
      ))}

      {/* 2. Cosmic Silver Aura Glow */}
      <motion.div
        style={{ x: auraX, y: auraY }}
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className={`rounded-full transition-all duration-500 blur-2xl ${
            isPointer
              ? "h-40 w-40 bg-gradient-to-tr from-white/30 via-sky-300/25 to-slate-400/20"
              : "h-28 w-28 bg-gradient-to-tr from-white/15 to-slate-400/10"
          }`}
        />
      </motion.div>

      {/* 3. The Chrome Liquid Surfboard Cursor */}
      <motion.div
        style={{
          x: boardX,
          y: boardY,
        }}
        className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      >
        <motion.div
          animate={{
            scale: isClicked ? 0.8 : isPointer ? 1.35 : 1.0,
            rotate: angle,
          }}
          transition={{
            scale: { type: "spring", stiffness: 450, damping: 25 },
            rotate: { type: "spring", stiffness: 300, damping: 20 },
          }}
          className="relative flex items-center justify-center drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
        >
          {/* SVG Liquid Chrome Surfboard */}
          <svg
            width="22"
            height="46"
            viewBox="0 0 24 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            <defs>
              {/* Liquid Chrome Metallic Gradient */}
              <linearGradient id="chromeBoard" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#E2E8F0" />
                <stop offset="50%" stopColor="#94A3B8" />
                <stop offset="75%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>

              {/* Specular Highlight Streak */}
              <linearGradient id="chromeShine" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#CBD5E1" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.85" />
              </linearGradient>

              {/* Cosmic Edge Glow Filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Surfboard Outline & Body */}
            <path
              d="M12 1.5 C18.5 14, 21.5 34, 15 49.5 C13.5 51.5, 10.5 51.5, 9 49.5 C2.5 34, 5.5 14, 12 1.5 Z"
              fill="url(#chromeBoard)"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              filter="url(#glow)"
            />

            {/* Center Chrome Stringer & Reflection Strip */}
            <path
              d="M12 4 L12 48"
              stroke="url(#chromeShine)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Nose Cosmic Starlight Gleam */}
            <circle cx="12" cy="4.5" r="1.2" fill="#FFFFFF" className="animate-pulse" />
          </svg>

          {/* Magnetic Hover Reticle Ring */}
          {isPointer && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="absolute -inset-2 rounded-full border border-white/60 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            />
          )}
        </motion.div>
      </motion.div>
    </div>,
    document.body
  );
}
