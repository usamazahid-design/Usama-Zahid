'use client';

import type { CalculatorLineItem } from '@/lib/calculator-data';

interface LineItemListProps {
  items: CalculatorLineItem[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export default function LineItemList({
  items,
  selectedIds,
  onToggle,
}: LineItemListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-uz-graphite">
      {items.map((item) => {
        const checked = selectedIds.includes(item.id);
        return (
          <label
            key={item.id}
            data-cursor="hover"
            className="flex items-start gap-3 bg-uz-black px-4 py-4 cursor-pointer transition-colors hover:bg-uz-graphite/40"
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onToggle(item.id)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border"
              style={{
                borderColor: checked ? '#4B3FFF' : '#4A4A4A',
                background: checked ? '#4B3FFF' : 'transparent',
              }}
            >
              {checked && (
                <span className="block h-1.5 w-1.5 bg-uz-white" />
              )}
            </span>
            <span className="min-w-0">
              <span className="flex items-baseline gap-2">
                <span className="font-mono text-[9px] text-uz-indigo tracking-[0.14em] tabular-nums">
                  {item.code}
                </span>
                <span
                  className="font-mono text-[11px] tracking-[0.08em] uppercase leading-snug"
                  style={{ color: checked ? '#FDFDFD' : '#9A9A9A' }}
                >
                  {item.label}
                </span>
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
}
