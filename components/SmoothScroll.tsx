"use client"

import { useEffect } from 'react'
import Lenis from 'lenis'
import { setLenis } from '@/lib/lenis-scroll'

export function SmoothScroll() {
  useEffect(() => {
    // High-performance smooth scrolling optimized for all GPUs (including integrated Intel graphics)
    const lenis = new Lenis({
      lerp: 0.1, // Snappy, low-overhead momentum lerp
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false,
    })

    setLenis(lenis)

    let animationFrameId: number

    function raf(time: number) {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(raf)
    }

    animationFrameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(animationFrameId)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return null
}
