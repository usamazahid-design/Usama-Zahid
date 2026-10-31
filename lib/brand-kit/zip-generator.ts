import { BrandKitState } from './types';
import { generateBrandGuidelinesPdf } from './pdf-generator';
import { MOCKUP_TEMPLATES, renderMockupCanvas } from './mockups-config';

/**
 * Creates pure monochrome black or white logo PNG
 */
function createMonochromeLogo(logoDataUrl: string, mode: 'white' | 'black'): Promise<Blob> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      canvas.toBlob((b) => resolve(b || new Blob()), 'image/png');
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const w = img.naturalWidth || 512;
      const h = img.naturalHeight || 512;
      const scale = Math.min(480 / w, 480 / h);
      const dw = w * scale;
      const dh = h * scale;
      const dx = (512 - dw) / 2;
      const dy = (512 - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);

      const imgData = ctx.getImageData(0, 0, 512, 512);
      const d = imgData.data;

      for (let i = 0; i < d.length; i += 4) {
        const a = d[i + 3];
        if (a > 20) {
          if (mode === 'white') {
            d[i] = 255;
            d[i + 1] = 255;
            d[i + 2] = 255;
          } else {
            d[i] = 0;
            d[i + 1] = 0;
            d[i + 2] = 0;
          }
        }
      }
      ctx.putImageData(imgData, 0, 0);
      canvas.toBlob((blob) => resolve(blob || new Blob()), 'image/png');
    };
    img.onerror = () => canvas.toBlob((b) => resolve(b || new Blob()), 'image/png');
    img.src = logoDataUrl;
  });
}

/**
 * Creates resized favicon or app icon PNG with centered aspect fit
 */
function createResizedIcon(logoDataUrl: string, size: number): Promise<Blob> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      canvas.toBlob((b) => resolve(b || new Blob()), 'image/png');
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      const w = img.naturalWidth || size;
      const h = img.naturalHeight || size;
      const scale = Math.min(size / w, size / h);
      const dw = w * scale;
      const dh = h * scale;
      const dx = (size - dw) / 2;
      const dy = (size - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
      canvas.toBlob((blob) => resolve(blob || new Blob()), 'image/png');
    };
    img.onerror = () => canvas.toBlob((b) => resolve(b || new Blob()), 'image/png');
    img.src = logoDataUrl;
  });
}

