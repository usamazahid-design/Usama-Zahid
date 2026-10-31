import type { LegalDocument } from './legal-data';

export const privacyPolicy: LegalDocument = {
  slug: 'privacy-policy',
  code: 'L.01 / PRIVACY',
  number: '01',
  title: 'Privacy Policy.',
  shortTitle: 'Privacy',
  intro:
    'This policy explains what data is collected when you visit usamazahid.design, how it is used, and what rights you have. It is written to be readable. If something is unclear, email hello.usamazahid@gmail.com.',
  jurisdiction: 'Pakistan · GDPR-aware',
  effectiveDate: '01 March 2026',
  lastUpdated: '07 June 2026',
  version: 'V2.1',
  sections: [
    {
      id: 'overview',
      number: '01',
      title: 'Overview',
      body: [
        'Usama Zahid ("we", "us", "the operator") operates the website at usamazahid.design (the "site"). This Privacy Policy applies to the site and to any communication you initiate with us through it.',
        'We collect the minimum data needed to operate the site, respond to enquiries, and ship the work we are hired to do. We do not sell data. We do not run third-party advertising. We do not fingerprint visitors.',
        'If you are a client, additional terms apply through your engagement contract. This policy covers the public site only.',
      ],
    },
    {
      id: 'data-collected',
      number: '02',
      title: 'Data We Collect',
      body: [
        'We collect three categories of data: data you provide directly, data collected automatically, and data collected from third-party services you choose to engage with.',
      ],
      list: [
        'Form submissions, name, email, project type, and message body when you use the contact form. Stored in our inbox and our CRM.',
        'Email correspondence, any reply you send to hello.usamazahid@gmail.com is stored in our email and CRM systems.',
        'Server logs, IP address, user agent, request path, and referrer. Retained for 30 days for security and abuse detection.',
        'Analytics events, page views, scroll depth, click events. Sent to PostHog (self-hosted EU region) under a pseudonymous visitor ID. No cross-site tracking.',
        'Error reports, JavaScript errors and stack traces sent to Sentry. IPs are truncated before storage.',
      ],
    },
    {
      id: 'data-use',
      number: '03',
      title: 'How We Use Data',
      body: [
        'We use the data collected for the following purposes, and only these:',
      ],
      list: [
        'To respond to enquiries you send us through the contact form or by email.',
        'To deliver and improve the site, page performance, error monitoring, content iteration.',
        'To protect the site, abuse detection, rate limiting, security incident response.',
        'To maintain business records, invoices, contracts, project communications for active clients.',
        'To comply with legal obligations, tax records, lawful requests from authorities.',
      ],
    },
    {
      id: 'cookies',
      number: '04',
      title: 'Cookies & Local Storage',
      body: [
        'The site uses a small number of cookies and local storage entries. None are used for advertising. None are sold or shared with third-party advertisers.',
      ],
      list: [
        'session_id, a single first-party cookie used to remember your loading-screen state during a session. Expires when you close the browser.',
        'ph_<token>, PostHog analytics cookie, set only if you have not opted out via the cookie banner. Holds a pseudonymous visitor ID.',
        'Local storage, your cursor preference, scroll position memory, and accordion state for the FAQ sections. Cleared by clearing site data.',
      ],
      footnote: 'You can clear all site data through your browser settings at any time.',
    },
    {
      id: 'third-party',
      number: '05',
      title: 'Third-Party Services',
      body: [
        'The site uses the following third-party services to operate. Each operates under its own privacy policy. We have selected providers with data-protection standards at or above GDPR.',
      ],
      list: [
        'Vercel, site hosting and edge network. Server logs retained per Vercel policy.',
        'PostHog, product analytics, self-hosted in EU region. Pseudonymous visitor IDs.',
        'Sentry, error monitoring. Stack traces only; IPs truncated before storage.',
        'Sanity, content management for blog and portfolio. Public content only.',
        'Google Fonts, typography. May log IP for font delivery. Consider self-hosting if this is a concern.',
        'Cloudflare, DNS and DDoS protection. Logs anonymized at the edge.',
      ],
    },
    {
      id: 'sharing',
      number: '06',
      title: 'Data Sharing',
      body: [
        'We do not sell, rent, or trade your data. We do not share it with marketing partners. We share data only with the third-party services listed above, and only to the extent required for them to perform their function.',
        'We may disclose data if compelled by valid legal process. If we receive such a request, we will challenge it where appropriate and notify you where law permits.',
      ],
    },
    {
      id: 'retention',
      number: '07',
      title: 'Data Retention',
      body: [
        'Different categories of data are retained for different periods:',
      ],
      list: [
        'Contact form submissions, retained for 24 months, then deleted unless an active engagement exists.',
        'Email correspondence, retained for the life of the engagement plus 7 years for tax and contract records.',
        'Server logs, retained for 30 days, then deleted.',
        'Analytics events, retained for 12 months in PostHog, then aggregated or deleted.',
        'Error reports, retained for 90 days in Sentry, then deleted.',
      ],
    },
    {
      id: 'rights',
      number: '08',
      title: 'Your Rights',
      body: [
        'If you are in the EU, the UK, California, or another jurisdiction with data-protection rights, you have the following rights with respect to data we hold about you:',
      ],
      list: [
        'Access, request a copy of the data we hold about you.',
        'Correction, request that we correct inaccurate data.',
        'Deletion, request that we delete your data, subject to retention obligations.',
        'Portability, receive your data in a structured, machine-readable format.',
        'Objection, object to processing based on legitimate interest.',
        'Restriction, request that we limit processing while a complaint is resolved.',
        'Withdrawal of consent, withdraw consent at any time, where processing is consent-based.',
        'Complaint, lodge a complaint with your local data protection authority.',
      ],
      footnote: 'To exercise any of these rights, email hello.usamazahid@gmail.com. We respond within 30 days.',
    },
    {
      id: 'security',
      number: '09',
      title: 'Security',
      body: [
        'We take reasonable measures to protect data: HTTPS everywhere, scoped access controls, two-factor authentication on all operator accounts, regular dependency updates, and a 24-hour incident response window.',
        'No system is perfectly secure. If we become aware of a breach affecting your data, we will notify you within 72 hours of confirmation, in line with GDPR Article 33.',
      ],
    },
    {
      id: 'children',
      number: '10',
      title: "Children's Privacy",
      body: [
        'The site is not directed at children under 16. We do not knowingly collect data from children. If you believe a child has submitted data through the site, contact us and we will delete it.',
      ],
    },
    {
      id: 'transfers',
      number: '11',
      title: 'International Transfers',
      body: [
        'The site is operated from Pakistan. Some third-party service providers may process data in the EU, US, or other regions. By using the site, you acknowledge that your data may be transferred across borders.',
        'We rely on Standard Contractual Clauses (SCCs) and equivalent mechanisms to protect data in transit. PostHog is configured for EU storage; Vercel and Cloudflare operate in regions closest to the visitor by default.',
      ],
    },
    {
      id: 'changes',
      number: '12',
      title: 'Changes to This Policy',
      body: [
        'We may update this policy. Material changes will be reflected in the version number and the "last updated" date at the top of this page. We do not provide a changelog, but previous versions are available on request.',
        'Continued use of the site after a change indicates acceptance of the updated policy.',
      ],
    },
    {
      id: 'contact',
      number: '13',
      title: 'Contact',
      body: [
        'For any privacy-related question, request, or complaint, contact:',
      ],
      list: [
        'Email, hello.usamazahid@gmail.com',
        'Subject line, start with "PRIVACY ·" for faster routing.',
        'Response time, within 30 days, often within 24 hours.',
        'Postal, available on request. We do not maintain a public mailing address by default.',
      ],
    },
  ],
};
