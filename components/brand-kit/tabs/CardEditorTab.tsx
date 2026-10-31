'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ColorPalette, LogoVariants, TypographyPairing } from '@/lib/brand-kit/types';
import { getRelativeLuminance, hexToRgb } from '@/lib/brand-kit/color-extractor';

interface CardEditorTabProps {
  logoDataUrl: string;
  logoVariants?: LogoVariants;
  brandName: string;
  palette: ColorPalette;
  selectedFontPair: TypographyPairing | null;
}

type CardLayoutStyle = 'swiss' | 'editorial' | 'architect';
type CardLogoMode = 'auto' | 'white' | 'black' | 'original';

interface CardData {
  layout: CardLayoutStyle;
  logoMode: CardLogoMode;
  // Front
  frontBg: string;
  frontTextColor: string;
  frontLogoScale: number;
  frontLogoX: number;
  frontLogoY: number;
  frontTagline: string;
  // Back
  backBg: string;
  backTextColor: string;
  backLogoScale: number;
  backLogoX: number;
  backLogoY: number;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  fontFamily: string;
}

export default function CardEditorTab({
  logoDataUrl,
  logoVariants,
  brandName,
  palette,
  selectedFontPair,
}: CardEditorTabProps) {
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  const [isDragging, setIsDragging] = useState(false);
  const [snapGuide, setSnapGuide] = useState<{ x: boolean; y: boolean }>({ x: false, y: false });

  const slug = brandName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'studio';

  const [card, setCard] = useState<CardData>({
    layout: 'swiss',
    logoMode: 'auto',
    frontBg: palette.neutralDark.hex,
    frontTextColor: '#FFFFFF',
    frontLogoScale: 1.15,
    frontLogoX: 262,
    frontLogoY: 138,
    frontTagline: brandName.toUpperCase(),
    backBg: '#FFFFFF',
    backTextColor: '#0E0E10',
    backLogoScale: 0.65,
    backLogoX: 445,
    backLogoY: 68,
    fullName: 'Usama Zahid',
    jobTitle: 'Founder & Brand Product Designer',
    email: `hello@${slug}.design`,
    phone: '+1 (555) 234-8901',
    website: `www.${slug}.design`,
    location: 'New York · London · Lahore',
    fontFamily: selectedFontPair?.bodyFont || 'Inter',
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoImageRef = useRef<HTMLImageElement | null>(null);

  // Sync brandName if edited in Studio header
  useEffect(() => {
    const cleanSlug = brandName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'studio';
    setCard((prev) => ({
      ...prev,
      frontTagline: brandName.toUpperCase(),
      email: `hello@${cleanSlug}.design`,
      website: `www.${cleanSlug}.design`,
      fontFamily: selectedFontPair?.bodyFont || prev.fontFamily,
    }));
  }, [brandName, selectedFontPair]);

  const activeBgHex = activeSide === 'front' ? card.frontBg : card.backBg;
  const isActiveSideDark = getRelativeLuminance(...hexToRgb(activeBgHex)) <= 0.36;

  // Resolve optimal logo variant for the active card side & background polarity
  const resolvedLogoSrc = (() => {
    if (!logoVariants) return logoDataUrl;
    if (card.logoMode === 'white') return logoVariants.whiteMono;
    if (card.logoMode === 'black') return logoVariants.blackMono;
    if (card.logoMode === 'original') return logoVariants.original;
    return isActiveSideDark ? logoVariants.forDarkBg : logoVariants.forLightBg;
  })();

  // Load resolved logo image whenever the active side background or logo mode changes
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      logoImageRef.current = img;
      drawCard();
    };
    img.src = resolvedLogoSrc;
  }, [resolvedLogoSrc]);

  const getAutoContrastText = (bgHex: string) => {
    const rgb = hexToRgb(bgHex);
    const lum = getRelativeLuminance(...rgb);
    return lum > 0.36 ? '#0E0E10' : '#FFFFFF';
  };

  // Main Canvas render (1050 x 600 px = 3.5" x 2" at 300 DPI)
  const drawCard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1050;
    const height = 600;
    canvas.width = width;
    canvas.height = height;

    const headingFont = selectedFontPair?.headingFont || card.fontFamily;

    if (activeSide === 'front') {
      ctx.fillStyle = card.frontBg;
      ctx.fillRect(0, 0, width, height);

      const isDarkBg = getRelativeLuminance(...hexToRgb(card.frontBg)) <= 0.36;
      const borderCol = isDarkBg ? 'rgba(255, 255, 255, 0.10)' : 'rgba(14, 14, 16, 0.10)';

      if (card.layout === 'swiss') {
        ctx.strokeStyle = borderCol;
        ctx.lineWidth = 2;
        ctx.strokeRect(32, 32, width - 64, height - 64);
      } else if (card.layout === 'editorial') {
        // Accent left edge bar
        ctx.fillStyle = palette.primary.hex;
        ctx.fillRect(0, 0, 18, height);
        ctx.strokeStyle = borderCol;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(76, 48);
        ctx.lineTo(width - 48, 48);
        ctx.moveTo(76, height - 115);
        ctx.lineTo(width - 48, height - 115);
        ctx.stroke();
      } else if (card.layout === 'architect') {
        ctx.strokeStyle = borderCol;
        ctx.lineWidth = 2;
        ctx.strokeRect(36, 36, width - 72, height - 72);
        // Technical grid lines
        ctx.beginPath();
        ctx.moveTo(36, 108);
        ctx.lineTo(width - 36, 108);
        ctx.moveTo(36, height - 108);
        ctx.lineTo(width - 36, height - 108);
        ctx.stroke();

        ctx.fillStyle = card.frontTextColor;
        ctx.globalAlpha = 0.55;
        ctx.font = `500 16px monospace`;
        ctx.textAlign = 'left';
        ctx.fillText('SPEC // 01-FRONT', 60, 80);
        ctx.textAlign = 'right';
        ctx.fillText('SCALE 1:1 · 300 DPI', width - 60, 80);
        ctx.globalAlpha = 1;
      }

      // Draw Logo
      const logo = logoImageRef.current;
      if (logo) {
        ctx.save();
        const baseW = 180 * card.frontLogoScale;
        const aspect = (logo.width || 1) / (logo.height || 1);
        const drawW = baseW;
        const drawH = baseW / aspect;
        const posX = card.frontLogoX * 2 - drawW / 2;
        const posY = card.frontLogoY * 2 - drawH / 2;
        ctx.drawImage(logo, posX, posY, drawW, drawH);
        ctx.restore();
      }

      // Front Brand Wordmark / Tagline
      if (card.frontTagline) {
        ctx.fillStyle = card.frontTextColor;
        ctx.font = `700 24px "${headingFont}", sans-serif`;
        if (card.layout === 'editorial') {
          ctx.textAlign = 'left';
          ctx.letterSpacing = '4px';
          ctx.fillText(card.frontTagline, 76, height - 62);
        } else {
          ctx.textAlign = 'center';
          ctx.letterSpacing = '6px';
          ctx.fillText(card.frontTagline, width / 2, height - 64);
        }
      }
    } else {
      // Back side
      ctx.fillStyle = card.backBg;
      ctx.fillRect(0, 0, width, height);

      const isDarkBg = getRelativeLuminance(...hexToRgb(card.backBg)) <= 0.36;
      const ruleCol = isDarkBg ? 'rgba(255, 255, 255, 0.12)' : 'rgba(14, 14, 16, 0.10)';

      ctx.strokeStyle = ruleCol;
      ctx.lineWidth = 2;
      ctx.strokeRect(32, 32, width - 64, height - 64);

      if (card.layout === 'architect') {
        ctx.beginPath();
        ctx.moveTo(32, 225);
        ctx.lineTo(width - 32, 225);
        ctx.moveTo(width / 2, 225);
        ctx.lineTo(width / 2, height - 32);
        ctx.stroke();
      }

      // Back logo
      const logo = logoImageRef.current;
      if (logo) {
        ctx.save();
        const baseW = 120 * card.backLogoScale;
        const aspect = (logo.width || 1) / (logo.height || 1);
        const drawW = baseW;
        const drawH = baseW / aspect;
        const posX = card.backLogoX * 2 - drawW / 2;
        const posY = card.backLogoY * 2 - drawH / 2;
        ctx.drawImage(logo, posX, posY, drawW, drawH);
        ctx.restore();
      }

      const textColor = card.backTextColor;

      // Full Name
      ctx.fillStyle = textColor;
      ctx.font = `700 38px "${headingFont}", sans-serif`;
      ctx.textAlign = 'left';
      ctx.letterSpacing = '0px';
      ctx.fillText(card.fullName, 80, 134);

      // Job Title
      ctx.fillStyle = palette.primary.hex;
      ctx.font = `600 19px "${card.fontFamily}", sans-serif`;
      ctx.letterSpacing = '2px';
      ctx.fillText(card.jobTitle.toUpperCase(), 80, 174);

      if (card.layout !== 'architect') {
        ctx.fillStyle = ruleCol;
        ctx.fillRect(80, 208, width - 160, 2);
      }

      // Contact Info rows
      ctx.fillStyle = textColor;
      ctx.font = `400 21px "${card.fontFamily}", sans-serif`;
      ctx.letterSpacing = '0.5px';

      if (card.layout === 'architect') {
        // Two-column architectural layout
        ctx.fillText(card.email, 80, 300);
        ctx.fillText(card.phone, 80, 355);
        ctx.fillText(card.website, width / 2 + 40, 300);
        ctx.fillText(card.location, width / 2 + 40, 355);
      } else {
        let textY = 272;
        const lineHeight = 44;
        ctx.fillText(`M ·  ${card.email}`, 80, textY);
        textY += lineHeight;
        ctx.fillText(`T ·  ${card.phone}`, 80, textY);
        textY += lineHeight;
        ctx.fillText(`W ·  ${card.website}`, 80, textY);
        textY += lineHeight;
        ctx.fillText(`L ·  ${card.location}`, 80, textY);
      }
    }

    // Draw interactive center snap guides while dragging
    if (isDragging) {
      ctx.save();
      ctx.strokeStyle = '#00C7CE';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      if (snapGuide.x) {
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.stroke();
      }
      if (snapGuide.y) {
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
      }
      ctx.restore();
    }
  }, [card, activeSide, selectedFontPair, palette, isDragging, snapGuide]);

  useEffect(() => {
    drawCard();
  }, [drawCard]);

  // Pointer drag handlers for direct canvas manipulation
  const updateLogoPositionFromPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * 525;
    const relY = ((e.clientY - rect.top) / rect.height) * 300;

    let clampedX = Math.max(40, Math.min(485, Math.round(relX)));
    let clampedY = Math.max(40, Math.min(260, Math.round(relY)));

    const snapX = Math.abs(clampedX - 262.5) < 8;
    const snapY = Math.abs(clampedY - 150) < 8;
    if (snapX) clampedX = 262;
    if (snapY) clampedY = 150;

    setSnapGuide({ x: snapX, y: snapY });

    if (activeSide === 'front') {
      setCard((prev) => ({ ...prev, frontLogoX: clampedX, frontLogoY: clampedY }));
    } else {
      setCard((prev) => ({ ...prev, backLogoX: clampedX, backLogoY: clampedY }));
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updateLogoPositionFromPointer(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    updateLogoPositionFromPointer(e);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      setIsDragging(false);
      setSnapGuide({ x: false, y: false });
    }
  };

  const applyLayoutPreset = (layout: CardLayoutStyle) => {
    if (layout === 'swiss') {
      setCard((prev) => ({
        ...prev,
        layout: 'swiss',
        frontLogoX: 262,
        frontLogoY: 138,
        backLogoX: 445,
        backLogoY: 68,
      }));
    } else if (layout === 'editorial') {
      setCard((prev) => ({
        ...prev,
        layout: 'editorial',
        frontLogoX: 115,
        frontLogoY: 132,
        backLogoX: 445,
        backLogoY: 68,
      }));
    } else {
      setCard((prev) => ({
        ...prev,
        layout: 'architect',
        frontLogoX: 262,
        frontLogoY: 150,
        backLogoX: 445,
        backLogoY: 68,
      }));
    }
  };

  const downloadCardPng = (side: 'front' | 'back') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${brandName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-business-card-${side}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const paletteSwatches = [
    { label: 'Primary', hex: palette.primary.hex },
    { label: 'Obsidian', hex: palette.neutralDark.hex },
    { label: 'White', hex: '#FFFFFF' },
    { label: 'Warm Paper', hex: '#F4F1EA' },
    { label: 'Accent', hex: palette.accent.hex },
    { label: 'Secondary', hex: palette.secondary.hex },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[var(--line)]">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--ind)] block mb-1">
            Stationery Studio &bull; Interactive 300 DPI Canvas
          </span>
          <h2 className="font-sans text-2xl font-bold text-[var(--ink)]">
            Interactive Business Card Studio
          </h2>
          <p className="font-sans text-xs text-[var(--mute)] mt-1 max-w-xl">
            Drag the logo directly on the card canvas (snaps to center), switch between 3 architectural layouts, and export print-ready 1050×600px PNGs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Layout Switcher */}
          <div className="flex items-center gap-1 p-1 bg-[var(--card)] border border-[var(--line)]">
            {(
              [
                { id: 'swiss', label: '01 · Swiss' },
                { id: 'editorial', label: '02 · Editorial' },
                { id: 'architect', label: '03 · Architect' },
              ] as const
            ).map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => applyLayoutPreset(l.id)}
                className={`px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer ${
                  card.layout === l.id
                    ? 'bg-[var(--ind)]/15 text-[var(--ind)] border border-[var(--ind)]/40 font-bold'
                    : 'text-[var(--mute)] hover:text-[var(--ink)]'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Side Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[var(--card)] border border-[var(--line)]">
            <button
              type="button"
              onClick={() => setActiveSide('front')}
              className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                activeSide === 'front'
                  ? 'bg-[var(--ind)] text-white font-bold'
                  : 'text-[var(--mute)] hover:text-[var(--ink)]'
              }`}
            >
              Front Side
            </button>
            <button
              type="button"
              onClick={() => setActiveSide('back')}
              className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                activeSide === 'back'
                  ? 'bg-[var(--ind)] text-white font-bold'
                  : 'text-[var(--mute)] hover:text-[var(--ink)]'
              }`}
            >
              Back Side
            </button>
          </div>
        </div>
      </div>

      {/* Studio Workspace: Canvas + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Canvas Viewport (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-8 md:p-12 bg-[#0E0E10] border border-[var(--line)] flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${palette.primary.hex} 0%, transparent 65%)`,
              }}
            />

            <div className="relative shadow-2xl">
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                style={{ width: '525px', height: '300px', touchAction: 'none' }}
                className="max-w-full h-auto border border-white/15 rounded-sm block cursor-grab active:cursor-grabbing"
              />
            </div>

            <span className="mt-4 text-[10px] font-mono text-white/50 uppercase tracking-widest z-10">
              &#10022; Click &amp; drag anywhere on the card to reposition the logo mark (auto-snaps to center)
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[var(--mute)] pt-2">
            <span>US Standard 3.5&quot; &times; 2.0&quot; @ 300 DPI (1050 &times; 600 px)</span>
            <button
              type="button"
              onClick={() => downloadCardPng(activeSide)}
              className="px-4 py-2 bg-[var(--ind)] hover:bg-[var(--ind)]/90 text-white font-medium transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>Download {activeSide.toUpperCase()} Print PNG</span>
              <span aria-hidden="true">&darr;</span>
            </button>
          </div>
        </div>

        {/* Right: Controls Panel (5 cols) */}
        <div className="lg:col-span-5 p-6 border border-[var(--line)] bg-[var(--card)] space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--ink)] font-bold">
              Editing: {activeSide.toUpperCase()} SIDE
            </span>
            <button
              type="button"
              onClick={() => {
                if (activeSide === 'front') {
                  setCard((prev) => ({ ...prev, frontLogoX: 262, frontLogoY: 138, frontLogoScale: 1.15 }));
                } else {
                  setCard((prev) => ({ ...prev, backLogoX: 445, backLogoY: 68, backLogoScale: 0.65 }));
                }
              }}
              className="font-mono text-[10px] text-[var(--ind)] hover:underline cursor-pointer"
            >
              Reset Logo Position
            </button>
          </div>

          {/* Background Color Swatch Picker */}
          <div>
            <label className="block font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-2">
              Paper / Card Stock Color (Auto-Contrasts Ink)
            </label>
            <div className="grid grid-cols-6 gap-2">
              {paletteSwatches.map((swatch, i) => {
                const currentBg = activeSide === 'front' ? card.frontBg : card.backBg;
                const isSelected = currentBg.toLowerCase() === swatch.hex.toLowerCase();
                return (
                  <button
                    key={i}
                    type="button"
                    title={`${swatch.label} (${swatch.hex})`}
                    onClick={() => {
                      const autoText = getAutoContrastText(swatch.hex);
                      if (activeSide === 'front') {
                        setCard((prev) => ({ ...prev, frontBg: swatch.hex, frontTextColor: autoText }));
                      } else {
                        setCard((prev) => ({ ...prev, backBg: swatch.hex, backTextColor: autoText }));
                      }
                    }}
                    className={`h-9 border transition-all cursor-pointer ${
                      isSelected ? 'ring-2 ring-[var(--ind)] scale-105' : 'border-[var(--line)] hover:scale-105'
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                  />
                );
              })}
            </div>
          </div>

          {/* Logo Contrast Mode Selector */}
          <div>
            <label className="block font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-2">
              Logo Ink Polarity
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(
                [
                  { id: 'auto', label: 'Auto Adapt' },
                  { id: 'white', label: 'White Mono' },
                  { id: 'black', label: 'Dark Mono' },
                  { id: 'original', label: 'Original' },
                ] as const
              ).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setCard((prev) => ({ ...prev, logoMode: m.id }))}
                  className={`px-2 py-1.5 text-[10px] font-mono border transition-colors cursor-pointer ${
                    card.logoMode === m.id
                      ? 'bg-[var(--ind)]/15 border-[var(--ind)] text-[var(--ind)] font-bold'
                      : 'bg-[var(--bg)] border-[var(--line)] text-[var(--mute)] hover:text-[var(--ink)]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Controls specific to Front */}
          {activeSide === 'front' && (
            <div className="space-y-4 pt-4 border-t border-[var(--line)]">
              <div>
                <label className="block font-mono text-xs text-[var(--mute)] uppercase tracking-wider mb-1.5">
                  Front Wordmark / Tagline
                </label>
                <input
                  type="text"
                  value={card.frontTagline}
                  onChange={(e) => setCard((prev) => ({ ...prev, frontTagline: e.target.value }))}
                  className="w-full px-3 py-2 bg-[var(--bg)] border border-[var(--line)] text-xs text-[var(--ink)] font-sans focus:outline-none focus:border-[var(--ind)]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-[var(--mute)] mb-1">
                  <span>Logo Scale</span>
                  <span>{Math.round(card.frontLogoScale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="2.5"
                  step="0.05"
                  value={card.frontLogoScale}
                  onChange={(e) => setCard((prev) => ({ ...prev, frontLogoScale: parseFloat(e.target.value) }))}
                  className="w-full accent-[var(--ind)] cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Controls specific to Back */}
          {activeSide === 'back' && (
            <div className="space-y-4 pt-4 border-t border-[var(--line)]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] text-[var(--mute)] uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    value={card.fullName}
                    onChange={(e) => setCard((prev) => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-2.5 py-1.5 bg-[var(--bg)] border border-[var(--line)] text-xs text-[var(--ink)] font-sans focus:outline-none focus:border-[var(--ind)]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-[var(--mute)] uppercase mb-1">Role / Title</label>
                  <input
                    type="text"
                    value={card.jobTitle}
                    onChange={(e) => setCard((prev) => ({ ...prev, jobTitle: e.target.value }))}
                    className="w-full px-2.5 py-1.5 bg-[var(--bg)] border border-[var(--line)] text-xs text-[var(--ink)] font-sans focus:outline-none focus:border-[var(--ind)]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[var(--mute)] uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  value={card.email}
                  onChange={(e) => setCard((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-2.5 py-1.5 bg-[var(--bg)] border border-[var(--line)] text-xs text-[var(--ink)] font-sans focus:outline-none focus:border-[var(--ind)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] text-[var(--mute)] uppercase mb-1">Telephone</label>
                  <input
                    type="text"
                    value={card.phone}
                    onChange={(e) => setCard((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-2.5 py-1.5 bg-[var(--bg)] border border-[var(--line)] text-xs text-[var(--ink)] font-sans focus:outline-none focus:border-[var(--ind)]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-[var(--mute)] uppercase mb-1">Website</label>
                  <input
                    type="text"
                    value={card.website}
                    onChange={(e) => setCard((prev) => ({ ...prev, website: e.target.value }))}
                    className="w-full px-2.5 py-1.5 bg-[var(--bg)] border border-[var(--line)] text-xs text-[var(--ink)] font-sans focus:outline-none focus:border-[var(--ind)]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[var(--mute)] uppercase mb-1">Studio Locations</label>
                <input
                  type="text"
                  value={card.location}
                  onChange={(e) => setCard((prev) => ({ ...prev, location: e.target.value }))}
                  className="w-full px-2.5 py-1.5 bg-[var(--bg)] border border-[var(--line)] text-xs text-[var(--ink)] font-sans focus:outline-none focus:border-[var(--ind)]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-[var(--mute)] mb-1">
                  <span>Back Logo Scale</span>
                  <span>{Math.round(card.backLogoScale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.3"
                  max="1.5"
                  step="0.05"
                  value={card.backLogoScale}
                  onChange={(e) => setCard((prev) => ({ ...prev, backLogoScale: parseFloat(e.target.value) }))}
                  className="w-full accent-[var(--ind)] cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
