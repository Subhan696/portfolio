export type SkillGroup = {
  category: string;
  description: string;
  skills: { name: string; level: number }[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    description: "Crafting fast, accessible, beautiful UIs.",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 92 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "JavaScript", level: 95 },
      { name: "Bootstrap", level: 85 },
    ],
  },
  {
    category: "Backend",
    description: "APIs, services, and server-side logic.",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 90 },
      { name: "REST APIs", level: 92 },
      { name: "Authentication", level: 88 },
      { name: "EJS", level: 80 },
    ],
  },
  {
    category: "AI / ML",
    description: "Vision, language, and learning systems.",
    skills: [
      { name: "Python", level: 95 },
      { name: "PyTorch", level: 88 },
      { name: "TensorFlow", level: 85 },
      { name: "OpenCV", level: 90 },
      { name: "YOLO", level: 87 },
      { name: "Transformers", level: 88 },
      { name: "Vision Transformers", level: 85 },
      { name: "GANs", level: 82 },
      { name: "Gemini API", level: 90 },
      { name: "RAG Systems", level: 92 },
    ],
  },
  {
    category: "Databases",
    description: "Relational, document, and vector stores.",
    skills: [
      { name: "MongoDB", level: 90 },
      { name: "AstraDB", level: 85 },
      { name: "MySQL", level: 85 },
    ],
  },
  {
    category: "Tools",
    description: "Workflow, DevOps, and developer experience.",
    skills: [
      { name: "Git", level: 92 },
      { name: "GitHub", level: 92 },
      { name: "Docker", level: 80 },
      { name: "Postman", level: 90 },
      { name: "VS Code", level: 95 },
    ],
  },
];
