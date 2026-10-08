"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

const movingMap: Record<Direction, string> = {
  TOP: "radial-gradient(22% 50% at 50% 0%, #E5C378 0%, transparent 100%)",
  LEFT: "radial-gradient(18% 45% at 0% 50%, #E5C378 0%, transparent 100%)",
  BOTTOM:
    "radial-gradient(22% 50% at 50% 100%, #E5C378 0%, transparent 100%)",
  RIGHT:
    "radial-gradient(18% 45% at 100% 50%, #E5C378 0%, transparent 100%)",
};

const highlight =
  "radial-gradient(75% 180% at 50% 50%, #E5C378 0%, rgba(229,195,120,0.2) 50%, transparent 100%)";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1.2,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((currentDirection) => {
          const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
          const currentIndex = directions.indexOf(currentDirection);
          const nextIndex = clockwise
            ? (currentIndex - 1 + directions.length) % directions.length
            : (currentIndex + 1) % directions.length;
          return directions[nextIndex];
        });
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border border-amber-400/20 content-center bg-black/40 hover:bg-black/20 transition duration-500 dark:bg-white/[0.03] items-center flex-col flex-nowrap h-min justify-center overflow-visible p-px decoration-clone w-fit cursor-pointer",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto text-foreground z-10 bg-background/90 px-3.5 py-1.5 rounded-[inherit] transition-colors",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        )}
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div className="bg-background/95 absolute z-1 flex-none inset-[1.5px] rounded-[100px]" />
    </Tag>
  );
}
