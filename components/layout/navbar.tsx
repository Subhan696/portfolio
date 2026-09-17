"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { siteConfig } from "@/lib/site";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
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
    const sections = ["hero", "projects", "experience", "contact"];
    const onScroll = () => {
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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="mb-12">
      {/* Name + Theme Toggle */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="#hero"
          className="text-xl font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          {siteConfig.name}
        </Link>

        {/* Theme toggle pill */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="h-3.5 w-3.5" />
            ) : (
              <Moon className="h-3.5 w-3.5" />
            )}
            <span>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex flex-wrap items-center gap-x-6 gap-y-1">
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
              className={`relative text-sm pb-0.5 transition-colors ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.name}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
