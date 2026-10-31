import { Metadata } from 'next';
import BrandingHeroExact from '@/components/branding/BrandingHeroExact';
import BrandingIndexExact from '@/components/branding/BrandingIndexExact';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import { BreadcrumbSchema, JsonLd, WebPageSchema } from '@/lib/seo';
import { getAllBrandingCases } from '@/lib/branding-utils';
import { brandingCategories } from '@/lib/branding-data';

export const metadata: Metadata = {
  title: 'Branding Case Studies',
  description:
    'Brand identity and strategy case studies in the UZ OS format. Systems thinking, visual rigor, and applied brand execution.',
  openGraph: {
    title: 'Branding Case Studies',
    description:
      'Brand case studies covering identity systems, strategy direction, and real-world brand applications.',
    url: 'https://usamazahid.design/branding/',
    type: 'website',
    images: [{ url: '/images/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Branding Case Studies',
    description: 'Identity depth, strategy logic, one operator.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://usamazahid.design/branding/',
  },
};

export default function BrandingPage() {
  const allCases = getAllBrandingCases();
  const categoryCount = Math.max(0, brandingCategories.length - 1);

  return (
    <main
      id="main"
      className="relative w-full"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd
        data={WebPageSchema({
          name: 'Branding Case Studies',
          url: 'https://usamazahid.design/branding/',
        })}
      />
      <JsonLd
        data={BreadcrumbSchema([
          { name: 'Home', url: 'https://usamazahid.design/' },
          { name: 'Work', url: 'https://usamazahid.design/portfolio/' },
          { name: 'Branding Case Studies', url: 'https://usamazahid.design/branding/' },
        ])}
      />
      <SeoBreadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Work', url: '/portfolio/' },
          { name: 'Branding Case Studies' },
        ]}
      />

      <BrandingHeroExact projectCount={allCases.length} categoryCount={categoryCount} />

      <BrandingIndexExact projects={allCases} />

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
