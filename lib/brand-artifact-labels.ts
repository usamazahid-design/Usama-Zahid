export type BrandArtifactLabel =
  | 'BRIEF'
  | 'DISCOVERY'
  | 'POSITIONING'
  | 'LOCKUP'
  | 'COLOR'
  | 'TYPE'
  | 'PATTERN'
  | 'SYSTEM'
  | 'PACKAGING'
  | 'GUIDELINES'
  | 'APPLICATION'
  | 'MOTION'
  | 'OUTCOMES'
  | 'ROADMAP';

/** Maps figure captions to branding artifact tags (not UI fidelity). */
export function resolveBrandArtifactLabel(
  caption: string,
  context: 'identity' | 'application' = 'identity'
): BrandArtifactLabel {
  if (context === 'application') return 'APPLICATION';

  const c = caption.toLowerCase();
  if (c.includes('logo') || c.includes('lockup') || c.includes('endorsement') || c.includes('mark')) {
    return 'LOCKUP';
  }
  if (c.includes('color') || c.includes('colour') || c.includes('palette') || c.includes('roast')) {
    return 'COLOR';
  }
  if (c.includes('type') || c.includes('typography')) return 'TYPE';
  if (c.includes('grid') || c.includes('pattern') || c.includes('wayfinding')) return 'PATTERN';
  if (c.includes('bag') || c.includes('packaging') || c.includes('architecture')) return 'PACKAGING';
  if (c.includes('guideline') || c.includes('standards')) return 'GUIDELINES';
  if (c.includes('range') || c.includes('overview') || c.includes('system')) return 'SYSTEM';
  return 'SYSTEM';
}

export const brandArtifactTone: Record<BrandArtifactLabel, string> = {
  BRIEF: 'border-uz-slate text-uz-slate',
  DISCOVERY: 'border-uz-silver text-uz-silver',
  POSITIONING: 'border-uz-silver text-uz-silver',
  LOCKUP: 'border-uz-white text-uz-white',
  COLOR: 'border-uz-white text-uz-white',
  TYPE: 'border-uz-white text-uz-white',
  PATTERN: 'border-uz-white text-uz-white',
  SYSTEM: 'border-uz-indigo text-uz-indigo',
  PACKAGING: 'border-uz-indigo text-uz-indigo',
  GUIDELINES: 'border-uz-indigo text-uz-indigo',
  APPLICATION: 'border-uz-indigo text-uz-indigo',
  MOTION: 'border-uz-white text-uz-white',
  OUTCOMES: 'border-uz-indigo text-uz-indigo',
  ROADMAP: 'border-uz-slate text-uz-slate',
};
