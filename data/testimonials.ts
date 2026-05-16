export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Founder",
    company: "VectorLabs",
    quote:
      "Shipped a production RAG chatbot in two weeks. The retrieval quality and UX polish were genuinely impressive.",
  },
  {
    name: "Daniel Park",
    role: "CTO",
    company: "VisionWorks",
    quote:
      "Strong fundamentals in CV and engineering discipline. Code reviews were thoughtful and the system held up under load.",
  },
  {
    name: "Aisha Khan",
    role: "Product Lead",
    company: "Startup",
    quote:
      "Rare combination of an AI engineer who also cares deeply about frontend craft. Highly recommended.",
  },
];
