export type Experience = {
  role: string;
  company: string;
  period: string;
  type: "Work" | "Project" | "Research";
  description: string;
  stack: string[];
};

export const experiences: Experience[] = [
  {
    role: "Freelance AI / Full-Stack Engineer",
    company: "Independent",
    period: "2024 — Present",
    type: "Work",
    description:
      "Building production AI features — RAG chatbots, vector search, and full-stack web apps — for early-stage startups and individual founders.",
    stack: ["Next.js", "TypeScript", "Gemini", "AstraDB", "Node.js"],
  },
  {
    role: "Computer Vision Research",
    company: "Independent Research",
    period: "2024",
    type: "Research",
    description:
      "Stereo vision pipelines, depth estimation, and landmark detection. Explored Vision Transformers and GAN-based augmentation strategies.",
    stack: ["Python", "PyTorch", "OpenCV", "ViT"],
  },
  {
    role: "Full-Stack Web Developer",
    company: "Personal & Academic Projects",
    period: "2023 — 2024",
    type: "Project",
    description:
      "Shipped voting platforms, CRUD apps, and authenticated web tools. Strong focus on clean APIs and server-rendered UX.",
    stack: ["Node.js", "Express", "MongoDB", "EJS"],
  },
  {
    role: "Parallel Computing Coursework",
    company: "University",
    period: "2023",
    type: "Project",
    description:
      "Built and benchmarked parallel data structures with OpenCilk. Studied work–span analysis and scalability trade-offs.",
    stack: ["C++", "Cilk", "Benchmarking"],
  },
];
