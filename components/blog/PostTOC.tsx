'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface PostTOCProps {
  items: TOCItem[];
}

export default function PostTOC({ items }: PostTOCProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [minLeft, setMinLeft] = useState(0);
  const [totalMin, setTotalMin] = useState(0);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const pct = docHeight > 0 ? Math.min(100, (scrolled / docHeight) * 100) : 0;
      setProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="hidden lg:block sticky top-32 self-start"
    >
      <div className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase mb-4">
        [ ON_THIS_PAGE ]
      </div>

      {/* Progress bar */}
      <div className="h-[1px] bg-uz-graphite mb-6 relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-uz-indigo transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ol className="space-y-3">
        {items.map((item, i) => (
          <li
            key={item.id}
            className={`text-[12px] leading-[1.4] transition-colors duration-300 ${
              item.level === 3 ? 'pl-4' : ''
            }`}
          >
            <a
              href={`#${item.id}`}
              className={`block font-mono tracking-[0.1em] uppercase ${
                activeId === item.id
                  ? 'text-uz-indigo'
                  : 'text-uz-slate hover:text-uz-white'
              }`}
            >
              <span className="text-[9px] mr-2 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.text}
            </a>
          </li>
        ))}
      </ol>

      {/* Progress display */}
      <div className="mt-8 pt-6 border-t border-uz-graphite">
        <div className="font-mono text-[9px] text-uz-slate tracking-[0.3em] uppercase mb-2">
          PROGRESS
        </div>
        <div className="font-display text-uz-white text-[18px] tracking-[-0.02em] tabular-nums">
          {Math.round(progress)}%
        </div>
      </div>
    </motion.aside>
  );
}
