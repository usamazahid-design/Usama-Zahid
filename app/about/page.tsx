import type { Metadata } from 'next';
import AboutHeroExact from '@/components/about/AboutHeroExact';
import AboutOriginExact from '@/components/about/AboutOriginExact';
import AboutQuoteExact from '@/components/about/AboutQuoteExact';
import AboutPrinciplesExact from '@/components/about/AboutPrinciplesExact';
import AboutLensExact from '@/components/about/AboutLensExact';
import AboutGlanceExact from '@/components/about/AboutGlanceExact';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import { JsonLd, PersonSchema, BreadcrumbSchema, WebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About Usama Zahid — Brand & Product Designer',
  description:
    'Usama Zahid is an independent Brand & Product Designer. Creator of Brand-to-URL: brand identity, product UX, and a production-ready website delivered in four weeks.',
  openGraph: {
    title: 'About Usama Zahid — Brand & Product Designer',
    description:
      'Usama Zahid is an independent Brand & Product Designer. Creator of Brand-to-URL: brand identity, product UX, and a production-ready website delivered in four weeks.',
    type: 'website',
    url: 'https://usamazahid.design/about/',
    images: [{ url: '/images/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Usama Zahid — Brand & Product Designer',
    description:
      'Usama Zahid is an independent Brand & Product Designer. Creator of Brand-to-URL: brand identity, product UX, and a production-ready website delivered in four weeks.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://usamazahid.design/about/',
  },
};

export default function AboutPage() {
  return (
    <main
      id="main"
      className="relative w-full"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd data={PersonSchema()} />
      <JsonLd
        data={WebPageSchema({
          name: 'About | Usama Zahid, Brand-to-URL practice',
          url: 'https://usamazahid.design/about/',
        })}
      />
      <JsonLd
        data={BreadcrumbSchema([
          { name: 'Home', url: 'https://usamazahid.design/' },
          { name: 'About', url: 'https://usamazahid.design/about/' },
        ])}
      />
      <SeoBreadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'About' },
        ]}
      />

      {/* 1. Hero with Kinetic Monogram SVG */}
      <AboutHeroExact />

      {/* 2. Origin with scroll lit headline */}
      <AboutOriginExact />

      {/* 3. Pull Quote */}
      <AboutQuoteExact />

      {/* 4. Principles with rotating geometric SVGs on hover */}
      <AboutPrinciplesExact />

      {/* 5. The Physics Lens */}
      <AboutLensExact />

      {/* 6. At a glance with stats and projects */}
      <AboutGlanceExact />

      {/* 7. Shared Site CTA & Footer (preserves site chrome) */}
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
