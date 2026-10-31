'use client';

import { motion } from 'framer-motion';
import { getOffer } from '@/lib/offer-data';

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function SpecialOfferStack() {
  const offer = getOffer();

  return (
    <section
      id="offer-stack"
      className="relative w-full bg-uz-black overflow-hidden border-t border-uz-graphite"
      style={{ padding: '120px 0 160px' }}
    >
      <div className="edge-marker tl" style={{ position: 'absolute' }} />
      <div className="edge-marker tr" style={{ position: 'absolute' }} />

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
                [ OFFER-{offer.number}_01 / THE_STACK ]
              </span>
            </div>
            <div className="font-mono text-[10px] text-uz-silver tracking-[0.2em] uppercase flex items-center gap-3">
              <span>04 TRACKS</span>
              <span className="w-1 h-1 bg-uz-indigo" />
              <span>10-14 WEEKS</span>
            </div>
          </div>

          <h2 className="font-display text-uz-white text-[clamp(40px,6vw,88px)] tracking-[-0.04em] max-w-4xl leading-[0.95]">
            What you get.
            <br />
            <span className="text-uz-indigo">All four tracks.</span>
          </h2>

          <p className="text-uz-silver text-[17px] md:text-[19px] leading-[1.6] max-w-2xl mt-8">
            The four tracks that make up a Brand-to-URL engagement, bundled into one
            sequence. Each track is a standalone deliverable. Together, they are
            a complete system.
          </p>
        </motion.div>

        {/* Track grid */}
        <div className="space-y-px bg-uz-graphite">
          {offer.deliverables.map((d, i) => (
            <motion.div
              key={d.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: easeOut }}
              className="group bg-uz-black p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start hover:bg-uz-graphite/30 transition-colors duration-500"
            >
              {/* Left: number + title + description */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase">
                    [ TRACK · {d.code} ]
                  </span>
                  <span className="font-mono text-[10px] text-uz-slate tracking-[0.2em] uppercase">
                    INCLUDED
                  </span>
                </div>

                <h3 className="font-display text-uz-white text-[clamp(32px,4.5vw,64px)] tracking-[-0.03em] leading-[0.95] group-hover:text-uz-indigo transition-colors duration-500">
                  {d.title}
                </h3>

                <p className="text-uz-silver text-[15px] md:text-[17px] leading-[1.6] max-w-xl">
                  {d.description}
                </p>
              </div>

              {/* Right: standalone price + crossed out */}
              <div className="md:col-span-5 md:text-right space-y-3 md:pt-2">
                <div className="font-mono text-[9px] text-uz-slate tracking-[0.3em] uppercase">
                  {d.fromLabel}
                </div>
                <div className="font-display text-uz-silver text-[clamp(24px,2.5vw,36px)] tracking-[-0.02em] tabular-nums line-through opacity-60">
                  {d.fromValue}
                </div>
                <div className="font-mono text-[10px] text-uz-indigo tracking-[0.2em] uppercase">
                  INCLUDED IN SPRINT
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 flex items-center justify-between flex-wrap gap-4 font-mono text-[10px] text-uz-slate tracking-[0.2em] uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-uz-indigo" />
            <span>FULL_STACK_DELIVERY · 04_TRACKS</span>
          </div>
          <div className="flex items-center gap-2">
            <span>FROM {offer.anchorPrice} STANDALONE</span>
            <span className="w-1 h-1 bg-uz-indigo" />
          </div>
        </div>
      </div>
    </section>
  );
}
