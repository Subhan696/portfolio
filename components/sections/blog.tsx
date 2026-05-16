"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, BookOpen } from "lucide-react";
import { Section } from "@/components/ui/section";

const posts = [
  {
    title: "Building a RAG chatbot from scratch with Gemini + AstraDB",
    excerpt:
      "What I learned shipping a production RAG system — retrieval, evaluation, latency, and the pieces no tutorial talks about.",
    date: "Coming soon",
    readTime: "8 min",
    category: "AI Engineering",
  },
  {
    title: "Stereo vision for depth — calibration, disparity & landmarks",
    excerpt:
      "End-to-end notes on building a stereo depth pipeline that actually works outside a lab.",
    date: "Coming soon",
    readTime: "10 min",
    category: "Computer Vision",
  },
  {
    title: "Designing AI-native UIs that feel fast",
    excerpt:
      "Streaming, optimistic UI, and the design decisions behind interfaces that hide latency.",
    date: "Coming soon",
    readTime: "6 min",
    category: "Frontend",
  },
];

export default function Blog() {
  return (
    <Section
      id="blog"
      eyebrow="Writing"
      title={
        <>
          Notes from the <span className="gradient-text">workbench</span>
        </>
      }
      description="Long-form posts on AI engineering, computer vision, and frontend craft. Coming soon."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="group relative overflow-hidden rounded-2xl border border-ivory/[0.08] bg-ivory/[0.02] p-6 backdrop-blur-xl card-hover"
          >
            <div className="flex items-center gap-2 text-xs text-ivory/45">
              <BookOpen className="h-3.5 w-3.5" />
              {p.category}
              <span className="h-1 w-1 rounded-full bg-ivory/20" />
              <Clock className="h-3.5 w-3.5" />
              {p.readTime}
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold text-ivory group-hover:gradient-text transition-all">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-ivory/60">{p.excerpt}</p>
            <div className="mt-5 flex items-center justify-between text-xs text-ivory/45">
              <span>{p.date}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
