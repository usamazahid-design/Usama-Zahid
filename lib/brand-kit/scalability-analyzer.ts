import { ScalabilityResult, ScalabilitySubTest } from './types';

export const SCALABILITY_CONFIG = {
  weights: {
    smallSizeLegibility: 0.25,
    fineDetailRisk: 0.20,
    colorComplexity: 0.15,
    oneColorSurvival: 0.15,
    backgroundVersatility: 0.10,
    shapeAndProportion: 0.10,
    sourceQuality: 0.05,
  },
  thresholds: {
    thinStrokeErosionRatio: 0.52,
    idealAspectMin: 0.75,
    idealAspectMax: 1.35,
    maxColorsForFlat: 3,
  },
};

/**
 * Normalizes any logo onto a fixed 256x256 canvas by trimming transparent or uniform-paper padding
 * and centering it with a 20px safe margin (216x216 active box).
 */
export function normalizeLogoCanvas(
  img: HTMLImageElement | HTMLCanvasElement
): {
  canvas: HTMLCanvasElement;
  bbox: { width: number; height: number; aspect: number };
  hasAlpha: boolean;
} {
  const srcCanvas = document.createElement('canvas');
  const sw = (img as HTMLImageElement).naturalWidth || img.width || 512;
  const sh = (img as HTMLImageElement).naturalHeight || img.height || 512;
  srcCanvas.width = sw;
  srcCanvas.height = sh;

  const sCtx = srcCanvas.getContext('2d', { willReadFrequently: true });
  if (!sCtx) {
    const dummy = document.createElement('canvas');
    dummy.width = 256;
    dummy.height = 256;
    return { canvas: dummy, bbox: { width: 256, height: 256, aspect: 1 }, hasAlpha: false };
  }

  sCtx.drawImage(img, 0, 0, sw, sh);
  const sData = sCtx.getImageData(0, 0, sw, sh).data;

  // Check if corners are solid white/near-white (e.g. JPEG upload)
  const corners = [
    0,
    (sw - 1) * 4,
    (sh - 1) * sw * 4,
    ((sh - 1) * sw + (sw - 1)) * 4,
  ];
  let whiteCornerCount = 0;
  for (const cIdx of corners) {
    if (sData[cIdx + 3] > 220 && sData[cIdx] > 242 && sData[cIdx + 1] > 242 && sData[cIdx + 2] > 242) {
      whiteCornerCount++;
    }
  }
  const trimWhiteBg = whiteCornerCount >= 3;

  let minX = sw;
  let minY = sh;
  let maxX = 0;
  let maxY = 0;
  let hasAlpha = false;

  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      const idx = (y * sw + x) * 4;
      const r = sData[idx];
      const g = sData[idx + 1];
      const b = sData[idx + 2];
      const a = sData[idx + 3];

      if (a < 240) hasAlpha = true;

      const isForeground =
        a > 24 && (!trimWhiteBg || r < 242 || g < 242 || b < 242);

      if (isForeground) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (minX > maxX || minY > maxY) {
    minX = 0;
    minY = 0;
    maxX = sw - 1;
    maxY = sh - 1;
  }

  const cropW = Math.max(1, maxX - minX + 1);
  const cropH = Math.max(1, maxY - minY + 1);
  const aspect = cropW / cropH;

  const normCanvas = document.createElement('canvas');
  normCanvas.width = 256;
  normCanvas.height = 256;
  const nCtx = normCanvas.getContext('2d', { willReadFrequently: true })!;

  const maxFit = 216;
  let drawW = maxFit;
  let drawH = maxFit;
  if (cropW > cropH) {
    drawH = Math.max(1, Math.round(maxFit / aspect));
  } else {
    drawW = Math.max(1, Math.round(maxFit * aspect));
  }

  const offsetX = Math.round((256 - drawW) / 2);
  const offsetY = Math.round((256 - drawH) / 2);

  nCtx.drawImage(srcCanvas, minX, minY, cropW, cropH, offsetX, offsetY, drawW, drawH);

  return {
    canvas: normCanvas,
    bbox: { width: cropW, height: cropH, aspect: Number(aspect.toFixed(2)) },
    hasAlpha,
  };
}

/**
 * Computes Sobel edge magnitude array (Float32Array of size W*H) considering both luminance and alpha transitions
 */
