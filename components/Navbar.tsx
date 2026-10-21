"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'
import { buildSectionPath, getSectionFromPathname, isDetailPath, type SectionSlug } from '@/lib/site-routing'
import { useIntro } from './effects/intro-context'
import { scrollToTarget } from '@/lib/lenis-scroll'

const NAV_LINKS = [
  { label: 'Home', slug: 'top' as const, path: buildSectionPath() },
  { label: 'Live Builds', slug: 'live-builds' as const, path: buildSectionPath('live-builds') },
  { label: 'Projects', slug: 'projects' as const, path: buildSectionPath('projects') },
  { label: 'Experience', slug: 'experience' as const, path: buildSectionPath('experience') },
  { label: 'Education', slug: 'education' as const, path: buildSectionPath('education') },
  { label: 'Contact', slug: 'contact' as const, path: buildSectionPath('contact') },
  { label: 'Resume', slug: 'resume' as const, path: buildSectionPath('resume') },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { isLaunched } = useIntro()

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: SectionSlug | 'top', urlPath: string) => {
    e.preventDefault()

    const currentSection = getSectionFromPathname(pathname)
    const isHomeShell = pathname === '/' || (currentSection !== null && !isDetailPath(pathname, 'projects'))

    if (!isHomeShell) {
      router.push(urlPath)
      return
    }

    if (targetId === 'top') {
      scrollToTarget(0, { duration: 1.4 })
      window.history.pushState(null, '', urlPath)
      return
    }

    const target = document.getElementById(targetId)
    if (target) {
      scrollToTarget(target, { offset: -30, duration: 1.4 })
      window.history.pushState(null, '', urlPath)
    } else {
      router.push(urlPath)
    }
  }

  const getLinkClass = (isActive: boolean) => isActive 
    ? "cursor-pointer underline underline-offset-8 hover:decoration-2 decoration-2 hover:decoration-black dark:hover:decoration-white hover:text-black dark:hover:text-white transition-colors"
    : "cursor-pointer underline underline-offset-8 hover:decoration-2 hover:decoration-black/50 hover:text-black/70 dark:hover:text-white transition-colors"

  return (
    <header className="-mx-6 -mt-6 mb-10 flex flex-col gap-5 bg-transparent px-6 pt-4 pb-3 lg:-mx-12 lg:-mt-12 lg:px-12 lg:pt-6 lg:pb-4">
      {/* Brand Title: Subhan Kashif - Significantly Bigger with Spaceship Outer-to-Inner Arrival Effect */}
      <div className="flex items-center justify-between gap-3 pe-24 sm:pe-28">
        <span data-state="closed" className="min-w-0 flex-1">
          <motion.div
            initial={{ scale: 2.4, opacity: 0, filter: "blur(20px)", y: -30 }}
            animate={isLaunched ? { scale: 1, opacity: 1, filter: "blur(0px)", y: 0 } : { scale: 2.4, opacity: 0, filter: "blur(20px)", y: -30 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          >
            <Link 
              className="inline-block text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-bold tracking-tight text-white hover:opacity-90 transition-opacity leading-none py-1" 
              href="/"
            >
              Subhan Kashif
            </Link>
          </motion.div>
        </span>
      </div>

      {/* Floating Theme Toggle */}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 mx-auto flex w-full justify-end px-6 md:w-[50%] lg:top-6 lg:px-12">
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </div>

      {/* Navigation Links with Staggered Outer-to-Inner Spaceship Arrival */}
      <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-mono">
        {NAV_LINKS.map((link, idx) => {
          const isActive = (link.slug === 'top' && pathname === '/') || pathname === `/${link.slug}`
          return (
            <motion.div
              key={link.slug}
              initial={{ scale: 1.9, opacity: 0, filter: "blur(12px)", y: -15 }}
              animate={isLaunched ? { scale: 1, opacity: 1, filter: "blur(0px)", y: 0 } : { scale: 1.9, opacity: 0, filter: "blur(12px)", y: -15 }}
              transition={{
                duration: 0.85,
                delay: 0.15 + idx * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <a
                href={link.path}
                onClick={(e) => handleScroll(e, link.slug, link.path)}
                className={getLinkClass(isActive)}
              >
                {link.label}
              </a>
            </motion.div>
          )
        })}
      </nav>
    </header>
  )
}
