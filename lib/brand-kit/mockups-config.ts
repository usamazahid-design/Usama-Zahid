import { buildAdaptiveLogoVariants } from './color-extractor';
import { LogoVariants } from './types';

export interface MockupConfig {
  id: string;
  title: string;
  category: 'Stationery' | 'Merchandise' | 'Signage' | 'Digital';
  templatePath: string;
  aspectRatio: string;
  width: number;
  height: number;
  description: string;
}

export interface MockupBrandContext {
  brandName: string;
  tagline?: string;
  industry?: string;
  primaryColor?: string;
  accentColor?: string;
  paletteColors?: string[];
}

export const MOCKUP_TEMPLATES: MockupConfig[] = [
  {
    id: 'business-card',
    title: 'Textured Cotton Business Card',
    category: 'Stationery',
    templatePath: '/assets/mockups/business-card.jpg',
    aspectRatio: '4 / 3',
    width: 1200,
    height: 896,
    description:
      'Heavy textured cotton card stock on limestone travertine with perspective-calibrated projection and adaptive ink contrast.',
  },
  {
    id: 'letterhead',
    title: 'Executive Letterhead & Slate Desk',
    category: 'Stationery',
    templatePath: '/assets/mockups/letterhead.jpg',
    aspectRatio: '4 / 3',
    width: 1200,
    height: 896,
    description:
      'A4 deckled-edge cotton correspondence sheet with corporate registration header, formal dispatch text, and executive sign-off.',
  },
  {
    id: 'tote-bag',
    title: 'Organic Heavy Canvas Tote',
    category: 'Merchandise',
    templatePath: '/assets/mockups/tote-bag.jpg',
    aspectRatio: '4 / 3',
    width: 1200,
    height: 896,
    description:
      'Raw linen-cotton woven tote with centered chest screen-print, brand wordmark, and subtle textile ink integration.',
  },
  {
    id: 'coffee-mug',
    title: 'Minimalist Matte Ceramic Mug',
    category: 'Merchandise',
    templatePath: '/assets/mockups/coffee-mug.jpg',
    aspectRatio: '4 / 3',
    width: 1200,
    height: 896,
    description:
      'Matte stoneware cylinder with optically centered brand mark on the front face, studio edition label, and natural morning light.',
  },
  {
    id: 'signage',
    title: 'Flagship Bronze Wall Sign',
    category: 'Signage',
    templatePath: '/assets/mockups/signage.jpg',
    aspectRatio: '4 / 3',
    width: 1200,
    height: 896,
    description:
      'Brushed dark bronze architectural plaque with auto-inverted light/metallic mark centered between the four brass standoffs.',
  },
  {
    id: 'digital-display',
    title: 'Architectural Studio Display',
    category: 'Digital',
    templatePath: '/assets/mockups/digital-display.jpg',
    aspectRatio: '4 / 3',
    width: 1200,
    height: 896,
    description:
      'Bezel-calibrated studio monitor showcasing a live dark-mode website hero with adaptive light logo lockup in the navbar and card.',
  },
];

/**
 * Loads a dataURL into an HTMLImageElement
 */
function loadImageFromUrl(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = dataUrl;
  });
}

/**
 * Selects the best logo image variant for a given surface ('light' or 'dark') and user mode
 */
async function resolveLogoForSurface(
  variants: LogoVariants,
  surface: 'light' | 'dark',
  mode: 'auto' | 'original' | 'white' | 'black' = 'auto'
): Promise<HTMLImageElement> {
  let targetUrl = variants.original;
  if (mode === 'white') {
    targetUrl = variants.whiteMono;
  } else if (mode === 'black') {
    targetUrl = variants.blackMono;
  } else if (mode === 'original') {
    targetUrl = variants.original;
  } else {
    // 'auto' Adaptive mode: use forLightBg on light substrates and forDarkBg on dark substrates!
    targetUrl = surface === 'dark' ? variants.forDarkBg : variants.forLightBg;
  }
  return loadImageFromUrl(targetUrl);
}

/**
 * Draws the logo fitted inside a bounding box while strictly preserving aspect ratio.
 * Returns the actual drawn { x, y, w, h } so adjacent typography can position itself dynamically.
 */
function drawFittedImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | HTMLCanvasElement,
  boxX: number,
  boxY: number,
  boxW: number,
  boxH: number,
  alignX: 'center' | 'left' | 'right' = 'center',
  alignY: 'center' | 'top' | 'bottom' = 'center'
): { x: number; y: number; w: number; h: number; aspect: number } {
  const natW = (img as HTMLImageElement).naturalWidth || img.width || 1;
  const natH = (img as HTMLImageElement).naturalHeight || img.height || 1;
  const aspect = natW / natH;

  let dw = boxW;
  let dh = boxH;

  if (aspect > boxW / boxH) {
    dh = boxW / aspect;
  } else {
    dw = boxH * aspect;
  }

  let dx = boxX;
  if (alignX === 'center') dx = boxX + (boxW - dw) / 2;
  else if (alignX === 'right') dx = boxX + boxW - dw;

  let dy = boxY;
  if (alignY === 'center') dy = boxY + (boxH - dh) / 2;
  else if (alignY === 'bottom') dy = boxY + boxH - dh;

  ctx.drawImage(img, dx, dy, dw, dh);
  return { x: dx, y: dy, w: dw, h: dh, aspect };
}

/**
 * Warps an offscreen canvas onto a destination canvas quad defined by [tl, tr, br, bl]
 */
function warpQuadToCanvas(
  ctx: CanvasRenderingContext2D,
  srcCanvas: HTMLCanvasElement,
  tl: { x: number; y: number },
  tr: { x: number; y: number },
  br: { x: number; y: number },
  bl: { x: number; y: number },
  compositeOperation: GlobalCompositeOperation = 'source-over',
  alpha = 0.94
) {
  const sw = srcCanvas.width;
  const sh = srcCanvas.height;

  function solveAffine(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    u0: number,
    v0: number,
    u1: number,
    v1: number,
    u2: number,
    v2: number
  ) {
    const delta = (u0 - u2) * (v1 - v2) - (u1 - u2) * (v0 - v2);
    const m11 = ((x0 - x2) * (v1 - v2) - (x1 - x2) * (v0 - v2)) / delta;
    const m12 = ((y0 - y2) * (v1 - v2) - (y1 - y2) * (v0 - v2)) / delta;
    const m21 = ((u0 - u2) * (x1 - x2) - (u1 - u2) * (x0 - x2)) / delta;
    const m22 = ((u0 - u2) * (y1 - y2) - (u1 - u2) * (y0 - y2)) / delta;
    const dx = x0 - m11 * u0 - m21 * v0;
    const dy = y0 - m12 * u0 - m22 * v0;
    return { m11, m12, m21, m22, dx, dy };
  }

  ctx.save();
  ctx.globalCompositeOperation = compositeOperation;
  ctx.globalAlpha = alpha;

  const tA = solveAffine(tl.x, tl.y, tr.x, tr.y, bl.x, bl.y, 0, 0, sw, 0, 0, sh);
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(tl.x, tl.y);
  ctx.lineTo(tr.x + 0.6, tr.y);
  ctx.lineTo(bl.x, bl.y + 0.6);
  ctx.closePath();
  ctx.clip();
  ctx.transform(tA.m11, tA.m12, tA.m21, tA.m22, tA.dx, tA.dy);
  ctx.drawImage(srcCanvas, 0, 0);
  ctx.restore();

  const tB = solveAffine(br.x, br.y, bl.x, bl.y, tr.x, tr.y, sw, sh, 0, sh, sw, 0);
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(tr.x + 0.6, tr.y);
  ctx.lineTo(br.x, br.y);
  ctx.lineTo(bl.x, bl.y + 0.6);
  ctx.closePath();
  ctx.clip();
  ctx.transform(tB.m11, tB.m12, tB.m21, tB.m22, tB.dx, tB.dy);
  ctx.drawImage(srcCanvas, 0, 0);
  ctx.restore();

  ctx.restore();
}

function wrapTextLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0] || '';

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

