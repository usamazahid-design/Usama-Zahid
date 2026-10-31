'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { LegalDocument } from '@/lib/legal-data';

interface TOCItem {
  id: string;
  number: string;
  title: string;
}

interface Props {
  document: LegalDocument;
}

export default function LegalTOC({ document: doc }: Props) {
  const [activeId, setActiveId] = useState<string>(doc.sections[0]?.id || '');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Find the section currently closest to the top of the viewport
      const sectionEls = doc.sections
        .map((s) => document.getElementById(s.id))
        .filter((el): el is HTMLElement => el !== null);

      let current = sectionEls[0]?.id || '';
      for (const el of sectionEls) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) {
          current = el.id;
        }
      }
      setActiveId(current);

      // Body progress
      const bodyEl = document.getElementById('legal-body');
      if (bodyEl) {
        const rect = bodyEl.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = Math.max(0, -rect.top);
        setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [doc.sections]);

  const items: TOCItem[] = doc.sections.map((s) => ({
    id: s.id,
    number: s.number,
    title: s.title,
  }));

  return (
    <nav className="sticky top-32 space-y-4">
      <div className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase pb-3 border-b border-uz-graphite flex items-center justify-between">
        <span>[ TABLE_OF_CONTENTS ]</span>
        <span className="text-uz-slate tabular-nums">{String(items.length).padStart(2, '0')}</span>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="font-mono text-[9px] text-uz-slate tracking-[0.3em] uppercase">
          READING_PROGRESS
        </div>
        <div className="relative h-[2px] bg-uz-graphite overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-uz-indigo"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="font-mono text-[10px] text-uz-silver tabular-nums">
          {Math.round(progress)}%
        </div>
      </div>

      {/* Items */}
      <ul className="space-y-1 pt-2">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                data-cursor="hover"
                className="group flex items-baseline gap-3 py-2 transition-colors"
              >
                <span
                  className={`font-mono text-[10px] tabular-nums tracking-[0.2em] uppercase ${
                    isActive ? 'text-uz-indigo' : 'text-uz-slate'
                  }`}
                >
                  {item.number}
                </span>
                <span
                  className={`text-[12px] leading-[1.3] ${
                    isActive
                      ? 'text-uz-white'
                      : 'text-uz-silver group-hover:text-uz-white'
                  } transition-colors`}
                >
                  {item.title}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="legal-toc-active"
                    className="ml-auto w-1 h-1 bg-uz-indigo"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Back to top */}
      <div className="pt-4 border-t border-uz-graphite">
        <a
          href={`#${doc.slug}-hero`}
          data-cursor="hover"
          className="group flex items-center gap-2 font-mono text-[10px] text-uz-slate hover:text-uz-indigo tracking-[0.2em] uppercase transition-colors"
        >
          <span className="inline-block group-hover:-translate-y-1 transition-transform duration-300">
            ↑
          </span>
          <span>BACK_TO_TOP</span>
        </a>
      </div>
    </nav>
  );
}
