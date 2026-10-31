import { TypographyPairing, ScalabilityResult } from './types';

export const TYPOGRAPHY_PAIRINGS: TypographyPairing[] = [
  {
    id: 'space-inter',
    name: 'Space Grotesk & Inter',
    headingFont: 'Space Grotesk',
    bodyFont: 'Inter',
    headingWeights: [600, 700],
    bodyWeights: [400, 500, 600],
    category: 'Technology & SaaS',
    moodTags: ['Modern', 'Technical', 'High-Trust', 'SaaS'],
    description: 'Crisp geometric monoline display headlines balanced by the universal legibility of Inter.',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@600;700&display=swap',
  },
  {
    id: 'playfair-jakarta',
    name: 'Playfair Display & Plus Jakarta Sans',
    headingFont: 'Playfair Display',
    bodyFont: 'Plus Jakarta Sans',
    headingWeights: [600, 700],
    bodyWeights: [400, 500, 600],
    category: 'Luxury & Goods',
    moodTags: ['Editorial', 'Luxury', 'Prestige', 'Refined'],
    description: 'High-contrast transitional serif titles paired with a clean geometric neo-grotesque body.',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap',
  },
  {
    id: 'outfit-inter',
    name: 'Outfit & Inter',
    headingFont: 'Outfit',
    bodyFont: 'Inter',
    headingWeights: [600, 700],
    bodyWeights: [400, 500],
    category: 'SaaS & Product',
    moodTags: ['Humanist', 'Friendly', 'Accessible', 'Modern'],
    description: 'Warm circular geometric proportions for modern software, enterprise tools, and apps.',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@600;700&display=swap',
  },
  {
    id: 'syne-archivo',
    name: 'Syne & Archivo',
    headingFont: 'Syne',
    bodyFont: 'Archivo',
    headingWeights: [700, 800],
    bodyWeights: [400, 500],
    category: 'Creative Agency & Media',
    moodTags: ['Brutalist', 'Bold', 'Avant-Garde', 'Experimental'],
    description: 'Sculptural ultra-wide display letters for fearless design studios, fashion, and culture.',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=Syne:wght@700;800&display=swap',
  },
  {
    id: 'merriweather-source',
    name: 'Merriweather & Source Sans 3',
    headingFont: 'Merriweather',
    bodyFont: 'Source Sans 3',
    headingWeights: [700, 900],
    bodyWeights: [400, 600],
    category: 'Finance & FinTech',
    moodTags: ['Corporate', 'Institutional', 'Authoritative', 'Credible'],
    description: 'Traditional editorial authority engineered for screens, whitepapers, and advisory firms.',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@700;900&family=Source+Sans+3:wght@400;600&display=swap',
  },
  {
    id: 'dmserif-dmsans',
    name: 'DM Serif Display & DM Sans',
    headingFont: 'DM Serif Display',
    bodyFont: 'DM Sans',
    headingWeights: [400],
    bodyWeights: [400, 500, 700],
    category: 'Creative Agency & Media',
    moodTags: ['Editorial', 'Artisan', 'Harmonious', 'Contemporary'],
    description: 'A sister typeface system with matching low-contrast geometry and organic terminals.',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Serif+Display&display=swap',
  },
  {
    id: 'jetbrains-inter',
    name: 'JetBrains Mono & Inter',
    headingFont: 'JetBrains Mono',
    bodyFont: 'Inter',
    headingWeights: [600, 700],
    bodyWeights: [400, 500],
    category: 'Developer Tools & SaaS',
    moodTags: ['Developer', 'Code', 'Precision', 'Engineered'],
    description: 'Technical monospaced headline cadence meeting high-density product UI body copy.',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@600;700&display=swap',
  },
  {
    id: 'fraunces-urbanist',
    name: 'Fraunces & Urbanist',
    headingFont: 'Fraunces',
    bodyFont: 'Urbanist',
    headingWeights: [600, 700],
    bodyWeights: [400, 500, 600],
    category: 'Food & Hospitality',
    moodTags: ['Warm', 'Artisanal', 'Organic', 'Tactile'],
    description: 'Wonky retro-modern old-style serif with soft pillowy curves and contemporary neutral body.',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Urbanist:wght@400;500;600&display=swap',
  },
  {
    id: 'plusjakarta-public',
    name: 'Plus Jakarta Sans & Public Sans',
    headingFont: 'Plus Jakarta Sans',
    bodyFont: 'Public Sans',
    headingWeights: [700, 800],
    bodyWeights: [400, 500],
    category: 'Finance & FinTech',
    moodTags: ['FinTech', 'High-Security', 'Institutional', 'Structured'],
    description: 'Clean civic-grade typography engineered for complex data tables and financial apps.',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Public+Sans:wght@400;500&display=swap',
  },
  {
    id: 'sora-manrope',
    name: 'Sora & Manrope',
    headingFont: 'Sora',
    bodyFont: 'Manrope',
    headingWeights: [600, 700],
    bodyWeights: [400, 500, 600],
    category: 'Technology & SaaS',
    moodTags: ['AI', 'Futuristic', 'Geometric', 'Systematic'],
    description: 'Low-contrast futuristic cue for artificial intelligence, cryptography, and robotics.',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Sora:wght@600;700&display=swap',
  },
  {
    id: 'cormorant-montserrat',
    name: 'Cormorant Garamond & Montserrat',
    headingFont: 'Cormorant Garamond',
    bodyFont: 'Montserrat',
    headingWeights: [600, 700],
    bodyWeights: [400, 500],
    category: 'Luxury & Goods',
    moodTags: ['High-Fashion', 'Jewelry', 'Graceful', 'Haute'],
    description: 'Extravagant traditional proportions paired with architectural geometric tracking.',
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Montserrat:wght@400;500;600&display=swap',
  },
  {
    id: 'cabinet-satoshi',
    name: 'Cabinet Grotesk & Satoshi',
    headingFont: 'Cabinet Grotesk',
    bodyFont: 'Satoshi',
    headingWeights: [800, 900],
    bodyWeights: [400, 500],
    category: 'Architecture & Real Estate',
    moodTags: ['Architectural', 'Massive', 'Physical', 'Structured'],
    description: 'Industrial heavyweight neo-grotesque for physical environments, architecture, and bold tech.',
    googleFontsUrl: 'https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,900&f[]=satoshi@400,500&display=swap',
  },
];

