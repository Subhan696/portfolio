import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-auto flex flex-nowrap items-center justify-between gap-x-3 border-t border-amber-400/10 py-8 text-start font-mono text-[11px] text-muted-foreground sm:text-xs">
      <p className="font-serif text-sm tracking-tight text-foreground sm:text-base">
        {siteConfig.name}
      </p>

      <div className="ms-auto flex shrink-0 items-center justify-end gap-x-3 sm:gap-x-5 text-end">
        <a
          href={`mailto:${siteConfig.email}`}
          className="hover:text-primary transition-colors"
        >
          Email
        </a>
        <Link
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          GitHub
        </Link>
        <Link
          href={siteConfig.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          LinkedIn
        </Link>
      </div>
    </footer>
  );
}
