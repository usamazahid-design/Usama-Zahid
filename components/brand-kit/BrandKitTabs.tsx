'use client';

import React from 'react';
import { BrandKitState } from '@/lib/brand-kit/types';

interface BrandKitTabsProps {
  activeTab: BrandKitState['activeTab'];
  onSelectTab: (tab: BrandKitState['activeTab']) => void;
  scalabilityScore?: number;
  primaryHex?: string;
  fontHeading?: string;
}

export default function BrandKitTabs({
  activeTab,
  onSelectTab,
  scalabilityScore,
  primaryHex,
  fontHeading,
}: BrandKitTabsProps) {
  const getScoreColor = (score?: number) => {
    if (!score) return '#00C7CE';
    if (score >= 8.8) return '#00C7CE';
    if (score >= 7.0) return '#4B3FFF';
    if (score >= 5.0) return '#F59E0B';
    return '#EF4444';
  };

  const tabs: {
    id: BrandKitState['activeTab'];
    step: string;
    label: string;
    badge?: string;
    dotColor?: string;
  }[] = [
    {
      id: 'scalability',
      step: '01',
      label: 'Scalability Audit',
      badge: scalabilityScore ? `${scalabilityScore.toFixed(1)}/10` : 'Audit',
      dotColor: getScoreColor(scalabilityScore),
    },
    {
      id: 'colors',
      step: '02',
      label: 'Color System',
      badge: '5 Roles',
      dotColor: primaryHex || '#4B3FFF',
    },
    {
      id: 'typography',
      step: '03',
      label: 'Typography',
      badge: fontHeading ? fontHeading.split(' ')[0] : '12 Pairs',
    },
    {
      id: 'guidelines',
      step: '04',
      label: 'Logo Usage',
      badge: 'Specs',
    },
    {
      id: 'mockups',
      step: '05',
      label: 'Mockups',
      badge: '6 Scenes',
    },
    {
      id: 'card',
      step: '06',
      label: 'Card Studio',
      badge: '300 DPI',
    },
    {
      id: 'export',
      step: '07',
      label: 'Export Kit',
      badge: 'ZIP + PDF',
    },
  ];

  return (
    <nav
      className="flex items-center gap-1 overflow-x-auto border border-[var(--line)] bg-[var(--card)] p-1.5 no-scrollbar scroll-smooth"
      aria-label="Brand kit studio sections"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer border ${
              isActive
                ? 'border-[var(--ind)] bg-[var(--ind)]/10 text-[var(--ink)] font-bold shadow-sm'
                : 'border-transparent text-[var(--mute)] hover:text-[var(--ink)] hover:bg-[var(--bg)]/60'
            }`}
          >
            <span className="text-[10px] text-[var(--ind)] opacity-80">{tab.step}</span>
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={`text-[10px] px-1.5 py-0.5 flex items-center gap-1.5 font-semibold border ${
                  isActive
                    ? 'bg-[var(--ind)] text-white border-[var(--ind)]'
                    : 'bg-[var(--bg)] text-[var(--mute)] border-[var(--line)]'
                }`}
              >
                {tab.dotColor && (
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ backgroundColor: isActive ? '#FFFFFF' : tab.dotColor }}
                  />
                )}
                <span>{tab.badge}</span>
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
