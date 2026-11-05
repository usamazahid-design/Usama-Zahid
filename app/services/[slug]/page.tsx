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
      title: 'SaaS Brand Identity Systems & Design Tokens',
      description:
        'Beyond static logos: positioning, mathematical color scales, typographic grids, and Figma token libraries engineered for product UI and web scale.',
      openGraph: {
        title: 'SaaS Brand Identity Systems & Design Tokens | Usama Zahid',
        description:
          'Beyond static logos: positioning, mathematical color scales, typographic grids, and Figma token libraries engineered for product UI and web scale.',
        type: 'website',
        url: 'https://usamazahid.design/services/identity/',
        images: [{ url: '/images/og-image.jpg' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'SaaS Brand Identity Systems & Design Tokens | Usama Zahid',
        description:
          'Beyond static logos: positioning, mathematical color scales, typographic grids, and Figma token libraries engineered for product UI and web scale.',
        images: ['/images/og-image.jpg'],
      },
      alternates: {
        canonical: 'https://usamazahid.design/services/identity/',
      },
    };
  }

  if (params.slug === 'engineering') {
    return {
      title: 'Startup Website Design & Production Next.js Builds',
      description:
        'Designed in Figma and engineered in Next.js, TypeScript, and Tailwind CSS by the same designer. 95+ Core Web Vitals, zero handoff loss.',
      openGraph: {
        title: 'Startup Website Design & Production Next.js Builds | Usama Zahid',
        description:
          'Designed in Figma and engineered in Next.js, TypeScript, and Tailwind CSS by the same designer. 95+ Core Web Vitals, zero handoff loss.',
        type: 'website',
        url: 'https://usamazahid.design/services/engineering/',
        images: [{ url: '/images/og-image.jpg' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Startup Website Design & Production Next.js Builds | Usama Zahid',
        description:
          'Designed in Figma and engineered in Next.js, TypeScript, and Tailwind CSS by the same designer. 95+ Core Web Vitals, zero handoff loss.',
        images: ['/images/og-image.jpg'],
      },
      alternates: {
        canonical: 'https://usamazahid.design/services/engineering/',
      },
    };
  }

  if (params.slug === 'product') {
    return {
      title: 'User-Centric SaaS & AI Product UI/UX Design',
      description:
        'User-centric workflow modeling, component libraries, and high-trust AI/SaaS interfaces that eliminate onboarding friction and churn.',
      openGraph: {
        title: 'User-Centric SaaS & AI Product UI/UX Design | Usama Zahid',
        description:
          'User-centric workflow modeling, component libraries, and high-trust AI/SaaS interfaces that eliminate onboarding friction and churn.',
        type: 'website',
        url: 'https://usamazahid.design/services/product/',
        images: [{ url: '/images/og-image.jpg' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'User-Centric SaaS & AI Product UI/UX Design | Usama Zahid',
        description:
          'User-centric workflow modeling, component libraries, and high-trust AI/SaaS interfaces that eliminate onboarding friction and churn.',
        images: ['/images/og-image.jpg'],
      },
      alternates: {
        canonical: 'https://usamazahid.design/services/product/',
      },
    };
  }

  if (params.slug === 'strategy') {
    return {
      title: 'Brand Positioning Strategy & Launch Systems',
      description:
        'Strategic positioning, competitive diagnosis, messaging architecture, and investor launch assets aligned with your brand and web product.',
      openGraph: {
        title: 'Brand Positioning Strategy & Launch Systems | Usama Zahid',
        description:
          'Strategic positioning, competitive diagnosis, messaging architecture, and investor launch assets aligned with your brand and web product.',
        type: 'website',
        url: 'https://usamazahid.design/services/strategy/',
        images: [{ url: '/images/og-image.jpg' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Brand Positioning Strategy & Launch Systems | Usama Zahid',
        description:
          'Strategic positioning, competitive diagnosis, messaging architecture, and investor launch assets aligned with your brand and web product.',
        images: ['/images/og-image.jpg'],
      },
      alternates: {
        canonical: 'https://usamazahid.design/services/strategy/',
      },
    };
  }

  if (params.slug === 'brand-to-url') {
    return {
      title: '4-Week Brand & Next.js Website Sprint',
      description:
        'Brand-to-URL delivers brand strategy, visual identity systems, user-centric product UI/UX, and a live Next.js codebase in one 4-week sprint. Fixed investment: $24,000.',
      openGraph: {
        title: '4-Week Brand & Next.js Website Sprint | Usama Zahid',
        description:
          'Brand-to-URL delivers brand strategy, visual identity systems, user-centric product UI/UX, and a live Next.js codebase in one 4-week sprint. Fixed investment: $24,000.',
        type: 'website',
        url: 'https://usamazahid.design/brand-to-url/',
        images: [{ url: '/images/og-image.jpg' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: '4-Week Brand & Next.js Website Sprint | Usama Zahid',
        description:
          'Brand-to-URL delivers brand strategy, visual identity systems, user-centric product UI/UX, and a live Next.js codebase in one 4-week sprint. Fixed investment: $24,000.',
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