function computeSobelEdgeMap(imgData: ImageData): {
  magnitudes: Float32Array;
  edgePixelsCount: number;
  highFreqPixelsCount: number;
  activeAreaCount: number;
} {
  const w = imgData.width;
  const h = imgData.height;
  const d = imgData.data;
  const lum = new Float32Array(w * h);
  let activeAreaCount = 0;

  for (let i = 0; i < w * h; i++) {
    const idx = i * 4;
    const a = d[idx + 3] / 255;
    if (a > 0.1) activeAreaCount++;
    // Composite against mid-neutral so both dark-on-transparent and white-on-transparent edges register strongly
    const r = d[idx] * a + 128 * (1 - a);
    const g = d[idx + 1] * a + 128 * (1 - a);
    const b = d[idx + 2] * a + 128 * (1 - a);
    lum[i] = 0.299 * r + 0.587 * g + 0.114 * b;
  }

  const magnitudes = new Float32Array(w * h);
  let edgePixelsCount = 0;
  let highFreqPixelsCount = 0;

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = y * w + x;
      const gx =
        -lum[idx - w - 1] +
        lum[idx - w + 1] -
        2 * lum[idx - 1] +
        2 * lum[idx + 1] -
        lum[idx + w - 1] +
        lum[idx + w + 1];
      const gy =
        -lum[idx - w - 1] -
        2 * lum[idx - w] -
        lum[idx - w + 1] +
        lum[idx + w - 1] +
        2 * lum[idx + w] +
        lum[idx + w + 1];

      const mag = Math.min(255, Math.sqrt(gx * gx + gy * gy) / 2.2);
      magnitudes[idx] = mag;
      if (mag > 28) {
        edgePixelsCount++;
      }
    }
  }

  // Detect high-frequency crowded edges (where multiple distinct edges occur within a 3x3 window)
  for (let y = 2; y < h - 2; y++) {
    for (let x = 2; x < w - 2; x++) {
      const idx = y * w + x;
      if (magnitudes[idx] <= 28) continue;
      let neighborEdges = 0;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          if (magnitudes[(y + dy) * w + (x + dx)] > 42) {
            neighborEdges++;
          }
        }
      }
      // If a 5x5 neighborhood is packed with > 13 edge pixels, it's dense filigree / tiny text
      if (neighborEdges >= 13) {
        highFreqPixelsCount++;
      }
    }
  }

  return { magnitudes, edgePixelsCount, highFreqPixelsCount, activeAreaCount };
}

/**
 * Generates visual diagnostic data URLs for the Optical Lab UI
 */
