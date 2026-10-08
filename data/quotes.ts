export interface Quote {
  id: string
  text: string
  author: string
  role?: string
}

export const quotes: Quote[] = [
  {
    id: "1",
    text: "Any sufficiently advanced technology is indistinguishable from magic.",
    author: "Arthur C. Clarke",
    role: "Science Fiction Author",
  },
  {
    id: "2",
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
    role: "Computer Scientist",
  },
  {
    id: "3",
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    id: "4",
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
    role: "Software Engineer",
  },
  {
    id: "5",
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
    role: "Creator of Linux",
  },
  {
    id: "6",
    text: "It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.",
    author: "Charles Darwin",
    role: "Naturalist",
  },
]
