import { ExtractedColor, ColorPalette, LogoVariants } from './types';

// Convert RGB to HEX
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// Convert HEX to RGB
export function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '').trim();
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean.padEnd(6, '0').slice(0, 6);
  const num = parseInt(full, 16);
  if (Number.isNaN(num)) return [75, 63, 255];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

// Convert RGB to HSL
export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// Convert HSL to RGB
export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = ((h % 360) + 360) % 360;
  h /= 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const hueToRgb = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  return [
    Math.round(hueToRgb(h + 1 / 3) * 255),
    Math.round(hueToRgb(h) * 255),
    Math.round(hueToRgb(h - 1 / 3) * 255),
  ];
}

// Convert RGB to CMYK (0 to 100%)
export function rgbToCmyk(r: number, g: number, b: number): [number, number, number, number] {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const k = 1 - Math.max(rNorm, gNorm, bNorm);
  if (k >= 0.999) return [0, 0, 0, 100];

  const c = Math.round(((1 - rNorm - k) / (1 - k)) * 100);
  const m = Math.round(((1 - gNorm - k) / (1 - k)) * 100);
  const y = Math.round(((1 - bNorm - k) / (1 - k)) * 100);
  const kPercent = Math.round(k * 100);

  return [c, m, y, kPercent];
}

// Perceptual color distance (Redmean weighted Delta-E approximation, range ~0-765)
export function perceptualColorDistance(
  rgb1: [number, number, number],
  rgb2: [number, number, number]
): number {
  const rmean = (rgb1[0] + rgb2[0]) / 2;
  const dr = rgb1[0] - rgb2[0];
  const dg = rgb1[1] - rgb2[1];
  const db = rgb1[2] - rgb2[2];
  return Math.sqrt(
    (2 + rmean / 256) * dr * dr +
      4 * dg * dg +
      (2 + (255 - rmean) / 256) * db * db
  );
}

// Calculate relative luminance for WCAG 2.1
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const transform = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
}

// Calculate WCAG contrast ratio between two colors
export function getContrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const lum1 = getRelativeLuminance(...rgb1);
  const lum2 = getRelativeLuminance(...rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}

// Determine WCAG tier
function getWcagTier(ratio: number): 'AAA' | 'AA' | 'AA Large' | 'Fail' {
  if (ratio >= 7.0) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3.0) return 'AA Large';
  return 'Fail';
}

// Generate 5-step tints (perceptually smooth HSL + RGB interpolation toward white)
export function generateTints(r: number, g: number, b: number): string[] {
  const steps = [0.16, 0.34, 0.52, 0.72, 0.88];
  return steps.map((pct) => {
    const nr = Math.round(r + (255 - r) * pct);
    const ng = Math.round(g + (255 - g) * pct);
    const nb = Math.round(b + (255 - b) * pct);
    return rgbToHex(nr, ng, nb);
  });
}

// Generate 5-step shades (smooth interpolation toward rich obsidian)
export function generateShades(r: number, g: number, b: number): string[] {
  const steps = [0.16, 0.34, 0.52, 0.70, 0.85];
  return steps.map((pct) => {
    const nr = Math.round(r * (1 - pct));
    const ng = Math.round(g * (1 - pct));
    const nb = Math.round(b * (1 - pct));
    return rgbToHex(nr, ng, nb);
  });
}

