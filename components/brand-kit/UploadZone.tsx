'use client';

import React, { useState, useRef } from 'react';
import { SAMPLE_LOGOS, SampleLogo } from '@/lib/brand-kit/sample-logos';

interface UploadZoneProps {
  onLoadLogo: (
    fileDataUrl: string,
    isSvg: boolean,
    fileName: string,
    fileSize: number,
    brandName: string,
    industry: string,
    tagline: string
  ) => void;
  isProcessing: boolean;
}

export default function UploadZone({ onLoadLogo, isProcessing }: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('Technology & SaaS');
  const [tagline, setTagline] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError(null);
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit. Please upload a smaller logo.');
      return;
    }

    const isSvg = file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg');
    const isImage = file.type.startsWith('image/') || isSvg;
    if (!isImage) {
      setError('Unsupported file type. Please upload a PNG, JPG, or SVG file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) return;

      const derivedName = brandName.trim() || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      onLoadLogo(
        dataUrl,
        isSvg,
        file.name,
        file.size,
        derivedName,
        industry.trim() || 'General',
        tagline.trim()
      );
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const loadSample = (sample: SampleLogo) => {
    setBrandName(sample.brandName);
    setIndustry(sample.industry);
    setTagline(sample.tagline);
    onLoadLogo(
      sample.dataUrl,
      true,
      `${sample.id}-logo.svg`,
      sample.svg.length,
      sample.brandName,
      sample.industry,
      sample.tagline
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12">
      {/* Upload Box & Brand Details Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Drag & Drop Zone */}
        <div className="lg:col-span-7 flex flex-col">
          <div
            className={`relative flex-1 flex flex-col items-center justify-center p-8 md:p-12 border-2 border-dashed transition-all duration-300 min-h-[360px] cursor-pointer text-center group ${
              dragActive
                ? 'border-[var(--ind)] bg-[var(--ind)]/5 shadow-xl'
                : 'border-[var(--line)] hover:border-[var(--ind)]/70 bg-[var(--card)] hover:bg-[var(--card)]/90'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Upload logo file"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,.svg,.webp"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
            />

            {/* Glowing Icon Frame */}
            <div className="w-16 h-16 rounded-full border border-[var(--line)] bg-[var(--bg)] flex items-center justify-center mb-6 group-hover:scale-105 group-hover:border-[var(--ind)] group-hover:shadow-[0_0_24px_rgba(75,63,255,0.25)] transition-all duration-300">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                className="text-[var(--ind)]"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>

            <h3 className="font-sans font-bold text-lg md:text-xl text-[var(--ink)] mb-2 tracking-tight">
              Drop your logo mark here
            </h3>
            <p className="font-sans text-xs md:text-sm text-[var(--mute)] max-w-sm mb-5 leading-relaxed">
              Accepts <strong>SVG, PNG, or JPG</strong> up to 5MB. Vector SVG is strongly recommended for infinite scalability.
            </p>

            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--ind)] font-medium px-4 py-2 border border-[var(--ind)]/40 bg-[var(--ind)]/5 group-hover:bg-[var(--ind)] group-hover:text-white transition-all duration-200">
              <span>Browse local file</span>
              <span aria-hidden="true">&rarr;</span>
            </span>

            {error && (
              <p className="mt-4 text-xs font-mono text-red-500 bg-red-500/10 px-3 py-2 border border-red-500/20">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Right: Brand Meta Details */}
        <div className="lg:col-span-5 p-8 border border-[var(--line)] bg-[var(--card)] flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[var(--line)] mb-6">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--mute)]">
                Brand Parameters
              </span>
              <span className="text-[10px] font-mono uppercase text-[#00C7CE] px-2 py-0.5 border border-[#00C7CE]/30 bg-[#00C7CE]/5">
                Client-Side &bull; Private
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-mono text-[11px] text-[var(--mute)] uppercase tracking-wider mb-2">
                  Brand Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme Architecture"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[var(--bg)] border border-[var(--line)] focus:border-[var(--ind)] focus:outline-none text-sm text-[var(--ink)] font-sans transition-colors rounded-none placeholder:text-[var(--mute)]/50"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-[var(--mute)] uppercase tracking-wider mb-2">
                  Industry / Sector
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[var(--bg)] border border-[var(--line)] focus:border-[var(--ind)] focus:outline-none text-sm text-[var(--ink)] font-sans transition-colors rounded-none cursor-pointer"
                >
                  <option value="Technology & SaaS">Technology &amp; SaaS</option>
                  <option value="Luxury & Goods">Luxury, Fashion &amp; Goods</option>
                  <option value="Finance & FinTech">Finance &amp; FinTech</option>
                  <option value="Healthcare & Wellness">Healthcare &amp; Wellness</option>
                  <option value="Creative Agency & Media">Creative Agency &amp; Media</option>
                  <option value="Architecture & Real Estate">Architecture &amp; Real Estate</option>
                  <option value="Food & Hospitality">Food &amp; Hospitality</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-[var(--mute)] uppercase tracking-wider mb-2">
                  Tagline (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Precision systems. Zero compromise."
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[var(--bg)] border border-[var(--line)] focus:border-[var(--ind)] focus:outline-none text-sm text-[var(--ink)] font-sans transition-colors rounded-none placeholder:text-[var(--mute)]/50"
                />
              </div>
            </div>
          </div>

          <p className="text-[11px] font-mono text-[var(--mute)] mt-6 pt-4 border-t border-[var(--line)] leading-relaxed">
            Privacy Guarantee: Your logo is analyzed 100% locally via Canvas in your browser. No files are ever sent to a remote server.
          </p>
        </div>
      </div>

      {/* Built-in Sample Logos Section */}
      <div className="pt-8 border-t border-[var(--line)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--ind)] block mb-1">
              One-Click Benchmark Evaluation
            </span>
            <h4 className="font-sans font-bold text-base text-[var(--ink)]">
              No logo ready? Test with 3 built-in benchmark marks:
            </h4>
            <p className="text-xs text-[var(--mute)] font-sans mt-0.5">
              Engineered to showcase distinct scalability behaviors from 9.0+ perfection to complex detail breakdown.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[var(--ind)] hidden sm:block">Click any mark to run live &darr;</span>
        </div>

        {/* 3 Benchmark Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_LOGOS.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => loadSample(sample)}
              disabled={isProcessing}
              className="group p-6 border border-[var(--line)] hover:border-[var(--ind)] bg-[var(--card)] transition-all duration-300 text-left flex flex-col justify-between hover:shadow-lg cursor-pointer relative overflow-hidden"
            >
              <div>
                {/* Logo Frame: Strict containment with img + max-w/h-full to prevent any breakout */}
                <div className="w-full h-36 bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center p-6 mb-5 group-hover:scale-[1.02] transition-transform overflow-hidden relative">
                  <img
                    src={sample.dataUrl}
                    alt={sample.brandName}
                    className="w-16 h-16 max-w-full max-h-full object-contain pointer-events-none drop-shadow-sm"
                  />
                </div>

                <div className="flex items-center justify-between mb-1">
                  <h5 className="font-sans font-bold text-base text-[var(--ink)] group-hover:text-[var(--ind)] transition-colors">
                    {sample.brandName}
                  </h5>
                </div>

                <span className="inline-block text-[10px] font-mono text-[var(--ind)] font-medium mb-3 px-2 py-0.5 border border-[var(--ind)]/25 bg-[var(--ind)]/5">
                  {sample.badge}
                </span>

                <p className="text-xs text-[var(--mute)] leading-relaxed font-sans">
                  {sample.description}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono text-[var(--ink)] group-hover:text-[var(--ind)]">
                <span className="font-semibold">Evaluate this mark</span>
                <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">&rarr;</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
