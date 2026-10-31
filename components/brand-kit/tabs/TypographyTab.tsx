'use client';

import React, { useState, useEffect } from 'react';
import { TypographyPairing } from '@/lib/brand-kit/types';
import { TYPOGRAPHY_PAIRINGS } from '@/lib/brand-kit/typography-data';

interface TypographyTabProps {
  selectedPair: TypographyPairing;
  onSelectPair: (pair: TypographyPairing) => void;
  brandName: string;
  tagline: string;
}

export default function TypographyTab({
  selectedPair,
  onSelectPair,
  brandName,
  tagline,
}: TypographyTabProps) {
  const [customText, setCustomText] = useState(
    brandName ? `${brandName}: ${tagline || 'Building coherent brand identity and software'}` : 'Design as a single coherent sequence.'
  );

  // Dynamically load Google Font stylesheet on selection
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const linkId = `google-font-${selectedPair.id}`;
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = selectedPair.googleFontsUrl;
      document.head.appendChild(link);
    }
  }, [selectedPair]);

  return (
    <div className="space-y-12">
      {/* Header & Pair Switcher */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[var(--line)]">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--ind)] block mb-1">
            Typographic Hierarchy &bull; Google Fonts Matrix
          </span>
          <h2 className="font-sans text-2xl font-bold text-[var(--ink)]">
            Curated Font Pairing System
          </h2>
          <p className="font-sans text-xs text-[var(--mute)] mt-1 max-w-xl">
            12 curated designer pairings matched to industry personalities. Tested for optical contrast, character set breadth, and screen rasterization.
          </p>
        </div>

        {/* Quick Dropdown Picker */}
        <div className="w-full lg:w-auto">
          <label className="block font-mono text-[10px] text-[var(--mute)] uppercase tracking-wider mb-1.5">
            Switch Pairing (12 Available)
          </label>
          <select
            value={selectedPair.id}
            onChange={(e) => {
              const pair = TYPOGRAPHY_PAIRINGS.find((p) => p.id === e.target.value);
              if (pair) onSelectPair(pair);
            }}
            className="w-full lg:w-72 px-3 py-2 bg-[var(--card)] border border-[var(--line)] text-xs font-mono text-[var(--ink)] focus:border-[var(--ind)] focus:outline-none"
          >
            {TYPOGRAPHY_PAIRINGS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Pairing Hero Card */}
      <div className="p-8 border border-[var(--line)] bg-[var(--card)] space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-[var(--ind)] font-semibold uppercase">
                Active Selection
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 border border-[var(--line)] text-[var(--mute)]">
                {selectedPair.category}
              </span>
            </div>
            <h3 className="font-sans font-bold text-xl text-[var(--ink)]">
              {selectedPair.headingFont} + {selectedPair.bodyFont}
            </h3>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {selectedPair.moodTags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 bg-[var(--bg)] border border-[var(--line)] text-[var(--mute)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <p className="font-sans text-xs text-[var(--mute)] leading-relaxed max-w-2xl">
          {selectedPair.description}
        </p>

        {/* Live Specimen Preview */}
        <div className="p-8 bg-[var(--bg)] border border-[var(--line)] rounded-none space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)]">
              Primary Display Font: {selectedPair.headingFont}
            </span>
            <div
              className="text-3xl md:text-5xl font-bold text-[var(--ink)] tracking-tight leading-tight"
              style={{ fontFamily: `"${selectedPair.headingFont}", sans-serif` }}
            >
              {brandName || 'Acme Architecture'}
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-[var(--line)]/60">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)]">
              Secondary Body Font: {selectedPair.bodyFont}
            </span>
            <p
              className="text-sm md:text-base text-[var(--ink)]/90 leading-relaxed max-w-2xl"
              style={{ fontFamily: `"${selectedPair.bodyFont}", sans-serif` }}
            >
              Good typography makes the brand message effortless to absorb. From micro-copy in dense data tables to billboard display hero copy, consistency creates trust.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Type Scale Ladder */}
      <div className="p-8 border border-[var(--line)] bg-[var(--card)] space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
          <div>
            <h3 className="font-sans font-semibold text-lg text-[var(--ink)]">
              Interactive Type Scale Ladder (1.250 Major Third)
            </h3>
            <p className="font-sans text-xs text-[var(--mute)] mt-0.5">
              Tested responsive font sizing hierarchy with live sample copy.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-xs font-mono text-[var(--mute)] whitespace-nowrap">Preview Text:</label>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full sm:w-64 px-3 py-1.5 bg-[var(--bg)] border border-[var(--line)] text-xs text-[var(--ink)] font-sans focus:outline-none focus:border-[var(--ind)]"
              placeholder="Type custom preview copy..."
            />
          </div>
        </div>

        <div className="space-y-8 divide-y divide-[var(--line)]/40">
          {/* Display */}
          <div className="pt-4 flex flex-col md:flex-row md:items-baseline gap-4">
            <div className="w-40 flex-shrink-0 font-mono text-xs text-[var(--mute)]">
              <span className="block font-bold text-[var(--ink)]">Display</span>
              <span>48px / 1.1 line-height</span>
            </div>
            <div
              className="text-4xl md:text-5xl font-bold text-[var(--ink)] tracking-tight leading-tight"
              style={{ fontFamily: `"${selectedPair.headingFont}", sans-serif` }}
            >
              {customText}
            </div>
          </div>

          {/* Heading 1 */}
          <div className="pt-6 flex flex-col md:flex-row md:items-baseline gap-4">
            <div className="w-40 flex-shrink-0 font-mono text-xs text-[var(--mute)]">
              <span className="block font-bold text-[var(--ink)]">Heading 1</span>
              <span>36px / 1.2 line-height</span>
            </div>
            <div
              className="text-3xl md:text-4xl font-semibold text-[var(--ink)] tracking-tight leading-snug"
              style={{ fontFamily: `"${selectedPair.headingFont}", sans-serif` }}
            >
              {customText}
            </div>
          </div>

          {/* Heading 2 */}
          <div className="pt-6 flex flex-col md:flex-row md:items-baseline gap-4">
            <div className="w-40 flex-shrink-0 font-mono text-xs text-[var(--mute)]">
              <span className="block font-bold text-[var(--ink)]">Heading 2</span>
              <span>28px / 1.25 line-height</span>
            </div>
            <div
              className="text-2xl md:text-3xl font-semibold text-[var(--ink)]"
              style={{ fontFamily: `"${selectedPair.headingFont}", sans-serif` }}
            >
              {customText}
            </div>
          </div>

          {/* Heading 3 */}
          <div className="pt-6 flex flex-col md:flex-row md:items-baseline gap-4">
            <div className="w-40 flex-shrink-0 font-mono text-xs text-[var(--mute)]">
              <span className="block font-bold text-[var(--ink)]">Heading 3</span>
              <span>20px / 1.3 line-height</span>
            </div>
            <div
              className="text-lg md:text-xl font-medium text-[var(--ink)]"
              style={{ fontFamily: `"${selectedPair.headingFont}", sans-serif` }}
            >
              {customText}
            </div>
          </div>

          {/* Body Regular */}
          <div className="pt-6 flex flex-col md:flex-row md:items-baseline gap-4">
            <div className="w-40 flex-shrink-0 font-mono text-xs text-[var(--mute)]">
              <span className="block font-bold text-[var(--ink)]">Body Regular</span>
              <span>15px / 1.6 line-height</span>
            </div>
            <p
              className="text-sm md:text-base text-[var(--ink)] leading-relaxed max-w-3xl"
              style={{ fontFamily: `"${selectedPair.bodyFont}", sans-serif` }}
            >
              {customText} The quick brown fox jumps over the lazy dog. Brand systems must adapt across fluid screen boundaries without breaking typographic rhythm or layout clarity.
            </p>
          </div>

          {/* Caption / Legal */}
          <div className="pt-6 flex flex-col md:flex-row md:items-baseline gap-4">
            <div className="w-40 flex-shrink-0 font-mono text-xs text-[var(--mute)]">
              <span className="block font-bold text-[var(--ink)]">Caption / Meta</span>
              <span>12px / 1.5 line-height</span>
            </div>
            <span
              className="text-xs text-[var(--mute)] uppercase tracking-wider font-mono"
              style={{ fontFamily: `"${selectedPair.bodyFont}", monospace` }}
            >
              &copy; 2026 {brandName || 'Brand Identity'} &bull; All rights reserved &bull; Specification v1.0
            </span>
          </div>
        </div>
      </div>

      {/* Grid of All 12 Curated Pairings */}
      <div className="p-8 border border-[var(--line)] bg-[var(--card)] space-y-6">
        <h3 className="font-sans font-semibold text-lg text-[var(--ink)] pb-4 border-b border-[var(--line)]">
          All 12 Curated Google Font Pairings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TYPOGRAPHY_PAIRINGS.map((pair) => {
            const isCurrent = pair.id === selectedPair.id;
            return (
              <button
                key={pair.id}
                type="button"
                onClick={() => onSelectPair(pair)}
                className={`p-5 border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'border-[var(--ind)] bg-[var(--ind)]/5 shadow-md ring-1 ring-[var(--ind)]'
                    : 'border-[var(--line)] bg-[var(--bg)] hover:border-[var(--ind)]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-[var(--ind)] uppercase font-semibold">
                      {pair.category}
                    </span>
                    {isCurrent && (
                      <span className="text-[9px] font-mono px-2 py-0.5 bg-[var(--ind)] text-white font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <h4 className="font-sans font-bold text-base text-[var(--ink)] mb-1">
                    {pair.headingFont} &amp; {pair.bodyFont}
                  </h4>
                  <p className="text-xs text-[var(--mute)] leading-relaxed font-sans mb-4">
                    {pair.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--line)]/60 flex items-center justify-between text-xs font-mono text-[var(--ink)]">
                  <span>Select pair</span>
                  <span aria-hidden="true">&rarr;</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
