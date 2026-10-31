export interface OfferDeliverable {
  code: string;
  title: string;
  description: string;
  fromValue: string;
  fromLabel: string;
}

export interface OfferBonus {
  code: string;
  title: string;
  description: string;
  value: string;
}

export interface OfferFAQ {
  q: string;
  a: string;
}

export interface SpecialOffer {
  offerCode: string;
  number: string;
  heroLabel: string;
  heroLines: [string, string, string];
  heroSub: string;
  heroEyebrow: string;
  deadline: string;
  spotsTotal: number;
  spotsRemaining: number;
  bundle: {
    code: string;
    title: string;
    description: string;
    duration: string;
    fromPrice: string;
  };
  anchorPrice: string;
  offerPrice: string;
  savings: string;
  savingsPercent: number;
  deliverables: OfferDeliverable[];
  bonuses: OfferBonus[];
  whoFor: string[];
  whoNotFor: string[];
  faqs: OfferFAQ[];
}

export const offer: SpecialOffer = {
  offerCode: 'S.06 / AI_PRODUCT_DESIGN_SPRINT',
  number: '06',
  heroLabel: 'OFFER_06 / LIMITED_RELEASE',
  heroLines: ['Two spots.', 'One price.', 'Q3 2026.'],
  heroSub:
    'The full Brand-to-URL sequence, strategy, identity, product, and code, bundled into one fixed-scope sprint. Two clients only. The offer retires when both spots close.',
  heroEyebrow: 'SPRINT_OFFER · FIXED_SCOPE · FIXED_PRICE',
  deadline: 'Q3 2026',
  spotsTotal: 2,
  spotsRemaining: 2,
  bundle: {
    code: 'AI_PRODUCT_DESIGN · FULL',
    title: 'The Full Sequence',
    description:
      'Strategy + Identity + Product Design + Web Engineering. The four tracks, sequenced end-to-end, shipped as one continuous engagement.',
    duration: '10-14 weeks',
    fromPrice: '$64K',
  },
  anchorPrice: '$64K',
  offerPrice: '$24K',
  savings: '$40K',
  savingsPercent: 62,
  deliverables: [
    {
      code: '01',
      title: 'Strategy Track',
      description:
        'Positioning, messaging, audience map, content architecture. A 40-60 page strategy deck you can argue with.',
      fromValue: '$12K',
      fromLabel: 'STANDALONE',
    },
    {
      code: '02',
      title: 'Identity Track',
      description:
        'Naming, type, color, logo lockups, voice, motion. Shipped as a Figma library, a Notion workspace, and a PDF guideline.',
      fromValue: '$18K',
      fromLabel: 'STANDALONE',
    },
    {
      code: '03',
      title: 'Product Track',
      description:
        'Information architecture, user flows, components, motion specs. A Figma library that mirrors the codebase, ready to ship.',
      fromValue: '$24K',
      fromLabel: 'STANDALONE',
    },
    {
      code: '04',
      title: 'Engineering Track',
      description:
        'Next.js, TypeScript, headless CMS, performance budget, deploy pipeline. Production code, not prototypes.',
      fromValue: '$22K',
      fromLabel: 'STANDALONE',
    },
  ],
  bonuses: [
    {
      code: 'B.01',
      title: 'Operator Workshop',
      description:
        'A 2-day on-site or remote workshop with your team. They learn the system so they can defend it without me.',
      value: '$3.5K',
    },
    {
      code: 'B.02',
      title: 'Source Code + Accounts',
      description:
        'Full source, Figma libraries, Notion workspaces, CMS accounts, repo access, deploy credentials. 100% yours.',
      value: '$2K',
    },
    {
      code: 'B.03',
      title: '90-Day Operator Retainer',
      description:
        '3 months of priority access post-launch. 4 hours/month for updates, fixes, and roadmap guidance. No black boxes.',
      value: '$3.6K',
    },
    {
      code: 'B.04',
      title: 'Lifetime System Updates',
      description:
        'New components, new templates, new motion presets, added to the system quarterly. Yours, for the life of the system.',
      value: 'PRICELESS',
    },
  ],
  whoFor: [
    'Series A startups with a story to ship before the next raise.',
    'Operators re-positioning an existing product for a new market.',
    'Studios and agencies that need a partner for one flagship client.',
    'Founders who want brand-to-URL, in one sequence, with one operator.',
  ],
  whoNotFor: [
    'Brands that need ongoing monthly retainers at scale.',
    'Projects that need a team of 5+ designers and 5+ engineers.',
    'Anything that can be solved by a $29 Squarespace template.',
    'Engagements that start with "we will figure out the scope as we go."',
  ],
  faqs: [
    {
      q: 'Is this really $24K? What is the catch?',
      a: 'Yes, $24K fixed for the full Brand-to-URL sequence. The catch is the cap, I am only running this sprint at this price twice. After both spots close, the offer retires. The standard rate is the sum of the four tracks ($64K).',
    },
    {
      q: 'Why are you offering this?',
      a: 'Two reasons. First, the operator model runs best on a small number of high-conviction projects at a time, not a packed pipeline. Second, the offer lets me work with founders I would not otherwise reach. The price is the trade.',
    },
    {
      q: 'What if I only need one or two tracks?',
      a: 'This offer is the full sequence only. If you need a single track, book a strategy call and we will scope it at the standard rate. The sprint is a bundle on purpose, the four tracks inform each other, and the output quality drops when any one is skipped.',
    },
    {
      q: 'When do the two spots close?',
      a: 'When both are spoken for. There is no public countdown. The first qualifying project locks the first spot. The second locks the second. After that, the offer is retired. I do not run this offer more than twice per year.',
    },
    {
      q: 'How do payments work?',
      a: '50% upfront on signing, 50% on production deploy. Net-7 on each invoice. Wire, ACH, and PayPal accepted. Crypto is not.',
    },
    {
      q: 'What happens if we are not a fit?',
      a: 'The 30-minute diagnosis call is a real call. If I am not the right operator for your project, I will say so on the call, refer you to someone better, and not charge you. The goal is a working engagement, not a closed deal.',
    },
  ],
};

export function getOffer(): SpecialOffer {
  return offer;
}
