'use client';

import { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  speed?: 'slow' | 'normal' | 'fast';
  reverse?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  speed = 'normal',
  reverse = false,
  className = '',
}: MarqueeProps) {
  const trackClass =
    speed === 'slow'
      ? 'marquee-track-slow'
      : speed === 'fast'
      ? 'marquee-track-fast'
      : 'marquee-track';

  return (
    <div
      className={`relative flex overflow-hidden no-select ${className}`}
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)',
      }}
    >
      <div
        className={`flex flex-shrink-0 ${trackClass}`}
        style={{
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {children}
      </div>
      <div
        className={`flex flex-shrink-0 ${trackClass}`}
        aria-hidden="true"
        style={{
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {children}
      </div>
    </div>
  );
}