// Curated Pantone/Editorial Reference Swatches for Designer Naming
const DESIGNER_SWATCHES: { hex: string; name: string }[] = [
  { hex: '#4B3FFF', name: 'Electric Indigo' },
  { hex: '#3B82F6', name: 'Cobalt Signal' },
  { hex: '#1D4ED8', name: 'Ultramarine Klein' },
  { hex: '#0F172A', name: 'Sovereign Navy' },
  { hex: '#00C7CE', name: 'Cyber Teal' },
  { hex: '#06B6D4', name: 'Cerulean Cyan' },
  { hex: '#10B981', name: 'Emerald Mint' },
  { hex: '#059669', name: 'Veridian Forest' },
  { hex: '#14532D', name: 'Botanical Pine' },
  { hex: '#84CC16', name: 'Chartreuse Pulse' },
  { hex: '#FFDE00', name: 'Solar Canary' },
  { hex: '#F59E0B', name: 'Saffron Amber' },
  { hex: '#D4AF37', name: 'Imperial Gold' },
  { hex: '#BFA76F', name: 'Champagne Brass' },
  { hex: '#8C7335', name: 'Antique Bronze' },
  { hex: '#F97316', name: 'Tangerine Flare' },
  { hex: '#EA580C', name: 'Terracotta Rust' },
  { hex: '#EF4444', name: 'Vermilion Red' },
  { hex: '#DC2626', name: 'Crimson Cardinal' },
  { hex: '#991B1B', name: 'Oxblood Garnet' },
  { hex: '#EC4899', name: 'Magenta Rose' },
  { hex: '#8B5CF6', name: 'Electric Violet' },
  { hex: '#6D28D9', name: 'Amethyst Royal' },
  { hex: '#2E1065', name: 'Midnight Aubergine' },
  { hex: '#1C1A17', name: 'Espresso Obsidian' },
  { hex: '#0E0725', name: 'Cosmic Abyss' },
  { hex: '#0E0E10', name: 'Carbon Obsidian' },
  { hex: '#18181B', name: 'Graphite Basalt' },
  { hex: '#3F3F46', name: 'Architectural Slate' },
  { hex: '#71717A', name: 'Titanium Pewter' },
  { hex: '#D4D4D8', name: 'Brushed Silver' },
  { hex: '#F4F4F5', name: 'Alabaster Mist' },
  { hex: '#FAF8F5', name: 'Warm Cotton' },
  { hex: '#FFFFFF', name: 'Pure Chalk' },
];

// Descriptive color name generator based on nearest curated swatch + HSL fallback
export function getColorName(hex: string): string {
  const targetRgb = hexToRgb(hex);

  let bestName = '';
  let minDistance = Infinity;

  for (const s of DESIGNER_SWATCHES) {
    const sRgb = hexToRgb(s.hex);
    const dist = perceptualColorDistance(targetRgb, sRgb);
    if (dist < minDistance) {
      minDistance = dist;
      bestName = s.name;
    }
  }

  // If reasonably close to a named designer swatch, return it
  if (minDistance < 85 && bestName) {
    return bestName;
  }

  const [r, g, b] = targetRgb;
  const [h, s, l] = rgbToHsl(r, g, b);

  if (s < 10) {
    if (l > 95) return 'Pure Chalk';
    if (l > 85) return 'Alabaster Fog';
    if (l > 60) return 'Silver Pewter';
    if (l > 35) return 'Architectural Slate';
    if (l > 15) return 'Graphite Basalt';
    return 'Carbon Obsidian';
  }

  let hueName = 'Cobalt';
  if (h >= 345 || h < 14) hueName = 'Vermilion';
  else if (h < 42) hueName = 'Tangerine';
  else if (h < 68) hueName = 'Saffron';
  else if (h < 150) hueName = 'Emerald';
  else if (h < 192) hueName = 'Teal';
  else if (h < 222) hueName = 'Cerulean';
  else if (h < 262) hueName = 'Indigo';
  else if (h < 295) hueName = 'Violet';
  else if (h < 328) hueName = 'Magenta';
  else hueName = 'Crimson Rose';

  let tone = 'Vivid';
  if (l < 22) tone = 'Midnight';
  else if (l < 42) tone = 'Deep';
  else if (l > 78) tone = 'Soft';
  else if (s < 38) tone = 'Muted';

  return `${tone} ${hueName}`;
}

