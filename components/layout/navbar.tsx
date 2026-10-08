"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Download, FileText } from "lucide-react";
import { siteConfig } from "@/lib/site";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "Experience", href: "#experience" },
  { name: "Tech Stack", href: "#skills" },
  { name: "GitHub & Repos", href: "#github" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
  { name: "Resume", href: siteConfig.resume, external: true },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const sections = ["hero", "experience", "skills", "github", "projects", "contact"];
    const onScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 -mx-6 lg:-mx-8 px-6 lg:px-8 py-3.5 mb-8 backdrop-blur-xl bg-[#08090D]/85 border-b border-white/[0.06] transition-all">
      <div className="flex items-center justify-between">
        {/* Name / Brand */}
        <Link
          href="#hero"
          className="flex items-center gap-2 text-base font-bold font-mono tracking-tight text-white hover:text-sky-300 transition-colors"
        >
          <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
          <span>{siteConfig.name}</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;
            return (
              <Link
                key={item.href}
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  isActive
                    ? "text-sky-300 bg-sky-500/10 font-medium"
                    : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-sky-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button: Download Resume */}
        <div className="flex items-center gap-3">
          <a
            href={siteConfig.resume}
            download="Subhan_Kashif_Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-xs font-mono transition-all"
          >
            <Download className="h-3 w-3" />
            <span className="hidden sm:inline">Resume</span>
          </a>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="p-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-white/60 hover:text-white transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="h-3.5 w-3.5" />
              ) : (
                <Moon className="h-3.5 w-3.5" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Nav row */}
      <nav className="flex md:hidden items-center gap-2 overflow-x-auto pt-2.5 pb-0.5 scrollbar-none">
        {navItems.map((item) => {
          const id = item.href.replace("#", "");
          const isActive = active === id;
          return (
            <Link
              key={item.href}
              href={item.href}
              {...(item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono whitespace-nowrap transition-all ${
                isActive
                  ? "text-sky-300 bg-sky-500/15 font-semibold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
