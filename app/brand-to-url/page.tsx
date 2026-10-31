import { Metadata } from 'next';
import BrandToUrlPageExact from '@/components/brand-to-url/BrandToUrlPageExact';

export const metadata: Metadata = {
  title: 'Brand-to-URL — Brand Identity & Website in Four Weeks',
  description:
    'Brand identity and a production-ready website, designed and built together over four weeks by Usama Zahid, Brand & Product Designer. One invoice, no handoff.',
  openGraph: {
    title: 'Brand-to-URL — Brand Identity & Website | Usama Zahid',
    description:
      'Brand identity and a production-ready website, designed and built together over four weeks by Usama Zahid, Brand & Product Designer. One invoice, no handoff.',
    type: 'website',
    url: 'https://usamazahid.design/brand-to-url/',
    images: [{ url: '/images/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand-to-URL — Brand Identity & Website | Usama Zahid',
    description:
      'Brand identity and a production-ready website, designed and built together over four weeks by Usama Zahid, Brand & Product Designer. One invoice, no handoff.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://usamazahid.design/brand-to-url/',
  },
};

export default function BrandToUrlPage() {
  return <BrandToUrlPageExact />;
}
