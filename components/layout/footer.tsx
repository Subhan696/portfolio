"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { useEmail } from "@/lib/use-email";

const externalSocials = [
  { icon: Github, href: siteConfig.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.linkedin, label: "LinkedIn" },
];

const links = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const { compose } = useEmail();
  return (
    <footer className="relative z-10 border-t border-ivory/[0.06] bg-ink-950/55 backdrop-blur-sm">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-wine-600/60 to-transparent" />
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-3 md:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display text-2xl font-bold gradient-text">
              {siteConfig.name}
            </h3>
            <p className="mt-3 max-w-xs text-sm text-ivory/55">
              {siteConfig.title}. Building intelligent, beautiful, fast software.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xs uppercase tracking-widest text-ivory/40">
              Navigate
            </p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-ivory/70 hover:text-ivory transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xs uppercase tracking-widest text-ivory/40">
              Connect
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {externalSocials.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/10 bg-ivory/[0.03] text-ivory/70 hover:text-ivory hover:border-wine-600/40 hover:bg-wine-600/10 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
              <button
                type="button"
                onClick={() => compose()}
                aria-label="Send email via Gmail"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/10 bg-ivory/[0.03] text-ivory/70 hover:text-ivory hover:border-wine-600/40 hover:bg-wine-600/10 transition-all"
              >
                <Mail className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 text-xs text-ivory/40">{siteConfig.location}</p>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-ivory/[0.06] pt-6 sm:flex-row">
          <p className="text-xs text-ivory/45">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-ivory/45">
            Built with <Heart className="h-3 w-3 fill-wine-700 text-wine-700" />{" "}
            using Next.js, Tailwind, and Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
