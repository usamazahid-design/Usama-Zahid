'use client';

import React, { useState } from 'react';
import { ScalabilityResult, ColorPalette, LogoVariants } from '@/lib/brand-kit/types';

interface ScalabilityTabProps {
  result: ScalabilityResult;
  logoDataUrl: string;
  logoVariants?: LogoVariants;
  brandName: string;
  palette?: ColorPalette | null;
}

export default function ScalabilityTab({
  result,
  logoDataUrl,
  logoVariants,
  brandName,
  palette,
}: ScalabilityTabProps) {
  const { overallScore, verdict, tierLabel, subTests, issues, recommendations, diagnostics } = result;
  const [ladderSurface, setLadderSurface] = useState<'white' | 'paper' | 'dark' | 'primary' | 'grey'>('white');
  const [useAdaptiveLogo, setUseAdaptiveLogo] = useState(true);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 10) * circumference;

  const getTierColor = (score: number) => {
    if (score >= 8.8) return '#00C7CE';
    if (score >= 7.0) return '#4B3FFF';
    if (score >= 5.0) return '#F59E0B';
    return '#EF4444';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return (
          <span className="text-[10px] font-mono text-[#00C7CE] px-2 py-0.5 border border-[#00C7CE]/30 bg-[#00C7CE]/5">
            Optimal
          </span>
        );
      case 'good':
        return (
          <span className="text-[10px] font-mono text-[#4B3FFF] px-2 py-0.5 border border-[#4B3FFF]/30 bg-[#4B3FFF]/5">
            Good
          </span>
        );
      case 'warning':
        return (
          <span className="text-[10px] font-mono text-[#F59E0B] px-2 py-0.5 border border-[#F59E0B]/30 bg-[#F59E0B]/5">
            Watch
          </span>
        );
      case 'critical':
        return (
          <span className="text-[10px] font-mono text-[#EF4444] px-2 py-0.5 border border-[#EF4444]/30 bg-[#EF4444]/5">
            Risk
          </span>
        );
      default:
        return null;
    }
  };

  const primaryHex = palette?.primary?.hex || '#4B3FFF';

  const surfaceConfigs = {
    white: {
      label: 'Pure White (#FFF)',
      bg: '#FFFFFF',
      cellBg: '#FAFAFC',
      text: '#0E0E10',
      mute: '#5D5D66',
      border: 'rgba(14,14,16,0.12)',
    },
    paper: {
      label: 'Warm Paper (#F4F1EA)',
      bg: '#F4F1EA',
      cellBg: '#FAF8F3',
      text: '#1C1A17',
      mute: '#6E6A63',
      border: 'rgba(28,26,23,0.12)',
    },
    dark: {
      label: 'OLED Carbon (#0A0A0C)',
      bg: '#0A0A0C',
      cellBg: '#121318',
      text: '#FDFDFD',
      mute: '#A0A0AB',
      border: 'rgba(255,255,255,0.14)',
    },
    primary: {
      label: `Brand Primary (${primaryHex})`,
      bg: primaryHex,
      cellBg: 'rgba(0,0,0,0.15)',
      text: '#FFFFFF',
      mute: 'rgba(255,255,255,0.8)',
      border: 'rgba(255,255,255,0.22)',
    },
    grey: {
      label: 'Mid-Grey (#767676)',
      bg: '#767676',
      cellBg: '#848484',
      text: '#FFFFFF',
      mute: '#E4E4E7',
      border: 'rgba(255,255,255,0.2)',
    },
  };

  const activeSurface = surfaceConfigs[ladderSurface];

  const isPrimaryDark = palette?.primary
    ? palette.primary.contrastOnDark > palette.primary.contrastOnWhite
    : true;

  const lightSurfaceLogo =
    useAdaptiveLogo && logoVariants ? logoVariants.forLightBg : logoDataUrl;
  const darkSurfaceLogo =
    useAdaptiveLogo && logoVariants ? logoVariants.forDarkBg : logoDataUrl;
  const primarySurfaceLogo = isPrimaryDark ? darkSurfaceLogo : lightSurfaceLogo;

  const activeLadderLogo =
    ladderSurface === 'white' || ladderSurface === 'paper'
      ? lightSurfaceLogo
      : ladderSurface === 'primary'
      ? primarySurfaceLogo
      : darkSurfaceLogo;

  return (
    <div className="space-y-10">
      {/* Top Banner: Score Gauge + Verdict + Telemetry */}
      <div className="p-8 md:p-10 border border-[var(--line)] bg-[var(--card)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Animated Score Ring */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-[var(--line)]"
                />
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke={getTierColor(overallScore)}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-sans font-bold text-3xl md:text-4xl text-[var(--ink)] tracking-tight">
                  {overallScore.toFixed(1)}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--mute)]">
                  out of 10
                </span>
              </div>
            </div>

            <div className="mt-4">
              <span
                className="inline-block px-3.5 py-1 font-mono text-xs uppercase tracking-wider font-semibold border"
                style={{
                  color: getTierColor(overallScore),
                  borderColor: `${getTierColor(overallScore)}40`,
                  backgroundColor: `${getTierColor(overallScore)}12`,
                }}
              >
                {tierLabel}
              </span>
            </div>
          </div>

          {/* Verdict and Telemetry Readout */}
          <div className="lg:col-span-8 border-t lg:border-t-0 lg:border-l border-[var(--line)] lg:pl-8 pt-6 lg:pt-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--ind)]">
                7-Factor Optical &amp; Geometric Audit
              </span>
              <span className="font-mono text-[10px] text-[var(--mute)]">
                Deterministic Canvas Engine
              </span>
            </div>

            <h2 className="font-sans text-2xl md:text-3xl font-bold text-[var(--ink)] mb-2.5">
              Verdict: {verdict}
            </h2>
            <p className="font-sans text-sm text-[var(--mute)] leading-relaxed max-w-2xl mb-6">
              Evaluates your mark across 16px pixelation, Sobel edge crowding, morphological stroke erosion, Otsu 1-bit monochrome survival, and multi-surface contrast.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-[var(--line)]">
              <div className="p-2.5 bg-[var(--bg)] border border-[var(--line)]">
                <span className="block font-mono text-[9px] uppercase text-[var(--mute)]">Aspect Ratio</span>
                <b className="font-mono text-xs text-[var(--ink)]">{result.aspectRatio}:1</b>
              </div>
              <div className="p-2.5 bg-[var(--bg)] border border-[var(--line)]">
                <span className="block font-mono text-[9px] uppercase text-[var(--mute)]">Source Vector</span>
                <b className="font-mono text-xs text-[var(--ink)]">{result.isSvg ? 'SVG Master' : 'Raster'}</b>
              </div>
              <div className="p-2.5 bg-[var(--bg)] border border-[var(--line)]">
                <span className="block font-mono text-[9px] uppercase text-[var(--mute)]">Color Clusters</span>
                <b className="font-mono text-xs text-[var(--ink)]">
                  {result.hasGradients ? 'Gradients' : `${result.detectedColorsCount} Flat`}
                </b>
              </div>
              <div className="p-2.5 bg-[var(--bg)] border border-[var(--line)]">
                <span className="block font-mono text-[9px] uppercase text-[var(--mute)]">Stroke Weight</span>
                <b
                  className={`font-mono text-xs ${
                    result.thinStrokeDetected ? 'text-[#F59E0B]' : 'text-[#00C7CE]'
                  }`}
                >
                  {result.thinStrokeDetected ? 'Delicate (<2px)' : 'Robust'}
                </b>
              </div>
              <div className="p-2.5 bg-[var(--bg)] border border-[var(--line)] col-span-2 sm:col-span-1">
                <span className="block font-mono text-[9px] uppercase text-[var(--mute)]">Edge Density</span>
                <b className="font-mono text-xs text-[var(--ink)]">
                  {diagnostics ? `${diagnostics.edgeDensityPct}%` : 'Normal'}
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW: Optical Diagnostic Lab (4-Pass Real Canvas Inspection) */}
      {diagnostics && (
        <div className="p-8 border border-[var(--line)] bg-[var(--card)] space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-[var(--line)]">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ind)] block mb-0.5">
                Computer Vision Telemetry
              </span>
              <h3 className="font-sans font-semibold text-lg text-[var(--ink)]">
                4-Pass Optical Diagnostic Lab
              </h3>
              <p className="font-sans text-xs text-[var(--mute)] mt-0.5">
                Actual offscreen Canvas buffers generated during the scalability analysis—revealing how browsers, printers, and embossers see your mark.
              </p>
            </div>
            <span className="font-mono text-[11px] px-2.5 py-1 border border-[var(--line)] bg-[var(--bg)] text-[var(--mute)]">
              256×256 Normalized Buffers
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pass 1: Normalized Master */}
            <div className="border border-[var(--line)] bg-[var(--bg)] flex flex-col justify-between">
              <div className="p-3 border-b border-[var(--line)] flex items-center justify-between text-[10px] font-mono">
                <span className="text-[var(--ind)] font-semibold">PASS 01 · MASTER</span>
                <span className="text-[var(--mute)]">256×256px</span>
              </div>
              <div
                className="h-44 flex items-center justify-center p-6 relative"
                style={{
                  backgroundColor: logoVariants?.isPredominantlyDark ? '#F4F4F6' : '#141519',
                  backgroundImage:
                    'linear-gradient(45deg, rgba(128,128,128,0.12) 25%, transparent 25%), linear-gradient(-45deg, rgba(128,128,128,0.12) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(128,128,128,0.12) 75%), linear-gradient(-45deg, transparent 75%, rgba(128,128,128,0.12) 75%)',
                  backgroundSize: '16px 16px',
                  backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0',
                }}
              >
                <img
                  src={diagnostics.normalizedDataUrl}
                  alt="Normalized master"
                  className="w-28 h-28 object-contain"
                />
              </div>
              <div className="p-3.5 border-t border-[var(--line)] text-xs font-sans text-[var(--mute)]">
                Auto-trimmed bounding box (`{result.boundingWidth}×{result.boundingHeight}px`) centered with optical margin.
              </div>
            </div>

            {/* Pass 2: 16x16 Favicon Grid */}
            <div className="border border-[var(--line)] bg-[var(--bg)] flex flex-col justify-between">
              <div className="p-3 border-b border-[var(--line)] flex items-center justify-between text-[10px] font-mono">
                <span className="text-[var(--ind)] font-semibold">PASS 02 · 16PX RASTER</span>
                <span className="text-[var(--mute)]">Favicon Stress</span>
              </div>
              <div className="h-44 flex items-center justify-center p-6 bg-[#141519]">
                <img
                  src={diagnostics.pixel16DataUrl}
                  alt="16x16 pixel grid simulation"
                  className="w-28 h-28 object-contain border border-white/10"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <div className="p-3.5 border-t border-[var(--line)] text-xs font-sans text-[var(--mute)]">
                True 16×16px pixel matrix upscaled 16× to expose micro-counter blurring and stroke loss.
              </div>
            </div>

            {/* Pass 3: 1-Bit Monochrome Threshold */}
            <div className="border border-[var(--line)] bg-[var(--bg)] flex flex-col justify-between">
              <div className="p-3 border-b border-[var(--line)] flex items-center justify-between text-[10px] font-mono">
                <span className="text-[var(--ind)] font-semibold">PASS 03 · 1-BIT STAMP</span>
                <span className="text-[var(--mute)]">Otsu Threshold</span>
              </div>
              <div className="h-44 flex items-center justify-center p-6 bg-[#FAF8F5]">
                <img
                  src={diagnostics.monochromeDataUrl}
                  alt="1-bit monochrome stamp"
                  className="w-28 h-28 object-contain"
                />
              </div>
              <div className="p-3.5 border-t border-[var(--line)] text-xs font-sans text-[var(--mute)]">
                Adaptive 1-bit ink threshold simulating laser engraving, rubber stamps, and blind debossing.
              </div>
            </div>

            {/* Pass 4: Sobel Edge & Filigree Stress Map */}
            <div className="border border-[var(--line)] bg-[var(--bg)] flex flex-col justify-between">
              <div className="p-3 border-b border-[var(--line)] flex items-center justify-between text-[10px] font-mono">
                <span className="text-[var(--ind)] font-semibold">PASS 04 · SOBEL EDGES</span>
                <span className="text-[#00C7CE]">{diagnostics.edgeDensityPct}% Density</span>
              </div>
              <div className="h-44 flex items-center justify-center p-6 bg-[#0A0B0E]">
                <img
                  src={diagnostics.edgeMapDataUrl}
                  alt="Sobel edge density map"
                  className="w-28 h-28 object-contain border border-white/10"
                />
              </div>
              <div className="p-3.5 border-t border-[var(--line)] text-xs font-sans text-[var(--mute)]">
                <span className="text-[#00C7CE] font-mono font-semibold">Cyan</span> = clean geometry;{' '}
                <span className="text-[#F59E0B] font-mono font-semibold">Amber</span> = crowded filigree/text risk.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Multi-Surface Size Ladder */}
      <div className="p-8 border border-[var(--line)] bg-[var(--card)] space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
          <div>
            <h3 className="font-sans font-semibold text-lg text-[var(--ink)]">
              Interactive Size Ladder &amp; Surface Simulator
            </h3>
            <p className="font-sans text-xs text-[var(--mute)] mt-0.5">
              Inspect progressive optical scaling from a 16px favicon to billboard signage across 5 real-world surface backdrops.
            </p>
          </div>

          {/* Surface Switcher Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(Object.keys(surfaceConfigs) as Array<keyof typeof surfaceConfigs>).map((key) => {
              const cfg = surfaceConfigs[key];
              const isSelected = ladderSurface === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setLadderSurface(key)}
                  className={`px-2.5 py-1.5 text-[11px] font-mono flex items-center gap-1.5 border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[var(--ind)] bg-[var(--ind)] text-white font-semibold'
                      : 'border-[var(--line)] bg-[var(--bg)] text-[var(--mute)] hover:text-[var(--ink)]'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 border border-white/30 inline-block"
                    style={{ backgroundColor: cfg.bg }}
                  />
                  <span>{cfg.label.split(' (')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Surface Canvas */}
        <div
          className="p-6 md:p-8 border transition-colors duration-300 space-y-6"
          style={{
            backgroundColor: activeSurface.bg,
            color: activeSurface.text,
            borderColor: activeSurface.border,
          }}
        >
          <div className="flex items-center justify-between">
            <span
              className="font-mono text-[10px] uppercase tracking-widest block"
              style={{ color: activeSurface.mute }}
            >
              Active Test Backdrop: {activeSurface.label}
            </span>
            <button
              type="button"
              onClick={() => setUseAdaptiveLogo((prev) => !prev)}
              className="font-mono text-[10px] px-2.5 py-1 border cursor-pointer transition-opacity hover:opacity-80"
              style={{
                color: activeSurface.text,
                borderColor: activeSurface.border,
                backgroundColor: activeSurface.cellBg,
              }}
            >
              {useAdaptiveLogo ? '✓ Adaptive Contrast Lockup (Auto)' : 'Showing Raw Unmodified SVG'}
            </button>
          </div>

          <div className="flex flex-wrap items-end gap-8 pt-2">
            {/* 16px */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-9 h-9 flex items-center justify-center border"
                style={{ backgroundColor: activeSurface.cellBg, borderColor: activeSurface.border }}
              >
                <img src={activeLadderLogo} alt="16px preview" className="w-4 h-4 object-contain" />
              </div>
              <span className="font-mono text-[10px]" style={{ color: activeSurface.mute }}>
                16px
              </span>
            </div>

            {/* 24px */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-11 h-11 flex items-center justify-center border"
                style={{ backgroundColor: activeSurface.cellBg, borderColor: activeSurface.border }}
              >
                <img src={activeLadderLogo} alt="24px preview" className="w-6 h-6 object-contain" />
              </div>
              <span className="font-mono text-[10px]" style={{ color: activeSurface.mute }}>
                24px
              </span>
            </div>

            {/* 32px */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-14 h-14 flex items-center justify-center border"
                style={{ backgroundColor: activeSurface.cellBg, borderColor: activeSurface.border }}
              >
                <img src={activeLadderLogo} alt="32px preview" className="w-8 h-8 object-contain" />
              </div>
              <span className="font-mono text-[10px]" style={{ color: activeSurface.mute }}>
                32px
              </span>
            </div>

            {/* 64px */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-20 h-20 flex items-center justify-center border"
                style={{ backgroundColor: activeSurface.cellBg, borderColor: activeSurface.border }}
              >
                <img src={activeLadderLogo} alt="64px preview" className="w-16 h-16 object-contain" />
              </div>
              <span className="font-mono text-[10px]" style={{ color: activeSurface.mute }}>
                64px (Navbar)
              </span>
            </div>

            {/* 128px */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-36 h-36 flex items-center justify-center border"
                style={{ backgroundColor: activeSurface.cellBg, borderColor: activeSurface.border }}
              >
                <img src={activeLadderLogo} alt="128px preview" className="w-32 h-32 object-contain" />
              </div>
              <span className="font-mono text-[10px]" style={{ color: activeSurface.mute }}>
                128px (Hero Mark)
              </span>
            </div>

            {/* Business Card Context */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-52 h-32 border p-4 flex flex-col justify-between shadow-sm"
                style={{ backgroundColor: activeSurface.cellBg, borderColor: activeSurface.border }}
              >
                <div className="flex items-center justify-between">
                  <img src={activeLadderLogo} alt="Card preview" className="w-9 h-9 object-contain" />
                  <span className="font-mono text-[8px] uppercase opacity-60">3.5&quot; × 2.0&quot;</span>
                </div>
                <div className="space-y-1">
                  <div className="font-sans font-bold text-xs truncate">{brandName}</div>
                  <div className="font-mono text-[9px] opacity-65">BRAND ARCHITECTURE</div>
                </div>
              </div>
              <span className="font-mono text-[10px]" style={{ color: activeSurface.mute }}>
                Print Stationery Scale
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Favicon & App Icon Live Mockups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Browser Tab Mock */}
        <div className="p-6 border border-[var(--line)] bg-[var(--card)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--mute)]">
              16px Browser Tab Favicon
            </span>
            <span className="font-mono text-[10px] text-[var(--ind)]">Chrome / Safari Tab Bar</span>
          </div>

          <div className="bg-[var(--bg)] border border-[var(--line)] p-4 space-y-2.5">
            {/* Light Tab */}
            <div className="flex items-center gap-2.5 px-3 py-2 bg-[#FFFFFF] text-[#0E0E10] border border-black/10 max-w-xs shadow-sm">
              <img src={lightSurfaceLogo} alt="Favicon" className="w-4 h-4 object-contain flex-shrink-0" />
              <span className="font-sans text-xs truncate font-medium">
                {brandName} &mdash; Official Site
              </span>
              <span className="text-black/40 text-xs ml-auto">&times;</span>
            </div>
            {/* Dark Tab */}
            <div className="flex items-center gap-2.5 px-3 py-2 bg-[#18181B] text-[#F4F4F5] border border-white/10 max-w-xs shadow-sm">
              <img src={darkSurfaceLogo} alt="Favicon Dark" className="w-4 h-4 object-contain flex-shrink-0" />
              <span className="font-sans text-xs truncate font-medium">
                {brandName} &mdash; Dashboard
              </span>
              <span className="text-white/40 text-xs ml-auto">&times;</span>
            </div>
          </div>
          <p className="text-xs text-[var(--mute)] font-sans leading-relaxed">
            Tests whether your mark retains immediate recognition at 16×16px in both Light and Dark browser chrome.
          </p>
        </div>

        {/* 180px App Icon Mock */}
        <div className="p-6 border border-[var(--line)] bg-[var(--card)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--mute)]">
              iOS / macOS Squircle Dock Icons
            </span>
            <span className="font-mono text-[10px] text-[var(--ind)]">Light + Dark + Brand</span>
          </div>

          <div className="bg-[var(--bg)] border border-[var(--line)] p-4 flex items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-20 h-20 rounded-[18px] bg-[#0E0E10] border border-white/15 shadow-lg flex items-center justify-center p-3.5 overflow-hidden">
                <img src={darkSurfaceLogo} alt="App Icon Dark" className="w-full h-full object-contain" />
              </div>
              <span className="text-[10px] font-mono text-[var(--mute)]">Dark Dock</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div className="w-20 h-20 rounded-[18px] bg-[#FFFFFF] border border-black/10 shadow-lg flex items-center justify-center p-3.5 overflow-hidden">
                <img src={lightSurfaceLogo} alt="App Icon Light" className="w-full h-full object-contain" />
              </div>
              <span className="text-[10px] font-mono text-[var(--mute)]">Light Dock</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-20 h-20 rounded-[18px] border border-white/20 shadow-lg flex items-center justify-center p-3.5 overflow-hidden"
                style={{ backgroundColor: primaryHex }}
              >
                <img src={primarySurfaceLogo} alt="App Icon Brand" className="w-full h-full object-contain" />
              </div>
              <span className="text-[10px] font-mono text-[var(--mute)]">Brand Flood</span>
            </div>
          </div>
          <p className="text-xs text-[var(--mute)] font-sans leading-relaxed">
            Tests optical centering and safe margin inside Apple&apos;s continuous-curvature squircle mask.
          </p>
        </div>
      </div>

      {/* Per-Test Breakdown Table / Bars */}
      <div className="p-8 border border-[var(--line)] bg-[var(--card)] space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-[var(--line)]">
          <div>
            <h3 className="font-sans font-semibold text-lg text-[var(--ink)]">
              7-Factor Weighted Heuristic Breakdown
            </h3>
            <p className="font-sans text-xs text-[var(--mute)] mt-0.5">
              Individual sub-scores weighted by their real-world impact on digital UI and physical production.
            </p>
          </div>
          <span className="font-mono text-xs text-[var(--mute)]">Total Weight: 100%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subTests.map((t) => (
            <div key={t.id} className="p-5 border border-[var(--line)] bg-[var(--bg)]/60 flex flex-col justify-between space-y-3">
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-sans font-semibold text-sm text-[var(--ink)]">
                        {t.name}
                      </h4>
                      {getStatusBadge(t.status)}
                    </div>
                    <span className="block font-mono text-[10px] text-[var(--mute)]">
                      Matrix Weight: {t.weight}%
                    </span>
                  </div>
                  <span className="font-mono font-bold text-base text-[var(--ink)] whitespace-nowrap">
                    {t.score.toFixed(1)} <span className="text-xs text-[var(--mute)] font-normal">/ 10</span>
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-[var(--line)] overflow-hidden">
                  <div
                    className="h-full transition-all duration-700 ease-out"
                    style={{
                      width: `${t.score * 10}%`,
                      backgroundColor: getTierColor(t.score),
                    }}
                  />
                </div>

                <p className="font-sans text-xs text-[var(--mute)] leading-relaxed">
                  {t.reason}
                </p>
              </div>

              {t.issueFix && (
                <div className="pt-2.5 border-t border-[var(--line)]/60 text-[11px] font-sans text-[var(--ink)] flex items-start gap-2">
                  <span className="font-mono text-[#F59E0B] font-bold flex-shrink-0">FIX:</span>
                  <span>{t.issueFix}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Issues & Fixes List */}
      <div className="p-8 border border-[var(--line)] bg-[var(--card)] space-y-6">
        <h3 className="font-sans font-semibold text-lg text-[var(--ink)] pb-4 border-b border-[var(--line)]">
          Recommended Designer Corrections ({issues.length})
        </h3>

        {issues.length > 0 ? (
          <ul className="space-y-3">
            {issues.map((issue, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-4 border border-amber-500/25 bg-amber-500/5 text-xs font-sans text-[var(--ink)] leading-relaxed"
              >
                <span className="text-amber-500 font-mono font-bold mt-0.5">0{idx + 1}</span>
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs font-mono text-[#00C7CE] p-4 border border-[#00C7CE]/20 bg-[#00C7CE]/5">
            &check; Zero scalability defects detected. Your mark features clean geometry, open counters, and high contrast across all scales.
          </p>
        )}

        {recommendations.length > 0 && (
          <div className="mt-6 pt-4 border-t border-[var(--line)] space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--mute)] block">
              Production Handoff Notes:
            </span>
            <ul className="space-y-1.5 text-xs text-[var(--mute)] font-sans list-disc list-inside">
              {recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-[11px] font-mono text-[var(--mute)] pt-4 border-t border-[var(--line)]">
          Note: Deterministic computer-vision audit powered by browser Canvas; use alongside optical judgment when finalizing print plates.
        </p>
      </div>
    </div>
  );
}
