"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { siteConfig } from "@/lib/site";

const navItems = [
  { name: "Home", id: "hero" },
  { name: "Projects", id: "projects" },
  { name: "Contributions", id: "contributions" },
  { name: "GitHub", id: "github" },
  { name: "Resume", id: "resume" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const sections = ["hero", "projects", "contributions", "github", "resume", "contact"];
    const onScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActive(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  const isDark = resolvedTheme === "dark";

  return (
    <header className="mb-14">
      {/* Top Header Row: Name & Luxury Theme Toggle */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="#hero"
          onClick={(e) => handleNavClick(e, "hero")}
          className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-foreground hover:text-primary transition-colors flex items-center gap-2 group"
        >
          <span>{siteConfig.name}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary opacity-60 group-hover:opacity-100 transition-opacity" />
        </Link>

        {/* Minimalist Pill Theme Toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
            className="group relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-obsidian-800 border border-amber-400/20 p-0.5 transition-all duration-300 hover:border-amber-400/40"
          >
            <div
              className={`flex h-4.5 w-4.5 transform items-center justify-center rounded-full bg-primary text-obsidian-950 shadow-md transition-all duration-300 ease-out ${
                isDark ? "translate-x-5" : "translate-x-0"
              }`}
            >
              {isDark ? (
                <Moon className="h-2.5 w-2.5" />
              ) : (
                <Sun className="h-2.5 w-2.5" />
              )}
            </div>
          </button>
        )}
      </div>

      {/* Nav Links Row */}
      <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-mono">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`relative cursor-pointer transition-colors duration-200 underline-offset-8 hover:underline ${
                isActive
                  ? "text-primary font-semibold underline decoration-2 decoration-primary"
                  : "text-muted-foreground hover:text-foreground decoration-white/20"
              }`}
            >
              {item.name}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
