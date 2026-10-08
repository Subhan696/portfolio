/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    key: "ai",
    skills: [
      { name: "LLM Orchestration", slug: "openai", color: "#fff" },
      { name: "RAG Pipelines", slug: "langchain", color: "#fff" },
      { name: "LangChain", slug: "langchain", color: "#fff" },
      { name: "LangGraph", slug: "langchain", color: "#fff" },
      { name: "OpenAI GPT-4o", slug: "openai", color: "#fff" },
      { name: "Pinecone Vector DB", slug: "pinecone", color: "#fff" },
      { name: "Hugging Face", slug: "huggingface", color: "#FFD21E" },
      { name: "PyTorch", slug: "pytorch", color: "#EE4C2C" },
      { name: "Computer Vision", slug: "opencv", color: "#5C3EE8" },
      { name: "Pandas", slug: "pandas", color: "#150458" },
    ],
  },
  {
    key: "languages",
    skills: [
      { name: "Python", slug: "python", color: "#3776AB" },
      { name: "TypeScript", slug: "typescript", color: "#3178C6" },
      { name: "JavaScript", slug: "javascript", color: "#F7DF1E" },
      { name: "SQL", slug: "mysql", color: "#4479A1" },
      { name: "HTML5 / CSS3", slug: "html5", color: "#E34F26" },
      { name: "Java", slug: "openjdk", color: "#ED8B00" },
      { name: "C++", slug: "cplusplus", color: "#00599C" },
    ],
  },
  {
    key: "backend",
    skills: [
      { name: "FastAPI", slug: "fastapi", color: "#009688" },
      { name: "Node.js", slug: "nodedotjs", color: "#5FA04E" },
      { name: "Express.js", slug: "express", color: "#fff" },
      { name: "REST APIs", slug: "postman", color: "#FF6C37" },
      { name: "JWT Auth", slug: "jsonwebtokens", color: "#fff" },
      { name: "WebSockets", slug: "socketdotio", color: "#fff" },
    ],
  },
  {
    key: "frontend",
    skills: [
      { name: "React.js", slug: "react", color: "#61DAFB" },
      { name: "Next.js 15", slug: "nextdotjs", color: "#fff" },
      { name: "React Native", slug: "react", color: "#61DAFB" },
      { name: "Expo", slug: "expo", color: "#fff" },
      { name: "Tailwind CSS", slug: "tailwindcss", color: "#06B6D4" },
      { name: "Electron.js", slug: "electron", color: "#47848F" },
      { name: "Framer Motion", slug: "framer", color: "#0055FF" },
    ],
  },
  {
    key: "databases",
    skills: [
      { name: "PostgreSQL", slug: "postgresql", color: "#4169E1" },
      { name: "MongoDB", slug: "mongodb", color: "#47A248" },
      { name: "Pinecone", slug: "pinecone", color: "#fff" },
      { name: "Redis", slug: "redis", color: "#DC382D" },
      { name: "SQLite", slug: "sqlite", color: "#003B57" },
    ],
  },
  {
    key: "infra",
    skills: [
      { name: "Docker", slug: "docker", color: "#2496ED" },
      { name: "Git", slug: "git", color: "#F05032" },
      { name: "GitHub", slug: "github", color: "#fff" },
      { name: "Postman", slug: "postman", color: "#FF6C37" },
      { name: "Linux / Bash", slug: "linux", color: "#FCC624" },
      { name: "Nginx", slug: "nginx", color: "#009639" },
      { name: "Vercel", slug: "vercel", color: "#fff" },
    ],
  },
];

const marqueeSkills = categories.flatMap((c) => c.skills);

const categoryNames: Record<string, string> = {
  ai: "AI / ML & LLMs",
  languages: "Languages",
  backend: "Backend & APIs",
  frontend: "Frontend & Mobile",
  databases: "Databases & Storage",
  infra: "DevOps & Tools",
};

export function TechStack() {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    }

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <div className="w-full select-none" ref={containerRef}>
      <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm transition-all duration-300">
        <motion.div
          animate={{ height: isExpanded ? "auto" : "56px" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className="p-2">
            {!isExpanded && (
              <div
                onClick={() => setIsExpanded(true)}
                className="group relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-2 transition-colors hover:bg-gray-50/50 dark:hover:bg-zinc-900/50"
              >
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent" />

                <div className="flex w-max animate-infinite-scroll items-center gap-6">
                  {marqueeSkills.concat(marqueeSkills).map((skill, index) => (
                    <div
                      key={`${skill.name}-${index}`}
                      className="flex items-center gap-2 shrink-0"
                    >
                      <div className="h-3.5 w-3.5 shrink-0 transition-opacity">
                        <img
                          src={`https://cdn.simpleicons.org/${skill.slug}`}
                          alt={skill.name}
                          className={
                            skill.color === "#fff"
                              ? "h-full w-full object-contain opacity-50 group-hover:opacity-80 transition-opacity brightness-0 dark:brightness-0 dark:invert"
                              : "h-full w-full object-contain opacity-50 group-hover:opacity-80 transition-opacity brightness-0 group-hover:brightness-100 dark:brightness-0 dark:invert dark:group-hover:invert-0 dark:group-hover:brightness-100"
                          }
                          loading="lazy"
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300 transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="absolute right-3 z-20 flex items-center gap-1 rounded bg-white/80 dark:bg-zinc-900/80 px-1.5 py-0.5 text-[10px] font-mono text-gray-500 dark:text-gray-400 shadow-sm backdrop-blur-sm group-hover:text-black dark:group-hover:text-white transition-colors">
                  <span>expand</span>
                  <span>↓</span>
                </div>
              </div>
            )}

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="p-3"
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100 dark:border-zinc-800">
                    <span className="text-xs font-mono uppercase tracking-wider text-gray-500">
                      Full Technical Stack ({marqueeSkills.length} Technologies)
                    </span>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="text-[11px] font-mono text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                    >
                      collapse ↑
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                      <div key={category.key} className="space-y-3">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-zinc-800 pb-1.5">
                          {categoryNames[category.key]}
                        </h3>
                        <div className="grid grid-cols-1 gap-1.5">
                          {category.skills.map((skill) => (
                            <div
                              key={skill.name}
                              className="group flex items-center gap-2.5 rounded-lg border border-transparent p-1.5 transition-all hover:border-gray-100 dark:hover:border-zinc-800 hover:bg-gray-50/50 dark:hover:bg-zinc-900/50"
                            >
                              <div className="h-4 w-4 shrink-0 transition-all duration-300">
                                <img
                                  src={`https://cdn.simpleicons.org/${skill.slug}`}
                                  alt={skill.name}
                                  className={
                                    skill.color === "#fff"
                                      ? "h-full w-full object-contain opacity-50 group-hover:opacity-100 transition-all duration-300 brightness-0 dark:brightness-0 dark:invert"
                                      : "h-full w-full object-contain opacity-50 group-hover:opacity-100 transition-all duration-300 brightness-0 group-hover:brightness-100 dark:brightness-0 dark:invert dark:group-hover:invert-0 dark:group-hover:brightness-100"
                                  }
                                  loading="lazy"
                                />
                              </div>
                              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                                {skill.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
