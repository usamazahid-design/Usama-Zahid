'use client';

import { CATEGORY_META, type CategoryKey } from '@/lib/calculator-data';

interface CategoryTabsProps {
  value: CategoryKey;
  onChange: (next: CategoryKey) => void;
}

const categories: CategoryKey[] = ['branding', 'uiux'];

export default function CategoryTabs({ value, onChange }: CategoryTabsProps) {
  return (
    <div
      className="flex border-b border-uz-graphite"
      role="tablist"
      aria-label="Service category"
    >
      {categories.map((key) => {
        const meta = CATEGORY_META[key];
        const active = value === key;
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(key)}
            data-cursor="hover"
            className="relative flex-1 flex items-center justify-center gap-2 h-12 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors"
            style={{ color: active ? '#FDFDFD' : '#9A9A9A' }}
          >
            {active && (
              <span className="absolute inset-0 bg-uz-indigo pointer-events-none" />
            )}
            <span className="relative z-10 text-[9px] opacity-60 tabular-nums">
              {meta.n}
            </span>
            <span className="relative z-10">{meta.label}</span>
          </button>
        );
      })}
    </div>
  );
}