// ============================================================
// 1. BUSINESS CARD RENDERER (Perspective-Projected on Travertine)
// ============================================================
async function renderBusinessCardContent(
  ctx: CanvasRenderingContext2D,
  variants: LogoVariants,
  brand: MockupBrandContext,
  forceLogoMode: 'auto' | 'original' | 'white' | 'black' = 'auto'
) {
  const cardW = 840;
  const cardH = 500;
  const off = document.createElement('canvas');
  off.width = cardW;
  off.height = cardH;
  const octx = off.getContext('2d');
  if (!octx) return;

  const logoImg = await resolveLogoForSurface(variants, 'light', forceLogoMode);

  const padX = 76;
  const padY = 64;

  // Draw Logo Mark (supports both square icons and wide horizontal wordmarks up to 220x84)
  const drawn = drawFittedImage(octx, logoImg, padX, padY, 220, 84, 'left', 'center');

  const brandSlug = brand.brandName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'studio';
  octx.textAlign = 'left';

  // If the uploaded logo is compact/square (aspect < 1.75), show the Brand Name beside it;
  // if the uploaded logo is already a wide wordmark, show the industry subtitle cleanly beside/below
  if (drawn.aspect < 1.75) {
    const textX = padX + Math.round(drawn.w) + 22;
    octx.fillStyle = '#16171B';
    octx.font = '700 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    octx.fillText(brand.brandName.toUpperCase(), textX, padY + 36);

    octx.fillStyle = '#6D707E';
    octx.font = '500 11.5px -apple-system, sans-serif';
    octx.fillText(
      (brand.tagline || brand.industry || 'Brand & Product Design').toUpperCase().slice(0, 38),
      textX,
      padY + 58
    );
  } else {
    octx.fillStyle = '#6D707E';
    octx.font = '600 11px -apple-system, sans-serif';
    octx.fillText(
      (brand.tagline || brand.industry || 'Brand & Product Design').toUpperCase().slice(0, 46),
      padX,
      padY + 108
    );
  }

  // Delicate middle divider hairline
  octx.strokeStyle = 'rgba(20, 20, 26, 0.10)';
  octx.lineWidth = 1.2;
  octx.beginPath();
  octx.moveTo(padX, 226);
  octx.lineTo(cardW - padX, 226);
  octx.stroke();

  // Lower Left: Individual Person / Role
  octx.fillStyle = '#16171B';
  octx.font = '700 17px -apple-system, sans-serif';
  octx.fillText('Usama Zahid', padX, 316);

  octx.fillStyle = '#5A5D6C';
  octx.font = '400 12.5px -apple-system, sans-serif';
  octx.fillText('Brand & Product Designer', padX, 342);

  octx.fillStyle = brand.primaryColor || '#4B3FFF';
  octx.font = '600 10.5px monospace';
  octx.fillText('SPEC // UZ-2026', padX, 368);

  // Lower Right: Contact Credentials
  octx.textAlign = 'right';
  const rightX = cardW - padX;

  octx.fillStyle = '#222328';
  octx.font = '500 13px -apple-system, sans-serif';
  octx.fillText(`hello@${brandSlug}.design`, rightX, 312);

  octx.fillStyle = '#5A5D6C';
  octx.font = '400 12px -apple-system, sans-serif';
  octx.fillText('+1 (555) 019-2834', rightX, 338);
  octx.fillText(`www.${brandSlug}.design`, rightX, 362);

  octx.fillStyle = '#848794';
  octx.font = '400 11px -apple-system, sans-serif';
  octx.fillText('New York  ·  London  ·  Lahore', rightX, 386);

  // Exact calibrated corners of the white cotton card in business-card.jpg (1200x896)
  const tl = { x: 394, y: 266 };
  const tr = { x: 874, y: 323 };
  const br = { x: 822, y: 618 };
  const bl = { x: 338, y: 554 };

  const blendMode: GlobalCompositeOperation = forceLogoMode === 'white' ? 'source-over' : 'multiply';
  warpQuadToCanvas(ctx, off, tl, tr, br, bl, blendMode, 0.92);
}

