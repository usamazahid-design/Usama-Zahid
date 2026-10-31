'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
  const pathname = usePathname();
  const curRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(hover: none)').matches);
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchDevice || prefersReducedMotion) {
      return;
    }

    const cur = curRef.current;
    if (!cur) return;

    let px = -100;
    let py = -100;
    let cx = -100;
    let cy = -100;
    let hasMoved = false;
    let rafId: number | null = null;

    const onMouseMove = (e: MouseEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!hasMoved) {
        cx = px;
        cy = py;
        hasMoved = true;
      }
      cur.style.opacity = '1';
    };

    const onMouseLeave = () => {
      cur.style.opacity = '0';
    };

    const onMouseEnter = () => {
      if (hasMoved) cur.style.opacity = '1';
    };

    const getCursorTarget = (target: HTMLElement | null): { el: HTMLElement | null; text: string } => {
      if (!target) return { el: null, text: '' };

      // Explicit data attributes first
      const explicit = target.closest<HTMLElement>('[data-cur], [data-cursor-text], [data-cursor]');
      if (explicit) {
        const text =
          explicit.dataset.cur ||
          explicit.dataset.cursorText ||
          (explicit.dataset.cursor && explicit.dataset.cursor !== 'hover' ? explicit.dataset.cursor : '') ||
          '';
        return { el: explicit, text };
      }

      // Case cards / Portfolio items
      const card = target.closest<HTMLElement>(
        '.panel, .work-card, .case-card, .project-card, [data-case-card], a[href*="/portfolio/"], a[href*="/branding/"]'
      );
      if (card) {
        return { el: card, text: 'View' };
      }

      // Service items
      const svc = target.closest<HTMLElement>('.svc, [data-service-card], a[href*="/services/"]');
      if (svc) {
        return { el: svc, text: 'Explore' };
      }

      // Email / Contact links
      const mail = target.closest<HTMLElement>('a[href^="mailto:"], .faq-mail-link, .cta-mail-link');
      if (mail) {
        return { el: mail, text: 'Write' };
      }

      const cal = target.closest<HTMLElement>('a[href*="cal.com"]');
      if (cal) {
        return { el: cal, text: 'Book' };
      }

      // General interactive buttons
      const btn = target.closest<HTMLElement>(
        '.btn, .cta-btn-primary, .cta-btn-secondary, .work-btn, .see-all-link, .tbs button, .t-pill, .tb, button'
      );
      if (btn) {
        return { el: btn, text: '' };
      }

      return { el: null, text: '' };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const { el, text } = getCursorTarget(target);

      if (el) {
        cur.classList.add('big');
        cur.textContent = text;
      } else {
        cur.classList.remove('big');
        cur.textContent = '';
      }
    };

    const tick = () => {
      if (hasMoved) {
        cx += (px - cx) * 0.22;
        cy += (py - cy) * 0.22;
        cur.style.transform = `translate(${cx.toFixed(1)}px, ${cy.toFixed(1)}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onMouseOver);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onMouseOver);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Reset hover state when pathname changes
  useEffect(() => {
    if (curRef.current) {
      curRef.current.classList.remove('big');
      curRef.current.textContent = '';
    }
  }, [pathname]);

  return <div ref={curRef} className="cur" id="cur" aria-hidden="true" />;
}
