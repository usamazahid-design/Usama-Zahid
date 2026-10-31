export interface ExtractedColor {
  hex: string;
  rgb: [number, number, number];
  hsl: [number, number, number];
  cmyk: [number, number, number, number];
  role: 'primary' | 'secondary' | 'accent' | 'neutralDark' | 'neutralLight';
  roleLabel: string;
  name: string;
  population: number; // relative frequency in logo
  contrastOnWhite: number;
  contrastOnDark: number;
  wcagWhite: 'AAA' | 'AA' | 'AA Large' | 'Fail';
  wcagDark: 'AAA' | 'AA' | 'AA Large' | 'Fail';
  tints: string[]; // 10%, 30%, 50%, 70%, 90%
  shades: string[];
}

export interface ColorPalette {
  primary: ExtractedColor;
  secondary: ExtractedColor;
  accent: ExtractedColor;
  neutralDark: ExtractedColor;
  neutralLight: ExtractedColor;
  all: ExtractedColor[];
}

export interface ScalabilitySubTest {
  id: string;
  name: string;
  weight: number; // percentage (e.g. 25 = 25%)
  score: number; // 0 to 10
  status: 'excellent' | 'good' | 'warning' | 'critical';
  reason: string;
  details?: string;
  issueFix?: string;
}

export interface ScalabilityResult {
  overallScore: number; // 0 to 10 (1 decimal place)
  verdict: 'Scalable' | 'Scalable with a simplified small-size version' | 'Not scalable';
  tierLabel: 'Needs rework' | 'Fair' | 'Good' | 'Excellent';
  subTests: ScalabilitySubTest[];
  issues: string[];
  recommendations: string[];
  hasTransparency: boolean;
  isSvg: boolean;
  detectedColorsCount: number;
  hasGradients: boolean;
  aspectRatio: number;
  boundingWidth: number;
  boundingHeight: number;
  thinStrokeDetected: boolean;
  diagnostics?: {
    normalizedDataUrl: string;
    pixel16DataUrl: string;
    pixel32DataUrl: string;
    monochromeDataUrl: string;
    edgeMapDataUrl: string;
    edgeDensityPct: number;
  };
}

export interface TypographyPairing {
  id: string;
  name: string;
  headingFont: string;
  bodyFont: string;
  headingWeights: number[];
  bodyWeights: number[];
  category: string;
  moodTags: string[];
  description: string;
  googleFontsUrl: string;
}

export interface LogoVariants {
  original: string;
  forLightBg: string;
  forDarkBg: string;
  whiteMono: string;
  blackMono: string;
  isPredominantlyDark: boolean;
  isPredominantlyLight: boolean;
}

export interface BrandKitState {
  logoDataUrl: string;
  logoVariants?: LogoVariants;
  logoSvgString?: string;
  fileName: string;
  fileSize: number;
  isSvg: boolean;
  brandName: string;
  industry: string;
  tagline: string;
  palette: ColorPalette | null;
  scalability: ScalabilityResult | null;
  selectedFontPair: TypographyPairing | null;
  activeTab: 'scalability' | 'colors' | 'typography' | 'guidelines' | 'mockups' | 'card' | 'export';
  isAnalyzing: boolean;
  aiCopy?: {
    voiceWords: string[];
    brandStory: string;
    mission: string;
    taglines: string[];
    fontPairId: string;
    colorNames: string[];
    logoUsageNotes: string;
    dosAndDonts: { do: string; dont: string }[];
  };
}
