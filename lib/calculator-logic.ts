import {
  CATEGORY_META,
  SCREEN_DEFAULT,
  SCREEN_MAX,
  SCREEN_MIN,
  TIER_META,
  type CalculatorLineItem,
  type CategoryKey,
  type MoneyRange,
  type TierKey,
  type TradeOffAxis,
} from './calculator-data';

export const CALCULATOR_STORAGE_KEY = 'uz_calculator_estimate';
export const CALCULATOR_EVENT = 'uz:calculator-estimate';

export interface LineEstimate {
  id: string;
  code: string;
  label: string;
  usdMin: number;
  usdMax: number;
  pkrMin: number;
  pkrMax: number;
  minWeeks: number;
  maxWeeks: number;
  scopeNote?: string;
  extraScreens?: number;
}

export interface EstimateResult {
  category: CategoryKey;
  tier: TierKey;
  tierLabel: string;
  pairLabel: string;
  screenCount: number;
  rows: LineEstimate[];
  usdMin: number;
  usdMax: number;
  pkrMin: number;
  pkrMax: number;
  minWeeks: number;
  maxWeeks: number;
}

export function clampScreenCount(value: number): number {
  if (!Number.isFinite(value)) return SCREEN_DEFAULT;
  return Math.min(SCREEN_MAX, Math.max(SCREEN_MIN, Math.round(value)));
}

export function toggleTradeOff(
  current: TradeOffAxis[],
  axis: TradeOffAxis
): TradeOffAxis[] {
  if (current.includes(axis)) {
    return current.filter((a) => a !== axis);
  }
  if (current.length < 2) {
    return [...current, axis];
  }
  return [...current.slice(1), axis];
}

export function resolveTier(selected: TradeOffAxis[]): TierKey | null {
  if (selected.length !== 2) return null;
  const set = new Set(selected);
  if (set.has('fast') && set.has('cheap')) return 'rapid';
  if (set.has('cheap') && set.has('good')) return 'foundation';
  if (set.has('fast') && set.has('good')) return 'priority';
  return null;
}

function addMoney(a: MoneyRange, b: MoneyRange): MoneyRange {
  return {
    usdMin: a.usdMin + b.usdMin,
    usdMax: a.usdMax + b.usdMax,
    pkrMin: a.pkrMin + b.pkrMin,
    pkrMax: a.pkrMax + b.pkrMax,
  };
}

function scaleMoney(range: MoneyRange, multiplier: number): MoneyRange {
  return {
    usdMin: range.usdMin * multiplier,
    usdMax: range.usdMax * multiplier,
    pkrMin: range.pkrMin * multiplier,
    pkrMax: range.pkrMax * multiplier,
  };
}

export function priceForItem(
  item: CalculatorLineItem,
  tier: TierKey,
  screenCount = SCREEN_DEFAULT
): LineEstimate {
  const quote = item.tiers[tier];
  let price: MoneyRange = { ...quote.price };
  let extraScreens = 0;

  if (item.screenPricing) {
    const screens = clampScreenCount(screenCount);
    extraScreens = Math.max(0, screens - item.screenPricing.baseScreens);
    if (extraScreens > 0) {
      price = addMoney(
        price,
        scaleMoney(item.screenPricing.perScreen[tier], extraScreens)
      );
    }
  }

  return {
    id: item.id,
    code: item.code,
    label: item.label,
    usdMin: price.usdMin,
    usdMax: price.usdMax,
    pkrMin: price.pkrMin,
    pkrMax: price.pkrMax,
    minWeeks: quote.timeline.minWeeks,
    maxWeeks: quote.timeline.maxWeeks,
    scopeNote: quote.scopeNote,
    extraScreens: extraScreens || undefined,
  };
}

