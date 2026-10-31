/**
 * Branding case studies.
 *
 * The three entries below are SAMPLE content used to art-direct and review the
 * layout. Copy, metrics, palettes, and imagery are placeholders, swap them for
 * real project data. Image URLs live in `lib/branding-images.ts`.
 */

import { techmekaCase } from '@/lib/branding-cases/techmeka';
import type { BrandArtifactLabel } from '@/lib/brand-artifact-labels';

export type BrandingCategory = 'IDENTITY' | 'REBRAND' | 'PACKAGING' | 'BRAND_SYSTEM';

export interface BrandingImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface NumberedItem {
  num: string;
  text: string;
}

export interface StrategyBlock {
  heading: string;
  body: string;
  image?: BrandingImage;
}

export interface VisualToken {
  name: string;
  value: string;
}

export interface PaletteColor {
  name: string;
  hex: string;
  usage: string;
}

export interface TypeSpecimen {
  role: string;
  family: string;
  usage: string;
  sample: string;
  mono?: boolean;
  /** Visual stack for the specimen sample. Defaults from role/mono. */
  stack?: 'display' | 'body' | 'serif' | 'mono';
}

export interface LogoEvolutionBlock {
  heading: string;
  body: string;
  oldLogo: BrandingImage;
  newLogo: BrandingImage;
  /** Specimen plate for the previous mark. Fixed brand surface — does not follow site theme. */
  oldSurface?: 'light' | 'dark';
  /** Specimen plate for the new mark. Fixed brand surface — does not follow site theme. */
  newSurface?: 'light' | 'dark';
}

export interface LogoLockup {
  name: string;
  usage: string;
  variant: 'primary' | 'horizontal' | 'stacked' | 'icon' | 'reversed' | 'gradient';
  /**
   * Specimen plate behind the SVG. Use `dark` for light/reversed marks,
   * `light` for dark marks. Fixed brand surfaces — does not follow site theme.
   */
  surface?: 'light' | 'dark';
  /** Transparent PNG, WebP, or SVG. Shown instead of the generated letter mark. */
  src?: string;
  alt?: string;
}

export interface BrandingFigure {
  id: string;
  label: BrandArtifactLabel;
  caption: string;
  description: string;
  image: BrandingImage;
}

export interface BrandingResult {
  label: string;
  value: string;
  description: string;
}

export interface BrandingCase {
  slug: string;
  title: string;
  category: BrandingCategory;
  tags: string[];
  caseNumber: string;
  client: string;
  year: string;
  timeline: string;
  role: string;
  platform: string;
  team: string;
  tools: string[];
  featured?: boolean;
  accentColor: string;
  descriptor: string;
  /** Optional SERP snippet. Falls back to a truncated overview. Keep under 155 characters. */
  metaDescription?: string;
  heroImage: BrandingImage;
  overview: string;
  context: string;
  logoEvolution?: LogoEvolutionBlock;
  brandGoals: NumberedItem[];
  methods: NumberedItem[];
  keyInsights: NumberedItem[];
  strategyBlock?: StrategyBlock;
  visualSystem: {
    tokens: VisualToken[];
    palette: PaletteColor[];
    typography: TypeSpecimen[];
    lockups: LogoLockup[];
  };
  identityFigures: BrandingFigure[];
  brandInUse: BrandingFigure[];
  motionSpecs?: { text: string }[];
  results: BrandingResult[];
  liveUrl?: string;
  liveLabel?: string;
  nextSteps: NumberedItem[];
}

/** Section headings differ for a rebrand versus a first identity. */
export interface BrandingSectionCopy {
  contextNav: string;
  contextKicker: string;
  contextTitle: string;
  contextAsideLabel: string;
  contextAsideTitle: string;
  contextBreakdown: string;
  goalsNav: string;
  goalsKicker: string;
  goalsTitle: string;
  researchTitle: string;
  strategyTitle: string;
  inUseTitle: string;
}

