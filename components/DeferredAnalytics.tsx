'use client';

import { useEffect } from 'react';

const GA_ID = 'G-8DF4CVEYKR';

/**
 * Inject gtag only after load + idle so it stays out of the mobile TBT window.
 */
export default function DeferredAnalytics() {
  useEffect(() => {
    let idleId = 0;
    let cancelled = false;

    const inject = () => {
      if (cancelled || document.getElementById('gtag-js')) return;

      const w = window as Window & {
        dataLayer?: IArguments[];
        gtag?: (...a: unknown[]) => void;
      };
      w.dataLayer = w.dataLayer || [];
      // Official snippet shape — gtag.js expects Arguments objects
      w.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer!.push(arguments as unknown as IArguments);
      };
      w.gtag('js', new Date());
      w.gtag('config', GA_ID);

      const s = document.createElement('script');
      s.id = 'gtag-js';
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(s);
    };

    const arm = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(inject, { timeout: 8000 });
      } else {
        idleId = window.setTimeout(inject, 4000) as unknown as number;
      }
    };

    if (document.readyState === 'complete') arm();
    else window.addEventListener('load', arm, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', arm);
      if (idleId) {
        if (typeof window.cancelIdleCallback === 'function') {
          window.cancelIdleCallback(idleId);
        } else {
          clearTimeout(idleId);
        }
      }
    };
  }, []);

  return null;
}
