'use client';

import React from 'react';
import { ColorPalette, LogoVariants } from '@/lib/brand-kit/types';

interface GuidelinesTabProps {
  logoDataUrl: string;
  logoVariants?: LogoVariants;
  brandName: string;
  palette: ColorPalette;
}

export default function GuidelinesTab({ logoDataUrl, logoVariants, brandName, palette }: GuidelinesTabProps) {
  const lightBgLogo = logoVariants?.forLightBg || logoDataUrl;
  const darkBgLogo = logoVariants?.forDarkBg || logoDataUrl;
  const whiteMonoLogo = logoVariants?.whiteMono || darkBgLogo;
  const blackMonoLogo = logoVariants?.blackMono || lightBgLogo;

  const isPrimaryDark = palette.primary.contrastOnDark > palette.primary.contrastOnWhite;
  const isAccentDark = palette.accent.contrastOnDark > palette.accent.contrastOnWhite;

  const primaryBgLogo = isPrimaryDark ? darkBgLogo : lightBgLogo;
  const accentBgLogo = isAccentDark ? darkBgLogo : lightBgLogo;

  const downloadVariantPng = (url: string, suffix: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brandName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-logo-${suffix}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-[var(--line)]">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--ind)] block mb-1">
          Brand Standards &bull; Logo Integrity
        </span>
        <h2 className="font-sans text-2xl font-bold text-[var(--ink)]">
          Logo Construction &amp; Usage Specifications
        </h2>
        <p className="font-sans text-xs text-[var(--mute)] mt-1 max-w-xl">
          Rules governing adaptive light/dark lockups, clear space exclusion zones, minimum digital/print reproduction sizes, approved background canvases, and prohibited modifications.
        </p>
      </div>

      {/* Adaptive Logo Lockup Variants (Auto-Generated) */}
      <div className="p-8 border border-[var(--line)] bg-[var(--card)] space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
          <div>
            <h3 className="font-sans font-semibold text-lg text-[var(--ink)]">
              Adaptive Logo Lockup Suite (Light &amp; Dark Polarity)
            </h3>
            <p className="font-sans text-xs text-[var(--mute)] mt-0.5">
              Automatically synthesized high-contrast lockups ensuring your SVG/PNG mark remains crisp on both light and dark surfaces.
            </p>
          </div>
          <span className="font-mono text-xs text-emerald-400 font-semibold px-2.5 py-1 border border-emerald-500/30 bg-emerald-500/10">
            &#10003; Auto-Contrast Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Variant 1: For Light Surfaces */}
          <div className="border border-[var(--line)] bg-[var(--bg)] flex flex-col justify-between">
            <div className="p-6 bg-[#FFFFFF] flex items-center justify-center min-h-[150px] border-b border-[var(--line)]">
              <img src={lightBgLogo} alt="Light Surface Lockup" className="max-w-[140px] max-h-[84px] object-contain" />
            </div>
            <div className="p-4 flex items-center justify-between gap-2">
              <div>
                <span className="font-mono text-xs font-bold text-[var(--ink)] block">01. Light Surface</span>
                <span className="font-mono text-[10px] text-[var(--mute)]">Positive Lockup</span>
              </div>
              <button
                type="button"
                onClick={() => downloadVariantPng(lightBgLogo, 'for-light-bg')}
                className="px-2.5 py-1 text-[10px] font-mono border border-[var(--line)] hover:border-[var(--ind)] text-[var(--ink)] hover:text-[var(--ind)] transition-colors cursor-pointer"
              >
                PNG &darr;
              </button>
            </div>
          </div>

          {/* Variant 2: For Dark Surfaces */}
          <div className="border border-[var(--line)] bg-[var(--bg)] flex flex-col justify-between">
            <div className="p-6 bg-[#0E0E10] flex items-center justify-center min-h-[150px] border-b border-[var(--line)]">
              <img src={darkBgLogo} alt="Dark Surface Lockup" className="max-w-[140px] max-h-[84px] object-contain" />
            </div>
            <div className="p-4 flex items-center justify-between gap-2">
              <div>
                <span className="font-mono text-xs font-bold text-[var(--ink)] block">02. Dark Surface</span>
                <span className="font-mono text-[10px] text-[var(--mute)]">Inverted / Light Lockup</span>
              </div>
              <button
                type="button"
                onClick={() => downloadVariantPng(darkBgLogo, 'for-dark-bg')}
                className="px-2.5 py-1 text-[10px] font-mono border border-[var(--line)] hover:border-[var(--ind)] text-[var(--ink)] hover:text-[var(--ind)] transition-colors cursor-pointer"
              >
                PNG &darr;
              </button>
            </div>
          </div>

          {/* Variant 3: Pure White Monochrome */}
          <div className="border border-[var(--line)] bg-[var(--bg)] flex flex-col justify-between">
            <div className="p-6 bg-[#14161D] flex items-center justify-center min-h-[150px] border-b border-[var(--line)]">
              <img src={whiteMonoLogo} alt="White Monochrome" className="max-w-[140px] max-h-[84px] object-contain" />
            </div>
            <div className="p-4 flex items-center justify-between gap-2">
              <div>
                <span className="font-mono text-xs font-bold text-[var(--ink)] block">03. White Mono</span>
                <span className="font-mono text-[10px] text-[var(--mute)]">#FFFFFF Knockout</span>
              </div>
              <button
                type="button"
                onClick={() => downloadVariantPng(whiteMonoLogo, 'white-mono')}
                className="px-2.5 py-1 text-[10px] font-mono border border-[var(--line)] hover:border-[var(--ind)] text-[var(--ink)] hover:text-[var(--ind)] transition-colors cursor-pointer"
              >
                PNG &darr;
              </button>
            </div>
          </div>

          {/* Variant 4: Pure Black Monochrome */}
          <div className="border border-[var(--line)] bg-[var(--bg)] flex flex-col justify-between">
            <div className="p-6 bg-[#F4F1EA] flex items-center justify-center min-h-[150px] border-b border-[var(--line)]">
              <img src={blackMonoLogo} alt="Black Monochrome" className="max-w-[140px] max-h-[84px] object-contain" />
            </div>
            <div className="p-4 flex items-center justify-between gap-2">
              <div>
                <span className="font-mono text-xs font-bold text-[var(--ink)] block">04. Obsidian Mono</span>
                <span className="font-mono text-[10px] text-[var(--mute)]">1-Color Press Stamp</span>
              </div>
              <button
                type="button"
                onClick={() => downloadVariantPng(blackMonoLogo, 'black-mono')}
                className="px-2.5 py-1 text-[10px] font-mono border border-[var(--line)] hover:border-[var(--ind)] text-[var(--ink)] hover:text-[var(--ind)] transition-colors cursor-pointer"
              >
                PNG &darr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Space & Exclusion Zone Diagram */}
      <div className="p-8 border border-[var(--line)] bg-[var(--card)] space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
          <div>
            <h3 className="font-sans font-semibold text-lg text-[var(--ink)]">
              Clear Space Exclusion Zone (&ldquo;X&rdquo;)
            </h3>
            <p className="font-sans text-xs text-[var(--mute)] mt-0.5">
              To preserve visual impact and avoid dilution, keep the perimeter clear of competing graphics and text.
            </p>
          </div>
          <span className="font-mono text-xs text-[var(--ind)] font-semibold px-2.5 py-1 border border-[var(--ind)]/30 bg-[var(--ind)]/5">
            X = 25% of Mark Height
          </span>
        </div>

        {/* Blueprint Clear Space Graphic */}
        <div className="p-10 md:p-14 bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center relative overflow-hidden">
          {/* Blueprint Grid pattern in background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, var(--ink) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          <div className="relative p-10 md:p-14 border-2 border-dashed border-[var(--ind)]/70 bg-[var(--card)]/80 shadow-md">
            {/* Dimension indicators around the box */}
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 font-mono text-xs font-bold text-[var(--ind)] bg-[var(--bg)] px-2 py-0.5 border border-[var(--ind)]/40">
              &larr; X &rarr;
            </span>
            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-mono text-xs font-bold text-[var(--ind)] bg-[var(--bg)] px-2 py-0.5 border border-[var(--ind)]/40">
              &larr; X &rarr;
            </span>
            <span className="absolute top-1/2 -left-8 -translate-y-1/2 font-mono text-xs font-bold text-[var(--ind)] bg-[var(--bg)] px-1.5 py-0.5 border border-[var(--ind)]/40">
              X
            </span>
            <span className="absolute top-1/2 -right-8 -translate-y-1/2 font-mono text-xs font-bold text-[var(--ind)] bg-[var(--bg)] px-1.5 py-0.5 border border-[var(--ind)]/40">
              X
            </span>

            {/* Logo Mark Centered */}
            <div className="w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
              <img
                src={darkBgLogo}
                alt={`${brandName} Clear Space Mark`}
                className="max-w-full max-h-full object-contain drop-shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs font-sans text-[var(--mute)] leading-relaxed">
          <p>
            The minimum exclusion zone corresponds to the unit dimension <strong>&ldquo;X&rdquo;</strong> (calculated as 25% of the total mark height). No third-party typography, symbols, page margins, or trimming lines may cross this boundary.
          </p>
          <p>
            When co-branding or pairing with sponsor logos, increase clear space to <strong>2X</strong> to maintain equal visual hierarchy and brand independence.
          </p>
        </div>
      </div>

      {/* Minimum Size Specifications */}
      <div className="p-8 border border-[var(--line)] bg-[var(--card)] space-y-6">
        <h3 className="font-sans font-semibold text-lg text-[var(--ink)] pb-4 border-b border-[var(--line)]">
          Minimum Reproduction Sizes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Digital */}
          <div className="p-6 border border-[var(--line)] bg-[var(--bg)] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--ind)] font-semibold">
                Digital Screens &bull; Web &bull; Mobile
              </span>
              <span className="font-mono text-xs text-[var(--mute)]">72–144 DPI</span>
            </div>

            <div className="flex items-center gap-6 py-4 border-y border-[var(--line)]/60">
              <div className="w-12 h-12 flex items-center justify-center border border-[var(--line)] bg-[var(--card)]">
                <img src={darkBgLogo} alt="24px" className="w-6 h-6 object-contain" />
              </div>
              <div>
                <span className="font-mono font-bold text-sm text-[var(--ink)]">24px minimum</span>
                <p className="font-sans text-xs text-[var(--mute)]">Standalone icon or monogram mark</p>
              </div>
            </div>

            <div className="flex items-center gap-6 py-2">
              <div className="w-32 h-10 flex items-center justify-center border border-[var(--line)] bg-[var(--card)] px-2">
                <img src={darkBgLogo} alt="120px" className="max-h-6 object-contain" />
              </div>
              <div>
                <span className="font-mono font-bold text-sm text-[var(--ink)]">120px minimum</span>
                <p className="font-sans text-xs text-[var(--mute)]">Full lockup with company wordmark</p>
              </div>
            </div>
          </div>

          {/* Print */}
          <div className="p-6 border border-[var(--line)] bg-[var(--bg)] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--ind)] font-semibold">
                Physical Print &bull; Packaging &bull; Merch
              </span>
              <span className="font-mono text-xs text-[var(--mute)]">300 DPI</span>
            </div>

            <div className="flex items-center gap-6 py-4 border-y border-[var(--line)]/60">
              <div className="w-12 h-12 flex items-center justify-center border border-[var(--line)] bg-[var(--card)]">
                <img src={darkBgLogo} alt="8mm" className="w-6 h-6 object-contain" />
              </div>
              <div>
                <span className="font-mono font-bold text-sm text-[var(--ink)]">8 mm (0.31&quot;)</span>
                <p className="font-sans text-xs text-[var(--mute)]">Business card cards, pens, tags</p>
              </div>
            </div>

            <div className="flex items-center gap-6 py-2">
              <div className="w-32 h-10 flex items-center justify-center border border-[var(--line)] bg-[var(--card)] px-2">
                <img src={darkBgLogo} alt="30mm" className="max-h-6 object-contain" />
              </div>
              <div>
                <span className="font-mono font-bold text-sm text-[var(--ink)]">30 mm (1.18&quot;)</span>
                <p className="font-sans text-xs text-[var(--mute)]">Brochures, stationery, apparel</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approved Surface Backgrounds */}
      <div className="p-8 border border-[var(--line)] bg-[var(--card)] space-y-6">
        <h3 className="font-sans font-semibold text-lg text-[var(--ink)] pb-4 border-b border-[var(--line)]">
          Approved Brand Background Canvases
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Light */}
          <div className="p-6 bg-[#FFFFFF] border border-[#040404]/10 rounded-none flex flex-col items-center justify-center min-h-[160px] text-center">
            <img src={lightBgLogo} alt="On white" className="w-20 h-20 object-contain mb-3" />
            <span className="font-mono text-xs font-semibold text-[#040404]">01. Pure White (#FFF)</span>
            <span className="font-mono text-[10px] text-[#5D5D66]">Primary Canvas</span>
          </div>

          {/* Dark */}
          <div className="p-6 bg-[#0E0E10] border border-[#FFFFFF]/10 rounded-none flex flex-col items-center justify-center min-h-[160px] text-center">
            <img src={darkBgLogo} alt="On dark" className="w-20 h-20 object-contain mb-3" />
            <span className="font-mono text-xs font-semibold text-[#FDFDFD]">02. Charcoal (#0E0E10)</span>
            <span className="font-mono text-[10px] text-[#B0B0BA]">Dark Theme</span>
          </div>

          {/* Brand Primary */}
          <div
            className="p-6 rounded-none flex flex-col items-center justify-center min-h-[160px] text-center"
            style={{ backgroundColor: palette.primary.hex }}
          >
            <img src={primaryBgLogo} alt="On primary" className="w-20 h-20 object-contain mb-3" />
            <span
              className="font-mono text-xs font-semibold"
              style={{ color: isPrimaryDark ? '#FFFFFF' : '#040404' }}
            >
              03. {palette.primary.name}
            </span>
            <span
              className="font-mono text-[10px]"
              style={{ color: isPrimaryDark ? '#E0E0E0' : '#4A4A4A' }}
            >
              Primary Flood
            </span>
          </div>

          {/* Brand Accent */}
          <div
            className="p-6 rounded-none flex flex-col items-center justify-center min-h-[160px] text-center"
            style={{ backgroundColor: palette.accent.hex }}
          >
            <img src={accentBgLogo} alt="On accent" className="w-20 h-20 object-contain mb-3" />
            <span
              className="font-mono text-xs font-semibold"
              style={{ color: isAccentDark ? '#FFFFFF' : '#040404' }}
            >
              04. {palette.accent.name}
            </span>
            <span
              className="font-mono text-[10px]"
              style={{ color: isAccentDark ? '#E0E0E0' : '#4A4A4A' }}
            >
              Accent Surface
            </span>
          </div>
        </div>
      </div>

      {/* Prohibited Misuse Examples */}
      <div className="p-8 border border-[var(--line)] bg-[var(--card)] space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
          <div>
            <h3 className="font-sans font-semibold text-lg text-[var(--ink)]">
              Logo Misuse &amp; Prohibitions
            </h3>
            <p className="font-sans text-xs text-[var(--mute)] mt-0.5">
              The logo mark must never be altered, restyled, rotated, or placed on low-contrast backgrounds.
            </p>
          </div>
          <span className="font-mono text-xs text-[#EF4444] font-semibold px-2.5 py-1 border border-[#EF4444]/30 bg-[#EF4444]/5">
            Strict Zero-Tolerance
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Misuse 1: Distort */}
          <div className="p-5 border border-red-500/20 bg-[var(--bg)] flex flex-col items-center justify-between text-center space-y-4">
            <div className="relative w-28 h-28 flex items-center justify-center bg-[var(--card)] border border-[var(--line)] overflow-hidden">
              <img
                src={darkBgLogo}
                alt="Distorted"
                className="w-16 h-16 object-contain transform scale-x-150 scale-y-75"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-red-500 font-bold text-3xl opacity-80">&times;</span>
              </div>
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-red-500 block mb-1">01. Do Not Distort</span>
              <p className="text-[11px] font-sans text-[var(--mute)] leading-tight">
                Never stretch, squeeze, or alter proportions. Always lock 1:1 aspect ratio.
              </p>
            </div>
          </div>

          {/* Misuse 2: Rotate */}
          <div className="p-5 border border-red-500/20 bg-[var(--bg)] flex flex-col items-center justify-between text-center space-y-4">
            <div className="relative w-28 h-28 flex items-center justify-center bg-[var(--card)] border border-[var(--line)] overflow-hidden">
              <img
                src={darkBgLogo}
                alt="Rotated"
                className="w-16 h-16 object-contain transform rotate-25"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-red-500 font-bold text-3xl opacity-80">&times;</span>
              </div>
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-red-500 block mb-1">02. Do Not Rotate</span>
              <p className="text-[11px] font-sans text-[var(--mute)] leading-tight">
                Never tilt or rotate off-axis. The mark must always sit horizontal.
              </p>
            </div>
          </div>

          {/* Misuse 3: Off-Brand Recolor */}
          <div className="p-5 border border-red-500/20 bg-[var(--bg)] flex flex-col items-center justify-between text-center space-y-4">
            <div className="relative w-28 h-28 flex items-center justify-center bg-[var(--card)] border border-[var(--line)] overflow-hidden">
              <img
                src={darkBgLogo}
                alt="Recolored"
                className="w-16 h-16 object-contain filter hue-rotate-180 invert"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-red-500 font-bold text-3xl opacity-80">&times;</span>
              </div>
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-red-500 block mb-1">03. Do Not Recolor</span>
              <p className="text-[11px] font-sans text-[var(--mute)] leading-tight">
                Never substitute colors with unapproved random tints or arbitrary hues.
              </p>
            </div>
          </div>

          {/* Misuse 4: Busy Background */}
          <div className="p-5 border border-red-500/20 bg-[var(--bg)] flex flex-col items-center justify-between text-center space-y-4">
            <div className="relative w-28 h-28 flex items-center justify-center border border-[var(--line)] overflow-hidden bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
              <img
                src={darkBgLogo}
                alt="Busy Background"
                className="w-16 h-16 object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">
                <span className="text-red-500 font-bold text-3xl opacity-80">&times;</span>
              </div>
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-red-500 block mb-1">04. Do Not Obscure</span>
              <p className="text-[11px] font-sans text-[var(--mute)] leading-tight">
                Never place the logo over busy textures, clashing photography, or low-contrast backgrounds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
