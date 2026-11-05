import type { Metadata } from 'next';
import ServicesHeroExact from '@/components/services/ServicesHeroExact';
import ServicesScrollerExact from '@/components/services/ServicesScrollerExact';
import ServicesWaysExact from '@/components/services/ServicesWaysExact';
import ServicesFAQExact from '@/components/services/ServicesFAQExact';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import { JsonLd, BreadcrumbSchema, FAQPageSchema, WebPageSchema, ServiceSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Brand Identity, User-Centric UX & Next.js Services',
  description:
    'Fixed-scope brand identity systems, user-centric product UI/UX, and production Next.js engineering for startups and growing brands. 4-week delivery sequence.',
  openGraph: {
    title: 'Brand Identity, User-Centric UX & Next.js Services | Usama Zahid',
    description:
      'Fixed-scope brand identity systems, user-centric product UI/UX, and production Next.js engineering for startups and growing brands.',
    type: 'website',
    url: 'https://usamazahid.design/services/',
    images: [{ url: '/images/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand Identity, User-Centric UX & Next.js Services | Usama Zahid',
    description:
      'Fixed-scope brand identity systems, user-centric product UI/UX, and production Next.js engineering for startups and growing brands.',
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
    q: 'How much do your services cost?',
    a: 'Brand Strategy starts at $8,000–$12,000. Brand Identity Systems start at $12,000–$18,000. User-Centric Product UI/UX starts at $14,000–$24,000. Production Next.js Web Engineering starts at $14,000–$22,000. The full 4-week Brand-to-URL Sprint is $24,000 fixed.',
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
          name: 'Brand Identity, User-Centric UX & Next.js Services | Usama Zahid',
          url: 'https://usamazahid.design/services/',
        })}
      />
      <JsonLd
        data={ServiceSchema({
          name: 'Brand Identity, User-Centric Product UI/UX & Next.js Web Engineering',
          description:
            'Fixed-scope brand identity systems, user-centric product UI/UX, and production Next.js engineering for startups and growing brands.',
          url: 'https://usamazahid.design/services/',
          provider: 'Usama Zahid — Brand-to-URL Studio',
          packages: [
            { name: 'Brand-to-URL Sprint', price: '24000', priceCurrency: 'USD' },
            { name: 'Product & UX Design', price: '14000', priceCurrency: 'USD' },
            { name: 'Web Engineering', price: '14000', priceCurrency: 'USD' },
            { name: 'Brand Identity Systems', price: '12000', priceCurrency: 'USD' },
            { name: 'Brand Strategy', price: '8000', priceCurrency: 'USD' },
          ],
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
