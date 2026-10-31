'use client';

import { motion } from 'framer-motion';

interface SectionDividerProps {
  label?: string;
  index?: string;
  variant?: 'line' | 'grid' | 'ascii';
}

export default function SectionDivider({
  label,
  index,
  variant = 'line',
}: SectionDividerProps) {
  if (variant === 'grid') {
    return (
      <div className="relative w-full h-24 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-between px-6 md:px-20 opacity-30">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-[var(--mute)]" />
              <div
                className="w-[1px] bg-[var(--line)]"
                style={{ height: `${16 + (i % 4) * 12}px` }}
              />
            </div>
          ))}
        </div>
        {label && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="px-5 py-1.5 font-mono text-[10px] tracking-[0.25em] uppercase border"
              style={{
                background: 'var(--bg)',
                color: 'var(--mute)',
                borderColor: 'var(--line)',
              }}
            >
              {label}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'ascii') {
    return (
      <div className="relative w-full py-8 overflow-hidden">
        <div
          className="flex items-center justify-center gap-4 font-mono text-[10px] tracking-[0.25em]"
          style={{ color: 'var(--mute)' }}
        >
          <span className="opacity-40">────────</span>
          <span style={{ color: 'var(--ind)' }}>
            {index ? `[ ${index} ]` : '· · ·'}
          </span>
          <span className="opacity-40">────────</span>
        </div>
        {label && (
          <div
            className="text-center mt-2 font-mono text-[9px] tracking-[0.3em] uppercase"
            style={{ color: 'var(--mute)' }}
          >
            {label}
          </div>
        )}
      </div>
    );
  }

  // Default: clean animated line
  return (
    <div className="relative w-full h-20 flex items-center">
      <div className="absolute inset-0 flex items-center px-6 md:px-20">
        <div
          className="w-full h-[1px] relative overflow-hidden"
          style={{ background: 'var(--line)' }}
        >
          <motion.div
            className="absolute inset-y-0 w-20"
            style={{ background: 'var(--ind)', opacity: 0.8 }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 2,
            }}
          />
        </div>
      </div>
      {(label || index) && (
        <div
          className="absolute left-1/2 -translate-x-1/2 px-4 py-1 border"
          style={{
            background: 'var(--bg)',
            borderColor: 'var(--line)',
          }}
        >
          <div
            className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.25em] uppercase"
            style={{ color: 'var(--mute)' }}
          >
            {index && <span style={{ color: 'var(--ind)' }}>[{index}]</span>}
            {label && <span>{label}</span>}
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--ind)' }} />
          </div>
        </div>
      )}
    </div>
  );
}
