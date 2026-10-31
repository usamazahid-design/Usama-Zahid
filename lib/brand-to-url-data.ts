export interface Track {
  number: string;
  code: string;
  title: string;
  description: string;
  deliverables: string[];
  price: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export const tracks: Track[] = [
  {
    number: '01',
    code: 'STRATEGY',
    title: 'Brand Strategy',
    description: 'Positioning, narrative, and the structural logic that makes every decision afterwards obvious.',
    deliverables: ['Audit & research', 'Positioning statement', 'Messaging framework', 'Go-to-market brief'],
    price: '$12K',
  },
  {
    number: '02',
    code: 'IDENTITY',
    title: 'Brand Identity',
    description: 'The operating layer for how you appear, type, color, voice, motion, and the rules that hold them.',
    deliverables: ['Logo system & lockups', 'Type & color system', 'Brand guidelines (PDF + Notion)', 'Figma asset library'],
    price: '$18K',
  },
  {
    number: '03',
    code: 'PRODUCT',
    title: 'Product Design',
    description: 'Screens that ship. User flows, interfaces, prototypes, and a design system built for engineering handoff.',
    deliverables: ['User flows & wireframes', 'High-fidelity UI', 'Interactive prototypes', 'Component library (Figma)'],
    price: '$24K',
  },
  {
    number: '04',
    code: 'ENGINEERING',
    title: 'Web Engineering',
    description: 'Production-grade Next.js code. Fast, accessible, indexable, and deployed to production.',
    deliverables: ['Next.js application', 'Responsive implementation', 'CMS integration', 'Deployment & CI/CD'],
    price: '$22K',
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Diagnosis',
    description: 'A 30-minute call to understand your business, market, and goals. No pitch deck. No proposal fee.',
    icon: '◈',
  },
  {
    step: '02',
    title: 'Strategy',
    description: 'Positioning, narrative, and architecture. Every decision downstream is obvious once the strategy is set.',
    icon: '◇',
  },
  {
    step: '03',
    title: 'Identity',
    description: 'The visual system. Type, color, mark, motion, and the rules that keep it coherent across every surface.',
    icon: '◆',
  },
  {
    step: '04',
    title: 'Design',
    description: 'Product screens, flows, and prototypes. Designed in Figma, validated against real user behaviour.',
    icon: '▣',
  },
  {
    step: '05',
    title: 'Build',
    description: 'Production code in Next.js. Fast, accessible, indexed, and deployed to your own domain.',
    icon: '■',
  },
  {
    step: '06',
    title: 'Ship',
    description: 'Live product, handoff documentation, and a system your team can defend without me.',
    icon: '●',
  },
];

export const projects = [
  {
    slug: 'petrozen-erp',
    title: 'Petrozen ERP',
    subtitle: 'Finance-first ERP for fuel trading groups.',
    tag: 'Strategy + Identity + Product + Code',
    accent: '#4B3FFF',
  },
  {
    slug: 'stealth-humanizer-ai-app',
    title: 'Stealth Humanizer',
    subtitle: 'End-to-end redesign of an AI humanizer app.',
    tag: 'Strategy + Identity + Product + Code',
    accent: '#F6F6F6',
  },
];

export const faqs: FAQ[] = [
  {
    q: 'What does Brand-to-URL actually mean?',
    a: 'It means one person takes your brand from strategy and identity through product design and production code, and ships it live. No handoffs. No dropped context. No finger-pointing between agencies.',
  },
  {
    q: 'Why one operator instead of a team?',
    a: 'A single operator eliminates translation loss. Strategy informs identity directly. Identity constraints inform design. Design ships to code without a handoff. The result is a coherent system, not a collection of agency deliverables.',
  },
  {
    q: 'How long does a full Brand-to-URL engagement take?',
    a: 'A full sequence runs 10-14 weeks depending on scope. Strategy in weeks 1-3, identity in weeks 3-6, product in weeks 5-10, engineering in weeks 8-14. Tracks overlap intentionally.',
  },
  {
    q: 'Can I engage a single track instead of the full sequence?',
    a: 'Yes. Each track, Strategy, Identity, Product, Engineering, is available independently. But clients who run the full sequence report significantly higher coherence and speed.',
  },
  {
    q: 'What do I need to provide upfront?',
    a: 'Access to your team for a 2-hour kickoff call, any existing brand assets or research, and a decision-maker who can approve direction within 48 hours. Everything else comes from me.',
  },
  {
    q: 'What happens after the product ships?',
    a: 'You own the complete system, Figma libraries, product guidelines, source code, and deployment pipeline. I offer a retainer for ongoing work, but the system is designed to be maintained without me.',
  },
];

export const stats = [
  { label: 'TRACKS', value: '04' },
  { label: 'WEEKS', value: '10-14' },
  { label: 'PROJECTS', value: '12+' },
  { label: 'LIGHTHOUSE AVG', value: '98' },
  { label: 'TEAM SIZE', value: '01' },
  { label: 'HANDOFFS', value: '00' },
];