export function buildExtractedColor(
  hex: string,
  role: ExtractedColor['role'],
  roleLabel: string,
  population = 1.0,
  customName?: string
): ExtractedColor {
  const cleanHex = rgbToHex(...hexToRgb(hex));
  const rgb = hexToRgb(cleanHex);
  const hsl = rgbToHsl(...rgb);
  const cmyk = rgbToCmyk(...rgb);

  const whiteRgb: [number, number, number] = [255, 255, 255];
  const darkRgb: [number, number, number] = [14, 14, 16];

  const contrastOnWhite = getContrastRatio(rgb, whiteRgb);
  const contrastOnDark = getContrastRatio(rgb, darkRgb);

  return {
    hex: cleanHex,
    rgb,
    hsl,
    cmyk,
    role,
    roleLabel,
    name: customName || getColorName(cleanHex),
    population,
    contrastOnWhite,
    contrastOnDark,
    wcagWhite: getWcagTier(contrastOnWhite),
    wcagDark: getWcagTier(contrastOnDark),
    tints: generateTints(...rgb),
    shades: generateShades(...rgb),
  };
}

/**
 * Pro-grade client-side Color Quantizer:
 * 1. Filters out anti-aliased edge transition pixels so exact flat brand hexes are preserved.
 * 2. Detects background container plates vs foreground focal geometry.
 * 3. Clusters using Redmean perceptual distance while returning the exact mode HEX of each cluster.
 */
