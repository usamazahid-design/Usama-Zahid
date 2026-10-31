export interface SampleLogo {
  id: 'simple' | 'complex' | 'gradient';
  title: string;
  badge: string;
  brandName: string;
  industry: string;
  tagline: string;
  description: string;
  svg: string;
  dataUrl: string;
}

const SIMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%" style="display:block;max-width:100%;max-height:100%;">
  <rect width="512" height="512" rx="128" fill="#4B3FFF"/>
  <path d="M140 372 L256 140 L372 372 Z" fill="none" stroke="#FFFFFF" stroke-width="48" stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="256" cy="280" r="32" fill="#FFDE00"/>
</svg>`;

const COMPLEX_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%" style="display:block;max-width:100%;max-height:100%;">
  <circle cx="256" cy="256" r="240" fill="#1C1A17" stroke="#D4AF37" stroke-width="4"/>
  <circle cx="256" cy="256" r="226" fill="none" stroke="#D4AF37" stroke-width="1.2" stroke-dasharray="4,4"/>
  <circle cx="256" cy="256" r="218" fill="none" stroke="#8C7335" stroke-width="0.8"/>
  <path d="M120 180 C160 140 352 140 392 180 C360 210 320 220 256 220 C192 220 152 210 120 180 Z" fill="#2E2820" stroke="#D4AF37" stroke-width="1"/>
  <text x="256" y="196" font-family="serif" font-size="14" fill="#E8D5A0" text-anchor="middle" letter-spacing="4">TRADITIONAL HERITAGE</text>
  <!-- Fine filigree crest -->
  <path d="M256 228 L278 280 L334 284 L290 320 L304 374 L256 344 L208 374 L222 320 L178 284 L234 280 Z" fill="#D4AF37" stroke="#68541E" stroke-width="1"/>
  <circle cx="256" cy="305" r="20" fill="#1C1A17" stroke="#E8D5A0" stroke-width="0.8"/>
  <text x="256" y="310" font-family="serif" font-size="11" fill="#E8D5A0" text-anchor="middle">★</text>
  <path d="M170 380 Q256 420 342 380" fill="none" stroke="#D4AF37" stroke-width="1.2"/>
  <text x="256" y="415" font-family="serif" font-size="10" fill="#BFA76F" text-anchor="middle" letter-spacing="3">ESTABLISHED 1894 · PURVEYORS</text>
  <text x="256" y="435" font-family="sans-serif" font-size="7" fill="#8C7335" text-anchor="middle" letter-spacing="2">AUTHENTIC APOTHECARY &amp; CO.</text>
  <path d="M140 256 L150 246 M372 256 L362 246 M135 270 L148 262 M377 270 L364 262" stroke="#D4AF37" stroke-width="0.75"/>
</svg>`;

const GRADIENT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%" style="display:block;max-width:100%;max-height:100%;">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E0725"/>
      <stop offset="100%" stop-color="#040209"/>
    </linearGradient>
    <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4B3FFF"/>
      <stop offset="50%" stop-color="#8B5CF6"/>
      <stop offset="100%" stop-color="#00C7CE"/>
    </linearGradient>
    <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00C7CE" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#4B3FFF" stop-opacity="0"/>
    </radialGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="16" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="120" fill="url(#bgGrad)"/>
  <circle cx="256" cy="256" r="140" fill="url(#glowGrad)"/>
  <path d="M190 350 C150 300 150 210 200 170 C250 130 330 140 360 190 C390 240 370 320 310 350 C260 375 220 370 190 350 Z" 
        fill="none" stroke="url(#neonGrad)" stroke-width="42" stroke-linecap="round" filter="url(#softGlow)"/>
  <circle cx="310" cy="230" r="28" fill="#00C7CE"/>
</svg>`;

function svgToDataUrl(svg: string): string {
  if (typeof window !== 'undefined') {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }
  // Safe Node SSR / build
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

export const SAMPLE_LOGOS: SampleLogo[] = [
  {
    id: 'simple',
    title: 'Minimal Geometric Mark',
    badge: 'Expected 9.0+ · Highly Scalable',
    brandName: 'Apex Architecture',
    industry: 'Architecture & Design',
    tagline: 'Precision in form and structure',
    description: 'A bold, single-element icon with thick stroke and flat color. Built for ultra-high legibility from 16px favicons to billboards.',
    svg: SIMPLE_SVG,
    dataUrl: svgToDataUrl(SIMPLE_SVG),
  },
  {
    id: 'complex',
    title: 'Vintage Crest & Seal',
    badge: 'Expected 4.5-5.5 · Detail Risk',
    brandName: 'St. Claire Apothecary',
    industry: 'Luxury Goods & Heritage',
    tagline: 'Purveyors of fine botanicals since 1894',
    description: 'An intricate crest with tiny typography, fine 0.8px filigree, and dense concentric rings that blur and erode at small sizes.',
    svg: COMPLEX_SVG,
    dataUrl: svgToDataUrl(COMPLEX_SVG),
  },
  {
    id: 'gradient',
    title: 'Multi-Color Neon Gradient',
    badge: 'Expected 6.5-7.5 · Gradient Risk',
    brandName: 'PulseFlow AI',
    industry: 'Developer Tools & SaaS',
    tagline: 'Real-time telemetry and automation',
    description: 'Modern SaaS mark featuring neon radial gradients, soft glows, and multi-tone overlays. Flags one-color monochrome and printing contrast.',
    svg: GRADIENT_SVG,
    dataUrl: svgToDataUrl(GRADIENT_SVG),
  },
];
