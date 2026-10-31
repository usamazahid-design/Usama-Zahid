'use client';

import { motion } from 'framer-motion';

const easeOut = [0.16, 1, 0.3, 1] as const;

interface CalculatorPanelProps {
  title: string;
  version?: string;
  children: React.ReactNode;
}

export default function CalculatorPanel({
  title,
  version = 'v1.0',
  children,
}: CalculatorPanelProps) {
  return (
    <div
      className="border border-uz-graphite relative"
      style={{
        background: 'rgba(18, 18, 18, 0.85)',
        boxShadow: '0 0 40px rgba(75,63,255,0.04)',
      }}
    >
      <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-l border-t border-uz-indigo pointer-events-none" />
      <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-r border-t border-uz-indigo pointer-events-none" />
      <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-l border-b border-uz-indigo pointer-events-none" />
      <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-r border-b border-uz-indigo pointer-events-none" />

      <div className="flex items-center justify-between px-5 md:px-8 py-4 border-b border-uz-graphite">
        <div className="flex items-center gap-3 font-mono text-[9px] text-uz-slate tracking-[0.3em] uppercase">
          <span className="w-1.5 h-1.5 bg-uz-indigo pulse-square" />
          <span>{title}</span>
          <span className="text-uz-indigo">{version}</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeOut }}
      >
        {children}
      </motion.div>
    </div>
  );
}