function buildDiagnosticVisuals(normCanvas: HTMLCanvasElement): {
  normalizedDataUrl: string;
  pixel16DataUrl: string;
  pixel32DataUrl: string;
  monochromeDataUrl: string;
  edgeMapDataUrl: string;
  edgeDensityPct: number;
} {
  const normalizedDataUrl = normCanvas.toDataURL('image/png');

  // 1. 16x16 nearest-neighbor pixel grid simulation
  const makePixelPreview = (gridSize: number) => {
    const small = document.createElement('canvas');
    small.width = gridSize;
    small.height = gridSize;
    const sCtx = small.getContext('2d')!;
    sCtx.imageSmoothingEnabled = true;
    sCtx.imageSmoothingQuality = 'high';
    sCtx.drawImage(normCanvas, 0, 0, gridSize, gridSize);

    const out = document.createElement('canvas');
    out.width = 256;
    out.height = 256;
    const oCtx = out.getContext('2d')!;
    oCtx.imageSmoothingEnabled = false;
    oCtx.drawImage(small, 0, 0, 256, 256);

    // Draw subtle pixel grid lines for 16x16
    if (gridSize === 16) {
      oCtx.strokeStyle = 'rgba(128, 128, 140, 0.16)';
      oCtx.lineWidth = 1;
      const step = 256 / gridSize;
      for (let i = step; i < 256; i += step) {
        oCtx.beginPath();
        oCtx.moveTo(i, 0);
        oCtx.lineTo(i, 256);
        oCtx.stroke();
        oCtx.beginPath();
        oCtx.moveTo(0, i);
        oCtx.lineTo(256, i);
        oCtx.stroke();
      }
    }
    return out.toDataURL('image/png');
  };

  const pixel16DataUrl = makePixelPreview(16);
  const pixel32DataUrl = makePixelPreview(32);

  // 2. 1-Bit Otsu Adaptive Monochrome Stamp Preview
  const nCtx = normCanvas.getContext('2d', { willReadFrequently: true })!;
  const origImgData = nCtx.getImageData(0, 0, 256, 256);
  const d = origImgData.data;

  // Compute mean luminance of active pixels for adaptive threshold
  let lumSum = 0;
  let lumCount = 0;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] > 40) {
      lumSum += 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
      lumCount++;
    }
  }
  const meanLum = lumCount > 0 ? lumSum / lumCount : 128;

  const monoCanvas = document.createElement('canvas');
  monoCanvas.width = 256;
  monoCanvas.height = 256;
  const mCtx = monoCanvas.getContext('2d')!;
  const monoData = mCtx.createImageData(256, 256);
  const md = monoData.data;

  for (let i = 0; i < d.length; i += 4) {
    const a = d[i + 3];
    if (a < 45) {
      md[i] = 250;
      md[i + 1] = 248;
      md[i + 2] = 245;
      md[i + 3] = 0;
    } else {
      const lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
      // Separate internal foreground vs background container
      const isDarkInk = lum <= meanLum + 18;
      if (isDarkInk) {
        md[i] = 14;
        md[i + 1] = 14;
        md[i + 2] = 16;
        md[i + 3] = 255;
      } else {
        md[i] = 255;
        md[i + 1] = 255;
        md[i + 2] = 255;
        md[i + 3] = 255;
      }
    }
  }
  mCtx.putImageData(monoData, 0, 0);
  const monochromeDataUrl = monoCanvas.toDataURL('image/png');

  // 3. Sobel Edge & High-Frequency Stress Map
  const { magnitudes, edgePixelsCount, activeAreaCount } = computeSobelEdgeMap(origImgData);
  const edgeCanvas = document.createElement('canvas');
  edgeCanvas.width = 256;
  edgeCanvas.height = 256;
  const eCtx = edgeCanvas.getContext('2d')!;
  const edgeImg = eCtx.createImageData(256, 256);
  const ed = edgeImg.data;

  for (let y = 0; y < 256; y++) {
    for (let x = 0; x < 256; x++) {
      const idx = y * 256 + x;
      const pIdx = idx * 4;
      const mag = magnitudes[idx];
      if (mag > 24) {
        // Count local edge crowding in 5x5 window to color-code thin/crowded filigree vs clean geometry
        let crowd = 0;
        if (x >= 2 && x < 254 && y >= 2 && y < 254) {
          for (let dy = -2; dy <= 2; dy++) {
            for (let dx = -2; dx <= 2; dx++) {
              if (magnitudes[(y + dy) * 256 + (x + dx)] > 38) crowd++;
            }
          }
        }
        if (crowd >= 14) {
          // High-risk crowded fine detail -> Amber/Red highlight
          ed[pIdx] = 245;
          ed[pIdx + 1] = 158;
          ed[pIdx + 2] = 11;
          ed[pIdx + 3] = Math.min(255, Math.round(mag * 1.4));
        } else {
          // Clean structural edge -> Cyber Teal (#00C7CE)
          ed[pIdx] = 0;
          ed[pIdx + 1] = 199;
          ed[pIdx + 2] = 206;
          ed[pIdx + 3] = Math.min(255, Math.round(mag * 1.3));
        }
      } else {
        ed[pIdx] = 10;
        ed[pIdx + 1] = 11;
        ed[pIdx + 2] = 14;
        ed[pIdx + 3] = 255;
      }
    }
  }
  eCtx.putImageData(edgeImg, 0, 0);
  const edgeMapDataUrl = edgeCanvas.toDataURL('image/png');
  const edgeDensityPct =
    activeAreaCount > 0 ? Number(((edgePixelsCount / activeAreaCount) * 100).toFixed(1)) : 0;

  return {
    normalizedDataUrl,
    pixel16DataUrl,
    pixel32DataUrl,
    monochromeDataUrl,
    edgeMapDataUrl,
    edgeDensityPct,
  };
}

/**
 * Test 1: Small-size legibility (25%)
 * Evaluates both pixel fidelity AND interior edge survival across 16px, 32px, 48px, 64px.
 */
