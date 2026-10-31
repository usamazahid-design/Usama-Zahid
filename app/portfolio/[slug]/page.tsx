import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllSlugs, getProjectBySlug, getAdjacentProjects } from '@/lib/portfolio-utils';
import PortfolioCaseExact from '@/components/portfolio/PortfolioCaseExact';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { JsonLd, ArticleSchema, BreadcrumbSchema, CreativeWorkSchema, seoDescription, WebPageSchema } from '@/lib/seo';
import { categoryLabels } from '@/lib/portfolio-data';

interface ProjectPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  const heroImage =
    project.hook.image.content.type === 'image' ? project.hook.image.content.src : '/images/og-image.jpg';
  const description = seoDescription(project.metaDescription ?? project.excerpt);
  const pageTitle = project.seoTitle ?? `${project.title} — UI/UX Design Case Study`;

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: `${pageTitle} | Usama Zahid`,
      description,
      url: `https://usamazahid.design/portfolio/${project.slug}/`,
      type: 'article',
      images: [{ url: heroImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pageTitle} | Usama Zahid`,
      description,
      images: [heroImage],
    },
    alternates: {
      canonical: `https://usamazahid.design/portfolio/${project.slug}/`,
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  const description = seoDescription(project.metaDescription ?? project.excerpt);

  const adjacent = getAdjacentProjects(params.slug);
  if (!adjacent) notFound();

  const heroImage =
    project.hook.image.content.type === 'image' ? project.hook.image.content.src : '/images/og-image.jpg';

  return (
    <main
      id="main"
      className="relative w-full"
      style={{ background: 'var(--bg)', color: 'var(--ink)' }}
    >
      <JsonLd
        data={WebPageSchema({
          name: `${project.title} | Case Study`,
          url: `https://usamazahid.design/portfolio/${project.slug}/`,
        })}
      />
      <JsonLd
        data={BreadcrumbSchema([
          { name: 'Home', url: 'https://usamazahid.design/' },
          { name: 'Work', url: 'https://usamazahid.design/portfolio/' },
          { name: project.title, url: `https://usamazahid.design/portfolio/${project.slug}/` },
        ])}
      />
      <JsonLd
        data={CreativeWorkSchema({
          name: project.title,
          description,
          url: `https://usamazahid.design/portfolio/${project.slug}/`,
          author: 'Usama Zahid',
          image: heroImage,
          keywords: [categoryLabels[project.category], project.role, project.client].filter(
            Boolean
          ) as string[],
        })}
      />
      <JsonLd
        data={ArticleSchema({
          headline: `${project.title} | Case Study`,
          description,
          datePublished: `${project.year || '2026'}-01-01`,
          dateModified: '2026-10-18',
          author: 'Usama Zahid',
          url: `https://usamazahid.design/portfolio/${project.slug}/`,
          image: heroImage,
          category: categoryLabels[project.category],
          tags: [categoryLabels[project.category], project.role, project.client].filter(
            Boolean
          ) as string[],
        })}
      />

      <PortfolioCaseExact project={project} nextProject={adjacent.next} />

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
