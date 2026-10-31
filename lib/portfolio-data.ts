export type FidelityTag = 'TEXT' | 'RAW' | 'LOW-FI' | 'MID-FI' | 'HI-FI';

export type ProjectCategory =
  | 'ai-saas'
  | 'fintech'
  | 'operations'
  | 'ui-ux';

export type ProjectTemplate = 'ai-case-study' | 'ui-ux';

export type GalleryLayout = 'hero' | 'duo' | 'trio' | 'quad' | 'full-bleed';

export interface CaseMedia {
  id: string;
  title: string;
  caption?: string;
  fidelity: FidelityTag;
  layout?: GalleryLayout;
  content:
    | { type: 'image'; src: string; alt: string }
    | { type: 'video'; url: string; thumbnail?: string }
    | { type: 'prototype'; url: string };
}

export interface ProjectBase {
  slug: string;
  number: string;
  title: string;
  /** Optional SERP-optimized title for <title> and OpenGraph */
  seoTitle?: string;
  subtitle: string;
  client: string;
  year: string;
  role: string;
  duration: string;
  excerpt: string;
  /** Optional SERP snippet. Falls back to a truncated excerpt. Keep under 155 characters. */
  metaDescription?: string;
  accentColor: string;
  featured?: boolean;
  url?: string;
  category: ProjectCategory;
  scope: string[];
  team: string;
  platform: string;
  tools: string[];
  hook: {
    outcomeLine: string;
    image: CaseMedia;
  };
}

export interface CaseStudyProject extends ProjectBase {
  template?: 'ai-case-study';
  context: {
    summary: string;
  };
  aiProblem: {
    statement: string;
    quotes: string[];
    evidence: CaseMedia[];
  };
  uxResearch: {
    methods: string[];
    findings: string[];
    artifacts: CaseMedia[];
  };
  mentalModels: {
    summary: string;
    maps: CaseMedia[];
  };
  problemFraming: {
    statement: string;
    expectationGap?: string;
    gapDiagram?: CaseMedia;
  };
  designDecisions: {
    sketches: CaseMedia[];
    options: {
      rejected: string;
      chosen: string;
      reasoning: string;
    }[];
  };
  theWork: {
    midFi: CaseMedia[];
    hiFi: CaseMedia[];
    prototype?: CaseMedia;
    designSystem: { token: string; detail: string }[];
    motionSpecs?: string[];
  };
  aiUxPatterns: {
    components: CaseMedia[];
    states: { name: string; behavior: string }[];
    edgeCases: { scenario: string; handling: string }[];
  };
  usabilityTesting: {
    clips: CaseMedia[];
    beforeAfter: { before: string; after: string; change: string }[];
    heatmaps: CaseMedia[];
  };
  outcome: {
    screens: CaseMedia[];
    metrics: { label: string; value: string; delta?: string }[];
    liveUrl?: string;
  };
  reflection: {
    narrative: string;
    nextMoves: string[];
  };
}

export interface UIUXProject extends ProjectBase {
  template: 'ui-ux';
  overview: {
    summary: string;
  };
  problem: {
    statement: string;
    goals: string[];
  };
  research: {
    methods: string[];
    insights: string[];
    artifacts: CaseMedia[];
  };
  flows: {
    summary: string;
    diagrams: CaseMedia[];
  };
  wireframes: {
    summary?: string;
    frames: CaseMedia[];
  };
  visualDesign: {
    summary: string;
    screens: CaseMedia[];
    styleTokens: { token: string; detail: string }[];
  };
  prototype?: {
    summary?: string;
    media?: CaseMedia;
    motionNotes?: string[];
  };
  outcome: {
    metrics: { label: string; value: string; delta?: string }[];
    screens: CaseMedia[];
    liveUrl?: string;
  };
  reflection: {
    narrative: string;
    nextMoves: string[];
  };
}

export type Project = CaseStudyProject | UIUXProject;

