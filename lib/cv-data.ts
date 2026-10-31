import { SITE_EMAIL } from './site-config';

export type ExperienceType = 'IN_HOUSE' | 'AGENCY' | 'OPERATOR';
export type SkillLevel = 'EXPERT' | 'ADVANCED' | 'PROFICIENT' | 'BASIC';

export interface Experience {
  year: string;
  startDate: string;
  endDate: string;
  role: string;
  company: string;
  type: ExperienceType;
  location: string;
  description: string;
  highlights: string[];
  stack: string[];
  current?: boolean;
}

export interface Education {
  year: string;
  startDate: string;
  endDate: string;
  degree: string;
  institution: string;
  location: string;
  focus: string;
  details: string;
}

export interface Certification {
  year: string;
  title: string;
  issuer: string;
}

export interface SkillCategory {
  code: string;
  label: string;
  full: string;
  items: { name: string; level: SkillLevel; years: number }[];
}

export interface ProjectEntry {
  name: string;
  year: string;
  role: string;
  duration: string;
  sector: string;
  description: string;
  metrics: { label: string; value: string }[];
}

export interface Language {
  name: string;
  level: 'NATIVE' | 'FLUENT' | 'CONVERSATIONAL' | 'BASIC';
  code: string;
  flag: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface KeyResult {
  label: string;
  value: string;
  context: string;
}

export const cv = {
  name: 'USAMA ZAHID',
  role: 'BRAND & PRODUCT DESIGNER',
  roleSubtitle: 'Brand-to-URL · Identity · Product · Code',
  tagline:
    'Brand & Product Designer with 7+ years in design and 3+ years in UI/UX and product design, delivering brand-to-URL systems, identities, and digital products for startups and agencies across Pakistan, Qatar, UAE, and Australia.',
  location: 'LAHORE · PK · UTC+05',
  email: SITE_EMAIL,
  phone: '+92 321 8870144',
  website: 'usamazahid.design',
  available: 'Q3_2026',
  capacity: 'OPEN',
  since: '2019',
  yearsActive: 7,
  clientsShipped: 47,
  projectsShipped: 100,
  lighthouseAvg: 98,
  regions: 4,
  status: 'OPEN_TO_ROLES',
  openTo:
    'Senior Designer · Creative Lead · Remote Product Design roles',
  pdfUrl: '/Usama_Zahid_CV.pdf',
  pdfLabel: 'Usama_Zahid_CV.pdf',

  summary:
    'End-to-end design ownership: user research, wireframing, prototyping, design systems, and Figma handoff. Bridges design and development with working knowledge of HTML, CSS, Tailwind, and Next.js. Open to Senior Designer, Creative Lead, and remote product design roles.',

  keyResults: [
    {
      label: 'INVOICE_TIME',
      value: '−46%',
      context: 'Petrozen ERP SaaS',
    },
    {
      label: 'BOOKING_DROP',
      value: '−54%',
      context: 'Strong Rental Cars Qatar',
    },
    {
      label: 'VIDEO_REACH',
      value: '200K+',
      context: 'Growth Marvels launch',
    },
    {
      label: 'LIGHTHOUSE',
      value: 'Performance-first',
      context: 'Measured per project and release context',
    },
  ] satisfies KeyResult[],

  socials: [
    { label: 'BEHANCE', url: 'https://www.behance.net/usama-zahid-design' },
    { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/usamazahid-design/' },
    { label: 'DRIBBBLE', url: 'https://dribbble.com/usamazahid-design' },
    { label: 'INSTAGRAM', url: 'https://www.instagram.com/usamazahid.design/' },
    { label: 'CONTRA', url: 'https://contra.com/usamazahid_design' },
  ] satisfies SocialLink[],

  experience: [
    {
      year: '2024-NOW',
      startDate: 'JAN 2024',
      endDate: 'PRESENT',
      role: 'SENIOR UI/UX DESIGNER',
      company: 'PAKALIGN_STUDIO',
      type: 'AGENCY',
      location: 'LAHORE · PK',
      description:
        'Lead end-to-end UI/UX across 10+ digital products, SaaS platforms, mobile apps, and brand systems for AI-first companies.',
      highlights: [
        'Designed Pakalign Studio brand identity and design system from scratch; 100% brand recognition uplift across client touchpoints.',
        'Collaborate with PMs, developers, and marketing on cross-functional delivery; manage 5+ active client accounts simultaneously.',
        'Produce social media design campaigns for B2B and B2C clients, maintaining brand consistency at scale.',
        'Mentor junior designers and run design critiques; reduced design iteration cycles by an estimated 30%.',
      ],
      stack: ['Figma', 'Adobe Illustrator', 'After Effects', 'Next.js', 'Tailwind CSS', 'Notion'],
      current: true,
    },
    {
      year: '2023-2024',
      startDate: 'JAN 2023',
      endDate: 'DEC 2024',
      role: 'SENIOR UI/UX & SOCIAL MEDIA DESIGNER',
      company: 'VIEAPPS_STUDIO',
      type: 'AGENCY',
      location: 'LAHORE · PK',
      description:
        'Managed a 3-person design team delivering mobile app UI/UX across Android and iOS platforms.',
      highlights: [
        'Owned post-production UX improvements for 4 live mobile products, analyzed user feedback and shipped iterative fixes.',
        'Built and maintained a shared Figma design system (components, tokens, guidelines); reduced new screen design time by ~40%.',
        'Created performance-driven social media creatives for international clients (UAE, Australia) reaching 50K+ impressions/month.',
        'Ran weekly design reviews with cross-functional stakeholders; translated business requirements into user-centered solutions.',
      ],
      stack: ['Figma', 'Adobe XD', 'After Effects', 'Premiere Pro', 'Lottie'],
    },
    {
      year: '2021-2023',
      startDate: 'JAN 2021',
      endDate: 'DEC 2023',
      role: 'UI/UX DESIGNER',
      company: 'CROSS_CODE',
      type: 'AGENCY',
      location: 'LAHORE · PK',
      description:
        'Designed intuitive interfaces for 6+ mobile platforms (iOS and Android), onboarding flows, dashboards, and transactional screens.',
      highlights: [
        'Partnered with front-end developers to ensure pixel-accurate implementation; maintained design-to-dev consistency above 90%.',
        'Conducted 3 rounds of usability testing per product cycle; improved average task completion rates by 25%.',
        'Delivered Strong Rental Cars Qatar redesign: reduced 6-step booking flow to 3 steps, +58% completion rate, −54% abandonment.',
      ],
      stack: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle'],
    },
    {
      year: '2017-2021',
      startDate: 'JAN 2017',
      endDate: 'DEC 2021',
      role: 'JUNIOR DESIGNER & UI/UX DESIGNER',
      company: 'K-TALE · UNCLE FIXER',
      type: 'AGENCY',
      location: 'LAHORE · PK',
      description:
        'Foundation years across mobile games, marketing motion, and client interface design.',
      highlights: [
        'Designed UI for 3 mobile game titles at K-Tale, including icon systems, game HUDs, and onboarding screens.',
        'Created 2D frame-by-frame animations and motion graphics for 15+ marketing campaigns at Uncle Fixer.',
        'Produced mobile and web interface designs with style guides for 5+ clients; built a foundation in Adobe Suite and UI component design.',
      ],
      stack: ['Adobe Illustrator', 'Photoshop', 'After Effects', 'Adobe XD', 'Sketch'],
    },
  ] satisfies Experience[],

  projects: [
    {
      name: 'PETROZEN ERP SAAS',
      year: '2025',
      role: 'LEAD UI/UX · PRODUCT ARCHITECT',
      duration: '2 MONTHS',
      sector: 'ERP · LPG TRADING',
      description:
        'Purpose-built ERP for LPG trading covering Sales, Purchases, Inventory, Accounts, Tax, and Audit. Led 200+ user interviews, 3 usability testing rounds, role-based dashboards for Admin/Manager/Employee personas, full Figma handoff.',
      metrics: [
        { label: 'INVOICE_ENTRY', value: '−46%' },
        { label: 'ACCOUNTING_ERRORS', value: '−58%' },
      ],
    },
    {
      name: 'STRONG RENTAL CARS QATAR',
      year: '2024',
      role: 'PRODUCT DESIGNER · UI/UX',
      duration: '4 MONTHS',
      sector: 'AUTOMOTIVE · QATAR',
      description:
        'Full web and mobile redesign. Simplified the 6-step booking to 3 steps. Integrated real-time availability, AI recommendations, mobile-first UX. 94% task success rate across 200+ usability test participants.',
      metrics: [
        { label: 'BOOKING_COMPLETION', value: '+58%' },
        { label: 'CART_ABANDONMENT', value: '−54%' },
      ],
    },
    {
      name: 'CODESTREAKS',
      year: '2023',
      role: 'BRAND DESIGNER',
      duration: 'IDENTITY SYSTEM',
      sector: 'AI AUTOMATION STUDIO',
      description:
        'Complete brand identity for AI automation studio: scalable logo system, warm tech-forward palette, typography hierarchy, precise design rules for digital and print applications.',
      metrics: [
        { label: 'BRAND_RECOGNITION', value: '+127%' },
        { label: 'TRUST_SCORE', value: '4.8 / 5' },
      ],
    },
    {
      name: 'GROWTH MARVELS',
      year: '2023',
      role: 'MOTION DESIGNER · ANIMATION ARTIST',
      duration: '2:40 LAUNCH VIDEO',
      sector: 'BRAND LAUNCH',
      description:
        '2-minute 40-second brand launch video with kinetic typography. Coordinated a 4-person team (illustrator, writer, music artist). On-schedule delivery for company launch.',
      metrics: [
        { label: 'VIEWS', value: '200K+' },
        { label: 'ENGAGEMENT', value: '12%' },
      ],
    },
    {
      name: 'FASHION BRAND WEBSITE',
      year: '2026',
      role: 'DESIGNER & DEVELOPER',
      duration: '48H BUILD',
      sector: 'FASHION · E-COMMERCE',
      description:
        'Full marketing website designed and shipped in 48 hours using Cursor AI-assisted development. Next.js, Tailwind CSS, responsive layout, clear conversion paths.',
      metrics: [
        { label: 'PERFORMANCE', value: 'FOCUSED' },
        { label: 'BUILD_TIME', value: '48H' },
      ],
    },
  ] satisfies ProjectEntry[],

  education: [
    {
      year: '2016-2020',
      startDate: 'SEP 2016',
      endDate: 'JUN 2020',
      degree: 'B.S. PHYSICS',
      institution: 'COMSATS_UNIVERSITY_ISLAMABAD_LAHORE_CAMPUS',
      location: 'LAHORE CAMPUS · PK',
      focus: 'Theoretical Physics · Computational Methods · Mathematical Modeling',
      details:
        'Four-year physics degree that shaped how I think about constraints, systems, and variables, the same mental model I apply to product design, information architecture, and design systems today.',
    },
  ] satisfies Education[],

  certifications: [
    { year: '2025', title: 'Programming with JavaScript', issuer: 'META / COURSERA' },
    { year: '2021', title: 'Animation Bootcamp', issuer: 'SCHOOL OF MOTION' },
    { year: '2020', title: 'Google UX Design Certificate', issuer: 'COURSERA / GOOGLE' },
    { year: '2020', title: 'Typography & Layouts', issuer: 'THE FUTUR' },
    { year: '2019', title: 'Graphic Design Specialization', issuer: 'CALARTS / COURSERA' },
  ] satisfies Certification[],

  skills: [
    {
      code: '01',
      label: 'UX',
      full: 'UX & Research',
      items: [
        { name: 'User Research', level: 'EXPERT', years: 6 },
        { name: 'Usability Testing', level: 'EXPERT', years: 5 },
        { name: 'Wireframing', level: 'EXPERT', years: 6 },
        { name: 'Prototyping', level: 'EXPERT', years: 6 },
        { name: 'Information Architecture', level: 'ADVANCED', years: 5 },
        { name: 'Accessibility (WCAG)', level: 'ADVANCED', years: 3 },
      ],
    },
    {
      code: '02',
      label: 'DESIGN',
      full: 'Design & Brand',
      items: [
        { name: 'UI Design', level: 'EXPERT', years: 6 },
        { name: 'Brand Identity', level: 'EXPERT', years: 6 },
        { name: 'Design Systems', level: 'EXPERT', years: 5 },
        { name: 'Motion Design', level: 'ADVANCED', years: 5 },
        { name: 'Web Design', level: 'EXPERT', years: 6 },
        { name: 'Mobile Design', level: 'EXPERT', years: 6 },
      ],
    },
    {
      code: '03',
      label: 'TOOLS',
      full: 'Tools',
      items: [
        { name: 'Figma', level: 'EXPERT', years: 6 },
        { name: 'Adobe Illustrator', level: 'EXPERT', years: 7 },
        { name: 'Photoshop', level: 'ADVANCED', years: 7 },
        { name: 'After Effects', level: 'ADVANCED', years: 5 },
        { name: 'Adobe XD', level: 'ADVANCED', years: 4 },
        { name: 'Premiere Pro', level: 'PROFICIENT', years: 4 },
        { name: 'Lottie', level: 'ADVANCED', years: 3 },
      ],
    },
    {
      code: '04',
      label: 'DEV',
      full: 'Development',
      items: [
        { name: 'HTML5 / CSS3', level: 'ADVANCED', years: 5 },
        { name: 'Tailwind CSS', level: 'ADVANCED', years: 4 },
        { name: 'Bootstrap', level: 'PROFICIENT', years: 4 },
        { name: 'Next.js', level: 'ADVANCED', years: 3 },
        { name: 'TypeScript', level: 'PROFICIENT', years: 3 },
        { name: 'Vibe Coding / Cursor', level: 'ADVANCED', years: 1 },
      ],
    },
    {
      code: '05',
      label: 'TEAM',
      full: 'Collaboration',
      items: [
        { name: 'Agile / Scrum', level: 'ADVANCED', years: 5 },
        { name: 'Stakeholder Management', level: 'ADVANCED', years: 5 },
        { name: 'Design Critique', level: 'EXPERT', years: 4 },
        { name: 'Cross-functional Teams', level: 'EXPERT', years: 5 },
        { name: 'Team Leadership', level: 'ADVANCED', years: 3 },
      ],
    },
  ] satisfies SkillCategory[],

  languages: [
    { name: 'ENGLISH', level: 'FLUENT', code: 'en', flag: 'INTL' },
    { name: 'URDU', level: 'NATIVE', code: 'ur', flag: 'PK' },
  ] satisfies Language[],
};

export const typeLabels: Record<ExperienceType, string> = {
  IN_HOUSE: 'IN_HOUSE',
  AGENCY: 'AGENCY',
  OPERATOR: 'OPERATOR',
};

export const skillLevelLabels: Record<SkillLevel, string> = {
  EXPERT: 'EXPERT',
  ADVANCED: 'ADVANCED',
  PROFICIENT: 'PROFICIENT',
  BASIC: 'BASIC',
};

export const languageLevelLabels: Record<Language['level'], string> = {
  NATIVE: 'NATIVE',
  FLUENT: 'FLUENT',
  CONVERSATIONAL: 'CONVERSATIONAL',
  BASIC: 'BASIC',
};
