import React from 'react';
import LaunchAssetsHeroExact from './LaunchAssetsHeroExact';
import LaunchAssetsInsideExact from './LaunchAssetsInsideExact';
import LaunchAssetsReceiveExact from './LaunchAssetsReceiveExact';
import LaunchAssetsProofExact from './LaunchAssetsProofExact';
import LaunchAssetsScopeExact from './LaunchAssetsScopeExact';
import LaunchAssetsFAQExact from './LaunchAssetsFAQExact';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import { JsonLd, BreadcrumbSchema, FAQPageSchema, ServiceSchema, WebPageSchema } from '@/lib/seo';

const launchFaqs = [
  {
    q: 'What do I receive at the end?',
    a: 'A launch plan, social media templates, print collateral and the files to reuse them, all built from the same system as your brand and website.',
  },
  {
    q: 'Do I need an existing brand identity?',
    a: 'The assets are built from your identity. If you do not have one yet, the identity and the assets can be designed together as one system.',
  },
  {
    q: 'Which channels do you cover?',
    a: 'Social media and print. We agree the exact channels and formats on a call, based on where your launch needs to show up.',
  },
  {
    q: 'How long does it take?',
    a: 'It depends on how many assets you need, so we scope the timeline together on a call.',
  },
];

export default function LaunchAssetsPageExact() {
  return (
    <main
      id="main"
      className="relative w-full"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd
        data={WebPageSchema({
          name: 'Brand Strategy & Launch Assets | Usama Zahid',
          url: 'https://usamazahid.design/services/strategy/',
        })}
      />
      <JsonLd
        data={ServiceSchema({
          name: 'Brand Strategy & Launch Assets',
          description:
            'Launch plans, social media templates, print collateral, and reusable brand files built from your identity by Usama Zahid, Brand & Product Designer.',
          url: 'https://usamazahid.design/services/strategy/',
          provider: 'Usama Zahid',
        })}
      />
      <JsonLd
        data={BreadcrumbSchema([
          { name: 'Home', url: 'https://usamazahid.design/' },
          { name: 'Services', url: 'https://usamazahid.design/services/' },
          { name: 'Launch assets', url: 'https://usamazahid.design/services/strategy/' },
        ])}
      />
      <JsonLd data={FAQPageSchema(launchFaqs)} />
      <SeoBreadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services/' },
          { name: 'Launch assets' },
        ]}
      />

      <LaunchAssetsHeroExact />
      <LaunchAssetsInsideExact />
      <LaunchAssetsReceiveExact />
      <LaunchAssetsProofExact />
      <LaunchAssetsScopeExact />
      <LaunchAssetsFAQExact />

      <CTA
        id="contact"
        title="Four weeks from brand to live URL."
        subtitle="Social and print pieces built from the same system as your brand and your website. So launch day looks as considered as the product."
        buttonText="Book Strategy Call"
        buttonHref="https://cal.com/usama-zahid-haadwj/15min"
        statusText="Available for 2 new projects this quarter"
      />
      <Footer />
    </main>
  );
}
