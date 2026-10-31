import { BrandingCase, BrandingCategory, brandingCases } from '@/lib/branding-data';

const brandingCategoryLabels: Record<BrandingCategory, string> = {
  IDENTITY: 'Identity',
  REBRAND: 'Rebrand',
  PACKAGING: 'Packaging',
  BRAND_SYSTEM: 'Brand System',
};

export function formatBrandingCategory(category: BrandingCategory): string {
  return brandingCategoryLabels[category] ?? category;
}

/** Legacy URLs kept for static export + bookmarks after slug renames. */
const brandingSlugAliases: Record<string, string> = {
  Techmechka: 'techmeka',
};

export function resolveBrandingSlug(slug: string): string {
  return brandingSlugAliases[slug] ?? slug;
}

export function getLegacyBrandingSlugs(): string[] {
  return Object.keys(brandingSlugAliases);
}

export function getAllBrandingCases(): BrandingCase[] {
  return [...brandingCases].sort((a, b) => (a.year < b.year ? 1 : -1));
}

export function getBrandingCaseBySlug(slug: string): BrandingCase | undefined {
  const resolved = resolveBrandingSlug(slug);
  return brandingCases.find((item) => item.slug === resolved);
}

export function getFeaturedBrandingCase(): BrandingCase {
  return brandingCases.find((item) => item.featured) || brandingCases[0];
}

export function getNonFeaturedBrandingCases(): BrandingCase[] {
  return getAllBrandingCases().filter((item) => !item.featured);
}

export function getBrandingSlugs(): string[] {
  const canonical = brandingCases.map((item) => item.slug);
  return [...canonical, ...getLegacyBrandingSlugs()];
}

export function getAdjacentBrandingCases(slug: string): { prev: BrandingCase; next: BrandingCase } | null {
  const all = getAllBrandingCases();
  if (all.length < 2) return null;
  const resolved = resolveBrandingSlug(slug);
  const currentIndex = all.findIndex((item) => item.slug === resolved);
  if (currentIndex === -1) return null;
  const prev = all[(currentIndex - 1 + all.length) % all.length];
  const next = all[(currentIndex + 1) % all.length];
  return { prev, next };
}
