'use client';

import { useEffect, useRef, useState } from 'react';

const LERP = 0.12;

export default function CardCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    setActive(true);
    document.documentElement.style.cursor = 'none';

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: target.x, y: target.y };
    let rafId: number;

    const isInteractive = (el: HTMLElement | null) =>
      !!el?.closest('a, button, [data-card-interactive]');

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const hover = isInteractive(e.target as HTMLElement);
      const node = ref.current;
      if (!node) return;
      if (hover) {
        node.style.width = '36px';
        node.style.height = '36px';
        node.style.background = 'transparent';
        node.style.borderColor = '#4B3FFF';
      } else {
        node.style.width = '12px';
        node.style.height = '12px';
        node.style.background = '#F6F6F6';
        node.style.borderColor = 'transparent';
      }
    };

    const animate = () => {
      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;
      const node = ref.current;
      if (node) {
        const size = parseFloat(node.style.width) || 12;
        node.style.transform = `translate3d(${current.x - size / 2}px, ${current.y - size / 2}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.style.cursor = '';
    };
  }, []);

  if (!active) return null;

  return (
    <div
      ref={ref}
      data-card-cursor
      className="pointer-events-none fixed left-0 top-0 z-[150]"
      style={{
        width: '12px',
        height: '12px',
        background: '#F6F6F6',
        border: '1px solid transparent',
        willChange: 'transform, width, height',
        transition: 'width 150ms ease, height 150ms ease, background 150ms ease, border-color 150ms ease',
      }}
    />
  );
}
