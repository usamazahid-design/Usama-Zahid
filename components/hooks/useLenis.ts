'use client';

import { useEffect, useState } from 'react';

export function useLenis() {
  const [lenis, setLenis] = useState<any>(null);

  useEffect(() => {
    const check = () => {
      if (typeof window !== 'undefined' && (window as any).__lenis) {
        setLenis((window as any).__lenis);
      }
    };

    check();
    const interval = setInterval(() => {
      if ((window as any).__lenis && !lenis) {
        setLenis((window as any).__lenis);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [lenis]);

  return lenis;
}

export function scrollTo(target: string | number | HTMLElement, options?: any) {
  if (typeof window === 'undefined') return;
  const lenis = (window as any).__lenis;
  if (!lenis) {
    if (typeof target === 'string') {
      const el = document.querySelector(target) as HTMLElement | null;
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
    return;
  }
  lenis.scrollTo(target, options);
}
