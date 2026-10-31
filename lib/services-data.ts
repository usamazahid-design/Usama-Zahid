export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
  week: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServicePackage {
  id: string;
  code: string;
  name: string;
  price: string;
  priceValue: string;
  timeline: string;
  scope: string;
  description: string;
  bestFor: string;
  includes: string[];
  featured?: boolean;
}

export interface ServiceStat {
  label: string;
  value: string;
}

export interface ServiceCaseStudy {
  client: string;
  projectSlug: string;
  year: string;
  tag: string;
}

export interface Service {
  slug: string;
  number: string;
  code: string;
  title: string;
  shortTitle: string;
  tagline: string;
  metaDescription?: string;
  summary: string;
  heroLabel: string;
  heroLines: [string, string, string];
  heroSub: string;
  body: string;
  deliverables: string[];
  process: ServiceProcessStep[];
  timeline: string;
  bestFor: string;
  pricing: string;
  packages: [ServicePackage, ServicePackage, ServicePackage];
  ownership: string;
  tools: string[];
  stats: ServiceStat[];
  faqs: ServiceFAQ[];
  caseStudy: ServiceCaseStudy;
  relatedSlugs: string[];
  readingLinks?: string[];
  lastUpdated?: string;
  accent: string;
}

export const services: Service[] = [
  {
    slug: 'identity',
    number: '01',
    code: 'IDENTITY',
    title: 'Brand Systems',
    shortTitle: 'Identity',
    tagline: 'Identity systems that survive first contact with reality.',
    metaDescription:
      'Brand identity, visual systems, and design guidelines for founders and growing brands. Logos, color, type, and tokens that scale from launch to scale.',
    summary: 'A brand is a system of constraints, not a logo.',
    heroLabel: 'S.01 / THE_OPERATING_LAYER',
    heroLines: ['Identity', 'is a', 'system.'],
    heroSub:
      'Type, color, voice, motion, and the rules that hold them together. Built for daily use, not awards.',
    body:
      'A brand is a system of constraints, not a logo. I build the operating layer for how you appear, name, type, color, voice, motion, and the rules that hold them together. The output ships in three forms: a Figma library, a Notion guideline, and a PDF that survives being emailed. The system is yours to defend without me.',
    deliverables: [
      'Naming & verbal identity',
      'Type system & color',
      'Logo lockups & usage',
      'Brand guidelines (PDF + Notion)',
      'Asset library (Figma)',
      'Launch kit',
    ],
    process: [
      {
        step: '01',
        title: 'Audit & Interview',
        description:
          'Founder and team interviews. Audit of existing brand assets, competitive scan. Output: a 6-page brief document.',
        week: 'WEEK 01',
      },
      {
        step: '02',
        title: 'Positioning Sprint',
        description:
          'Two-day facilitated workshop. Positioning statement, audience map, messaging framework. Output: a strategy deck.',
        week: 'WEEK 02-03',
      },
      {
        step: '03',
        title: 'Visual Exploration',
        description:
          'Three parallel directions in week 04. One survives by week 06. Output: a final mark and lockup set.',
        week: 'WEEK 04-06',
      },
      {
        step: '04',
        title: 'System Build',
        description:
          'Type, color, motion, voice, components. The system is built in Figma, documented in Notion. Output: 40-80 page guideline.',
        week: 'WEEK 06-08',
      },
      {
        step: '05',
        title: 'Documentation',
        description:
          'PDF guideline. Notion workspace. Figma library. Training session with the team. Output: the team can defend the brand without me.',
        week: 'WEEK 09',
      },
      {
        step: '06',
        title: 'Handoff',
        description:
          'Assets delivered, accounts transferred, source files shared. Output: 100% ownership, zero dependencies.',
        week: 'WEEK 10',
      },
    ],
    timeline: '06-10 weeks',
    bestFor: 'New brands. Repositions. Re-launches.',
    pricing: 'FROM $12K',
    packages: [
      {
        id: 'signal',
        code: 'P.01',
        name: 'Signal',
        price: '$12K',
        priceValue: '12000',
        timeline: '03-04 weeks',
        scope: 'MARK · LOCKUPS · PALETTE',
        description:
          'A working identity you can ship with. Primary mark, lockups, type, and color, enough to look like a company, not a full operating system.',
        bestFor: 'Pre-launch brands. Tight timelines. First public surface.',
        includes: [
          'Primary mark and 2 lockups',
          'Type pairing and 5-color palette',
          'Basic usage sheet (PDF)',
          'Favicon and social avatars',
          'Two revision rounds',
        ],
      },
      {
        id: 'system',
        code: 'P.02',
        name: 'System',
        price: '$18K',
        priceValue: '18000',
        timeline: '06-10 weeks',
        scope: 'FULL_BRAND_SYSTEM',
        description:
          'The operating layer. Type, color, voice, motion, and the rules that hold them together, shipped as a Figma library, a Notion guideline, and a PDF.',
        bestFor: 'New brands. Repositions. Re-launches.',
        featured: true,
        includes: [
          'Everything in Signal',
          'Naming and verbal identity',
          'Logo lockups and usage rules',
          'Brand guidelines (PDF + Notion)',
          'Figma asset library',
          'Launch kit',
        ],
      },
      {
        id: 'archive',
        code: 'P.03',
        name: 'Archive',
        price: '$32K',
        priceValue: '32000',
        timeline: '10-14 weeks',
        scope: 'SYSTEM · LAUNCH · TRAINING',
        description:
          'The system plus everything required to put it in the world, motion language, environmental applications, campaign frames, and a training session so the team can defend it without me.',
        bestFor: 'Series A brands. Multi-surface launches. In-house teams.',
        includes: [
          'Everything in System',
          'Motion language and specs',
          'Environmental and packaging applications',
          'Campaign and social frame set',
          'Team training session',
          '30-day post-handoff review',
        ],
      },
    ],
    ownership: '100% yours. Source files, accounts, repos.',
    tools: ['Figma', 'Notion', 'Adobe Illustrator', 'Indesign', 'Lightroom'],
    stats: [
      { label: 'TIMELINE', value: '06-10W' },
      { label: 'FROM', value: '$12K' },
      { label: 'PAGES', value: '40-80' },
      { label: 'OWNERSHIP', value: '100%' },
    ],
    faqs: [
      {
        q: 'What is the difference between the three packages?',
        a: 'Signal is the mark and the palette, enough to launch. System is the full operating layer: verbal identity, guidelines, Figma library, and a launch kit. Archive adds motion, environmental applications, campaign frames, and a training session so the team can defend the brand without me. Most clients book System.',
      },
      {
        q: 'How long does a brand system take?',
        a: 'Six to ten weeks for a complete system. The first two weeks are positioning and verbal; the next two are visual exploration; the last two are system build and documentation. You can ship in stages if the timeline is tight, the verbal identity and the visual identity are independent deliverables.',
      },
      {
        q: 'What is the difference between a brand system and a brand identity?',
        a: 'An identity is a logo and a color palette. A system is the set of rules those elements live within, when to use which variant, how the wordmark behaves at small sizes, what tone of voice is on-brand, which motion language is allowed. The system survives personnel changes. The identity does not.',
      },
      {
        q: 'Do I need to provide the strategy first?',
        a: 'Strategy is a separate engagement. If you have already done positioning work, send the document. If not, I can run a three-week strategy sprint before the visual work begins. Most clients do both. Some skip the strategy and live with the consequences.',
      },
      {
        q: 'Can you work with our existing brand?',
        a: 'Yes. The most common engagement is a refresh, take what is working, fix what is not, document what was implicit. The system is rebuilt around the existing marks. Nothing is thrown away unless you say so. A refresh is usually 4-6 weeks.',
      },
      {
        q: 'Do you handle naming?',
        a: 'Naming is part of the verbal identity track. I work with a small shortlist of candidates, run a trademark and domain scan, and present a written rationale for the final pick. The name is yours to keep, defend, and trademark.',
      },
      {
        q: 'What about voice and tone?',
        a: 'Voice and tone are part of the system. The output is a 4-page voice document with do and do-not examples, plus a content template library for the most common surfaces, homepage, product page, error message, sales email. Marketing runs the templates. The voice document is the guardrail.',
      },
    ],
    caseStudy: {
      client: 'The Laila Majnu',
      projectSlug: 'the-laila-majnu-gifting',
      year: '2026',
      tag: 'Story-driven luxury gifting brand',
    },
    relatedSlugs: ['product', 'engineering', 'strategy'],
    readingLinks: [
      'brand-identity-for-tech-startups-a-revenue-problem',
      'what-is-brand-gravity-why-weak-brand-identity-raises-cpa',
      'the-visual-consistency-checklist-saas-founders',
      'generic-saas-design-isnt-safe-its-invisible',
    ],
    lastUpdated: '2026.08.12',
    accent: '#4B3FFF',
  },

  {
    slug: 'product',
    number: '02',
    code: 'PRODUCT',
    title: 'Product Design',
    shortTitle: 'Product',
    tagline: 'Interfaces that respect the user and the system.',
    metaDescription:
      'Product design and UX for web and mobile products. Research, wireframes, and high-fidelity interfaces built for the people who actually use the product.',
    summary: 'Products in systems, not screens.',
    heroLabel: 'S.02 / THE_USER_SURFACE',
    heroLines: ['Products in', 'systems,', 'not screens.'],
    heroSub:
      'Flows, screens, components, motion, states. Built to ship, not to screenshot. Every decision is documented so engineering can build without guessing.',
    body:
      'I design products the way engineers build them, in systems, not screens. Every component, every state, every motion is documented. The output is a Figma library that mirrors the codebase, plus a handoff package engineering can read on day one. The product is yours to extend, defend, and ship without me.',
    deliverables: [
      'User flows & IA',
      'Wireframes & prototypes',
      'High-fidelity UI',
      'Component library',
      'Motion specs',
      'Engineering handoff',
    ],
    process: [
      {
        step: '01',
        title: 'Discovery & Research',
        description:
          '5-8 stakeholder interviews, 3-5 user interviews, content audit, competitive scan. Output: research synthesis and opportunity map.',
        week: 'WEEK 01-02',
      },
      {
        step: '02',
        title: 'Information Architecture',
        description:
          'Sitemap, user flows, edge cases. Tested on paper with 3-5 users. Output: signed-off architecture.',
        week: 'WEEK 03',
      },
      {
        step: '03',
        title: 'Wireframing',
        description:
          'Low-fidelity wireframes, all key flows, all major states. Two rounds. Output: wireframes that survive contact with reality.',
        week: 'WEEK 04-05',
      },
      {
        step: '04',
        title: 'Visual Design',
        description:
          'High-fidelity screens in Figma, built on the system grid. Every component is named, versioned, and documented.',
        week: 'WEEK 06-08',
      },
      {
        step: '05',
        title: 'Prototyping & Motion',
        description:
          'Framer prototypes for the 3-5 critical flows. Motion specs for every transition. Tested with 3-5 users.',
        week: 'WEEK 09-10',
      },
      {
        step: '06',
        title: 'Handoff & QA',
        description:
          'Spec document, weekly implementation reviews, 2 rounds of QA. The design survives contact with engineering.',
        week: 'WEEK 11-12',
      },
    ],
    timeline: '08-12 weeks',
    bestFor: 'New products. New features. Redesigns.',
    pricing: 'FROM $14K',
    packages: [
      {
        id: 'flows',
        code: 'P.01',
        name: 'Flows',
        price: '$14K',
        priceValue: '14000',
        timeline: '04-06 weeks',
        scope: 'KEY_FLOWS · PROTOTYPE',
        description:
          'The three to five flows that actually convert. Wireframes, high-fidelity screens, and a clickable prototype, scoped to the surfaces that matter, not the whole product.',
        bestFor: 'MVP launches. Feature spikes. Validation sprints.',
        includes: [
          '3-5 key user flows',
          'Wireframes and hi-fi screens',
          'Clickable prototype',
          'Two revision rounds',
          'Annotated handoff',
        ],
      },
      {
        id: 'product',
        code: 'P.02',
        name: 'Product',
        price: '$24K',
        priceValue: '24000',
        timeline: '08-12 weeks',
        scope: 'FULL_PRODUCT_DESIGN',
        description:
          'The product designed as a system. Flows, screens, components, motion, and an engineering handoff that can be built from on day one.',
        bestFor: 'New products. New features. Redesigns.',
        featured: true,
        includes: [
          'Everything in Flows',
          'Information architecture',
          'Full high-fidelity UI',
          'Component library in Figma',
          'Motion specs',
          'Engineering handoff document',
        ],
      },
      {
        id: 'os',
        code: 'P.03',
        name: 'OS',
        price: '$42K',
        priceValue: '42000',
        timeline: '12-16 weeks',
        scope: 'RESEARCH · SYSTEM · QA',
        description:
          'Research through implementation QA. User interviews, the full product system, motion, and two rounds of engineering review so the design survives contact with code.',
        bestFor: 'Core products. Redesigns of live software. Teams without a design lead.',
        includes: [
          'Everything in Product',
          '5-8 user interviews and synthesis',
          'Opportunity map and IA',
          'Framer prototypes for critical flows',
          'Weekly implementation reviews',
          'Two QA rounds against production',
        ],
      },
    ],
    ownership: '100% yours. Figma files, specs, exports.',
    tools: ['Figma', 'Framer', 'FigJam', 'Notion', 'Loom', 'Maze'],
    stats: [
      { label: 'TIMELINE', value: '08-12W' },
      { label: 'FROM', value: '$14K' },
      { label: 'COMPONENTS', value: '60+' },
      { label: 'OWNERSHIP', value: '100%' },
    ],
    faqs: [
      {
        q: 'What is the difference between the three packages?',
        a: 'Flows covers the three to five screens that convert, wireframes, hi-fi, and a prototype. Product is the full system: IA, component library, motion specs, and an engineering handoff. OS adds research, Framer prototypes, and implementation QA so the design survives contact with code. Most clients book Product.',
      },
      {
        q: 'Do you build the product or just design it?',
        a: 'I do both. The design engagement includes the Figma library, motion specs, and an engineering handoff document. The build engagement (Engineering track) implements the design. Most clients do both as one continuous sequence, brand, design, code, ship.',
      },
      {
        q: 'What design tools do you use?',
        a: 'Figma for the design library, Framer for high-fidelity prototypes, FigJam for collaborative workshops. I work directly in the client Figma workspace, everything is shared, version-controlled, and owned by you from day one.',
      },
      {
        q: 'How do you handle engineering handoff?',
        a: 'Every component ships with a specification, states, motion, accessibility, content, edge cases. The spec lives in the Figma file and as a written document. Engineering can read it on day one and start building. I review the implementation weekly and adjust the design as needed.',
      },
      {
        q: 'Can you redesign an existing product?',
        a: 'Yes. A redesign usually starts with a 2-week audit, what is working, what is confusing, what is costing you conversions. The output is a sequenced redesign plan. The redesign itself is the same process as a new product: flows, screens, components, handoff.',
      },
      {
        q: 'What about user research?',
        a: 'I run lightweight research, 5-8 user interviews, a competitive scan, a content audit. For deeper research (large sample sizes, quantitative surveys, A/B testing), I bring in a research partner. The research is yours to keep, defend, and use to make decisions without me.',
      },
      {
        q: 'Do you design for mobile too?',
        a: 'Yes. The component library is responsive by default. Every component has a desktop, tablet, and mobile variant. Native iOS and Android work is a separate engagement, I do not ship to the app stores.',
      },
    ],
    caseStudy: {
      client: 'Petrozen',
      projectSlug: 'petrozen-erp',
      year: '2025',
      tag: 'Finance-first ERP for fuel trading',
    },
    relatedSlugs: ['engineering', 'identity', 'strategy'],
    readingLinks: [
      'saas-design-operating-system',
      'ai-product-design-build-saas-products-users-trust',
      'ai-ux-design-patterns',
      'designing-for-uncertainty-ai-ux-patterns',
      'the-trust-gap-in-ai-products',
    ],
    lastUpdated: '2026.08.12',
    accent: '#4B3FFF',
  },

  {
    slug: 'engineering',
    number: '03',
    code: 'ENGINEERING',
    title: 'Web Engineering',
    shortTitle: 'Engineering',
    tagline: 'Production code, not prototypes.',
    metaDescription:
      'Web engineering for startups and growing brands. React, Next.js, and design systems in code, with performance budgets and a handoff your team can deploy.',
    summary: 'The site ships clean, fast, accessible, and yours to own.',
    heroLabel: 'S.03 / THE_DEPLOYABLE_SURFACE',
    heroLines: ['Production', 'code,', 'not prototypes.'],
    heroSub:
      'Next.js, TypeScript, headless CMS, performance budgets, analytics, deployment. The work I ship is the work I can defend.',
    body:
      'Production code, not prototypes. Next.js, TypeScript, headless CMS, performance budgets, deployment, analytics. The site ships with measurable performance targets, a deploy pipeline, and documentation your team can extend. No template trash. No black boxes. The codebase is yours to own, fork, and run without me.',
    deliverables: [
      'Next.js / TypeScript codebase',
      'Headless CMS integration',
      'Component library (code)',
      'Performance & SEO',
      'Analytics & monitoring',
      'Documentation',
    ],
    process: [
      {
        step: '01',
        title: 'Architecture & Stack',
        description:
          'Routing strategy, data layer, CMS choice, deploy target. Output: a written architecture document, signed off before code begins.',
        week: 'WEEK 01-02',
      },
      {
        step: '02',
        title: 'Design System in Code',
        description:
          'Tailwind config, component primitives, motion system, design tokens. Output: a system the design and the code both reference.',
        week: 'WEEK 03-04',
      },
      {
        step: '03',
        title: 'Page & Feature Build',
        description:
          'All pages, all features, all states. Built on the system. Output: a working site, deployed to a staging environment.',
        week: 'WEEK 05-08',
      },
      {
        step: '04',
        title: 'Integration & Data',
        description:
          'CMS schemas, content import, third-party APIs, edge functions. Output: a site that updates without engineering.',
        week: 'WEEK 09-10',
      },
      {
        step: '05',
        title: 'Performance Pass',
        description:
          'Performance budgets and audits across the stack. Bundle analysis, image optimization, and font strategy. Output: a site that performs in production.',
        week: 'WEEK 11-12',
      },
      {
        step: '06',
        title: 'Deploy & Handoff',
        description:
          'Production deploy, DNS, monitoring, training. Source code, accounts, credentials transferred. Output: 100% ownership.',
        week: 'WEEK 13-14',
      },
    ],
    timeline: '06-14 weeks',
    bestFor: 'Marketing sites. Web apps. Custom CMS.',
    pricing: 'FROM $14K',
    packages: [
      {
        id: 'site',
        code: 'P.01',
        name: 'Site',
        price: '$14K',
        priceValue: '14000',
        timeline: '04-06 weeks',
        scope: 'MARKETING_SITE · DEPLOY',
        description:
          'A production marketing site. Next.js, TypeScript, performance pass, and a deploy pipeline, no CMS complexity, no app layer.',
        bestFor: 'Launch sites. Campaign sites. Brochure products.',
        includes: [
          'Next.js / TypeScript codebase',
          'Up to 8 page templates',
          'Performance pass (Lighthouse 95+)',
          'Vercel deploy and DNS',
          'Handoff documentation',
        ],
      },
      {
        id: 'production',
        code: 'P.02',
        name: 'Production',
        price: '$22K',
        priceValue: '22000',
        timeline: '06-14 weeks',
        scope: 'SITE · CMS · PERFORMANCE',
        description:
          'Production code, not a prototype. Next.js, headless CMS, performance budgets, analytics, and documentation your team can extend.',
        bestFor: 'Marketing sites. Web apps. Custom CMS.',
        featured: true,
        includes: [
          'Everything in Site',
          'Headless CMS integration',
          'Component library in code',
          'Performance and SEO (measurable targets)',
          'Analytics and monitoring',
          'Team documentation',
        ],
      },
      {
        id: 'platform',
        code: 'P.03',
        name: 'Platform',
        price: '$38K',
        priceValue: '38000',
        timeline: '12-16 weeks',
        scope: 'APP · CMS · HYPERCARE',
        description:
          'The site as an operating surface. App features, CMS, analytics, monitoring, training, and 30 days of hypercare after launch so the team can run it without me.',
        bestFor: 'Product sites. Content platforms. Teams taking over the repo.',
        includes: [
          'Everything in Production',
          'App features and authenticated states',
          'CMS schemas and content import',
          'Training session and runbook',
          '30-day hypercare after launch',
          'Source, accounts, and credentials transferred',
        ],
      },
    ],
    ownership: '100% yours. Code, accounts, credentials.',
    tools: ['Next.js 14', 'TypeScript', 'Tailwind', 'Framer Motion', 'Sanity', 'Vercel', 'PostHog', 'Sentry'],
    stats: [
      { label: 'TIMELINE', value: '06-14W' },
      { label: 'FROM', value: '$14K' },
      { label: 'PERFORMANCE', value: 'FOCUSED' },
      { label: 'OWNERSHIP', value: '100%' },
    ],
    faqs: [
      {
        q: 'What is the difference between the three packages?',
        a: 'Site is a production marketing site, Next.js, performance, deploy, without CMS complexity. Production adds a headless CMS, a code component library, analytics, and a strict performance budget. Platform adds app features, training, and 30 days of hypercare after launch. Most clients book Production.',
      },
      {
        q: 'What stack do you use?',
        a: 'Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Sanity CMS, Vercel Edge, PostHog analytics. The stack is not negotiable, it is what I am fastest in and what produces the most reliable output. If you need a different CMS (Contentful, Strapi, Payload), I can adapt; the rest stays the same.',
      },
      {
        q: 'Can I hire you to build a site I already designed?',
        a: 'Yes. I take 30-50% of build engagements from designs I did not make. The handoff is usually a Figma file plus a written brief. I review the design for buildability in week one and flag any technical issues before the build begins.',
      },
      {
        q: 'How do you handle the CMS?',
        a: 'I set up a headless CMS (Sanity by default) with structured schemas for your content types. The marketing team can edit content without engineering. I include a 2-hour training session at handoff. Post-launch content changes are typically done by your team, not by me.',
      },
      {
        q: 'What is the typical Lighthouse score?',
        a: 'Performance targets are set per project scope with LCP, CLS, interaction responsiveness, and speed as non-negotiable acceptance criteria. If the site is slow for its context, the engagement is not done. Performance is a feature, not an optimization.',
      },
      {
        q: 'Do you deploy and maintain?',
        a: 'I deploy the site and own the build pipeline for the engagement period. Post-handoff, the site is yours. I offer an optional monthly maintenance retainer (4 hours per month, $1.2K) for security updates, dependency upgrades, and minor content changes.',
      },
      {
        q: 'What about hosting?',
        a: 'Vercel is the default. The site is deployed on the edge, with 99.99% uptime SLA. Alternative hosts (Netlify, Cloudflare, AWS Amplify) are available on request. The site is portable, you can move it to a different host in 24 hours if needed.',
      },
    ],
    caseStudy: {
      client: 'CodeStreaks',
      projectSlug: 'stealth-humanizer-ai-app',
      year: '2026',
      tag: 'AI humanizer app redesign',
    },
    relatedSlugs: ['product', 'identity', 'strategy'],
    readingLinks: [
      'nextjs-framer-motion-gsap-triangulation',
      'saas-design-operating-system',
      '10-saas-landing-pages-torn-apart',
      'cognitive-load-is-killing-your-saas-conversions',
    ],
    lastUpdated: '2026.08.12',
    accent: '#4B3FFF',
  },

  {
    slug: 'strategy',
    number: '04',
    code: 'STRATEGY',
    title: 'Brand Strategy',
    shortTitle: 'Strategy',
    tagline: 'The decisions before the design decisions.',
    metaDescription:
      'Brand strategy and positioning for founders and growing brands. Stakeholder interviews, market scans, positioning workshops, messaging, and content architecture.',
    summary: 'Strategy is what happens before the design starts.',
    heroLabel: 'S.04 / THE_FOUNDATION_LAYER',
    heroLines: ['Strategy', 'before', 'the design.'],
    heroSub:
      'Positioning, messaging, audience, competitive frame, content architecture. The output is a document your team can argue with.',
    body:
      'Strategy is what happens before the design starts. Positioning, messaging, audience, competitive frame, content architecture. The output is a single document your team can argue with, and a system your designers can build from on day one. The strategy is yours to defend, update, and use to make decisions without me.',
    deliverables: [
      'Positioning & narrative',
      'Audience & segment map',
      'Messaging framework',
      'Content architecture',
      'Competitive audit',
      'Decision log',
    ],
    process: [
      {
        step: '01',
        title: 'Stakeholder Interviews',
        description:
          '5-8 internal interviews. Founders, sales, customer success, product, marketing. 30-45 minutes each, recorded, transcribed.',
        week: 'WEEK 01',
      },
      {
        step: '02',
        title: 'Market & Competitor Scan',
        description:
          'Direct competitors, adjacent players, emerging threats. 12-18 companies profiled. Output: a competitive landscape document.',
        week: 'WEEK 02',
      },
      {
        step: '03',
        title: 'Positioning Workshop',
        description:
          '2-day facilitated workshop with 5-8 stakeholders. Positioning statement, narrative, proof points. Output: a working positioning doc.',
        week: 'WEEK 03',
      },
      {
        step: '04',
        title: 'Messaging Build',
        description:
          'Pillars, value props, headline candidates, supporting copy. Tested with 3-5 customers. Output: a messaging framework.',
        week: 'WEEK 04',
      },
      {
        step: '05',
        title: 'Content Architecture',
        description:
          'Information architecture, content templates, editorial calendar. Output: a content map the marketing team runs without me.',
        week: 'WEEK 05',
      },
      {
        step: '06',
        title: 'Handoff & Decision Log',
        description:
          'Final 40-60 page strategy deck. Decision log with the tradeoffs considered. Handoff to design and engineering.',
        week: 'WEEK 06',
      },
    ],
    timeline: '03-06 weeks',
    bestFor: 'Pre-brand. Repositions. New markets.',
    pricing: 'FROM $8K',
    packages: [
      {
        id: 'position',
        code: 'P.01',
        name: 'Position',
        price: '$8K',
        priceValue: '8000',
        timeline: '02-03 weeks',
        scope: 'WORKSHOP · POSITIONING_DOC',
        description:
          'The decision before the rest of the decisions. Stakeholder interviews, a two-day workshop, and a positioning document your team can argue with.',
        bestFor: 'Pre-brand. Founders who already know the market.',
        includes: [
          '5-8 stakeholder interviews',
          'Two-day positioning workshop',
          'Positioning statement and narrative',
          'Written rationale and decision log',
          'One revision round',
        ],
      },
      {
        id: 'strategy',
        code: 'P.02',
        name: 'Strategy',
        price: '$12K',
        priceValue: '12000',
        timeline: '03-06 weeks',
        scope: 'FULL_STRATEGY_DECK',
        description:
          'Positioning, messaging, audience, competitive frame, and content architecture. One document your designers can build from on day one.',
        bestFor: 'Pre-brand. Repositions. New markets.',
        featured: true,
        includes: [
          'Everything in Position',
          'Market and competitor scan',
          'Messaging framework',
          'Audience and segment map',
          'Content architecture',
          '40-60 page strategy deck',
        ],
      },
      {
        id: 'brief',
        code: 'P.03',
        name: 'Brief',
        price: '$20K',
        priceValue: '20000',
        timeline: '06-08 weeks',
        scope: 'STRATEGY · TEMPLATES · HANDOFF',
        description:
          'The full strategy plus the operating documents marketing runs without me, content templates, an editorial calendar, and a facilitated handoff into design and engineering.',
        bestFor: 'Repositions. New markets. Teams about to hire design.',
        includes: [
          'Everything in Strategy',
          'Customer interviews (3-5)',
          'Content templates for core surfaces',
          'Editorial calendar',
          'Facilitated handoff to design',
          'On-site or remote workshop travel as quoted',
        ],
      },
    ],
    ownership: '100% yours. Documents, frameworks, audits.',
    tools: ['Notion', 'Miro', 'Loom', 'Granola', 'Figma'],
    stats: [
      { label: 'TIMELINE', value: '03-06W' },
      { label: 'FROM', value: '$8K' },
      { label: 'PAGES', value: '40-60' },
      { label: 'OWNERSHIP', value: '100%' },
    ],
    faqs: [
      {
        q: 'What is the difference between the three packages?',
        a: 'Position is the workshop and the positioning document, the decision before the rest of the decisions. Strategy is the full deck: competitive scan, messaging, audience map, and content architecture. Brief adds customer interviews, content templates, an editorial calendar, and a facilitated handoff into design. Most clients book Strategy.',
      },
      {
        q: 'How is strategy different from research?',
        a: 'Research is the gathering. Strategy is the decision. The output of research is data. The output of strategy is a set of choices your team can defend. I do both, but the document I hand you is a strategy document, opinionated, specific, and actionable.',
      },
      {
        q: 'Who do you interview?',
        a: '5-8 stakeholders: founders, sales, customer success, product, marketing. Plus 3-5 customers if access is available. Interviews are 30-45 minutes, recorded, transcribed, and shared. You own the recordings and the transcripts.',
      },
      {
        q: 'What does the final document look like?',
        a: 'A 40-60 page strategy deck. Sections: market, customer, positioning, messaging, content architecture, decision log. Written for argument, not for decoration. Most of it is editable; some of it (positioning) is a recommendation you can take or leave.',
      },
      {
        q: 'Can strategy run before the brand is built?',
        a: 'Yes, and it should. Strategy is a 3-6 week sprint that ends before the visual work begins. Doing the strategy first saves 3-4 weeks of backtracking during the design phase. Most of my clients run strategy and design as a single sequence.',
      },
      {
        q: 'Do you attend workshops?',
        a: 'I run them. The 2-day positioning workshop is the most common, 5-8 stakeholders, facilitated, with a working positioning document by end of day two. The workshop can run on-site (Lahore + 1-day travel) or remote. Travel costs are quoted separately.',
      },
      {
        q: 'What if we already have positioning?',
        a: 'I audit it. Most positioning documents are not strategy documents, they are summaries of what the team already believes. The audit is a 1-week engagement: I review the document, interview 5-8 stakeholders, and produce a written assessment. The decision to rebuild or refine is yours.',
      },
    ],
    caseStudy: {
      client: 'Petrozen',
      projectSlug: 'petrozen-erp',
      year: '2025',
      tag: 'Multi-tenant ERP operating system',
    },
    relatedSlugs: ['identity', 'product', 'engineering'],
    readingLinks: [
      'brand-to-url-operating-system',
      'brand-identity-for-tech-startups-a-revenue-problem',
      'how-much-does-saas-website-design-cost',
      'freelance-designer-vs-agency-for-saas',
    ],
    lastUpdated: '2026.08.12',
    accent: '#4B3FFF',
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}

export function getRelatedServices(slug: string): Service[] {
  const current = getServiceBySlug(slug);
  if (!current) return [];
  return current.relatedSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is Service => Boolean(s));
}
