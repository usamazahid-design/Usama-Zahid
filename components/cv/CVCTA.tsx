'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function CVCTA() {
  return (
    <section
      id="cv-cta"
      className="relative w-full bg-uz-indigo overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, #040404 1px, transparent 1px), linear-gradient(to bottom, #040404 1px, transparent 1px)',
            backgroundSize: '63px 63px',
          }}
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-20 py-32 md:py-48">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="flex items-center gap-3 mb-10"
            >
              <span className="w-1.5 h-1.5 bg-uz-black" />
              <span className="font-mono text-[10px] text-uz-black tracking-[0.3em] uppercase">
                [ CV_99 / THE_NEXT_HIRE ]
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}
              className="font-display text-uz-black text-[clamp(56px,9vw,160px)] tracking-[-0.05em] leading-[0.9] mb-10"
            >
              The record
              <br />
              ends here.
              <br />
              <span className="opacity-60">The work begins.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
              className="text-uz-black text-[17px] md:text-[19px] leading-[1.6] max-w-2xl mb-12"
            >
              Two slots open this quarter. Brand-to-URL, end to end.
              <br />
              <span className="font-mono text-[12px] tracking-[0.2em] uppercase mt-4 inline-block opacity-70">
                ESTIMATED 8-12 WEEKS · ONE OPERATOR · FIXED-SCOPE
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                href="/contact"
                data-cursor="hover"
                className="group inline-flex items-center gap-3 h-12 px-7 bg-uz-black text-uz-white font-mono text-[11px] tracking-[0.15em] uppercase overflow-hidden relative magnetic"
                style={{ borderRadius: 0, transition: 'color 300ms ease' }}
              >
                <span className="relative z-10 group-hover:text-uz-black transition-colors duration-500">
                  Start the sequence
                </span>
                <span className="relative z-10 group-hover:text-uz-black transition-colors duration-500 inline-block group-hover:translate-x-1">
                  →
                </span>
                <span
                  className="absolute inset-0 bg-uz-white translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
              </Link>

              <Link
                href="/portfolio"
                data-cursor="hover"
                className="inline-flex items-center gap-3 h-12 px-6 border border-uz-black text-uz-black hover:bg-uz-black hover:text-uz-white font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-300"
                style={{ borderRadius: 0 }}
              >
                See the work
              </Link>

              <a
                href="mailto:hello.usamazahid@gmail.com"
                data-cursor="hover"
                className="inline-flex items-center gap-3 h-12 px-5 font-mono text-[11px] text-uz-black hover:text-uz-white tracking-[0.15em] uppercase transition-colors duration-300"
              >
                hello.usamazahid@gmail.com →
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.4, ease: easeOut }}
            className="md:col-span-4"
          >
            <div className="border border-uz-black p-6 md:p-8 bg-uz-indigo/30 backdrop-blur-sm">
              <div className="font-mono text-[10px] text-uz-black tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-uz-black pulse-square" />
                OPERATOR_STATUS · LIVE
              </div>

              <div className="space-y-5">
                <StatusRow label="CAPACITY" value="02 / 04" />
                <StatusRow label="NEXT_SLOT" value="Q3_2026" />
                <StatusRow label="LOCATION" value="LAHORE · PK · UTC+05" />
                <StatusRow label="RESPONSE" value="< 24H" />
                <StatusRow label="ENGAGEMENT" value="FIXED_SCOPE" />
              </div>

              <div className="mt-6 pt-6 border-t border-uz-black/30">
                <div className="font-mono text-[9px] text-uz-black/80 tracking-[0.3em] uppercase mb-3">
                  CAPACITY_BAR
                </div>
                <div className="h-1 bg-uz-black/20 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '50%' }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 1.2, delay: 0.6, ease: easeOut }}
                    className="absolute inset-y-0 left-0 bg-uz-black"
                  />
                </div>
                <div className="flex items-center justify-between mt-2 font-mono text-[9px] text-uz-black/70 tracking-[0.1em] uppercase">
                  <span>00</span>
                  <span className="tabular-nums">02 ACTIVE</span>
                  <span>04</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-mono text-[10px] text-uz-black/70 tracking-[0.2em] uppercase">
        {label}
      </span>
      <span className="font-mono text-[12px] text-uz-black tracking-[0.05em] tabular-nums">
        {value}
      </span>
    </div>
  );
}
