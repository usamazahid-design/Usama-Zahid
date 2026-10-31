'use client';

import React, { useState, useEffect } from 'react';
import { MOCKUP_TEMPLATES, MockupConfig, renderMockupCanvas, MockupBrandContext } from '@/lib/brand-kit/mockups-config';
import { ColorPalette } from '@/lib/brand-kit/types';

interface MockupsTabProps {
  logoDataUrl: string;
  brandName: string;
  tagline?: string;
  industry?: string;
  palette?: ColorPalette | null;
}

export default function MockupsTab({ logoDataUrl, brandName, tagline, industry, palette }: MockupsTabProps) {
  const [renderedMockups, setRenderedMockups] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [logoMode, setLogoMode] = useState<'auto' | 'original' | 'white' | 'black'>('auto');
  const [previewModalTpl, setPreviewModalTpl] = useState<MockupConfig | null>(null);

  useEffect(() => {
    let cancelled = false;

    const renderAll = async () => {
      setLoading(true);
      const results: Record<string, string> = {};

      const brandContext: MockupBrandContext = {
        brandName: brandName || 'Acme Studio',
        tagline: tagline || '',
        industry: industry || 'Technology & SaaS',
        primaryColor: palette?.primary?.hex || '#4B3FFF',
        accentColor: palette?.accent?.hex || '#00C7CE',
      };

      for (const template of MOCKUP_TEMPLATES) {
        if (cancelled) break;
        try {
          const dataUrl = await renderMockupCanvas(template, logoDataUrl, logoMode, brandContext);
          results[template.id] = dataUrl;
        } catch (e) {
          console.error(`Error rendering mockup ${template.id}:`, e);
        }
      }

      if (!cancelled) {
        setRenderedMockups(results);
        setLoading(false);
      }
    };

    renderAll();

    return () => {
      cancelled = true;
    };
  }, [logoDataUrl, logoMode, brandName, tagline, industry, palette]);

  const handleDownload = (mockupId: string) => {
    const dataUrl = renderedMockups[mockupId];
    if (!dataUrl) return;

    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${brandName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${mockupId}-mockup.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAll = () => {
    MOCKUP_TEMPLATES.forEach((tpl, i) => {
      setTimeout(() => {
        handleDownload(tpl.id);
      }, i * 200);
    });
  };

  return (
    <div className="space-y-10">
      {/* Top Bar with Description & Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[var(--line)]">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--ind)] block mb-1">
            Tactile Substrates &bull; Commercial Studio Photography
          </span>
          <h2 className="font-sans text-2xl font-bold text-[var(--ink)]">
            Photorealistic Collateral Mockups
          </h2>
          <p className="font-sans text-xs text-[var(--mute)] mt-1 max-w-xl leading-relaxed">
            Composites your logo onto 6 real-world photographic scenes (cotton travertine card, slate letterhead, woven linen tote, ceramic mug, bronze sign, and studio monitor) using substrate-aware blending.
          </p>
        </div>

        {/* Controls: Logo Tone Switcher & Bulk Download */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Logo Tone Selector */}
          <div className="flex items-center border border-[var(--line)] bg-[var(--card)] p-1 text-xs font-mono">
            <span className="px-2.5 py-1 text-[var(--mute)] text-[10px] uppercase tracking-wider hidden sm:inline">
              Mark Tone:
            </span>
            {(
              [
                { id: 'auto', label: 'Adaptive' },
                { id: 'original', label: 'Original' },
                { id: 'white', label: 'White' },
                { id: 'black', label: 'Black' },
              ] as const
            ).map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setLogoMode(mode.id)}
                className={`px-3 py-1 transition-all cursor-pointer ${logoMode === mode.id
                    ? 'bg-[var(--ind)] text-white font-semibold shadow-sm'
                    : 'text-[var(--mute)] hover:text-[var(--ink)]'
                  }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Download All Action */}
          <button
            type="button"
            onClick={handleDownloadAll}
            disabled={loading}
            className="px-4 py-2 bg-[var(--card)] hover:bg-[var(--ind)] hover:text-white border border-[var(--line)] hover:border-[var(--ind)] text-xs font-mono text-[var(--ink)] transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            <span>&darr;</span>
            <span>Download All 6 PNGs</span>
          </button>
        </div>
      </div>

      {loading && (
        <div className="p-12 border border-[var(--line)] bg-[var(--card)] text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[var(--ind)] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-mono text-xs text-[var(--mute)]">
            Compositing high-resolution photographic mockups with substrate texture blending...
          </p>
        </div>
      )}

      {/* Mockups Grid (6 items) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCKUP_TEMPLATES.map((tpl) => {
          const imageSrc = renderedMockups[tpl.id];
          return (
            <div
              key={tpl.id}
              className="border border-[var(--line)] bg-[var(--card)] flex flex-col justify-between overflow-hidden group hover:border-[var(--ind)]/60 transition-all duration-300 shadow-sm"
            >
              <div>
                {/* Mockup Canvas Image Preview */}
                <div
                  className="w-full aspect-[4/3] bg-[#0E0F12] border-b border-[var(--line)] relative overflow-hidden flex items-center justify-center cursor-zoom-in"
                  onClick={() => imageSrc && setPreviewModalTpl(tpl)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Inspect ${tpl.title}`}
                >
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={tpl.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-7 h-7 border-2 border-[var(--ind)] border-t-transparent rounded-full animate-spin" />
                  )}

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 text-[10px] font-mono px-2.5 py-0.5 bg-black/75 text-white backdrop-blur-md border border-white/15 tracking-wider uppercase">
                    {tpl.category}
                  </span>

                  {/* Resolution pill */}
                  <span className="absolute bottom-3 right-3 text-[9px] font-mono px-2 py-0.5 bg-black/60 text-white/80 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to Zoom &bull; 1200&times;896
                  </span>
                </div>

                {/* Information */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-sans font-bold text-base text-[var(--ink)] group-hover:text-[var(--ind)] transition-colors">
                      {tpl.title}
                    </h4>
                  </div>
                  <p className="font-sans text-xs text-[var(--mute)] leading-relaxed">
                    {tpl.description}
                  </p>
                </div>
              </div>

              {/* Download Action Footer */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => handleDownload(tpl.id)}
                  disabled={!imageSrc}
                  className="w-full py-2.5 px-4 border border-[var(--line)] group-hover:border-[var(--ind)] bg-[var(--bg)] hover:bg-[var(--ind)] hover:text-white text-xs font-mono text-[var(--ink)] transition-all cursor-pointer flex items-center justify-between"
                >
                  <span className="font-medium">Export High-Res PNG</span>
                  <span aria-hidden="true">&darr;</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen High-Res Inspection Modal */}
      {previewModalTpl && renderedMockups[previewModalTpl.id] && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => setPreviewModalTpl(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#121316] border border-white/20 p-4 md:p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#00C7CE]">
                  {previewModalTpl.category} &bull; Full-Resolution Proof
                </span>
                <h3 className="font-sans font-bold text-lg text-white">
                  {previewModalTpl.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleDownload(previewModalTpl.id)}
                  className="px-3.5 py-1.5 bg-[var(--ind)] hover:bg-[var(--ind)]/90 text-white text-xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Download PNG</span>
                  <span>&darr;</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewModalTpl(null)}
                  className="p-1.5 text-white/60 hover:text-white text-sm font-mono cursor-pointer"
                  aria-label="Close proof preview"
                >
                  &times;
                </button>
              </div>
            </div>

            <div className="w-full max-h-[75vh] overflow-hidden flex items-center justify-center bg-black/50 border border-white/10">
              <img
                src={renderedMockups[previewModalTpl.id]}
                alt={previewModalTpl.title}
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>

            <p className="font-mono text-[11px] text-white/50 text-center">
              Natural 1200 &times; 896 px &bull; High-DPI Canvas Multiply Compositing &bull; Substrate-Engineered
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
