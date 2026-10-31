import { techmekaImages } from '@/lib/branding-images';
import type { BrandingCase } from '@/lib/branding-data';

/**
 * TODO before publishing: swap placeholder imagery in `techmekaImages` for exported assets
 * under `/images/branding/techmeka/`, and set `liveUrl` when the rebrand ships.
 */
export const techmekaCase: BrandingCase = {
  slug: 'techmeka',
  title: 'Techmeka',
  category: 'REBRAND',
  tags: ['Brand Identity', 'Design System', 'Fintech'],
  caseNumber: '#002',
  client: 'Techmeka',
  year: '2025',
  timeline: '3 weeks',
  role: 'Brand & Design System Designer',
  platform: 'Web App · Product UI · Marketing Site',
  team: 'Solo project',
  tools: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe After Effects'],
  accentColor: '#4337FF',
  descriptor:
    'The old mark was a dense, interlocking T+M monogram - mitered corners, a compressed slab-serif wordmark, almost no negative space. It read as generic 2000s-era IT-consultancy signage: technically competent, but indistinguishable from hundreds of similar T/M monograms, and it broke down badly at favicon size where the interior negative space just filled in solid. Two brand hex codes extended into a golden-ratio color and type system - built for fintech UI, not picked by eye.',
  metaDescription:
    'Techmeka rebrand: new brand mark and a full color and type system built outward from two existing brand hex codes using the golden ratio.',
  heroImage: {
    src: '/images/branding/techmeka/heroTechmeka.webp',
    alt: 'TechMeka brand system, indigo and sky palette applied across product UI & Social Media',
    width: 2200,
    height: 1400,
  },
  overview:
    "TechMeka's brand was two disconnected hex codes with no system behind them - no scale, no rule for a third color, nothing that held up once dark mode or real financial data entered the picture. I built a full color and type system from those two colors alone: every new hue comes from rotating the primary's hue by the golden angle, every tint and shade comes from scaling by the golden ratio, so nothing in the system was picked by eye. The old brand mark was dense, not scale able. The new mark is simple, scaleable, and has a place in the color system.",
  context:
    'The brief was narrow on purpose: keep #4337FF and #2D9CDB exactly as they are, and build everything else accent, semantic states, neutrals, a type system, both a light and a dark theme as a system that clearly grows from them rather than sitting next to them.\n\nFintech UI has more color surface area than a marketing site: success states, danger states, financial "growth" that needs to read differently from a generic success toast, tabular numbers that have to be unambiguous at a glance. None of that existed yet.',
  logoEvolution: {
    heading: 'From monogram to motion',
    body:
      'The old mark was a dense, interlocking T+M monogram - mitered corners, a compressed slab-serif wordmark, almost no negative space. It read as generic 2000s-era IT-consultancy signage: technically competent, but indistinguishable from hundreds of similar T/M monograms, and it broke down badly at favicon size where the interior negative space just filled in solid.\n\nThe new mark drops the monogram entirely for a single gesture: four rounded blocks stepping upward and to the right, reading at once as an abstracted T and as a rising staircase or bar chart - a shape with "growth" built into it rather than spelled out. It\'s built from one repeated corner radius and one proportion rule instead of a dozen mitered joins, so it holds up from a 16px favicon to a building sign, and unlike the old mark it now has somewhere to live in the brand\'s color system instead of being locked to black on white.',
    oldSurface: 'dark',
    newSurface: 'dark',
    oldLogo: {
      src: techmekaImages.oldLogo,
      alt: 'Previous TechMeka logo, an interlocking T and M monogram with a slab-serif wordmark',
      width: 1200,
      height: 1200,
    },
    newLogo: {
      src: techmekaImages.newLogo,
      alt: 'New TechMeka mark, four rounded blocks stepping upward as an abstracted T and growth motif',
      width: 1200,
      height: 1200,
    },
  },
  brandGoals: [
    { num: '01', text: 'Keep the two existing brand colors exactly as they are - the system has to grow from them, not replace them.' },
    { num: '02', text: 'Give every UI state success, growth, info, danger - its own color, without any of them reading as decoration.' },
    { num: '03', text: 'Hit WCAG AA text contrast in both a light and a dark theme, not just on the marketing site.' },
    { num: '04', text: 'Extend two brand colors into a full type and color system without it feeling bolted on.' },
  ],
  methods: [
    { num: '01', text: "Derived every new hue by rotating the primary's hue by the golden angle (137.5°) instead of picking accent colors by eye." },
    { num: '02', text: 'Built tint and shade scales where each step\'s distance to white or black divides by φ (1.618), instead of even linear steps.' },
    { num: '03', text: 'Contrast-checked every text/background pairing against WCAG AA in both themes before finalizing any token.' },
    { num: '04', text: 'Paired the display typeface against a quieter UI face and a monospace built specifically for account numbers and IDs.' },
  ],
  keyInsights: [
    { num: '01', text: 'The brand indigo at full saturation fails text contrast on a dark background (2.98:1) - dark mode needed its own lighter tint, not the raw brand hex.' },
    { num: '02', text: '"Success" and "growth" needed to be two different greens, or a confirmation toast and a rising balance chart would compete on the same screen.' },
    { num: '03', text: "A separate Info color wasn't needed - the existing secondary blue already was one, which kept the core palette at five colors instead of six." },
    { num: '04', text: "Two brand colors alone don't specify a relationship between them - the golden angle gave a repeatable rule for every new hue instead of one-off choices." },
  ],
  strategyBlock: {
    heading: 'Two colors, one formula',
    body:
      "Instead of choosing new brand colors by eye, every addition to the palette came from the same rule: rotate the primary's hue by the golden angle (137.5°) to find it, and scale its tints and shades by the golden ratio (1.618). That's what ties Coral, Success, Growth, and Danger back to the same #4337FF the brand started with — nothing in the system is an arbitrary pick.",
    image: {
      src: '/images/branding/techmeka/colors.webp',
      alt: 'TechMeka golden-angle hue rotation diagram showing derived accent and semantic colors',
      width: 1800,
      height: 1125,
    },
  },
  visualSystem: {
    tokens: [
      { name: 'color.primary.base', value: 'Indigo (#4337FF), unchanged brand primary. Buttons, links, brand mark.' },
      { name: 'color.secondary.base', value: 'Sky (#2D9CDB), unchanged brand secondary. Doubles as the Info color.' },
      { name: 'hue.rotation', value: '137.5° golden-angle turns from Indigo generate Coral, Success, Growth, and Danger.' },
      { name: 'scale.ratio', value: 'φ = 1.618. Each tint/shade step divides its remaining distance to white or black by φ.' },
      { name: 'type.display', value: 'Nexa - headlines and the logotype only, never set in paragraphs.' },
      { name: 'type.mono', value: 'JetBrains Mono for every balance, IBAN, and reference ID.' },
    ],
    palette: [
      { name: 'Indigo', hex: '#4337FF', usage: 'Primary brand color, unchanged. Buttons, links, brand mark.' },
      { name: 'Sky', hex: '#2D9CDB', usage: 'Secondary brand color, unchanged. Also stands in as Info.' },
      { name: 'Coral', hex: '#F77E3B', usage: 'Accent, one golden-angle turn from Indigo. The only warm color one action per screen, never more.' },
      { name: 'Success Green', hex: '#45A12B', usage: 'UI confirmation states saved, passed, verified.' },
      { name: 'Growth Emerald', hex: '#259D73', usage: 'Financial meaning only positive balances, upward chart lines. Deliberately not the same green as Success.' },
      { name: 'Danger Rose', hex: '#CA2178', usage: 'Errors and destructive actions. A rose-red rather than a stock red, still unambiguous.' },
    ],
    typography: [
      {
        role: 'Display',
        family: 'Nexa · Bold',
        usage: 'Headlines and the logotype only.',
        sample: 'Rebuilding trust in every transaction',
        stack: 'display',
      },
      {
        role: 'UI / body',
        family: 'Instrument Sans · 400–600',
        usage: 'Everything a person reads for more than a few seconds forms, labels, help text.',
        sample: 'Verify your identity to continue',
        stack: 'body',
      },
      {
        role: 'Data',
        family: 'JetBrains Mono · 400–500',
        usage: 'Balances, account numbers, reference IDs anywhere 0/O or 1/l/I ambiguity matters.',
        sample: 'PKR 248,910.44 · IBAN PK36 SCBL 0000 0011 2345 6702',
        mono: true,
        stack: 'mono',
      },
    ],
    lockups: [
      {
        name: 'Primary mark',
        usage: 'The stepped four-block glyph, black on light surfaces.',
        variant: 'primary',
        surface: 'light',
        src: '/images/branding/techmeka/primaryMark.svg',
        alt: 'TechMeka primary mark, stepped four-block glyph',
      },
      {
        name: 'Reversed mark',
        usage: 'White mark on Indigo or on a dark surface.',
        variant: 'reversed',
        surface: 'dark',
        src: '/images/branding/techmeka/VerticalLogo.svg',
        alt: 'TechMeka reversed mark, white glyph on dark',
      },
      {
        name: 'Gradient mark',
        usage: 'Indigo-to-Sky gradient across the steps, hero and marketing use only.',
        variant: 'gradient',
        surface: 'dark',
        src: '/images/branding/techmeka/gradientMark.svg',
        alt: 'TechMeka gradient mark, indigo to sky across the stepped glyph',
      },
      {
        name: 'Product',
        usage: 'Text logo with product name. Used on the product UI and marketing site.',
        variant: 'gradient',
        surface: 'dark',
        src: '/images/branding/techmeka/Techmeka-M365.svg',
        alt: 'TechMeka text mark with product name',
      },
      {
        name: 'App Icon',
        usage: 'App icon, and anywhere below 32px.',
        variant: 'reversed',
        surface: 'dark',
        src: '/images/branding/techmeka/appIcon.svg',
        alt: 'TechMeka App Icon, stepped glyph at app icon scale',
      },
      {
        name: 'Icon only',
        usage: 'Favicon, app icon, and anywhere below 32px.',
        variant: 'icon',
        surface: 'dark',
        src: '/images/branding/techmeka/TechmekaIcon.svg',
        alt: 'TechMeka icon mark, stepped glyph at favicon scale',
      },
    ],
  },
  identityFigures: [
    {
      id: 'tm-id-01',
      label: 'TYPE',
      caption: 'Type system',
      description: "Nexa, Instrument Sans, and JetBrains Mono, each with a fixed role and no overlap.",
      image: {
        src: '/images/branding/techmeka/typoSystem.webp',
        alt: 'TechMeka full palette derived from the golden angle',
        width: 1800,
        height: 1125,
      },
    },
    {
      id: 'tm-id-02',
      label: 'COLOR',
      caption: 'Gradients',
      description: 'Gradients used in the product UI and marketing site.',
      image: {
        src: '/images/branding/techmeka/gradients.webp',
        alt: 'TechMeka typography specimens across three typefaces',
        width: 1800,
        height: 1125,
      },
    },
    {
      id: 'tm-id-03',
      label: 'LOCKUP',
      caption: 'Logo in color',
      description: 'All logo colors and treatments.',
      image: {
        src: '/images/branding/techmeka/logoColors.webp',
        alt: 'TechMeka logo lockups across primary, reversed, and gradient treatments',
        width: 1800,
        height: 1125,
      },
    },
  ],
  brandInUse: [
    {
      id: 'tm-use-01',
      label: 'APPLICATION',
      caption: 'Website hero',
      description: 'Website hero section with the new brand mark and gradient.',
      image: {
        src: '/images/branding/techmeka/webpage.webp',
        alt: 'website hero section with the new brand mark and gradient',
        width: 1800,
        height: 1125,
      },
    },
    {
      id: 'tm-use-02',
      label: 'APPLICATION',
      caption: 'Google meet , Zoom',
      description: 'Call Screen with Techmeka brand for Google meet and Zoom',
      image: {
        src: '/images/branding/techmeka/Callouts.webp',
        alt: 'TechMeka Call Screen with Google meet and Zoom',
        width: 1800,
        height: 1125,
      },
    },
    {
      id: 'tm-use-03',
      label: 'APPLICATION',
      caption: 'Marketing site',
      description: 'Social Post with Techmeka brand for LinkedIn, instagram and Twitter',
      image: {
        src: '/images/branding/techmeka/SocialPost.webp',
        alt: 'Techmeka Social Post with LinkedIn, instagram and Twitter',
        width: 1800,
        height: 1125,
      },
      
    },
    {
      id: 'tm-use-04',
      label: 'APPLICATION',
      caption: 'Office Card',
      description: 'Techmeka Office Card with QR code and contact information',
      image: {
        src: '/images/branding/techmeka/cards.webp',
        alt: 'Techmeka Office Card with QR code and contact information',
        width: 1800,
        height: 1125,
      },
      
    },
    {
      id: 'tm-use-05',
      label: 'APPLICATION',
      caption: 'Statuinary',
      description: 'Statuinary with Techmeka brand for office, business card and other printed materials',
      image: {
        src: '/images/branding/techmeka/statuinary.webp',
        alt: 'TechMeka statuinary with office, business card and other printed materials',
        width: 1800,
        height: 1125,
      },
      
    },
    {
      id: 'tm-use-06',
      label: 'APPLICATION',
      caption: 'Marketing site',
      description: 'Billboard with techmeka brand in the city of Karachi',
      image: {
        src: '/images/branding/techmeka/bilboard.webp',
        alt: 'TechMeka brand in the city of Karachi',
        width: 1800,
        height: 1125,
      },
      
    },
    
  ],
  results: [
    {
      label: 'CONTRAST',
      value: '100%',
      description: 'Of defined text/background pairs pass WCAG AA in both light and dark theme.',
    },
    {
      label: 'CORE_PALETTE',
      value: '9',
      description: 'Colors in the full system, every one derived from the original 2 brand hex codes.',
    },
    {
      label: 'LAUNCH_DATA',
      value: '—',
      description: 'Awaiting production metrics — will update this case study once the rebrand ships.',
    },
  ],
  liveLabel: 'View live brand',
  nextSteps: [
    { num: '01', text: 'Apply the palette and type system to the marketing site and product dashboard.' },
    { num: '02', text: 'Extend the stepped mark into its color treatments for real-world placements.' },
    { num: '03', text: 'Document component-level tokens buttons, forms, charts on top of the base palette.' },
  ],
};
