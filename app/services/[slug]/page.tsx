import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BrandIdentityPageExact from '@/components/services/BrandIdentityPageExact';
import WebEngineeringPageExact from '@/components/services/WebEngineeringPageExact';
import ProductDesignPageExact from '@/components/services/ProductDesignPageExact';
import LaunchAssetsPageExact from '@/components/services/LaunchAssetsPageExact';
import BrandToUrlPageExact from '@/components/brand-to-url/BrandToUrlPageExact';
import { getAllServiceSlugs } from '@/lib/services-data';

interface ServicePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = new Set([...getAllServiceSlugs()]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  if (params.slug === 'identity') {
    return {
      title: 'Brand Identity Systems & Logo Design — Strategy, Guidelines & Tokens',
      description:
        'Complete brand identity systems by Usama Zahid, Brand & Product Designer: positioning, logo & identity systems, colour & typography tokens, custom patterns, and 38-slide brand guidelines.',
      openGraph: {
        title: 'Brand Identity Systems & Logo Design | Usama Zahid',
        description:
          'Complete brand identity systems by Usama Zahid: positioning, logo & identity systems, colour, type, custom pattern, and 38-slide brand guidelines.',
        type: 'website',
        url: 'https://usamazahid.design/services/identity/',
        images: [{ url: '/images/og-image.jpg' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Brand Identity Systems & Logo Design | Usama Zahid',
        description:
          'Complete brand identity systems by Usama Zahid: positioning, logo & identity systems, colour, type, custom pattern, and brand guidelines.',
        images: ['/images/og-image.jpg'],
      },
      alternates: {
        canonical: 'https://usamazahid.design/services/identity/',
      },
    };
  }

  if (params.slug === 'engineering') {
    return {
      title: 'Website Design & Next.js Development — Production-Ready Web',
      description:
        'Production-ready website design and Next.js development by Usama Zahid, Brand & Product Designer: structure, responsive design, components, and launch.',
      openGraph: {
        title: 'Website Design & Next.js Development | Usama Zahid',
        description:
          'Production-ready website design and Next.js development by Usama Zahid: structure, responsive design, components, and launch.',
        type: 'website',
        url: 'https://usamazahid.design/services/engineering/',
        images: [{ url: '/images/og-image.jpg' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Website Design & Next.js Development | Usama Zahid',
        description:
          'Production-ready website design and Next.js development by Usama Zahid: structure, responsive design, components, and launch.',
        images: ['/images/og-image.jpg'],
      },
      alternates: {
        canonical: 'https://usamazahid.design/services/engineering/',
      },
    };
  }

  if (params.slug === 'product') {
    return {
      title: 'Product & UX Design Services — Flows, Interfaces & Design Systems',
      description:
        'Product and UX design by Usama Zahid, Brand & Product Designer: friction audits, redesigned flows, web and mobile interfaces, and Figma design systems.',
      openGraph: {
        title: 'Product & UX Design Services | Usama Zahid',
        description:
          'Product and UX design by Usama Zahid: friction audits, redesigned flows, web and mobile interfaces, and design systems.',
        type: 'website',
        url: 'https://usamazahid.design/services/product/',
        images: [{ url: '/images/og-image.jpg' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Product & UX Design Services | Usama Zahid',
        description:
          'Product and UX design by Usama Zahid: friction audits, redesigned flows, web and mobile interfaces, and design systems.',
        images: ['/images/og-image.jpg'],
      },
      alternates: {
        canonical: 'https://usamazahid.design/services/product/',
      },
    };
  }

  if (params.slug === 'strategy') {
    return {
      title: 'Brand Strategy & Launch Assets — Social & Print Collateral',
      description:
        'Brand strategy, social media templates, and print launch assets by Usama Zahid, Brand & Product Designer: built from the same system as your brand and website.',
      openGraph: {
        title: 'Brand Strategy & Launch Assets | Usama Zahid',
        description:
          'Social and print launch assets by Usama Zahid: templates, collateral, and ready-to-use files built from the same system as your brand and website.',
        type: 'website',
        url: 'https://usamazahid.design/services/strategy/',
        images: [{ url: '/images/og-image.jpg' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Brand Strategy & Launch Assets | Usama Zahid',
        description:
          'Social and print launch assets by Usama Zahid: templates, collateral, and ready-to-use files built from the same system as your brand and website.',
        images: ['/images/og-image.jpg'],
      },
      alternates: {
        canonical: 'https://usamazahid.design/services/strategy/',
      },
    };
  }

  if (params.slug === 'brand-to-url') {
    return {
      title: 'Brand-to-URL — Brand Identity & Website in Four Weeks',
      description:
        'Brand identity and a production-ready website, designed and built together over four weeks by Usama Zahid, Brand & Product Designer. One invoice, no handoff.',
      openGraph: {
        title: 'Brand-to-URL | Usama Zahid',
        description:
          'Brand identity and a production-ready website, designed and built together over four weeks by Usama Zahid. One invoice, no handoff.',
        type: 'website',
        url: 'https://usamazahid.design/brand-to-url/',
        images: [{ url: '/images/og-image.jpg' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Brand-to-URL | Usama Zahid',
        description:
          'Brand identity and a production-ready website, designed and built together over four weeks by Usama Zahid. One invoice, no handoff.',
        images: ['/images/og-image.jpg'],
      },
      alternates: {
        canonical: 'https://usamazahid.design/brand-to-url/',
      },
    };
  }

  return {};
}

export default function ServicePage({ params }: ServicePageProps) {
  if (params.slug === 'identity') return <BrandIdentityPageExact />;
  if (params.slug === 'engineering') return <WebEngineeringPageExact />;
  if (params.slug === 'product') return <ProductDesignPageExact />;
  if (params.slug === 'strategy') return <LaunchAssetsPageExact />;
  if (params.slug === 'brand-to-url') return <BrandToUrlPageExact />;

  notFound();
}
