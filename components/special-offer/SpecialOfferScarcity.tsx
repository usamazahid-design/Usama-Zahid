'use client';

import { motion } from 'framer-motion';
import { getOffer } from '@/lib/offer-data';

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function SpecialOfferScarcity() {
  const offer = getOffer();
  const taken = offer.spotsTotal - offer.spotsRemaining;

  return (
    <section
      id="offer-scarcity"
      className="relative w-full bg-uz-black overflow-hidden border-t border-uz-graphite"
      style={{ padding: '120px 0 160px' }}
    >
      <div className="edge-marker tl" style={{ position: 'absolute' }} />
      <div className="edge-marker tr" style={{ position: 'absolute' }} />
      <div className="edge-marker bl" style={{ position: 'absolute' }} />
      <div className="edge-marker br" style={{ position: 'absolute' }} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-uz-indigo" />
              <span className="font-mono text-[10px] text-uz-slate tracking-[0.3em] uppercase">
                [ OFFER-{offer.number}_03 / THE_FILTER ]
              </span>
            </div>
            <div className="font-mono text-[10px] text-uz-silver tracking-[0.2em] uppercase flex items-center gap-3">
              <span>02 SPOTS</span>
              <span className="w-1 h-1 bg-uz-indigo" />
              <span className="text-uz-indigo">FIXED CAP</span>
            </div>
          </div>

          <h2 className="font-display text-uz-white text-[clamp(40px,6vw,88px)] tracking-[-0.04em] max-w-4xl leading-[0.95]">
            Who it&rsquo;s for.
            <br />
            <span className="text-uz-indigo">And who it isn&rsquo;t.</span>
          </h2>
        </motion.div>

        {/* Spots taken bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 border border-uz-graphite p-6 md:p-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase">
              [ SPOT_STATUS · LIVE ]
            </div>
            <div className="font-mono text-[10px] text-uz-slate tracking-[0.2em] uppercase tabular-nums">
              {taken} / {offer.spotsTotal} TAKEN · {offer.spotsRemaining} REMAINING
            </div>
          </div>

          {/* Visual bar */}
          <div className="relative h-3 bg-uz-graphite overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(taken / offer.spotsTotal) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: easeOut }}
              className="absolute inset-y-0 left-0 bg-uz-indigo"
            />
            {[...Array(offer.spotsTotal)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-y-0 w-px bg-uz-black"
                style={{ left: `${((i + 1) / offer.spotsTotal) * 100}%` }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] text-uz-silver">
            <span>SPOT_01 · AVAILABLE</span>
            <span>SPOT_02 · AVAILABLE</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-uz-graphite">
          {/* For */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="bg-uz-black p-8 md:p-10"
          >
            <div className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase mb-6 pb-3 border-b border-uz-graphite">
              WHO_IT&rsquo;S_FOR · 04
            </div>
            <ul className="space-y-5">
              {offer.whoFor.map((item, i) => (
                <li key={i} className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] text-uz-indigo tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="text-uz-white text-[15px] md:text-[16px] leading-[1.5]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not for */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-uz-black p-8 md:p-10"
          >
            <div className="font-mono text-[10px] text-uz-slate tracking-[0.3em] uppercase mb-6 pb-3 border-b border-uz-graphite">
              NOT_A_FIT · 04
            </div>
            <ul className="space-y-5">
              {offer.whoNotFor.map((item, i) => (
                <li key={i} className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] text-uz-slate tabular-nums">
                    ✕
                  </span>
                  <span className="text-uz-silver text-[15px] md:text-[16px] leading-[1.5]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-12 flex items-center justify-center">
          <a
            href="mailto:hello.usamazahid@gmail.com?subject=SPECIAL_OFFER · DIAGNOSIS_CALL"
            data-cursor="hover"
            data-cursor-text="BOOK"
            className="group inline-flex items-center gap-3 h-14 px-8 bg-uz-indigo text-uz-white font-mono text-[12px] tracking-[0.15em] uppercase overflow-hidden relative magnetic"
            style={{ borderRadius: 0, transition: 'color 300ms ease' }}
          >
            <span className="relative z-10 group-hover:text-uz-black transition-colors duration-500">
              Book a 30-min diagnosis call
            </span>
            <span className="relative z-10 group-hover:text-uz-black transition-colors duration-500 inline-block group-hover:translate-x-1">
              →
            </span>
            <span
              className="absolute inset-0 bg-uz-white translate-x-full group-hover:translate-x-0 transition-transform duration-500"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
