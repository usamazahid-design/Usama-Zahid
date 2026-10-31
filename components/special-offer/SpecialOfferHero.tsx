'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getOffer } from '@/lib/offer-data';

const easeOut = [0.16, 1, 0.3, 1] as const;

function useCountdown(deadline: string) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const compute = () => {
      const now = new Date();
      const targetYear = 2026;
      const targetMonth = 8;
      const target = new Date(Date.UTC(targetYear, targetMonth, 30, 23, 59, 59));
      const diff = Math.max(0, target.getTime() - now.getTime());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTime({ days, hours, minutes, seconds });
    };
    compute();
    const id = setInterval(compute, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  return time;
}

function ParticleField() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    dur: Math.random() * 6 + 4,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.id % 3 === 0 ? '#4B3FFF' : '#F6F6F6',
            opacity: 0.15,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0.1, 0.25, 0.1, 0.2, 0.1],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default function SpecialOfferHero() {
  const offer = getOffer();
  const t = useCountdown(offer.deadline);
  const [time, setTime] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toUTCString().split(' ')[4]);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <section
      id="offer-hero"
      className="relative w-full bg-uz-black overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      <div className="absolute inset-0 hero-grid-overlay pointer-events-none" />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(75,63,255,0.03) 0%, transparent 60%)`,
          backgroundSize: '60px 60px',
          backgroundPosition: `${mousePos.x * 20}px ${mousePos.y * 20}px`,
          transition: 'background-position 0.3s ease-out',
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(75,63,255,0.08) 0%, transparent 40%)`,
        }}
      />

      <div className="scan-lines" />
      <div className="vignette" />
      <ParticleField />

      <motion.div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(75,63,255,0.06) 0%, transparent 70%)',
          x: mousePos.x * -30,
          y: mousePos.y * -30,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(246,246,246,0.03) 0%, transparent 70%)',
          x: mousePos.x * 20,
          y: mousePos.y * 20,
        }}
      />

      <div className="edge-marker tl" style={{ position: 'absolute' }} />
      <div className="edge-marker tr" style={{ position: 'absolute' }} />
      <div className="edge-marker bl" style={{ position: 'absolute' }} />
      <div className="edge-marker br" style={{ position: 'absolute' }} />

      <div className="absolute top-0 left-0 right-0 z-20 pt-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 flex items-center justify-between font-mono text-[10px] text-uz-slate tracking-[0.2em] uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-uz-indigo pulse-square" />
            <span>SUBJECT · OFFER-{offer.number}</span>
          </div>
          <div className="hidden md:block">{offer.heroEyebrow}</div>
          <div className="font-mono tabular-nums text-uz-slate">
            DEADLINE · {offer.deadline}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-20 pt-40 md:pt-48 pb-32 min-h-screen flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-1.5 h-1.5 bg-uz-indigo pulse-square" />
          <span className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase">
            [ {offer.heroLabel} ]
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: easeOut }}
          className="mb-10 font-mono text-[10px] text-uz-silver tracking-[0.4em] uppercase"
        >
          ── {String(offer.spotsRemaining).padStart(2, '0')} OF {String(offer.spotsTotal).padStart(2, '0')} SPOTS REMAINING ──
        </motion.div>

        <h1 className="font-display text-[clamp(56px,8vw,140px)] tracking-[-0.045em] leading-[0.85] max-w-5xl mb-8">
          {offer.heroLines.map((line, i) => (
            <span key={i} className="block overflow-hidden mb-2">
              <motion.span
                initial={{ y: 120, opacity: 0, rotateX: -30 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 1.0, delay: 0.5 + i * 0.2, ease: easeOut }}
                className="block"
                style={{ perspective: 800, color: i === 2 ? '#4B3FFF' : '#F6F6F6' }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: easeOut }}
          className="text-uz-silver text-[17px] md:text-[19px] leading-[1.65] max-w-2xl mb-14"
        >
          {offer.heroSub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: easeOut }}
          className="relative mb-12"
        >
          <motion.div
            className="absolute -inset-4 border border-uz-indigo/30 rounded-none pointer-events-none"
            animate={{ scale: [1, 1.03, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="grid grid-cols-4 gap-px bg-uz-graphite w-full max-w-2xl relative">
            {[
              { label: 'DAYS', value: t.days },
              { label: 'HOURS', value: t.hours },
              { label: 'MINUTES', value: t.minutes },
              { label: 'SECONDS', value: t.seconds },
            ].map((u) => (
              <div key={u.label} className="bg-uz-black p-4 md:p-6 text-center">
                <div className="font-mono text-[9px] text-uz-slate tracking-[0.3em] uppercase mb-2">
                  {u.label}
                </div>
                <div className="font-display text-uz-white text-[clamp(28px,4vw,48px)] tracking-[-0.02em] tabular-nums">
                  {String(u.value).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: easeOut }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <span className="font-mono text-[10px] text-uz-slate tracking-[0.3em] uppercase">
            FROM
          </span>
          <span className="font-mono text-[16px] text-uz-silver line-through tracking-[0.05em] tabular-nums">
            {offer.anchorPrice}
          </span>
          <span className="font-mono text-[10px] text-uz-slate tracking-[0.3em] uppercase">
            TO
          </span>
          <span className="font-display text-uz-indigo text-[clamp(40px,5vw,64px)] tracking-[-0.03em] tabular-nums">
            {offer.offerPrice}
          </span>
          <span className="font-mono text-[10px] text-uz-slate tracking-[0.3em] uppercase">
            FIXED
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.7, ease: easeOut }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          <a
            href="mailto:hello.usamazahid@gmail.com?subject=SPECIAL_OFFER · AI_PRODUCT_DESIGN_SPRINT"
            data-cursor="hover"
            data-cursor-text="BOOK"
            className="group inline-flex items-center gap-3 h-14 px-8 bg-uz-indigo text-uz-white font-mono text-[12px] tracking-[0.15em] uppercase overflow-hidden relative magnetic"
            style={{ borderRadius: 0, transition: 'color 300ms ease' }}
          >
            <span className="relative z-10 group-hover:text-uz-black transition-colors duration-500">
              Book a 30-min call
            </span>
            <span className="relative z-10 group-hover:text-uz-black transition-colors duration-500 inline-block group-hover:translate-x-1">
              →
            </span>
            <span
              className="absolute inset-0 bg-uz-white translate-x-full group-hover:translate-x-0 transition-transform duration-500"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            />
          </a>

          <a
            href="#offer-stack"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 h-14 px-6 border border-uz-graphite text-uz-white hover:border-uz-indigo font-mono text-[12px] tracking-[0.15em] uppercase transition-colors duration-300"
            style={{ borderRadius: 0 }}
          >
            <span>See what&rsquo;s inside</span>
            <span className="inline-block group-hover:translate-y-1 transition-transform duration-300">
              ↓
            </span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.9, ease: easeOut }}
          className="mt-4 relative"
        >
          <div className="absolute -top-3 -left-3 w-4 h-4 border-l border-t border-uz-indigo" />
          <div className="absolute -top-3 -right-3 w-4 h-4 border-r border-t border-uz-indigo" />
          <div className="absolute -bottom-3 -left-3 w-4 h-4 border-l border-b border-uz-indigo" />
          <div className="absolute -bottom-3 -right-3 w-4 h-4 border-r border-b border-uz-indigo" />

          <svg
            width="180"
            height="180"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0" y="0" width="14" height="14" fill="#F6F6F6" />
            <rect x="0" y="26" width="14" height="14" fill="#F6F6F6" />
            <path
              d="M 14 7 L 14 14 A 12 12 0 0 0 26 26 L 26 14"
              stroke="#F6F6F6"
              strokeWidth="3"
              fill="none"
            />
            <rect x="26" y="26" width="14" height="14" fill="#4B3FFF" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.3 }}
          className="mt-6 font-mono text-[10px] text-uz-slate tracking-[0.3em] uppercase"
        >
          [ U · OFFER-{offer.number} · {offer.deadline} ]
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 z-20"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 flex items-center justify-between font-mono text-[10px] text-uz-slate tracking-[0.2em] uppercase">
          <div className="flex items-center gap-2">
            <span>OFFER-{offer.number} / LIMITED_RELEASE</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span>SCROLL ↓</span>
            <span className="w-1 h-1 bg-uz-indigo" />
          </div>
          <div>{offer.offerPrice} · FIXED</div>
        </div>
      </motion.div>
    </section>
  );
}
