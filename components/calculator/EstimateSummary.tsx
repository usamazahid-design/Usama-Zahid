'use client';

import { TIER_META } from '@/lib/calculator-data';
import {
  formatPkrRange,
  formatUsdRange,
  formatWeeks,
  type EstimateResult,
} from '@/lib/calculator-logic';

interface EstimateSummaryProps {
  estimate: EstimateResult | null;
  selectedCount: number;
  tradeOffCount: number;
  onSend: () => void;
  sending?: boolean;
}

export default function EstimateSummary({
  estimate,
  selectedCount,
  tradeOffCount,
  onSend,
  sending = false,
}: EstimateSummaryProps) {
  if (selectedCount === 0) {
    return (
      <EmptyState copy="Select the line items you need. Pricing appears as you configure." />
    );
  }

  if (tradeOffCount < 2 || !estimate) {
    return (
      <EmptyState copy="Select one more trade-off to see pricing." />
    );
  }

  const rapidNote = estimate.rows.find((row) => row.scopeNote)?.scopeNote;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <p className="font-mono text-[9px] text-uz-slate tracking-[0.22em] uppercase">
            Resulting tier
          </p>
          <p className="mt-1 font-display text-[28px] md:text-[32px] text-uz-white tracking-[-0.03em] leading-none">
            {estimate.tierLabel}
          </p>
          <p className="mt-2 font-mono text-[10px] text-uz-indigo tracking-[0.16em] uppercase">
            {TIER_META[estimate.tier].pair}
          </p>
        </div>
        <span className="inline-flex items-center gap-2 border border-uz-indigo/50 bg-uz-indigo/10 px-3 py-1.5 font-mono text-[9px] tracking-[0.18em] text-uz-indigo uppercase">
          {TIER_META[estimate.tier].hint.split(',')[0]}
        </span>
      </div>

      {rapidNote && (
        <p className="mb-5 font-mono text-[10px] text-uz-silver leading-relaxed border-l-2 border-uz-indigo pl-3">
          {rapidNote}
        </p>
      )}

      <div className="overflow-x-auto -mx-1">
        <table className="w-full min-w-[280px] text-left">
          <thead>
            <tr className="border-b border-uz-graphite">
              <th className="pb-2 font-mono text-[8px] tracking-[0.2em] text-uz-slate uppercase font-normal">
                Item
              </th>
              <th className="pb-2 font-mono text-[8px] tracking-[0.2em] text-uz-slate uppercase font-normal text-right">
                PKR
              </th>
              <th className="pb-2 pl-3 font-mono text-[8px] tracking-[0.2em] text-uz-slate uppercase font-normal text-right whitespace-nowrap">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {estimate.rows.map((row) => (
              <tr key={row.id} className="border-b border-uz-graphite/70">
                <td className="py-3 pr-3">
                  <span className="block font-mono text-[10px] tracking-[0.06em] text-uz-white uppercase leading-snug">
                    {row.label}
                  </span>
                  {row.extraScreens ? (
                    <span className="block mt-0.5 font-mono text-[8px] text-uz-slate tracking-[0.1em]">
                      +{row.extraScreens} extra screens
                    </span>
                  ) : null}
                </td>
                <td className="py-3 font-mono text-[10px] text-uz-silver tabular-nums text-right whitespace-nowrap">
                  {formatPkrRange(row.pkrMin, row.pkrMax)}
                </td>
                <td className="py-3 pl-3 font-mono text-[10px] text-uz-slate tabular-nums text-right whitespace-nowrap">
                  {formatWeeks(row.minWeeks, row.maxWeeks)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 pt-5 border-t border-uz-graphite">
        <p className="font-mono text-[9px] text-uz-slate tracking-[0.22em] uppercase">
          Total estimate
        </p>
        <p className="mt-2 font-display text-[clamp(22px,5vw,36px)] text-uz-white tracking-[-0.03em] leading-tight">
          {formatPkrRange(estimate.pkrMin, estimate.pkrMax)}
        </p>
        <p className="mt-1 font-mono text-[11px] text-uz-silver tracking-[0.08em]">
          {formatUsdRange(estimate.usdMin, estimate.usdMax)}
        </p>
        <p className="mt-3 font-mono text-[11px] text-uz-indigo tracking-[0.1em] uppercase">
          Timeline · {formatWeeks(estimate.minWeeks, estimate.maxWeeks)} sequential
        </p>
      </div>

      <button
        type="button"
        onClick={onSend}
        disabled={sending}
        data-cursor="hover"
        data-cursor-text="SEND"
        className="group relative mt-7 flex w-full items-center justify-center gap-3 h-14 bg-uz-indigo text-uz-white font-mono text-[12px] tracking-[0.15em] uppercase overflow-hidden disabled:opacity-60"
      >
        <span className="relative z-10">Send this estimate</span>
        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
        <span
          className="absolute inset-0 bg-[#3a30cc] -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </button>
    </div>
  );
}

function EmptyState({ copy }: { copy: string }) {
  return (
    <div className="py-6">
      <p className="font-mono text-[9px] text-uz-slate tracking-[0.22em] uppercase mb-3">
        Estimate
      </p>
      <p className="text-uz-silver text-[15px] leading-relaxed max-w-sm">{copy}</p>
    </div>
  );
}
