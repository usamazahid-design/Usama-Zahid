/**
 * Deferred home interactions — loaded after idle so parse/exec
 * does not contribute to Total Blocking Time on first load.
 */
export function initAuthenticHomeRuntime(reduce: boolean): () => void {
  const d = document;
  const html = d.documentElement;
// Panelling, Cursor, Scroller
const mvs = Array.from(d.querySelectorAll<HTMLElement>('.mv'));
const panels = Array.from(d.querySelectorAll<HTMLElement>('.panel'));
const prog = d.getElementById('prog');
let mx = 0, my = 0, tx = 0, ty = 0, px = 0, py = 0;
let lastY = 0, sv = 0, tops: number[] = [], ln = -1;
const lit = d.getElementById('lit');

const mqDivs = Array.from(d.querySelectorAll<HTMLElement>('.mq>div'));
const mqA = mqDivs.map((e) => e.getAnimations()[0]).filter(Boolean);

function meas() {
  tops = panels.map((p) => {
    const val = parseFloat(getComputedStyle(p).top);
    return !isNaN(val) && val > 0 ? val : window.innerHeight * 0.11;
  });
}
meas();
window.addEventListener('resize', meas);

let lw: HTMLElement[] = [];
if (lit) {
  if (!lit.dataset.split) {
    lit.dataset.split = 'true';
    const words = (lit.textContent || '').trim().split(/\s+/).filter(Boolean);
    lit.replaceChildren(
      ...words.flatMap((w, idx) => {
        const span = document.createElement('span');
        span.className = 'w';
        span.textContent = w;
        return idx === 0 ? [span] : [document.createTextNode(' '), span];
      })
    );
  }
  lw = Array.from(lit.querySelectorAll<HTMLElement>('.w'));
}

const onMouseMove = (e: MouseEvent) => {
  tx = (e.clientX / innerWidth) * 2 - 1;
  ty = (e.clientY / innerHeight) * 2 - 1;
  px = e.clientX;
  py = e.clientY;
  scheduleFrame();
};
window.addEventListener('mousemove', onMouseMove, { passive: true });

let rafId: number | null = null;
let frameRunning = false;
let workActive = false;
let processActive = false;
let litActive = false;

function tick() {
  try {
    if (processActive) scrub();
  } catch {
    // ignore scrub errors
  }

  mx += (tx - mx) * 0.06;
  my += (ty - my) * 0.06;
  const sy = window.scrollY;
  const vh = window.innerHeight;
  const mh = html.scrollHeight - vh;

  if (prog) {
    prog.style.transform = 'scaleX(' + (mh > 0 ? Math.min(1, sy / mh) : 0).toFixed(4) + ')';
  }
  sv += (Math.abs(sy - lastY) - sv) * 0.1;
  lastY = sy;

  if (!reduce) {
    if (mqA.length === 0) {
      mqDivs.forEach((e) => {
        const anims = e.getAnimations();
        if (anims && anims[0]) mqA.push(anims[0]);
      });
    }
    if (sv > 0.2) {
      mqA.forEach((a) => {
        if (a) a.playbackRate = 1 + Math.min(sv * 0.35, 6);
      });
    }
    if (litActive && lit && lw.length > 0) {
      const r = lit.getBoundingClientRect();
      const pg = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const nw = Math.round(pg * lw.length);
      if (nw !== ln) {
        ln = nw;
        lw.forEach((w, i) => w.classList.toggle('on', i < nw));
      }
    }
  }

  if (!reduce && workActive) {
    mvs.forEach((g) => {
      const k = +(g.dataset.k || 0);
      g.style.transform =
        'translate(' +
        (mx * k + Math.min(sy, vh) * 0.012 * k).toFixed(1) +
        'px,' +
        (my * k - Math.min(sy, vh) * 0.012 * Math.abs(k) * 0.4).toFixed(1) +
        'px)';
    });
    panels.forEach((p, i) => {
      const rr = Math.max(-600, Math.min(600, p.getBoundingClientRect().top - (tops[i] || 0)));
      p.style.setProperty('--py', (-rr * 0.08).toFixed(1));
      p.style.setProperty('--pr', (rr * 0.015).toFixed(2));
      const n = panels[i + 1];
      if (!n) return;
      const top = tops[i] || 0;
      const q = Math.min(1, Math.max(0, 1 - (n.getBoundingClientRect().top - top) / p.offsetHeight));
      p.style.transform = 'scale(' + (1 - q * 0.05).toFixed(3) + ')';
    });
  }
}

function scheduleFrame() {
  if (frameRunning || d.hidden) return;
  frameRunning = true;
  const loop = () => {
    try {
      tick();
    } catch {
      // ignore
    }
    const keep =
      !d.hidden &&
      (workActive ||
        processActive ||
        litActive ||
        sv > 0.08 ||
        Math.abs(tx - mx) > 0.002 ||
        Math.abs(ty - my) > 0.002);
    if (keep) {
      rafId = requestAnimationFrame(loop);
    } else {
      frameRunning = false;
      rafId = null;
    }
  };
  rafId = requestAnimationFrame(loop);
}

const onScroll = () => scheduleFrame();
window.addEventListener('scroll', onScroll, { passive: true });

const workSec = d.getElementById('work');
const processSec = d.getElementById('process');
// Lit headline lives in #about — activate when that section (or the lit host) is in view
const litSec =
  (lit?.closest('section') as HTMLElement | null) || d.getElementById('about');
const sectionIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      const id = (en.target as HTMLElement).id;
      if (id === 'work') workActive = en.isIntersecting;
      if (id === 'process') processActive = en.isIntersecting;
      if (en.target === litSec || id === 'about') litActive = en.isIntersecting;
      if (en.isIntersecting) scheduleFrame();
    });
  },
  { rootMargin: '20% 0px 20% 0px', threshold: 0 }
);
if (workSec) sectionIO.observe(workSec);
if (processSec) sectionIO.observe(processSec);
if (litSec) sectionIO.observe(litSec);

