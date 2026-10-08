import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import {
  getAllLocalContent,
  getFrontmatterTitle,
  getLocalContent,
  type ContentSection,
  type ContentLayout,
} from './mdx-content'

export type ProjectSection = ContentSection

export interface Project {
  _id: string
  title: string
  slug: string
  description: string
  content?: MDXRemoteSerializeResult
  layout: ContentLayout
  projectUrl?: string
  projectUrlLabel?: string
  githubUrl?: string
  githubUrls?: { label: string; url: string }[]
  technologies: string[]
  imageUrl?: string
  features?: string[]
  detailSections?: ProjectSection[]
  challenges?: string[]
  lessons?: string[]
  stars?: number
  updatedAt?: string
}

interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  topics?: string[]
  stargazers_count: number
  fork: boolean
  updated_at: string
}

const KNOWN_PROJECT_META: Record<
  string,
  {
    title: string
    description: string
    technologies: string[]
    projectUrl?: string
    imageUrl?: string
  }
> = {
  'whatsapp-sales-agent': {
    title: 'WhatsApp Business AI Sales Agent & CRM',
    description:
      'Autonomous conversational sales agent on Meta WhatsApp Cloud API with LangGraph cyclic state machine and mobile CRM dashboard.',
    technologies: ['FastAPI', 'LangGraph', 'LangChain', 'PostgreSQL', 'Docker', 'React'],
  },
  'ai-fitness-trainer': {
    title: 'AI Fitness Trainer & Voice Assistant',
    description:
      'Voice-enabled AI personal trainer and nutrition planner using Vapi Voice AI, Google Gemini LLM, and Convex DB.',
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Gemini AI', 'Vapi AI', 'Convex'],
    projectUrl: 'https://ai-fitness-trainer-woad.vercel.app',
  },
  'al-touheed-wholesale': {
    title: 'ATG Warehouse Management & POS Billing',
    description:
      'Offline-first cross-platform desktop application for wholesale distribution, inventory tracking, POS billing, and receipt printing.',
    technologies: ['Electron.js', 'React.js', 'SQLite', 'Node.js', 'Tailwind CSS'],
  },
  'logistic-mcp-server': {
    title: 'Logistic MCP Server',
    description:
      'Model Context Protocol (MCP) server for automated email & PDF invoice parsing, database syncing, and AI data extraction.',
    technologies: ['TypeScript', 'Model Context Protocol', 'Prisma', 'SQLite', 'Node.js'],
  },
  'secure-haven': {
    title: 'SecureHaven — Online Voting System',
    description:
      'Cryptographically secure online voting platform with tamper-evident ballot integrity, JWT security, and real-time tally dashboard.',
    technologies: ['React.js', 'Express.js', 'Node.js', 'MongoDB', 'JWT', 'Bcrypt'],
  },
  'movie-rag-chatbot': {
    title: 'Movie RAG Chatbot',
    description:
      'Intelligent cinematic discovery and recommendation assistant powered by Retrieval-Augmented Generation and vector search.',
    technologies: ['Python', 'RAG', 'LangChain', 'Vector DB', 'FastAPI'],
  },
  'ai-writing-assistant': {
    title: 'AI Writing Assistant & Editor',
    description:
      'Intelligent editor web app offering real-time generative suggestions, grammar corrections, and style improvements.',
    technologies: ['React', 'Node.js', 'OpenAI API', 'Tailwind CSS'],
  },
  'invoice-generator': {
    title: 'Professional Invoice Generator',
    description:
      'Fast, modern web tool allowing businesses to create, customize, and export professional commercial invoices.',
    technologies: ['React', 'JavaScript', 'Tailwind CSS'],
  },
  'face_app': {
    title: 'Face Recognition & Biometrics App',
    description:
      'Computer vision application implementing deep facial recognition, feature landmarks detection, and biometric verification.',
    technologies: ['Python', 'OpenCV', 'PyTorch', 'Computer Vision'],
  },
  'rag': {
    title: 'RAG Architecture & Benchmark Pipeline',
    description:
      'Production-ready Retrieval-Augmented Generation architecture with embeddings, vector indexing, reranking, and accuracy benchmarks.',
    technologies: ['Python', 'LangChain', 'Pinecone', 'RAG', 'OpenAI'],
  },
}

