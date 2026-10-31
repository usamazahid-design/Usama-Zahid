'use client';

import React, { useState } from 'react';
import { BrandVoicePreset } from '@/lib/brand-kit/default-presets';
import { fetchBrandAiStrategy } from '@/lib/brand-kit/ai-client';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandName: string;
  industry: string;
  colors: string[];
  scalabilityScore?: number;
  onApplyVoice: (preset: BrandVoicePreset) => void;
}

export default function AiAssistantModal({
  isOpen,
  onClose,
  brandName,
  industry,
  colors,
  scalabilityScore,
  onApplyVoice,
}: AiAssistantModalProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ data: BrandVoicePreset; source: 'ai' | 'rule-fallback' } | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetchBrandAiStrategy(brandName, industry, colors, scalabilityScore);
      setResult(res);
      onApplyVoice(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-up">
      <div className="relative w-full max-w-2xl bg-[var(--card)] border border-[var(--line)] shadow-2xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--line)]">
          <div className="flex items-center gap-2">
            <span className="text-base text-[var(--ind)]">&#10022;</span>
            <h3 className="font-sans font-bold text-lg text-[var(--ink)]">
              AI Brand Voice &amp; Strategy Layer
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[var(--mute)] hover:text-[var(--ink)] text-xl leading-none cursor-pointer"
          >
            &times;
          </button>
        </div>

        <p className="text-xs font-sans text-[var(--mute)] leading-relaxed">
          Synthesizes your brand posture, mission statement, voice words, and dos &amp; don&apos;ts. Transmits strictly text tokens (brand name, industry, extracted hex values) through your serverless proxy. Never transmits images or customer files.
        </p>

        {/* Action Trigger */}
        {!result && !loading && (
          <div className="p-8 bg-[var(--bg)] border border-[var(--line)] text-center space-y-4">
            <div className="space-y-1">
              <span className="font-mono text-xs text-[var(--ind)] font-semibold uppercase">
                Ready to Analyze: {brandName}
              </span>
              <p className="text-xs text-[var(--mute)] font-sans">
                Sector: {industry} &bull; Palette: {colors.slice(0, 5).join(', ')}
              </p>
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              className="px-6 py-3 bg-[var(--ind)] hover:bg-[var(--ind)]/90 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              Generate Strategic Brand Copy
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="p-12 text-center space-y-3">
            <div className="w-8 h-8 border-2 border-[var(--ind)] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-mono text-xs text-[var(--mute)]">
              Contacting secure serverless proxy &amp; generating brand voice...
            </p>
          </div>
        )}

        {/* Generated Results View */}
        {result && (
          <div className="space-y-6 pt-2">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-[var(--mute)]">Engine Source:</span>
              <span className="px-2 py-0.5 border border-[var(--ind)]/30 text-[var(--ind)] bg-[var(--ind)]/5">
                {result.source === 'ai' ? 'Serverless AI Proxy (OpenAI-compatible)' : 'Curated Rule-Based Design Matrix'}
              </span>
            </div>

            {/* Voice Words */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase text-[var(--mute)] tracking-wider">
                Core Brand Voice Keywords
              </span>
              <div className="flex flex-wrap gap-2">
                {result.data.voiceWords.map((word, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[var(--bg)] border border-[var(--line)] text-xs font-mono font-semibold text-[var(--ink)]"
                  >
                    #{word}
                  </span>
                ))}
              </div>
            </div>

            {/* Mission Statement */}
            <div className="p-4 bg-[var(--bg)] border border-[var(--line)] space-y-1">
              <span className="font-mono text-[10px] uppercase text-[var(--ind)] tracking-wider block">
                Brand Mission
              </span>
              <p className="font-sans text-xs text-[var(--ink)] leading-relaxed italic">
                &ldquo;{result.data.mission}&rdquo;
              </p>
            </div>

            {/* Brand Story */}
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase text-[var(--mute)] tracking-wider block">
                Brand Story &amp; Origin Posture
              </span>
              <p className="font-sans text-xs text-[var(--mute)] leading-relaxed">
                {result.data.brandStory}
              </p>
            </div>

            {/* Taglines */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase text-[var(--mute)] tracking-wider block">
                Suggested Taglines
              </span>
              <div className="space-y-1">
                {result.data.taglines.map((t, idx) => (
                  <div key={idx} className="p-2 border border-[var(--line)] text-xs font-sans text-[var(--ink)]">
                    &bull; {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Dos and Don'ts */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase text-[var(--mute)] tracking-wider block">
                Brand Dos and Don&apos;ts
              </span>
              <div className="space-y-2">
                {result.data.dosAndDonts.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-2 text-xs font-sans">
                    <div className="p-2.5 bg-[#00C7CE]/5 border border-[#00C7CE]/20 text-[var(--ink)]">
                      <b className="text-[#00C7CE] font-mono block mb-0.5">&check; DO</b>
                      <span>{item.do}</span>
                    </div>
                    <div className="p-2.5 bg-red-500/5 border border-red-500/20 text-[var(--ink)]">
                      <b className="text-red-500 font-mono block mb-0.5">&times; DON&apos;T</b>
                      <span>{item.dont}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--line)] flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[var(--ind)] text-white font-mono text-xs cursor-pointer"
              >
                Apply to Guidelines &amp; Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