// ============================================================
// 2. EXECUTIVE LETTERHEAD RENDERER (A4 Sheet on Slate Desk)
// ============================================================
async function renderLetterheadContent(
  ctx: CanvasRenderingContext2D,
  variants: LogoVariants,
  brand: MockupBrandContext,
  forceLogoMode: 'auto' | 'original' | 'white' | 'black' = 'auto'
) {
  const logoImg = await resolveLogoForSurface(variants, 'light', forceLogoMode);

  ctx.save();
  ctx.globalCompositeOperation = forceLogoMode === 'white' ? 'source-over' : 'multiply';
  ctx.globalAlpha = 0.90;

  // Exact A4 paper margins inside letterhead.jpg (paper spans x=390..806, y=116..712)
  const leftMargin = 430;
  const rightMargin = 766;
  const topY = 152;
  const brandSlug = brand.brandName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'studio';

  // Header Logo Mark (up to 105x42 box)
  const drawn = drawFittedImage(ctx, logoImg, leftMargin, topY, 105, 42, 'left', 'center');

  if (drawn.aspect < 1.8) {
    const titleX = leftMargin + Math.round(drawn.w) + 12;
    ctx.fillStyle = '#16171B';
    ctx.font = '700 13.5px -apple-system, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(brand.brandName.toUpperCase(), titleX, topY + 18);

    ctx.fillStyle = '#6E717E';
    ctx.font = '500 8px -apple-system, sans-serif';
    ctx.fillText((brand.industry || 'Brand & Product Systems').toUpperCase(), titleX, topY + 30);
  }

  // Right Header Info
  ctx.textAlign = 'right';
  ctx.fillStyle = brand.primaryColor || '#4B3FFF';
  ctx.font = '600 7.5px monospace';
  ctx.fillText('SPECIFICATION NO. 2026-A', rightMargin, topY + 13);

  ctx.fillStyle = '#777986';
  ctx.font = '400 7px -apple-system, sans-serif';
  ctx.fillText('OFFICIAL IDENTITY ARCHIVE', rightMargin, topY + 23);
  ctx.fillText(`www.${brandSlug}.design`, rightMargin, topY + 33);

  // Hairline Rule
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(leftMargin, topY + 50);
  ctx.lineTo(rightMargin, topY + 50);
  ctx.stroke();

  // Dispatch Meta
  ctx.textAlign = 'left';
  const metaY = topY + 68;
  ctx.fillStyle = '#555762';
  ctx.font = '600 7.5px -apple-system, sans-serif';
  ctx.fillText('DATE:', leftMargin, metaY);
  ctx.fillStyle = '#222328';
  ctx.font = '400 7.5px -apple-system, sans-serif';
  ctx.fillText('October 30, 2026', leftMargin + 35, metaY);

  ctx.fillStyle = '#555762';
  ctx.font = '600 7.5px -apple-system, sans-serif';
  ctx.fillText('TO:', leftMargin, metaY + 14);
  ctx.fillStyle = '#222328';
  ctx.font = '400 7.5px -apple-system, sans-serif';
  ctx.fillText('Executive Board & Design Governance Committee', leftMargin + 35, metaY + 14);

  ctx.fillStyle = '#16171B';
  ctx.font = '700 8.5px -apple-system, sans-serif';
  ctx.fillText(`RE: Formal Ratification of ${brand.brandName} Brand Standards`, leftMargin, metaY + 32);

  // Formal Letter Paragraphs
  const bodyY = metaY + 50;
  const contentWidth = rightMargin - leftMargin;

  const p1 = `This official corporate dispatch certifies the formal establishment of the visual identity system for ${brand.brandName}. Engineered under strict architectural governance, every standard outlined herein controls all digital products, packaging, physical collateral, and international correspondence.`;
  const p2 = `Typography pairings, exclusion boundaries, and chromatic formulas must be faithfully preserved across all print and digital reproductions. Any arbitrary color re-tinting, aspect ratio distortion, or safe-zone intrusion is explicitly prohibited under current brand doctrine.`;

  ctx.fillStyle = '#2A2C34';
  ctx.font = '400 7.5px -apple-system, Georgia, serif';
  let curY = bodyY;

  wrapTextLines(ctx, p1, contentWidth).forEach((line) => {
    ctx.fillText(line, leftMargin, curY);
    curY += 12.5;
  });

  curY += 7;
  wrapTextLines(ctx, p2, contentWidth).forEach((line) => {
    ctx.fillText(line, leftMargin, curY);
    curY += 12.5;
  });

  // Sign-off
  curY += 16;
  ctx.fillStyle = '#484B56';
  ctx.font = 'italic 8px Georgia, serif';
  ctx.fillText('Respectfully submitted,', leftMargin, curY);

  curY += 18;
  ctx.fillStyle = '#16171B';
  ctx.font = '700 9.5px Georgia, serif';
  ctx.fillText('Usama Zahid', leftMargin, curY);

  curY += 11;
  ctx.fillStyle = '#777986';
  ctx.font = '400 7.5px -apple-system, sans-serif';
  ctx.fillText('Brand & Product Designer · Systems Architect', leftMargin, curY);

  // Footer Micro Notice well inside bottom edge (paper bottom is y=712)
  ctx.fillStyle = '#9C9EA8';
  ctx.font = '500 6.5px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(
    `CONFIDENTIAL & PROPRIETARY · ALL RIGHTS RESERVED · ${brand.brandName.toUpperCase()}`,
    (leftMargin + rightMargin) / 2,
    674
  );

  ctx.restore();
}

