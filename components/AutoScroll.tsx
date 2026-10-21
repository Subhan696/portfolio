"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getSectionFromPathname } from '@/lib/site-routing'
import { scrollToTarget } from '@/lib/lenis-scroll'

export function AutoScroll() {
  const pathname = usePathname()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const section = getSectionFromPathname(pathname)

      if (section) {
        scrollToTarget(section, { offset: -30, duration: 1.3 })
        return
      }

      if (pathname === '/') {
        scrollToTarget(0, { duration: 1.3 })
      }
    }, 100)
    return () => clearTimeout(timeoutId)
  }, [pathname])

  return null
}
