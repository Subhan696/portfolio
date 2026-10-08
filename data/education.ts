export type EducationItem = {
  degree: string;
  school: string;
  period: string;
  description: string;
  coursework: string[];
};

export const education: EducationItem[] = [
  {
    degree: "BS Computer Science",
    school: "COMSATS University",
    period: "2022 — 2026",
    description:
      "Focused on artificial intelligence and full-stack web development. Strong foundation in algorithms, systems, and applied ML.",
    coursework: [
      "Artificial Intelligence",
      "Deep Learning",
      "Computer Vision",
      "Web Development",
      "Parallel Computing",
      "Data Structures & Algorithms",
      "Database Systems",
      "Operating Systems",
    ],
  },
];

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  url?: string;
};

export const certifications: Certification[] = [
  {
    name: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "2024",
  },
  {
    name: "Machine Learning",
    issuer: "Stanford / Coursera",
    date: "2024",
  },
  {
    name: "Full Stack Web Development",
    issuer: "Self-paced",
    date: "2023",
  },
  {
    name: "Computer Vision Nanodegree",
    issuer: "Udacity",
    date: "2024",
  },
];

export type Achievement = {
  title: string;
  description: string;
  year: string;
};

export const achievements: Achievement[] = [
  {
    title: "Open Source Contributor",
    description: "Active contributor to AI / web open-source projects.",
    year: "2024",
  },
  {
    title: "Hackathon Finalist",
    description: "Top 10 finalist in a national AI hackathon.",
    year: "2024",
  },
  {
    title: "Top of Class",
    description: "Consistently top performer in CS coursework.",
    year: "2023",
  },
];