function testSmallSizeLegibility(normCanvas: HTMLCanvasElement): ScalabilitySubTest {
  const ctx = normCanvas.getContext('2d', { willReadFrequently: true })!;
  const origImgData = ctx.getImageData(0, 0, 256, 256);
  const origData = origImgData.data;
  const origSobel = computeSobelEdgeMap(origImgData);

  const testSizes = [16, 32, 48, 64];
  let totalDelta = 0;
  let edgeLoss16 = 0;

  for (const size of testSizes) {
    const downCanvas = document.createElement('canvas');
    downCanvas.width = size;
    downCanvas.height = size;
    const dCtx = downCanvas.getContext('2d')!;
    dCtx.imageSmoothingEnabled = true;
    dCtx.imageSmoothingQuality = 'high';
    dCtx.drawImage(normCanvas, 0, 0, size, size);

    const upCanvas = document.createElement('canvas');
    upCanvas.width = 256;
    upCanvas.height = 256;
    const uCtx = upCanvas.getContext('2d', { willReadFrequently: true })!;
    uCtx.imageSmoothingEnabled = true;
    uCtx.imageSmoothingQuality = 'high';
    uCtx.drawImage(downCanvas, 0, 0, 256, 256);

    const upImgData = uCtx.getImageData(0, 0, 256, 256);
    const upData = upImgData.data;
    let sizeError = 0;
    let activePixels = 0;

    for (let i = 0; i < origData.length; i += 4) {
      const origA = origData[i + 3];
      const upA = upData[i + 3];

      if (origA > 20 || upA > 20) {
        activePixels++;
        const aDiff = Math.abs(origA - upA) / 255;
        const cDiff =
          (Math.abs(origData[i] - upData[i]) +
            Math.abs(origData[i + 1] - upData[i + 1]) +
            Math.abs(origData[i + 2] - upData[i + 2])) /
          (255 * 3);
        sizeError += aDiff * 0.45 + cDiff * 0.55;
      }
    }

    if (size === 16) {
      const upSobel = computeSobelEdgeMap(upImgData);
      if (origSobel.edgePixelsCount > 0) {
        const survivingRatio = Math.min(1, upSobel.edgePixelsCount / origSobel.edgePixelsCount);
        edgeLoss16 = 1 - survivingRatio;
      }
    }

    const avgError = activePixels > 0 ? sizeError / activePixels : 0;
    totalDelta += avgError;
  }

  const meanError = totalDelta / testSizes.length;
  // Combine pixel error + high-frequency edge loss at 16px
  const combinedPenalty = meanError * 24 + edgeLoss16 * 4.2;
  const score = Math.max(1.5, Math.min(10, Number((10 - combinedPenalty).toFixed(1))));

  let status: ScalabilitySubTest['status'] = 'excellent';
  let reason = 'Retains crisp silhouette and interior counter separation down to 16×16px favicon scale.';
  let issueFix: string | undefined;

  if (score < 5.5) {
    status = 'critical';
    reason = 'Severe detail collapse and interior blurring below 48px; micro-elements vanish at 16px.';
    issueFix = 'Create a simplified optical monogram or symbol with bold strokes for < 32px placements.';
  } else if (score < 7.6) {
    status = 'warning';
    reason = 'Noticeable softening and partial counter fill-in at 16px and 32px.';
    issueFix = 'Widen negative-space apertures by at least 20% so counters stay open at favicon sizes.';
  } else if (score < 9.0) {
    status = 'good';
    reason = 'Legible down to 32px with only slight anti-aliasing softening at 16px.';
  }

  return {
    id: 'smallSizeLegibility',
    name: 'Small-Size Legibility (16–64px)',
    weight: 25,
    score,
    status,
    reason,
    issueFix,
  };
}

/**
 * Test 2: Fine-detail & Stroke Robustness (20%)
 * Combines 64px morphological erosion with interior Sobel edge-crowding analysis
 * so thin filigree and micro-typography inside solid badges are accurately caught.
 */