const mg = Array.from(
  d.querySelectorAll<HTMLElement>(
    '.btn, a.mail, .see-all-link, .faq-mail-link, .cta-btn-primary, .cta-btn-secondary, .work-btn, .svc-all-btn, .tbs button, .t-pill, .tb'
  )
);
let magRaf = 0;
const onMagneticMove = (e: MouseEvent) => {
  if (reduce) return;
  px = e.clientX;
  py = e.clientY;
  if (magRaf) return;
  magRaf = requestAnimationFrame(() => {
    magRaf = 0;
    mg.forEach((el) => {
      const r = el.getBoundingClientRect();
      const dx = px - (r.left + r.width / 2);
      const dy = py - (r.top + r.height / 2);
      el.style.transform =
        Math.hypot(dx, dy) < r.width / 2 + 90
          ? 'translate(' + (dx * 0.12).toFixed(1) + 'px,' + (dy * 0.25).toFixed(1) + 'px)'
          : '';
    });
  });
};
// Defer magnetic hover work â€” not needed for LCP/TBT on load
let magIdle = 0;
let magIdleIsRic = false;
const attachMagnetic = () => {
  window.addEventListener('mousemove', onMagneticMove, { passive: true });
};
if (typeof window.requestIdleCallback === 'function') {
  magIdleIsRic = true;
  magIdle = window.requestIdleCallback(attachMagnetic, { timeout: 2000 });
} else {
  magIdle = setTimeout(attachMagnetic, 1200) as unknown as number;
}

scheduleFrame();

// Mobile menu
const mn = d.getElementById('mn');
const mo = d.getElementById('mo');
function mclose() {
  if (mo) mo.classList.remove('open');
  if (mn) {
    mn.setAttribute('aria-expanded', 'false');
    mn.textContent = 'Menu';
  }
  html.style.overflow = '';
}
const onMenuClick = () => {
  if (!mo || !mn) return;
  const o = mo.classList.toggle('open');
  mn.setAttribute('aria-expanded', o ? 'true' : 'false');
  mn.textContent = o ? 'Close' : 'Menu';
  html.style.overflow = o ? 'hidden' : '';
};
if (mn) mn.addEventListener('click', onMenuClick);

