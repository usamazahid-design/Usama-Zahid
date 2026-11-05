'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const AiChatbot = dynamic(() => import('@/components/chat/AiChatbot'), {
  ssr: false,
  loading: () => null,
});

/**
 * Mounts the AI Concierge after initial page paint and brief idle
 * so it never impacts First Contentful Paint or critical path assets.
 */
export default function DeferredAiChatbot() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId = 0;
    let timerId: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const arm = () => {
      if (cancelled) return;
      const start = () => {
        if (cancelled) return;
        setReady(true);
      };

      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(start, { timeout: 3500 });
      } else {
        timerId = setTimeout(start, 1500);
      }
    };

    if (document.readyState === 'complete') arm();
    else window.addEventListener('load', arm, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', arm);
      if (idleId && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  if (!ready) return null;
  return <AiChatbot />;
}

