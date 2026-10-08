"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
};

// Subtle cyber cyan, violet, and silver starlight palette
const COLORS = [
  "rgba(56,189,248,",  // cyan/sky
  "rgba(129,140,248,", // indigo/violet
  "rgba(226,232,240,", // cosmic silver
];

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();

    const count = Math.min(
      65,
      Math.floor((window.innerWidth * window.innerHeight) / 25000)
    );

    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 1.5 + 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: Math.random() * Math.PI * 2,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const ps = particlesRef.current;

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.008;
        const alpha = 0.25 + Math.sin(p.life) * 0.2;

        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;

        ctx.beginPath();
        ctx.fillStyle = `${p.color}${Math.max(0.05, alpha)})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Connect nearby particles with subtle filament lines
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56,189,248,${0.05 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-40"
    />
  );
}
