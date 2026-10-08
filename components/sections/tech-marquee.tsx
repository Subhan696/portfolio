"use client";

const techs = [
  "LangGraph",
  "LangChain",
  "FastAPI",
  "Python",
  "RAG Pipelines",
  "OpenAI GPT-4o",
  "Pinecone",
  "React.js",
  "Next.js 15",
  "TypeScript",
  "PostgreSQL",
  "Docker",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
  "React Native",
  "Electron.js",
];

export default function TechMarquee() {
  const items = [...techs, ...techs];
  return (
    <div
      aria-label="Tech marquee"
      className="relative z-10 border-y border-white/[0.08] bg-black/40 backdrop-blur-sm py-6 overflow-hidden rounded-2xl"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#08090D] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#08090D] to-transparent"
        aria-hidden
      />
      <div className="flex w-max animate-marquee gap-10">
        {items.map((t, i) => (
          <div
            key={i}
            className="font-mono text-sm sm:text-base font-bold text-white/40 hover:text-sky-300 transition-colors whitespace-nowrap flex items-center"
          >
            {t}
            <span className="ml-10 text-sky-400/50 text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
