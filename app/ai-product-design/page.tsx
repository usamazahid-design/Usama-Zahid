import { Metadata } from 'next';
import BrandToUrlPageExact from '@/components/brand-to-url/BrandToUrlPageExact';

export const metadata: Metadata = {
  title: 'Brand-to-URL | Usama Zahid, brand and product designer',
  description:
    'Brand identity and a production-ready website, designed and built together over four weeks by Usama Zahid. One invoice, no handoff, for SaaS and AI founders.',
  openGraph: {
    title: 'Brand-to-URL | Usama Zahid, brand and product designer',
    description:
      'Brand identity and a production-ready website, designed and built together over four weeks by Usama Zahid. One invoice, no handoff, for SaaS and AI founders.',
    type: 'website',
    url: 'https://usamazahid.design/brand-to-url/',
    images: [{ url: '/images/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand-to-URL | Usama Zahid, brand and product designer',
    description:
      'Brand identity and a production-ready website, designed and built together over four weeks by Usama Zahid. One invoice, no handoff, for SaaS and AI founders.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://usamazahid.design/brand-to-url/',
  },
};

export default function AiProductDesignPage() {
  return <BrandToUrlPageExact />;
}
