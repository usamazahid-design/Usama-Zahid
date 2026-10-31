import { projects, Project, ProjectCategory } from './portfolio-data';

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => (a.year < b.year ? 1 : -1));
}

export function getFeaturedProject(): Project {
  return projects.find((p) => p.featured) || projects[0];
}

export function getNonFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => !p.featured);
}

export function getProjectsByCategory(category: ProjectCategory | 'ALL'): Project[] {
  if (category === 'ALL') return getAllProjects();
  return getAllProjects().filter((p) => p.category === category);
}

export function getRelatedProjects(slug: string, limit = 2): Project[] {
  const current = getProjectBySlug(slug);
  if (!current) return [];

  const others = getAllProjects().filter((p) => p.slug !== slug);

  const scored = others.map((p) => {
    let score = 0;
    if (p.category === current.category) score += 3;
    if (p.client === current.client) score += 5;
    if (p.year === current.year) score += 1;
    return { post: p, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}

export function getAdjacentProjects(slug: string): { prev: Project; next: Project } | null {
  const all = getAllProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return null;
  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];
  return { prev, next };
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}