export const brandingSectionCopy: Record<'REBRAND' | 'IDENTITY', BrandingSectionCopy> = {
  REBRAND: {
    contextNav: 'Rebrand',
    contextKicker: 'REBRAND',
    contextTitle: 'Why the old identity failed',
    contextAsideLabel: 'Brand tension',
    contextAsideTitle: 'What the rebrand had to fix',
    contextBreakdown: 'What was already in market',
    goalsNav: 'Rebrand goals',
    goalsKicker: 'REBRAND GOALS',
    goalsTitle: 'What the rebrand had to do',
    researchTitle: 'What the old brand was missing',
    strategyTitle: 'The rebrand decision',
    inUseTitle: 'The rebrand in use',
  },
  IDENTITY: {
    contextNav: 'New identity',
    contextKicker: 'NEW IDENTITY',
    contextTitle: 'Why a new identity was needed',
    contextAsideLabel: 'Starting point',
    contextAsideTitle: 'What the identity had to establish',
    contextBreakdown: 'What the brief required',
    goalsNav: 'Identity goals',
    goalsKicker: 'IDENTITY GOALS',
    goalsTitle: 'What the new identity had to do',
    researchTitle: 'Research before the first mark',
    strategyTitle: 'The identity decision',
    inUseTitle: 'The identity in use',
  },
};

export function getBrandingSectionCopy(category: BrandingCategory): BrandingSectionCopy {
  return category === 'REBRAND' ? brandingSectionCopy.REBRAND : brandingSectionCopy.IDENTITY;
}

export const brandingCategories: { value: BrandingCategory | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'All Case Studies' },
  { value: 'IDENTITY', label: 'Identity' },
  { value: 'REBRAND', label: 'Rebrand' },
  { value: 'PACKAGING', label: 'Packaging' },
  { value: 'BRAND_SYSTEM', label: 'Brand System' },
];

