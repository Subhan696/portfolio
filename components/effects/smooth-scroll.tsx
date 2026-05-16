"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Note: ScrollTrigger registration is safe on client only.
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    // Refresh ScrollTrigger after mount for any GSAP-driven animations on the page.
    ScrollTrigger.refresh();
  }, []);
  return null;
}
