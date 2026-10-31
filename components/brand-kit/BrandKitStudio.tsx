'use client';

import React, { useState, useRef } from 'react';
import { BrandKitState, ColorPalette } from '@/lib/brand-kit/types';
import {
  extractDominantColorsFromImage,
  buildBrandPalette,
  buildAdaptiveLogoVariants,
} from '@/lib/brand-kit/color-extractor';
import { analyzeLogoScalability } from '@/lib/brand-kit/scalability-analyzer';
import { getRecommendedPairing } from '@/lib/brand-kit/typography-data';
import { getDefaultBrandPreset } from '@/lib/brand-kit/default-presets';
import { SAMPLE_LOGOS, SampleLogo } from '@/lib/brand-kit/sample-logos';
import { generateBrandGuidelinesPdf } from '@/lib/brand-kit/pdf-generator';
import UploadZone from './UploadZone';
import BrandKitTabs from './BrandKitTabs';
import ScalabilityTab from './tabs/ScalabilityTab';
import ColorsTab from './tabs/ColorsTab';
import TypographyTab from './tabs/TypographyTab';
import GuidelinesTab from './tabs/GuidelinesTab';
import MockupsTab from './tabs/MockupsTab';
import CardEditorTab from './tabs/CardEditorTab';
import ExportTab from './tabs/ExportTab';
import AiAssistantModal from './AiAssistantModal';

const INDUSTRY_OPTIONS = [
  'Technology & SaaS',
  'Architecture & Design',
  'Luxury Goods & Heritage',
  'Finance & FinTech',
  'Creative Agency & Media',
  'Developer Tools & SaaS',
  'Healthcare & Wellness',
  'Food & Hospitality',
];

