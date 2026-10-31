export type ProductType =
  | 'figma'
  | 'nextjs'
  | 'notion'
  | 'pdf'
  | 'motion'
  | 'bundle'
  | 'zip'
  | 'ai'
  | 'web'
  | 'psd';

export type ProductStatus = 'available' | 'new' | 'bestseller' | 'limited';
export type ProductDeliveryMode = 'link' | 'file' | 'email';

export interface Product {
  slug: string;
  number: string;
  code: string;
  name: string;
  type: ProductType;
  typeLabel: string;
  tagline: string;
  description: string;
  thumbnail: string;
  gallery: string[];
  showGallery?: boolean;
  bullets: string[];
  price: string;
  compareAt?: string;
  status: ProductStatus;
  featured?: boolean;
  files: string[];
  compatibility: string[];
  updates: string;
  license: string;
  deliveryMode?: ProductDeliveryMode;
  deliveryUrl?: string;
  deliveryLabel?: string;
}

export const products: Product[] = [

  {
    slug: '20-point-brand-product-trust-scorecard',
    number: '01',
    code: 'Notion · Scorecard',
    name: '20-Point Brand & Product Trust Scorecard',
    type: 'notion',
    typeLabel: 'Notion Page',
    tagline: 'Find the trust leaks costing you signups. In 5 minutes.',
    description:
      'A 20-point self-audit for AI and SaaS founders. Score your website and app across brand, positioning, and onboarding UX, then see exactly where visitors stop trusting you. Duplicate it into your own Notion workspace and run it in five minutes.',
    thumbnail:
      '/images/Products/20-point-brand-&-product-trust.webp', // TODO: replace with a scorecard preview image
    gallery: [],
    showGallery: false,
    bullets: [
      '20 checkpoints across brand, positioning, and product UX',
      'Part 1: The First 5 Seconds (hero, hierarchy, trust signals)',
      'Part 2: The First 5 Minutes (signup, empty states, time-to-value)',
      'Simple scoring: 16–20 aligned, 11–15 trust leaks, under 10 hurting sales',
      'Duplicate to your own Notion workspace, reusable for every release',
      'Built from six years of brand and product design work',
    ],
    price: 'Free', // set your price or lead-magnet strategy
    compareAt: '',
    status: 'new', // was 'bestseller'; use a value your type allows
    files: ['1 × Notion template (20-point scorecard)'],
    compatibility: ['Notion (free plan works)', 'Desktop & mobile'],
    updates: 'Lifetime access via duplicated template',
    license: 'Personal and internal team use',
    deliveryMode: 'link',
    deliveryUrl:
      'https://app.notion.com/p/The-5-Minute-Brand-UX-Trust-Audit-996da94903dc4f65990f8160343de5f9?source=copy_link',
    deliveryLabel: 'Duplicate Notion template',
  },
  {
    slug: 'brand-kit-generator',
    number: '02',
    code: 'Web · Tool',
    name: 'Brand Kit Generator — Logo to Brand Guidelines',
    type: 'web',
    typeLabel: 'Web Tool',
    tagline: 'Turn any SVG or PNG logo into a complete brand guidelines kit, color palette, and business card in minutes.',
    description:
      'Free in-browser Brand Kit Generator: upload your logo mark to run a 7-factor scalability audit, extract WCAG-checked color palettes, pair typography, preview 6 real-world brand mockups, design a print-ready business card, and export a 6-page vector PDF brand book.',
    thumbnail:
      '/images/Products/Brandkit-Generator.webp', // TODO: replace with a scorecard preview image
    gallery: [],
    showGallery: false,
    bullets: [
      '7-Factor Logo Scalability & Dark/Light Contrast Audit',
      'Perceptual Color Palette Extraction & WCAG Contrast Matrix',
      'Curated Google Font Typography Pairings & Modular Type Scale',
      'Interactive Dual-Sided Business Card & QR Code Designer',
      '6 Real-World Brand Mockups & 6-Page Vector PDF Brand Book Export',
    ],
    price: 'Free', // set your price or lead-magnet strategy
    compareAt: '',
    status: 'new', // was 'bestseller'; use a value your type allows
    files: ['Interactive Brand Kit Studio web tool + 6-page PDF Brand Book export'],
    compatibility: ['All modern web browsers (100% client-side, private processing)'],
    updates: 'Always up to date in your browser',
    license: 'Free for personal and commercial brand projects',
    deliveryMode: 'link',
    deliveryUrl:
      'https://usamazahid.design/brand-kit/',
    deliveryLabel: 'Launch Brand Kit Studio',
  }
  /*{
    slug: 'brand-kit-generator',
    number: '02',
    code: 'PDF · AI',
    name: 'Brand Kit Generator',
    type: 'PDF',
    typeLabel: 'Tool',
    tagline: 'Generate a brand kit for your brand in minutes.',
    description:
      'Brand Kit Generator is a tool that helps you generate a brand kit for your brand in minutes.',
    thumbnail:
      '/images/Products/Brandkit-Generator.webp',
    gallery: [
      '',
      '',
      '',
    ],
    bullets: [
      'Type system + scale + pairing rules',
      'Color tokens (HSL, hex, theme-ready)',
      'Logo lockups (primary, inverse, mono, mark)',
      '60+ components (cards, buttons, navs, modals)',
      'Voice & tone guide (4-page doc)',
      'Motion tokens (durations, eases, gestures)',
    ],
    price: 'Free',
    compareAt: '',
    status: 'new',
    featured: true,
    files: ['Web tool'],
    compatibility: ['Figma Desktop', 'Figma Web', 'Any system that consumes tokens'],
    updates: 'Lifetime access',
    license: 'Single operator / studio · Unlimited client work',
    deliveryMode: 'link',
    deliveryUrl: 'https://usamazahid.design/brand-kit/',
    deliveryLabel: '',
  }*/

];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

export function getFeaturedProduct(): Product | undefined {
  return products.find((p) => p.featured);
}

export function getNonFeaturedProducts(): Product[] {
  return products.filter((p) => !p.featured);
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  const current = getProductBySlug(slug);
  if (!current) return products.slice(0, limit);
  return products
    .filter((p) => p.slug !== slug)
    .sort((a, b) => Number(b.type === current.type) - Number(a.type === current.type))
    .slice(0, limit);
}
