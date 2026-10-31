import { Metadata } from 'next';
import PortfolioHeroExact from '@/components/portfolio/PortfolioHeroExact';
import PortfolioIndexExact from '@/components/portfolio/PortfolioIndexExact';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import { getAllProjects } from '@/lib/portfolio-utils';
import { allCategories } from '@/lib/portfolio-data';
import { JsonLd, BreadcrumbSchema, WebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Brand & Product Design Case Studies',
  description:
    'Selected case studies in Brand-to-URL, brand identity, web engineering, and product UX design. 47+ clients, 100+ projects, one operator.',
  openGraph: {
    title: 'Brand & Product Design Case Studies | Usama Zahid',
    description:
      'Deep case studies in Brand-to-URL, product UX, and brand identity systems. 47+ clients, 100+ projects, one operator.',
    url: 'https://usamazahid.design/portfolio/',
    type: 'website',
    images: [{ url: '/images/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand & Product Design Case Studies | Usama Zahid',
    description: 'Deep case studies across Brand-to-URL, brand identity, and product UX design.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://usamazahid.design/portfolio/',
  },
};

export default function PortfolioPage() {
  const all = getAllProjects();
  const categoryCount = Math.max(0, allCategories.length - 1);

  return (
    <main
      id="main"
      className="relative w-full"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd
        data={WebPageSchema({
          name: 'Brand & Product Design Case Studies',
          url: 'https://usamazahid.design/portfolio/',
        })}
      />
      <JsonLd
        data={BreadcrumbSchema([
          { name: 'Home', url: 'https://usamazahid.design/' },
          { name: 'Work', url: 'https://usamazahid.design/portfolio/' },
        ])}
      />
      <SeoBreadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Work' },
        ]}
      />

      <PortfolioHeroExact projectCount={all.length} categoryCount={categoryCount} />

      <PortfolioIndexExact projects={all} />

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
