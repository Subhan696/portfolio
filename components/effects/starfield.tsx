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

    const initStars = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      cx = width / 2;
      cy = height / 2;
      maxDist = Math.hypot(cx, cy) * 1.2;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const count = Math.floor((width * height) / 3800);
      const starList: Star[] = [];

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
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
          twinkleSpeed: 0.4 + Math.random() * 1.6,
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
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Determine target warp speed based on launch phase
      let targetWarp = 0;
      if (launchPhaseRef.current === "charging") {
        targetWarp = 3;
      } else if (launchPhaseRef.current === "warp") {
        targetWarp = 38;
      } else {
        targetWarp = 0;
      }

      // Smooth acceleration / deceleration
      const rate = targetWarp > warpSpeed ? 4.5 : 2.5;
      warpSpeed += (targetWarp - warpSpeed) * Math.min(1, delta * rate);

      ctx.clearRect(0, 0, width, height);

      const isWarpActive = warpSpeed > 0.2;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (isWarpActive) {
          // Spaceship warp trajectory outward from center
          star.dist += warpSpeed * (0.8 + star.radius * 0.4);

          // Wrap around if star moves beyond screen bounds
          if (star.dist > maxDist) {
            star.dist = Math.random() * 60 + 10;
            star.angle = Math.random() * Math.PI * 2;
          }

          const curX = cx + Math.cos(star.angle) * star.dist;
          const curY = cy + Math.sin(star.angle) * star.dist;

          // Streak tail
          const tailLength = warpSpeed * (2.8 + star.radius * 1.6);
          const prevDist = Math.max(0, star.dist - tailLength);
          const prevX = cx + Math.cos(star.angle) * prevDist;
          const prevY = cy + Math.sin(star.angle) * prevDist;

          const streakAlpha = Math.min(1, 0.3 + (warpSpeed / 38) * 0.7);

          // Draw hyperspace streak line
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(curX, curY);

          if (star.hasGlow) {
            ctx.strokeStyle = `rgba(180, 230, 255, ${streakAlpha})`;
            ctx.lineWidth = Math.min(3.5, star.radius * (1 + warpSpeed * 0.05));
          } else {
            ctx.strokeStyle = `rgba(255, 255, 255, ${streakAlpha * 0.85})`;
            ctx.lineWidth = Math.min(2.5, star.radius * (1 + warpSpeed * 0.03));
          }
          ctx.stroke();

          // Star head dot
          ctx.fillStyle = `rgba(255, 255, 255, ${streakAlpha})`;
          ctx.beginPath();
          ctx.arc(curX, curY, star.radius * 0.8, 0, Math.PI * 2);
          ctx.fill();

          // Keep current coordinates synced
          star.x = curX;
          star.y = curY;
        } else {
          // Peaceful cosmic twinkling mode
          star.phase += star.twinkleSpeed * delta;
          const twinkle = Math.sin(star.phase);
          const currentAlpha = Math.max(
            0.08,
            Math.min(1, star.baseAlpha + twinkle * 0.28)
          );

          // Gently lerp back towards original resting position if displaced
          star.x += (star.origX - star.x) * Math.min(1, delta * 3);
          star.y += (star.origY - star.y) * Math.min(1, delta * 3);

          if (star.hasGlow) {
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

            ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.4})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(star.x - star.radius * 3, star.y);
            ctx.lineTo(star.x + star.radius * 3, star.y);
            ctx.moveTo(star.x, star.y - star.radius * 3);
            ctx.lineTo(star.x, star.y + star.radius * 3);
            ctx.stroke();
          }

          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fill();
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
