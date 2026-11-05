import type { Metadata } from 'next';
import VisitingCard from '@/components/card/VisitingCard';
import { JsonLd, BreadcrumbSchema, WebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Digital Business Card',
  description:
    'Usama Zahid, premium digital business card. Brand & Product Designer. Brand-to-URL. Download, scan QR, or book a call.',
  openGraph: {
    title: 'Usama Zahid | Digital Business Card',
    description: 'Brand & Product Designer. Brand-to-URL. Flip, download, or scan to connect.',
    url: 'https://usamazahid.design/card/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://usamazahid.design/card/',
  },
  robots: { index: false, follow: true },
};

export default function CardPage() {
  return (
    <main className="min-h-svh bg-uz-black">
      <JsonLd data={WebPageSchema({
        name: 'Digital Business Card',
        url: 'https://usamazahid.design/card/',
      })} />
      <JsonLd data={BreadcrumbSchema([
        { name: 'Home', url: 'https://usamazahid.design/' },
        { name: 'Card', url: 'https://usamazahid.design/card/' },
      ])} />
      <VisitingCard />
    </main>
  );
}
