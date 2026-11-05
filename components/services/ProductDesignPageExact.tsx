import React from 'react';
import ProductDesignHeroExact from './ProductDesignHeroExact';
import ProductDesignInsideExact from './ProductDesignInsideExact';
import ProductDesignReceiveExact from './ProductDesignReceiveExact';
import ProductDesignProofExact from './ProductDesignProofExact';
import ProductDesignScopeExact from './ProductDesignScopeExact';
import ProductDesignFAQExact from './ProductDesignFAQExact';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import { JsonLd, BreadcrumbSchema, FAQPageSchema, ServiceSchema, WebPageSchema } from '@/lib/seo';

const productFaqs = [
  {
    q: 'What do I receive at the end?',
    a: 'A friction audit, redesigned flows, interface designs for web and mobile, a design system, and a baseline with measures so the change can be seen in the numbers.',
  },
  {
    q: 'How much does product and UX design cost?',
    a: 'End-to-end SaaS product UI/UX design and design system sprints range between $14,000–$24,000 (3–4 weeks), depending on product scope and workflow complexity.',
  },
  {
    q: 'Which products do you work on?',
    a: 'Web and mobile digital products, customer-facing platforms, and internal tools such as ERPs. The best fit is a product that already works but costs its users effort.',
  },
  {
    q: 'How long does it take?',
    a: 'It depends on the size of the product and the flows involved, so we scope the timeline together on a call.',
  },
  {
    q: 'Do I work with a team or with you?',
    a: 'With me. It is a solo practice, so the person you brief is the person who designs the product.',
  },
];

export default function ProductDesignPageExact() {
  return (
    <main
      id="main"
      className="relative w-full"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd
        data={WebPageSchema({
          name: 'Product & UX Design Services | Usama Zahid',
          url: 'https://usamazahid.design/services/product/',
        })}
      />
      <JsonLd
        data={ServiceSchema({
          name: 'User-Centric SaaS & AI Product UI/UX Design',
          description:
            'User-centric workflow modeling, component libraries, and high-trust AI/SaaS interfaces that eliminate onboarding friction and churn.',
          url: 'https://usamazahid.design/services/product/',
          provider: 'Usama Zahid — Brand-to-URL Studio',
          offers: {
            price: '14000',
            priceCurrency: 'USD',
          },
        })}
      />
      <JsonLd
        data={BreadcrumbSchema([
          { name: 'Home', url: 'https://usamazahid.design/' },
          { name: 'Services', url: 'https://usamazahid.design/services/' },
          { name: 'Product and UX design', url: 'https://usamazahid.design/services/product/' },
        ])}
      />
      <JsonLd data={FAQPageSchema(productFaqs)} />
      <SeoBreadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services/' },
          { name: 'Product and UX design' },
        ]}
      />

      {/* 1. Hero with Folio Meta, Split Headline, SaaS Dashboard Mockup, and Results */}
      <ProductDesignHeroExact />

      {/* 2. Interactive Five-Part Inside Showcase */}
      <ProductDesignInsideExact />

      {/* 3. Deliverables: What you receive */}
      <ProductDesignReceiveExact />

      {/* 4. In practice / Product projects case studies (Petrozen ERP & Strong Rental Cars Qatar) */}
      <ProductDesignProofExact />

      {/* 5. Scope: Product alone or with the brand */}
      <ProductDesignScopeExact />

      {/* 6. Questions about product design */}
      <ProductDesignFAQExact />

      {/* 7. Shared Site CTA & Footer (preserves site chrome header & footer) */}
      <CTA
        id="contact"
        title="Four weeks from brand to live URL."
        subtitle="Interfaces and flows for web and mobile products that remove the friction users never report. Designed on the same system as your brand."
        buttonText="Book Strategy Call"
        buttonHref="https://cal.com/usama-zahid-haadwj/15min"
        statusText="Available for 2 new projects this quarter"
      />

      <Footer />
    </main>
  );
}
