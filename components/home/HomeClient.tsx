'use client';

import { useEffect } from 'react';

type SceneKey = 'logo' | 'app' | 'web';

const SC: Record<SceneKey, { cap: string; st: [number, string][] }> = {
  logo: {
    cap: 'Fig. A. Logo construction',
    st: [
      [0, 'Grid'],
      [150, 'Outlines'],
      [500, 'Colour'],
      [800, 'Mark ready'],
    ],
  },
  app: {
    cap: 'Fig. B. App design',
    st: [
      [0, 'Wireframe'],
      [1600, 'Interface'],
      [4200, 'Prototype'],
    ],
  },
  web: {
    cap: 'Fig. C. Website build',
    st: [
      [0, 'Wireframe'],
      [1400, 'Layout'],
      [3800, 'Live'],
    ],
  },
};

function scheduleIdle(cb: () => void, timeout: number) {
  if (typeof window.requestIdleCallback === 'function') {
    return window.requestIdleCallback(cb, { timeout });
  }
  return window.setTimeout(cb, Math.min(timeout, 1800)) as unknown as number;
}

function cancelIdle(id: number, usedRic: boolean) {
  if (usedRic && typeof window.cancelIdleCallback === 'function') {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}

/**
 * Tiny client boot for the home page. Markup is server-rendered;
 * stage + runtime stay off the critical path (especially on mobile).
 */
export default function HomeClient() {
  useEffect(() => {
    const d = document;
    const html = d.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 900px), (pointer: coarse)').matches;
    const usedRic = typeof window.requestIdleCallback === 'function';

    html.classList.add('authentic-route', 'new-home-route', 'ready', 'js');

    const stg = d.getElementById('stg');
    const stp = d.getElementById('stp');
    const stc = d.getElementById('stc');
    const bar = d.getElementById('bar');
    const tbs = Array.from(d.querySelectorAll<HTMLButtonElement>('.tb'));
    let tm: ReturnType<typeof setTimeout>[] = [];
    let autoplay = !isMobile && !reduce;

    function play(sc: SceneKey, cycle = autoplay) {
      tm.forEach(clearTimeout);
      tm = [];
      if (!stg || !stc || !bar || !stp) return;
      stg.classList.add('stg-live');
      html.classList.add('motion-ready');
      stg.dataset.scene = sc;
      stc.textContent = SC[sc].cap;
      tbs.forEach((b) => b.classList.toggle('on', b.dataset.s === sc));
      // Avoid forced reflow on mobile — just reset animation
      bar.style.animation = 'none';
      if (!isMobile) {
        void bar.offsetWidth;
      }
      requestAnimationFrame(() => {
        if (bar) bar.style.animation = '';
      });
      SC[sc].st.forEach((x) => {
        tm.push(
          setTimeout(() => {
            if (stp) stp.textContent = x[1];
          }, x[0])
        );
      });
      if (cycle) {
        tm.push(
          setTimeout(() => {
            const nextMap: Record<SceneKey, SceneKey> = {
              logo: 'app',
              app: 'web',
              web: 'logo',
            };
            play(nextMap[sc], true);
          }, 7400)
        );
      }
    }

    const tbListeners: { btn: HTMLButtonElement; fn: () => void }[] = [];
    tbs.forEach((b) => {
      const fn = () => {
        const sc = b.dataset.s as SceneKey;
        if (sc && SC[sc]) {
          autoplay = false;
          play(sc, false);
        }
      };
      b.addEventListener('click', fn);
      tbListeners.push({ btn: b, fn });
    });

    try {
      const stored = localStorage.getItem('uz_theme');
      if (stored === 'dark' || stored === 'light') html.dataset.theme = stored;
      else if (!html.dataset.theme) html.dataset.theme = 'light';
    } catch {
      if (!html.dataset.theme) html.dataset.theme = 'light';
    }

    let cancelled = false;
    let runtimeCleanup: (() => void) | undefined;
    let idleId = 0;
    let stageIdleId = 0;

    const loadRuntime = () => {
      if (cancelled) return;
      void import('../authenticHomeRuntime').then((mod) => {
        if (cancelled) return;
        requestAnimationFrame(() => {
          if (cancelled) return;
          runtimeCleanup = mod.initAuthenticHomeRuntime(reduce);
        });
      });
    };

    const armRuntime = () => {
      if (cancelled) return;
      idleId = scheduleIdle(loadRuntime, isMobile ? 8000 : 5000);
    };

    // Stage: desktop starts after short idle; mobile waits for scroll/tap
    const startStage = () => {
      if (cancelled || !stg || stg.classList.contains('stg-live')) return;
      play('logo', autoplay);
    };

    if (isMobile) {
      const wake = () => {
        startStage();
        armRuntime();
        window.removeEventListener('scroll', wake);
        window.removeEventListener('pointerdown', wake);
        window.removeEventListener('touchstart', wake);
      };
      window.addEventListener('scroll', wake, { passive: true, once: true });
      window.addEventListener('pointerdown', wake, { once: true });
      window.addEventListener('touchstart', wake, { passive: true, once: true });
      // Fallback so stage still appears if user never interacts
      stageIdleId = scheduleIdle(wake, 10000);
    } else {
      stageIdleId = scheduleIdle(startStage, 1200);
      if (document.readyState === 'complete') armRuntime();
      else window.addEventListener('load', armRuntime, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', armRuntime);
      if (idleId) cancelIdle(idleId, usedRic);
      if (stageIdleId) cancelIdle(stageIdleId, usedRic);
      runtimeCleanup?.();
      tm.forEach(clearTimeout);
      tbListeners.forEach(({ btn, fn }) => btn.removeEventListener('click', fn));
      html.classList.remove('new-home-route', 'js');
      html.classList.add('authentic-route', 'ready');
    };
  }, []);

  return null;
}