export async function extractDominantColorsFromImage(
  imageElementOrCanvas: HTMLImageElement | HTMLCanvasElement,
  maxColors = 8
): Promise<string[]> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return ['#4B3FFF', '#FFDE00', '#00C7CE', '#0E0E10', '#FAF8F5'];

  // Sample at 160x160 to preserve crisp interior details (stars, dots, badges)
  const targetSize = 160;
  let w = (imageElementOrCanvas as HTMLImageElement).naturalWidth || imageElementOrCanvas.width || 300;
  let h = (imageElementOrCanvas as HTMLImageElement).naturalHeight || imageElementOrCanvas.height || 300;
  if (w > targetSize || h > targetSize) {
    if (w > h) {
      h = Math.max(1, Math.round((h / w) * targetSize));
      w = targetSize;
    } else {
      w = Math.max(1, Math.round((w / h) * targetSize));
      h = targetSize;
    }
  }

  canvas.width = w;
  canvas.height = h;
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(imageElementOrCanvas, 0, 0, w, h);

  const imgData = ctx.getImageData(0, 0, w, h).data;

  // Step 1: Detect if there is a solid/near-white JPEG background around the outer perimeter
  let whiteBorderPixels = 0;
  let totalBorderPixels = 0;
  for (let x = 0; x < w; x++) {
    for (const y of [0, 1, h - 2, h - 1]) {
      if (y < 0 || y >= h) continue;
      const idx = (y * w + x) * 4;
      totalBorderPixels++;
      if (imgData[idx + 3] > 200 && imgData[idx] > 240 && imgData[idx + 1] > 240 && imgData[idx + 2] > 240) {
        whiteBorderPixels++;
      }
    }
  }
  const hasWhitePaperBg = totalBorderPixels > 0 && whiteBorderPixels / totalBorderPixels > 0.6;

  // Step 2: Collect interior solid pixels (skipping anti-aliased boundary pixels where neighbors differ wildly)
  interface ColorCluster {
    r: number;
    g: number;
    b: number;
    count: number;
    exactCounts: Map<string, { r: number; g: number; b: number; c: number }>;
  }

  const buckets = new Map<string, ColorCluster>();

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = (y * w + x) * 4;
      const a = imgData[i + 3];
      if (a < 210) continue; // Ignore transparent and semi-transparent anti-aliasing fringe

      const r = imgData[i];
      const g = imgData[i + 1];
      const b = imgData[i + 2];

      if (hasWhitePaperBg && r > 244 && g > 244 && b > 244) continue;

      // Check 4-neighborhood gradient to downweight anti-aliased edge pixels
      const rightIdx = i + 4;
      const downIdx = i + w * 4;
      const diffRight =
        Math.abs(r - imgData[rightIdx]) +
        Math.abs(g - imgData[rightIdx + 1]) +
        Math.abs(b - imgData[rightIdx + 2]);
      const diffDown =
        Math.abs(r - imgData[downIdx]) +
        Math.abs(g - imgData[downIdx + 1]) +
        Math.abs(b - imgData[downIdx + 2]);

      const isSmoothCore = diffRight < 24 && diffDown < 24;
      const weight = isSmoothCore ? 3 : 1; // Core flat pixels get 3x weight over anti-aliased edge pixels

      // Coarse key (step of 6) for initial grouping, while tracking exact RGB mode inside
      const qr = Math.round(r / 6) * 6;
      const qg = Math.round(g / 6) * 6;
      const qb = Math.round(b / 6) * 6;
      const key = `${qr},${qg},${qb}`;
      const exactKey = `${r},${g},${b}`;

      let cluster = buckets.get(key);
      if (!cluster) {
        cluster = { r, g, b, count: 0, exactCounts: new Map() };
        buckets.set(key, cluster);
      }
      cluster.count += weight;
      const ex = cluster.exactCounts.get(exactKey);
      if (ex) {
        ex.c += weight;
      } else {
        cluster.exactCounts.set(exactKey, { r, g, b, c: weight });
      }
    }
  }

  if (buckets.size === 0) {
    return ['#4B3FFF', '#00C7CE', '#FFDE00', '#0E0E10', '#FAF8F5'];
  }

  // Resolve each bucket to its exact mode RGB (most frequent exact pixel value)
  const resolvedClusters = Array.from(buckets.values()).map((cluster) => {
    let bestExact = { r: cluster.r, g: cluster.g, b: cluster.b, c: 0 };
    cluster.exactCounts.forEach((val) => {
      if (val.c > bestExact.c) bestExact = val;
    });
    const hsl = rgbToHsl(bestExact.r, bestExact.g, bestExact.b);
    return {
      r: bestExact.r,
      g: bestExact.g,
      b: bestExact.b,
      count: cluster.count,
      h: hsl[0],
      s: hsl[1],
      l: hsl[2],
    };
  });

  // Sort by a combination of frequency and chromatic salience so small high-impact accents (like the yellow dot in Apex or gold filigree in St. Claire) are never lost
  resolvedClusters.sort((a, b) => {
    const chromaBoostA = a.s > 35 && a.l > 15 && a.l < 90 ? 1.35 : 1.0;
    const chromaBoostB = b.s > 35 && b.l > 15 && b.l < 90 ? 1.35 : 1.0;
    return b.count * chromaBoostB - a.count * chromaBoostA;
  });

  // Merge perceptually similar clusters (Redmean distance > 58)
  const distinct: typeof resolvedClusters = [];
  for (const item of resolvedClusters) {
    const isDistinct = distinct.every(
      (picked) => perceptualColorDistance([picked.r, picked.g, picked.b], [item.r, item.g, item.b]) > 58
    );
    if (isDistinct) {
      distinct.push(item);
      if (distinct.length >= maxColors) break;
    }
  }

  return distinct.map((c) => rgbToHex(c.r, c.g, c.b));
}

/**
 * Creates a cohesive 5-role design system palette from raw extracted HEX colors.
 * Intelligently separates chromatic brand colors (Primary, Secondary, Accent)
 * from structural dark/light neutrals so dark container plates don't swallow the primary brand color.
 */
