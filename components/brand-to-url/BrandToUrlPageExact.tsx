'use client';

import React, { useEffect } from 'react';
import BrandToUrlHeroExact from './BrandToUrlHeroExact';
import BrandToUrlDifferentExact from './BrandToUrlDifferentExact';
import BrandToUrlWeeksExact from './BrandToUrlWeeksExact';
import BrandToUrlIncludedExact from './BrandToUrlIncludedExact';
import BrandToUrlProofExact from './BrandToUrlProofExact';
import BrandToUrlFitExact from './BrandToUrlFitExact';
import BrandToUrlStartExact from './BrandToUrlStartExact';
import BrandToUrlFAQExact from './BrandToUrlFAQExact';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import { JsonLd, BreadcrumbSchema, FAQPageSchema, ServiceSchema, WebPageSchema } from '@/lib/seo';

const brandToUrlFaqs = [
  {
    q: 'What is Brand-to-URL?',
    a: 'A single offer that covers the brand identity and a production-ready website, designed and built together over four weeks, with one invoice and no handoff between the two.',
  },
  {
    q: 'Why does doing both together matter?',
    a: 'When one person designs the identity and the site against the same strategy, nothing has to be translated between teams, and the website never drifts away from the brand.',
  },
  {
    q: 'What if I only need part of it?',
    a: 'You can start with the identity, the website, product design or launch assets on their own. We scope the timeline for each on a call.',
  },
  {
    q: 'How much does it cost?',
    a: 'The complete Brand-to-URL 4-week sprint is a fixed $24,000 investment covering strategy, visual identity system, user-centric UI/UX design, and production Next.js codebase. Individual tracks start at $8,000 to $14,000.',
  },
  {
    q: 'Who do you work with?',
    a: 'Founders, startups, and growing brands that need an identity and website built as one system. It is a solo practice, so you work directly with me.',
  },
];

export default function BrandToUrlPageExact() {
  useEffect(() => {
    // Add js class to html for animation support
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      document.documentElement.classList.add('js');
    }

    // Observe revealable elements
    const rvs = Array.from(
      document.querySelectorAll(
        '.pf > div, .inc > div, .promise > div, .csc, .qual > div, .start > div, .fq, .sh, .bh, #cmp'
      )
    ) as HTMLElement[];

    rvs.forEach((el, i) => {
      el.classList.add('rv');
      el.style.setProperty('--d', `${(i % 3) * 0.08}s`);
    });

    const rio = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );

    rvs.forEach((el) => rio.observe(el));

    return () => {
      rio.disconnect();
    };
  }, []);

  return (
    <main
      id="main"
      className="relative w-full"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd
        data={WebPageSchema({
          name: 'Brand-to-URL — Brand Identity & Website in Four Weeks | Usama Zahid',
          url: 'https://usamazahid.design/brand-to-url/',
        })}
      />
      <JsonLd
        data={ServiceSchema({
          name: 'Brand-to-URL (Brand Identity, User-Centric UX & Production Next.js Website)',
          description:
            'Brand-to-URL is a fixed 4-week design and web engineering sprint delivering brand identity, user-centric product UI/UX, and a production Next.js website codebase. $24,000 fixed investment.',
          url: 'https://usamazahid.design/brand-to-url/',
          provider: 'Usama Zahid — Brand-to-URL Studio',
          offers: {
            price: '24000',
            priceCurrency: 'USD',
          },
        })}
      />
      <JsonLd
        data={BreadcrumbSchema([
          { name: 'Home', url: 'https://usamazahid.design/' },
          { name: 'Services', url: 'https://usamazahid.design/services/' },
          { name: 'Brand-to-URL', url: 'https://usamazahid.design/brand-to-url/' },
        ])}
      />
      <JsonLd data={FAQPageSchema(brandToUrlFaqs)} />
      <SeoBreadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services/' },
          { name: 'Brand-to-URL' },
        ]}
      />

      {/* 1. Hero: Folio Bar, Split Headline, Interactive Live Web Stage with Parallax, Numbers Strip */}
      <BrandToUrlHeroExact />

      {/* 2. Comparison: The Usual Way (Handoff Gap) vs Brand-to-URL */}
      <BrandToUrlDifferentExact />

      {/* 3. The Four Weeks: Sticky scrub scroller through Strategy, Identity, Interface, Build and Launch */}
      <BrandToUrlWeeksExact />

      {/* 4. What is Included: The Brand vs The Website & Three Promises */}
      <BrandToUrlIncludedExact />

      {/* 5. In Practice: Begum, Codestreaks, Strong Rental Cars Qatar Case Studies */}
      <BrandToUrlProofExact />

      {/* 6. Qualification: Who Brand-to-URL is for & Alternative Service Links */}
      <BrandToUrlFitExact />

      {/* 7. How to Start: 3-step timeline */}
      <BrandToUrlStartExact />

      {/* 8. Frequently Asked Questions */}
      <BrandToUrlFAQExact />

      {/* 9. Shared Site CTA & Footer (Header & Footer preserved) */}
      <CTA
        id="contact"
        title="Four weeks from brand to live URL."
        subtitle="Brand identity and a production-ready website, designed and built together. One invoice, no handoff, for pre-seed to Series A SaaS and AI founders."
        buttonText="Book a call"
        buttonHref="https://cal.com/usama-zahid-haadwj/15min"
        statusText="Available for 2 new projects this quarter"
      />

      <Footer />
    </main>
  );
}
