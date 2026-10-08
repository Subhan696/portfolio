import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/projects";

export default function Projects() {
  const featured = projects.slice(0, 4);

  return (
    <section id="projects" className="py-12">
      <div className="hairline mb-8" />
      <h2 className="section-heading">Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {featured.map((p) => (
          <article key={p.slug} className="flex flex-col gap-3">
            {/* Title + links */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground text-sm leading-snug">
                {p.title}
              </h3>
              <div className="flex items-center gap-2 flex-none mt-0.5">
                {p.github && (
                  <Link
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title} on GitHub`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" />
                  </Link>
                )}
                {p.demo && (
                  <Link
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title} live demo`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {p.summary}
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {p.tech.slice(0, 5).map((t) => (
                <span key={t} className="tech-pill">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {projects.length > 4 && (
        <div className="mt-10">
          <Link
            href="https://github.com/Subhan696"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            Show All Projects →
          </Link>
        </div>
      )}
    </section>
  );
}
