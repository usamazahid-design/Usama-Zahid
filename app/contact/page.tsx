import type { Metadata } from 'next';
import ContactHeroExact from '@/components/contact/ContactHeroExact';
import ContactBookExact from '@/components/contact/ContactBookExact';
import ContactWriteExact from '@/components/contact/ContactWriteExact';
import ContactFaqExact from '@/components/contact/ContactFaqExact';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import { JsonLd, BreadcrumbSchema, FAQPageSchema, WebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact — Book a Strategy Call or Start a Project',
  description:
    'Book a call or write to Usama Zahid, Brand & Product Designer, about brand identity, production-ready websites, and product UX design.',
  openGraph: {
    title: 'Contact Usama Zahid | Brand & Product Designer',
    description:
      'Book a call or write to Usama Zahid about brand identity, production-ready websites, and product UX design.',
    url: 'https://usamazahid.design/contact/',
    type: 'website',
    images: [{ url: '/images/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Usama Zahid | Brand & Product Designer',
    description:
      'Book a call or write to Usama Zahid about brand identity, production-ready websites, and product UX design.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://usamazahid.design/contact/',
  },
};

const faqs = [
  {
    q: 'Who do you work with?',
    a: 'Founders, startups, and growing brands that need an identity, website, and product experience that belong together.',
  },
  {
    q: 'How long does a build take?',
    a: 'Four weeks, from the first conversation to a live URL. Brand identity and website are delivered together.',
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

export default function ContactPage() {
  return (
    <main
      id="main"
      className="relative w-full"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd
        data={WebPageSchema({
          name: 'Contact | Usama Zahid, brand and product designer',
          url: 'https://usamazahid.design/contact/',
        })}
      />
      <JsonLd
        data={BreadcrumbSchema([
          { name: 'Home', url: 'https://usamazahid.design/' },
          { name: 'Contact', url: 'https://usamazahid.design/contact/' },
        ])}
      />
      <JsonLd data={FAQPageSchema(faqs)} />
      <SeoBreadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Contact' },
        ]}
      />

      {/* 1. Hero with Kinetic Monogram SVG and metadata bar */}
      <ContactHeroExact />

      {/* 2. Interactive Booking Calendar (15 min intro / 30 min project call) */}
      <ContactBookExact />

      {/* 3. Direct Note / Project Brief Form */}
      <ContactWriteExact />

      {/* 4. Questions founders ask first (FAQ disclosure list) */}
      <ContactFaqExact />

      {/* 5. Shared Site CTA & Footer (preserves shared site chrome) */}
      <CTA
        id="contact"
        title="Four weeks from brand to live URL."
        subtitle="Brand identity and a production-ready website, delivered together as one system. Direct communication with the founder who designs the system and writes the code. No account managers, no handoff gap."
        buttonText="Book Strategy Call"
        buttonHref="#book"
        statusText="Available for 2 new projects this quarter"
      />

      <Footer />
    </main>
  );
}
