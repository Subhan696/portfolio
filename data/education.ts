export type EducationItem = {
  degree: string;
  institution: string;
  school?: string;
  period: string;
  grade?: string;
  coursework?: string[];
  description?: string;
};

export const educationHistory: EducationItem[] = [
  {
    degree: "B.S. Computer Science",
    institution: "COMSATS University Islamabad, Lahore",
    school: "COMSATS University Islamabad, Lahore",
    period: "Sep 2022 — Jun 2026",
    grade: "CGPA 3.12",
    coursework: [
      "Artificial Intelligence",
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)",
      "Database Systems",
      "Software Engineering",
      "Web Technologies",
      "Operating Systems",
    ],
    description:
      "Core focus on artificial intelligence, algorithmic design, machine learning pipelines, and distributed software engineering.",
  },
  {
    degree: "Intermediate (FSc), Pre-Engineering",
    institution: "FC College, Lahore",
    school: "FC College, Lahore",
    period: "Sep 2020 — Jun 2022",
    grade: "Grade A",
    description:
      "Advanced mathematics, analytical physics, and chemistry foundation.",
  },
  {
    degree: "Matriculation, Science",
    institution: "The Educators School, Lahore",
    school: "The Educators School, Lahore",
    period: "Apr 2018 — Jun 2020",
    grade: "Grade A*",
    description:
      "Distinction in science and foundational computer science fundamentals.",
  },
];

export const education = educationHistory;

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
    issuer: "Meta / Coursera",
    date: "2023",
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
    description: "Active contributor to AI and web repositories.",
    year: "2024",
  },
  {
    title: "Hackathon Finalist",
    description: "Finalist in university AI solutions sprint.",
    year: "2024",
  },
];
