/**
 * Project price calculator, line items and tier ranges.
 *
 * PLACEHOLDER VALUES, replace with your real ranges.
 * USD figures are the source of truth here. PKR is derived at PKR_PER_USD
 * (placeholder FX). Update both the rate and the USD numbers when you lock pricing.
 */

export const PKR_PER_USD = 280;

export type CategoryKey = 'branding' | 'uiux';
export type TierKey = 'rapid' | 'foundation' | 'priority';
export type TradeOffAxis = 'fast' | 'cheap' | 'good';

export interface MoneyRange {
  usdMin: number;
  usdMax: number;
  pkrMin: number;
  pkrMax: number;
}

export interface TimelineRange {
  minWeeks: number;
  maxWeeks: number;
}

export interface TierQuote {
  price: MoneyRange;
  timeline: TimelineRange;
  scopeNote?: string;
}

export interface ScreenPricing {
  baseScreens: number;
  perScreen: Record<TierKey, MoneyRange>;
}

export interface CalculatorLineItem {
  id: string;
  code: string;
  label: string;
  category: CategoryKey;
  tiers: Record<TierKey, TierQuote>;
  screenPricing?: ScreenPricing;
}

function money(usdMin: number, usdMax: number): MoneyRange {
  const roundPkr = (usd: number) => Math.round((usd * PKR_PER_USD) / 1000) * 1000;
  return {
    usdMin,
    usdMax,
    pkrMin: roundPkr(usdMin),
    pkrMax: roundPkr(usdMax),
  };
}

function weeks(minWeeks: number, maxWeeks: number): TimelineRange {
  return { minWeeks, maxWeeks };
}

const RAPID_SCOPE = 'Reduced scope, fewer revisions, no deep research.';

export const TIER_META: Record<
  TierKey,
  { label: string; pair: string; hint: string }
> = {
  rapid: {
    label: 'Rapid',
    pair: 'Fast + Cheap',
    hint: 'Lowest price, shortest timeline, reduced scope.',
  },
  foundation: {
    label: 'Foundation',
    pair: 'Cheap + Good',
    hint: 'Full scope, mid price, longer timeline.',
  },
  priority: {
    label: 'Priority',
    pair: 'Fast + Good',
    hint: 'Full scope, highest price, short timeline.',
  },
};

export const TRADE_OFF_META: Record<
  TradeOffAxis,
  { label: string; n: string }
> = {
  fast: { label: 'Fast', n: '01' },
  cheap: { label: 'Cheap', n: '02' },
  good: { label: 'Good', n: '03' },
};

export const CATEGORY_META: Record<
  CategoryKey,
  { label: string; n: string; formType: 'brand' | 'product' }
> = {
  branding: { label: 'Branding', n: '01', formType: 'brand' },
  uiux: { label: 'UI/UX', n: '02', formType: 'product' },
};

export const UI_DESIGN_ID = 'ui-design';
export const SCREEN_MIN = 1;
export const SCREEN_MAX = 200;
export const SCREEN_DEFAULT = 8;

