import { MetadataRoute } from 'next';
import { getAllPosts, toIsoDate } from '@/lib/blog-utils';
import { services } from '@/lib/services-data';
import { projects } from '@/lib/portfolio-data';
import { brandingCases } from '@/lib/branding-data';
import { products } from '@/lib/products-data';

const baseUrl = 'https://usamazahid.design';

const isoDate = (value: string | undefined, fallback = '2026-11-05') =>
  new Date(value ? toIsoDate(value) : fallback);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: isoDate('2026-11-05'), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about/`, lastModified: isoDate('2026-11-05'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/services/`, lastModified: isoDate('2026-11-05'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/portfolio/`, lastModified: isoDate('2026-11-05'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/branding/`, lastModified: isoDate('2026-11-05'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog/`, lastModified: isoDate('2026-11-05'), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/blog/identity/`, lastModified: isoDate('2026-11-05'), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/blog/product/`, lastModified: isoDate('2026-11-05'), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/blog/engineering/`, lastModified: isoDate('2026-11-05'), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/blog/strategy/`, lastModified: isoDate('2026-11-05'), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/blog/website/`, lastModified: isoDate('2026-11-05'), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/blog/marketing/`, lastModified: isoDate('2026-11-05'), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/contact/`, lastModified: isoDate('2026-11-05'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/brand-kit/`, lastModified: isoDate('2026-11-05'), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/products/`, lastModified: isoDate('2026-11-05'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/brand-to-url/`, lastModified: isoDate('2026-11-05'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/privacy-policy/`, lastModified: isoDate('2026-11-05'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms/`, lastModified: isoDate('2026-11-05'), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const blogEntries = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.service}/${post.slug}/`,
    lastModified: isoDate(post.lastUpdated ?? post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const serviceEntries = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}/`,
    lastModified: isoDate(service.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const portfolioEntries = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}/`,
    lastModified: isoDate(`${project.year}-01-01`),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const brandingEntries = [
    ...brandingCases.map((item) => ({
      url: `${baseUrl}/branding/${item.slug}/`,
      lastModified: isoDate(`${item.year}-01-01`),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/branding/begum/`,
      lastModified: isoDate('2026-09-19'),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  const productEntries = products
    .filter((item) => item.slug !== 'brand-kit-generator')
    .map((item) => ({
      url: `${baseUrl}/products/${item.slug}/`,
      lastModified: isoDate('2026-10-18'),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  return [
    ...staticPages,
    ...blogEntries,
    ...serviceEntries,
    ...portfolioEntries,
    ...brandingEntries,
    ...productEntries,
  ];
}
