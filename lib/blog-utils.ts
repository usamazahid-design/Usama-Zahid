import { posts, BlogPost, BlogCategory, BlogService } from './blog-data';

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostByServiceAndSlug(service: BlogService, slug: string): BlogPost | undefined {
  return posts.find((p) => p.service === service && p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllServiceSlugs(): BlogService[] {
  return Array.from(new Set(posts.map((p) => p.service))) as BlogService[];
}

export function getFeaturedPost(): BlogPost {
  return posts.find((p) => p.featured) || posts[0];
}

export function getNonFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => !p.featured);
}

export function getPostsByCategory(category: BlogCategory | 'ALL'): BlogPost[] {
  if (category === 'ALL') return getAllPosts();
  return getAllPosts().filter((p) => p.category === category);
}

export function getPostsByService(service: BlogService | 'ALL'): BlogPost[] {
  if (service === 'ALL') return getAllPosts();
  return getAllPosts().filter((p) => p.service === service);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const others = getAllPosts().filter((p) => p.slug !== slug);

  const scored = others.map((p) => {
    let score = 0;
    if (p.category === current.category) score += 3;
    const sharedTags = p.tags.filter((t) => current.tags.includes(t)).length;
    score += sharedTags * 2;
    return { post: p, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}

export function calculateReadingTime(content: BlogPost['content']): number {
  const wordsPerMinute = 200;
  let words = 0;

  for (const block of content) {
    if (block.type === 'p' || block.type === 'h2' || block.type === 'h3' || block.type === 'quote' || block.type === 'callout') {
      words += block.text.split(/\s+/).length;
    } else if (block.type === 'ul' || block.type === 'ol') {
      words += block.items.join(' ').split(/\s+/).length;
    } else if (block.type === 'code') {
      words += block.code.split(/\s+/).length / 2;
    }
  }

  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function formatDate(date: string): string {
  const [y, m, d] = date.split('.');
  const months = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
  ];
  return `${d} · ${months[parseInt(m, 10) - 1]} · ${y}`;
}

export function formatDateLong(date: string): string {
  const [y, m, d] = date.split('.');
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${months[parseInt(m, 10) - 1]} ${parseInt(d, 10)}, ${y}`;
}

export function toIsoDate(date: string): string {
  // Display dates use YYYY.MM.DD; schema/OG need ISO YYYY-MM-DD
  if (date.includes('.')) return date.replace(/\./g, '-');
  return date;
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export function getTableOfContents(content: BlogPost['content']): { id: string; text: string; level: 2 | 3 }[] {
  return content
    .filter((b): b is { type: 'h2' | 'h3'; text: string; id?: string } =>
      b.type === 'h2' || b.type === 'h3'
    )
    .map((b) => ({
      id: b.id || slugifyHeading(b.text),
      text: b.text,
      level: (b.type === 'h2' ? 2 : 3) as 2 | 3,
    }));
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