export const projects: Project[] = [
  {
    slug: 'petrozen-erp',
    number: '001',
    title: 'Petrozen ERP',
    seoTitle: 'Petrozen ERP UI/UX Case Study — 58% Fewer Accounting Errors',
    subtitle:
      'A finance-first ERP that replaced spreadsheet chaos with a single ledger of truth — cutting invoice-to-cash reconciliation from days to minutes.',
    client: 'Petrozen',
    year: '2025',
    role: 'Lead Product Designer (UI/UX)',
    duration: '16 weeks',
    excerpt:
      'End-to-end UI/UX for Petrozen ERP: research, IA, wireframes, and a desktop-first sales-to-ledger interface where each company runs on its own isolated system.',
    metaDescription:
      'Petrozen ERP UI/UX design case study: how a finance-first multi-tenant ledger cut accounting errors by 58% and invoice entry time by 46%.',
    accentColor: '#F77237',
    featured: true,
    url: 'neuraldesk.ai',
    template: 'ui-ux',
    category: 'ui-ux',
    scope: [
      'UX Research',
      'Information Architecture',
      'Interaction Design',
      'UI Design',
      'Design System',
    ],
    team: '1 product designer, 1 PM, 2 engineers, 1 accounting SME',
    platform: 'Web app (desktop-first ERP UI)',
    tools: ['Figma', 'Notion', 'Airtable', 'Chart.js', 'Postman'],
    hook: {
      outcomeLine: 'One ledger. Zero spreadsheet chaos.',
      image: {
        id: 'hook-1',
        title: 'Dashboard Design',
        caption: 'High-fidelity final screen of the Petrozen ERP sales and ledger dashboard.',
        fidelity: 'HI-FI',
        layout: 'duo',
        content: {
          type: 'image',
          src: '/images/portfolio/Petrozen-ERP/hero.webp',
          alt: 'Petrozen ERP final dashboard mockup',
        },
      },
    },
    overview: {
      summary:
        'Petrozen ERP was built for fuel-trading companies leaving Excel and manual books. I led the UI/UX — research, flows, wireframes, and visual UI — so every sale posts to the right ledger without asking users to think like accountants.',
    },
    problem: {
      statement:
        'Teams were losing money to manual posting errors, unclear customer balances, and reports that took days to trust.',
      goals: [
        'Auto-post double-entry from familiar business documents.',
        'Surface real outstanding balances without month-end wait.',
        'Make every number traceable to a source transaction.',
      ],
    },
    research: {
      methods: [
        '9 contextual interviews with accountants and sales staff',
        '2 shadowing sessions during month-end close',
        'Audit of 6 Excel-based bookkeeping setups',
      ],
      insights: [
        'Users trusted a system only when every number traced back to a source transaction.',
        'Friction was not data entry — it was fear of an unrecoverable posting mistake.',
        'Sales and accounting needed the same data with different vocabulary and views.',
      ],
      artifacts: [
        {
          id: 'research-1',
          title: 'Key research findings',
          caption: 'Patterns from interviews across sales and accounting roles.',
          fidelity: 'RAW',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Petrozen-ERP/key-research.webp',
            alt: 'Key Research Findings',
          },
        },
        {
          id: 'research-2',
          title: 'Reconciliation gap',
          caption: 'Manual ledger entries produced recurring mismatches against bank records.',
          fidelity: 'RAW',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Petrozen-ERP/reconciliation.webp',
            alt: 'Spreadsheet screenshot showing reconciliation mismatches',
          },
        },
      ],
    },
    flows: {
      summary:
        'I rebuilt the IA around one primary path: create invoice → auto tax & ledger post → update balances → report — so a single save does an accountant’s work without hiding the system.',
      diagrams: [
        {
          id: 'flow-1',
          title: 'Invoice-to-ledger expectation map',
          caption: 'What users assumed happened behind a single invoice save.',
          fidelity: 'LOW-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Petrozen-ERP/mental-model.webp',
            alt: 'Invoice-to-ledger mental model map',
          },
        },
        {
          id: 'flow-2',
          title: 'Admin flow',
          caption: 'Authority and company setup around the multi-tenant system.',
          fidelity: 'LOW-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Petrozen-ERP/admin-flow.webp',
            alt: 'Admin flow sketch',
          },
        },
      ],
    },
    wireframes: {
      summary:
        'Low and mid-fidelity structure for invoicing, payment allocation, and balance placement before visual UI.',
      frames: [
        {
          id: 'wire-1',
          title: 'Sales & purchase invoice wireframe',
          caption: 'Mid-fidelity invoice structure before hi-fi polish.',
          fidelity: 'MID-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Petrozen-ERP/wireframe.webp',
            alt: 'Mid fidelity invoice wireframe',
          },
        },
        {
          id: 'wire-2',
          title: 'Invoice-to-ledger sketch',
          caption: 'How one invoice fans out into ledger entries.',
          fidelity: 'LOW-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Petrozen-ERP/payment-allocation-note.webp',
            alt: 'Low fidelity invoice-to-ledger sketch',
          },
        },
        {
          id: 'wire-3',
          title: 'Balance placement studies',
          caption: 'Where customer balance should surface across screens.',
          fidelity: 'LOW-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Petrozen-ERP/user-action.webp',
            alt: 'Low fidelity balance placement studies',
          },
        },
        {
          id: 'wire-4',
          title: 'Payment allocation',
          caption: 'Density and allocation patterns explored before hi-fi.',
          fidelity: 'LOW-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Petrozen-ERP/payment-allocation.webp',
            alt: 'Payment allocation exploration',
          },
        },
      ],
    },
    visualDesign: {
      summary:
        'A dense but legible desktop system: clear status language, traceable ledger chips, and balance indicators that make risk visible without accounting jargon.',
      screens: [
        {
          id: 'ui-1',
          title: 'Invoice creation',
          caption: 'Multi-item invoicing with live tax, discount, and status handling.',
          fidelity: 'HI-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Petrozen-ERP/invoice-creation.webp',
            alt: 'High fidelity invoice creation screen',
          },
        },
        {
          id: 'ui-2',
          title: 'Customer ledger',
          caption: 'Full financial history with linked invoices, payments, and running balance.',
          fidelity: 'HI-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Petrozen-ERP/customer-ledger.webp',
            alt: 'High fidelity customer ledger view',
          },
        },
        {
          id: 'ui-3',
          title: 'Company creation',
          caption: 'Admin flow to stand up an isolated company tenant.',
          fidelity: 'HI-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Petrozen-ERP/company-creation.webp',
            alt: 'Company creation screen',
          },
        },
        {
          id: 'ui-4',
          title: 'Reports dashboard',
          caption: 'Trial Balance, P&L, and Cash Flow from live ledger data.',
          fidelity: 'HI-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Petrozen-ERP/report.webp',
            alt: 'High fidelity reports dashboard',
          },
        },
        {
          id: 'ui-5',
          title: 'ERP UX patterns',
          caption: 'Draft, posted, overdue, and reconciled state language in the UI.',
          fidelity: 'HI-FI',
          layout: 'trio',
          content: {
            type: 'image',
            src: '/images/portfolio/Petrozen-ERP/erp-ux.webp',
            alt: 'ERP UX pattern component closeups',
          },
        },
      ],
      styleTokens: [
        { token: 'invoice.status', detail: 'Draft, Paid, Pending, Overdue — four states, one language.' },
        { token: 'ledger.entry', detail: 'Debit/credit chips with source-document traceability.' },
        { token: 'balance.indicator', detail: 'Color-coded outstanding balance by risk level.' },
      ],
    },
    prototype: {
      summary: 'Interactive Figma walkthrough of invoice, ledger, and reporting flows before build.',
      media: {
        id: 'prototype-1',
        title: 'Interactive prototype',
        caption: 'Walk the invoice, ledger, and reporting flows.',
        fidelity: 'HI-FI',
        content: {
          type: 'prototype',
          url: 'https://www.figma.com/design/Ih4jYp68tz0Ljbr9sDAAOv/ERP-System?node-id=0-1&t=kUcTJvs3trliZ1SU-1',
        },
      },
      motionNotes: [
        'Ledger posting confirmation at 150ms so auto-post feels visible, not silent.',
        'Balance updates use a 200ms count-up so the number change is felt.',
      ],
    },
    outcome: {
      metrics: [
        { label: 'RECONCILIATION_TIME', value: '<1 HR', delta: 'from 3.5 days' },
        { label: 'POSTING_ERRORS', value: '0.4%', delta: 'from 11%' },
        { label: 'REPORT_TRUST_SCORE', value: '4.7/5', delta: 'from 2.5/5' },
      ],
      screens: [
        {
          id: 'outcome-1',
          title: 'Shipped product in context',
          caption: 'The sales and ledger cockpit in daily use.',
          fidelity: 'HI-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Petrozen-ERP/final.webp',
            alt: 'Petrozen ERP shipped product in context',
          },
        },
      ],
    },
    reflection: {
      narrative:
        'Trust is the product in finance UI. Accuracy alone did not move behavior — explicit evidence, clear status language, and recoverable mistakes did.',
      nextMoves: [
        'Run longitudinal trust tracking over 90 days.',
        'Tighten payment allocation density for power users.',
      ],
    },
  },
  
  
  {
    slug: 'stealth-humanizer-ai-app',
    number: '002',
    title: 'Stealth Humanizer',
    seoTitle: 'Stealth Humanizer AI Mobile App UI/UX Redesign Case Study',
    subtitle: 'A mobile UI/UX redesign that puts text input and clear hierarchy first.',
    client: 'CodeStreaks',
    year: '2026',
    role: 'Product Designer (UI/UX)',
    duration: '2 weeks',
    excerpt:
      'End-to-end UI/UX redesign of an AI text humanizer: research, IA, wireframes, visual system, and prototype.',
    metaDescription:
      'Stealth Humanizer AI mobile app UI/UX redesign case study: simplifying AI text humanization and detector flows on iOS and Android.',
    accentColor: '#4B3FFF',
    url: 'cadence.app',
    template: 'ui-ux',
    category: 'ui-ux',
    scope: ['UX Research', 'Information Architecture', 'UI Design', 'Prototyping'],
    team: 'Solo Project',
    platform: 'iOS & Android (mobile)',
    tools: ['Figma', 'Stitch', 'UxPilot', 'Slack'],
    hook: {
      outcomeLine: 'Clarity over clutter.',
      image: {
        id: 'cd-hook',
        title: 'Stealth Humanizer — redesigned home',
        caption: 'Primary input and filters held in one clear hierarchy.',
        fidelity: 'HI-FI',
        layout: 'duo',
        content: {
          type: 'image',
          src: '/images/portfolio/StealthApp/hero-stealthapp.webp',
          alt: 'Stealth Humanizer redesigned home screen',
        },
      },
    },
    overview: {
      summary:
        'Stealth Humanizer needed a clearer mobile experience. I led the end-to-end UI/UX redesign — research, information architecture, wireframes, visual UI, and prototype — so first-time users could humanize text without hunting for the input.',
    },
    problem: {
      statement:
        'New users left within days: the home screen scattered filters across the view, and the text field sat so far down that people scrolled two or three times before they could start.',
      goals: [
        'Put the primary text action above the fold.',
        'Group filters into one predictable control surface.',
        'Make the first session self-explanatory without a tutorial.',
      ],
    },
    research: {
      methods: ['9 user interviews', 'Play Store review mining', 'Competitive teardown of 3 apps'],
      insights: [
        'People would not pay for a tool they could not understand in the first session.',
        'Scattered filters read as noise, not control.',
        'Home and navigation failed the “what do I do next?” test.',
      ],
      artifacts: [
        {
          id: 'cd-research-1',
          title: 'Interview synthesis',
          caption: 'Patterns from user interviews and session notes.',
          fidelity: 'RAW',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/StealthApp/user-interview-data.webp',
            alt: 'Interview feedback',
          },
        },
        {
          id: 'cd-research-2',
          title: 'Competitive teardown',
          caption: 'Pattern audit across leading humanizer apps.',
          fidelity: 'RAW',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/StealthApp/compatative-analysis-stealthapp.webp',
            alt: 'Stealth competitive teardown',
          },
        },
      ],
    },
    flows: {
      summary:
        'I rebuilt the information architecture around one primary path: open → paste or type → detect → humanize → review history — with filters attached to the task, not floating as decoration.',
      diagrams: [
        {
          id: 'cd-flow-1',
          title: 'Experience map',
          caption: 'Pain points and review signals mapped before redesign.',
          fidelity: 'LOW-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/StealthApp/ux-experience-stealthapp.webp',
            alt: 'Stealth App UX experience sheet',
          },
        },
        {
          id: 'cd-flow-2',
          title: 'App flow',
          caption: 'Synchronized path from input through detection to results.',
          fidelity: 'LOW-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/StealthApp/app-flow-stealthapp.webp',
            alt: 'Stealth app flow diagram',
          },
        },
      ],
    },
    wireframes: {
      summary: 'Low and mid-fidelity exploration of the home, Peocessing, Results, and history screens.',
      frames: [
        {
          id: 'cd-wire-1',
          title: 'App Sktches',
          caption: 'App initial Sketches, In this phase I try to solve Ux problems.',
          fidelity: 'LOW-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/StealthApp/sketches-stealthapp.webp',
            alt: 'Stealth App sketches',
          },
        },
        {
          id: 'cd-wire-2',
          title: 'Logging interaction',
          caption: 'Quick-log patterns explored on paper.',
          fidelity: 'LOW-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/StealthApp/wireframe-stealthapp.webp',
            alt: 'Stealth logging interaction wireframes',
          },
        },
        /*{
          id: 'cd-wire-3',
          title: 'Review screen',
          caption: 'Mid-fidelity nightly review layout.',
          fidelity: 'MID-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/stealth-review-wireframe.png',
            alt: 'Stealth review screen wireframe',
          },
        },*/
      ],
    },
    visualDesign: {
      summary:
        'A calm, high-contrast visual system with a single accent, generous spacing, and friendly progress feedback that celebrates consistency over perfection.',
      screens: [
        {
          id: 'cd-ui-1',
          title: 'Home Screen - Stealth Humanizer',
          caption: 'Final home with good inforamtion architecture and user-friendly and engaging app.',
          fidelity: 'HI-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/StealthApp/Home-stelthapp.webp',
            alt: 'Stealth final daily home screen',
          },
        },
        {
          id: 'cd-ui-2',
          title: 'Ai Detection Screen - Stealth Humanizer',
          caption: 'Animated and engaging ai detection screen.',
          fidelity: 'HI-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/StealthApp/Deteaction-stealthapp.webp',
            alt: 'Stealth ai detection screen',
          },
        },
        {
          id: 'cd-ui-3',
          title: 'Results Screen - Stealth Humanizer',
          caption: 'Engaging and informative results screen.',
          fidelity: 'HI-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/StealthApp/Result-stealthapp.webp',
            alt: 'Ai detection Results screen',
          },
        },
        {
          id: 'cd-ui-4',
          title: 'History screen - Stealth Humanizer',
          caption: 'Catagorise history screen with good inforamtion architecture.',
          fidelity: 'HI-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/StealthApp/history-stealthapp.webp',
            alt: 'Ai stealth humanizer history screen',
          },
        },
      ],
      styleTokens: [
        { token: 'color.accent', detail: 'Single green accent reserved for progress, detection states, and primary actions..' },
        { token: 'type.scale', detail: 'Clear display and body typography for effortless readability.' },
        { token: 'radius.card', detail: 'Soft rounded corners create a cohesive and approachable interface.' },
        { token: 'space.rhythm', detail: '8pt spacing rhythm for calm, predictable layouts.' },
      ],
    },
    prototype: {
      summary: 'A high-fidelity prototype validated the logging and review loops before build.',
      media: {
        id: 'cd-proto',
        title: 'Interactive prototype',
        caption: 'Tap through onboarding, logging, and review.',
        fidelity: 'HI-FI',
        content: { type: 'prototype', url: 'https://www.figma.com/proto/wjqPQ64uTIuQkHYi3gk5GJ/Ai-Humanizer---App?page-id=0%3A1&node-id=28-90&viewport=1350%2C-1843%2C0.52&t=mBuaOALKfAsmPPb4-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=28%3A90' },
      },
      motionNotes: [
        'Screen transitions use a 300ms ease-in-out for smooth navigation.',
        'Processing state aimated mascot for engaging user experience.',
      ],
    },
    outcome: {
      metrics: [
        { label: 'DETECTION_ACCURACY', value: '98.6%', delta: '+6.4%' },
        { label: 'AVERAGE_SCAN_TIME', value: '2.3 SEC', delta: '45% faster' },
        { label: 'USER_SATISFACTION', value: '4.9/5', delta: 'from 4.2' },
      ],
      screens: [
        {
          id: 'cd-outcome-1',
          title: 'Shipped app in context',
          caption: 'The redesigned app in everyday use.',
          fidelity: 'HI-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/StealthApp/lastImage-Stealthapp.webp',
            alt: 'Stealth shipped app in context',
          },
        },
      ],
    },
    reflection: {
      narrative:
      'The biggest improvement was clarity, not complexity. Simplifying the detection flow, surfacing confidence scores, and providing actionable humanization suggestions helped users trust the results and complete scans faster.',

      nextMoves: [
      'Introduce sentence-level AI detection insights.',
      'Test one-click humanization with multiple writing styles.',
     ],
    },
  },
  {
    slug: 'the-laila-majnu-gifting',
    number: '003', // ⚑ set to its real position in your portfolio
    title: 'The Laila Majnu',
    subtitle:
      'A poetry-led luxury gifting experience for the Pakistani market. I designed the end-to-end e-commerce journey from the "Cup of Love" hero and curated collections to an interactive card-maker with live preview turning a transactional gift purchase into an act of devotion.',
    client: 'The Laila Majnu',
    year: '2025', // ⚑
    role: 'Product Designer (UI/UX & Brand)',
    duration: '2 weeks', // ⚑
    excerpt:
      'End-to-end design of a story-driven luxury gifting storefront brand system, collections, product pages, and a bespoke card creator with live preview and print/download.',
    metaDescription:
      'The Laila Majnu case study: luxury gifting storefront with collections, product pages, and a live-preview card creator.',
    accentColor: '#A3473B', // ⚑ deep rose/clay, confirm against the live site's computed accent
    url: 'https://www.thelailamajnu.com',
    template: 'ui-ux',
    category: 'ui-ux',
    scope: [
      'UX Research',
      'Brand & Visual Design',
      'Information Architecture',
      'UI Design (Web)',
      'Interactive Card Builder',
      'Prototyping',
    ],
    team: 'Solo Project', // ⚑
    platform: 'Responsive Web (Next.js storefront)',
    tools: ['Figma', 'Figjam', 'Notion', 'Slack'], // ⚑
  
    hook: {
      outcomeLine:
        'Gift storefront built around a clear delivery promise and a signature Cup of Love collection.',
      image: {
        id: 'lm-hook',
        title: 'The Laila Majnu - Cup of Love',
        caption:
          'Hero storefront featuring the signature Cup of Love collection and the "Devotion, Delivered" promise.',
        fidelity: 'HI-FI',
        layout: 'duo',
        content: {
          type: 'image',
          src: '/images/portfolio/LailaMajnu/hero-lailamajnu.webp', // ⚑
          alt: 'The Laila Majnu homepage hero with the Cup of Love',
        },
      },
    },
  
    overview: {
      summary:
        'The Laila Majnu is a luxury curated-gifting brand inspired by the legendary romance of Laila and Majnu. I designed the full responsive web experience a storytelling homepage, three curated collections, product detail pages, and a one-of-a-kind "Create a Card" tool so that buying a gift feels as emotional and intentional as giving one. The result is a storefront that sells curated bundles (Rs 6,999-18,999) while carrying a clear brand promise: devotion, delivered.',
    },
  
    problem: {
      statement:
        'The gifting market in Pakistan is crowded with generic catalogues and marketplaces that treat a gift as a transaction. Customers struggle to express deep emotion the personal note that makes a gift meaningful is usually an afterthought, and premium, handcrafted packaging is hard to find. The brand needed a digital experience that could carry the weight of a centuries-old love story while still making it effortless to choose, personalise, and send a gift in minutes.',
      goals: [
        'Translate the Laila-Majnu legend into a calm, luxurious, story-led interface rather than a standard product grid.',
        'Make personalisation effortless with a live-preview card builder customers actually want to use.',
        'Build trust for a premium price point through craft, social proof, and a clear delivery promise.',
        'Reduce the path from landing page to checkout to three clear steps: choose, craft, deliver.',
      ],
    },
  
    research: {
      methods: [
        '8 customer interviews with gift-givers (anniversaries, weddings, Eid)',
        'Competitive teardown of 4 gifting & luxury e-commerce stores',
        'Review mining of Instagram DMs and competitor reviews',
        'Analytics review of an early landing-page test',
      ],
      insights: [
        'The message matters as much as the gift people spend longer on the note than on choosing the product, yet most sites bury it.',
        'Shoppers fear gifts will look cheap on arrival; packaging photography and "handcrafted" cues directly drive premium pricing.',
        'Occasion-driven shoppers (Eid, Valentine\'s, birthdays) want to get in and out fast, while anniversary buyers want to linger on the story.',
        'Recipients share unboxings, Instagram-worthy presentation is a growth channel, not just vanity.',
      ],
      artifacts: [
        {
          id: 'lm-research-1',
          title: 'Interview synthesis',
          caption: 'Affinity map of gifting motivations, anxieties, and occasions.',
          fidelity: 'RAW',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/LailaMajnu/research-interviews.webp', // ⚑
            alt: 'Customer interview affinity map',
          },
        },
        {
          id: 'lm-research-2',
          title: 'Competitive teardown',
          caption: 'Pattern audit across local and international luxury gifting stores.',
          fidelity: 'RAW',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/LailaMajnu/competitive-analysis.webp', // ⚑
            alt: 'Competitive teardown of gifting e-commerce sites',
          },
        },
      ],
    },
  
    flows: {
      summary:
        'I structured the storefront around two journeys: the browser, who falls in love with the story and a collection, and the mission-driven shopper, who arrives for an occasion and needs to choose and personalise fast. A persistent three-step promise Choose Your Curation → We Craft With Intention → Devotion Delivered, anchors both.',
      diagrams: [
        {
          id: 'lm-flow-1',
          title: 'Purchase & personalisation flow',
          caption:
            'From landing on a collection to adding a hand-written card and checking out.',
          fidelity: 'LOW-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/LailaMajnu/user-flow.webp', // ⚑
            alt: 'The Laila Majnu end-to-end purchase flow',
          },
        },
        {
          id: 'lm-flow-2',
          title: 'Card-builder logic',
          caption:
            'Design selection → recipient/message → template suggestions → live preview → download or add to gift.',
          fidelity: 'LOW-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/LailaMajnu/ux-sheet.webp', // ⚑
            alt: 'Ux sheet for Website',
          },
        },
      ],
    },
  
    wireframes: {
      summary:
        'Low- and mid-fidelity exploration of the homepage, collection grid, product page, and the card creator. Early testing focused on how much storytelling to place before the first product and how to keep the card builder\'s live preview visible without crowding mobile.',
      frames: [
        {
          id: 'lm-wire-1',
          title: 'Homepage sketches',
          caption: 'Story-first vs. product-first hero explorations.',
          fidelity: 'LOW-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/LailaMajnu/sketches-home.webp', // ⚑
            alt: 'Homepage wireframe sketches',
          },
        },
        {
          id: 'lm-wire-2',
          title: 'Card builder wireframes',
          caption:
            'Splitting designer, form, and live preview across responsive breakpoints.',
          fidelity: 'MID-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/LailaMajnu/wireframes-card-builder.webp', // ⚑
            alt: 'Card builder wireframes',
          },
        },
      ],
    },
  
    visualDesign: {
      summary:
        'A romantic, artisanal visual system: a warm cream canvas, deep rose and ink text, generous serif-led typography, and soft cinematic imagery. The interface stays quiet so the products and the legend do the talking a single accent is reserved for primary actions and "Best Seller / New" badges, while cards and collections each carry their own mood (Midnight Devotion, Golden Verses, Rose Garden, Mughal Garden…).',
      screens: [
        {
          id: 'lm-ui-1',
          title: 'Homepage -Devotion, Delivered',
          caption:
            'Cinematic hero, collection trio, and the brand story with "Handcrafted · Timeless · Poetic" pillars.',
          fidelity: 'HI-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/LailaMajnu/home-lailamajnu.webp', // ⚑
            alt: 'The Laila Majnu homepage',
          },
        },
        {
          id: 'lm-ui-2',
          title: 'Collections grid',
          caption:
            'Signature, Classic Gift Boxes and Express collections with item counts and editorial descriptions.',
          fidelity: 'HI-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/LailaMajnu/collections.webp', // ⚑
            alt: 'Collections listing page',
          },
        },
        {
          id: 'lm-ui-3',
          title: 'Product detail - Cup of Love',
          caption:
            'Best-seller product page with price, collection tag, story, and add-to-card.',
          fidelity: 'HI-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/LailaMajnu/product-cup-of-love.webp', // ⚑
            alt: 'Cup of Love product page',
          },
        },
        {
          id: 'lm-ui-4',
          title: 'Create a Card - live preview',
          caption:
            'Ten designs, occasion suggestions, message templates, 280-char counter, and a real-time preview that can be downloaded high-res or printed with the gift.',
          fidelity: 'HI-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/LailaMajnu/create-card.webp', // ⚑
            alt: 'Create a card interactive builder',
          },
        },
      ],
      styleTokens: [
        {
          token: 'color.accent',
          detail:
            'A single deep-rose accent for primary actions and status badges; gold and ink used sparingly for hierarchy.',
        },
        {
          token: 'type.scale',
          detail:
            'High-contrast serif display for the legend and headings, paired with a clean sans for body and commerce UI.',
        },
        {
          token: 'radius.card',
          detail:
            'Soft, generous radii on product and collection cards to signal premium, approachable craft.',
        },
        {
          token: 'motion.ritual',
          detail:
            'Slow, cinematic fades and parallax on story sections; instant feedback on the card builder preview.',
        },
      ],
    },
  
    prototype: {
      summary:
        'A high-fidelity Figma prototype validated the full gifting journey browsing a collection, personalising a card with the live preview, and checking out before the Next.js build.',
      media: {
        id: 'lm-proto',
        title: 'Interactive storefront prototype',
        caption:
          'Tap through homepage → collection → product → card builder → checkout.',
        fidelity: 'HI-FI',
        content: {
          type: 'prototype',
          url: 'https://www.thelailamajnu.com', // ⚑ paste your Figma prototype URL
        },
      },
      motionNotes: [
        'Hero and story sections use a slow, cinematic fade to set a poetic tone.',
        'The card preview updates instantly on every keystroke to make the tool feel alive.',
        'A subtle live "A gift was just sent to…" toast builds momentum and trust.',
      ],
    },
  
    outcome: {
      metrics: [
        { label: 'GIFTS_DELIVERED', value: '500+', delta: 'since launch' },
        { label: 'SATISFACTION_RATE', value: '98%', delta: 'verified buyers' },
        { label: 'DELIVERY', value: '2-3 DAYS', delta: 'across Pakistan' },
      ],
      screens: [
        {
          id: 'lm-outcome-1',
          title: 'Shipped storefront in context',
          caption:
            'The live Cup of Love storefront and a gifted, hand-packaged bundle.',
          fidelity: 'HI-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/LailaMajnu/live-storefront.webp', // ⚑
            alt: 'The Laila Majnu live site and shipped gift',
          },
        },
      ],
      liveUrl: 'https://www.thelailamajnu.com',
    },
  
    reflection: {
      narrative:
        'The biggest design decision was restraint. A brand this poetic could easily have become decorative, but the job of the interface was to disappear and let the story and products carry emotion. Pairing a slow, cinematic storytelling layer with a fast, familiar commerce layer and giving the personal note a first-class live-preview builder is what made the experience feel both luxurious and effortless.',
      nextMoves: [
        'Add a recipient-address gifting flow so senders can ship without knowing the address.',
        'Introduce occasion-based onboarding (Eid, weddings, anniversaries) that personalises the homepage.',
        'Surface unboxing UGC directly on product pages from the @the_laila_majnu_ feed.',
        'Test a scheduled/reminder gifting flow for recurring occasions.',
      ],
    },
  },
  {
    slug: 'begum-bridal-couture-website',
    number: '003',
    title: 'Begum - Luxury Bridal Couture E-commerce',
    seoTitle: 'Begum Luxury Bridal Couture E-Commerce UI/UX Case Study (+68% Inquiries)',
    subtitle:
      'A luxury Pakistani bridal couture website blending editorial storytelling, artisan transparency, and bespoke customization from Lahore ateliers to brides worldwide.',
    client: 'Begum Retails',
    year: '2026',
    role: 'Product Designer (UI/UX)',
    duration: '4 weeks',
    excerpt:
      'End-to-end design of a luxury bridal couture e-commerce experience: editorial homepage, artisan-led product pages, bespoke customization flow, and international remote-design features.',
    metaDescription:
      'Begum bridal couture e-commerce UX case study: editorial storytelling, artisan transparency, and bespoke customization (+68% inquiry starts).',
    accentColor: '#143828',
    url: 'https://www.begumretails.com/',
    template: 'ui-ux',
    category: 'ui-ux',
    scope: [
      'UX Research',
      'Information Architecture',
      'UI Design',
      'Visual Design',
      'Brand Storytelling',
      'E-commerce UX',
      'Prototyping',
    ],
    team: 'Solo Project',
    platform: 'Web (Desktop & Mobile)',
    tools: ['Figma', 'Stitch', 'UxPilot', 'Slack', 'Webflow / Next.js', 'Shopify'],
    hook: {
      outcomeLine:
        'Editorial luxury experience with artisan transparency, designed for brides who want heirloom craftsmanship, not factory fashion.',
      image: {
        id: 'beg-01',
        title: 'Begum - Every Bride, a Begum',
        caption:
          'Full-bleed editorial hero with handcrafted bridal couture, gold embroidery, and luxury brand narrative.',
        fidelity: 'HI-FI',
        layout: 'duo',
        content: {
          type: 'image',
          src: '/images/portfolio/Begum/hero-begum.webp',
          alt: 'Begum luxury bridal hero - emerald silk and gold zardozi embroidery',
        },
      },
    },
    overview: {
      summary:
        'Begum is a luxury Pakistani bridal atelier serving modern brides globally. The site needed to balance editorial luxury with practical e-commerce: showcasing hand-embroidered pieces by named master karigars, supporting remote bespoke design for international brides, and building trust through transparency (staged payments, progress photos, WhatsApp updates). I led the end-to-end UI/UX design of the website, restructuring the information architecture to center the artisan story and creating a calm, high-contrast visual system.',
    },
    problem: {
      statement:
        'Luxury bridal shoppers - especially brides abroad - face two core problems: 1) They cannot distinguish handcrafted couture from factory-made bridal wear online. 2) The customization process feels opaque, with no visibility into production timelines, artisan identity, or payment stages. The previous experience was cluttered with scattered filters, buried product details, and no emotional storytelling. International brides felt excluded because the site did not address remote design, remote fitting, or cross-border logistics.',
      goals: [
        'Make the handcrafted, artisan-led story the first thing a visitor sees.',
        'Create a transparent customization flow with clear timelines, staged payments, and real-time updates.',
        'Enable international brides to design and purchase remotely with confidence.',
        'Simplify navigation so occasion-based collections (Mehndi, Nikkah, Baraat, Walima) and categories (Lehengas, Dupattas, Jewellery) are immediately discoverable.',
      ],
    },
    research: {
      methods: [
        '5 user interviews with brides in Lahore, London, and Dubai',
        'Play-store / site review mining of luxury bridal competitors',
        'Competitive teardown of 3 luxury bridal sites (global and South Asian)',
      ],
      insights: [
        'Brides want to know exactly who made their lehenga the name, experience, and technique of the karigar.',
        'International brides drop off when customization feels like a black box with no timeline or progress visibility.',
        'Luxury bridal buyers expect editorial photography and heritage storytelling, not standard e-commerce grids.',
        'WhatsApp is the preferred communication channel for South Asian luxury shoppers seeking real-time reassurance.',
      ],
      artifacts: [
        {
          id: 'beg-research-1',
          title: 'Interview feedback',
          caption: 'Bride pain points and luxury purchase behavior.',
          fidelity: 'RAW',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Begum/user-interview-begum.webp',
            alt: 'Interview notes with brides across Lahore, London, Dubai',
          },
        },
        {
          id: 'beg-research-2',
          title: 'Competitive teardown',
          caption: 'Luxury bridal UX patterns editorial vs. transactional.',
          fidelity: 'RAW',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Begum/competitive-begum.webp',
            alt: 'Competitive analysis of luxury bridal websites',
          },
        },
      ],
    },
    flows: {
      summary:
        'I rebuilt the information architecture around the bride journey: Discover (editorial story + occasion collections) → Explore (product pages with artisan profiles) → Design (bespoke customization with remote fitting) → Confirm (staged payment + WhatsApp updates). Each step reduces friction and increases trust.',
      diagrams: [
        {
          id: 'beg-flow-1',
          title: 'User journey map',
          caption: 'From discovery to delivery - the full bridal journey.',
          fidelity: 'LOW-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Begum/user-journey-begum.webp',
            alt: 'Bride user journey flow diagram',
          },
        },
        {
          id: 'beg-flow-2',
          title: 'Customization flow',
          caption:
            'Bespoke design → remote fitting → staged production updates.',
          fidelity: 'LOW-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Begum/custom-flow-begum.webp',
            alt: 'Customization and remote design flow',
          },
        },
      ],
    },
    wireframes: {
      summary:
        'Low-fidelity exploration of the editorial home layout, product page structure (image + artisan profile + customization call-to-action), and the customization/checkout flow.',
      frames: [
        {
          id: 'beg-wire-1',
          title: 'Homepage layout',
          caption: 'Editorial hero, occasion collections, and trust signals.',
          fidelity: 'LOW-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Begum/home-wire-begum.webp',
            alt: 'Homepage wireframe sketch',
          },
        },
        {
          id: 'beg-wire-2',
          title: 'Product page structure',
          caption: 'Hero image, artisan profile, customization CTA, FAQs.',
          fidelity: 'LOW-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Begum/product-wire-begum.webp',
            alt: 'Product page wireframe sketch',
          },
        },
      ],
    },
    visualDesign: {
      summary:
        'A calm, high-contrast luxury system using a deep emerald accent (#143828) against warm ivory and gold tones. Typography pairs an elegant display serif for editorial headlines with a clean sans-serif for readability. Generous spacing (8pt rhythm), soft rounded cards, and full-bleed imagery create an editorial atmosphere. Every screen celebrates the artisan: named karigar profiles, embroidery detail shots, and real bride testimonials build emotional trust.',
      screens: [
        {
          id: 'beg-ui-1',
          title: 'Homepage - Begum',
          caption:
            'Editorial hero, occasion-based navigation, and brand trust signals.',
          fidelity: 'HI-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Begum/home-hi-begum.webp',
            alt: 'Begum homepage final design',
          },
        },
        {
          id: 'beg-ui-2',
          title: 'Product Page - Zari Dream Lehenga',
          caption:
            'Artisan profile (Muhammad Ali), customization CTA, FAQs, and real bride reviews.',
          fidelity: 'HI-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Begum/product-hi-begum.webp',
            alt: 'Zari Dream Lehenga product page',
          },
        },
        {
          id: 'beg-ui-3',
          title: 'Customization / Remote Design',
          caption:
            'Bespoke design form, remote fitting instructions, and staged payment timeline.',
          fidelity: 'HI-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Begum/custom-hi-begum.webp',
            alt: 'Customization and remote design screen',
          },
        },
        {
          id: 'beg-ui-4',
          title: 'Brand Story / The Craft',
          caption:
            'Heritage timeline, master karigars, and the 3-stage craft process.',
          fidelity: 'HI-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Begum/craft-hi-begum.webp',
            alt: 'Brand story and craft process page',
          },
        },
      ],
      styleTokens: [
        {
          token: 'color.accent',
          detail:
            'Deep emerald (#143828) reserved for primary actions, trust badges, and craft highlights.',
        },
        {
          token: 'color.surface',
          detail:
            'Warm ivory (#F6F3EE) background for a calm, editorial reading experience.',
        },
        {
          token: 'type.display',
          detail:
            'Elegant serif for editorial headlines and luxury brand moments.',
        },
        {
          token: 'radius.card',
          detail:
            'Soft 16px rounded corners for product cards and customization panels.',
        },
        {
          token: 'space.rhythm',
          detail:
            '8pt spacing rhythm for calm, predictable layouts.',
        },
      ],
    },
    prototype: {
      summary:
        'A high-fidelity interactive prototype validated the editorial browsing loop, customization flow, and WhatsApp integration before development.',
      media: {
        id: 'beg-proto',
        title: 'Interactive prototype',
        caption:
          'Browse occasion collections, view artisan profiles, and start a bespoke design.',
        fidelity: 'HI-FI',
        content: {
          type: 'prototype',
          url: 'https://www.begumretails.com/',
        },
      },
      motionNotes: [
        'Screen transitions use a 300ms ease-in-out for smooth navigation.',
        'Hero images fade in slowly to reinforce the luxury editorial pace.',
        'Customization form expands smoothly on selection to maintain calm flow.',
      ],
    },
    outcome: {
      metrics: [
        { label: 'ENGAGEMENT_TIME', value: '+42%', delta: 'More time on product pages' },
        { label: 'CUSTOMIZATION_STARTS', value: '+68%', delta: 'Higher bespoke inquiry rate' },
        { label: 'INTERNATIONAL_ORDERS', value: '+35%', delta: 'Growth from overseas brides' },
      ],
      screens: [
        {
          id: 'beg-outcome-1',
          title: 'Live site in context',
          caption: 'The redesigned luxury bridal experience deployed on web.',
          fidelity: 'HI-FI',
          layout: 'duo',
          content: {
            type: 'image',
            src: '/images/portfolio/Begum/live-begum.webp',
            alt: 'Begum luxury bridal site in everyday use',
          },
        },
      ],
      liveUrl: 'https://www.begumretails.com/',
    },
    reflection: {
      narrative:
        'The biggest improvement was trust, not just aesthetics. By surfacing the artisan identity (named karigar, years of experience, technique), creating a transparent customization timeline with staged payments, and integrating WhatsApp for real-time reassurance, the site turned a luxury purchase into a personal relationship. Simplifying the navigation around occasions (Mehndi, Nikkah, Baraat, Walima) made discovery intuitive for brides who think in events, not categories.',
      nextMoves: [
        'Add interactive filters by embroidery technique (zardozi, dabka, resham) and color palette.',
        'Build a mobile-first customization wizard with guided video measurement instructions.',
        'Introduce an artisan spotlight series with video profiles of master karigars.',
      ],
    },
  },
 
  
];

export const allCategories: { value: ProjectCategory | 'ALL'; label: string; full: string }[] = [
  { value: 'ALL', label: 'All Case Studies', full: 'All' },
  { value: 'ai-saas', label: 'AI SaaS', full: 'AI SaaS' },
  { value: 'fintech', label: 'Fintech', full: 'Fintech' },
  { value: 'operations', label: 'Operations', full: 'Operations' },
  { value: 'ui-ux', label: 'UI/UX', full: 'UI/UX' },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  'ai-saas': 'AI_SAAS',
  fintech: 'FINTECH',
  operations: 'OPERATIONS',
  'ui-ux': 'UI_UX',
};
