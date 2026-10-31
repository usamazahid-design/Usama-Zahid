import type { Metadata } from 'next';
import HireHeroExact from '@/components/hire/HireHeroExact';
import HireWorkExact from '@/components/hire/HireWorkExact';
import HireExperienceExact from '@/components/hire/HireExperienceExact';
import HireFaqExact from '@/components/hire/HireFaqExact';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import { getAllBrandingCases } from '@/lib/branding-utils';
import { getAllProjects } from '@/lib/portfolio-utils';
import { BreadcrumbSchema, FAQPageSchema, JsonLd, PersonSchema, WebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Hire Usama Zahid | Brand & Product Designer',
  description:
    'Hiring page for recruiters and HR: 7+ years in design and 3+ years in UI/UX and product design, with portfolio proof and direct scheduling.',
  openGraph: {
    title: 'Hire Usama Zahid | Brand & Product Designer',
    description:
      'Recruiter-ready overview: role fit, outcomes, experience timeline, portfolio highlights, and contact actions.',
    url: 'https://usamazahid.design/hire/',
    type: 'website',
    images: [{ url: '/images/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hire Usama Zahid | Brand & Product Designer',
    description:
      'Recruiter-ready overview with portfolio, impact metrics, and direct scheduling.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://usamazahid.design/hire/',
  },
};

const hiringFaqs = [
  {
    q: 'What role fit should this profile be considered for?',
    a: 'Brand & Product Designer. The profile combines product UX, brand systems, and delivery collaboration in one role.',
  },
  {
    q: 'Is this candidate available for remote and international collaboration?',
    a: 'Yes. Based in Lahore (UTC+5) with previous collaboration across Pakistan, Qatar, UAE, and Australia.',
  },
  {
    q: 'Can we start with a short screening call?',
    a: 'Yes. Use the booking CTA on this page to schedule a short intro call directly without leaving the site.',
  },
  {
    q: 'Where can we verify practical project outcomes quickly?',
    a: 'Portfolio highlights and full case studies are linked in this page, with role, scope, and measurable outcomes.',
  },
];

export default function HirePage() {
  const topProjects = getAllProjects().slice(0, 3);
  const topBrandingCases = getAllBrandingCases().slice(0, 2);

  return (
    <main
      id="main"
      className="relative w-full"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd data={PersonSchema()} />
      <JsonLd
        data={WebPageSchema({
          name: 'Hire Usama Zahid | Brand & Product Designer',
          url: 'https://usamazahid.design/hire/',
        })}
      />
      <JsonLd
        data={BreadcrumbSchema([
          { name: 'Home', url: 'https://usamazahid.design/' },
          { name: 'Hire', url: 'https://usamazahid.design/hire/' },
        ])}
      />
      <JsonLd data={FAQPageSchema(hiringFaqs)} />

      <SeoBreadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Hire' },
        ]}
      />

      <HireHeroExact />
      <HireWorkExact projects={topProjects} branding={topBrandingCases} />
      <HireExperienceExact />
      <HireFaqExact />

      <CTA
        id="contact"
        title="Hiring now? Let's talk."
        subtitle="Brand & Product Designer. Portfolio, CV, and direct scheduling in one flow."
        buttonText="Book Intro Call"
        buttonHref="https://cal.com/usama-zahid-haadwj/15min"
        statusText="Open to remote and hybrid roles"
      />

      <Footer />
    </main>
  );
}
