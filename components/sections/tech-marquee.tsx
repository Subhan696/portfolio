"use client";

const techs = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Framer Motion",
  "Node.js",
  "Express",
  "MongoDB",
  "Python",
  "PyTorch",
  "TensorFlow",
  "OpenCV",
  "YOLO",
  "Transformers",
  "Gemini",
  "RAG",
  "AstraDB",
  "Docker",
  "Git",
  "GSAP",
];

export default function TechMarquee() {
  const items = [...techs, ...techs];
  return (
    <section
      aria-label="Tech marquee"
      className="relative z-10 border-y border-ivory/[0.06] bg-ink-950/45 backdrop-blur-sm py-8 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent"
        aria-hidden
      />
      <div className="flex w-max animate-marquee gap-12">
        {items.map((t, i) => (
          <div
            key={i}
            className="font-display text-2xl font-bold text-ivory/30 hover:text-ivory transition-colors whitespace-nowrap"
          >
            {t}
            <span className="ml-12 text-wine-600/40">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
