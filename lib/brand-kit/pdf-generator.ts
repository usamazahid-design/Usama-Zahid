import { BrandKitState } from './types';
import { hexToRgb } from './color-extractor';

// Ensures any SVG or data URL is converted to a clean raster PNG for jsPDF embedding
async function ensurePngDataUrl(dataUrl: string): Promise<string> {
  if (typeof window === 'undefined') return dataUrl;
  if (dataUrl.startsWith('data:image/png') || dataUrl.startsWith('data:image/jpeg')) {
    return dataUrl;
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 600;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, size, size);
        // Center aspect fit
        const w = img.naturalWidth || size;
        const h = img.naturalHeight || size;
        const scale = Math.min((size - 40) / w, (size - 40) / h);
        const dw = w * scale;
        const dh = h * scale;
        const dx = (size - dw) / 2;
        const dy = (size - dh) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);
        resolve(canvas.toDataURL('image/png'));
      } else {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

export async function generateBrandGuidelinesPdf(state: BrandKitState): Promise<Blob> {
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  const { brandName, industry, tagline, palette, scalability, selectedFontPair, logoDataUrl, logoVariants, aiCopy } = state;

  // Convert adaptive light/dark SVG variants to PNG for bulletproof PDF rendering
  const darkCoverLogoDataUrl = await ensurePngDataUrl(logoVariants?.forDarkBg || logoDataUrl);
  const lightBlueprintLogoDataUrl = await ensurePngDataUrl(logoVariants?.forLightBg || logoDataUrl);

  const primaryRgb: [number, number, number] = palette ? hexToRgb(palette.primary.hex) : [75, 63, 255];
  const accentRgb: [number, number, number] = palette ? hexToRgb(palette.accent.hex) : [0, 199, 206];
  const darkRgb: [number, number, number] = palette ? hexToRgb(palette.neutralDark.hex) : [14, 14, 16];

  // Helper: Draw Swiss Registration Crosshairs
  const drawRegistrationMarks = (color: [number, number, number] = [200, 200, 210]) => {
    doc.setDrawColor(color[0], color[1], color[2]);
    doc.setLineWidth(0.15);
    const len = 3;
    const offset = 8;

    // Top Left
    doc.line(offset - len, offset, offset + len, offset);
    doc.line(offset, offset - len, offset, offset + len);

    // Top Right
    doc.line(pageWidth - offset - len, offset, pageWidth - offset + len, offset);
    doc.line(pageWidth - offset, offset - len, pageWidth - offset, offset + len);

    // Bottom Left
    doc.line(offset - len, pageHeight - offset, offset + len, pageHeight - offset);
    doc.line(offset, pageHeight - offset - len, offset, pageHeight - offset + len);

    // Bottom Right
    doc.line(pageWidth - offset - len, pageHeight - offset, pageWidth - offset + len, pageHeight - offset);
    doc.line(pageWidth - offset, pageHeight - offset - len, pageWidth - offset, pageHeight - offset + len);
  };

  // Helper: Running Page Header (Swiss Editorial Layout)
  const drawPageHeader = (sectionNum: string, sectionTitle: string, pageNum: number, totalPages: number = 6) => {
    drawRegistrationMarks([220, 222, 228]);

    // Section Category + Brand
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
    doc.text(`${sectionNum.toUpperCase()} / ${sectionTitle.toUpperCase()}`, margin, 14);

    // Center folio title
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(140, 140, 150);
    doc.text(`${brandName.toUpperCase()} · BRAND SPECIFICATION MANUAL`, pageWidth / 2, 14, { align: 'center' });

    // Page Number
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(90, 90, 100);
    doc.text(`${String(pageNum).padStart(2, '0')} / ${String(totalPages).padStart(2, '0')}`, pageWidth - margin, 14, { align: 'right' });

    // Hairline Rule
    doc.setDrawColor(220, 222, 228);
    doc.setLineWidth(0.25);
    doc.line(margin, 17, pageWidth - margin, 17);
  };

  // Helper: Running Page Footer
  const drawPageFooter = () => {
    doc.setDrawColor(225, 227, 232);
    doc.setLineWidth(0.25);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(150, 152, 160);
    doc.text('CLIENT-SIDE SPECIFICATION · USAMA ZAHID STUDIO · CONFIDENTIAL & PROPRIETARY', margin, pageHeight - 8);

    doc.setFont('helvetica', 'bold');
    doc.text('OFFICIAL BRAND RECORD', pageWidth - margin, pageHeight - 8, { align: 'right' });
  };

  // ==========================================
  // PAGE 1: LUXURY EDITORIAL COVER
  // ==========================================
  // Rich Obsidian Background
  doc.setFillColor(9, 10, 13);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Registration crosshairs in soft grey
  drawRegistrationMarks([60, 62, 70]);

  // Accent vertical stripe
  doc.setFillColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
  doc.rect(margin, 26, 3, 20, 'F');

  // System Eyebrow
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
  doc.text('BRAND IDENTITY MANUAL · 2026 OFFICIAL SPECIFICATION', margin + 7, 31);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(160, 163, 175);
  doc.text(`${industry.toUpperCase()} SECTOR · MASTER COMPENDIUM`, margin + 7, 37);

  // Large Brand Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(36);
  doc.setTextColor(253, 253, 255);
  doc.text(brandName, margin, 64);

  if (tagline) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(13);
    doc.setTextColor(180, 184, 198);
    doc.text(`"${tagline}"`, margin, 74);
  }

  // Cover Logo Exhibition Showcase Box
  const showcaseY = tagline ? 86 : 80;
  const showcaseHeight = 120;
  doc.setFillColor(18, 19, 24);
  doc.roundedRect(margin, showcaseY, contentWidth, showcaseHeight, 3, 3, 'F');

  // Subtle border
  doc.setDrawColor(40, 42, 52);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, showcaseY, contentWidth, showcaseHeight, 3, 3, 'D');

  // Subtle interior grid cross on logo box
  doc.setDrawColor(28, 30, 38);
  doc.line(margin + contentWidth / 2, showcaseY + 10, margin + contentWidth / 2, showcaseY + showcaseHeight - 10);
  doc.line(margin + 20, showcaseY + showcaseHeight / 2, margin + contentWidth - 20, showcaseY + showcaseHeight / 2);

  // Render centered logo
  try {
    const logoBoxSize = 58;
    const logoX = margin + (contentWidth - logoBoxSize) / 2;
    const logoY = showcaseY + (showcaseHeight - logoBoxSize) / 2;
    doc.addImage(darkCoverLogoDataUrl, 'PNG', logoX, logoY, logoBoxSize, logoBoxSize, undefined, 'FAST');
  } catch (e) {
    console.warn('PDF cover logo rendering note', e);
  }

  // Showcase Label
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
  doc.text('FIG 01. PRIMARY MARK SPECIMEN', margin + 8, showcaseY + 10);

  // Folio Details Grid (4 Columns)
  const metaY = 236;
  const colW = contentWidth / 4;

  const coverMetas = [
    { label: 'DOCUMENT ID', val: `UZ-BK-${Math.random().toString(36).substring(2, 7).toUpperCase()}` },
    { label: 'DESIGN STUDIO', val: 'Usama Zahid' },
    { label: 'RELEASE CYCLE', val: 'v1.0 Production' },
    { label: 'DATE OF ISSUE', val: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) },
  ];

  // Subtle separator line above meta
  doc.setDrawColor(32, 34, 42);
  doc.setLineWidth(0.3);
  doc.line(margin, metaY - 8, margin + contentWidth, metaY - 8);

  coverMetas.forEach((m, idx) => {
    const mx = margin + idx * colW;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(140, 143, 155);
    doc.text(m.label, mx, metaY);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(245, 245, 250);
    doc.text(m.val, mx, metaY + 6);
  });

  // Bottom Notice
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 103, 115);
  doc.text('This specification serves as the authoritative identity reference for all digital applications, physical press, and corporate collateral.', margin, pageHeight - 16);

  // ==========================================
  // PAGE 2: LOGO SCALABILITY HEURISTIC AUDIT
  // ==========================================
  doc.addPage();
  drawPageHeader('01', 'Scalability Audit & Technical Heuristics', 2);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(18, 19, 24);
  doc.text('Multi-Scale Heuristic Diagnostics', margin, 27);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 103, 115);
  doc.text(
    'Deterministic 7-tier Canvas audit testing optical legibility, silhouette erosion, and reproduction fidelity.',
    margin,
    33
  );

  if (scalability) {
    // Top Hero Score Card
    const scoreCardY = 38;
    const scoreCardH = 40;
    doc.setFillColor(247, 248, 252);
    doc.roundedRect(margin, scoreCardY, contentWidth, scoreCardH, 2, 2, 'F');
    doc.setDrawColor(228, 230, 238);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, scoreCardY, contentWidth, scoreCardH, 2, 2, 'D');

    // Score Pillar
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(32);
    doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
    doc.text(scalability.overallScore.toFixed(1), margin + 8, scoreCardY + 22);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(130, 133, 145);
    doc.text('/ 10', margin + 38, scoreCardY + 22);

    // Status Pill
    const tierColor: [number, number, number] =
      scalability.overallScore >= 8.5 ? [16, 149, 106] : scalability.overallScore >= 6.5 ? [217, 119, 6] : [220, 38, 38];
    doc.setFillColor(tierColor[0], tierColor[1], tierColor[2]);
    doc.roundedRect(margin + 8, scoreCardY + 28, 38, 6.5, 1, 1, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text(scalability.tierLabel.toUpperCase(), margin + 27, scoreCardY + 32.5, { align: 'center' });

    // Verdict and metadata columns
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(20, 22, 28);
    doc.text(`VERDICT: ${scalability.verdict.toUpperCase()}`, margin + 58, scoreCardY + 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(90, 93, 105);
    doc.text(`• Aspect Ratio: ${scalability.aspectRatio}:1 (${scalability.boundingWidth} × ${scalability.boundingHeight}px bounds)`, margin + 58, scoreCardY + 19);
    doc.text(`• Format Geometry: ${scalability.isSvg ? 'Vector Scalable (SVG)' : 'Raster Fixed-Density (PNG/JPG)'}`, margin + 58, scoreCardY + 25);
    doc.text(`• Internal Complexity: ${scalability.hasGradients ? 'Multi-stop gradients detected' : 'Flat solid fills'} · Hairline strokes: ${scalability.thinStrokeDetected ? 'Risk flag' : 'Safe thickness'}`, margin + 58, scoreCardY + 31);

    // 7 Sub-Test Evaluation Matrix Table
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(20, 22, 28);
    doc.text('Sub-Test Breakdown Matrix', margin, 87);

    let rowY = 93;
    scalability.subTests.forEach((t, i) => {
      // Row background
      doc.setFillColor(i % 2 === 0 ? 250 : 255, i % 2 === 0 ? 250 : 255, i % 2 === 0 ? 253 : 255);
      doc.rect(margin, rowY, contentWidth, 14, 'F');
      doc.setDrawColor(238, 240, 246);
      doc.setLineWidth(0.2);
      doc.line(margin, rowY + 14, margin + contentWidth, rowY + 14);

      // Test Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(25, 27, 33);
      doc.text(t.name, margin + 4, rowY + 6);

      // Score Value
      const isSubPass = t.score >= 7.0;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(isSubPass ? primaryRgb[0] : 217, isSubPass ? primaryRgb[1] : 119, isSubPass ? primaryRgb[2] : 6);
      doc.text(`${t.score.toFixed(1)} / 10`, margin + 78, rowY + 6);

      // Score Progress Bar
      doc.setFillColor(225, 228, 235);
      doc.rect(margin + 98, rowY + 3, 24, 3, 'F');
      doc.setFillColor(isSubPass ? primaryRgb[0] : 217, isSubPass ? primaryRgb[1] : 119, isSubPass ? primaryRgb[2] : 6);
      doc.rect(margin + 98, rowY + 3, (t.score / 10) * 24, 3, 'F');

      // Weight
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(130, 133, 145);
      doc.text(`Weight: ${t.weight}%`, margin + 128, rowY + 6);

      // Architectural Rationale
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(85, 88, 100);
      const safeReason = t.reason.length > 110 ? t.reason.substring(0, 107) + '...' : t.reason;
      doc.text(safeReason, margin + 4, rowY + 11.5);

      rowY += 15;
    });

    // Actionable Remediation Box
    const issues = scalability.issues && scalability.issues.length > 0
      ? scalability.issues
      : ['Mark exhibits robust edge density and requires no structural geometry overhaul.'];

    doc.setFillColor(255, 251, 240);
    doc.setDrawColor(245, 158, 11);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, rowY + 5, contentWidth, 38, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(180, 83, 9);
    doc.text('Engineered Production Recommendations:', margin + 6, rowY + 13);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(65, 68, 78);
    let recY = rowY + 20;
    issues.slice(0, 3).forEach((iss) => {
      const bullet = iss.length > 115 ? iss.substring(0, 112) + '...' : iss;
      doc.text(`•  ${bullet}`, margin + 6, recY);
      recY += 6;
    });
  }

  drawPageFooter();

  // ==========================================
  // PAGE 3: LOGO CONSTRUCTION & CLEAR SPACE
  // ==========================================
  doc.addPage();
  drawPageHeader('02', 'Logo Construction & Exclusion Perimeter', 3);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(18, 19, 24);
  doc.text('Clearance Envelope & Geometry Standards', margin, 27);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 103, 115);
  doc.text('Preserving visual prominence through strict mathematical exclusion zones and misuse bans.', margin, 33);

  // Technical Blueprint Frame
  const bpY = 38;
  const bpH = 82;
  doc.setFillColor(247, 249, 253);
  doc.rect(margin, bpY, contentWidth, bpH, 'F');
  doc.setDrawColor(218, 224, 238);
  doc.setLineWidth(0.3);
  doc.rect(margin, bpY, contentWidth, bpH, 'D');

  // Blueprint background grid lines
  doc.setDrawColor(235, 239, 248);
  doc.setLineWidth(0.15);
  for (let gx = margin + 10; gx < margin + contentWidth; gx += 10) {
    doc.line(gx, bpY, gx, bpY + bpH);
  }
  for (let gy = bpY + 10; gy < bpY + bpH; gy += 10) {
    doc.line(margin, gy, margin + contentWidth, gy);
  }

  // Draw Centered Mark inside Blueprint
  const bpLogoSize = 42;
  const bpLogoX = margin + (contentWidth - bpLogoSize) / 2;
  const bpLogoY = bpY + (bpH - bpLogoSize) / 2;
  try {
    doc.addImage(lightBlueprintLogoDataUrl, 'PNG', bpLogoX, bpLogoY, bpLogoSize, bpLogoSize, undefined, 'FAST');
  } catch (e) {
    console.warn('Blueprint logo render error', e);
  }

  // Clearance Safe Zone Box (Dashed)
  const clearancePad = 13;
  doc.setDrawColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
  doc.setLineWidth(0.4);
  doc.setLineDashPattern([2, 2], 0);
  doc.rect(bpLogoX - clearancePad, bpLogoY - clearancePad, bpLogoSize + clearancePad * 2, bpLogoSize + clearancePad * 2);
  doc.setLineDashPattern([], 0); // reset dash

  // Dimension indicators 'X'
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
  doc.text('X', bpLogoX + bpLogoSize / 2, bpLogoY - clearancePad - 2.5, { align: 'center' });
  doc.text('X', bpLogoX + bpLogoSize / 2, bpLogoY + bpLogoSize + clearancePad + 5.5, { align: 'center' });
  doc.text('X', bpLogoX - clearancePad - 3.5, bpLogoY + bpLogoSize / 2 + 1, { align: 'right' });
  doc.text('X', bpLogoX + bpLogoSize + clearancePad + 3.5, bpLogoY + bpLogoSize / 2 + 1, { align: 'left' });

  // Blueprint Bottom Label
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(90, 93, 105);
  doc.text('CLEARANCE COEFFICIENT: X = 25% OF TOTAL MARK HEIGHT (MINIMUM BUFFER ON ALL SIDES)', pageWidth / 2, bpY + bpH - 4, { align: 'center' });

  // Reproduction Thresholds Matrix (Digital vs Print)
  const threshY = bpY + bpH + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(20, 22, 28);
  doc.text('Reproduction Scale Thresholds', margin, threshY);

  const cardW = (contentWidth - 8) / 2;
  const cardH = 38;

  // Digital Card
  doc.setFillColor(248, 248, 251);
  doc.rect(margin, threshY + 5, cardW, cardH, 'F');
  doc.setDrawColor(228, 230, 238);
  doc.rect(margin, threshY + 5, cardW, cardH, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
  doc.text('DIGITAL DISPLAY (72 - 144 PPI)', margin + 6, threshY + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(60, 63, 75);
  doc.text('• Standalone Symbol: 20 × 20 px absolute minimum', margin + 6, threshY + 21);
  doc.text('• Full Horizontal Wordmark: 120 px minimum width', margin + 6, threshY + 27);
  doc.text('• App Icon Suite: 16px, 32px, 180px iOS Touch, 512px Store', margin + 6, threshY + 33);

  // Print Card
  doc.setFillColor(248, 248, 251);
  doc.rect(margin + cardW + 8, threshY + 5, cardW, cardH, 'F');
  doc.setDrawColor(228, 230, 238);
  doc.rect(margin + cardW + 8, threshY + 5, cardW, cardH, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
  doc.text('PRINT & PRESS (300 DPI OFFSET)', margin + cardW + 14, threshY + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(60, 63, 75);
  doc.text('• Standalone Symbol: 7.0 mm (0.28") minimum', margin + cardW + 14, threshY + 21);
  doc.text('• Full Horizontal Wordmark: 28.0 mm (1.10") minimum', margin + cardW + 14, threshY + 27);
  doc.text('• Strict Press Rule: Pure vector SVG or PDF spot plates only', margin + cardW + 14, threshY + 33);

  // Prohibited Misuses Grid
  const misuseY = threshY + cardH + 15;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(20, 22, 28);
  doc.text('Prohibited Misuses (Strict Integrity Rules)', margin, misuseY);

  const misrules = [
    { rule: 'Do Not Distort Ratio', desc: 'Never stretch, compress, or squash the vertical or horizontal proportions.' },
    { rule: 'Do Not Tilt or Rotate', desc: 'Never place the logo mark off its horizontal 0-degree baseline orientation.' },
    { rule: 'Do Not Alter Palette', desc: 'Never substitute specified brand color codes with arbitrary unapproved tints.' },
    { rule: 'Do Not Crowd Clearance', desc: 'Never intrude type, buttons, or photography inside exclusion perimeter X.' },
  ];

  let mRowY = misuseY + 6;
  misrules.forEach((mr, idx) => {
    doc.setFillColor(254, 243, 242);
    doc.rect(margin, mRowY, contentWidth, 10, 'F');
    doc.setDrawColor(254, 205, 202);
    doc.setLineWidth(0.2);
    doc.rect(margin, mRowY, contentWidth, 10, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(220, 38, 38);
    doc.text(`✕  RULE 0${idx + 1}: ${mr.rule.toUpperCase()}`, margin + 5, mRowY + 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 103, 115);
    doc.text(mr.desc, margin + 72, mRowY + 6.5);

    mRowY += 12;
  });

  drawPageFooter();

  // ==========================================
  // PAGE 4: COLOR ARCHITECTURE SYSTEM
  // ==========================================
  doc.addPage();
  drawPageHeader('03', 'Color Architecture & Chromatic Standards', 4);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(18, 19, 24);
  doc.text('Harmonic Color Palette & WCAG Ratios', margin, 27);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 103, 115);
  doc.text('Extracted chromatic DNA optimized for digital screens, CMYK offset press, and accessibility.', margin, 33);

  if (palette) {
    let swatchCardY = 40;
    const swatchCardH = 34;

    palette.all.forEach((col) => {
      const rgb = hexToRgb(col.hex);

      // Left Large Color Swatch
      doc.setFillColor(rgb[0], rgb[1], rgb[2]);
      doc.roundedRect(margin, swatchCardY, 28, swatchCardH, 1.5, 1.5, 'F');
      doc.setDrawColor(220, 222, 230);
      doc.setLineWidth(0.2);
      doc.roundedRect(margin, swatchCardY, 28, swatchCardH, 1.5, 1.5, 'D');

      // Right Metadata Card
      const metaBoxX = margin + 32;
      const metaBoxW = contentWidth - 32;
      doc.setFillColor(248, 248, 252);
      doc.roundedRect(metaBoxX, swatchCardY, metaBoxW, swatchCardH, 1.5, 1.5, 'F');
      doc.setDrawColor(228, 230, 238);
      doc.setLineWidth(0.2);
      doc.roundedRect(metaBoxX, swatchCardY, metaBoxW, swatchCardH, 1.5, 1.5, 'D');

      // Role pill + Color Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(20, 22, 28);
      doc.text(`${col.roleLabel.toUpperCase()}  ·  ${col.name}`, metaBoxX + 6, swatchCardY + 8);

      // Color Codes Table (HEX, RGB, CMYK, HSL)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
      doc.text(`HEX: ${col.hex}`, metaBoxX + 6, swatchCardY + 16);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(70, 73, 85);
      doc.text(`RGB: ${col.rgb.join(', ')}`, metaBoxX + 40, swatchCardY + 16);
      doc.text(`CMYK: C:${col.cmyk[0]} M:${col.cmyk[1]} Y:${col.cmyk[2]} K:${col.cmyk[3]}%`, metaBoxX + 80, swatchCardY + 16);

      // WCAG Compliance Scores
      const wcagPassWhite = col.wcagWhite !== 'Fail';
      const wcagPassDark = col.wcagDark !== 'Fail';

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(110, 113, 125);
      doc.text('ACCESSIBILITY COMPLIANCE:', metaBoxX + 6, swatchCardY + 23);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(wcagPassWhite ? 16 : 180, wcagPassWhite ? 149 : 40, wcagPassWhite ? 106 : 40);
      doc.text(`On Light: ${col.contrastOnWhite}:1 (${col.wcagWhite})`, metaBoxX + 46, swatchCardY + 23);

      doc.setTextColor(wcagPassDark ? 16 : 180, wcagPassDark ? 149 : 40, wcagPassDark ? 106 : 40);
      doc.text(`On Dark: ${col.contrastOnDark}:1 (${col.wcagDark})`, metaBoxX + 92, swatchCardY + 23);

      // 5-step tint ladder strip at the bottom of the card
      const ladderY = swatchCardY + 27;
      const ladderW = 20;
      const ladderH = 4;
      col.tints.slice(0, 5).forEach((tHex, tIdx) => {
        const tRgb = hexToRgb(tHex);
        doc.setFillColor(tRgb[0], tRgb[1], tRgb[2]);
        doc.rect(metaBoxX + 6 + tIdx * (ladderW + 1), ladderY, ladderW, ladderH, 'F');
      });

      swatchCardY += swatchCardH + 6;
    });
  }

  drawPageFooter();

  // ==========================================
  // PAGE 5: TYPOGRAPHY SYSTEM
  // ==========================================
  doc.addPage();
  drawPageHeader('04', 'Typographic Hierarchy & Specimen', 5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(18, 19, 24);
  doc.text('Typographic System & Specimen', margin, 27);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 103, 115);
  doc.text('Harmonic dual-font pairing engineered for editorial impact, screen legibility, and technical UI.', margin, 33);

  const pair = selectedFontPair || {
    headingFont: 'Space Grotesk',
    bodyFont: 'Inter',
    category: 'Technology & SaaS',
    description: 'Crisp geometric monoline display headlines balanced by the universal legibility of Inter.',
  };

  // Typography Showcase Header Box
  const fontBoxY = 40;
  const fontBoxH = 34;
  doc.setFillColor(247, 248, 252);
  doc.roundedRect(margin, fontBoxY, contentWidth, fontBoxH, 2, 2, 'F');
  doc.setDrawColor(228, 230, 238);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, fontBoxY, contentWidth, fontBoxH, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
  doc.text(`${pair.headingFont}  +  ${pair.bodyFont}`, margin + 8, fontBoxY + 12);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(80, 83, 95);
  doc.text(`EDITORIAL CLASSIFICATION: ${pair.category.toUpperCase()}`, margin + 8, fontBoxY + 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 103, 115);
  doc.text(pair.description, margin + 8, fontBoxY + 27);

  // Glyphs Specimen Card
  const specY = fontBoxY + fontBoxH + 8;
  const specH = 42;
  doc.setFillColor(252, 252, 254);
  doc.roundedRect(margin, specY, contentWidth, specH, 2, 2, 'F');
  doc.setDrawColor(230, 232, 240);
  doc.setLineWidth(0.2);
  doc.roundedRect(margin, specY, contentWidth, specH, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
  doc.text('PRIMARY TYPE SPECIMEN GLYPH SET', margin + 8, specY + 8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(25, 27, 33);
  doc.text('Aa Bb Gg Rr 1 2 3 & ? %', margin + 8, specY + 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(90, 93, 105);
  doc.text('A B C D E F G H I J K L M N O P Q R S T U V W X Y Z', margin + 8, specY + 29);
  doc.text('a b c d e f g h i j k l m n o p q r s t u v w x y z · 0 1 2 3 4 5 6 7 8 9 · ! @ # $ % ^ & * ( ) _ +', margin + 8, specY + 36);

  // 7-Tier Scale Ladder
  const scaleY = specY + specH + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(20, 22, 28);
  doc.text('Modular Scale Ladder (1.250 Major Third)', margin, scaleY);

  const scaleRows = [
    { level: 'Display Hero', size: '48 px', lh: '1.10', font: pair.headingFont, usage: 'High-impact landing hero statements, brand billboard moments' },
    { level: 'Heading 1', size: '36 px', lh: '1.20', font: pair.headingFont, usage: 'Primary page section headings and case study chapter openers' },
    { level: 'Heading 2', size: '28 px', lh: '1.25', font: pair.headingFont, usage: 'Major component titles, dialog headers, and studio card groups' },
    { level: 'Heading 3', size: '20 px', lh: '1.30', font: pair.headingFont, usage: 'Sub-section labels, modal titles, and feature module headers' },
    { level: 'Body Large', size: '18 px', lh: '1.50', font: pair.bodyFont, usage: 'Lead paragraphs, editorial thesis statements, and product intros' },
    { level: 'Body Regular', size: '15 px', lh: '1.60', font: pair.bodyFont, usage: 'Universal reading text, multi-line documentation, and narrative' },
    { level: 'Caption / Meta', size: '12 px', lh: '1.40', font: pair.bodyFont, usage: 'Legal disclaimers, micro metadata, time stamps, and card tags' },
  ];

  let ladderRowY = scaleY + 5;
  scaleRows.forEach((r, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 250 : 255, idx % 2 === 0 ? 250 : 255, idx % 2 === 0 ? 253 : 255);
    doc.rect(margin, ladderRowY, contentWidth, 13, 'F');
    doc.setDrawColor(238, 240, 246);
    doc.setLineWidth(0.2);
    doc.line(margin, ladderRowY + 13, margin + contentWidth, ladderRowY + 13);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(25, 27, 33);
    doc.text(r.level, margin + 5, ladderRowY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(110, 113, 125);
    doc.text(`${r.size} / ${r.lh}`, margin + 42, ladderRowY + 5.5);
    doc.text(`Font: ${r.font}`, margin + 82, ladderRowY + 5.5);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(90, 93, 105);
    doc.text(r.usage, margin + 5, ladderRowY + 10.5);

    ladderRowY += 14;
  });

  drawPageFooter();

  // ==========================================
  // PAGE 6: BRAND STRATEGY & VOICE BLUEPRINT
  // ==========================================
  doc.addPage();
  drawPageHeader('05', 'Brand Voice & Strategic Positioning', 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(18, 19, 24);
  doc.text('Brand Narrative, Voice & Guidelines', margin, 27);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 103, 115);
  doc.text('Authoritative communication standards ensuring unified messaging across all digital & physical surfaces.', margin, 33);

  // Derive strategic narrative
  const missionText = aiCopy?.mission ||
    `${brandName} exists to engineer intentional, high-performance brand experiences within the ${industry} ecosystem—fusing uncompromising precision with enduring human clarity.`;

  const storyText = aiCopy?.brandStory ||
    `Rooted in the pursuit of architectural excellence, ${brandName} bridges foundational design rigor with state-of-the-art technological execution. Every brand touchpoint—from digital micro-interactions to international physical collateral—reflects deliberate intent, technical perfection, and sovereign identity.`;

  const voiceKeywords = (aiCopy?.voiceWords && aiCopy.voiceWords.length >= 3)
    ? aiCopy.voiceWords
    : ['Architectural', 'Direct & Minimal', 'Empathetic', 'Visionary', 'Sovereign'];

  // Mission Callout Card
  const stratY = 40;
  doc.setFillColor(248, 249, 253);
  doc.roundedRect(margin, stratY, contentWidth, 38, 2, 2, 'F');
  doc.setDrawColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
  doc.setLineWidth(1.2);
  doc.line(margin, stratY, margin, stratY + 38);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
  doc.text('CORE PURPOSE & MISSION STATEMENT', margin + 8, stratY + 9);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(20, 22, 28);
  const missionLines = doc.splitTextToSize(`"${missionText}"`, contentWidth - 16);
  doc.text(missionLines, margin + 8, stratY + 18);

  // Brand Story Block
  const storyY = stratY + 44;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(20, 22, 28);
  doc.text('Strategic Brand Narrative', margin, storyY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(70, 73, 85);
  const storyLines = doc.splitTextToSize(storyText, contentWidth);
  doc.text(storyLines, margin, storyY + 6);

  // Voice Attributes Strip (5 Pills)
  const voicePillsY = storyY + 28;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(20, 22, 28);
  doc.text('Brand Personality Pillars', margin, voicePillsY);

  const pillW = (contentWidth - 16) / 5;
  voiceKeywords.slice(0, 5).forEach((v, idx) => {
    const px = margin + idx * (pillW + 4);
    doc.setFillColor(245, 246, 250);
    doc.roundedRect(px, voicePillsY + 5, pillW, 14, 1.5, 1.5, 'F');
    doc.setDrawColor(228, 230, 238);
    doc.setLineWidth(0.2);
    doc.roundedRect(px, voicePillsY + 5, pillW, 14, 1.5, 1.5, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
    doc.text(`0${idx + 1}`, px + 4, voicePillsY + 11);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(25, 27, 33);
    doc.text(v, px + 4, voicePillsY + 16);
  });

  // Do's and Don'ts Matrix
  const doY = voicePillsY + 28;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(20, 22, 28);
  doc.text('Voice & Editorial Governance (Do’s and Don’ts)', margin, doY);

  const defaultDosDonts = [
    { do: 'Lead with clarity, brevity, and decisive active verbs.', dont: 'Avoid buzzword density, vague marketing hyperbole, and passive fluff.' },
    { do: 'Speak directly with quiet confidence and architectural conviction.', dont: 'Never sound apologetic, arrogant, or hyperactive with exclamation marks.' },
    { do: 'Back every product claim with observable utility and craft.', dont: 'Never make promises unsupported by functional engineering standards.' },
  ];

  const dosAndDonts = aiCopy?.dosAndDonts && aiCopy.dosAndDonts.length > 0 ? aiCopy.dosAndDonts : defaultDosDonts;

  let ruleBoxY = doY + 6;
  dosAndDonts.slice(0, 3).forEach((dd) => {
    const halfW = (contentWidth - 6) / 2;

    // DO Box
    doc.setFillColor(243, 251, 247);
    doc.rect(margin, ruleBoxY, halfW, 13, 'F');
    doc.setDrawColor(187, 247, 208);
    doc.setLineWidth(0.2);
    doc.rect(margin, ruleBoxY, halfW, 13, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(16, 149, 106);
    doc.text('✓  DO', margin + 4, ruleBoxY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(40, 43, 50);
    const doLines = doc.splitTextToSize(dd.do, halfW - 8);
    doc.text(doLines, margin + 4, ruleBoxY + 9.5);

    // DONT Box
    doc.setFillColor(254, 243, 242);
    doc.rect(margin + halfW + 6, ruleBoxY, halfW, 13, 'F');
    doc.setDrawColor(254, 205, 202);
    doc.setLineWidth(0.2);
    doc.rect(margin + halfW + 6, ruleBoxY, halfW, 13, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(220, 38, 38);
    doc.text('✕  DON’T', margin + halfW + 10, ruleBoxY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(40, 43, 50);
    const dontLines = doc.splitTextToSize(dd.dont, halfW - 8);
    doc.text(dontLines, margin + halfW + 10, ruleBoxY + 9.5);

    ruleBoxY += 16;
  });

  // Designer Authentication Seal & Sign-Off
  const sealY = ruleBoxY + 6;
  doc.setFillColor(247, 248, 252);
  doc.roundedRect(margin, sealY, contentWidth, 24, 2, 2, 'F');
  doc.setDrawColor(228, 230, 238);
  doc.setLineWidth(0.2);
  doc.roundedRect(margin, sealY, contentWidth, 24, 2, 2, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
  doc.text('SYSTEM SPECIFICATION ATTESTATION', margin + 6, sealY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(90, 93, 105);
  doc.text('Certified by Usama Zahid Studio · Senior Brand & Product Designer', margin + 6, sealY + 14);
  doc.text('Engineered client-side via in-browser Canvas heuristic analyzer · usamazahid.design', margin + 6, sealY + 19);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(25, 27, 33);
  doc.text('AUTHENTICATED BRAND SYSTEM', pageWidth - margin - 6, sealY + 14, { align: 'right' });

  drawPageFooter();

  // Return generated PDF as Blob
  return doc.output('blob');
}
