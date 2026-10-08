import { siteConfig } from "@/lib/site";

export default function Hero() {
  return (
    <section id="hero" className="py-16">
      {/* Role label */}
      <p className="mb-4 text-sm text-muted-foreground">
        {siteConfig.title}
      </p>

      {/* Main headline */}
      <h1 className="text-4xl sm:text-5xl font-semibold leading-[1.1] tracking-tight text-foreground mb-6">
        Building intelligent systems for automation, AI, and the web.
      </h1>

      {/* Bio */}
      <p className="text-sm leading-relaxed text-muted-foreground max-w-md">
        I architect and ship production AI systems — autonomous agents,
        real-time Voice AI assistants, NLP platforms, and full-stack web apps
        with clean architecture and thoughtful user experiences.
      </p>
    </section>
  );
}
