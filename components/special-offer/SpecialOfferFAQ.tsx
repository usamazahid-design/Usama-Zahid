'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { getOffer } from '@/lib/offer-data';

const easeOut = [0.16, 1, 0.3, 1] as const;

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-uz-graphite">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-6 md:py-8 flex items-start justify-between gap-6 group"
        data-cursor="hover"
      >
        <div className="flex items-baseline gap-4 md:gap-6 flex-1">
          <span className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase tabular-nums">
            [{String(index + 1).padStart(2, '0')}]
          </span>
          <span className="font-display text-uz-white text-[clamp(18px,2vw,26px)] tracking-[-0.02em] group-hover:text-uz-indigo transition-colors duration-300">
            {q}
          </span>
        </div>
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-uz-slate group-hover:border-uz-indigo transition-colors duration-300">
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="font-mono text-uz-white text-[18px] leading-none"
          >
            +
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="overflow-hidden"
          >
            <div className="pl-0 md:pl-14 pr-0 md:pr-14 pb-6 md:pb-8 max-w-3xl">
              <p className="text-uz-silver text-[15px] md:text-[16px] leading-[1.7]">
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SpecialOfferFAQ() {
  const offer = getOffer();

  return (
    <section
      id="offer-faq"
      className="relative w-full bg-uz-black overflow-hidden border-t border-uz-graphite"
      style={{ padding: '120px 0 160px' }}
    >
      <div className="edge-marker tl" style={{ position: 'absolute' }} />
      <div className="edge-marker tr" style={{ position: 'absolute' }} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {/* Left: Sticky header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            <div className="md:sticky md:top-32">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-2 bg-uz-indigo" />
                <span className="font-mono text-[10px] text-uz-slate tracking-[0.3em] uppercase">
                  [ OFFER-{offer.number}_04 / THE_QA ]
                </span>
              </div>

              <h2 className="font-display text-uz-white text-[clamp(40px,6vw,80px)] tracking-[-0.04em] mb-8 leading-[0.95]">
                The
                <br />
                <span className="text-uz-indigo">fine print.</span>
              </h2>

              <p className="text-uz-silver text-[16px] md:text-[18px] leading-[1.6] max-w-md mb-10">
                The questions that come up in every offer call. Honest answers, no pitch.
              </p>

              <div className="pt-6 border-t border-uz-graphite">
                <div className="font-mono text-[9px] text-uz-slate tracking-[0.3em] uppercase mb-3">
                  STILL_UNDECIDED
                </div>
                <Link
                  href="/contact"
                  data-cursor="hover"
                  data-cursor-text="BOOK"
                  className="group inline-flex items-center gap-3 font-mono text-[12px] text-uz-white tracking-[0.15em] uppercase"
                >
                  <span className="border-b border-uz-white group-hover:border-uz-indigo group-hover:text-uz-indigo transition-colors">
                    Book a strategy call
                  </span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right: Accordion */}
          <div className="md:col-span-7">
            <div className="border-t border-uz-graphite">
              {offer.faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between flex-wrap gap-4 font-mono text-[10px] text-uz-slate tracking-[0.2em] uppercase">
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-uz-indigo" />
                <span>OFFER-{offer.number} · LIMITED</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{offer.faqs.length} ENTRIES</span>
                <span className="w-1 h-1 bg-uz-indigo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