function testFineDetailRisk(
  normCanvas: HTMLCanvasElement
): ScalabilitySubTest & { thinStrokeDetected: boolean } {
  const nCtx = normCanvas.getContext('2d', { willReadFrequently: true })!;
  const origImgData = nCtx.getImageData(0, 0, 256, 256);
  const { edgePixelsCount, highFreqPixelsCount, activeAreaCount } = computeSobelEdgeMap(origImgData);

  // Also test 64x64 foreground feature mask erosion
  const size = 64;
  const canvas64 = document.createElement('canvas');
  canvas64.width = size;
  canvas64.height = size;
  const ctx = canvas64.getContext('2d', { willReadFrequently: true })!;
  ctx.drawImage(normCanvas, 0, 0, size, size);
  const data64 = ctx.getImageData(0, 0, size, size).data;

  // Identify dominant background/container color at 64x64 so interior strokes inside a badge are isolated
  const colorCounts = new Map<string, { r: number; g: number; b: number; count: number }>();
  for (let i = 0; i < data64.length; i += 4) {
    if (data64[i + 3] < 60) continue;
    const qr = Math.round(data64[i] / 16) * 16;
    const qg = Math.round(data64[i + 1] / 16) * 16;
    const qb = Math.round(data64[i + 2] / 16) * 16;
    const k = `${qr},${qg},${qb}`;
    const ex = colorCounts.get(k);
    if (ex) ex.count++;
    else colorCounts.set(k, { r: qr, g: qg, b: qb, count: 1 });
  }
  const sortedPlates = Array.from(colorCounts.values()).sort((a, b) => b.count - a.count);
  const dominantPlate = sortedPlates[0] || { r: 0, g: 0, b: 0, count: 0 };
  const hasSolidPlate = dominantPlate.count > size * size * 0.25 && sortedPlates.length > 1;

  const mask = new Uint8Array(size * size);
  let featureMass = 0;

  for (let i = 0; i < size * size; i++) {
    const a = data64[i * 4 + 3];
    if (a <= 60) continue;
    if (hasSolidPlate) {
      const distToPlate =
        Math.abs(data64[i * 4] - dominantPlate.r) +
        Math.abs(data64[i * 4 + 1] - dominantPlate.g) +
        Math.abs(data64[i * 4 + 2] - dominantPlate.b);
      if (distToPlate > 45) {
        mask[i] = 1;
        featureMass++;
      }
    } else {
      mask[i] = 1;
      featureMass++;
    }
  }

  let erodedMass = 0;
  for (let y = 1; y < size - 1; y++) {
    for (let x = 1; x < size - 1; x++) {
      const idx = y * size + x;
      if (
        mask[idx] &&
        mask[idx - 1] &&
        mask[idx + 1] &&
        mask[idx - size] &&
        mask[idx + size]
      ) {
        erodedMass++;
      }
    }
  }

  const survivalRatio = featureMass > 25 ? erodedMass / featureMass : 0.75;
  const edgeComplexityRatio = activeAreaCount > 0 ? edgePixelsCount / activeAreaCount : 0;
  const crowdRatio = edgePixelsCount > 0 ? highFreqPixelsCount / edgePixelsCount : 0;

  // High edge complexity (> 0.20) or high crowd ratio (> 0.16) or low erosion survival (< 0.52) indicates fine strokes / tiny text
  const thinStrokeDetected =
    survivalRatio < SCALABILITY_CONFIG.thresholds.thinStrokeErosionRatio ||
    edgeComplexityRatio > 0.22 ||
    crowdRatio > 0.16;

  let rawScore =
    survivalRatio * 10.5 -
    Math.max(0, edgeComplexityRatio - 0.12) * 18 -
    crowdRatio * 12;
  const score = Math.max(1.5, Math.min(10, Number(rawScore.toFixed(1))));

  let status: ScalabilitySubTest['status'] = 'excellent';
  let reason = 'Uniform, confident stroke weights and open negative-space counters.';
  let issueFix: string | undefined;

  if (thinStrokeDetected || score < 7.5) {
    if (score < 5.5) {
      status = 'critical';
      reason = 'Intricate hairline filigree (< 1.5px) or micro-typography detected; erodes at small scales.';
      issueFix = 'Remove micro-text/filigree from the primary mark and thicken stroke weights by 35–50%.';
    } else {
      status = 'warning';
      reason = 'Delicate stroke details (< 2px at 64px) or tight counters risk filling in on print/embroidery.';
      issueFix = 'Increase minimum stroke weight and widen tight interior gaps.';
    }
  }

  return {
    id: 'fineDetailRisk',
    name: 'Fine-Detail & Stroke Robustness',
    weight: 20,
    score,
    status,
    reason,
    issueFix,
    thinStrokeDetected,
  };
}

/**
 * Test 3: Color complexity (15%)
 * Counts distinct color clusters and detects continuous tonal gradients or soft glows.
 */