export function buildBrandPalette(extractedHexes: string[]): ColorPalette {
  const unique = Array.from(new Set(extractedHexes)).filter(Boolean);

  const analyzed = unique.map((hex, idx) => {
    const rgb = hexToRgb(hex);
    const [h, s, l] = rgbToHsl(...rgb);
    const isVeryDark = l <= 16;
    const isVeryLight = l >= 90;
    const isChromatic = s >= 22 && l > 14 && l < 92;
    return { hex, rgb, h, s, l, isVeryDark, isVeryLight, isChromatic, idx };
  });

  const chromaticCandidates = analyzed.filter((c) => c.isChromatic);
  const darkCandidates = analyzed.filter((c) => c.isVeryDark);
  const lightCandidates = analyzed.filter((c) => c.isVeryLight);

  // 1. Primary Brand Color: Pick the dominant chromatic color if available; otherwise the first extracted color
  const primaryChoice = chromaticCandidates[0] || analyzed[0] || {
    hex: '#4B3FFF',
    rgb: [75, 63, 255] as [number, number, number],
    h: 244,
    s: 100,
    l: 62,
  };
  const primaryHex = primaryChoice.hex;
  const [ph, ps, pl] = [primaryChoice.h, primaryChoice.s, primaryChoice.l];

  // 2. Secondary Brand Color: Pick the second distinct chromatic or mid-tone color, or derive an analogous/deep companion
  const remainingForSecondary = analyzed.filter(
    (c) =>
      c.hex !== primaryHex &&
      !c.isVeryLight &&
      perceptualColorDistance(c.rgb, primaryChoice.rgb) > 65
  );
  let secondaryHex = remainingForSecondary.find((c) => c.isChromatic)?.hex || remainingForSecondary[0]?.hex;

  if (!secondaryHex) {
    const secH = (ph + 32) % 360;
    const secS = Math.max(35, Math.min(ps, 78));
    const secL = pl > 45 ? Math.max(22, pl - 24) : Math.min(72, pl + 24);
    secondaryHex = rgbToHex(...hslToRgb(secH, secS, secL));
  }

  // 3. Accent & Interactive Color: Pick a third high-contrast chromatic color or synthesize a vibrant split-complementary accent
  const secRgb = hexToRgb(secondaryHex);
  const remainingForAccent = chromaticCandidates.filter(
    (c) =>
      c.hex !== primaryHex &&
      c.hex !== secondaryHex &&
      perceptualColorDistance(c.rgb, primaryChoice.rgb) > 75 &&
      perceptualColorDistance(c.rgb, secRgb) > 65
  );
  let accentHex = remainingForAccent[0]?.hex;

  if (!accentHex) {
    const accH = (ph + 155) % 360;
    const accS = Math.max(ps, 82);
    const accL = pl > 60 ? 46 : 58;
    accentHex = rgbToHex(...hslToRgb(accH, accS, accL));
  }

  // 4. Neutral Dark: Use extracted dark background/ink if present, otherwise a rich hue-tinted obsidian
  const neutralDarkHex =
    darkCandidates[0]?.hex ||
    rgbToHex(...hslToRgb(ph, Math.min(ps, 24), 8));

  // 5. Neutral Light: Use extracted warm/light tone or crisp hue-tinted alabaster
  const neutralLightHex =
    lightCandidates.find((c) => c.l >= 93)?.hex ||
    rgbToHex(...hslToRgb(ph, Math.min(ps, 14), 97));

  const primary = buildExtractedColor(primaryHex, 'primary', 'Primary Brand', 0.48);
  const secondary = buildExtractedColor(secondaryHex, 'secondary', 'Secondary System', 0.24);
  const accent = buildExtractedColor(accentHex, 'accent', 'Interactive Accent', 0.16);
  const neutralDark = buildExtractedColor(neutralDarkHex, 'neutralDark', 'Obsidian Ink', 0.08);
  const neutralLight = buildExtractedColor(neutralLightHex, 'neutralLight', 'Surface Canvas', 0.04);

  return {
    primary,
    secondary,
    accent,
    neutralDark,
    neutralLight,
    all: [primary, secondary, accent, neutralDark, neutralLight],
  };
}

/**
 * Rebuilds a ColorPalette when a user customizes a single role's HEX code in the studio
 */
