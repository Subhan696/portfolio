export type Skill = {
  name: string;
  level: number;
  featured?: boolean;
};

export type SkillCategory = {
  id: string;
  name: string;
  icon: string;
  description: string;
  skills: Skill[];
};

export const techStackCategories: SkillCategory[] = [
  {
    id: "ai-ml",
    name: "AI / ML & LLMs",
    icon: "Brain",
    description:
      "Production LLM orchestration, RAG architectures, prompt engineering, and semantic search.",
    skills: [
      { name: "LLM Orchestration", level: 95, featured: true },
      { name: "RAG Architectures", level: 95, featured: true },
      { name: "Prompt Engineering", level: 92, featured: true },
      { name: "OpenAI & GPT-4o API", level: 94, featured: true },
      { name: "LangChain", level: 92, featured: true },
      { name: "LangGraph", level: 90, featured: true },
      { name: "Vector Databases (Pinecone)", level: 92, featured: true },
      { name: "Semantic Search", level: 90 },
      { name: "Natural Language Processing (NLP)", level: 88 },
      { name: "Embeddings & Reranking", level: 90 },
      { name: "Computer Vision (OpenCV)", level: 85 },
      { name: "PyTorch", level: 82 },
    ],
  },
  {
    id: "languages",
    name: "Languages",
    icon: "Code2",
    description:
      "Core programming languages used across AI pipelines, backend services, and client applications.",
    skills: [
      { name: "Python", level: 96, featured: true },
      { name: "TypeScript", level: 92, featured: true },
      { name: "JavaScript (ES6+)", level: 95, featured: true },
      { name: "SQL", level: 90, featured: true },
      { name: "HTML5 / CSS3", level: 95 },
      { name: "Java", level: 82 },
      { name: "C++", level: 78 },
    ],
  },
  {
    id: "backend",
    name: "Backend & APIs",
    icon: "Server",
    description:
      "Scalable API design, asynchronous services, authentication protocols, and microservices.",
    skills: [
      { name: "FastAPI", level: 92, featured: true },
      { name: "Node.js", level: 94, featured: true },
      { name: "Express.js", level: 92, featured: true },
      { name: "REST API Design", level: 95, featured: true },
      { name: "JWT Authentication", level: 90, featured: true },
      { name: "Bcrypt & Security", level: 88 },
      { name: "WebSockets & SSE", level: 85 },
      { name: "Serverless Functions", level: 86 },
    ],
  },
  {
    id: "frontend",
    name: "Frontend & Mobile",
    icon: "Layout",
    description:
      "Modern reactive web user experiences, cross-platform mobile apps, and desktop tools.",
    skills: [
      { name: "React.js", level: 95, featured: true },
      { name: "Next.js 15", level: 92, featured: true },
      { name: "React Native (Expo)", level: 86, featured: true },
      { name: "Electron.js", level: 88, featured: true },
      { name: "Tailwind CSS", level: 95, featured: true },
      { name: "Responsive UI", level: 94 },
      { name: "Component Architecture", level: 92 },
      { name: "Framer Motion", level: 90 },
    ],
  },
  {
    id: "databases",
    name: "Databases & Storage",
    icon: "Database",
    description:
      "Relational schemas, NoSQL document collections, vector stores, and ORM mappers.",
    skills: [
      { name: "PostgreSQL", level: 92, featured: true },
      { name: "MongoDB", level: 90, featured: true },
      { name: "Pinecone Vector DB", level: 92, featured: true },
      { name: "SQLite", level: 90 },
      { name: "SQL Server", level: 84 },
      { name: "SQLAlchemy", level: 88 },
      { name: "Mongoose", level: 90 },
    ],
  },
  {
    id: "tools",
    name: "Tools & DevOps",
    icon: "Wrench",
    description:
      "Containerization, source control, testing suites, reverse proxies, and development tools.",
    skills: [
      { name: "Docker & Compose", level: 88, featured: true },
      { name: "Git & GitHub", level: 95, featured: true },
      { name: "Postman", level: 92, featured: true },
      { name: "Nginx & SSL", level: 85 },
      { name: "Linux / Bash", level: 88 },
      { name: "Agile Development", level: 90 },
      { name: "Data Structures & Algorithms", level: 90 },
    ],
  },
];
