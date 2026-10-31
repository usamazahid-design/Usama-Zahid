'use client';

import { SCREEN_MAX, SCREEN_MIN } from '@/lib/calculator-data';

interface ScreenCountInputProps {
  value: number;
  onChange: (next: number) => void;
  baseScreens: number;
}

export default function ScreenCountInput({
  value,
  onChange,
  baseScreens,
}: ScreenCountInputProps) {
  return (
    <div className="px-5 md:px-8 py-5 border-t border-uz-graphite">
      <label className="block">
        <span className="font-mono text-[9px] text-uz-slate tracking-[0.22em] uppercase">
          Number of screens
        </span>
        <span className="mt-1 block font-mono text-[10px] text-uz-silver">
          Base price covers {baseScreens} screens. Extra screens add per-screen cost.
        </span>
        <input
          type="number"
          min={SCREEN_MIN}
          max={SCREEN_MAX}
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="mt-3 w-full h-12 bg-uz-black border border-uz-graphite px-4 font-mono text-[14px] text-uz-white tracking-[0.08em] outline-none focus:border-uz-indigo"
        />
      </label>
    </div>
  );
}
