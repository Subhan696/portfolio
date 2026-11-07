"use client";

import { useEffect, useRef } from "react";
import { useIntro } from "./intro-context";

interface Star {
  x: number;
  y: number;
  origX: number;
  origY: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  hasGlow: boolean;
  angle: number;
  dist: number;
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { launchPhase } = useIntro();
  const launchPhaseRef = useRef(launchPhase);

  useEffect(() => {
    launchPhaseRef.current = launchPhase;
  }, [launchPhase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let maxDist = 0;
    let warpSpeed = 0;

    // Pre-rendered offscreen sprite for glowing stars (avoids creating gradients per frame)
    let glowSprite: HTMLCanvasElement | null = null;
    const createGlowSprite = () => {
      const sprite = document.createElement("canvas");
      sprite.width = 32;
      sprite.height = 32;
      const sCtx = sprite.getContext("2d");
      if (sCtx) {
        const grad = sCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
        grad.addColorStop(0.3, "rgba(180, 230, 255, 0.4)");
        grad.addColorStop(1, "rgba(180, 230, 255, 0)");
        sCtx.fillStyle = grad;
        sCtx.beginPath();
        sCtx.arc(16, 16, 16, 0, Math.PI * 2);
        sCtx.fill();
      }
      return sprite;
    };
    glowSprite = createGlowSprite();

    const initStars = () => {
      // Keep DPR at 1 on standard/integrated displays to avoid fillrate choke
      const dpr = 1;
      width = window.innerWidth;
      height = window.innerHeight;
      cx = width / 2;
      cy = height / 2;
      maxDist = Math.hypot(cx, cy) * 1.15;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Optimized star count for maximum 60fps on integrated graphics
      const count = Math.min(220, Math.floor((width * height) / 5200));
      const starList: Star[] = [];

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        let radius = 0.5;
        let hasGlow = false;
        let baseAlpha = 0.25 + Math.random() * 0.45;

        if (rand > 0.93) {
          radius = 1.4;
          hasGlow = true;
          baseAlpha = 0.85;
        } else if (rand > 0.8) {
          radius = 1.0;
          baseAlpha = 0.6;
        } else {
          radius = 0.5;
        }

        const sx = Math.random() * width;
        const sy = Math.random() * height;
        const angle = Math.atan2(sy - cy, sx - cx);
        const dist = Math.hypot(sx - cx, sy - cy);

        starList.push({
          x: sx,
          y: sy,
          origX: sx,
          origY: sy,
          radius,
          baseAlpha,
          twinkleSpeed: 0.5 + Math.random() * 1.2,
          phase: Math.random() * Math.PI * 2,
          hasGlow,
          angle,
          dist,
        });
      }

      stars = starList;
    };

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      // Determine target warp speed based on launch phase
      let targetWarp = 0;
      if (launchPhaseRef.current === "charging") {
        targetWarp = 4;
      } else if (launchPhaseRef.current === "warp") {
        targetWarp = 32;
      } else {
        targetWarp = 0;
      }

      const rate = targetWarp > warpSpeed ? 5.0 : 3.0;
      warpSpeed += (targetWarp - warpSpeed) * Math.min(1, delta * rate);

      ctx.clearRect(0, 0, width, height);

      const isWarpActive = warpSpeed > 0.2;

      if (isWarpActive) {
        // High-performance batched warp drawing: single stroke call for all streaks
        ctx.strokeStyle = "rgba(200, 235, 255, 0.85)";
        ctx.lineWidth = 1.6;
        ctx.beginPath();

        const tailFactor = warpSpeed * 2.4;

        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];
          star.dist += warpSpeed * (0.9 + star.radius * 0.3);

          if (star.dist > maxDist) {
            star.dist = Math.random() * 50 + 10;
            star.angle = Math.random() * Math.PI * 2;
          }

          const curX = cx + Math.cos(star.angle) * star.dist;
          const curY = cy + Math.sin(star.angle) * star.dist;

          const prevDist = Math.max(0, star.dist - tailFactor);
          const prevX = cx + Math.cos(star.angle) * prevDist;
          const prevY = cy + Math.sin(star.angle) * prevDist;

          ctx.moveTo(prevX, prevY);
          ctx.lineTo(curX, curY);

          star.x = curX;
          star.y = curY;
        }
        ctx.stroke();

        // Batch all star heads in a single fill call
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];
          ctx.moveTo(star.x + star.radius, star.y);
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        }
        ctx.fill();
      } else {
        // Batched tranquil twinkling stars: 1 fill call for all normal stars
        ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
        ctx.beginPath();

        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];
          star.phase += star.twinkleSpeed * delta;

          // Smoothly return towards original coordinates
          if (Math.abs(star.x - star.origX) > 0.5) {
            star.x += (star.origX - star.x) * Math.min(1, delta * 3.5);
            star.y += (star.origY - star.y) * Math.min(1, delta * 3.5);
          }

          ctx.moveTo(star.x + star.radius, star.y);
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        }
        ctx.fill();

        // Fast blit pre-rendered sprite for the glowing stars (zero gradient creation)
        if (glowSprite) {
          for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            if (star.hasGlow) {
              const size = star.radius * 7;
              ctx.drawImage(glowSprite, star.x - size / 2, star.y - size / 2, size, size);
            }
          }
        }
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
