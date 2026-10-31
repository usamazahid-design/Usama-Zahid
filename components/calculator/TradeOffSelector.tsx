'use client';

import {
  TRADE_OFF_META,
  TIER_META,
  type TradeOffAxis,
} from '@/lib/calculator-data';
import type { TierKey } from '@/lib/calculator-data';

interface TradeOffSelectorProps {
  selected: TradeOffAxis[];
  tier: TierKey | null;
  onToggle: (axis: TradeOffAxis) => void;
}

const axes: TradeOffAxis[] = ['fast', 'cheap', 'good'];

export default function TradeOffSelector({
  selected,
  tier,
  onToggle,
}: TradeOffSelectorProps) {
  return (
    <div>
      <p className="font-mono text-[9px] text-uz-slate tracking-[0.22em] uppercase mb-3">
        Pick two, Fast, Cheap, or Good
      </p>
      <div className="grid grid-cols-3 gap-px bg-uz-graphite">
        {axes.map((axis) => {
          const active = selected.includes(axis);
          const meta = TRADE_OFF_META[axis];
          return (
            <button
              key={axis}
              type="button"
              onClick={() => onToggle(axis)}
              aria-pressed={active}
              data-cursor="hover"
              className="relative flex flex-col items-center justify-center gap-1 h-16 transition-colors"
              style={{
                background: active ? '#4B3FFF' : '#040404',
                color: active ? '#FDFDFD' : '#9A9A9A',
              }}
            >
              <span className="font-mono text-[8px] tracking-[0.2em] opacity-60 tabular-nums">
                {meta.n}
              </span>
              <span className="font-mono text-[11px] tracking-[0.16em] uppercase">
                {meta.label}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 font-mono text-[10px] tracking-[0.08em] text-uz-silver leading-relaxed">
        {tier
          ? `${TIER_META[tier].label} · ${TIER_META[tier].hint}`
          : selected.length === 1
            ? 'Select one more trade-off to see pricing.'
            : 'Two selections required. A third deselects the oldest.'}
      </p>
    </div>
  );
}
