'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false,
  loading: () => null,
});

/**
 * Mount custom cursor only after window load + idle so it never
 * contributes to Total Blocking Time on first paint.
 */
export default function DeferredCustomCursor() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Skip custom cursor on touch / coarse pointers (mobile TBT win)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let idleId = 0;
    let cancelled = false;

    const arm = () => {
      if (cancelled) return;
      const start = () => {
        if (cancelled) return;
        setReady(true);
      };
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(start, { timeout: 4000 });
      } else {
        idleId = window.setTimeout(start, 2000) as unknown as number;
      }
    };

    if (document.readyState === 'complete') arm();
    else window.addEventListener('load', arm, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', arm);
      if (idleId) {
        if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleId);
        else clearTimeout(idleId);
      }
    };
  }, []);

  if (!ready) return null;
  return <CustomCursor />;
}
