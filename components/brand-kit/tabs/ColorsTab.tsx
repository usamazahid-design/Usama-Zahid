'use client';

import React, { useState } from 'react';
import { ColorPalette, ExtractedColor } from '@/lib/brand-kit/types';
import { updatePaletteRoleHex } from '@/lib/brand-kit/color-extractor';

interface ColorsTabProps {
  palette: ColorPalette;
  brandName?: string;
  onUpdatePalette?: (newPalette: ColorPalette) => void;
}

export default function ColorsTab({ palette, brandName = 'Brand', onUpdatePalette }: ColorsTabProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [tokenFormat, setTokenFormat] = useState<'css' | 'tailwind' | 'json' | 'figma'>('css');

  const copyToClipboard = (text: string, label: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2400);
    }
  };

  const handleRoleHexChange = (role: ExtractedColor['role'], newHex: string) => {
    if (!onUpdatePalette) return;
    const updated = updatePaletteRoleHex(palette, role, newHex);
    onUpdatePalette(updated);
  };

  const handleSwapWithPrimary = (targetRole: 'secondary' | 'accent') => {
    if (!onUpdatePalette) return;
    const oldPrimaryHex = palette.primary.hex;
    const targetHex = palette[targetRole].hex;
    let next = updatePaletteRoleHex(palette, 'primary', targetHex);
    next = updatePaletteRoleHex(next, targetRole, oldPrimaryHex);
    onUpdatePalette(next);
    setCopiedText(`Swapped ${palette[targetRole].roleLabel} with Primary`);
    setTimeout(() => setCopiedText(null), 2200);
  };

  const getWcagBadge = (tier: string, ratio: number) => {
    const isPass = tier !== 'Fail';
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase font-semibold border ${
          isPass
            ? 'text-[#00C7CE] border-[#00C7CE]/30 bg-[#00C7CE]/5'
            : 'text-[#EF4444] border-[#EF4444]/30 bg-[#EF4444]/5'
        }`}
      >
        <span>{ratio}:1</span>
        <span>&bull;</span>
        <span>{tier}</span>
      </span>
    );
  };

  // Generate export code strings
  const generateCssVariables = () => {
    const lines = [`:root {`, `  /* ${brandName} — Brand Color System */`];
    palette.all.forEach((c) => {
      const slug = c.role.replace(/([A-Z])/g, '-$1').toLowerCase();
      lines.push(`  --brand-${slug}: ${c.hex}; /* ${c.name} */`);
      lines.push(`  --brand-${slug}-rgb: ${c.rgb.join(', ')};`);
    });
    palette.primary.tints.forEach((t, i) => {
      lines.push(`  --brand-primary-tint-${(i + 1) * 100}: ${t};`);
    });
    palette.primary.shades.forEach((s, i) => {
      lines.push(`  --brand-primary-shade-${(i + 1) * 100}: ${s};`);
    });
    lines.push(`}`);
    return lines.join('\n');
  };

  const generateTailwindConfig = () => {
    return `// tailwind.config.js — ${brandName} Brand Tokens
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '${palette.primary.hex}',
          secondary: '${palette.secondary.hex}',
          accent: '${palette.accent.hex}',
          dark: '${palette.neutralDark.hex}',
          light: '${palette.neutralLight.hex}',
          primaryScale: {
            100: '${palette.primary.tints[4]}',
            200: '${palette.primary.tints[3]}',
            300: '${palette.primary.tints[1]}',
            500: '${palette.primary.hex}',
            700: '${palette.primary.shades[1]}',
            900: '${palette.primary.shades[3]}',
          },
        },
      },
    },
  },
};`;
  };

  const generateW3cTokensJson = () => {
    const obj: Record<string, unknown> = {
      $schema: 'https://tr.designtokens.org/format/',
      brand: brandName,
      color: Object.fromEntries(
        palette.all.map((c) => [
          c.role,
          {
            $value: c.hex,
            $type: 'color',
            $description: `${c.roleLabel} — ${c.name} (WCAG White: ${c.contrastOnWhite}:1, Dark: ${c.contrastOnDark}:1)`,
            rgb: c.rgb,
            cmyk: c.cmyk,
            tints: c.tints,
            shades: c.shades,
          },
        ])
      ),
    };
    return JSON.stringify(obj, null, 2);
  };

  const generateFigmaSvgBoard = () => {
    const cards = palette.all
      .map((c, idx) => {
        const x = 24 + idx * 192;
        const textFill = c.contrastOnWhite > c.contrastOnDark ? '#0E0E10' : '#FFFFFF';
        return `  <g transform="translate(${x}, 24)">
    <rect width="176" height="220" rx="8" fill="#141519" stroke="#27272F"/>
    <rect x="8" y="8" width="160" height="116" rx="4" fill="${c.hex}"/>
    <text x="18" y="108" fill="${textFill}" font-family="monospace" font-size="13" font-weight="bold">${c.hex}</text>
    <text x="16" y="148" fill="#FDFDFD" font-family="sans-serif" font-size="13" font-weight="bold">${c.name}</text>
    <text x="16" y="168" fill="#8E8E99" font-family="monospace" font-size="10">${c.roleLabel.toUpperCase()}</text>
    <text x="16" y="190" fill="#8E8E99" font-family="monospace" font-size="10">RGB: ${c.rgb.join(', ')}</text>
    <text x="16" y="206" fill="#8E8E99" font-family="monospace" font-size="10">CMYK: ${c.cmyk.join('/')}</text>
  </g>`;
      })
      .join('\n');

    return `<svg xmlns="http://www.w3.org/2000/svg" width="992" height="268" viewBox="0 0 992 268" fill="none">
  <rect width="992" height="268" rx="12" fill="#0A0B0E"/>
