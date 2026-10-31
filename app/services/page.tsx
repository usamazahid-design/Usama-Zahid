import type { Metadata } from 'next';
import ServicesHeroExact from '@/components/services/ServicesHeroExact';
import ServicesScrollerExact from '@/components/services/ServicesScrollerExact';
import ServicesWaysExact from '@/components/services/ServicesWaysExact';
import ServicesFAQExact from '@/components/services/ServicesFAQExact';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import { JsonLd, BreadcrumbSchema, FAQPageSchema, WebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Brand & Product Design Services — Identity, Websites & UX',
  description:
    'Brand identity, production-ready websites, product UX design, and launch assets designed and built as one system in four weeks by Usama Zahid, Brand & Product Designer.',
  openGraph: {
    title: 'Brand & Product Design Services | Usama Zahid',
    description:
      'Brand identity, production-ready websites, product UX design, and launch assets designed and built as one system in four weeks.',
    type: 'website',
    url: 'https://usamazahid.design/services/',
    images: [{ url: '/images/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand & Product Design Services | Usama Zahid',
    description:
      'Brand identity, production-ready websites, product UX design, and launch assets designed and built as one system in four weeks.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://usamazahid.design/services/',
  },
};

const serviceFaqs = [
  {
    q: 'Who do you work with?',
    a: 'Founders, startups, and growing brands that need an identity, website, and product experience that belong together.',
  },
  {
    q: 'How long does a build take?',
    a: 'Four weeks, from the first conversation to a live URL.',
  },
  {
    q: 'How many invoices and handoffs?',
    a: 'One invoice and no handoff. The identity and the website are designed against the same strategy by the same person.',
  },
  {
    q: 'Do I work with a team or with you?',
    a: 'With me. It is a solo practice, so the person you brief is the person who designs and builds.',
  },
];

export default function ServicesPage() {
  return (
    <main
      id="main"
      className="relative w-full"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd
        data={WebPageSchema({
          name: 'Services | Usama Zahid, brand and product designer',
          url: 'https://usamazahid.design/services/',
        })}
      />
      <JsonLd
        data={BreadcrumbSchema([
          { name: 'Home', url: 'https://usamazahid.design/' },
          { name: 'Services', url: 'https://usamazahid.design/services/' },
        ])}
      />
      <JsonLd data={FAQPageSchema(serviceFaqs)} />
      <SeoBreadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services' },
        ]}
      />

      {/* 1. Hero with Folio Meta, Split Headline, TOC card, and Past Results */}
      <ServicesHeroExact />

      {/* 2. Interactive 4-Services Pinned Showcase */}
      <ServicesScrollerExact />

      {/* 3. Ways to work together & 4-week timeline */}
      <ServicesWaysExact />

      {/* 4. Common Questions */}
      <ServicesFAQExact />

      {/* 5. Shared Site CTA & Footer (preserves site chrome header & footer) */}
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
