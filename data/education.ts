export type EducationItem = {
  degree: string;
  school: string;
  period: string;
  description: string;
  coursework: string[];
};

export const education: EducationItem[] = [
  {
    degree: "B.S. Computer Science",
    school: "COMSATS University Islamabad, Lahore Campus",
    period: "Sep 2022 — June 2026",
    description:
      "Core focus on Artificial Intelligence, LLMs, and Software Engineering. Built production-grade RAG and agentic systems alongside rigorous algorithmic foundations.",
    coursework: [
      "Artificial Intelligence",
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Systems",
      "Software Engineering",
      "Web Technologies",
      "Computer Networks",
      "Operating Systems",
    ],
  },
  {
    degree: "Intermediate (FSc) — Pre-Engineering",
    school: "Forman Christian College (FC College), Lahore",
    period: "Sep 2020 — Jun 2022",
    description:
      "Graduated with Grade A. Rigorous background in Mathematics, Physics, and analytical problem solving.",
    coursework: ["Advanced Mathematics", "Physics", "Chemistry"],
  },
  {
    degree: "Matriculation — Science",
    school: "The Educators School, Lahore",
    period: "Apr 2018 — Jun 2020",
    description:
      "Graduated with Grade A*. Solid mathematical and scientific groundwork.",
    coursework: ["Computer Science", "Mathematics", "Physics"],
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