// ============================================================
// 3. ORGANIC CANVAS TOTE BAG RENDERER
// ============================================================
async function renderToteBagContent(
  ctx: CanvasRenderingContext2D,
  variants: LogoVariants,
  brand: MockupBrandContext,
  forceLogoMode: 'auto' | 'original' | 'white' | 'black' = 'auto'
) {
  const logoImg = await resolveLogoForSurface(variants, 'light', forceLogoMode);

  ctx.save();
  ctx.globalCompositeOperation = forceLogoMode === 'white' ? 'source-over' : 'multiply';
  ctx.globalAlpha = 0.88;

  // Exact optical center of the canvas tote body in tote-bag.jpg (x=360..845, y=315..805)
  const bagCenterX = 602;
  const bagCenterY = 532;

  // Central Logo Mark (fits cleanly inside 165x110 chest area)
  drawFittedImage(
    ctx,
    logoImg,
    bagCenterX - 82,
    bagCenterY - 82,
    164,
    108,
    'center',
    'center'
  );

  // Brand Name in Heavy Screenprint Typography
  ctx.textAlign = 'center';
  ctx.fillStyle = forceLogoMode === 'white' ? '#FAF8F5' : '#18191E';
  ctx.font = '800 19px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText(brand.brandName.toUpperCase(), bagCenterX, bagCenterY + 52);

  // Tagline
  ctx.fillStyle = forceLogoMode === 'white' ? 'rgba(255,255,255,0.85)' : '#4A4C56';
  ctx.font = 'italic 9.5px Georgia, serif';
  ctx.fillText(
    `"${(brand.tagline || 'Original Design Systems').slice(0, 42)}"`,
    bagCenterX,
    bagCenterY + 71
  );

  // Subtle bottom edition stamp
  ctx.fillStyle = forceLogoMode === 'white' ? 'rgba(255,255,255,0.7)' : '#6C6E7A';
  ctx.font = '600 7.5px monospace';
  ctx.fillText('OFFICIAL STUDIO EDITION · 2026', bagCenterX, bagCenterY + 92);

  ctx.restore();
}

// ============================================================
// 4. MINIMALIST CERAMIC MUG RENDERER
// ============================================================
async function renderCoffeeMugContent(
  ctx: CanvasRenderingContext2D,
  variants: LogoVariants,
  brand: MockupBrandContext,
  forceLogoMode: 'auto' | 'original' | 'white' | 'black' = 'auto'
) {
  const logoImg = await resolveLogoForSurface(variants, 'light', forceLogoMode);

  ctx.save();
  ctx.globalCompositeOperation = forceLogoMode === 'white' ? 'source-over' : 'multiply';
  ctx.globalAlpha = 0.88;

  // Exact optical center of the ceramic mug's front cylinder face (mug body x=448..735, y=370..715)
  const mugCenterX = 582;
  const mugCenterY = 532;

  // Logo Mark centered at optical eye-level (fits inside 124x82)
  drawFittedImage(
    ctx,
    logoImg,
    mugCenterX - 62,
    mugCenterY - 64,
    124,
    82,
    'center',
    'center'
  );

  // Brand Name
  ctx.textAlign = 'center';
  ctx.fillStyle = forceLogoMode === 'white' ? '#FAF8F5' : '#202127';
  ctx.font = '700 13.5px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText(brand.brandName.toUpperCase(), mugCenterX, mugCenterY + 38);

  // Sub-title
  ctx.fillStyle = forceLogoMode === 'white' ? 'rgba(255,255,255,0.8)' : '#5A5C68';
  ctx.font = '500 8px -apple-system, sans-serif';
  ctx.fillText((brand.industry || 'Studio Edition').toUpperCase(), mugCenterX, mugCenterY + 52);

  ctx.fillStyle = forceLogoMode === 'white' ? 'rgba(255,255,255,0.65)' : '#808390';
  ctx.font = '500 7px monospace';
  ctx.fillText('EST. 2026', mugCenterX, mugCenterY + 65);

  ctx.restore();
}

