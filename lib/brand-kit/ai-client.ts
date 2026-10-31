import { BrandVoicePreset, getDefaultBrandPreset } from './default-presets';

export async function fetchBrandAiStrategy(
  brandName: string,
  industry: string,
  colors: string[],
  scalabilityScore?: number
): Promise<{ data: BrandVoicePreset; source: 'ai' | 'rule-fallback' }> {
  const fallback = getDefaultBrandPreset(brandName, industry);

  // Check endpoint: NEXT_PUBLIC_BRAND_AI_ENDPOINT or fallback to /api/brand-ai
  const endpoint =
    process.env.NEXT_PUBLIC_BRAND_AI_ENDPOINT ||
    (typeof window !== 'undefined' && window.location.origin ? `${window.location.origin}/api/brand-ai` : null);

  if (!endpoint) {
    return { data: fallback, source: 'rule-fallback' };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        brandName,
        industry,
        colors,
        scalabilityScore: scalabilityScore || 8.0,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn('AI proxy returned non-OK status, falling back to rule-based presets.');
      return { data: fallback, source: 'rule-fallback' };
    }

    const json = await res.json();

    // Validate that required fields exist
    if (
      Array.isArray(json.voiceWords) &&
      typeof json.brandStory === 'string' &&
      typeof json.mission === 'string' &&
      Array.isArray(json.taglines)
    ) {
      return {
        data: {
          voiceWords: json.voiceWords,
          brandStory: json.brandStory,
          mission: json.mission,
          taglines: json.taglines,
          fontPairId: json.fontPairId || fallback.fontPairId,
          colorNames: Array.isArray(json.colorNames) ? json.colorNames : fallback.colorNames,
          logoUsageNotes: json.logoUsageNotes || fallback.logoUsageNotes,
          dosAndDonts: Array.isArray(json.dosAndDonts) ? json.dosAndDonts : fallback.dosAndDonts,
        },
        source: 'ai',
      };
    }

    return { data: fallback, source: 'rule-fallback' };
  } catch (err) {
    console.warn('AI proxy network error or timeout. Seamlessly using rule-based presets.', err);
    return { data: fallback, source: 'rule-fallback' };
  }
}
