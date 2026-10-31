'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import UMarkLogo from '@/components/UMarkLogo';
import { cv } from '@/lib/cv-data';
import { CARD_CAL_URL } from '@/lib/card-data';

const easeOut = [0.16, 1, 0.3, 1] as const;

/** Standard business card ratio 3.5" × 2" */
export const CARD_W = 420;
export const CARD_H = 240;

type FaceProps = {
  className?: string;
  interactive?: boolean;
  exportMode?: boolean;
};

export function BusinessCardFront({ className = '', interactive = false, exportMode = false }: FaceProps) {
  const linkProps = interactive ? { 'data-card-interactive': true } : {};

  return (
    <div
      className={`relative overflow-hidden bg-[#040404] ${className}`}
      style={
        exportMode
          ? { width: CARD_W, height: CARD_H }
          : { width: '100%', height: '100%' }
      }
    >
      <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-uz-indigo" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 business-card-grid opacity-25" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-10 top-0 h-32 w-32 opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(75,63,255,0.4) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col pl-6 sm:pl-7 pr-4 sm:pr-5 py-4 sm:py-5">
        <div className="flex items-center justify-between gap-2">
          <UMarkLogo size={38} />
          <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.24em] text-uz-slate uppercase truncate">
            usamazahid.design
          </span>
        </div>

        <div className="mt-3 sm:mt-4 flex-1 min-h-0">
          <h1 className="font-display text-[clamp(20px,5.5vw,26px)] leading-[0.95] tracking-[-0.03em] text-uz-white">
            Usama Zahid
          </h1>
          <p className="mt-1.5 sm:mt-2 font-mono text-[9px] sm:text-[10px] tracking-[0.18em] text-uz-indigo uppercase">
            Brand & Product Designer
          </p>
          <div className="mt-2 sm:mt-3 h-px w-10 bg-uz-indigo" />
          <p className="mt-2 sm:mt-3 font-sans text-[11px] sm:text-[12px] leading-snug text-uz-silver">
            Strategy. Psychology. Design.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1 sm:gap-x-4 border-t border-uz-graphite/70 pt-2.5 sm:pt-3 font-mono text-[8px] sm:text-[9px] tracking-[0.06em] text-uz-silver">
          <a href={`mailto:${cv.email}`} {...linkProps} className="hover:text-uz-white transition-colors truncate">
            {cv.email}
          </a>
          <span className="text-uz-graphite hidden sm:inline">|</span>
          <a
            href={`tel:${cv.phone.replace(/\s/g, '')}`}
            {...linkProps}
            className="hover:text-uz-white transition-colors"
          >
            {cv.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

export function BusinessCardBack({ className = '', interactive = false, exportMode = false }: FaceProps) {
  const linkProps = interactive ? { 'data-card-interactive': true } : {};

  return (
    <div
      className={`relative overflow-hidden bg-[#040404] ${className}`}
      style={
        exportMode
          ? { width: CARD_W, height: CARD_H }
          : { width: '100%', height: '100%' }
      }
    >
      <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-uz-indigo" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 business-card-grid opacity-20" aria-hidden="true" />

      <div className="relative z-10 flex h-[calc(100%-32px)] pl-6 sm:pl-7 pr-4 sm:pr-5 pt-3 sm:pt-4">
        <div className="flex shrink-0 flex-col items-center justify-center pr-3 sm:pr-4">
          <div className="h-[72px] w-[72px] sm:h-[88px] sm:w-[88px] border border-uz-graphite bg-white p-1.5">
            <Image
              src="/images/card-qr.svg"
              alt=""
              width={88}
              height={88}
              className="h-full w-full"
            />
          </div>
          <p className="mt-1 font-mono text-[7px] tracking-[0.2em] text-uz-slate uppercase">
            Scan
          </p>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 border-l border-uz-graphite/50 pl-3 sm:pl-4">
          <div>
            <p className="font-mono text-[7px] tracking-[0.22em] text-uz-slate uppercase">Email</p>
            <a
              href={`mailto:${cv.email}`}
              {...linkProps}
              className="font-mono text-[9px] sm:text-[10px] text-uz-white hover:text-uz-indigo transition-colors truncate block"
            >
              {cv.email}
            </a>
          </div>
          <div>
            <p className="font-mono text-[7px] tracking-[0.22em] text-uz-slate uppercase">Phone</p>
            <a
              href={`tel:${cv.phone.replace(/\s/g, '')}`}
              {...linkProps}
              className="font-mono text-[9px] sm:text-[10px] text-uz-white hover:text-uz-indigo transition-colors"
            >
              {cv.phone}
            </a>
          </div>
          <div>
            <p className="font-mono text-[7px] tracking-[0.22em] text-uz-slate uppercase">Web</p>
            <a
              href="https://usamazahid.design/"
              {...linkProps}
              className="font-mono text-[9px] sm:text-[10px] text-uz-white hover:text-uz-indigo transition-colors"
            >
              {cv.website}
            </a>
          </div>
          <div>
            <p className="font-mono text-[7px] tracking-[0.22em] text-uz-slate uppercase">Location</p>
            <p className="font-mono text-[9px] sm:text-[10px] text-uz-silver">{cv.location}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-[5px] right-0 grid grid-cols-3 border-t border-uz-graphite/60 bg-[#060606]">
        <a
          href={CARD_CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          {...linkProps}
          className="flex items-center justify-center py-2 font-mono text-[7px] sm:text-[8px] tracking-[0.12em] text-uz-white uppercase bg-uz-indigo"
        >
          Book call
        </a>
        <a
          href={cv.socials[1]?.url ?? 'https://www.linkedin.com/in/usamazahid-design/'}
          target="_blank"
          rel="noopener noreferrer"
          {...linkProps}
          className="flex items-center justify-center py-2 border-l border-uz-graphite/60 font-mono text-[7px] sm:text-[8px] tracking-[0.12em] text-uz-silver uppercase"
        >
          LinkedIn
        </a>
        <a
          href="https://usamazahid.design/portfolio/"
          {...linkProps}
          className="flex items-center justify-center py-2 border-l border-uz-graphite/60 font-mono text-[7px] sm:text-[8px] tracking-[0.12em] text-uz-silver uppercase"
        >
          Portfolio
        </a>
      </div>

      <div className="pointer-events-none absolute bottom-9 right-3 opacity-15">
        <UMarkLogo size={24} />
      </div>
    </div>
  );
}

export default function BusinessCard() {
  const [flipped, setFlipped] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const exportFrontRef = useRef<HTMLDivElement>(null);
  const exportBackRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 260, damping: 26 });
  const springRotateY = useSpring(rotateY, { stiffness: 260, damping: 26 });

  const holoX = useTransform(springRotateY, [-14, 14], [20, 80]);
  const holoY = useTransform(springRotateX, [-14, 14], [80, 20]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || flipped || downloading) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 12);
    rotateX.set(-y * 12);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const exportWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = '/images/card-qr.svg';
  }, []);

  const captureElement = async (el: HTMLElement, filename: string) => {
    const wrapper = exportWrapRef.current;
    if (!wrapper) return;

    wrapper.style.position = 'fixed';
    wrapper.style.left = '0';
    wrapper.style.top = '0';
    wrapper.style.zIndex = '99999';

    await wait(150);

    const { default: html2canvas } = await import('html2canvas');

    try {
      const canvas = await html2canvas(el, {
        backgroundColor: '#040404',
        scale: 3,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: CARD_W,
        height: CARD_H,
      });

      const dataUrl = canvas.toDataURL('image/png');
      if (!dataUrl || dataUrl.length < 100) {
        throw new Error('Export failed, empty image');
      }

      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } finally {
      wrapper.style.position = '';
      wrapper.style.left = '-6000px';
      wrapper.style.top = '0';
      wrapper.style.zIndex = '';
    }
  };

  const handleDownload = async (side: 'front' | 'back' | 'both') => {
    if (downloading) return;
    setDownloading(true);
    resetTilt();

    try {
      await wait(100);
      if ((side === 'front' || side === 'both') && exportFrontRef.current) {
        await captureElement(exportFrontRef.current, 'usama-zahid-card-front.png');
      }
      if ((side === 'back' || side === 'both') && exportBackRef.current) {
        await wait(150);
        await captureElement(exportBackRef.current, 'usama-zahid-card-back.png');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      {/* Export-only layers: off-screen, fully painted (opacity 0 breaks html2canvas) */}
      <div ref={exportWrapRef} className="fixed -left-[6000px] top-0 pointer-events-none" aria-hidden="true">
        <div ref={exportFrontRef}>
          <BusinessCardFront exportMode />
        </div>
        <div ref={exportBackRef}>
          <BusinessCardBack exportMode />
        </div>
      </div>

      <div className="flex w-full max-w-[420px] flex-col items-center gap-5 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5, ease: easeOut }}
          className="text-center"
        >
          <p className="font-mono text-[10px] tracking-[0.32em] text-uz-slate uppercase">
            Digital business card
          </p>
          <p className="mt-1 font-mono text-[9px] tracking-[0.18em] text-uz-indigo uppercase">
            Tap to flip · Drag to tilt
          </p>
        </motion.div>

        <div
          ref={cardRef}
          className="business-card-stage w-full"
          onPointerMove={onPointerMove}
          onPointerLeave={resetTilt}
        >
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={
              reducedMotion || downloading
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 1, y: [0, -6, 0], scale: 1 }
            }
            transition={
              reducedMotion || downloading
                ? { duration: 0.8, ease: easeOut, delay: 0.1 }
                : {
                    opacity: { duration: 0.8, ease: easeOut, delay: 0.1 },
                    y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.9 },
                    scale: { duration: 0.8, ease: easeOut, delay: 0.1 },
                  }
            }
          >
            <motion.div
              className="w-full"
              style={
                reducedMotion || downloading
                  ? undefined
                  : {
                      rotateX: springRotateX,
                      rotateY: springRotateY,
                      transformStyle: 'preserve-3d',
                    }
              }
            >
              <motion.button
                type="button"
                data-card-interactive
                onClick={() => !downloading && setFlipped((f) => !f)}
                disabled={downloading}
                aria-label={flipped ? 'Show front of card' : 'Show back of card'}
                className="business-card-flipper relative w-full aspect-[1.75] cursor-pointer border border-uz-graphite/80 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-uz-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-uz-black disabled:cursor-wait"
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: easeOut }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {!reducedMotion && !downloading && (
                  <motion.div
                    className="business-card-holo pointer-events-none absolute inset-0 z-30"
                    style={{
                      background: `radial-gradient(circle at ${holoX}% ${holoY}%, rgba(75,63,255,0.18) 0%, transparent 55%)`,
                      backfaceVisibility: 'hidden',
                    }}
                  />
                )}

                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <BusinessCardFront interactive />
                </div>

                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <BusinessCardBack interactive />
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={downloading ? 'dl' : flipped ? 'back' : 'front'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-[9px] sm:text-[10px] tracking-[0.18em] text-uz-slate uppercase text-center px-4"
          >
            {downloading
              ? 'Preparing download…'
              : flipped
                ? 'Back, contact & QR'
                : 'Front, name & role'}
          </motion.p>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5, ease: easeOut }}
          className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
        >
          <button
            type="button"
            data-card-interactive
            disabled={downloading}
            onClick={() => handleDownload('both')}
            className="flex h-12 min-h-[48px] flex-1 sm:flex-none sm:min-w-[160px] items-center justify-center gap-2 border border-uz-indigo bg-uz-indigo px-5 font-mono text-[10px] tracking-[0.16em] text-uz-white uppercase transition-colors hover:bg-[#3a30cc] disabled:opacity-60"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3v12m0 0l4-4m-4 4l-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
            Download card
          </button>

          <button
            type="button"
            data-card-interactive
            disabled={downloading}
            onClick={() => handleDownload(flipped ? 'back' : 'front')}
            className="flex h-12 min-h-[48px] flex-1 sm:flex-none sm:min-w-[140px] items-center justify-center gap-2 border border-uz-graphite px-5 font-mono text-[10px] tracking-[0.16em] text-uz-silver uppercase transition-colors hover:border-uz-slate hover:text-uz-white disabled:opacity-60"
          >
            This side only
          </button>

          <a
            href={CARD_CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-card-interactive
            className="flex h-12 min-h-[48px] flex-1 sm:flex-none sm:min-w-[140px] items-center justify-center gap-2 border border-uz-graphite px-5 font-mono text-[10px] tracking-[0.16em] text-uz-silver uppercase transition-colors hover:border-uz-white hover:text-uz-white"
          >
            Book call →
          </a>
        </motion.div>
      </div>
    </>
  );
}
