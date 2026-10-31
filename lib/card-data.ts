export const CARD_SHARE_URL = 'https://usamazahid.design/card/';
export const CARD_CAL_URL = 'https://cal.com/usama-zahid-haadwj/15min';

export const heroMetrics = [
  { value: '98', label: 'LIGHTHOUSE', numeric: 98, suffix: '' as const },
  { value: '48h', label: 'BUILD TIME', numeric: 48, suffix: 'h' as const },
  { value: '-58%', label: 'ERROR REDUCTION', numeric: -58, suffix: '%' as const },
] as const;

export const caseStudies = [
  {
    id: '01',
    label: 'PROJECT_01, ERP SAAS',
    title: 'Petrozen ERP',
    metric: '-58%',
    sub: 'Accounting errors reduced',
    tags: ['UI/UX', 'SaaS', 'Production'],
  },
  {
    id: '02',
    label: 'PROJECT_02, AI STUDIO',
    title: 'Codestreaks',
    metric: '+127%',
    sub: 'Brand recognition',
    tags: ['Brand', 'AI', 'Studio'],
  },
  {
    id: '03',
    label: 'PROJECT_03, PRODUCTION BUILD',
    title: 'Laila Majnu',
    metric: '98',
    sub: 'Lighthouse score',
    secondary: '48h',
    tags: ['Web', 'Ship', 'Performance'],
  },
] as const;

export const processSteps = [
  {
    number: '01',
    title: 'DIAGNOSE',
    sub: 'Find the real problem.\nNot the surface request.',
  },
  {
    number: '02',
    title: 'DESIGN',
    sub: 'Build the system from first principles.',
  },
  {
    number: '03',
    title: 'BUILD',
    sub: 'Write production code. No handoff.',
  },
  {
    number: '04',
    title: 'SHIP',
    sub: 'Deploy. Measure. Verify.',
  },
] as const;
