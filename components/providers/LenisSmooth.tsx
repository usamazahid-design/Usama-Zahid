'use client';

import { useEffect, useRef } from 'react';
import type Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Heavy Lenis + GSAP path — only imported on non-home routes. */
export default function LenisSmooth({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    let cancelled = false;
    let tickerFn: ((time: number) => void) | null = null;
    let handleAnchorClick: ((e: MouseEvent) => void) | null = null;
    let gsapMod: typeof import('gsap') | null = null;

    (async () => {
      const [{ default: LenisCtor }, gsapImport, stImport] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      gsapMod = gsapImport;
      const { gsap } = gsapImport;
      const { ScrollTrigger } = stImport;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new LenisCtor({
        duration: 1.6,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        wheelMultiplier: 1.1,
        touchMultiplier: 1.5,
        lerp: 0.08,
      });

      lenisRef.current = lenis;
      window.__lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);

      tickerFn = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href || href === '#' || !href.startsWith('#')) return;

        const id = href.slice(1);
        const el = document.getElementById(id);
        if (!el) return;

        e.preventDefault();
        const chn = document.querySelector<HTMLElement>('.chn');
        const navHeight = 64 + (chn ? chn.offsetHeight + 12 : 0);
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
        lenis.scrollTo(top, { duration: 0.8, easing: (t) => 1 - Math.pow(1 - t, 3) });
        history.replaceState(null, '', href);
      };

      document.addEventListener('click', handleAnchorClick);
    })();

    return () => {
      cancelled = true;
      if (handleAnchorClick) document.removeEventListener('click', handleAnchorClick);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      delete window.__lenis;
      if (tickerFn && gsapMod) gsapMod.gsap.ticker.remove(tickerFn);
    };
  }, []);

  return <>{children}</>;
}
