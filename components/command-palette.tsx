"use client";

import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { Command } from "cmdk";
import {
  Code2,
  FileText,
  Github,
  Home,
  Mail,
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  Linkedin,
  Search,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import { useEmail } from "@/lib/use-email";

type Ctx = { open: boolean; setOpen: (v: boolean) => void };
const CommandPaletteCtx = createContext<Ctx>({ open: false, setOpen: () => {} });

export function useCommandPalette() {
  return useContext(CommandPaletteCtx);
}

export default function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { compose } = useEmail();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(href, "_blank");
    }
  };

  return (
    <CommandPaletteCtx.Provider value={{ open, setOpen }}>
      {children}
      {open && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh]">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in"
            onClick={() => setOpen(false)}
          />
          <Command
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-ivory/10 bg-ink-900/95 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95"
            label="Command palette"
          >
            <div className="flex items-center gap-2 border-b border-ivory/10 px-4">
              <Search className="h-4 w-4 text-ivory/50" />
              <Command.Input
                placeholder="Type a command or search..."
                className="flex h-12 w-full bg-transparent text-sm text-ivory placeholder:text-ivory/40 outline-none"
              />
              <kbd className="font-mono text-[10px] text-ivory/40 border border-ivory/10 rounded px-1.5 py-0.5">
                ESC
              </kbd>
            </div>
            <Command.List className="max-h-[60vh] overflow-y-auto p-2">
              <Command.Empty className="p-6 text-center text-sm text-ivory/50">
                No results found.
              </Command.Empty>
              <Command.Group
                heading="Navigation"
                className="text-xs font-medium uppercase tracking-widest text-ivory/40 px-2 py-1.5"
              >
                <PaletteItem
                  icon={Home}
                  label="Hero"
                  onSelect={() => go("#hero")}
                />
                <PaletteItem
                  icon={User}
                  label="About"
                  onSelect={() => go("#about")}
                />
                <PaletteItem
                  icon={Code2}
                  label="Skills"
                  onSelect={() => go("#skills")}
                />
                <PaletteItem
                  icon={Sparkles}
                  label="Projects"
                  onSelect={() => go("#projects")}
                />
                <PaletteItem
                  icon={Briefcase}
                  label="Experience"
                  onSelect={() => go("#experience")}
                />
                <PaletteItem
                  icon={GraduationCap}
                  label="Education"
                  onSelect={() => go("#education")}
                />
                <PaletteItem
                  icon={Mail}
                  label="Contact"
                  onSelect={() => go("#contact")}
                />
              </Command.Group>
              <Command.Group
                heading="Links"
                className="text-xs font-medium uppercase tracking-widest text-ivory/40 px-2 py-1.5 mt-2"
              >
                <PaletteItem
                  icon={Github}
                  label="GitHub"
                  shortcut="↗"
                  onSelect={() => go(siteConfig.github)}
                />
                <PaletteItem
                  icon={Linkedin}
                  label="LinkedIn"
                  shortcut="↗"
                  onSelect={() => go(siteConfig.linkedin)}
                />
                <PaletteItem
                  icon={FileText}
                  label="Download Resume"
                  shortcut="↗"
                  onSelect={() => go(siteConfig.resume)}
                />
                <PaletteItem
                  icon={Mail}
                  label="Send Email (Gmail)"
                  shortcut="↗"
                  onSelect={() => {
                    setOpen(false);
                    compose();
                  }}
                />
              </Command.Group>
            </Command.List>
          </Command>
        </div>
      )}
    </CommandPaletteCtx.Provider>
  );
}

function PaletteItem({
  icon: Icon,
  label,
  shortcut,
  onSelect,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  shortcut?: string;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ivory/80 aria-selected:bg-ivory/[0.06] aria-selected:text-ivory"
    >
      <Icon className="h-4 w-4 text-ivory/60" />
      <span className="flex-1">{label}</span>
      {shortcut && (
        <span className="text-xs text-ivory/40">{shortcut}</span>
      )}
    </Command.Item>
  );
}