// ============================================================
// 5. STOREFRONT WALL SIGN RENDERER (Dark Bronze Plaque)
// ============================================================
async function renderSignageContent(
  ctx: CanvasRenderingContext2D,
  variants: LogoVariants,
  brand: MockupBrandContext,
  forceLogoMode: 'auto' | 'original' | 'white' | 'black' = 'auto'
) {
  // Bronze plaque is a DARK surface -> 'auto' resolves to variants.forDarkBg!
  const logoImg = await resolveLogoForSurface(variants, 'dark', forceLogoMode);

  ctx.save();
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 0.95;

  // Exact center of the dark bronze plaque in signage.jpg (plaque spans x=535..953, y=234..664)
  const plaqueCenterX = 744;
  const plaqueCenterY = 449;

  // Soft architectural depth shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 2;

  // A. Logo Mark centered in the upper-middle of the bronze plaque (160x100 bounding box)
  drawFittedImage(
    ctx,
    logoImg,
    plaqueCenterX - 80,
    plaqueCenterY - 102,
    160,
    100,
    'center',
    'center'
  );

  // B. Sculpted Brand Name
  ctx.fillStyle = forceLogoMode === 'black' ? '#18181B' : '#F4F2EC';
  ctx.font = '800 20px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(brand.brandName.toUpperCase(), plaqueCenterX, plaqueCenterY + 26);

  // Thin brushed brass divider
  ctx.strokeStyle =
    forceLogoMode === 'black' ? 'rgba(24, 24, 27, 0.45)' : 'rgba(235, 225, 205, 0.45)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(plaqueCenterX - 52, plaqueCenterY + 42);
  ctx.lineTo(plaqueCenterX + 52, plaqueCenterY + 42);
  ctx.stroke();

  // C. Descriptor & Studio Suite
  ctx.fillStyle = forceLogoMode === 'black' ? '#27272A' : '#DCD6C8';
  ctx.font = '600 9px -apple-system, sans-serif';
  ctx.fillText(
    (brand.industry || 'STUDIO & FLAGSHIP ARCHIVE').toUpperCase(),
    plaqueCenterX,
    plaqueCenterY + 60
  );

  ctx.fillStyle = forceLogoMode === 'black' ? '#3F3F46' : '#ADA696';
  ctx.font = '500 7.5px monospace';
  ctx.fillText('SUITE 400 · ESTABLISHED 2026', plaqueCenterX, plaqueCenterY + 76);

  ctx.restore();
}