function testColorComplexity(normCanvas: HTMLCanvasElement): ScalabilitySubTest & {
  detectedColorsCount: number;
  hasGradients: boolean;
} {
  const ctx = normCanvas.getContext('2d', { willReadFrequently: true })!;
  const data = ctx.getImageData(0, 0, 256, 256).data;

  const colorMap = new Map<string, number>();
  let smoothGradientTransitions = 0;

  for (let y = 2; y < 254; y += 2) {
    for (let x = 2; x < 254; x += 2) {
      const i = (y * 256 + x) * 4;
      const a = data[i + 3];
      if (a < 200) continue;

      const r = Math.round(data[i] / 16) * 16;
      const g = Math.round(data[i + 1] / 16) * 16;
      const b = Math.round(data[i + 2] / 16) * 16;
      const key = `${r},${g},${b}`;
      colorMap.set(key, (colorMap.get(key) || 0) + 1);

      // Compare with pixel 2px to the right to detect smooth continuous gradients
      const j = i + 8;
      if (data[j + 3] >= 200) {
        const dr = Math.abs(data[i] - data[j]);
        const dg = Math.abs(data[i + 1] - data[j + 1]);
        const db = Math.abs(data[i + 2] - data[j + 2]);
        const delta = dr + dg + db;
        if (delta >= 2 && delta <= 22) {
          smoothGradientTransitions++;
        }
      }
    }
  }

  // Filter out micro-clusters caused by anti-aliasing (< 12 samples)
  let significantClusters = 0;
  colorMap.forEach((count) => {
    if (count >= 12) significantClusters++;
  });
  const distinctCount = Math.max(1, significantClusters);
  const hasGradients = smoothGradientTransitions > 240 || distinctCount > 18;

  let score = 10;
  let status: ScalabilitySubTest['status'] = 'excellent';
  let reason = `Clean flat palette (${Math.min(distinctCount, 3)} core tones); effortless for spot-color print, foil, and embroidery.`;
  let issueFix: string | undefined;

  if (hasGradients) {
    score = smoothGradientTransitions > 650 ? 5.4 : 6.6;
    status = 'warning';
    reason = 'Continuous gradients or soft radial glows detected; cannot be reproduced in 1-color foil or embroidery.';
    issueFix = 'Include an official flat spot-color vector lockup for physical merch, signage, and embossing.';
  } else if (distinctCount > 4) {
    score = 6.8;
    status = 'warning';
    reason = `${distinctCount} distinct color tones detected; increases multi-plate screenprinting complexity.`;
    issueFix = 'Consolidate decorative shades into 2–3 core brand colors.';
  }

  return {
    id: 'colorComplexity',
    name: 'Color Complexity & Flatness',
    weight: 15,
    score,
    status,
    reason,
    issueFix,
    detectedColorsCount: distinctCount,
    hasGradients,
  };
}

/**
 * Test 4: One-color survival (15%)
 * Tests how well internal shapes survive when converted to pure 1-bit monochrome.
 */
function testOneColorSurvival(
  normCanvas: HTMLCanvasElement,
  hasGradients: boolean,
  detectedColorsCount: number
): ScalabilitySubTest {
  const ctx = normCanvas.getContext('2d', { willReadFrequently: true })!;
  const origImgData = ctx.getImageData(0, 0, 256, 256);
  const d = origImgData.data;

  // Measure luminance separation between foreground and background elements
  let lumValues: number[] = [];
  for (let i = 0; i < d.length; i += 16) {
    if (d[i + 3] > 180) {
      lumValues.push(0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]);
    }
  }

  const mean =
    lumValues.length > 0 ? lumValues.reduce((acc, v) => acc + v, 0) / lumValues.length : 128;
  // Standard deviation of luminance (bimodal high-contrast marks have strong variance, mid-tone gradients have ambiguous mid-zone pixels)
  let ambiguousMidZone = 0;
  for (const l of lumValues) {
    if (Math.abs(l - mean) < 28) {
      ambiguousMidZone++;
    }
  }
  const midZoneRatio = lumValues.length > 0 ? ambiguousMidZone / lumValues.length : 0;

  let score = 9.6;
  if (hasGradients) {
    score -= 2.6;
  }
  if (detectedColorsCount > 3) {
    score -= Math.min(2.2, (detectedColorsCount - 3) * 0.45);
  }
  if (midZoneRatio > 0.35 && detectedColorsCount > 1) {
    score -= 1.4;
  }
  score = Math.max(2.5, Math.min(10, Number(score.toFixed(1))));

  let status: ScalabilitySubTest['status'] = 'excellent';
  let reason = 'Unmistakable 1-bit silhouette; translates cleanly to laser engraving, blind debossing, and wax stamps.';
  let issueFix: string | undefined;

  if (score < 6.2) {
    status = 'critical';
    reason = 'Adjacent multi-color or gradient forms merge together when reduced to 1-bit black & white.';
    issueFix = 'Add negative-space gap channels (keylines) between overlapping colored shapes.';
  } else if (score < 8.2) {
    status = 'warning';
    reason = 'Recognizable in monochrome, though tonal gradients or secondary accents flatten out.';
    issueFix = 'Supply a dedicated single-color stencil/monochrome vector file in the brand kit.';
  }

  return {
    id: 'oneColorSurvival',
    name: 'One-Color Monochrome Survival',
    weight: 15,
    score,
    status,
    reason,
    issueFix,
  };
}

