import type Lenis from 'lenis'

export function setLenis(lenis: Lenis | null) {
  if (typeof window !== 'undefined') {
    (window as unknown as { __lenis_instance?: Lenis | null }).__lenis_instance = lenis
    if (lenis && document.body.style.overflow === 'hidden') {
      lenis.stop()
    }
  }
}

export function getLenis(): Lenis | null {
  if (typeof window !== 'undefined') {
    return (window as unknown as { __lenis_instance?: Lenis | null }).__lenis_instance || null
  }
  return null
}

export function pauseLenis() {
  const lenis = getLenis()
  lenis?.stop()
}

export function resumeLenis() {
  const lenis = getLenis()
  lenis?.start()
}

export function scrollToTarget(
  target: HTMLElement | number | string,
  options?: { offset?: number; duration?: number }
) {
  const lenis = getLenis()

  if (lenis) {
    lenis.scrollTo(target, {
      offset: options?.offset ?? -30,
      duration: options?.duration ?? 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    })
    return
  }

  if (typeof window !== 'undefined') {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' })
    } else if (typeof target === 'string') {
      const el = document.getElementById(target)
      el?.scrollIntoView({ behavior: 'smooth' })
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
