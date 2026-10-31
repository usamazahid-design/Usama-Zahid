export interface BrandVoicePreset {
  voiceWords: string[];
  brandStory: string;
  mission: string;
  taglines: string[];
  fontPairId: string;
  colorNames: string[];
  logoUsageNotes: string;
  dosAndDonts: { do: string; dont: string }[];
}

export function getDefaultBrandPreset(brandName: string, industry: string): BrandVoicePreset {
  const norm = industry.toLowerCase();

  if (norm.includes('tech') || norm.includes('saas') || norm.includes('software')) {
    return {
      voiceWords: ['Precise', 'Systematic', 'High-Velocity', 'Intelligent', 'Restrained'],
      brandStory: `${brandName} was engineered to eliminate friction and bring unified clarity to digital infrastructure. Built by operators who prioritize reliability, speed, and uncompromising software craftsmanship.`,
      mission: `To empower high-growth engineering teams with intelligent systems that convert complex workflows into effortless, high-trust digital experiences.`,
      taglines: [
        'Complexity engineered into clarity.',
        'The operating system for modern scale.',
        'Precision systems. Zero compromise.',
      ],
      fontPairId: 'space-inter',
      colorNames: ['Deep Electric Indigo', 'Cyan Telemetry', 'Terminal Violet', 'Obsidian Graphite', 'Pure Alabaster'],
      logoUsageNotes: 'Maintain strict clear space around the geometric mark. Never apply decorative drop shadows or off-axis gradients.',
      dosAndDonts: [
        { do: 'Pair the mark with clean, monospaced metadata and generous negative space.', dont: 'Do not crowd the mark inside dense navigation bars without 24px clearance.' },
        { do: 'Use high-contrast monochrome variants on dark code terminals and IDEs.', dont: 'Do not use vibrant multi-color logos over busy dashboard charts.' },
        { do: 'Keep typography left-aligned with a strict 8pt baseline rhythm.', dont: 'Do not center-align long technical paragraphs or feature descriptions.' },
      ],
    };
  }

  if (norm.includes('luxury') || norm.includes('fashion') || norm.includes('goods')) {
    return {
      voiceWords: ['Editorial', 'Timeless', 'Artisanal', 'Discreet', 'Sculptural'],
      brandStory: `${brandName} embodies the pursuit of quiet luxury and deliberate material craft. Every proportion is considered, honoring heritage while creating a contemporary standard of beauty.`,
      mission: `To craft enduring physical and sensory objects that elevate daily rituals through exceptional materials and uncompromising design discipline.`,
      taglines: [
        'Curated form. Enduring elegance.',
        'Quiet luxury in every detail.',
        'Drawn with deliberate restraint.',
      ],
      fontPairId: 'playfair-jakarta',
      colorNames: ['Champagne Gold', 'Espresso Truffle', 'Warm Alabaster', 'Deep Obsidian', 'Linen Sand'],
      logoUsageNotes: 'Always reproduce with generous breathing room. Ideal for blind debossing, gold foil stamping, and tactile packaging.',
      dosAndDonts: [
        { do: 'Apply generous whitespace around the mark on editorial lookbooks and packaging.', dont: 'Do not scale the mark excessively large; restraint conveys prestige.' },
        { do: 'Use blind embossing or subtle warm foils on tactile unbleached paper.', dont: 'Do not use glossy or synthetic neon finishes.' },
        { do: 'Pair serif display headlines with subtle letterspaced metadata.', dont: 'Do not pair with chaotic, high-energy modern slang.' },
      ],
    };
  }

  if (norm.includes('finance') || norm.includes('fintech') || norm.includes('crypto')) {
    return {
      voiceWords: ['Institutional', 'Audited', 'Resilient', 'Transparent', 'Decisive'],
      brandStory: `${brandName} provides the financial bedrock for modern institutions and individuals. Combining rigorous security protocols with frictionless liquidity.`,
      mission: `To democratize global capital infrastructure by providing institutional-grade trust, real-time settlement, and radical operational transparency.`,
      taglines: [
        'Institutional trust. Digital agility.',
        'The new standard for sovereign capital.',
        'Security without operational friction.',
      ],
      fontPairId: 'plusjakarta-public',
      colorNames: ['Sovereign Navy', 'Emerald Liquidity', 'Cobalt Security', 'Midnight Charcoal', 'Crisp Canvas'],
      logoUsageNotes: 'Must maintain high contrast across both white transaction receipts and dark financial terminal screens.',
      dosAndDonts: [
        { do: 'Ensure contrast passes WCAG AAA standards across all financial tables.', dont: 'Do not use low-contrast pastel tones on critical numeric metrics.' },
        { do: 'Use the standalone monogram for security badges and micro-favicons.', dont: 'Do not squeeze the full corporate wordmark into small table cells.' },
        { do: 'Maintain structured data layouts with clear tabular figures.', dont: 'Do not use decorative handwriting or casual script fonts.' },
      ],
    };
  }

  // General fallback
  return {
    voiceWords: ['Modern', 'Cohesive', 'Thoughtful', 'Distinct', 'Purposeful'],
    brandStory: `${brandName} was established to solve essential human needs with integrity, craft, and distinct identity. Driven by a commitment to purposeful design that lasts.`,
    mission: `To deliver meaningful value and memorable interactions across every touchpoint, from physical product to digital software.`,
    taglines: [
      'Drawn as one cohesive system.',
      'Purpose in every detail.',
      'Distinct identity. Real impact.',
    ],
    fontPairId: 'outfit-inter',
    colorNames: ['Primary Brand Tone', 'Complementary Accent', 'Deep Charcoal', 'Soft Mist Canvas', 'Signal Highlight'],
    logoUsageNotes: 'Maintain the standard X-unit exclusion zone across all print collateral and screen applications.',
    dosAndDonts: [
      { do: 'Consistently apply the approved five-color brand palette across all touchpoints.', dont: 'Do not invent unapproved arbitrary gradient fills.' },
      { do: 'Lock the aspect ratio at 1:1 whenever resizing the mark.', dont: 'Never skew, tilt, or distort the logo geometry.' },
      { do: 'Follow the established typography scale for clear reading rhythm.', dont: 'Do not mix more than two distinct font families in any single collateral piece.' },
    ],
  };
}