function formatRepoTitle(name: string): string {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export async function fetchGitHubRepos(): Promise<Project[]> {
  try {
    const res = await fetch(
      'https://api.github.com/users/Subhan696/repos?sort=updated&per_page=100',
      {
        headers: {
          'User-Agent': 'Portfolio-App',
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 },
      },
    )

    if (!res.ok) {
      console.warn('GitHub API returned status', res.status)
      return []
    }

    const repos: GitHubRepo[] = await res.json()
    const seenSlugs = new Set<string>()

    const projects: Project[] = []

    for (const repo of repos) {
      if (repo.fork) continue
      const lowerName = repo.name.toLowerCase()
      if (lowerName === 'portfolio' || lowerName === 'subhan696' || lowerName === 'project') continue

      const slug = repo.name.toLowerCase().replace(/[^a-z0-9_-]/g, '')
      if (seenSlugs.has(slug) || slug === 'gradewave') continue
      seenSlugs.add(slug)

      const known = KNOWN_PROJECT_META[slug] || KNOWN_PROJECT_META[slug.replace(/_/g, '-')]

      const technologies: string[] = []
      if (known?.technologies?.length) {
        technologies.push(...known.technologies)
      } else {
        if (repo.language) technologies.push(repo.language)
        if (repo.topics?.length) {
          technologies.push(
            ...repo.topics
              .filter((t) => !['portfolio', 'project'].includes(t.toLowerCase()))
              .slice(0, 3),
          )
        }
      }

      projects.push({
        _id: `github-${repo.name}`,
        title: known?.title ?? formatRepoTitle(repo.name),
        slug: repo.name,
        description:
          known?.description ||
          repo.description ||
          `${formatRepoTitle(repo.name)} built with ${repo.language || 'modern technologies'}.`,
        layout: 'react',
        githubUrl: repo.html_url,
        projectUrl: known?.projectUrl || (repo.homepage ? repo.homepage : undefined),
        technologies: technologies.length ? technologies : [repo.language || 'Code'],
        stars: repo.stargazers_count,
        updatedAt: repo.updated_at,
      })
    }

    return projects
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return []
  }
}

export async function getProjects(): Promise<Project[]> {
  // 1. GradeWave (FYP) from local MDX
  const localProjects = await getAllLocalContent('projects')
  const gradewaveLocal = localProjects.find((p) => p.canonicalSlug === 'gradewave')

  const result: Project[] = []

  if (gradewaveLocal) {
    result.push({
      _id: 'gradewave',
      title: getFrontmatterTitle(gradewaveLocal.frontmatter, 'gradewave'),
      slug: 'gradewave',
      description: gradewaveLocal.frontmatter.description ?? '',
      projectUrl: gradewaveLocal.frontmatter.projectUrl,
      projectUrlLabel: gradewaveLocal.frontmatter.projectUrlLabel,
      githubUrl: gradewaveLocal.frontmatter.githubUrl ?? 'https://github.com/Subhan696',
      githubUrls: gradewaveLocal.frontmatter.githubUrls,
      technologies: gradewaveLocal.frontmatter.technologies ?? ['FastAPI', 'React', 'Expo', 'RAG'],
      imageUrl: gradewaveLocal.frontmatter.imageUrl,
      features: gradewaveLocal.frontmatter.features,
      detailSections: gradewaveLocal.frontmatter.detailSections,
      challenges: gradewaveLocal.frontmatter.challenges,
      lessons: gradewaveLocal.frontmatter.lessons,
      layout: 'mdx',
      content: gradewaveLocal.serialized,
    })
  }

  // 2. Fetch live GitHub repositories for Subhan696
  const githubProjects = await fetchGitHubRepos()
  result.push(...githubProjects)

  return result
}

export async function getProject(slug: string): Promise<Project | null> {
  const resolvedSlug = slug.toLowerCase()

  if (resolvedSlug === 'gradewave') {
    const localProject = await getLocalContent('projects', 'gradewave')
    if (localProject) {
      return {
        _id: 'gradewave',
        title: getFrontmatterTitle(localProject.frontmatter, 'gradewave'),
        slug: 'gradewave',
        description: localProject.frontmatter.description ?? '',
        projectUrl: localProject.frontmatter.projectUrl,
        projectUrlLabel: localProject.frontmatter.projectUrlLabel,
        githubUrl: localProject.frontmatter.githubUrl ?? 'https://github.com/Subhan696',
        githubUrls: localProject.frontmatter.githubUrls,
        technologies: localProject.frontmatter.technologies ?? ['FastAPI', 'React', 'Expo', 'RAG'],
        imageUrl: localProject.frontmatter.imageUrl,
        features: localProject.frontmatter.features,
        detailSections: localProject.frontmatter.detailSections,
        challenges: localProject.frontmatter.challenges,
        lessons: localProject.frontmatter.lessons,
        layout: 'mdx',
        content: localProject.serialized,
      }
    }
  }

  // Check in fetched GitHub repos
  const allProjects = await getProjects()
  const found = allProjects.find(
    (p) => p.slug.toLowerCase() === resolvedSlug || p.title.toLowerCase() === resolvedSlug,
  )

  return found || null
}
