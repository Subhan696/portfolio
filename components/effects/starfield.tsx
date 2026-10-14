"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  hasGlow: boolean;
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let width = 0;
    let height = 0;

    const initStars = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Star density inspired by the Silver Surfer cosmic backdrop (~200 to 350 stars)
      const count = Math.floor((width * height) / 4200);
      const starList: Star[] = [];

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        // Star sizes: majority are fine specks, a small proportion are larger glowing cosmic stars
        let radius = 0.5;
        let hasGlow = false;
        let baseAlpha = 0.25 + Math.random() * 0.45;

        if (rand > 0.96) {
          radius = 1.6 + Math.random() * 0.8;
          hasGlow = true;
          baseAlpha = 0.85 + Math.random() * 0.15;
        } else if (rand > 0.82) {
          radius = 1.0 + Math.random() * 0.5;
          baseAlpha = 0.55 + Math.random() * 0.35;
        } else if (rand > 0.4) {
          radius = 0.7 + Math.random() * 0.3;
        } else {
          radius = 0.4 + Math.random() * 0.3;
        }

        starList.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          baseAlpha,
          twinkleSpeed: 0.4 + Math.random() * 1.6,
          phase: Math.random() * Math.PI * 2,
          hasGlow,
        });
      }

      stars = starList;
    };

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.phase += star.twinkleSpeed * delta;

        // Smooth sinusoidal twinkle
        const twinkle = Math.sin(star.phase);
        const currentAlpha = Math.max(
          0.08,
          Math.min(1, star.baseAlpha + twinkle * 0.28)
        );

        if (star.hasGlow) {
          // Soft cosmic glow for prominent stars
          const glowGrad = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            star.radius * 3.5
          );
          glowGrad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha * 0.6})`);
          glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Subtle cross sparkle on prominent stars
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.4})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(star.x - star.radius * 3, star.y);
          ctx.lineTo(star.x + star.radius * 3, star.y);
          ctx.moveTo(star.x, star.y - star.radius * 3);
          ctx.lineTo(star.x, star.y + star.radius * 3);
          ctx.stroke();
        }

        // Star core
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    initStars();
    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      initStars();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
