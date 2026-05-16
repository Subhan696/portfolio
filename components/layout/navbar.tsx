"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCommandPalette } from "@/components/command-palette";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "GitHub", href: "#github" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { setOpen: setCmdOpen } = useCommandPalette();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // Active section detection
      const sections = navItems.map((n) => n.href.slice(1));
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > 100) {
          setActive(id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div className="container">
          <div
            className={cn(
              "flex items-center justify-between rounded-full border px-4 py-2 transition-all sm:px-6",
              scrolled
                ? "border-ivory/10 bg-ink-900/65 backdrop-blur-xl shadow-[0_0_30px_-15px_rgba(155,29,62,0.45)]"
                : "border-ivory/[0.05] bg-ivory/[0.02] backdrop-blur-md"
            )}
          >
            <Link
              href="#hero"
              className="group flex items-center gap-2 text-ivory"
            >
              <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-wine-300 via-wine-600 to-wine-700">
                <Sparkles className="h-4 w-4 text-ivory" />
                <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-wine-300 via-wine-600 to-wine-700 opacity-50 blur-md group-hover:opacity-80 transition-opacity" />
              </span>
              <span className="font-display font-bold tracking-tight">
                portfolio<span className="text-wine-600">.</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3 py-1.5 text-sm transition-colors",
                    active === item.href.slice(1)
                      ? "text-ivory"
                      : "text-ivory/60 hover:text-ivory"
                  )}
                >
                  {active === item.href.slice(1) && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-ivory/[0.08] border border-ivory/10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative">{item.name}</span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCmdOpen(true)}
                className="hidden md:flex items-center gap-2 rounded-full border border-ivory/10 bg-ivory/[0.03] px-3 py-1.5 text-xs text-ivory/60 hover:text-ivory hover:bg-ivory/[0.06] transition-colors"
                aria-label="Open command palette"
              >
                <Command className="h-3.5 w-3.5" />
                <kbd className="font-mono">⌘K</kbd>
              </button>
              <Button
                variant="accent"
                size="sm"
                asChild
                className="hidden sm:inline-flex"
              >
                <Link href="#contact">Let's talk</Link>
              </Button>
              <button
                className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-ivory/10 bg-ivory/[0.03] text-ivory"
                onClick={() => setOpen((o) => !o)}
                aria-label="Toggle menu"
              >
                {open ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden"
          >
            <div className="rounded-2xl border border-ivory/10 bg-ink-900/85 p-4 backdrop-blur-xl">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-ivory/80 hover:bg-ivory/[0.06] hover:text-ivory"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
