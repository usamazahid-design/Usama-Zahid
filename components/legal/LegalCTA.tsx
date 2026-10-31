'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Marquee from '../Marquee';
import type { LegalDocument } from '@/lib/legal-data';

const easeOut = [0.16, 1, 0.3, 1] as const;

interface Props {
  document: LegalDocument;
  sisterHref: string;
  sisterLabel: string;
}

export default function LegalCTA({ document: doc, sisterHref, sisterLabel }: Props) {
  return (
    <section
      id={`${doc.slug}-cta`}
      className="relative w-full"
      style={{ background: '#4B3FFF', padding: '160px 0' }}
    >
      <div className="edge-marker tl" style={{ position: 'absolute' }} />
      <div className="edge-marker tr" style={{ position: 'absolute' }} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 0.96 0 0 0 0 0.96 0 0 0 0 0.96 0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          opacity: 0.05,
          mixBlendMode: 'overlay',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between flex-wrap gap-4 mb-12"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-uz-black" />
            <span className="font-mono text-[10px] text-uz-black tracking-[0.3em] uppercase">
              [ {doc.code.replace('L.', 'CTA · L.')} / CLOSING ]
            </span>
          </div>
          <div className="font-mono text-[10px] text-uz-black/60 tracking-[0.2em] uppercase flex items-center gap-3">
            <span>END_OF_DOC</span>
            <span className="w-1.5 h-1.5 bg-uz-black pulse-square" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="md:col-span-7"
          >
            <h2 className="font-display text-uz-white text-[clamp(56px,9vw,144px)] leading-[0.92] tracking-[-0.045em] mb-8">
              Questions
              <br />
              <span style={{ color: '#040404' }}>on this doc?</span>
            </h2>

            <p className="text-uz-black/80 text-[18px] md:text-[20px] leading-[1.5] max-w-xl mb-12">
              Email{' '}
              <a
                href="mailto:hello.usamazahid@gmail.com"
                className="text-uz-black hover:underline font-medium"
              >
                hello.usamazahid@gmail.com
              </a>{' '}
              with a subject line that starts with{' '}
              <span className="font-mono text-uz-white">
                &ldquo;{doc.shortTitle.toUpperCase()} ·&rdquo;
              </span>
              . We respond within 30 days, often within 24 hours.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:hello.usamazahid@gmail.com"
                data-cursor="hover"
                data-cursor-text="EMAIL"
                className="group relative flex items-center gap-3 h-14 px-8 bg-uz-black text-uz-white font-mono text-[12px] tracking-[0.15em] uppercase border border-uz-black overflow-hidden magnetic"
                style={{ borderRadius: 0, transition: 'color 300ms ease' }}
              >
                <span className="relative z-10 group-hover:text-uz-black transition-colors duration-500">
                  Email the operator
                </span>
                <span className="relative z-10 group-hover:text-uz-black transition-colors duration-500 inline-block group-hover:translate-x-1">
                  →
                </span>
                <span
                  className="absolute inset-0 bg-uz-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
              </a>

              <Link
                href={sisterHref}
                data-cursor="hover"
                className="inline-flex items-center gap-3 h-12 px-6 border border-uz-black text-uz-black hover:bg-uz-black hover:text-uz-white font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-300"
                style={{ borderRadius: 0 }}
              >
                <span>SEE_ALSO · {sisterLabel}</span>
                <span className="inline-block group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-5"
          >
            <div className="border border-uz-white/30 p-6" style={{ background: 'rgba(4,4,4,0.18)' }}>
              <div className="font-mono text-[10px] text-uz-white/70 tracking-[0.3em] uppercase pb-3 border-b border-uz-white/15 flex items-center justify-between">
                <span>[ LEGAL_INDEX ]</span>
                <span className="text-uz-white/50">02 DOCS</span>
              </div>

              <div className="mt-4 space-y-1">
                <DocLinkRow
                  code="L.01"
                  label="PRIVACY POLICY"
                  href="/privacy-policy"
                  current={doc.slug === 'privacy-policy'}
                />
                <DocLinkRow
                  code="L.02"
                  label="TERMS & CONDITIONS"
                  href="/terms"
                  current={doc.slug === 'terms'}
                />
              </div>

              <div className="mt-4 pt-4 border-t border-uz-white/15 space-y-2">
                <div className="font-mono text-[9px] text-uz-white/60 tracking-[0.3em] uppercase">
                  CURRENTLY_VIEWING
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] text-uz-white tabular-nums">
                    {doc.code.split(' / ')[0]}
                  </span>
                  <span className="font-display text-uz-white text-[18px] tracking-[-0.02em]">
                    {doc.title}
                  </span>
                </div>
                <div className="font-mono text-[9px] text-uz-white/50 tracking-[0.2em] uppercase">
                  {doc.version} · {doc.lastUpdated}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 -mx-6 md:-mx-20 border-y border-uz-black/30"
        >
          <Marquee speed="normal" className="py-5">
            {['PRIVACY FIRST', 'TRANSPARENCY', 'NO SURPRISES', 'LEGAL CLARITY', 'PRIVACY FIRST', 'TRANSPARENCY', 'NO SURPRISES', 'LEGAL CLARITY'].map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-6 whitespace-nowrap">
                <span className="font-display text-uz-white text-[clamp(28px,4vw,48px)] tracking-[-0.03em]">
                  {item}
                </span>
                <span className="text-uz-white/60 text-2xl">●</span>
              </div>
            ))}
          </Marquee>
        </motion.div>

        <div className="mt-12 grid grid-cols-6 gap-4 opacity-30">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-uz-white tracking-[0.2em]">
                0{i + 1}
              </span>
              <div className="flex-1 h-[1px] bg-uz-white/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DocLinkRow({
  code,
  label,
  href,
  current,
}: {
  code: string;
  label: string;
  href: string;
  current: boolean;
}) {
  return (
    <Link
      href={href}
      data-cursor="hover"
      className={`group flex items-center justify-between gap-3 py-2 ${
        current ? 'text-uz-white' : 'text-uz-white/60 hover:text-uz-white'
      } transition-colors`}
    >
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[10px] tabular-nums tracking-[0.2em] uppercase">
          {code}
        </span>
        <span className="text-[13px] tracking-[0.05em] uppercase">
          {label}
        </span>
      </div>
      <span className="font-mono text-[9px] tracking-[0.2em] uppercase">
        {current ? '● HERE' : '→'}
      </span>
    </Link>
  );
}
