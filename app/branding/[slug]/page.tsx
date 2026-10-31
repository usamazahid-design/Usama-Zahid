import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import BrandingCaseExact from '@/components/branding/BrandingCaseExact';
import BegumPageExact from '@/components/branding/BegumPageExact';
import { ArticleSchema, BreadcrumbSchema, CreativeWorkSchema, JsonLd, seoDescription, WebPageSchema } from '@/lib/seo';
import {
  getAdjacentBrandingCases,
  getBrandingCaseBySlug,
  getBrandingSlugs,
  resolveBrandingSlug,
} from '@/lib/branding-utils';

interface BrandingPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getBrandingSlugs();
  if (!slugs.includes('begum')) slugs.push('begum');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BrandingPageProps): Promise<Metadata> {
  if (params.slug === 'begum') {
    return {
      title: 'Begum Luxury Bridal Brand Identity System & Guidelines Case Study',
      description:
        'Brand identity system case study for Begum bridal couture: logo mark, emerald & ivory palette, Mughal pattern, 40-page brand guidelines, packaging, and web.',
      openGraph: {
        title: 'Begum Brand Identity System Case Study | Usama Zahid',
        description:
          'Brand identity system case study for Begum bridal couture: logo, colour, pattern, guidelines, applications and web, designed as one system.',
        url: 'https://usamazahid.design/branding/begum/',
        type: 'article',
        images: [{ url: '/images/portfolio/Begum/hero-begum.webp' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Begum Brand Identity System Case Study | Usama Zahid',
        description:
          'Brand identity system case study for Begum bridal couture: logo, colour, pattern, guidelines, applications and web, designed as one system.',
        images: ['/images/portfolio/Begum/hero-begum.webp'],
      },
      alternates: {
        canonical: 'https://usamazahid.design/branding/begum/',
      },
    };
  }

  const canonicalSlug = resolveBrandingSlug(params.slug);
  const project = getBrandingCaseBySlug(canonicalSlug);
  if (!project) return {};
  const description = seoDescription(project.metaDescription ?? project.overview);

  return {
    title: `${project.title} — Brand Identity System & Guidelines Case Study`,
    description,
    openGraph: {
      title: `${project.title} — Brand Identity System Case Study | Usama Zahid`,
      description,
      url: `https://usamazahid.design/branding/${project.slug}/`,
      type: 'article',
      images: [{ url: project.heroImage.src }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Brand Identity System Case Study | Usama Zahid`,
      description,
      images: [project.heroImage.src],
    },
    alternates: {
      canonical: `https://usamazahid.design/branding/${project.slug}/`,
    },
  };
}

export default function BrandingCasePage({ params }: BrandingPageProps) {
  if (params.slug === 'begum') {
    return <BegumPageExact />;
  }

  const canonicalSlug = resolveBrandingSlug(params.slug);
  if (canonicalSlug !== params.slug) {
    redirect(`/branding/${canonicalSlug}/`);
  }

  const project = getBrandingCaseBySlug(canonicalSlug);
  if (!project) notFound();
  const adjacent = getAdjacentBrandingCases(canonicalSlug);
  const description = seoDescription(project.metaDescription ?? project.overview);

  return (
    <main
      id="main"
      className="relative w-full"
      style={{ background: 'var(--bg)', color: 'var(--ink)' }}
    >
      <JsonLd
        data={WebPageSchema({
          name: `${project.title} | Branding Case Study`,
          url: `https://usamazahid.design/branding/${project.slug}/`,
        })}
      />
      <JsonLd
        data={BreadcrumbSchema([
          { name: 'Home', url: 'https://usamazahid.design/' },
          { name: 'Work', url: 'https://usamazahid.design/portfolio/' },
          { name: 'Branding Case Studies', url: 'https://usamazahid.design/branding/' },
          { name: project.title, url: `https://usamazahid.design/branding/${project.slug}/` },
        ])}
      />
      <JsonLd
        data={CreativeWorkSchema({
          name: project.title,
          description,
          url: `https://usamazahid.design/branding/${project.slug}/`,
          author: 'Usama Zahid',
          image: project.heroImage.src,
          keywords: [project.category, project.role, project.client, ...project.tags],
        })}
      />
      <JsonLd
        data={ArticleSchema({
          headline: `${project.title} | Branding Case Study`,
          description,
          datePublished: `${project.year || '2026'}-01-01`,
          dateModified: '2026-10-18',
          author: 'Usama Zahid',
          url: `https://usamazahid.design/branding/${project.slug}/`,
          image: project.heroImage.src,
          category: project.category,
          tags: [project.role, project.client, ...project.tags],
        })}
      />
      <BrandingCaseExact project={project} nextCase={adjacent?.next} />

      <CTA
        id="contact"
        title="Four weeks from brand to live URL."
        subtitle="Brand identity and a production-ready website, delivered together as one system. Direct communication with the founder who designs the system and writes the code. No account managers, no handoff gap."
        buttonText="Book Strategy Call"
        buttonHref="https://cal.com/usama-zahid-haadwj/15min"
        statusText="Available for 2 new projects this quarter"
      />

      <Footer />
    </main>
  );
}
