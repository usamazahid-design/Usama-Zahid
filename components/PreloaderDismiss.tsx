'use client';

import { useEffect } from 'react';

const MIN_MS = 80;
const MAX_MS = 200;
const EXIT_MS = 150;

/**
 * Dismisses the server-rendered #uz-pre shell after load.
 * Skipped when session already saw it, crawler/headless is detected, or reduced-motion is on.
 */
export default function PreloaderDismiss() {
  useEffect(() => {
    const html = document.documentElement;
    const el = document.getElementById('uz-pre');
    if (!el) {
      html.classList.remove('is-preloading');
      return;
    }

    let finished = false;
    let maxTimer = 0;
    let exitTimer = 0;

    const cleanup = () => {
      html.classList.remove('is-preloading');
      el.remove();
    };

    const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
    const isBot =
      (typeof navigator !== 'undefined' && Boolean(navigator.webdriver)) ||
      /bot|crawl|spider|slurp|google|bing|yandex|duckduck|baidu|lighthouse|pagespeed|gtmetrix/i.test(ua);

    const skip =
      isBot ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      (() => {
        try {
          return sessionStorage.getItem('uz_pre_done') === '1';
        } catch {
          return false;
        }
      })();

    if (skip || html.classList.contains('pre-skip')) {
      cleanup();
      return;
    }

    const start = performance.now();

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(maxTimer);
      window.removeEventListener('load', finish);

      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_MS - elapsed);

      exitTimer = window.setTimeout(() => {
        el.classList.add('is-done');
        el.setAttribute('aria-busy', 'false');
        html.classList.remove('is-preloading');
        try {
          sessionStorage.setItem('uz_pre_done', '1');
        } catch {
          /* ignore */
        }
        exitTimer = window.setTimeout(cleanup, EXIT_MS);
      }, wait) as unknown as number;
    };

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });

    maxTimer = window.setTimeout(finish, MAX_MS) as unknown as number;

    return () => {
      window.removeEventListener('load', finish);
      window.clearTimeout(maxTimer);
      window.clearTimeout(exitTimer);
    };
  }, []);

  return null;
}
