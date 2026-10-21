"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export type LaunchPhase = "idle" | "charging" | "warp" | "arrived";

interface IntroContextType {
  isLaunched: boolean;
  isWarping: boolean;
  launchPhase: LaunchPhase;
  triggerLaunch: () => void;
}

const IntroContext = createContext<IntroContextType>({
  isLaunched: false,
  isWarping: false,
  launchPhase: "idle",
  triggerLaunch: () => {},
});

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [isLaunched, setIsLaunched] = useState<boolean>(false);
  const [launchPhase, setLaunchPhase] = useState<LaunchPhase>("idle");

  const triggerLaunch = useCallback(() => {
    if (launchPhase !== "idle") return;

    // Phase 1: Thrusters charging (0 - 350ms)
    setLaunchPhase("charging");

    // Phase 2: Hyperspace warp jump (350ms - 1300ms)
    setTimeout(() => {
      setLaunchPhase("warp");
    }, 350);

    // Phase 3: Hyperspace drop-in / Arrival (1300ms)
    setTimeout(() => {
      setLaunchPhase("arrived");
      setIsLaunched(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("portfolio_intro_passed", "true");
      }
    }, 1300);
  }, [launchPhase]);

  // Check if session previously passed intro
  useEffect(() => {
    if (typeof window !== "undefined") {
      const passed = sessionStorage.getItem("portfolio_intro_passed");
      if (passed === "true") {
        setIsLaunched(true);
        setLaunchPhase("arrived");
      }
    }
  }, []);

  const isWarping = launchPhase === "charging" || launchPhase === "warp";

  return (
    <IntroContext.Provider
      value={{
        isLaunched,
        isWarping,
        launchPhase,
        triggerLaunch,
      }}
    >
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
