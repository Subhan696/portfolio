export type ProjectCategory = "AI" | "Web" | "Computer Vision" | "Full Stack";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: ProjectCategory[];
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
  highlights: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "ai-movie-rag-chatbot",
    title: "AI Movie RAG Chatbot",
    summary: "Semantic movie search and AI-powered recommendations.",
    description:
      "A retrieval-augmented generation chatbot for movies. Uses Gemini for reasoning, AstraDB as a vector store, and TMDB for movie metadata. Supports natural-language queries, contextual follow-ups, and personalized recommendations.",
    category: ["AI", "Full Stack"],
    tech: ["Next.js", "Gemini API", "AstraDB", "TMDB", "TypeScript", "RAG"],
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80",
    github: "https://github.com/your-github-username/ai-movie-rag",
    demo: "https://movie-rag.example.com",
    highlights: [
      "Vector similarity search over 100k+ movies",
      "Streaming responses with citations",
      "Hybrid keyword + semantic retrieval",
    ],
    featured: true,
  },
  {
    slug: "stereo-vision-depth",
    title: "Stereo Vision Nose Depth Estimation",
    summary: "Real-time depth estimation using stereo cameras.",
    description:
      "Built a stereo vision pipeline that estimates depth of facial landmarks (nose) using calibrated cameras, disparity maps, and a deep model for landmark detection. Achieves sub-centimeter accuracy at close range.",
    category: ["Computer Vision", "AI"],
    tech: ["Python", "OpenCV", "PyTorch", "NumPy", "Stereo Calibration"],
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&q=80",
    github: "https://github.com/your-github-username/stereo-vision-depth",
    highlights: [
      "Custom stereo camera calibration",
      "Disparity map + landmark fusion",
      "Real-time inference at 30 FPS",
    ],
    featured: true,
  },
  {
    slug: "vehicle-tracking",
    title: "Vehicle Tracking & Counting System",
    summary: "Traffic analytics with detection + tracking.",
    description:
      "An OpenCV-based system that detects, tracks, and counts vehicles across traffic camera feeds. Uses YOLO for detection and SORT-style tracking for identity persistence. Outputs per-lane analytics.",
    category: ["Computer Vision", "AI"],
    tech: ["Python", "OpenCV", "YOLO", "NumPy", "SORT"],
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=80",
    github: "https://github.com/your-github-username/vehicle-tracking",
    highlights: [
      "Multi-lane vehicle counting",
      "Speed estimation per object",
      "Configurable detection zones",
    ],
  },
  {
    slug: "online-voting",
    title: "Online Voting System",
    summary: "Secure multi-page voting platform with auth.",
    description:
      "A full-stack voting application with role-based access, poll creation, and real-time results. Built with secure authentication, hashed credentials, and CSRF protection.",
    category: ["Web", "Full Stack"],
    tech: ["Node.js", "Express", "MongoDB", "EJS", "Sessions"],
    image:
      "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&q=80",
    github: "https://github.com/your-github-username/online-voting",
    highlights: [
      "Role-based access (admin / voter)",
      "One-vote-per-user guarantee",
      "Live result dashboard",
    ],
  },
  {
    slug: "express-address-book",
    title: "Express Address Book App",
    summary: "Full CRUD contact manager with AJAX.",
    description:
      "A polished address book with create / read / update / delete operations, session-based auth, server-rendered views, and AJAX-powered interactions for a snappy feel.",
    category: ["Web", "Full Stack"],
    tech: ["Node.js", "Express", "MongoDB", "EJS", "AJAX"],
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    github: "https://github.com/your-github-username/express-address-book",
    highlights: [
      "Sessions + secure cookies",
      "AJAX without page reloads",
      "Search and pagination",
    ],
  },
  {
    slug: "parallel-bst-cilk",
    title: "Parallel Binary Search Tree (Cilk)",
    summary: "Parallel-computing performance analysis.",
    description:
      "Implemented a parallel BST using OpenCilk and benchmarked insertion / search throughput across thread counts. Analyzed work–span and identified contention bottlenecks.",
    category: ["AI"],
    tech: ["C++", "Cilk", "OpenCilk", "Benchmarking"],
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80",
    github: "https://github.com/your-github-username/parallel-bst-cilk",
    highlights: [
      "Work–span analysis on Cilk runtime",
      "Up to 6× speedup on 8 cores",
      "Lock-free reads, fine-grained writes",
    ],
  },
];

export const projectCategories: (ProjectCategory | "All")[] = [
  "All",
  "AI",
  "Web",
  "Computer Vision",
  "Full Stack",
];
