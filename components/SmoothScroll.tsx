"use client"

import { useEffect } from 'react'
import Lenis from 'lenis'
import { setLenis } from '@/lib/lenis-scroll'

export function SmoothScroll() {
  useEffect(() => {
    // Ultra-smooth momentum scrolling configuration
    const lenis = new Lenis({
      lerp: 0.08, // Buttery smooth momentum lerp (glide feeling)
      duration: 1.4, // Luxuriously smooth duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.92, // Avoid abrupt jumps
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