export function updatePaletteRoleHex(
  currentPalette: ColorPalette,
  role: ExtractedColor['role'],
  newHex: string
): ColorPalette {
  const roleLabels: Record<ExtractedColor['role'], string> = {
    primary: 'Primary Brand',
    secondary: 'Secondary System',
    accent: 'Interactive Accent',
    neutralDark: 'Obsidian Ink',
    neutralLight: 'Surface Canvas',
  };

  const updatedColor = buildExtractedColor(
    newHex,
    role,
    roleLabels[role],
    currentPalette[role].population
  );

  const next = {
    ...currentPalette,
    [role]: updatedColor,
  };
  next.all = [next.primary, next.secondary, next.accent, next.neutralDark, next.neutralLight];
  return next;
}

/**
 * Generates trimmed, high-DPI adaptive logo variants for light backgrounds, dark backgrounds,
 * and pure white/black monochrome stamps.
 * Fixes dark SVGs disappearing on dark surfaces/mockups and light SVGs disappearing on light surfaces.
 */
export function buildAdaptiveLogoVariants(
  img: HTMLImageElement | HTMLCanvasElement,
  originalDataUrl: string
): LogoVariants {
  const sw = (img as HTMLImageElement).naturalWidth || img.width || 512;
  const sh = (img as HTMLImageElement).naturalHeight || img.height || 512;

  // Render at high resolution (max 800px) to preserve crisp vector edges
  const maxDim = 800;
  const scale = Math.min(1, maxDim / Math.max(sw, sh, 1));
  const w = Math.max(64, Math.round(sw * scale));
  const h = Math.max(64, Math.round(sh * scale));

  const srcCanvas = document.createElement('canvas');
  srcCanvas.width = w;
  srcCanvas.height = h;
  const sCtx = srcCanvas.getContext('2d', { willReadFrequently: true });
  if (!sCtx) {
    return {
      original: originalDataUrl,
      forLightBg: originalDataUrl,
      forDarkBg: originalDataUrl,
      whiteMono: originalDataUrl,
      blackMono: originalDataUrl,
      isPredominantlyDark: false,
      isPredominantlyLight: false,
    };
  }

  sCtx.drawImage(img, 0, 0, w, h);
  const srcImgData = sCtx.getImageData(0, 0, w, h);
  const d = srcImgData.data;

  // 1. Check if 4 corners are opaque white/near-white (typical of JPEG uploads) and key out white paper
  const corners = [0, (w - 1) * 4, (h - 1) * w * 4, ((h - 1) * w + (w - 1)) * 4];
  let whiteCorners = 0;
  for (const idx of corners) {
    if (d[idx + 3] > 210 && d[idx] > 240 && d[idx + 1] > 240 && d[idx + 2] > 240) {
      whiteCorners++;
    }
  }
  if (whiteCorners >= 3) {
    for (let i = 0; i < d.length; i += 4) {
      const minC = Math.min(d[i], d[i + 1], d[i + 2]);
      if (minC > 236) {
        const factor = (minC - 236) / (255 - 236);
        d[i + 3] = Math.round(d[i + 3] * (1 - factor));
      }
    }
    sCtx.putImageData(srcImgData, 0, 0);
  }

  // 2. Find tight bounding box of visible pixels (alpha > 15) so SVGs with huge padding are properly framed
  let minX = w;
  let minY = h;
  let maxX = 0;
  let maxY = 0;
  let activeCount = 0;
  let darkPixels = 0;
  let lightPixels = 0;
  let lumSum = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const a = d[i + 3];
      if (a > 20) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;

        activeCount++;
        const lum = getRelativeLuminance(d[i], d[i + 1], d[i + 2]);
        lumSum += lum;
        if (lum < 0.22) darkPixels++;
        if (lum > 0.72) lightPixels++;
      }
    }
  }

  if (minX > maxX || minY > maxY) {
    minX = 0;
    minY = 0;
    maxX = w - 1;
    maxY = h - 1;
  }

  const cropW = Math.max(1, maxX - minX + 1);
  const cropH = Math.max(1, maxY - minY + 1);
  // Add a subtle 4% optical breathing margin around the cropped mark
  const padX = Math.round(cropW * 0.04);
  const padY = Math.round(cropH * 0.04);
  const finalW = cropW + padX * 2;
  const finalH = cropH + padY * 2;

  const baseCanvas = document.createElement('canvas');
  baseCanvas.width = finalW;
  baseCanvas.height = finalH;
  const bCtx = baseCanvas.getContext('2d', { willReadFrequently: true })!;
  bCtx.drawImage(srcCanvas, minX, minY, cropW, cropH, padX, padY, cropW, cropH);

  const baseData = bCtx.getImageData(0, 0, finalW, finalH);
  const bd = baseData.data;

  const bboxArea = cropW * cropH;
  const fillRatio = bboxArea > 0 ? activeCount / bboxArea : 0.5;
  const darkRatio = activeCount > 0 ? darkPixels / activeCount : 0;
  const lightRatio = activeCount > 0 ? lightPixels / activeCount : 0;
  const avgLum = activeCount > 0 ? lumSum / activeCount : 0.5;

  // Is this a solid filled badge/container (like a dark rounded square/circle with bright art inside)?
  const hasBrightInterior = lightRatio > 0.06 || avgLum > 0.26;
  const isSolidBadgeWithInterior = fillRatio > 0.68 && hasBrightInterior && darkRatio < 0.90;

  const isPredominantlyDark = darkRatio > 0.65 && !isSolidBadgeWithInterior;
  const isPredominantlyLight = lightRatio > 0.65;

  // 3. Build forDarkBg (converts dark strokes/shapes/text to crisp white while preserving bright chromatic accents)
  const darkBgCanvas = document.createElement('canvas');
  darkBgCanvas.width = finalW;
  darkBgCanvas.height = finalH;
  const dCtx = darkBgCanvas.getContext('2d')!;
  const darkBgImg = dCtx.createImageData(finalW, finalH);
  const dd = darkBgImg.data;

  for (let i = 0; i < bd.length; i += 4) {
    const r = bd[i];
    const g = bd[i + 1];
    const b = bd[i + 2];
    const a = bd[i + 3];

    if (a < 8) {
      dd[i + 3] = 0;
      continue;
    }

    if (isSolidBadgeWithInterior) {
      // Solid badge with bright interior graphics: keep as-is
      dd[i] = r;
      dd[i + 1] = g;
      dd[i + 2] = b;
      dd[i + 3] = a;
    } else {
      const [h, s, l] = rgbToHsl(r, g, b);
      const lum = getRelativeLuminance(r, g, b);

      if (isPredominantlyDark) {
        // Entire mark is dark (e.g. black, charcoal, or dark navy SVG):
        // Invert luminance cleanly to crisp white/light so it pops on dark surfaces
        if (s < 32 || l < 25) {
          const lift = Math.round(255 - lum * 180);
          dd[i] = lift;
          dd[i + 1] = lift;
          dd[i + 2] = lift;
          dd[i + 3] = a;
        } else {
          // Dark chromatic mark -> lift lightness to vibrant pastel/bright tone (L=78%)
          const [lr, lg, lb] = hslToRgb(h, Math.min(100, s + 10), Math.max(76, 100 - l));
          dd[i] = lr;
          dd[i + 1] = lg;
          dd[i + 2] = lb;
          dd[i + 3] = a;
        }
      } else if (lum < 0.18 && s < 35) {
        // Combination mark (colored icon + black/dark wordmark): turn the black wordmark white!
        const lift = Math.round(255 - lum * 160);
        dd[i] = lift;
        dd[i + 1] = lift;
        dd[i + 2] = lift;
        dd[i + 3] = a;
      } else if (lum < 0.18 && s >= 35) {
        // Very dark chromatic element -> brighten so it's visible on dark bg
        const [lr, lg, lb] = hslToRgb(h, s, Math.max(66, l + 42));
        dd[i] = lr;
        dd[i + 1] = lg;
        dd[i + 2] = lb;
        dd[i + 3] = a;
      } else {
        dd[i] = r;
        dd[i + 1] = g;
        dd[i + 2] = b;
        dd[i + 3] = a;
      }
    }
  }
  dCtx.putImageData(darkBgImg, 0, 0);

  // 4. Build forLightBg (converts white/very-light transparent marks to dark charcoal ink on light paper)
  const lightBgCanvas = document.createElement('canvas');
  lightBgCanvas.width = finalW;
  lightBgCanvas.height = finalH;
  const lCtx = lightBgCanvas.getContext('2d')!;
  const lightBgImg = lCtx.createImageData(finalW, finalH);
  const ld = lightBgImg.data;

  for (let i = 0; i < bd.length; i += 4) {
    const r = bd[i];
    const g = bd[i + 1];
    const b = bd[i + 2];
    const a = bd[i + 3];

    if (a < 8) {
      ld[i + 3] = 0;
      continue;
    }

    if (isPredominantlyLight && fillRatio < 0.75) {
      const [h, s, l] = rgbToHsl(r, g, b);
      if (s < 25) {
        // White/silver mark -> convert to rich charcoal #141519
        const ink = Math.max(18, Math.round((100 - l) * 2.2 + 18));
        ld[i] = ink;
        ld[i + 1] = ink + 1;
        ld[i + 2] = ink + 4;
        ld[i + 3] = a;
      } else {
        // Light pastel chromatic -> deepen lightness for white paper contrast
        const [dr, dg, db] = hslToRgb(h, Math.min(100, s + 15), Math.min(42, l));
        ld[i] = dr;
        ld[i + 1] = dg;
        ld[i + 2] = db;
        ld[i + 3] = a;
      }
    } else {
      ld[i] = r;
      ld[i + 1] = g;
      ld[i + 2] = b;
      ld[i + 3] = a;
    }
  }
  lCtx.putImageData(lightBgImg, 0, 0);

  // 5. Build Pure White & Pure Black Monochrome Variants
  const whiteMonoCanvas = document.createElement('canvas');
  whiteMonoCanvas.width = finalW;
  whiteMonoCanvas.height = finalH;
  const wCtx = whiteMonoCanvas.getContext('2d')!;
  const whiteImg = wCtx.createImageData(finalW, finalH);
  const wd = whiteImg.data;

  const blackMonoCanvas = document.createElement('canvas');
  blackMonoCanvas.width = finalW;
  blackMonoCanvas.height = finalH;
  const kCtx = blackMonoCanvas.getContext('2d')!;
  const blackImg = kCtx.createImageData(finalW, finalH);
  const kd = blackImg.data;

  for (let i = 0; i < bd.length; i += 4) {
    const a = bd[i + 3];
    if (a < 10) continue;

    if (isSolidBadgeWithInterior) {
      // Preserve interior cutout contrast for solid badges
      const lum = getRelativeLuminance(bd[i], bd[i + 1], bd[i + 2]);
      const isDetail = Math.abs(lum - avgLum) > 0.14;
      const modAlpha = isDetail ? a : Math.round(a * 0.28);
      wd[i] = 255;
      wd[i + 1] = 255;
      wd[i + 2] = 255;
      wd[i + 3] = modAlpha;

      kd[i] = 18;
      kd[i + 1] = 19;
      kd[i + 2] = 24;
      kd[i + 3] = modAlpha;
    } else {
      wd[i] = 255;
      wd[i + 1] = 255;
      wd[i + 2] = 255;
      wd[i + 3] = a;

      kd[i] = 18;
      kd[i + 1] = 19;
      kd[i + 2] = 24;
      kd[i + 3] = a;
    }
  }
  wCtx.putImageData(whiteImg, 0, 0);
  kCtx.putImageData(blackImg, 0, 0);

  return {
    original: baseCanvas.toDataURL('image/png'),
    forLightBg: lightBgCanvas.toDataURL('image/png'),
    forDarkBg: darkBgCanvas.toDataURL('image/png'),
    whiteMono: whiteMonoCanvas.toDataURL('image/png'),
    blackMono: blackMonoCanvas.toDataURL('image/png'),
    isPredominantlyDark,
    isPredominantlyLight,
  };
}