/**
 * Test 5: Background versatility (10%)
 * Checks luminance contrast across pure white, dark obsidian, and mid-tone surfaces.
 */
function testBackgroundVersatility(normCanvas: HTMLCanvasElement): ScalabilitySubTest {
  const ctx = normCanvas.getContext('2d', { willReadFrequently: true })!;
  const data = ctx.getImageData(0, 0, 256, 256).data;

  let totalR = 0;
  let totalG = 0;
  let totalB = 0;
  let count = 0;
  for (let i = 0; i < data.length; i += 8) {
    if (data[i + 3] > 120) {
      totalR += data[i];
      totalG += data[i + 1];
      totalB += data[i + 2];
      count++;
    }
  }

  const avgR = count > 0 ? totalR / count : 128;
  const avgG = count > 0 ? totalG / count : 128;
  const avgB = count > 0 ? totalB / count : 128;
  const avgLum = 0.2126 * (avgR / 255) + 0.7152 * (avgG / 255) + 0.0722 * (avgB / 255);

  const contrastWhite = (1.0 + 0.05) / (avgLum + 0.05);
  const contrastDark = (avgLum + 0.05) / (0.01 + 0.05);

  let score = 9.4;
  let status: ScalabilitySubTest['status'] = 'excellent';
  let reason = 'High luminance separation; commands strong optical presence across light and dark themes.';
  let issueFix: string | undefined;

  if (contrastWhite < 1.65 && contrastDark < 2.1) {
    score = 5.2;
    status = 'critical';
    reason = 'Mid-luminance palette risks low contrast on both bright white and dark mode surfaces.';
    issueFix = 'Define explicit light-mode (dark ink) and dark-mode (white ink) lockups.';
  } else if (contrastWhite < 1.85) {
    score = 7.4;
    status = 'warning';
    reason = 'Bright/light mark requires a dark surface or container badge when placed on white backgrounds.';
    issueFix = 'Use the dark monochrome or primary container variant on white paper/screens.';
  } else if (contrastDark < 2.2) {
    score = 7.6;
    status = 'warning';
    reason = 'Dark dominant tones recede on black/OLED backgrounds without an inverted white variant.';
    issueFix = 'Switch to the inverted white monochrome asset on dark UI surfaces.';
  }

  return {
    id: 'backgroundVersatility',
    name: 'Background Surface Versatility',
    weight: 10,
    score,
    status,
    reason,
    issueFix,
  };
}

/**
 * Test 6: Shape and proportion (10%)
 * Analyzes aspect ratio and compactness for square icon / avatar / favicon containers.
 */
function testShapeAndProportion(aspectRatio: number): ScalabilitySubTest {
  let score = 10;
  let status: ScalabilitySubTest['status'] = 'excellent';
  let reason = `Balanced ${aspectRatio}:1 proportion; fills circular avatars, app squircles, and favicons evenly.`;
  let issueFix: string | undefined;

  if (aspectRatio > 2.8 || aspectRatio < 0.36) {
    score = 4.6;
    status = 'critical';
    reason = `Extreme ${aspectRatio > 1 ? 'horizontal' : 'vertical'} aspect ratio (${aspectRatio}:1); loses 65%+ optical area inside square app icons.`;
    issueFix = 'Extract a 1:1 standalone symbol or monogram from the wordmark for avatars and favicons.';
  } else if (aspectRatio > 1.75 || aspectRatio < 0.57) {
    score = 7.2;
    status = 'warning';
    reason = `Rectangular proportion (${aspectRatio}:1) requires extra optical padding in circular social avatars.`;
    issueFix = 'Provide a compact stacked or icon-only secondary lockup.';
  } else if (aspectRatio > 1.35 || aspectRatio < 0.74) {
    score = 8.8;
    status = 'good';
    reason = `Modest ${aspectRatio}:1 ratio; adapts comfortably to both headers and square containers.`;
  }

  return {
    id: 'shapeAndProportion',
    name: 'Shape Proportion & Compactness',
    weight: 10,
    score,
    status,
    reason,
    issueFix,
  };
}

/**
 * Test 7: Source quality (5%)
 */