export function getRecommendedPairing(
  industry: string,
  scalability?: ScalabilityResult | null
): TypographyPairing {
  const normalized = industry.toLowerCase();

  // If optical analysis is present, factor in geometric vs editorial vs gradient characteristics
  if (scalability) {
    if (scalability.thinStrokeDetected && (normalized.includes('luxury') || normalized.includes('heritage') || normalized.includes('goods'))) {
      return TYPOGRAPHY_PAIRINGS[1]; // Playfair Display & Plus Jakarta Sans
    }
    if (scalability.hasGradients && (normalized.includes('tech') || normalized.includes('ai') || normalized.includes('dev') || normalized.includes('saas'))) {
      return TYPOGRAPHY_PAIRINGS[9]; // Sora & Manrope
    }
  }

  if (normalized.includes('dev') || normalized.includes('code')) {
    return TYPOGRAPHY_PAIRINGS[6]; // JetBrains Mono & Inter
  }
  if (normalized.includes('tech') || normalized.includes('saas') || normalized.includes('software')) {
    return TYPOGRAPHY_PAIRINGS[0]; // Space Grotesk & Inter
  }
  if (normalized.includes('luxury') || normalized.includes('fashion') || normalized.includes('goods') || normalized.includes('heritage')) {
    return TYPOGRAPHY_PAIRINGS[1]; // Playfair Display & Plus Jakarta Sans
  }
  if (normalized.includes('finance') || normalized.includes('crypto') || normalized.includes('fintech')) {
    return TYPOGRAPHY_PAIRINGS[8]; // Plus Jakarta Sans & Public Sans
  }
  if (normalized.includes('creative') || normalized.includes('agency') || normalized.includes('media')) {
    return TYPOGRAPHY_PAIRINGS[3]; // Syne & Archivo
  }
  if (normalized.includes('food') || normalized.includes('hospitality') || normalized.includes('hotel')) {
    return TYPOGRAPHY_PAIRINGS[7]; // Fraunces & Urbanist
  }
  if (normalized.includes('architect') || normalized.includes('real estate') || normalized.includes('design')) {
    return TYPOGRAPHY_PAIRINGS[11]; // Cabinet Grotesk & Satoshi
  }
  return TYPOGRAPHY_PAIRINGS[2]; // Outfit & Inter
}
