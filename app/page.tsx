import AuthenticDarkHome from '@/components/AuthenticDarkHome';
import { JsonLd, FAQPageSchema, WebPageSchema, WebSiteSchema } from '@/lib/seo';

export default function Home() {
  return (
    <>
      <JsonLd data={WebSiteSchema()} />
      <JsonLd
        data={WebPageSchema({
          name: 'Usama Zahid — Brand & Product Designer | Brand-to-URL',
          url: 'https://usamazahid.design/',
          description:
            'Brand & Product Designer. Brand identity and a production-ready website, built together in four weeks. One system, one invoice, no handoff.',
        })}
      />
      <JsonLd
        data={FAQPageSchema([
          {
            q: 'How does the four-week timeline work?',
            a: 'Week 1 is Strategy & Positioning. Week 2 is Identity. Week 3 is Interface. Week 4 is Production Engineering and deployment to a live URL. One system, one invoice, zero handoff gap.',
          },
          {
            q: 'What is included in the Brand-to-URL delivery?',
            a: 'Visual identity system, documented guidelines, production Next.js website codebase, SEO metadata, launch assets, and 30 days of post-launch iteration support.',
          },
          {
            q: 'Do you design and code, or just design?',
            a: 'Both. I design in Figma and engineer production code using Next.js, React, TypeScript, and Tailwind CSS so nothing gets lost in handoffs.',
          },
          {
            q: 'How are projects priced and invoiced?',
            a: 'Fixed scope, fixed price, milestone invoicing. No surprise change orders and no unpredictable hourly billing.',
          },
          {
            q: 'Can we collaborate if we already have an existing brand or app?',
            a: 'Yes. Many engagements begin with a friction and UX audit of an existing product or website to pinpoint where users drop off.',
          },
          {
            q: 'What happens after launch?',
            a: 'Every project includes a 30-day warranty and post-launch iteration window for fine-tuning, with optional retainers for ongoing growth.',
          },
        ])}
      />

      <AuthenticDarkHome />
    </>
  );
}
