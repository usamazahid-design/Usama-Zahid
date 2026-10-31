import type { LegalDocument } from './legal-data';

export const termsConditions: LegalDocument = {
  slug: 'terms',
  code: 'L.02 / TERMS',
  number: '02',
  title: 'Terms & Conditions.',
  shortTitle: 'Terms',
  intro:
    'These terms govern your use of usamazahid.design (the "site") and any engagement initiated through it. They are written in plain English. If something is unclear, ask before you engage.',
  jurisdiction: 'Pakistan · International',
  effectiveDate: '01 March 2026',
  lastUpdated: '07 June 2026',
  version: 'V2.0',
  sections: [
    {
      id: 'agreement',
      number: '01',
      title: 'Agreement',
      body: [
        'By accessing or using the site, you agree to be bound by these Terms & Conditions. If you do not agree, do not use the site.',
        'These terms apply to the public site only. Engagements for design, engineering, or strategy work are governed by separate service agreements that take precedence over these terms where the two conflict.',
      ],
    },
    {
      id: 'services',
      number: '02',
      title: 'Services Offered',
      body: [
        'The site describes services available for hire, including brand strategy, identity systems, product design, web engineering, and limited-time bundled offers. Descriptions on the site are illustrative, not contractual.',
        'Specific deliverables, timelines, and fees are agreed in writing before any engagement begins. The site itself is a portfolio and a means of initiating contact, it is not a contract for services.',
      ],
    },
    {
      id: 'use',
      number: '03',
      title: 'Acceptable Use',
      body: [
        'You agree to use the site for lawful purposes only. The following are prohibited:',
      ],
      list: [
        'Attempting to access the site by means other than the interface provided.',
        'Probing, scanning, or testing the vulnerability of the site or its infrastructure without prior written permission.',
        'Reverse engineering, decompiling, or otherwise attempting to extract source code from any part of the site.',
        'Submitting forms with content that is unlawful, defamatory, harassing, or that impersonates any person or entity.',
        'Uploading or transmitting viruses, malware, or any code designed to disrupt the site or its users.',
        'Scraping, crawling, or automated harvesting of content from the site at a rate that exceeds reasonable human use.',
      ],
    },
    {
      id: 'ip',
      number: '04',
      title: 'Intellectual Property',
      body: [
        'All content on the site, including text, graphics, logos, code, type system, motion system, photography, case studies, and the U mark, is the property of Usama Zahid or the respective client whose work is shown, and is protected by applicable copyright, trademark, and design-rights law.',
        'You may view and reference the site for personal, non-commercial evaluation. You may not reproduce, distribute, modify, or create derivative works from any part of the site without prior written permission.',
        'Case studies that include client work are shown with the client\'s permission only. The intellectual property of client work is governed by the relevant client engagement agreement.',
      ],
    },
    {
      id: 'user-content',
      number: '05',
      title: 'Content You Submit',
      body: [
        'When you submit content through the contact form, newsletter signup, or any other form on the site, you grant us a non-exclusive, royalty-free, worldwide license to use that content for the purpose of responding to your enquiry, providing the service you requested, and operating the site.',
        'You confirm that you have the right to submit the content you submit, and that it does not infringe the rights of any third party.',
      ],
    },
    {
      id: 'third-party',
      number: '06',
      title: 'Third-Party Links & Tools',
      body: [
        'The site may link to third-party services, tools, or websites. We are not responsible for the content, policies, or practices of any third party. Following a third-party link is at your own risk.',
        'The site uses third-party infrastructure including Vercel, PostHog, Sentry, Sanity, and Google Fonts. Their availability and behavior are governed by their respective terms.',
      ],
    },
    {
      id: 'disclaimers',
      number: '07',
      title: 'Disclaimers',
      body: [
        'The site is provided "as is" and "as available" without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.',
        'We do not warrant that the site will be uninterrupted, error-free, or free of harmful components. We do not warrant the accuracy, completeness, or usefulness of any content on the site.',
        'Testimonials, case studies, and statistics shown on the site reflect the experience of named clients and are presented in good faith. They are not guarantees of future results.',
      ],
    },
    {
      id: 'liability',
      number: '08',
      title: 'Limitation of Liability',
      body: [
        'To the maximum extent permitted by law, Usama Zahid shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the site, including but not limited to loss of profits, data, goodwill, or other intangible losses.',
        'Where liability cannot be excluded, our total aggregate liability for any claim arising from your use of the site shall not exceed USD 100.',
      ],
    },
    {
      id: 'indemnification',
      number: '09',
      title: 'Indemnification',
      body: [
        'You agree to indemnify and hold harmless Usama Zahid from any claim, demand, loss, or expense (including reasonable legal fees) arising from your breach of these terms, your use of the site, or your violation of any third-party right.',
      ],
    },
    {
      id: 'governing-law',
      number: '10',
      title: 'Governing Law',
      body: [
        'These terms are governed by the laws of Pakistan, with the courts of Lahore having exclusive jurisdiction. Where local consumer-protection law grants you stronger rights, those rights prevail.',
        'For users in the EU, UK, or other jurisdictions with mandatory consumer protections, this clause does not override those protections.',
      ],
    },
    {
      id: 'modifications',
      number: '11',
      title: 'Modifications',
      body: [
        'We may update these terms from time to time. Material changes will be reflected in the version number and the "last updated" date. Continued use of the site after a change indicates acceptance of the updated terms.',
      ],
    },
    {
      id: 'termination',
      number: '12',
      title: 'Termination',
      body: [
        'We may suspend or terminate your access to the site at any time, with or without notice, for conduct that violates these terms or is otherwise harmful to other users, the site, or us.',
        'Provisions of these terms that by their nature should survive termination, including but not limited to intellectual property, disclaimers, indemnification, and limitations of liability, shall survive.',
      ],
    },
    {
      id: 'contact',
      number: '13',
      title: 'Contact',
      body: [
        'For any question about these terms, contact:',
      ],
      list: [
        'Email, hello.usamazahid@gmail.com',
        'Subject line, start with "TERMS ·" for faster routing.',
        'Response time, within 30 days, often within 24 hours.',
        'For privacy-related questions, see the Privacy Policy.',
      ],
    },
  ],
};
