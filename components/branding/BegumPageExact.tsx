import React from 'react';
import BegumCaseExact from '@/components/branding/BegumCaseExact';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import { ArticleSchema, BreadcrumbSchema, CreativeWorkSchema, JsonLd, WebPageSchema } from '@/lib/seo';

export default function BegumPageExact() {
  return (
    <main
      id="main"
      className="relative w-full"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd
        data={WebPageSchema({
          name: 'Begum brand identity case study | Usama Zahid',
          url: 'https://usamazahid.design/branding/begum/',
          description:
            'Brand identity case study for Begum bridal couture: logo, colour, pattern, guidelines, applications and web, designed as one system.',
        })}
      />
      <JsonLd
        data={BreadcrumbSchema([
          { name: 'Home', url: 'https://usamazahid.design/' },
          { name: 'Work', url: 'https://usamazahid.design/portfolio/' },
          { name: 'Branding Case Studies', url: 'https://usamazahid.design/branding/' },
          { name: 'Begum', url: 'https://usamazahid.design/branding/begum/' },
        ])}
      />
      <JsonLd
        data={CreativeWorkSchema({
          name: 'Begum brand identity',
          description:
            'Mughal-inspired brand identity for a Pakistani bridal label: logo, colour, pattern, guidelines, applications and web.',
          url: 'https://usamazahid.design/branding/begum/',
          author: 'Usama Zahid',
          image: '/images/portfolio/Begum/hero-begum.webp',
          keywords: ['IDENTITY', 'Brand Designer', 'Begum', 'Bridal', 'Brand-to-URL'],
        })}
      />
      <JsonLd
        data={ArticleSchema({
          headline: 'Begum Brand Identity Case Study | Usama Zahid',
          description:
            'Brand identity case study for Begum bridal couture: logo, colour, pattern, guidelines, applications and web, designed as one system.',
          datePublished: '2026-01-01',
          dateModified: '2026-10-18',
          author: 'Usama Zahid',
          url: 'https://usamazahid.design/branding/begum/',
          image: '/images/portfolio/Begum/hero-begum.webp',
          category: 'IDENTITY',
          tags: ['IDENTITY', 'Brand Designer', 'Begum', 'Bridal', 'Brand-to-URL'],
        })}
      />
      <SeoBreadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Branding', url: '/branding/' },
          { name: 'Begum' },
        ]}
      />

      <BegumCaseExact />

      <CTA
        id="contact"
        title="Four weeks from brand to live URL."
        subtitle="Brand identity and a production-ready website, delivered together as one system. Direct communication with the founder who designs the system and writes the code."
        buttonText="Book Strategy Call"
        buttonHref="https://cal.com/usama-zahid-haadwj/15min"
        statusText="Available for 2 new projects this quarter"
      />
      <Footer />
    </main>
  );
}
