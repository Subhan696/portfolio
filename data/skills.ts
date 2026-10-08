export type SkillGroup = {
  category: string;
  description: string;
  skills: { name: string; level: number }[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "AI & LLM Orchestration",
    description: "Designing reliable agentic architectures & RAG pipelines.",
    skills: [
      { name: "LLM Orchestration", level: 96 },
      { name: "LangChain & LangGraph", level: 95 },
      { name: "Retrieval-Augmented Generation (RAG)", level: 95 },
      { name: "OpenAI & GPT-4o APIs", level: 94 },
      { name: "Prompt Engineering", level: 94 },
      { name: "Vector Databases (Pinecone)", level: 90 },
      { name: "Semantic Search & Embeddings", level: 92 },
      { name: "NLP & Text Classification", level: 90 },
    ],
  },
  {
    category: "Languages & Frameworks",
    description: "Multi-language versatility across backend, frontend, and ML.",
    skills: [
      { name: "Python", level: 96 },
      { name: "TypeScript", level: 92 },
      { name: "JavaScript (ES6+)", level: 95 },
      { name: "SQL", level: 90 },
      { name: "FastAPI", level: 94 },
      { name: "Node.js & Express.js", level: 92 },
      { name: "React.js & Next.js", level: 94 },
      { name: "React Native (Expo)", level: 88 },
      { name: "Electron.js", level: 85 },
    ],
  },
  {
    category: "Databases & Storage",
    description: "Relational, document, and high-dimensional vector stores.",
    skills: [
      { name: "PostgreSQL", level: 92 },
      { name: "MongoDB", level: 90 },
      { name: "Pinecone Vector DB", level: 92 },
      { name: "SQLite", level: 90 },
      { name: "SQLAlchemy & Alembic", level: 90 },
      { name: "Mongoose", level: 88 },
    ],
  },
  {
    category: "Engineering & Tooling",
    description: "Architectural foundations, testing, and containerization.",
    skills: [
      { name: "Data Structures & Algorithms", level: 94 },
      { name: "Object-Oriented Programming (OOP)", level: 95 },
      { name: "REST API Design & JWT Auth", level: 94 },
      { name: "Docker & Containerization", level: 88 },
      { name: "Git & GitHub", level: 95 },
      { name: "Postman API Testing", level: 92 },
    ],
  },
];
