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
}

function mergeProjectMetadata(
  canonicalSlug: string,
  localProject: Awaited<ReturnType<typeof getAllLocalContent>>[number],
) {
  const frontmatter = localProject.frontmatter

  return {
    _id: canonicalSlug,
    title: getFrontmatterTitle(frontmatter, canonicalSlug),
    slug: frontmatter.slug ?? canonicalSlug,
    description: frontmatter.description ?? '',
    projectUrl: frontmatter.projectUrl,
    projectUrlLabel: frontmatter.projectUrlLabel,
    githubUrl: frontmatter.githubUrl,
    githubUrls: frontmatter.githubUrls,
    technologies: frontmatter.technologies ?? [],
    imageUrl: frontmatter.imageUrl,
    features: frontmatter.features,
    detailSections: frontmatter.detailSections,
    challenges: frontmatter.challenges,
    lessons: frontmatter.lessons,
    layout: frontmatter?.layout ?? 'mdx',
  } satisfies Omit<Project, 'content'>
}

export async function getProjects(): Promise<Project[]> {
  const localProjects = await getAllLocalContent('projects')

  return localProjects
    .toSorted((a, b) => {
      const aOrder = a.frontmatter.order ?? Number.MAX_SAFE_INTEGER
      const bOrder = b.frontmatter.order ?? Number.MAX_SAFE_INTEGER

      if (aOrder !== bOrder) {
        return aOrder - bOrder
      }

      return getFrontmatterTitle(a.frontmatter, a.canonicalSlug).localeCompare(
        getFrontmatterTitle(b.frontmatter, b.canonicalSlug),
      )
    })
    .map((localProject) => {
    return {
      ...mergeProjectMetadata(localProject.canonicalSlug, localProject),
      content: localProject.serialized,
    }
  })
}

export async function getProject(slug: string): Promise<Project | null> {
  const localProject = await getLocalContent('projects', slug)

  if (!localProject) {
    return null
  }

  return {
    ...mergeProjectMetadata(localProject.canonicalSlug, localProject),
    content: localProject.serialized,
  }
}