// ============================================================
// 6. STUDIO DIGITAL DISPLAY RENDERER (Live Website on Monitor)
// ============================================================
async function renderDigitalDisplayContent(
  ctx: CanvasRenderingContext2D,
  variants: LogoVariants,
  brand: MockupBrandContext,
  forceLogoMode: 'auto' | 'original' | 'white' | 'black' = 'auto'
) {
  // Monitor UI is dark (#090A0E) -> 'auto' resolves to variants.forDarkBg!
  const logoImg = await resolveLogoForSurface(
    variants,
    'dark',
    forceLogoMode === 'black' ? 'white' : forceLogoMode
  );

  ctx.save();
  ctx.globalCompositeOperation = 'source-over';

  // Exact inner bezel coordinates of the monitor in digital-display.jpg (1200x896)
  const screenX = 331;
  const screenY = 291;
  const screenW = 551;
  const screenH = 321;
  const brandSlug = brand.brandName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'studio';

  // Clip strictly to the monitor screen glass so nothing ever bleeds onto the bezel or stand
  ctx.beginPath();
  ctx.rect(screenX, screenY, screenW, screenH);
  ctx.clip();

  // Screen background
  ctx.fillStyle = '#090A0E';
  ctx.fillRect(screenX, screenY, screenW, screenH);

  // Subtle ambient glow in brand primary color
  const grad = ctx.createRadialGradient(
    screenX + screenW / 2,
    screenY + screenH * 0.45,
    10,
    screenX + screenW / 2,
    screenY + screenH * 0.45,
    240
  );
  grad.addColorStop(0, `${brand.primaryColor || '#4B3FFF'}28`);
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.fillRect(screenX, screenY, screenW, screenH);

  // A. Browser Chrome Bar
  const navH = 26;
  ctx.fillStyle = '#14151A';
  ctx.fillRect(screenX, screenY, screenW, navH);

  ctx.strokeStyle = '#22242E';
  ctx.lineWidth = 1;
  ctx.strokeRect(screenX, screenY, screenW, navH);

  // 3 macOS window dots
  const dotY = screenY + 13;
  ctx.fillStyle = '#FF5F56';
  ctx.beginPath();
  ctx.arc(screenX + 14, dotY, 3.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FFBD2E';
  ctx.beginPath();
  ctx.arc(screenX + 25, dotY, 3.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#27C93F';
  ctx.beginPath();
  ctx.arc(screenX + 36, dotY, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // URL Bar pill
  const pillW = 210;
  const pillH = 16;
  const pillX = screenX + (screenW - pillW) / 2;
  const pillY = screenY + 5;
  ctx.fillStyle = '#1D1E25';
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, 4);
  ctx.fill();

  ctx.fillStyle = '#8B8E9E';
  ctx.font = '500 7.5px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`https://${brandSlug}.design`, pillX + pillW / 2, pillY + 11);

  // B. Website Header: Adaptive Dark-Mode Logo in Navbar
  const siteNavY = screenY + navH + 18;
  const navLogoDrawn = drawFittedImage(
    ctx,
    logoImg,
    screenX + 24,
    siteNavY - 11,
    46,
    20,
    'left',
    'center'
  );

  if (navLogoDrawn.aspect < 1.8) {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 10.5px -apple-system, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(brand.brandName, screenX + 24 + Math.round(navLogoDrawn.w) + 8, siteNavY + 3);
  }

  // Nav Links
  ctx.fillStyle = '#9FA3B4';
  ctx.font = '500 8px -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Work', screenX + 325, siteNavY + 2);
  ctx.fillText('Services', screenX + 362, siteNavY + 2);
  ctx.fillText('Systems', screenX + 410, siteNavY + 2);
  ctx.fillText('About', screenX + 458, siteNavY + 2);

  // CTA Pill
  ctx.fillStyle = brand.primaryColor || '#4B3FFF';
  ctx.beginPath();
  ctx.roundRect(screenX + 496, siteNavY - 9, 36, 17, 8);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 7px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Start', screenX + 514, siteNavY + 2);

  // C. Hero Content
  const heroCenterY = screenY + navH + 52;
  ctx.textAlign = 'center';

  ctx.fillStyle = 'rgba(0, 199, 206, 0.12)';
  ctx.strokeStyle = 'rgba(0, 199, 206, 0.35)';
  ctx.beginPath();
  ctx.roundRect(screenX + screenW / 2 - 72, heroCenterY - 8, 144, 15, 7);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#00C7CE';
  ctx.font = '600 6.5px monospace';
  ctx.fillText('BRAND IDENTITY SYSTEM', screenX + screenW / 2, heroCenterY + 2);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 19px -apple-system, sans-serif';
  ctx.fillText(brand.brandName, screenX + screenW / 2, heroCenterY + 29);

  ctx.fillStyle = '#A3A7BA';
  ctx.font = '400 9px -apple-system, sans-serif';
  ctx.fillText(
    (brand.tagline || 'Engineered with architectural clarity and visual discipline.').slice(0, 64),
    screenX + screenW / 2,
    heroCenterY + 45
  );

  // Action Buttons
  const btnY = heroCenterY + 58;
  ctx.fillStyle = brand.primaryColor || '#4B3FFF';
  ctx.beginPath();
  ctx.roundRect(screenX + screenW / 2 - 76, btnY, 72, 20, 4);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 7.5px sans-serif';
  ctx.fillText('Explore System →', screenX + screenW / 2 - 40, btnY + 13);

  ctx.strokeStyle = '#323544';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.beginPath();
  ctx.roundRect(screenX + screenW / 2 + 4, btnY, 72, 20, 4);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#E0E3EE';
  ctx.fillText('View Tokens', screenX + screenW / 2 + 40, btnY + 13);

  // D. Showcase Card with Adaptive Dark-Mode Logo
  const cardBoxY = btnY + 30;
  const cardBoxW = 248;
  const cardBoxH = 76;
  const cardBoxX = screenX + (screenW - cardBoxW) / 2;

  ctx.fillStyle = '#12131A';
  ctx.strokeStyle = '#262938';
  ctx.beginPath();
  ctx.roundRect(cardBoxX, cardBoxY, cardBoxW, cardBoxH, 6);
  ctx.fill();
  ctx.stroke();

  drawFittedImage(
    ctx,
    logoImg,
    cardBoxX + 16,
    cardBoxY + 12,
    76,
    52,
    'center',
    'center'
  );

  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 10.5px -apple-system, sans-serif';
  ctx.fillText(brand.brandName.toUpperCase(), cardBoxX + 104, cardBoxY + 30);

  ctx.fillStyle = '#8A8EA0';
  ctx.font = '400 7.5px -apple-system, sans-serif';
  ctx.fillText('Adaptive Dark Lockup · Active', cardBoxX + 104, cardBoxY + 43);
  ctx.fillStyle = '#00C7CE';
  ctx.fillText('WCAG Contrast Verified ✓', cardBoxX + 104, cardBoxY + 55);

  ctx.restore();
}

// ============================================================
// MASTER COMPOSITOR
// ============================================================
export async function renderMockupCanvas(
  config: MockupConfig,
  logoDataUrl: string,
  forceLogoMode: 'auto' | 'original' | 'white' | 'black' = 'auto',
  brandContext?: MockupBrandContext
): Promise<string> {
  if (typeof window === 'undefined') return '';

  const brand: MockupBrandContext = {
    brandName: brandContext?.brandName || 'Acme Studio',
    tagline: brandContext?.tagline || 'Design Systems for the Modern Era',
    industry: brandContext?.industry || 'Technology & SaaS',
    primaryColor: brandContext?.primaryColor || '#4B3FFF',
    accentColor: brandContext?.accentColor || '#00C7CE',
    paletteColors: brandContext?.paletteColors || ['#4B3FFF', '#00C7CE', '#16171B', '#7A7E8F', '#F5F5F7'],
  };

  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = config.width;
    canvas.height = config.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return resolve('');

    const templateImg = new Image();
    templateImg.crossOrigin = 'anonymous';

    templateImg.onload = () => {
      ctx.drawImage(templateImg, 0, 0, config.width, config.height);

      const rawLogoImg = new Image();
      rawLogoImg.crossOrigin = 'anonymous';

      rawLogoImg.onload = async () => {
        try {
          const variants = buildAdaptiveLogoVariants(rawLogoImg, logoDataUrl);

          switch (config.id) {
            case 'business-card':
              await renderBusinessCardContent(ctx, variants, brand, forceLogoMode);
              break;
            case 'letterhead':
              await renderLetterheadContent(ctx, variants, brand, forceLogoMode);
              break;
            case 'signage':
              await renderSignageContent(ctx, variants, brand, forceLogoMode);
              break;
            case 'digital-display':
              await renderDigitalDisplayContent(ctx, variants, brand, forceLogoMode);
              break;
            case 'tote-bag':
              await renderToteBagContent(ctx, variants, brand, forceLogoMode);
              break;
            case 'coffee-mug':
              await renderCoffeeMugContent(ctx, variants, brand, forceLogoMode);
              break;
            default:
              await renderBusinessCardContent(ctx, variants, brand, forceLogoMode);
              break;
          }
        } catch (err) {
          console.error('Error compositing mockup:', err);
        }
        resolve(canvas.toDataURL('image/png'));
      };

      rawLogoImg.onerror = () => {
        resolve(canvas.toDataURL('image/png'));
      };

      rawLogoImg.src = logoDataUrl;
    };

    templateImg.onerror = (err) => {
      console.warn(`Could not load template from ${config.templatePath}, falling back`, err);
      ctx.fillStyle = '#141418';
      ctx.fillRect(0, 0, config.width, config.height);
      resolve(canvas.toDataURL('image/png'));
    };

    templateImg.src = config.templatePath;
  });
}