function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(',');
  const mimeMatch = parts[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';

  if (parts[0].includes(';base64')) {
    const bstr = atob(parts[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } else {
    // URL-encoded SVG data URL
    const decoded = decodeURIComponent(parts[1] || '');
    return new Blob([decoded], { type: mime || 'image/svg+xml' });
  }
}

export async function generateBrandKitZip(
  state: BrandKitState,
  onProgress?: (status: string) => void
): Promise<Blob> {
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();

  const slug = state.brandName.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'brand';

  // 1. Guidelines PDF
  onProgress?.('Generating multi-page brand guidelines PDF...');
  const pdfBlob = await generateBrandGuidelinesPdf(state);
  zip.file(`01_Guidelines/${slug}-brand-guidelines.pdf`, pdfBlob);

  // 2. Logos & Monochromes
  onProgress?.('Packaging logo variants & monochrome assets...');
  const originalBlob = dataUrlToBlob(state.logoDataUrl);
  const ext = state.isSvg ? 'svg' : 'png';
  zip.file(`02_Logos/logo-original.${ext}`, originalBlob);

  const whiteLogo = await createMonochromeLogo(state.logoDataUrl, 'white');
  zip.file(`02_Logos/logo-monochrome-white.png`, whiteLogo);

  const blackLogo = await createMonochromeLogo(state.logoDataUrl, 'black');
  zip.file(`02_Logos/logo-monochrome-black.png`, blackLogo);

  const favicon32 = await createResizedIcon(state.logoDataUrl, 32);
  zip.file(`02_Logos/favicon-32x32.png`, favicon32);

  const appIcon180 = await createResizedIcon(state.logoDataUrl, 180);
  zip.file(`02_Logos/app-icon-180x180.png`, appIcon180);

  // 3. Colors
  if (state.palette) {
    onProgress?.('Exporting design tokens & color palette...');
    const paletteJson = JSON.stringify(
      {
        brand: state.brandName,
        industry: state.industry,
        tokens: state.palette.all.map((c) => ({
          role: c.role,
          name: c.name,
          hex: c.hex,
          rgb: c.rgb,
          hsl: c.hsl,
          cmyk: c.cmyk,
          contrastOnWhite: c.contrastOnWhite,
          contrastOnDark: c.contrastOnDark,
          wcagWhite: c.wcagWhite,
          wcagDark: c.wcagDark,
          tints: c.tints,
          shades: c.shades,
        })),
      },
      null,
      2
    );
    zip.file(`03_Colors/color-palette.json`, paletteJson);

    let swatchesTxt = `${state.brandName.toUpperCase()} — BRAND COLOR SYSTEM\n\n`;
    state.palette.all.forEach((col) => {
      swatchesTxt += `[${col.roleLabel.toUpperCase()}] ${col.name}\n`;
      swatchesTxt += `HEX: ${col.hex} | RGB: rgb(${col.rgb.join(', ')}) | CMYK: C:${col.cmyk[0]} M:${col.cmyk[1]} Y:${col.cmyk[2]} K:${col.cmyk[3]}%\n`;
      swatchesTxt += `WCAG Contrast: ${col.contrastOnWhite}:1 on White (${col.wcagWhite}) · ${col.contrastOnDark}:1 on Dark (${col.wcagDark})\n\n`;
    });
    zip.file(`03_Colors/color-swatches.txt`, swatchesTxt);
  }

  // 4. Mockups
  onProgress?.('Rendering 6 high-res composite mockups...');
  const mockupBrandCtx = {
    brandName: state.brandName,
    tagline: state.tagline,
    industry: state.industry,
    primaryColor: state.palette?.primary?.hex,
    accentColor: state.palette?.accent?.hex,
  };
  for (const tpl of MOCKUP_TEMPLATES) {
    try {
      const dataUrl = await renderMockupCanvas(tpl, state.logoDataUrl, 'auto', mockupBrandCtx);
      if (dataUrl) {
        const mockupBlob = dataUrlToBlob(dataUrl);
        zip.file(`04_Mockups/mockup-${tpl.id}.png`, mockupBlob);
      }
    } catch (err) {
      console.warn(`Failed to package mockup ${tpl.id}`, err);
    }
  }

  // 5. Scalability Audit Report
  if (state.scalability) {
    onProgress?.('Documenting scalability audit report...');
    let auditReport = `=======================================================\n`;
    auditReport += `  LOGO SCALABILITY AUDIT REPORT: ${state.brandName.toUpperCase()}\n`;
    auditReport += `=======================================================\n\n`;
    auditReport += `OVERALL SCORE: ${state.scalability.overallScore.toFixed(1)} / 10\n`;
    auditReport += `VERDICT: ${state.scalability.verdict}\n`;
    auditReport += `TIER: ${state.scalability.tierLabel}\n`;
    auditReport += `ASPECT RATIO: ${state.scalability.aspectRatio}:1\n`;
    auditReport += `VECTOR SOURCE: ${state.scalability.isSvg ? 'Yes (SVG)' : 'No (Raster)'}\n\n`;

    auditReport += `SUB-TEST BREAKDOWN:\n`;
    auditReport += `-------------------------------------------------------\n`;
    state.scalability.subTests.forEach((t) => {
      auditReport += `• ${t.name} (Weight ${t.weight}%): ${t.score.toFixed(1)}/10 [${t.status.toUpperCase()}]\n`;
      auditReport += `  ${t.reason}\n\n`;
    });

    if (state.scalability.issues.length > 0) {
      auditReport += `RECOMMENDED DESIGNER CORRECTIONS:\n`;
      auditReport += `-------------------------------------------------------\n`;
      state.scalability.issues.forEach((iss, idx) => {
        auditReport += `${idx + 1}. ${iss}\n`;
      });
    }

    zip.file(`05_Audit/logo-scalability-audit.txt`, auditReport);
  }

  // README
  const readme = `BRAND ASSETS HANDOFF PACKAGE
============================
Brand: ${state.brandName}
Industry: ${state.industry}
Specification: v1.0
Generated: ${new Date().toISOString()}
Author: Usama Zahid Studio · usamazahid.design

DIRECTORY STRUCTURE:
- 01_Guidelines/: Vector multi-page brand manual PDF.
- 02_Logos/: Original mark, pure white/black monochromes, 32px favicon, 180px app icon.
- 03_Colors/: JSON design tokens for development and print text swatches.
- 04_Mockups/: 6 high-resolution composite collateral mockups.
- 05_Audit/: Full 7-factor logo scalability analysis text report.

Processed 100% client-side via Brand Kit Studio.
`;
  zip.file(`README.txt`, readme);

  onProgress?.('Compressing ZIP archive...');
  return await zip.generateAsync({ type: 'blob' });
}
