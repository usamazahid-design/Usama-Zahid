import { Metadata } from 'next';
import CVHero from '@/components/cv/CVHero';
import CVSummary from '@/components/cv/CVSummary';
import CVExperience from '@/components/cv/CVExperience';
import CVEducation from '@/components/cv/CVEducation';
import CVSkills from '@/components/cv/CVSkills';
import CVProjects from '@/components/cv/CVProjects';
import CVLanguages from '@/components/cv/CVLanguages';
import CVPrint from '@/components/cv/CVPrint';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import { getAllBrandingCases } from '@/lib/branding-utils';
import { getAllProjects } from '@/lib/portfolio-utils';
import { JsonLd, PersonSchema, BreadcrumbSchema, WebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'CV — Brand & Product Designer (7+ Years)',
  description:
    'Full CV of Usama Zahid: Brand & Product Designer with 7+ years in brand identity, product UI/UX, and Next.js web engineering. Petrozen ERP, Stealth Humanizer, Begum. Lahore, remote-ready.',
  openGraph: {
    title: 'CV — Brand & Product Designer | Usama Zahid',
    description:
      'Full CV of Usama Zahid: Brand & Product Designer with 7+ years in brand identity, product UI/UX, and Next.js web engineering. Petrozen ERP, Stealth Humanizer, Begum. Lahore, remote-ready.',
    url: 'https://usamazahid.design/cv/',
    type: 'website',
    images: [{ url: '/images/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CV — Brand & Product Designer | Usama Zahid',
    description:
      'Full CV of Usama Zahid: Brand & Product Designer with 7+ years in brand identity, product UI/UX, and Next.js web engineering. Petrozen ERP, Stealth Humanizer, Begum. Lahore, remote-ready.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://usamazahid.design/cv/',
  },
};

export default function CVPage() {
  const projects = getAllProjects();
  const branding = getAllBrandingCases();

  return (
    <main
      id="main"
      className="relative w-full"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd data={PersonSchema()} />
      <JsonLd
        data={WebPageSchema({
          name: 'CV | 7 Years of Product Design Work',
          url: 'https://usamazahid.design/cv/',
        })}
      />
      <JsonLd
        data={BreadcrumbSchema([
          { name: 'Home', url: 'https://usamazahid.design/' },
          { name: 'About', url: 'https://usamazahid.design/about/' },
          { name: 'CV', url: 'https://usamazahid.design/cv/' },
        ])}
      />
      <SeoBreadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about/' },
          { name: 'CV' },
        ]}
      />

      <CVHero />
      <CVSummary />
      <CVExperience />
      <CVEducation />
      <CVSkills />
      <CVProjects projects={projects} branding={branding} />
      <CVLanguages />
      <CVPrint />

      <CTA
        id="contact"
        title="Hiring now? Let's talk."
        subtitle="Brand & product design, brand to URL. Your next conversation starts with a 15-minute call."
        buttonText="Book a Call"
        buttonHref="https://cal.com/usama-zahid-haadwj/15min"
        statusText="Open to remote and hybrid roles"
      />

      <Footer />
    </main>
  );
}
