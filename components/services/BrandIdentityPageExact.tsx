import React from 'react';
import BrandIdentityHeroExact from './BrandIdentityHeroExact';
import BrandIdentityInsideExact from './BrandIdentityInsideExact';
import BrandIdentityReceiveExact from './BrandIdentityReceiveExact';
import BrandIdentityProofExact from './BrandIdentityProofExact';
import BrandIdentityScopeExact from './BrandIdentityScopeExact';
import BrandIdentityFAQExact from './BrandIdentityFAQExact';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import { JsonLd, BreadcrumbSchema, FAQPageSchema, ServiceSchema, WebPageSchema } from '@/lib/seo';

const brandFaqs = [
  {
    q: 'What is a brand identity system (and how is it different from just a logo)?',
    a: 'A logo is a single mark; a brand identity system is the complete operating layer that governs how your company looks and communicates everywhere. It combines brand positioning, primary and secondary logo lockups, WCAG-tested color tokens, typography hierarchy, custom geometric patterns, and a 38-slide brand guidelines book so your website, product UI, and marketing stay cohesive.',
  },
  {
    q: 'How much does a brand identity system cost?',
    a: 'Standalone brand identity and token systems start at $12,000–$18,000 (2–3 weeks). They are also included in the complete 4-week Brand-to-URL sprint for $24,000.',
  },
  {
    q: 'What do I receive at the end of a logo & identity systems project?',
    a: 'Positioning and messaging, a complete logo & identity system (primary mark, wordmark, monochrome and dark/light variants), colour and type tokens, a custom brand pattern, and a 38-slide brand guidelines deck alongside production-ready SVG/PNG/Figma files.',
  },
  {
    q: 'How long does it take?',
    a: 'The identity is the first half of a four-week Brand-to-URL build, delivered together with the website. If you need the identity on its own, we scope the timeline on a call.',
  },
  {
    q: 'Do you also build the website?',
    a: 'Yes. The website is designed from the identity and built to launch, so the two never drift apart. One invoice covers both.',
  },
  {
    q: 'Who do you work with?',
    a: 'Founders, startups, and growing brands that need an identity people recognise and trust. It is a solo practice, so you work directly with me.',
  },
];

export default function BrandIdentityPageExact() {
  return (
    <main
      id="main"
      className="relative w-full"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd
        data={WebPageSchema({
          name: 'Brand Identity Design Services | Usama Zahid',
          url: 'https://usamazahid.design/services/identity/',
        })}
      />
      <JsonLd
        data={ServiceSchema({
          name: 'SaaS Brand Identity Systems & Design Tokens',
          description:
            'Brand positioning, mathematical logo systems, color and typography tokens, custom patterns, and comprehensive brand guidelines designed by Usama Zahid.',
          url: 'https://usamazahid.design/services/identity/',
          provider: 'Usama Zahid — Brand-to-URL Studio',
          offers: {
            price: '12000',
            priceCurrency: 'USD',
          },
        })}
      />
      <JsonLd
        data={BreadcrumbSchema([
          { name: 'Home', url: 'https://usamazahid.design/' },
          { name: 'Services', url: 'https://usamazahid.design/services/' },
          { name: 'Brand identity', url: 'https://usamazahid.design/services/identity/' },
        ])}
      />
      <JsonLd data={FAQPageSchema(brandFaqs)} />
      <SeoBreadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services/' },
          { name: 'Brand identity' },
        ]}
      />

      {/* 1. Hero with Folio Meta, Split Headline, Interactive Brand Board, and Past Results */}
      <BrandIdentityHeroExact />

      {/* 2. Interactive Five-Part Inside Showcase */}
      <BrandIdentityInsideExact />

      {/* 3. Deliverables: What you receive */}
      <BrandIdentityReceiveExact />

      {/* 4. In practice / Identity projects case studies (Codestreaks & Begum) */}
      <BrandIdentityProofExact />

      {/* 5. Scope: Identity alone or with the website */}
      <BrandIdentityScopeExact />

      {/* 6. Questions about brand identity */}
      <BrandIdentityFAQExact />

      {/* 7. Shared Site CTA & Footer (preserves site chrome header & footer) */}
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
