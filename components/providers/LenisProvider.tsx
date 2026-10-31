'use client';

import { useEffect } from 'react';

const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

function scheduleIdle(cb: () => void, timeout = 2500) {
  if (typeof window === 'undefined') return 0;
  const ric = window.requestIdleCallback?.bind(window);
  if (ric) return ric(cb, { timeout }) as unknown as number;
  return window.setTimeout(cb, Math.min(timeout, 1200));
}

function cancelIdle(id: number) {
  if (typeof window === 'undefined') return;
  if (window.cancelIdleCallback) window.cancelIdleCallback(id);
  else window.clearTimeout(id);
}

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // PostHog after load + idle — keeps it out of TBT / bfcache-critical window
  useEffect(() => {
    if (!posthogToken || !posthogHost) {
      if (process.env.NODE_ENV === 'development') {
        const missing = !posthogToken
          ? 'NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN'
          : 'NEXT_PUBLIC_POSTHOG_HOST';
        console.warn(`${missing} is missing or un-configured for PostHog.`);
      }
      return;
    }

    let idleId = 0;
    const bootPosthog = () => {
      idleId = scheduleIdle(() => {
        void import('posthog-js').then(({ default: posthog }) => {
          posthog.init(posthogToken, {
            api_host: posthogHost,
            defaults: '2026-01-30',
            capture_exceptions: true,
            debug: false,
            // Avoid unload hooks that block back/forward cache
            persistence: 'localStorage+cookie',
          });
        });
      }, 5000);
    };

    if (document.readyState === 'complete') bootPosthog();
    else window.addEventListener('load', bootPosthog, { once: true });

    return () => {
      window.removeEventListener('load', bootPosthog);
      cancelIdle(idleId);
    };
  }, []);

  return <>{children}</>;
}