${cards}
</svg>`;
  };

  const activeTokenCode =
    tokenFormat === 'css'
      ? generateCssVariables()
      : tokenFormat === 'tailwind'
      ? generateTailwindConfig()
      : tokenFormat === 'json'
      ? generateW3cTokensJson()
      : generateFigmaSvgBoard();

  const renderColorCard = (color: ExtractedColor) => {
    const [c, m, y, k] = color.cmyk;
    const cmykString = `C:${c} M:${m} Y:${y} K:${k}`;
    const rgbString = `rgb(${color.rgb.join(', ')})`;
    const canSwap = color.role === 'secondary' || color.role === 'accent';

    return (
      <div
        key={color.role}
        className="border border-[var(--line)] bg-[var(--card)] flex flex-col justify-between overflow-hidden group hover:border-[var(--ind)]/60 transition-colors"
      >
        {/* Top Swatch with Live Color Picker & Copy */}
        <div
          className="h-36 w-full relative flex flex-col justify-between p-4 transition-colors"
          style={{ backgroundColor: color.hex }}
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-black/55 text-white backdrop-blur-sm border border-white/15">
              {color.roleLabel}
            </span>

            {canSwap && onUpdatePalette && (
              <button
                type="button"
                onClick={() => handleSwapWithPrimary(color.role as 'secondary' | 'accent')}
                title="Promote this color to Primary Brand Color"
                className="px-2 py-0.5 text-[10px] font-mono text-white bg-black/60 hover:bg-[var(--ind)] backdrop-blur-sm transition-colors cursor-pointer border border-white/25"
              >
                &uarr; Make Primary
              </button>
            )}
          </div>

          <div className="flex items-center justify-between w-full">
            {/* Native Color Picker Trigger + HEX Readout */}
            <label
              title="Click to fine-tune color HEX"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold px-2.5 py-1 bg-black/65 hover:bg-black/85 text-white backdrop-blur-sm border border-white/25 cursor-pointer transition-colors"
            >
              <input
                type="color"
                value={color.hex}
                onChange={(e) => handleRoleHexChange(color.role, e.target.value)}
                className="w-3.5 h-3.5 border-0 p-0 bg-transparent cursor-pointer"
              />
              <span>{color.hex}</span>
              <span className="text-[9px] opacity-75 font-normal">EDIT</span>
            </label>

            <button
              type="button"
              onClick={() => copyToClipboard(color.hex, `HEX (${color.hex})`)}
              className="px-2.5 py-1 text-[11px] font-mono text-white bg-black/65 hover:bg-black/90 backdrop-blur-sm transition-colors cursor-pointer border border-white/25"
            >
              Copy HEX
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ind)] font-semibold">
                {color.roleLabel}
              </span>
              <span className="font-mono text-[10px] text-[var(--mute)]">
                HSL({color.hsl[0]}&deg;, {color.hsl[1]}%, {color.hsl[2]}%)
              </span>
            </div>

            <h4 className="font-sans font-bold text-lg text-[var(--ink)] mb-4">
              {color.name}
            </h4>

            {/* Color Value Readouts */}
            <div className="space-y-2 text-xs font-mono border-t border-[var(--line)] pt-3">
              <div className="flex items-center justify-between">
                <span className="text-[var(--mute)]">RGB:</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(rgbString, `RGB (${rgbString})`)}
                  className="text-[var(--ink)] hover:text-[var(--ind)] transition-colors cursor-pointer"
                >
                  {rgbString}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--mute)]">CMYK (Print):</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(cmykString, `CMYK (${cmykString})`)}
                  className="text-[var(--ink)] hover:text-[var(--ind)] transition-colors cursor-pointer"
                >
                  {cmykString}
                </button>
              </div>
            </div>

            {/* WCAG Contrast Ratings */}
            <div className="mt-4 pt-3 border-t border-[var(--line)] space-y-2">
              <span className="block font-mono text-[10px] uppercase text-[var(--mute)] tracking-wider">
                WCAG 2.1 Accessibility Contrast
              </span>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--mute)]">On White (#FFF):</span>
                {getWcagBadge(color.wcagWhite, color.contrastOnWhite)}
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--mute)]">On Dark (#0E0E10):</span>
                {getWcagBadge(color.wcagDark, color.contrastOnDark)}
              </div>
            </div>
          </div>

          {/* Tints & Shades Stepper */}
          <div className="pt-4 border-t border-[var(--line)] space-y-2">
            <span className="block font-mono text-[10px] uppercase text-[var(--mute)] tracking-wider">
              10-Step Tints &amp; Shades Scale
            </span>

            {/* Tints */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[9px] font-mono text-[var(--mute)]">
                <span>Tints (+White)</span>
                <span>Click swatch to copy</span>
              </div>
              <div className="grid grid-cols-5 gap-1 h-6">
                {color.tints.map((tint, i) => (
                  <button
                    key={i}
                    type="button"
                    title={`Tint ${i + 1}: ${tint}`}
                    onClick={() => copyToClipboard(tint, `Tint (${tint})`)}
                    className="w-full h-full border border-black/10 hover:scale-105 transition-transform cursor-pointer"
                    style={{ backgroundColor: tint }}
                  />
                ))}
              </div>
            </div>

            {/* Shades */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[9px] font-mono text-[var(--mute)]">
                <span>Shades (+Black)</span>
                <span>Click swatch to copy</span>
              </div>
              <div className="grid grid-cols-5 gap-1 h-6">
                {color.shades.map((shade, i) => (
                  <button
                    key={i}
                    type="button"
                    title={`Shade ${i + 1}: ${shade}`}
                    onClick={() => copyToClipboard(shade, `Shade (${shade})`)}
                    className="w-full h-full border border-white/10 hover:scale-105 transition-transform cursor-pointer"
                    style={{ backgroundColor: shade }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {/* Toast Notification */}
      {copiedText && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#0E0E10] text-[#00C7CE] border border-[#00C7CE]/40 px-4 py-3 shadow-2xl font-mono text-xs flex items-center gap-2 animate-fade-up">
          <span>&check;</span>
          <span>{copiedText}</span>
        </div>
      )}

      {/* Header Description */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[var(--line)]">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--ind)] block mb-1">
            Chromatic Architecture &bull; Interactive Palette Studio
          </span>
          <h2 className="font-sans text-2xl font-bold text-[var(--ink)]">
            Extracted Brand Color System
          </h2>
          <p className="font-sans text-xs text-[var(--mute)] mt-1 max-w-2xl leading-relaxed">
            Extracted using anti-alias-filtered Redmean quantization so exact brand HEX codes are preserved. Click any swatch&apos;s <strong>EDIT</strong> badge to customize colors or promote a secondary color to Primary.
          </p>
        </div>

        <button
          type="button"
          onClick={() => copyToClipboard(generateFigmaSvgBoard(), 'Figma SVG Swatch Board (Paste directly in Figma!)')}
          className="px-3.5 py-2 border border-[var(--ind)] bg-[var(--ind)]/10 hover:bg-[var(--ind)] text-[var(--ind)] hover:text-white text-xs font-mono font-semibold transition-colors cursor-pointer flex items-center gap-2"
        >
          <span>&#9670;</span>
          <span>Copy Swatches for Figma (SVG)</span>
        </button>
      </div>

      {/* 5-Color System Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {palette.all.map((col) => renderColorCard(col))}
      </div>

      {/* Surface Pairings Matrix */}
      <div className="p-8 border border-[var(--line)] bg-[var(--card)] space-y-6">
        <h3 className="font-sans font-semibold text-lg text-[var(--ink)] pb-4 border-b border-[var(--line)]">
          UI Surface Pairing &amp; Contrast Validation
        </h3>
        <p className="font-sans text-xs text-[var(--mute)] leading-relaxed max-w-2xl">
          Live UI component stress test showing how your Primary, Secondary, and Accent tokens perform across light, dark, and full-flood surfaces.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {/* Light Surface Container */}
          <div className="p-6 bg-[#FFFFFF] border border-[#040404]/10 space-y-4">
            <span className="font-mono text-[10px] text-[#5D5D66] uppercase block">01 · Light Canvas</span>
            <div
              className="px-4 py-2 text-center text-xs font-mono font-semibold"
              style={{
                backgroundColor: palette.primary.hex,
                color: palette.primary.contrastOnDark > palette.primary.contrastOnWhite ? '#FFFFFF' : '#040404',
              }}
            >
              Primary Action
            </div>
            <p className="text-[11px] text-[#040404] leading-relaxed">
              Editorial body copy on pure white paired with <strong>{palette.primary.name}</strong>.
            </p>
          </div>

          {/* Dark Surface Container */}
          <div className="p-6 bg-[#0E0E10] border border-[#FFFFFF]/10 space-y-4">
            <span className="font-mono text-[10px] text-[#B0B0BA] uppercase block">02 · Dark Canvas</span>
            <div
              className="px-4 py-2 text-center text-xs font-mono font-semibold"
              style={{
                backgroundColor: palette.accent.hex,
                color: palette.accent.contrastOnDark > palette.accent.contrastOnWhite ? '#FFFFFF' : '#040404',
              }}
            >
              Interactive Accent
            </div>
            <p className="text-[11px] text-[#FDFDFD] leading-relaxed">
              Dark theme surface paired with <strong>{palette.accent.name}</strong> interactive highlights.
            </p>
          </div>

          {/* Primary Flood Container */}
          <div
            className="p-6 space-y-4"
            style={{ backgroundColor: palette.primary.hex }}
          >
            <span
              className="font-mono text-[10px] uppercase block"
              style={{ color: palette.primary.contrastOnDark > palette.primary.contrastOnWhite ? '#FFFFFF' : '#040404' }}
            >
              03 · Primary Flood
            </span>
            <div className="px-4 py-2 text-center text-xs font-mono font-semibold bg-[#FFFFFF] text-[#040404]">
              Inverse Button
            </div>
            <p
              className="text-[11px] leading-relaxed"
              style={{ color: palette.primary.contrastOnDark > palette.primary.contrastOnWhite ? '#FFFFFF' : '#040404' }}
            >
              Hero banner, packaging exterior, or brand cover flood.
            </p>
          </div>

          {/* Neutral Charcoal Container */}
          <div
            className="p-6 space-y-4 border border-white/10"
            style={{ backgroundColor: palette.neutralDark.hex }}
          >
            <span className="font-mono text-[10px] text-[#B0B0BA] uppercase block">
              04 · Obsidian Surface
            </span>
            <div
              className="px-4 py-2 text-center text-xs font-mono font-semibold"
              style={{
                backgroundColor: palette.secondary.hex,
                color: palette.secondary.contrastOnDark > palette.secondary.contrastOnWhite ? '#FFFFFF' : '#040404',
              }}
            >
              Secondary Badge
            </div>
            <p className="text-[11px] text-[#E0E0E0] leading-relaxed">
              App shell, navigation chrome, and executive stationery back.
            </p>
          </div>
        </div>
      </div>

      {/* NEW: Developer & Designer Design Token Code Exporter */}
      <div className="p-8 border border-[var(--line)] bg-[var(--card)] space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ind)] block mb-0.5">
              Production Handoff Tokens
            </span>
            <h3 className="font-sans font-semibold text-lg text-[var(--ink)]">
              Export Color Tokens for Code &amp; Figma
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: 'css', label: 'CSS Variables' },
                { id: 'tailwind', label: 'Tailwind Config' },
                { id: 'json', label: 'W3C JSON' },
                { id: 'figma', label: 'Figma SVG' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTokenFormat(tab.id)}
                className={`px-3 py-1.5 text-xs font-mono border transition-colors cursor-pointer ${
                  tokenFormat === tab.id
                    ? 'border-[var(--ind)] bg-[var(--ind)] text-white font-semibold'
                    : 'border-[var(--line)] bg-[var(--bg)] text-[var(--mute)] hover:text-[var(--ink)]'
                }`}
              >
                {tab.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => copyToClipboard(activeTokenCode, `${tokenFormat.toUpperCase()} Tokens Copied`)}
              className="px-3.5 py-1.5 bg-[#00C7CE]/15 hover:bg-[#00C7CE] text-[#00C7CE] hover:text-black border border-[#00C7CE]/40 text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              Copy Code
            </button>
          </div>
        </div>

        <pre className="p-5 bg-[#090A0D] text-[#E4E4E7] border border-[var(--line)] font-mono text-xs overflow-x-auto leading-relaxed max-h-64">
          <code>{activeTokenCode}</code>
        </pre>
      </div>
    </div>
  );
}