export default function BrandKitStudio() {
  const [state, setState] = useState<BrandKitState>({
    logoDataUrl: '',
    fileName: '',
    fileSize: 0,
    isSvg: false,
    brandName: '',
    industry: 'Technology & SaaS',
    tagline: '',
    palette: null,
    scalability: null,
    selectedFontPair: null,
    activeTab: 'scalability',
    isAnalyzing: false,
  });

  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isEditingMeta, setIsEditingMeta] = useState(false);
  const quickUploadRef = useRef<HTMLInputElement>(null);

  const handleDownloadPdf = async () => {
    if (!state.logoDataUrl || isExportingPdf) return;
    setIsExportingPdf(true);
    try {
      const blob = await generateBrandGuidelinesPdf(state);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${(state.brandName || 'brand').toLowerCase().replace(/[^a-z0-9]/g, '-')}-brand-guidelines.pdf`;
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

  const handleLoadLogo = async (
    dataUrl: string,
    isSvg: boolean,
    fileName: string,
    fileSize: number,
    brandName: string,
    industry: string,
    tagline: string
  ) => {
    const cleanName = brandName.trim() || 'Untitled Brand';
    const cleanIndustry = industry.trim() || 'Technology & SaaS';
    const defaultPreset = getDefaultBrandPreset(cleanName, cleanIndustry);
    const resolvedTagline = tagline.trim() || defaultPreset.taglines[0] || '';

    setState((prev) => ({
      ...prev,
      isAnalyzing: true,
      logoDataUrl: dataUrl,
      fileName,
      fileSize,
      isSvg,
      brandName: cleanName,
      industry: cleanIndustry,
      tagline: resolvedTagline,
    }));

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = async () => {
      try {
        // Step 1: Perceptual Color Extraction & Adaptive Contrast Variants
        const rawHexes = await extractDominantColorsFromImage(img, 8);
        const palette = buildBrandPalette(rawHexes);
        const logoVariants = buildAdaptiveLogoVariants(img, dataUrl);

        // Step 1.5: 7-Factor Canvas Scalability Audit + Optical Diagnostics
        const scalability = await analyzeLogoScalability(img, isSvg);

        // Step 2: Geometry + Industry Typography Pairing
        const recommendedFont = getRecommendedPairing(cleanIndustry, scalability);

        setState((prev) => ({
          ...prev,
          logoVariants,
          palette,
          scalability,
          selectedFontPair: recommendedFont,
          aiCopy: {
            voiceWords: defaultPreset.voiceWords,
            brandStory: defaultPreset.brandStory,
            mission: defaultPreset.mission,
            taglines: defaultPreset.taglines,
            fontPairId: recommendedFont.id,
            colorNames: palette.all.map((c) => c.name),
            logoUsageNotes: defaultPreset.logoUsageNotes,
            dosAndDonts: defaultPreset.dosAndDonts,
          },
          isAnalyzing: false,
          activeTab: prev.logoDataUrl ? prev.activeTab : 'scalability',
        }));
      } catch (err) {
        console.error('Error analyzing logo:', err);
        setState((prev) => ({ ...prev, isAnalyzing: false }));
      }
    };

    img.onerror = () => {
      console.error('Failed to load image data URL');
      setState((prev) => ({ ...prev, isAnalyzing: false }));
    };

    img.src = dataUrl;
  };

  const handleQuickSampleSwitch = (sample: SampleLogo) => {
    handleLoadLogo(
      sample.dataUrl,
      true,
      `${sample.id}-logo.svg`,
      sample.svg.length,
      sample.brandName,
      sample.industry,
      sample.tagline
    );
  };

  const handleQuickFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return;
    const isSvg = file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg');
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      if (!dataUrl) return;
      const derivedName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
      handleLoadLogo(
        dataUrl,
        isSvg,
        file.name,
        file.size,
        derivedName || state.brandName,
        state.industry,
        state.tagline
      );
    };
    reader.readAsDataURL(file);
  };

  const handleIndustryChange = (newIndustry: string) => {
    const preset = getDefaultBrandPreset(state.brandName, newIndustry);
    const recommendedFont = getRecommendedPairing(newIndustry, state.scalability);
    setState((prev) => ({
      ...prev,
      industry: newIndustry,
      selectedFontPair: recommendedFont,
      aiCopy: {
        voiceWords: preset.voiceWords,
        brandStory: preset.brandStory,
        mission: preset.mission,
        taglines: preset.taglines,
        fontPairId: recommendedFont.id,
        colorNames: prev.palette ? prev.palette.all.map((c) => c.name) : preset.colorNames,
        logoUsageNotes: preset.logoUsageNotes,
        dosAndDonts: preset.dosAndDonts,
      },
    }));
  };

  const handleUpdatePalette = (newPalette: ColorPalette) => {
    setState((prev) => ({
      ...prev,
      palette: newPalette,
    }));
  };

  const handleReset = () => {
    setState({
      logoDataUrl: '',
      fileName: '',
      fileSize: 0,
      isSvg: false,
      brandName: '',
      industry: 'Technology & SaaS',
      tagline: '',
      palette: null,
      scalability: null,
      selectedFontPair: null,
      activeTab: 'scalability',
      isAnalyzing: false,
    });
  };

  return (
    <section className="w-full space-y-8 scroll-mt-28 md:scroll-mt-36" id="studio">
      {/* Hidden Quick File Input for switching logos directly inside the studio */}
      <input
        ref={quickUploadRef}
        type="file"
        accept=".png,.jpg,.jpeg,.svg,.webp"
        className="hidden"
        onChange={handleQuickFileChange}
      />

      {/* Processing State */}
      {state.isAnalyzing && (
        <div className="p-12 border border-[var(--line)] bg-[var(--card)] text-center space-y-5">
          <div className="w-12 h-12 border-2 border-[var(--ind)] border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ind)] block">
              Client-Side Optical Engine
            </span>
            <h3 className="font-sans font-bold text-lg text-[var(--ink)]">
              Running 7-Factor Canvas Heuristics &amp; Chromatic Quantization...
            </h3>
            <p className="font-mono text-xs text-[var(--mute)]">
              Sobel edge density &bull; 16px pixel grid stress test &bull; Otsu 1-bit monochrome stamp &bull; WCAG 2.1 contrast
            </p>
          </div>
        </div>
      )}

      {/* State 1: Upload Zone (when no logo loaded yet) */}
      {!state.logoDataUrl && !state.isAnalyzing && (
        <UploadZone onLoadLogo={handleLoadLogo} isProcessing={state.isAnalyzing} />
      )}

      {/* State 2: Active Studio Workspace */}
      {state.logoDataUrl && !state.isAnalyzing && state.palette && state.scalability && (
        <div className="space-y-6">
          {/* Studio Top Command Bar */}
          <div className="border border-[var(--line)] bg-[var(--card)] divide-y divide-[var(--line)]">
            {/* Row 1: Brand Identity + Live Swatches + Primary Actions */}
            <div className="p-5 md:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
              {/* Left: Logo Thumbnail + Editable Brand Meta */}
              <div className="flex items-start sm:items-center gap-4 w-full lg:w-auto">
                <button
                  type="button"
                  onClick={() => quickUploadRef.current?.click()}
                  title="Click to replace logo mark"
                  className="group relative w-16 h-16 p-2 bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--ind)] flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer"
                >
                  <img
                    src={state.logoVariants?.forDarkBg || state.logoDataUrl}
                    alt={state.brandName}
                    className="max-w-full max-h-full object-contain"
                  />
                  <span className="absolute inset-0 bg-black/75 text-white text-[9px] font-mono uppercase tracking-wider flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    Swap
                  </span>
                </button>

                <div className="flex-1 min-w-0">
                  {!isEditingMeta ? (
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h2 className="font-sans font-bold text-xl md:text-2xl text-[var(--ink)] tracking-tight truncate">
                          {state.brandName}
                        </h2>
                        <span className="text-[10px] font-mono px-2 py-0.5 border border-[var(--line)] bg-[var(--bg)] text-[var(--mute)]">
                          {state.industry}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 border border-[var(--ind)]/30 bg-[var(--ind)]/5 text-[var(--ind)]">
                          {state.isSvg ? 'SVG Vector' : `${state.scalability.boundingWidth}×${state.scalability.boundingHeight}px`}
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsEditingMeta(true)}
                          className="text-[11px] font-mono text-[var(--mute)] hover:text-[var(--ind)] underline underline-offset-4 cursor-pointer"
                        >
                          Edit Info
                        </button>
                      </div>
                      {state.tagline && (
                        <p className="text-xs font-sans text-[var(--mute)] mt-1 truncate">
                          &ldquo;{state.tagline}&rdquo;
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full max-w-2xl">
                      <input
                        type="text"
                        value={state.brandName}
                        onChange={(e) => setState((prev) => ({ ...prev, brandName: e.target.value }))}
                        placeholder="Brand Name"
                        className="px-3 py-1.5 bg-[var(--bg)] border border-[var(--ind)] text-xs font-sans text-[var(--ink)] focus:outline-none"
                      />
                      <select
                        value={state.industry}
                        onChange={(e) => handleIndustryChange(e.target.value)}
                        className="px-3 py-1.5 bg-[var(--bg)] border border-[var(--line)] text-xs font-sans text-[var(--ink)] focus:outline-none focus:border-[var(--ind)]"
                      >
                        {INDUSTRY_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={state.tagline}
                          onChange={(e) => setState((prev) => ({ ...prev, tagline: e.target.value }))}
                          placeholder="Tagline..."
                          className="flex-1 px-3 py-1.5 bg-[var(--bg)] border border-[var(--line)] text-xs font-sans text-[var(--ink)] focus:outline-none focus:border-[var(--ind)]"
                        />
                        <button
                          type="button"
                          onClick={() => setIsEditingMeta(false)}
                          className="px-2.5 py-1.5 bg-[var(--ind)] text-white text-xs font-mono cursor-pointer"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Live Palette Strip + Actions */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
                {/* 5-Role Palette Quick Strip */}
                <button
                  type="button"
                  onClick={() => setState((prev) => ({ ...prev, activeTab: 'colors' }))}
                  title="Click to inspect & customize brand colors"
                  className="flex items-center gap-1 p-1.5 border border-[var(--line)] hover:border-[var(--ind)] bg-[var(--bg)] transition-colors cursor-pointer"
                >
                  {state.palette.all.map((c) => (
                    <span
                      key={c.role}
                      className="w-4 h-4 border border-white/15 inline-block"
                      style={{ backgroundColor: c.hex }}
                      title={`${c.roleLabel}: ${c.hex}`}
                    />
                  ))}
                  <span className="text-[10px] font-mono text-[var(--mute)] px-1.5">Palette</span>
                </button>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAiModalOpen(true)}
                    className="px-3 py-2 border border-[var(--ind)]/50 hover:border-[var(--ind)] bg-[var(--ind)]/5 text-[var(--ind)] hover:bg-[var(--ind)]/10 text-xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>&#10022;</span>
                    <span>Brand Voice &amp; Strategy</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={isExportingPdf}
                    className="px-4 py-2 bg-[var(--ind)] hover:bg-[var(--ind)]/90 text-white text-xs font-mono font-semibold transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
                  >
                    {isExportingPdf ? (
                      <>
                        <span className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                        <span>Compiling PDF...</span>
                      </>
                    ) : (
                      <>
                        <span>&darr;</span>
                        <span>Guidelines PDF</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-3 py-2 border border-[var(--line)] hover:border-[var(--ind)] text-xs font-mono text-[var(--mute)] hover:text-[var(--ink)] transition-colors cursor-pointer"
                  >
                    &larr; Upload New
                  </button>
                </div>
              </div>
            </div>

            {/* Row 2: Quick Benchmark Switcher Bar */}
            <div className="px-5 py-2.5 bg-[var(--bg)]/60 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[var(--mute)] uppercase tracking-wider">Quick Benchmark Switch:</span>
                {SAMPLE_LOGOS.map((sample) => {
                  const isCurrent = state.brandName === sample.brandName;
                  return (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => handleQuickSampleSwitch(sample)}
                      className={`px-2.5 py-1 border transition-colors cursor-pointer flex items-center gap-1.5 ${
                        isCurrent
                          ? 'border-[var(--ind)] bg-[var(--ind)]/10 text-[var(--ink)] font-semibold'
                          : 'border-[var(--line)] bg-[var(--card)] text-[var(--mute)] hover:text-[var(--ink)] hover:border-[var(--ind)]/50'
                      }`}
                    >
                      <img src={sample.dataUrl} alt="" className="w-3.5 h-3.5 object-contain" />
                      <span>{sample.brandName}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => quickUploadRef.current?.click()}
                className="text-[var(--ind)] hover:underline cursor-pointer"
              >
                + Browse Local SVG/PNG
              </button>
            </div>
          </div>

          {/* Step-Indexed Tab Navigation */}
          <BrandKitTabs
            activeTab={state.activeTab}
            onSelectTab={(tab) => setState((prev) => ({ ...prev, activeTab: tab }))}
            scalabilityScore={state.scalability.overallScore}
            primaryHex={state.palette.primary.hex}
            fontHeading={state.selectedFontPair?.headingFont}
          />

          {/* Active Tab Content */}
          <div>
            {state.activeTab === 'scalability' && (
              <ScalabilityTab
                result={state.scalability}
                logoDataUrl={state.logoDataUrl}
                logoVariants={state.logoVariants}
                brandName={state.brandName}
                palette={state.palette}
              />
            )}

            {state.activeTab === 'colors' && (
              <ColorsTab
                palette={state.palette}
                brandName={state.brandName}
                onUpdatePalette={handleUpdatePalette}
              />
            )}

            {state.activeTab === 'typography' && state.selectedFontPair && (
              <TypographyTab
                selectedPair={state.selectedFontPair}
                onSelectPair={(pair) => setState((prev) => ({ ...prev, selectedFontPair: pair }))}
                brandName={state.brandName}
                tagline={state.tagline}
              />
            )}

            {state.activeTab === 'guidelines' && (
              <GuidelinesTab
                logoDataUrl={state.logoDataUrl}
                logoVariants={state.logoVariants}
                brandName={state.brandName}
                palette={state.palette}
              />
            )}

            {state.activeTab === 'mockups' && (
              <MockupsTab
                logoDataUrl={state.logoDataUrl}
                brandName={state.brandName}
                tagline={state.tagline}
                industry={state.industry}
                palette={state.palette}
              />
            )}

            {state.activeTab === 'card' && (
              <CardEditorTab
                logoDataUrl={state.logoDataUrl}
                logoVariants={state.logoVariants}
                brandName={state.brandName}
                palette={state.palette}
                selectedFontPair={state.selectedFontPair}
              />
            )}

            {state.activeTab === 'export' && <ExportTab state={state} />}
          </div>
        </div>
      )}

      {/* AI Voice & Strategy Modal */}
      {state.palette && (
        <AiAssistantModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          brandName={state.brandName}
          industry={state.industry}
          colors={state.palette.all.map((c) => c.hex)}
          scalabilityScore={state.scalability?.overallScore}
          onApplyVoice={(preset) => {
            setState((prev) => ({
              ...prev,
              tagline: preset.taglines[0] || prev.tagline,
              aiCopy: {
                voiceWords: preset.voiceWords,
                brandStory: preset.brandStory,
                mission: preset.mission,
                taglines: preset.taglines,
                fontPairId: preset.fontPairId,
                colorNames: preset.colorNames,
                logoUsageNotes: preset.logoUsageNotes,
                dosAndDonts: preset.dosAndDonts,
              },
            }));
          }}
        />
      )}
    </section>
  );
}
