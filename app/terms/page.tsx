import { Metadata } from 'next';
import SimplePageHero from '@/components/SimplePageHero';
import LegalBody from '@/components/legal/LegalBody';
import LegalCTA from '@/components/legal/LegalCTA';
import Footer from '@/components/Footer';
import { termsConditions } from '@/lib/terms-data';
import { JsonLd, WebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'The terms that govern use of usamazahid.design and engagements initiated through it. Plain English. Pakistan jurisdiction. Last updated 07 June 2026.',
  openGraph: {
    title: 'Terms & Conditions',
    description: 'Terms governing use of usamazahid.design and engagements.',
    url: 'https://usamazahid.design/terms/',
    type: 'website',
    images: [{ url: '/images/og-image.jpg' }],
  },
  alternates: {
    canonical: 'https://usamazahid.design/terms/',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <main
      id="main"
      className="relative w-full paper-surface"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd data={WebPageSchema({
        name: 'Terms & Conditions',
        url: 'https://usamazahid.design/terms/',
      })} />
      <SimplePageHero
        id="terms-hero"
        eyebrow="[ LEGAL_DOCUMENT ]"
        title={termsConditions.title}
        description={termsConditions.intro}
        meta={`${termsConditions.version} · Updated ${termsConditions.lastUpdated}`}
        actions={[
          { label: 'View Privacy Policy', href: '/privacy-policy/' },
        ]}
        insights={[
          { label: 'Purpose', value: 'Defines engagement and website usage boundaries in plain, operational language.' },
          { label: 'Jurisdiction', value: termsConditions.jurisdiction },
          { label: 'Coverage', value: `${termsConditions.sections.length} structured sections with enforceable scope rules.` },
        ]}
        stats={[
          { label: 'Version', value: termsConditions.version },
          { label: 'Sections', value: String(termsConditions.sections.length) },
          { label: 'Effective', value: termsConditions.effectiveDate },
          { label: 'Updated', value: termsConditions.lastUpdated },
        ]}
      />

      <LegalBody document={termsConditions} />

      <LegalCTA
        document={termsConditions}
        sisterHref="/privacy-policy"
        sisterLabel="PRIVACY"
      />

      <Footer />
    </main>
  );
}
