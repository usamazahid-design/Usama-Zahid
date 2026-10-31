import React from 'react';
import WebEngineeringHeroExact from './WebEngineeringHeroExact';
import WebEngineeringInsideExact from './WebEngineeringInsideExact';
import WebEngineeringReceiveExact from './WebEngineeringReceiveExact';
import WebEngineeringProofExact from './WebEngineeringProofExact';
import WebEngineeringScopeExact from './WebEngineeringScopeExact';
import WebEngineeringFAQExact from './WebEngineeringFAQExact';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import { JsonLd, BreadcrumbSchema, FAQPageSchema, ServiceSchema, WebPageSchema } from '@/lib/seo';

const webEngineeringFaqs = [
  {
    q: 'What do I receive at the end?',
    a: 'A live, production-ready website: the site map and copy direction, responsive design, a component kit and flows, the built site, and testing and launch.',
  },
  {
    q: 'Do you design and build it?',
    a: 'Yes. The website is designed and built by the same person, so what ships matches what was designed and nothing is lost in a handoff.',
  },
  {
    q: 'How long does it take?',
    a: 'The website is the second half of a four-week Brand-to-URL build, delivered together with the identity. If you need the website on its own, we scope the timeline on a call.',
  },
  {
    q: 'What if I already have a brand?',
    a: 'Then the site is designed from your existing identity. If the brand needs work first, the two can be built together as one system.',
  },
];

export default function WebEngineeringPageExact() {
  return (
    <main
      id="main"
      className="relative w-full"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd
        data={WebPageSchema({
          name: 'Website Design & Next.js Development | Usama Zahid',
          url: 'https://usamazahid.design/services/engineering/',
        })}
      />
      <JsonLd
        data={ServiceSchema({
          name: 'Production-Ready Website Design & Next.js Development',
          description:
            'Responsive website design, component kits, and Next.js engineering built from your brand identity by Usama Zahid, Brand & Product Designer.',
          url: 'https://usamazahid.design/services/engineering/',
          provider: 'Usama Zahid',
        })}
      />
      <JsonLd
        data={BreadcrumbSchema([
          { name: 'Home', url: 'https://usamazahid.design/' },
          { name: 'Services', url: 'https://usamazahid.design/services/' },
          { name: 'Production-ready website', url: 'https://usamazahid.design/services/engineering/' },
        ])}
      />
      <JsonLd data={FAQPageSchema(webEngineeringFaqs)} />
      <SeoBreadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services/' },
          { name: 'Production-ready website' },
        ]}
      />

      {/* 1. Hero with Folio Meta, Split Headline, Interactive Browser Mockup, and Results */}
      <WebEngineeringHeroExact />

      {/* 2. Interactive Five-Part Inside Showcase */}
      <WebEngineeringInsideExact />

      {/* 3. Deliverables: What you receive */}
      <WebEngineeringReceiveExact />

      {/* 4. In practice / Website projects case studies (Strong Rental Cars Qatar & Begum) */}
      <WebEngineeringProofExact />

      {/* 5. Scope: Website alone or with the identity */}
      <WebEngineeringScopeExact />

      {/* 6. Questions about the website */}
      <WebEngineeringFAQExact />

      {/* 7. Shared Site CTA & Footer (preserves site chrome header & footer) */}
      <CTA
        id="contact"
        title="Four weeks from brand to live URL."
        subtitle="A production-ready website, designed from your brand identity and built by the same person. Delivered with the identity in four weeks."
        buttonText="Book Strategy Call"
        buttonHref="https://cal.com/usama-zahid-haadwj/15min"
        statusText="Available for 2 new projects this quarter"
      />

      <Footer />
    </main>
  );
}
