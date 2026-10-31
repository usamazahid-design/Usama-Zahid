import { Metadata } from 'next';
import SimplePageHero from '@/components/SimplePageHero';
import LegalBody from '@/components/legal/LegalBody';
import LegalCTA from '@/components/legal/LegalCTA';
import Footer from '@/components/Footer';
import { privacyPolicy } from '@/lib/privacy-data';
import { JsonLd, WebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Usama Zahid collects, uses, and protects data on usamazahid.design. Plain English. GDPR-aware. Last updated 07 June 2026.',
  openGraph: {
    title: 'Privacy Policy',
    description: 'How Usama Zahid collects, uses, and protects data.',
    url: 'https://usamazahid.design/privacy-policy/',
    type: 'website',
    images: [{ url: '/images/og-image.jpg' }],
  },
  alternates: {
    canonical: 'https://usamazahid.design/privacy-policy/',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main
      id="main"
      className="relative w-full paper-surface"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd data={WebPageSchema({
        name: 'Privacy Policy',
        url: 'https://usamazahid.design/privacy-policy/',
      })} />
      <SimplePageHero
        id="privacy-hero"
        eyebrow="[ LEGAL_DOCUMENT ]"
        title={privacyPolicy.title}
        description={privacyPolicy.intro}
        meta={`${privacyPolicy.version} · Updated ${privacyPolicy.lastUpdated}`}
        actions={[
          { label: 'View Terms', href: '/terms/' },
        ]}
        insights={[
          { label: 'Purpose', value: 'Explains how data is collected, stored, and handled across forms, analytics, and communication.' },
          { label: 'Jurisdiction', value: privacyPolicy.jurisdiction },
          { label: 'Coverage', value: `${privacyPolicy.sections.length} sections detailing rights, retention, and security controls.` },
        ]}
        stats={[
          { label: 'Version', value: privacyPolicy.version },
          { label: 'Sections', value: String(privacyPolicy.sections.length) },
          { label: 'Effective', value: privacyPolicy.effectiveDate },
          { label: 'Updated', value: privacyPolicy.lastUpdated },
        ]}
      />

      <LegalBody document={privacyPolicy} />

      <LegalCTA
        document={privacyPolicy}
        sisterHref="/terms"
        sisterLabel="TERMS"
      />

      <Footer />
    </main>
  );
}