export const CALCULATOR_ITEMS: CalculatorLineItem[] = [
  {
    id: 'strategy-research',
    code: 'B.01',
    label: 'Strategy and research',
    category: 'branding',
    tiers: {
      rapid: {
        price: money(800, 1200),
        timeline: weeks(1, 2),
        scopeNote: RAPID_SCOPE,
      },
      foundation: { price: money(1500, 2500), timeline: weeks(2, 4) },
      priority: { price: money(2500, 4000), timeline: weeks(1, 2) },
    },
  },
  {
    id: 'logo-design',
    code: 'B.02',
    label: 'Logo design',
    category: 'branding',
    tiers: {
      rapid: {
        price: money(400, 800),
        timeline: weeks(0.5, 1),
        scopeNote: RAPID_SCOPE,
      },
      foundation: { price: money(800, 1500), timeline: weeks(1, 2) },
      priority: { price: money(1500, 2500), timeline: weeks(0.5, 1) },
    },
  },
  {
    id: 'brand-guidelines',
    code: 'B.03',
    label: 'Brand guidelines / brand manual',
    category: 'branding',
    tiers: {
      rapid: {
        price: money(600, 1000),
        timeline: weeks(1, 1.5),
        scopeNote: RAPID_SCOPE,
      },
      foundation: { price: money(1200, 2000), timeline: weeks(2, 3) },
      priority: { price: money(2000, 3200), timeline: weeks(1, 1.5) },
    },
  },
  {
    id: 'naming',
    code: 'B.04',
    label: 'Naming',
    category: 'branding',
    tiers: {
      rapid: {
        price: money(400, 700),
        timeline: weeks(0.5, 1),
        scopeNote: RAPID_SCOPE,
      },
      foundation: { price: money(800, 1400), timeline: weeks(1, 2) },
      priority: { price: money(1400, 2200), timeline: weeks(0.5, 1) },
    },
  },
  {
    id: 'messaging-voice',
    code: 'B.05',
    label: 'Brand messaging and voice',
    category: 'branding',
    tiers: {
      rapid: {
        price: money(500, 900),
        timeline: weeks(1, 1),
        scopeNote: RAPID_SCOPE,
      },
      foundation: { price: money(1000, 1800), timeline: weeks(1, 2) },
      priority: { price: money(1800, 2800), timeline: weeks(1, 1) },
    },
  },
  {
    id: 'stationery',
    code: 'B.06',
    label: 'Stationery design (business cards, letterhead, etc.)',
    category: 'branding',
    tiers: {
      rapid: {
        price: money(300, 500),
        timeline: weeks(0.5, 0.5),
        scopeNote: RAPID_SCOPE,
      },
      foundation: { price: money(500, 900), timeline: weeks(1, 1) },
      priority: { price: money(900, 1400), timeline: weeks(0.5, 0.5) },
    },
  },
  {
    id: 'social-kit',
    code: 'B.07',
    label: 'Social media brand kit',
    category: 'branding',
    tiers: {
      rapid: {
        price: money(400, 700),
        timeline: weeks(0.5, 1),
        scopeNote: RAPID_SCOPE,
      },
      foundation: { price: money(800, 1400), timeline: weeks(1, 2) },
      priority: { price: money(1400, 2200), timeline: weeks(0.5, 1) },
    },
  },
  {
    id: 'packaging',
    code: 'B.08',
    label: 'Packaging design',
    category: 'branding',
    tiers: {
      rapid: {
        price: money(800, 1400),
        timeline: weeks(1, 2),
        scopeNote: RAPID_SCOPE,
      },
      foundation: { price: money(1500, 2800), timeline: weeks(2, 4) },
      priority: { price: money(2800, 4500), timeline: weeks(1, 2) },
    },
  },
  {
    id: 'rebrand-audit',
    code: 'B.09',
    label: 'Rebrand audit (existing identity)',
    category: 'branding',
    tiers: {
      rapid: {
        price: money(400, 700),
        timeline: weeks(0.5, 1),
        scopeNote: RAPID_SCOPE,
      },
      foundation: { price: money(800, 1500), timeline: weeks(1, 2) },
      priority: { price: money(1500, 2400), timeline: weeks(0.5, 1) },
    },
  },
  {
    id: 'ux-research',
    code: 'U.01',
    label: 'UX research and audit',
    category: 'uiux',
    tiers: {
      rapid: {
        price: money(600, 1000),
        timeline: weeks(1, 1),
        scopeNote: RAPID_SCOPE,
      },
      foundation: { price: money(1200, 2200), timeline: weeks(2, 3) },
      priority: { price: money(2200, 3500), timeline: weeks(1, 1) },
    },
  },
  {
    id: 'ia-flows',
    code: 'U.02',
    label: 'Information architecture / user flows',
    category: 'uiux',
    tiers: {
      rapid: {
        price: money(400, 700),
        timeline: weeks(0.5, 1),
        scopeNote: RAPID_SCOPE,
      },
      foundation: { price: money(800, 1400), timeline: weeks(1, 2) },
      priority: { price: money(1400, 2200), timeline: weeks(0.5, 1) },
    },
  },
  {
    id: 'wireframes',
    code: 'U.03',
    label: 'Wireframes',
    category: 'uiux',
    tiers: {
      rapid: {
        price: money(500, 900),
        timeline: weeks(1, 1),
        scopeNote: RAPID_SCOPE,
      },
      foundation: { price: money(1000, 1800), timeline: weeks(1, 2) },
      priority: { price: money(1800, 2800), timeline: weeks(1, 1) },
    },
  },
  {
    id: UI_DESIGN_ID,
    code: 'U.04',
    label: 'UI design',
    category: 'uiux',
    tiers: {
      rapid: {
        price: money(1200, 2000),
        timeline: weeks(1, 2),
        scopeNote: `${RAPID_SCOPE} Base covers ${SCREEN_DEFAULT} screens.`,
      },
      foundation: {
        price: money(2200, 3800),
        timeline: weeks(2, 4),
      },
      priority: {
        price: money(3800, 6000),
        timeline: weeks(1, 2),
      },
    },
    screenPricing: {
      baseScreens: SCREEN_DEFAULT,
      perScreen: {
        rapid: money(80, 120),
        foundation: money(140, 220),
        priority: money(220, 350),
      },
    },
  },
  {
    id: 'design-system',
    code: 'U.05',
    label: 'Design system / component library',
    category: 'uiux',
    tiers: {
      rapid: {
        price: money(800, 1400),
        timeline: weeks(1, 2),
        scopeNote: RAPID_SCOPE,
      },
      foundation: { price: money(1600, 2800), timeline: weeks(2, 4) },
      priority: { price: money(2800, 4500), timeline: weeks(1, 2) },
    },
  },
  {
    id: 'prototype',
    code: 'U.06',
    label: 'Interactive prototype',
    category: 'uiux',
    tiers: {
      rapid: {
        price: money(400, 700),
        timeline: weeks(0.5, 1),
        scopeNote: RAPID_SCOPE,
      },
      foundation: { price: money(800, 1500), timeline: weeks(1, 2) },
      priority: { price: money(1500, 2400), timeline: weeks(0.5, 1) },
    },
  },
  {
    id: 'usability-testing',
    code: 'U.07',
    label: 'Usability testing',
    category: 'uiux',
    tiers: {
      rapid: {
        price: money(400, 700),
        timeline: weeks(0.5, 1),
        scopeNote: RAPID_SCOPE,
      },
      foundation: { price: money(900, 1600), timeline: weeks(1, 2) },
      priority: { price: money(1600, 2600), timeline: weeks(0.5, 1) },
    },
  },
  {
    id: 'dev-handoff',
    code: 'U.08',
    label: 'Developer handoff documentation',
    category: 'uiux',
    tiers: {
      rapid: {
        price: money(300, 500),
        timeline: weeks(0.5, 0.5),
        scopeNote: RAPID_SCOPE,
      },
      foundation: { price: money(500, 900), timeline: weeks(1, 1) },
      priority: { price: money(900, 1400), timeline: weeks(0.5, 0.5) },
    },
  },
  {
    id: 'landing-page',
    code: 'U.09',
    label: 'Landing page design',
    category: 'uiux',
    tiers: {
      rapid: {
        price: money(600, 1000),
        timeline: weeks(1, 1),
        scopeNote: RAPID_SCOPE,
      },
      foundation: { price: money(1200, 2000), timeline: weeks(1, 2) },
      priority: { price: money(2000, 3200), timeline: weeks(1, 1) },
    },
  },
  {
    id: 'dashboard-app',
    code: 'U.10',
    label: 'Dashboard or app design',
    category: 'uiux',
    tiers: {
      rapid: {
        price: money(1400, 2400),
        timeline: weeks(2, 3),
        scopeNote: RAPID_SCOPE,
      },
      foundation: { price: money(2800, 4800), timeline: weeks(4, 6) },
      priority: { price: money(4800, 7500), timeline: weeks(2, 3) },
    },
  },
];

export function itemsForCategory(category: CategoryKey): CalculatorLineItem[] {
  return CALCULATOR_ITEMS.filter((item) => item.category === category);
}

export function getItemById(id: string): CalculatorLineItem | undefined {
  return CALCULATOR_ITEMS.find((item) => item.id === id);
}
