'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { LegalDocument } from '@/lib/legal-data';

const easeOut = [0.16, 1, 0.3, 1] as const;

interface Props {
  document: LegalDocument;
  sisterHref: string;
  sisterLabel: string;
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

export default function LegalHero({ document: doc, sisterHref, sisterLabel }: Props) {
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
      id={`${doc.slug}-hero`}
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
            <span>{doc.code}</span>
          </div>
          <div className="hidden md:block">{doc.version} · {doc.sections.length} SECTIONS</div>
          <div className="tabular-nums">UTC {time || '--:--:--'}</div>
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
            [ {doc.code} ] · UPDATED {doc.lastUpdated}
          </span>
        </motion.div>

        <h1 className="font-display text-[clamp(48px,7.5vw,112px)] tracking-[-0.045em] leading-[0.9] max-w-5xl mb-8">
          <span className="block overflow-hidden mb-2">
            <motion.span
              initial={{ y: 120, opacity: 0, rotateX: -30 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ duration: 1.0, delay: 0.5, ease: easeOut }}
              className="block text-uz-white"
              style={{ perspective: 800 }}
            >
              {doc.title}
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: easeOut }}
          className="text-uz-silver text-[17px] md:text-[19px] leading-[1.6] max-w-3xl mb-14"
        >
          {doc.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: easeOut }}
          className="border border-uz-graphite p-6 w-full max-w-md mb-14 bg-uz-graphite/20"
        >
          <div className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase pb-3 border-b border-uz-graphite mb-4">
            [ DOC_META ]
          </div>
          <div className="space-y-3">
            <MetaRow label="VERSION" value={doc.version} />
            <MetaRow label="JURISDICTION" value={doc.jurisdiction} />
            <MetaRow label="EFFECTIVE" value={doc.effectiveDate} />
            <MetaRow label="UPDATED" value={doc.lastUpdated} />
            <MetaRow label="SECTIONS" value={String(doc.sections.length).padStart(2, '0')} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3, ease: easeOut }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href={sisterHref}
            data-cursor="hover"
            data-cursor-text="OPEN"
            className="group inline-flex items-center gap-3 h-11 px-5 border border-uz-graphite text-uz-white hover:border-uz-indigo font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-300"
            style={{ borderRadius: 0 }}
          >
            <span>SEE_ALSO · {sisterLabel}</span>
            <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </Link>

          <a
            href="#legal-body"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 font-mono text-[11px] text-uz-slate hover:text-uz-indigo tracking-[0.2em] uppercase transition-colors"
          >
            <span>JUMP_TO_CONTENT</span>
            <span className="inline-block group-hover:translate-y-1 transition-transform duration-300">
              ↓
            </span>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 z-20"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 flex items-center justify-between font-mono text-[10px] text-uz-slate tracking-[0.2em] uppercase">
          <div className="flex items-center gap-2">
            <span>{doc.jurisdiction} · EFFECTIVE {doc.effectiveDate}</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span>SCROLL ↓</span>
            <span className="w-1 h-1 bg-uz-indigo" />
          </div>
          <div>{doc.version}</div>
        </div>
      </motion.div>
    </section>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="font-mono text-[9px] text-uz-slate tracking-[0.3em] uppercase">
        {label}
      </span>
      <span className="font-mono text-[11px] text-uz-white text-right tracking-[0.05em]">
        {value}
      </span>
    </div>
  );
}