export const brandingCases: BrandingCase[] = [
  {
    slug: 'codestreaks',
    title: 'CodeStreaks',
    category: 'IDENTITY',
    tags: ['Identity', 'AI', 'Strategy'],
    caseNumber: '#001',
    client: 'CodeStreaks',
    year: '2025',
    timeline: '4 weeks',
    role: 'Brand Designer (Identity)',
    platform: 'Web · Print · Social',
    team: 'Solo project',
    tools: ['Figma', 'Illustrator', 'After Effects','Photoshop'],
    featured: true,
    accentColor: '#C7B198',
    descriptor: 'CodeStreaks builds AI automations, agents, and AI-native applications, but their real product is trust. Anyone can ship code; few will hand over every credential, every model config, every line at delivery. That transparency is the brief, and the identity had to earn it before a single word of copy did.',
    metaDescription:
      'CodeStreaks identity: automation rebuilt as infrastructure. Mark, type, color, and usage rules shipped as a Figma library and launch kit.',
    heroImage: {
      src: '/images/branding/codestreaks/codestreaks-hero.webp',
      alt: 'Brand identity for CodeStreaks - mark applied across a dark studio environment',
      width: 2200,
      height: 1400,
    },
    overview:
      'CodeStreaks builds automation systems for engineering teams but presented itself with clip-art robots and a template wordmark. I rebuilt the identity around a single idea: automation is infrastructure. The system ships as a Figma library, a written guideline, and a launch kit the team runs without me.',
    context:
      'The category is loud. Every competitor in AI automation was using the same gradient-and-orb visual language, which made a technically serious product read as a weekend experiment. Buyers were engineering leads with procurement budgets, and they were filtering on credibility signals before they ever booked a call.\n\nThe old identity failed at three specific points: the wordmark collapsed below 24px in product UI, the palette had no reserved accent so nothing could carry a call to action, and there were no usage rules, so every deck drifted further from the last one.',
    brandGoals: [
      { num: '01', text: 'Read as infrastructure to a technical buyer inside three seconds.' },
      { num: '02', text: 'Survive small sizes, favicon, product nav, and CLI documentation.' },
      { num: '03', text: 'Reserve one accent so calls to action always have somewhere to live.' },
      { num: '04', text: 'Ship usage rules the team can defend without a designer in the room.' },
    ],
    methods: [
      { num: '01', text: 'Category audit across 24 competitors in AI tooling and developer infrastructure.' },
      { num: '02', text: 'Nine interviews with engineering leads about first-impression trust signals.' },
      { num: '03', text: 'Positioning workshop to lock a single sentence before any visual exploration.' },
      { num: '04', text: 'Contrast and legibility testing of the mark from 16px to billboard scale.' },
    ],
    keyInsights: [
      { num: '01', text: 'Technical buyers read restraint as competence, density beat friendliness in every interview.' },
      { num: '02', text: 'The mark was seen at 20px far more often than at hero scale, so small-size behavior drove the design.' },
      { num: '03', text: 'A monospace layer signalled engineering credibility faster than any illustration.' },
      { num: '04', text: 'Teams broke the old brand because nothing told them what was allowed.' },
    ],
    strategyBlock: {
      heading: 'Position on infrastructure, not intelligence',
      body: 'Everyone in the category claims intelligence, so the claim carries no information. CodeStreaks instead owns reliability: the system your pipeline depends on. That single decision drove the whole visual language, a structural grid, a mono voice, one high-voltage accent used sparingly, and zero decorative AI imagery. The naming architecture follows the same logic, with product tiers named after operational states rather than personality traits.',
      image: {
        src:  '/images/branding/codestreaks/possition.webp',
        alt: 'Brand identity for CodeStreaks, positioning and messaging framework laid out on screen',
        width: 1800,
        height: 1125,
      },
    },
    visualSystem: {
      tokens: [
        { name: 'color.primary', value: 'Voltage indigo (#C7B198) - reserved for calls to action and live states only.' },
        { name: 'type.display', value: 'Inter Tight, weight 800, tracking −4% for headline and hero use.' },
        { name: 'type.mono', value: 'JetBrains Mono for labels, metadata, and all system readouts.' },
        { name: 'grid.base', value: '8px base unit with a 12-column desktop frame and 1px hairline rules.' },
        { name: 'radius.default', value: 'Zero radius everywhere, corners stay square across every surface.' },
        { name: 'motion.enter', value: '600ms clip reveal on cubic-bezier(0.16, 1, 0.3, 1), no bounce.' },
      ],
      palette: [
        { name: 'Warm Sand', hex: '#C7B198', usage: 'Primary Color. Carries the entire system by default.' },
        { name: 'Deep Espresso', hex: '#2B211C', usage: 'The only accent. Calls to action, live states, active nav.' },
        { name: 'Soft Ivory', hex: '#F9F6F2', usage: 'Primary type on dark. Used for surfaces and backgrounds.' },
        { name: 'Nearest Black', hex: '#0C0A09', usage: 'Hairline rules, card borders, and section separation.' },
        { name: 'Golden Glow', hex: '#F4D06F', usage: 'Secondary metadata and Accent color used sparingly.' },
        { name: 'Khaki', hex: '#BEA991', usage: 'Provides gentle contrast for hover states, pressed buttons, active navigation, and secondary surfaces.' },
      ],
      typography: [
        {
          role: 'Display',
          family: 'Satoshi · 800',
          usage: 'Headlines from 40px up. Tracking tightens as size increases.',
          sample: 'Automation is infrastructure',
          stack: 'display',
        },
        {
          role: 'Body',
          family: 'Inter · 400',
          usage: 'Paragraphs at 16-20px, 1.7 line height, 68 character measure.',
          sample: 'The system your pipeline depends on, documented so the team can defend it.',
          stack: 'body',
        },
        {
          role: 'System',
          family: 'IBM Plex Mono · 500',
          usage: 'All labels, metadata, and status readouts. Uppercase, 0.28em tracking.',
          sample: 'DEPLOY_STATUS · OPERATIONAL',
          mono: true,
          stack: 'mono',
        },
      ],
      lockups: [
        {
          name: 'Primary lockup',
          usage: 'Default. Web header, deck covers, and signage.',
          variant: 'primary',
          surface: 'dark',
          src: '/images/branding/codestreaks/primaryLogo-codestreaks.svg',
          alt: 'CodeStreaks primary lockup, mark and wordmark on dark',
        },
        {
          name: 'Horizontal',
          usage: 'Constrained heights, email signatures and product nav.',
          variant: 'horizontal',
          surface: 'dark',
          src: '/images/branding/codestreaks/horizontalLogo-codestreaks.svg',
          alt: 'CodeStreaks horizontal lockup',
        },
        {
          name: 'Stacked',
          usage: 'Square crops. Social avatars and app tiles.',
          variant: 'stacked',
          surface: 'dark',
          src: '/images/branding/codestreaks/stackedLogo-codestreaks.svg',
          alt: 'CodeStreaks stacked lockup',
        },
        {
          name: 'Icon only',
          usage: 'Below 24px. Favicon, CLI output, and notifications.',
          variant: 'icon',
          surface: 'dark',
          src: '/images/branding/codestreaks/iconLogo-codestreaks.svg',
          alt: 'CodeStreaks icon mark',
        },
        {
          name: 'On light',
          usage: 'Light surfaces only, print collateral and invoices.',
          variant: 'reversed',
          surface: 'light',
          src: '/images/branding/codestreaks/darkLogo-codestreaks.svg',
          alt: 'CodeStreaks lockup on light surface',
        },
      ],
    },
    identityFigures: [
      {
        id: 'id-01',
        label: 'LOCKUP',
        caption: 'Logo lockup family',
        description: 'Five approved variants with clear-space rules and minimum sizes documented for each.',
        image: {
          src: '/images/branding/codestreaks/logosVariation-Codestreaks.webp',
          alt: 'Brand identity for CodeStreaks, logo lockup family shown on a technical surface',
          width: 1800,
          height: 1125,
        },
      },
      {
        id: 'id-02',
        label: 'COLOR',
        caption: 'Color system specimen',
        description: 'Palette applied at real ratios, showing how sparingly the accent is allowed to appear.',
        image: {
          src: '/images/branding/codestreaks/Colors.webp',
          alt: 'Brand identity for CodeStreaks, color system specimen board',
          width: 1800,
          height: 1125,
        },
      },
      {
        id: 'id-03',
        label: 'PATTERN',
        caption: 'Grid and pattern system',
        description: 'The hairline grid doubles as a graphic device across covers, slides, and social frames.',
        image: {
          src: '/images/branding/codestreaks/Grid&pattren copy.webp',
          alt: 'Brand identity for CodeStreaks, grid and pattern system applied to layout',
          width: 1800,
          height: 1125,
        },
      },
    ],
    brandInUse: [
      {
        id: 'use-01',
        label: 'APPLICATION',
        caption: 'Wall Poster',
        description: 'Identity applied to poster design so the brand reads in public.',
        image: {
          src: '/images/branding/codestreaks/wallposter-codestreaks.webp',
          alt: 'Brand identity for CodeStreaks, logo applied on the product dashboard surface',
          width: 1800,
          height: 1125,
        },
      },
      {
        id: 'use-02',
        label: 'APPLICATION',
        caption: 'Environmental signage',
        description: 'Office signage using the icon-only lockup at architectural scale.',
        image: {
          src: '/images/branding/codestreaks/environmentalSignage.webp',
          alt: 'Brand identity for CodeStreaks, logo applied on office environmental signage',
          width: 1800,
          height: 1125,
        },
      },
      {
        id: 'use-03',
        label: 'APPLICATION',
        caption: 'Launch campaign',
        description: 'Social launch frames built from the pattern system with a fixed type hierarchy.',
        image: {
          src: '/images/branding/codestreaks/crosswalkBilboard.webp',
          alt: 'Brand identity for CodeStreaks, logo applied on social launch campaign frames',
          width: 1800,
          height: 1125,
        },
      },
    ],
    motionSpecs: [
      { text: 'Mark assembles from three strokes over 640ms, then holds, no loop, no bounce.' },
      { text: 'Section reveals use a hard clip wipe rather than a fade, matching the grid language.' },
      { text: 'Accent underline draws left to right at 320ms on hover for every primary action.' },
    ],
    results: [
      {
        label: 'BRAND_RECOGNITION',
        value: '+127%',
        description: 'Unprompted recall in a follow-up survey with the same buyer segment.',
      },
      {
        label: 'TRUST_SCORE',
        value: '4.8 / 5',
        description: 'First-impression credibility rating from 40 technical respondents.',
      },
      {
        label: 'DECK_DRIFT',
        value: '−10%',
        description: 'Off-brand slides after the guideline and Figma library shipped.',
      },
    ],
    liveUrl: 'https://www.codestreaks.com/',
    liveLabel: 'View live brand',
    nextSteps: [
      { num: '01', text: 'Extend the system into a documented motion package for product onboarding.' },
      { num: '02', text: 'Build a verbal identity layer covering error states and empty screens.' },
      { num: '03', text: 'Run a six-month audit to catch drift before it compounds.' },
    ],
  },
  techmekaCase,
  {
    slug: 'taxDoctors',
    title: 'TaxDoctors - Brand Identity',
    category: 'IDENTITY',
    tags: ['Identity', 'Strategy', 'Consulting'],
    caseNumber: '#003',
    client: 'TaxDoctors — China & Pakistan based tax consultancy firm',
    year: '2024',
    timeline: '4 weeks',
    role: 'Brand Designer (Identity & Visual System)',
    platform: 'Print · Digital · Social',
    team: 'Solo project',
    tools: ['Figma', 'Illustrator', 'Photoshop', 'After Effects', 'Premiere Pro'],
    featured: false,
    accentColor: '#DB3932',
    descriptor:
      "A complete brand identity for TaxDoctor, a tax consultation firm serving clients across Pakistan and China. The project defined the brand's narrative, tone of voice, and visual identity, turning a traditionally intimidating service into one built on clarity, trust, and approachability. Anchored by a bold Crimson Red and grounded in clean neutrals, the identity reflects TaxDoctor's promise: simplifying taxation and turning compliance into confidence.",
    metaDescription:
      'TaxDoctor identity: taxation rebuilt as clarity, not confusion. Mark, type, color, and usage rules shipped as a brand guideline and launch kit.',
    heroImage: {
      src: '/images/branding/taxDoc/heroTaxDoc.webp',
      alt: 'Brand identity for TaxDoctor - mark applied across a studio environment',
      width: 2200,
      height: 1400,
    },
    overview:
      'TaxDoctor simplifies taxation for individuals, entrepreneurs, and businesses across Pakistan and China, but the category around it runs on fear, jargon, and grey compliance-firm visuals. I rebuilt the identity around a single idea: taxation should feel like a diagnosis, not a burden. The system ships as a logo family, a written brand narrative and tone of voice, and a color and type system the team can apply without a designer in the room.',
    context:
      "Taxation is rarely approached with confidence. For entrepreneurs, SMEs, and multinational clients, it is one of the most complex and anxiety-inducing parts of running a business, made harder by operating across two very different regulatory systems, Pakistan's changing tax laws and China's strict compliance regulations.\n\nThe brand needed to hold two things at once: technical credibility in front of accountants and corporations, and approachability for individuals encountering tax help for the first time. Most competitors default to either cold, corporate minimalism or generic finance-app friendliness, neither of which builds the kind of trust a cross-border consultancy needs.",
    brandGoals: [
      { num: '01', text: 'Read as trustworthy and precise to both individual and corporate clients.' },
      { num: '02', text: 'Translate a bilingual, cross-border service into one coherent visual language.' },
      { num: '03', text: 'Reserve a single confident accent color that signals action and authority.' },
      { num: '04', text: 'Ship a narrative and tone of voice the team can write from without a designer in the room.' },
    ],
    methods: [
      { num: '01', text: 'Category audit of tax and financial consultancy branding across Pakistan and China.' },
      { num: '02', text: 'Positioning workshop built around the "doctor" metaphor: listen, diagnose, prescribe.' },
      { num: '03', text: 'Narrative development across Who We Are, What We Do, Why Choose Us, and Manifesto.' },
      { num: '04', text: 'Mark construction and legibility testing from favicon scale to signage.' },
    ],
    keyInsights: [
      { num: '01', text: 'Clients don\'t want more compliance jargon, they want a partner who translates it.' },
      { num: '02', text: 'The "doctor" framing outperformed generic "expert" or "advisor" language in tone testing.' },
      { num: '03', text: 'A single confident red, used sparingly, read as more credible than a busy multi-color system.' },
      { num: '04', text: 'The D-mark needed to work standalone, since it would appear far more often than the full wordmark.' },
    ],
    strategyBlock: {
      heading: 'Position on clarity, not complexity',
      body: "Every firm in this category claims expertise, so the claim carries no information. TaxDoctor instead owns clarity: the partner who makes complicated tax systems clear and actionable. That single decision shaped the whole visual language, a bold geometric D mark built from a clean cut circle, a confident Crimson Red used as a precision accent rather than decoration, and a tone of voice that guides instead of overwhelming. The brand narrative follows the same logic, structured like a diagnosis: understand the client, explain the system, prescribe the solution.",
      image: {
        src: '/images/branding/taxDoc/identityDecision.webp',
        alt: 'Brand identity for TaxDoctor, positioning and messaging framework laid out on screen',
        width: 1800,
        height: 1125,
      },
    },
    visualSystem: {
      tokens: [
        { name: 'color.primary', value: 'Crimson Red (#DB3932) - reserved for the mark, calls to action, and key accents.' },
        { name: 'type.display', value: 'Geometric sans, bold weight, tight tracking for headline and hero use.' },
        { name: 'type.body', value: 'Rounded grotesk for body copy, tuned for readability in long-form narrative.' },
        { name: 'grid.base', value: '8px base unit with a 12-column desktop frame.' },
        { name: 'radius.default', value: 'Soft geometric curves echoing the D mark, no hard corners on primary shapes.' },
        { name: 'motion.enter', value: 'Clip-reveal of the D mark over 500ms, no bounce, mirroring a clean diagnosis.' },
      ],
      palette: [
        { name: 'Crimson Red', hex: '#DB3932', usage: 'Primary color. The mark, key accents, and calls to action.' },
        { name: 'Rich Black', hex: '#050505', usage: 'Primary type and dark surfaces.' },
        { name: 'Snow White', hex: '#F9F9F9', usage: 'Primary background and light surfaces.' },
        { name: 'Emerald Green', hex: '#33DB6B', usage: 'Secondary accent (golden-angle extension), success and growth cues.' },
        { name: 'Royal Violet', hex: '#9C33DB', usage: 'Tertiary accent (golden-angle extension), used sparingly for premium highlights.' },
      ],
      typography: [
        {
          role: 'Display',
          family: 'Montserrat · 700',
          usage: 'Headlines and section titles. Tracking tightens as size increases.',
          sample: 'Who We Are',
          stack: 'display',
        },
        {
          role: 'Body',
          family: 'Merriweather · 400',
          usage: 'Paragraphs at 16-20px, generous line height for long-form brand narrative.',
          sample: 'We are built on trust, accuracy, and accessibility.',
          stack: 'serif',
        },
        {
          role: 'Accent',
          family: 'Geometric Sans · 500',
          usage: 'Section labels and eyebrow text, uppercase, wide tracking, always in Crimson Red.',
          sample: 'ABOUT TAXDOCTOR',
          stack: 'mono',
        },
      ],
      lockups: [
        {
          name: 'Primary lockup (horizontal)',
          usage: 'Default. Web header, deck covers, and signage.',
          variant: 'primary',
          surface: 'light',
          src: '/images/branding/taxDoc/taxDoctors-pLochup.svg',
          alt: 'TaxDoctors primary horizontal lockup, D mark and wordmark',
        },
        {
          name: 'Stacked lockup',
          usage: 'Square crops. Social avatars, app tiles, and vertical formats.',
          variant: 'stacked',
          surface: 'light',
          src: '/images/branding/taxDoc/taxDoctors-stacked.svg',
          alt: 'TaxDoctors stacked lockup, D mark above TAX-DOCTORS wordmark',
        },
        {
          name: 'Icon only',
          usage: 'Below 24px. Favicon, app icon, and small-format applications.',
          variant: 'icon',
          surface: 'light',
          src: '/images/branding/taxDoc/taxDoctors-icon.svg',
          alt: 'TaxDoctors D icon mark in Crimson Red',
        },
      ],
    },
    identityFigures: [
      {
        id: 'id-01',
        label: 'LOCKUP',
        caption: 'Brand book highlights',
        description: 'Showcasing the brand strategy and visual system',
        image: {
          src: '/images/branding/taxDoc/brandBook.webp',
          alt: 'Brand book of TaxDoctors showing the brand strategy and visual system',
          width: 1800,
          height: 1125,
        },
      },
      {
        id: 'id-02',
        label: 'COLOR',
        caption: 'Colors & typography',
        description: 'Crimson Red, Rich Black, and Snow White as the core system, extended with two golden-angle accent colors.',
        image: {
          src: '/images/branding/taxDoc/type&colors.webp',
          alt: 'Brand identity for TaxDoctor, color system specimen board',
          width: 1800,
          height: 1125,
        },
      },
      {
        id: 'id-03',
        label: 'TYPE',
        caption: 'Use of typography in the brand',
        description: 'How the typography is used in the brand posters',
        image: {
          src: '/images/branding/taxDoc/posters.webp',
          alt: 'Typography used in the brand posters',
          width: 1800,
          height: 1125,
        },
      },
    ],
    brandInUse: [
      {
        id: 'use-01',
        label: 'APPLICATION',
        caption: 'Office signage',
        description: 'Office signage using the icon-only lockup at architectural scale.',
        image: {
          src: '/images/branding/taxDoc/officeBoard.webp',
          alt: 'Office signage using the icon-only lockup at architectural scale',
          width: 1800,
          height: 1125,
        },
      },
      {
        id: 'use-02',
        label: 'APPLICATION',
        caption: 'Indore Poster',
        description: 'Indore Poster using the typography images and the color system',
        image: {
          src: '/images/branding/taxDoc/indorePoster.webp',
          alt: 'TaxDoctors indore posters',
          width: 1800,
          height: 1125,
        },
      },
      {
        id: 'use-03',
        label: 'APPLICATION',
        caption: 'Tape Duck',
        description: 'Stickey tape duct using the colors and logos',
        image: {
          src: '/images/branding/taxDoc/tape.webp',
          alt: 'TaxDoctors tape duck',
          width: 1800,
          height: 1125,
        },
      },
      {
        id: 'use-04',
        label: 'APPLICATION',
        caption: 'Business Card',
        description: 'Business Card using the colors and logos',
        image: {
          src: '/images/branding/taxDoc/businessCard.webp',
          alt: 'TaxDoctors business card',
          width: 1800,
          height: 1125,
        },
      },
      {
        id: 'use-05',
        label: 'APPLICATION',
        caption: 'Hand Bag',
        description: 'Hand carrying bag using the colors and logos',
        image: {
          src: '/images/branding/taxDoc/handbag.webp',
          alt: 'TaxDoctors hand carrying bag',
          width: 1800,
          height: 1125,
        },
      },
      {
        id: 'use-06',
        label: 'APPLICATION',
        caption: 'Coffee Cup',
        description: 'Coffee cup having large brand logo icon on it',
        image: {
          src: '/images/branding/taxDoc/logomarkCup.webp',
          alt: 'TaxDoctors coffee cup',
          width: 1800,
          height: 1125,
        },
      },
      {
        id: 'use-07',
        label: 'APPLICATION',
        caption: 'Stationery',
        description: 'Stationery design using colors system, typography and logos',
        image: {
          src: '/images/branding/taxDoc/stationary.webp',
          alt: 'TaxDoctors stationary',
          width: 1800,
          height: 1125,
        },
      },
    ],
    motionSpecs: [
      { text: 'D mark draws in a single clean stroke over 500ms, then holds, no loop, no bounce.' },
      { text: 'Section reveals use a soft clip wipe, mirroring the D mark\'s curved geometry.' },
      { text: 'Crimson Red underline draws left to right at 300ms on hover for every primary action.' },
    ],
    results: [
      {
        label: 'BRAND_CLARITY',
        value: 'Defined',
        description: 'Full narrative and tone of voice system shipped alongside the visual identity.',
      },
      {
        label: 'MARK_LEGIBILITY',
        value: 'Verified',
        description: 'D mark tested and confirmed legible from favicon scale up to signage.',
      },
      {
        label: 'MARKETS_COVERED',
        value: '2',
        description: 'One coherent identity built to work credibly across Pakistan and China.',
      },
    ],
    liveUrl: '',
    liveLabel: 'View live brand',
    nextSteps: [
      { num: '01', text: 'Extend the system into a documented motion package for onboarding and social.' },
      { num: '02', text: 'Build out a full stationery and pitch deck template suite.' },
      { num: '03', text: 'Develop bilingual (English/Mandarin) type and layout guidelines.' },
    ],
  },
];
