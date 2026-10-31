'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import posthog from 'posthog-js';
import {
  SCREEN_DEFAULT,
  UI_DESIGN_ID,
  itemsForCategory,
  type CategoryKey,
  type TradeOffAxis,
} from '@/lib/calculator-data';
import {
  aggregateEstimate,
  clampScreenCount,
  formatPkrRange,
  persistEstimate,
  resolveTier,
  toggleTradeOff,
} from '@/lib/calculator-logic';
import CalculatorPanel from './CalculatorPanel';
import CategoryTabs from './CategoryTabs';
import LineItemList from './LineItemList';
import TradeOffSelector from './TradeOffSelector';
import ScreenCountInput from './ScreenCountInput';
import EstimateSummary from './EstimateSummary';

const easeOut = [0.16, 1, 0.3, 1] as const;

interface ProjectCalculatorProps {
  compact?: boolean;
}

export default function ProjectCalculator({ compact = false }: ProjectCalculatorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [category, setCategory] = useState<CategoryKey>('branding');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [axes, setAxes] = useState<TradeOffAxis[]>([]);
  const [screenCount, setScreenCount] = useState(SCREEN_DEFAULT);
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = useMemo(() => itemsForCategory(category), [category]);
  const selectedItems = useMemo(
    () => items.filter((item) => selectedIds.includes(item.id)),
    [items, selectedIds]
  );
  const showScreens = selectedIds.includes(UI_DESIGN_ID);
  const uiItem = items.find((item) => item.id === UI_DESIGN_ID);
  const tier = resolveTier(axes);

  const estimate = useMemo(() => {
    if (!tier || selectedItems.length === 0) return null;
    return aggregateEstimate(selectedItems, tier, screenCount);
  }, [selectedItems, tier, screenCount]);

  const handleCategory = (next: CategoryKey) => {
    setCategory(next);
    setSelectedIds([]);
    setScreenCount(SCREEN_DEFAULT);
    setMobileOpen(false);
  };

  const handleToggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSend = () => {
    if (!estimate) return;

    persistEstimate(estimate);
    posthog.capture('calculator_estimate_sent', {
      category: estimate.category,
      tier: estimate.tier,
      items: estimate.rows.map((row) => row.id),
      pkr_min: estimate.pkrMin,
      pkr_max: estimate.pkrMax,
    });

    const onContact = pathname === '/contact' || pathname === '/contact/';
    if (onContact) {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    router.push('/contact/#contact-form');
  };

  return (
    <section
      id="project-calculator"
      className="relative w-full pb-24 lg:pb-0"
    >
      <CalculatorPanel title="PRICE_CALCULATOR" version={compact ? 'EMBED' : 'v1.0'}>
        <CategoryTabs value={category} onChange={handleCategory} />

        <div className="lg:grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="border-b lg:border-b-0 lg:border-r border-uz-graphite">
            <div className="px-5 md:px-8 py-5 border-b border-uz-graphite">
              <p className="font-mono text-[9px] text-uz-slate tracking-[0.22em] uppercase mb-1">
                Line items
              </p>
              <p className="text-uz-silver text-[13px] leading-relaxed">
                Multi-select what you need. Totals update live.
              </p>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: easeOut }}
              >
                <LineItemList
                  items={items}
                  selectedIds={selectedIds}
                  onToggle={handleToggleItem}
                />
              </motion.div>
            </AnimatePresence>

            {showScreens && uiItem?.screenPricing && (
              <ScreenCountInput
                value={screenCount}
                onChange={(n) => setScreenCount(clampScreenCount(n))}
                baseScreens={uiItem.screenPricing.baseScreens}
              />
            )}

            <div className="px-5 md:px-8 py-6">
              <TradeOffSelector
                selected={axes}
                tier={tier}
                onToggle={(axis) => setAxes((prev) => toggleTradeOff(prev, axis))}
              />
            </div>
          </div>

          <div className="hidden lg:block px-5 md:px-8 py-6">
            <EstimateSummary
              estimate={estimate}
              selectedCount={selectedIds.length}
              tradeOffCount={axes.length}
              onSend={handleSend}
            />
          </div>
        </div>
      </CalculatorPanel>

      {/* Mobile sticky summary */}
      {selectedIds.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-uz-graphite bg-uz-black/95 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="w-full flex items-center justify-between gap-3 px-5 py-3"
            aria-expanded={mobileOpen}
          >
            <span className="text-left min-w-0">
              <span className="block font-mono text-[8px] tracking-[0.2em] text-uz-slate uppercase">
                {estimate ? estimate.tierLabel : 'Configure trade-off'}
              </span>
              <span className="block font-mono text-[12px] text-uz-white tracking-[0.04em] truncate">
                {estimate
                  ? formatPkrRange(estimate.pkrMin, estimate.pkrMax)
                  : `${selectedIds.length} item${selectedIds.length === 1 ? '' : 's'} selected`}
              </span>
            </span>
            <span className="font-mono text-[10px] text-uz-indigo tracking-[0.16em] uppercase shrink-0">
              {mobileOpen ? 'Close' : 'View breakdown'}
            </span>
          </button>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: easeOut }}
                className="overflow-hidden border-t border-uz-graphite"
              >
                <div className="max-h-[55vh] overflow-y-auto px-5 py-5">
                  <EstimateSummary
                    estimate={estimate}
                    selectedCount={selectedIds.length}
                    tradeOffCount={axes.length}
                    onSend={handleSend}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
