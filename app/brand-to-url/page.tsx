import { Metadata } from 'next';
import BrandToUrlPageExact from '@/components/brand-to-url/BrandToUrlPageExact';

export const metadata: Metadata = {
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

export default function BrandToUrlPage() {
  return <BrandToUrlPageExact />;
}