export function aggregateEstimate(
  items: CalculatorLineItem[],
  tier: TierKey,
  screenCount = SCREEN_DEFAULT
): EstimateResult {
  const rows = items.map((item) => priceForItem(item, tier, screenCount));
  const totals = rows.reduce(
    (acc, row) => ({
      usdMin: acc.usdMin + row.usdMin,
      usdMax: acc.usdMax + row.usdMax,
      pkrMin: acc.pkrMin + row.pkrMin,
      pkrMax: acc.pkrMax + row.pkrMax,
      minWeeks: acc.minWeeks + row.minWeeks,
      maxWeeks: acc.maxWeeks + row.maxWeeks,
    }),
    {
      usdMin: 0,
      usdMax: 0,
      pkrMin: 0,
      pkrMax: 0,
      minWeeks: 0,
      maxWeeks: 0,
    }
  );

  const category = items[0]?.category ?? 'branding';

  return {
    category,
    tier,
    tierLabel: TIER_META[tier].label,
    pairLabel: TIER_META[tier].pair,
    screenCount: clampScreenCount(screenCount),
    rows,
    ...totals,
  };
}

export function formatPKR(n: number): string {
  return `PKR ${Math.round(n).toLocaleString('en-US')}`;
}

export function formatUSD(n: number): string {
  return `$${Math.round(n).toLocaleString('en-US')}`;
}

export function formatPkrRange(min: number, max: number): string {
  return `${formatPKR(min)} - ${formatPKR(max)}`;
}

export function formatUsdRange(min: number, max: number): string {
  return `${formatUSD(min)} - ${formatUSD(max)}`;
}

export function formatWeeks(min: number, max: number): string {
  const fmt = (w: number) => {
    if (w === 0) return '0';
    if (w % 1 === 0) return String(w);
    return w.toFixed(1).replace(/\.0$/, '');
  };
  if (min === max) {
    return min === 1 ? '1 week' : `${fmt(min)} weeks`;
  }
  return `${fmt(min)}-${fmt(max)} weeks`;
}

export function matchBudgetValue(usdMax: number): string {
  if (usdMax < 8000) return '<8k';
  if (usdMax < 18000) return '8-18k';
  if (usdMax < 35000) return '18-35k';
  return '35k+';
}

export function matchTimelineValue(maxWeeks: number): string {
  if (maxWeeks < 4) return 'urgent';
  if (maxWeeks < 13) return '1-3mo';
  if (maxWeeks < 26) return '3-6mo';
  return '6mo+';
}

export function formatEstimateMessage(estimate: EstimateResult): string {
  const category = CATEGORY_META[estimate.category].label;
  const lines = estimate.rows.map((row) => {
    const extra =
      row.extraScreens && row.extraScreens > 0
        ? ` (+${row.extraScreens} extra screens)`
        : '';
    return `• ${row.label}${extra}, ${formatPkrRange(row.pkrMin, row.pkrMax)} · ${formatWeeks(row.minWeeks, row.maxWeeks)}`;
  });

  return [
    `Calculator estimate, ${category} · ${estimate.tierLabel} (${estimate.pairLabel})`,
    '',
    ...lines,
    '',
    `Total: ${formatPkrRange(estimate.pkrMin, estimate.pkrMax)}`,
    `USD equivalent: ${formatUsdRange(estimate.usdMin, estimate.usdMax)}`,
    `Timeline (sequential): ${formatWeeks(estimate.minWeeks, estimate.maxWeeks)}`,
    estimate.rows.some((r) => r.id === 'ui-design')
      ? `UI screens: ${estimate.screenCount}`
      : '',
    '',
    'This is a self-serve estimate from usamazahid.design/calculator/. Happy to refine scope on a call.',
  ]
    .filter((line) => line !== undefined)
    .join('\n');
}

export function persistEstimate(estimate: EstimateResult): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(CALCULATOR_STORAGE_KEY, JSON.stringify(estimate));
  window.dispatchEvent(
    new CustomEvent(CALCULATOR_EVENT, { detail: estimate })
  );
}

export function readPersistedEstimate(): EstimateResult | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(CALCULATOR_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as EstimateResult;
  } catch {
    return null;
  }
}

export function clearPersistedEstimate(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(CALCULATOR_STORAGE_KEY);
}
