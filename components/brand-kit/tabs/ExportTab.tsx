'use client';

import React, { useState } from 'react';
import { BrandKitState } from '@/lib/brand-kit/types';
import { generateBrandGuidelinesPdf } from '@/lib/brand-kit/pdf-generator';
import { generateBrandKitZip } from '@/lib/brand-kit/zip-generator';

interface ExportTabProps {
  state: BrandKitState;
}

export default function ExportTab({ state }: ExportTabProps) {
  const [isExportingZip, setIsExportingZip] = useState(false);
  const [zipProgress, setZipProgress] = useState('');
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const handleDownloadZip = async () => {
    if (isExportingZip) return;
    setIsExportingZip(true);
    setZipProgress('Initializing ZIP packager...');

    try {
      const zipBlob = await generateBrandKitZip(state, (msg) => setZipProgress(msg));
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${state.brandName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-brand-assets.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to create ZIP package:', err);
    } finally {
      setIsExportingZip(false);
      setZipProgress('');
    }
  };

  const handleDownloadPdf = async () => {
    if (isExportingPdf) return;
    setIsExportingPdf(true);
    try {
      const blob = await generateBrandGuidelinesPdf(state);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${state.brandName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-brand-guidelines.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const packageItems = [
    {
      category: '01 · Guidelines Manual',
      title: `${state.brandName} Brand Guidelines (PDF)`,
      details: 'Multi-page vector manual: scalability audit, clear space, colors, type scale, and misuses.',
      icon: '📄',
    },
    {
      category: '02 · Logo Assets',
      title: 'Original & Monochrome Renders',
      details: 'Original mark, pure white monochrome, pure black monochrome, 32px favicon, and 180px app icon.',
      icon: '📐',
    },
    {
      category: '03 · Color Tokens',
      title: 'Design Tokens & Swatches',
      details: 'Machine-readable color-palette.json and quick reference color-swatches.txt.',
      icon: '🎨',
    },
    {
      category: '04 · Collateral Mockups',
      title: '6 Composite Mockups (PNG)',
      details: '1200x900px mockups: business card, letterhead, tote bag, ceramic mug, signage, and social post.',
      icon: '🖼️',
    },
    {
      category: '05 · Scalability Audit',
      title: 'Logo Scalability Report (TXT)',
      details: 'Complete 7-factor breakdown, aspect ratio diagnostics, and recommended designer fixes.',
      icon: '📊',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[var(--line)]">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--ind)] block mb-1">
            Production Package &bull; Agency Handoff
          </span>
          <h2 className="font-sans text-2xl font-bold text-[var(--ink)]">
            Export Complete Brand Kit
          </h2>
          <p className="font-sans text-xs text-[var(--mute)] mt-1 max-w-xl">
            Download your structured brand identity archive packaging vector guidelines, monochrome assets, color tokens, mockups, and the scalability audit.
          </p>
        </div>

        {/* Primary ZIP Action */}
        <button
          type="button"
          onClick={handleDownloadZip}
          disabled={isExportingZip}
          className="px-6 py-3.5 bg-[var(--ind)] hover:bg-[var(--ind)]/90 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer flex items-center gap-3 disabled:opacity-50"
        >
          {isExportingZip ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{zipProgress || 'Building ZIP...'}</span>
            </>
          ) : (
            <>
              <span>&darr;</span>
              <span>Download Complete Kit (.ZIP)</span>
            </>
          )}
        </button>
      </div>

      {/* Package Contents Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packageItems.map((item, i) => (
          <div
            key={i}
            className="p-6 border border-[var(--line)] bg-[var(--card)] flex flex-col justify-between space-y-4 hover:border-[var(--ind)]/50 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-[var(--ind)] uppercase font-semibold">
                  {item.category}
                </span>
                <span className="text-base">{item.icon}</span>
              </div>
              <h4 className="font-sans font-bold text-base text-[var(--ink)] mb-1.5">
                {item.title}
              </h4>
              <p className="font-sans text-xs text-[var(--mute)] leading-relaxed">
                {item.details}
              </p>
            </div>
            <div className="pt-3 border-t border-[var(--line)] text-[10px] font-mono text-[var(--mute)]">
              &check; Included in ZIP package
            </div>
          </div>
        ))}

        {/* Standalone PDF Download Card */}
        <div className="p-6 border border-[var(--ind)]/30 bg-[var(--ind)]/5 flex flex-col justify-between space-y-4">
          <div>
            <span className="font-mono text-[10px] text-[var(--ind)] uppercase font-semibold block mb-1">
              Standalone Document
            </span>
            <h4 className="font-sans font-bold text-base text-[var(--ink)] mb-1.5">
              Brand Guidelines Manual (PDF)
            </h4>
            <p className="font-sans text-xs text-[var(--mute)] leading-relaxed">
              Export only the multi-page vector PDF manual without packaging the full ZIP archive.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="w-full py-2.5 px-4 bg-[var(--card)] hover:bg-[var(--ind)] hover:text-white border border-[var(--line)] hover:border-[var(--ind)] text-xs font-mono text-[var(--ink)] transition-colors cursor-pointer flex items-center justify-between"
          >
            <span>{isExportingPdf ? 'Compiling PDF...' : 'Download PDF Only'}</span>
            <span aria-hidden="true">&darr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