const moLinks = mo ? Array.from(mo.querySelectorAll('a')) : [];
moLinks.forEach((a) => a.addEventListener('click', mclose));

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') mclose();
};
window.addEventListener('keydown', onKeydown);

// Header nav active underline
const nl = Array.from(d.querySelectorAll<HTMLAnchorElement>('header nav a[href^="#"]'));
const so = new IntersectionObserver(
  (es) => {
    es.forEach((en) => {
      if (en.isIntersecting) {
        nl.forEach((a) => {
          a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id);
        });
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
['services', 'work', 'process', 'about', 'faq'].forEach((id) => {
  const el = d.getElementById(id);
  if (el) so.observe(el);
});

const spn = d.querySelector<HTMLElement>('.steps');
let spnObs: IntersectionObserver | null = null;
if (spn) {
  spnObs = new IntersectionObserver(
    (es, o) => {
      es.forEach((en) => {
        if (en.isIntersecting) {
          spn.classList.add('run');
          o.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  spnObs.observe(spn);
}

// Process steps interactive scrubbing
const pt = d.getElementById('pt');
const pips = Array.from(d.querySelectorAll<HTMLButtonElement>('.pips button'));
const pvc = d.getElementById('pvc');
const pn = d.getElementById('pn');
const pw = d.getElementById('pw');
const pss = Array.from(d.querySelectorAll<HTMLElement>('.ps'));
const WK = ['Week one', 'Week two', 'Week three', 'Week four'];

const pipClickListeners: { btn: HTMLButtonElement; fn: () => void }[] = [];
pips.forEach((b, j) => {
  const fn = () => {
    if (pss[j]) {
      pss[j].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    }
  };
  b.addEventListener('click', fn);
  pipClickListeners.push({ btn: b, fn });
});

function cl(x: number) {
  return Math.max(0, Math.min(1, x));
}
function eo(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

const pxs = d.querySelector<HTMLElement>('.px');
const V = [1, 2, 3, 4].map((n) => d.querySelector<HTMLElement>('.v' + n));
let lastG = -1;
const v1l = V[0] ? Array.from(V[0].querySelectorAll<SVGLineElement>('line')) : [];
const v1n = V[0] ? Array.from(V[0].querySelectorAll<SVGElement>('.nd')) : [];
const v1t = V[0] ? Array.from(V[0].querySelectorAll<SVGTextElement>('text')) : [];
const v2p = V[1] ? Array.from(V[1].querySelectorAll<SVGElement>('.lp')) : [];
const v3e = V[2] ? Array.from(V[2].children as HTMLCollectionOf<SVGElement>) : [];
const v4e = V[3] ? Array.from(V[3].children as HTMLCollectionOf<SVGElement>) : [];

function stag(arr: SVGElement[], b: number) {
  arr.forEach((el, i) => {
    const e = eo(cl(b * 1.9 - i / arr.length));
    el.style.opacity = String(e);
    el.style.transform = 'translateY(' + ((1 - e) * 12).toFixed(1) + 'px)';
  });
}

function scrub() {
  if (!pxs || !pvc || !pn || !pw || !pt) return;
  const vh = window.innerHeight;
  const r0 = pxs.getBoundingClientRect();
  if (r0.bottom < -100 || r0.top > vh + 100) return;
  const c = vh * 0.47;
  let gi = 3, gt = 1, i: number, r: DOMRect;
  for (i = 0; i < pss.length; i++) {
    r = pss[i].getBoundingClientRect();
    if (c < r.top) {
      gi = i ? i - 1 : 0;
      gt = i ? 1 : 0;
      break;
    }
    if (c < r.bottom) {
      gi = i;
      gt = (c - r.top) / r.height;
      break;
    }
  }
  const G = gi + gt;
  if (gi !== lastG) {
    lastG = gi;
    pvc.dataset.step = String(gi + 1);
    pn.textContent = '0' + (gi + 1);
    pw.textContent = WK[gi];
    const h3 = pss[gi] ? pss[gi].querySelector('h3') : null;
    if (h3) pt.textContent = h3.textContent;
    pips.forEach((b, j) => b.classList.toggle('on', j === gi));
    pss.forEach((x, j) => x.classList.toggle('act', j === gi));
  }
  for (let s = 0; s < 4; s++) {
    if (!V[s]) continue;
    const u = G - s;
    const op = (s ? cl((u + 0.15) / 0.25) : 1) * (s < 3 ? 1 - cl((u - 0.85) / 0.25) : 1);
    const b = cl((u + (s ? 0 : 0.35)) / 0.55);
    V[s]!.style.opacity = op.toFixed(3);
    V[s]!.style.transform = 'none';
    if (op < 0.01) continue;
    if (s === 0) {
      v1l.forEach((l, k) => {
        l.style.strokeDashoffset = (1 - eo(cl(b * 1.7 - k * 0.22))).toFixed(3);
      });
      v1n.forEach((n, k) => {
        n.style.transform = 'scale(' + eo(cl(b * 2 - 0.45 - k * 0.12)).toFixed(3) + ')';
      });
      v1t.forEach((t) => {
        t.style.opacity = cl(b * 2 - 0.9).toFixed(3);
      });
    } else if (s === 1) {
      v2p.forEach((p, k) => {
        const e = eo(cl(b * 1.8 - k * 0.25));
        p.style.opacity = e.toFixed(3);
        const dx = p.dataset.dx || '0';
        const dy = p.dataset.dy || '0';
        p.style.transform =
          'translate(' +
          ((1 - e) * parseFloat(dx)).toFixed(0) +
          'px,' +
          ((1 - e) * parseFloat(dy)).toFixed(0) +
          'px)';
      });
    } else {
      stag(s === 2 ? v3e : v4e, b);
    }
  }
}
scrub();

// Kind words Testimonials carousel
const tqs = Array.from(d.querySelectorAll<HTMLElement>('.tsq'));
const tpills = Array.from(d.querySelectorAll<HTMLButtonElement>('.t-pill'));
let ti = 0;
const tpI = d.getElementById('tp');
const tcn = d.getElementById('tc');
let tst = performance.now();
let tpz = false;
const tsx = d.getElementById('praise');

function tshow(n: number) {
  if (tqs.length === 0) return;
  ti = (n + tqs.length) % tqs.length;
  tqs.forEach((q, idx) => q.classList.toggle('on', idx === ti));
  tpills.forEach((p, idx) => p.classList.toggle('on', idx === ti));
  if (tcn) tcn.textContent = `Fig. 0${ti + 1} / 0${tqs.length}`;
  tst = performance.now();
  if (tpI) tpI.style.transform = 'scaleX(0)';
}

const tpv = d.getElementById('tpv');
const tnx = d.getElementById('tnx');
const onPrev = () => tshow(ti - 1);
const onNext = () => tshow(ti + 1);
if (tpv) tpv.addEventListener('click', onPrev);
if (tnx) tnx.addEventListener('click', onNext);

const pillListeners: { btn: HTMLButtonElement; fn: () => void }[] = [];
tpills.forEach((b, idx) => {
  const fn = () => tshow(idx);
  b.addEventListener('click', fn);
  pillListeners.push({ btn: b, fn });
});

const onTsxEnter = () => { tpz = true; };
const onTsxLeave = () => { tpz = false; tst = performance.now(); };
if (tsx) {
  tsx.addEventListener('mouseenter', onTsxEnter);
  tsx.addEventListener('mouseleave', onTsxLeave);
  tsx.addEventListener('focusin', onTsxEnter);
  tsx.addEventListener('focusout', onTsxLeave);
}

let sx = 0;
const onPointerDown = (e: PointerEvent) => { sx = e.clientX; };
const onPointerUp = (e: PointerEvent) => {
  const dx = e.clientX - sx;
  if (Math.abs(dx) > 50) tshow(ti + (dx < 0 ? 1 : -1));
};
if (tsx) {
  tsx.addEventListener('pointerdown', onPointerDown);
  tsx.addEventListener('pointerup', onPointerUp);
}

let praiseActive = false;
const praiseIO = tsx
  ? new IntersectionObserver(
      ([en]) => {
        praiseActive = Boolean(en?.isIntersecting);
      },
      { rootMargin: '10% 0px', threshold: 0 }
    )
  : null;
if (tsx && praiseIO) praiseIO.observe(tsx);

const quoteInterval = setInterval(() => {
  if (reduce || tpz || d.hidden || !tpI || !praiseActive) return;
  const q = Math.min(1, (performance.now() - tst) / 7000);
  tpI.style.transform = 'scaleX(' + q.toFixed(3) + ')';
  if (q >= 1) tshow(ti + 1);
}, 200);
tshow(0);

if (!reduce) html.classList.add('js');

// Reveal animations on scroll
const rvs = Array.from(
  d.querySelectorAll<HTMLElement>(
    '.svc,.pf>div,.facts>div,.sv-l>*,.fn .box,.fn dl,.body p,.sh,.ft>div,.wh,.pq-inner,.faq-aside'
  )
);
rvs.forEach((el, idx) => {
  el.classList.add('rv');
  el.style.setProperty('--d', (idx % 4) * 0.08 + 's');
});

const rio = new IntersectionObserver(
  (es, o) => {
    es.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('vis');
        o.unobserve(en.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -4% 0px' }
);
rvs.forEach((el) => rio.observe(el));

// Number counters
const counters = Array.from(d.querySelectorAll<HTMLElement>('[data-n]'));
const animateCounter = (el: HTMLElement) => {
  const to = +(el.dataset.n || 0);
  const s = el.dataset.s || '';
  if (reduce) {
    el.textContent = to + s;
    return;
  }
  const startT = performance.now();
  const countTick = (t: number) => {
    const p = Math.min(1, (t - startT) / 1200);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + s;
    if (p < 1) requestAnimationFrame(countTick);
  };
  requestAnimationFrame(countTick);
};

const ioCounters = new IntersectionObserver(
  (es) => {
    es.forEach((en) => {
      if (!en.isIntersecting) return;
      ioCounters.unobserve(en.target);
      animateCounter(en.target as HTMLElement);
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -4% 0px' }
);

counters.forEach((el) => {
  const r = el.getBoundingClientRect();
  // Above-fold counters stay final — animating 0→N causes CLS + main-thread work
  if (r.top < window.innerHeight && r.bottom > 0) {
    const to = +(el.dataset.n || 0);
    const s = el.dataset.s || '';
    el.textContent = to + s;
    return;
  }
  ioCounters.observe(el);
});

  return () => {
    html.classList.remove('js');

    if (rafId) cancelAnimationFrame(rafId);
    if (magRaf) cancelAnimationFrame(magRaf);
    clearInterval(quoteInterval);
    if (magIdle) {
      if (magIdleIsRic && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(magIdle);
      } else {
        clearTimeout(magIdle);
      }
    }

    window.removeEventListener('resize', meas);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mousemove', onMagneticMove);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('keydown', onKeydown);
    sectionIO.disconnect();
    praiseIO?.disconnect();

    if (mn) mn.removeEventListener('click', onMenuClick);
    moLinks.forEach((a) => a.removeEventListener('click', mclose));
    pipClickListeners.forEach(({ btn, fn }) => btn.removeEventListener('click', fn));
    pillListeners.forEach(({ btn, fn }) => btn.removeEventListener('click', fn));

    if (tpv) tpv.removeEventListener('click', onPrev);
    if (tnx) tnx.removeEventListener('click', onNext);
    if (tsx) {
      tsx.removeEventListener('mouseenter', onTsxEnter);
      tsx.removeEventListener('mouseleave', onTsxLeave);
      tsx.removeEventListener('focusin', onTsxEnter);
      tsx.removeEventListener('focusout', onTsxLeave);
      tsx.removeEventListener('pointerdown', onPointerDown);
      tsx.removeEventListener('pointerup', onPointerUp);
    }

    so.disconnect();
    if (spnObs) spnObs.disconnect();
    rio.disconnect();
    ioCounters.disconnect();
  };
}