function testSourceQuality(isSvg: boolean, width: number, height: number): ScalabilitySubTest {
  if (isSvg) {
    return {
      id: 'sourceQuality',
      name: 'Source File Vector Quality',
      weight: 5,
      score: 10,
      status: 'excellent',
      reason: 'True vector SVG geometry; infinite mathematical resolution from 16px to architectural signage.',
    };
  }

  const maxDim = Math.max(width, height);
  if (maxDim >= 1800) {
    return {
      id: 'sourceQuality',
      name: 'Source File Resolution',
      weight: 5,
      score: 9.0,
      status: 'excellent',
      reason: `High-density raster (${maxDim}px); crisp across Retina displays, though vector SVG is preferred for press.`,
      issueFix: 'Archive a native SVG/EPS master alongside raster exports for large-format signage.',
    };
  }

  if (maxDim >= 900) {
    return {
      id: 'sourceQuality',
      name: 'Source File Resolution',
      weight: 5,
      score: 7.2,
      status: 'good',
      reason: `Standard raster resolution (${maxDim}px); clean for web, but 300 DPI print collateral requires vector.`,
      issueFix: 'Vectorize the mark in Illustrator/Figma before sending to offset print.',
    };
  }

  return {
    id: 'sourceQuality',
    name: 'Source File Resolution',
    weight: 5,
    score: 4.2,
    status: 'critical',
    reason: `Low-resolution raster (${maxDim}px); upscaling will introduce visible interpolation blur.`,
    issueFix: 'Export a native SVG or 2048px+ transparent PNG from your source design file.',
  };
}

/**
 * Main Analysis Orchestrator
 */
export async function analyzeLogoScalability(
  img: HTMLImageElement | HTMLCanvasElement,
  isSvg: boolean
): Promise<ScalabilityResult> {
  const { canvas: normCanvas, bbox, hasAlpha } = normalizeLogoCanvas(img);

  const t1 = testSmallSizeLegibility(normCanvas);
  const t2 = testFineDetailRisk(normCanvas);
  const t3 = testColorComplexity(normCanvas);
  const t4 = testOneColorSurvival(normCanvas, t3.hasGradients, t3.detectedColorsCount);
  const t5 = testBackgroundVersatility(normCanvas);
  const t6 = testShapeAndProportion(bbox.aspect);
  const t7 = testSourceQuality(isSvg, bbox.width, bbox.height);

  const subTests: ScalabilitySubTest[] = [t1, t2, t3, t4, t5, t6, t7];
  const diagnostics = buildDiagnosticVisuals(normCanvas);

  let weightedSum = 0;
  for (const t of subTests) {
    weightedSum += t.score * (t.weight / 100);
  }
  const overallScore = Math.max(1, Math.min(10, Number(weightedSum.toFixed(1))));

  let verdict: ScalabilityResult['verdict'] = 'Scalable';
  let tierLabel: ScalabilityResult['tierLabel'] = 'Good';

  if (overallScore >= 8.8) {
    verdict = 'Scalable';
    tierLabel = 'Excellent';
  } else if (overallScore >= 7.0) {
    verdict = 'Scalable';
    tierLabel = 'Good';
  } else if (overallScore >= 5.0) {
    verdict = 'Scalable with a simplified small-size version';
    tierLabel = 'Fair';
  } else {
    verdict = 'Not scalable';
    tierLabel = 'Needs rework';
  }

  const issues: string[] = [];
  const recommendations: string[] = [];

  for (const t of subTests) {
    if (t.issueFix) {
      issues.push(`${t.name}: ${t.issueFix}`);
    }
  }

  if (t2.thinStrokeDetected) {
    recommendations.push(
      'Establish a responsive logo system: Primary Master (>64px), Simplified Badge (32–64px), and Bold Monogram (16–24px).'
    );
  }
  if (t3.hasGradients) {
    recommendations.push(
      'Include a flat 1-color vector stencil in your handoff kit for embroidery, foil stamping, and laser etching.'
    );
  }
  if (bbox.aspect > 1.8 || bbox.aspect < 0.55) {
    recommendations.push(
      'Use a square 1:1 icon lockup for iOS/Android app icons, browser favicons, and social profile avatars.'
    );
  }
  if (recommendations.length === 0) {
    recommendations.push(
      'Maintain a minimum 25% ("X") clear-space perimeter across all digital headers and print collateral.'
    );
  }

  return {
    overallScore,
    verdict,
    tierLabel,
    subTests,
    issues,
    recommendations,
    hasTransparency: hasAlpha,
    isSvg,
    detectedColorsCount: t3.detectedColorsCount,
    hasGradients: t3.hasGradients,
    aspectRatio: bbox.aspect,
    boundingWidth: bbox.width,
    boundingHeight: bbox.height,
    thinStrokeDetected: t2.thinStrokeDetected,
    diagnostics,
  };
}
