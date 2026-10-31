'use client';

import { motion } from 'framer-motion';
import { getOffer } from '@/lib/offer-data';
import posthog from 'posthog-js';

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function SpecialOfferPricing() {
  const offer = getOffer();

  return (
    <section
      id="offer-pricing"
      className="relative w-full bg-uz-black overflow-hidden"
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
                [ OFFER-{offer.number}_02 / THE_DEAL ]
              </span>
            </div>
            <div className="font-mono text-[10px] text-uz-silver tracking-[0.2em] uppercase flex items-center gap-3">
              <span>FIXED</span>
              <span className="w-1 h-1 bg-uz-indigo" />
              <span>NO_SURPRISES</span>
            </div>
          </div>

          <h2 className="font-display text-uz-white text-[clamp(40px,6vw,88px)] tracking-[-0.04em] max-w-4xl leading-[0.95]">
            The price.
            <br />
            <span className="text-uz-indigo">And the bonuses.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left: anchor → sale */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              className="border border-uz-graphite bg-uz-graphite/20 p-8 md:p-10 space-y-8 sticky top-32"
            >
              <div className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase pb-4 border-b border-uz-graphite">
                [ THE_HEADLINE ]
              </div>

              <div>
                <div className="font-mono text-[10px] text-uz-slate tracking-[0.3em] uppercase mb-2">
                  STANDALONE · SUM OF TRACKS
                </div>
                <div className="font-display text-uz-silver text-[clamp(32px,3.5vw,48px)] tracking-[-0.02em] tabular-nums line-through opacity-50">
                  {offer.anchorPrice}
                </div>
              </div>

              <div className="border-t border-uz-graphite pt-6">
                <div className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase mb-2">
                  SPRINT · THIS OFFER
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-uz-white text-[clamp(64px,8vw,112px)] tracking-[-0.04em] leading-none tabular-nums">
                    {offer.offerPrice}
                  </span>
                  <span className="font-mono text-[10px] text-uz-slate tracking-[0.2em] uppercase">
                    USD · FIXED
                  </span>
                </div>
              </div>

              <div className="border-t border-uz-graphite pt-6 grid grid-cols-2 gap-4">
                <div>
                  <div className="font-mono text-[9px] text-uz-slate tracking-[0.3em] uppercase mb-1">
                    SAVINGS
                  </div>
                  <div className="font-display text-uz-indigo text-[24px] tracking-[-0.02em] tabular-nums">
                    {offer.savings}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[9px] text-uz-slate tracking-[0.3em] uppercase mb-1">
                    DISCOUNT
                  </div>
                  <div className="font-display text-uz-indigo text-[24px] tracking-[-0.02em] tabular-nums">
                    {offer.savingsPercent}%
                  </div>
                </div>
              </div>

              <div className="border-t border-uz-graphite pt-6 space-y-3 text-[13px] text-uz-silver">
                <div className="flex items-baseline gap-2">
                  <span className="w-1 h-1 bg-uz-indigo" />
                  <span>50% on signing · 50% on production deploy</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="w-1 h-1 bg-uz-indigo" />
                  <span>Net-7 on each invoice</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="w-1 h-1 bg-uz-indigo" />
                  <span>Wire, ACH, PayPal</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="w-1 h-1 bg-uz-indigo" />
                  <span>Source files + accounts included</span>
                </div>
              </div>

              <a
                href="mailto:hello.usamazahid@gmail.com?subject=SPECIAL_OFFER · AI_PRODUCT_DESIGN_SPRINT"
                data-cursor="hover"
                data-cursor-text="BOOK"
                onClick={() => posthog.capture('special_offer_call_requested', {
                  offer_number: offer.number,
                  offer_price: offer.offerPrice,
                })}
                className="group flex items-center justify-center gap-3 h-14 w-full bg-uz-indigo text-uz-white font-mono text-[12px] tracking-[0.15em] uppercase overflow-hidden relative magnetic"
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
            </motion.div>
          </div>

          {/* Right: bonus stack */}
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase mb-6 pb-3 border-b border-uz-graphite flex items-center justify-between">
                <span>BONUS_STACK · {String(offer.bonuses.length).padStart(2, '0')}</span>
                <span className="text-uz-slate">VALUE $9K+ · INCLUDED</span>
              </div>

              <ul className="space-y-3">
                {offer.bonuses.map((b, i) => (
                  <motion.li
                    key={b.code}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="border border-uz-graphite p-6 group hover:border-uz-indigo transition-colors duration-500"
                  >
                    <div className="grid grid-cols-12 gap-4 items-start">
                      <div className="col-span-2 md:col-span-1 font-mono text-[10px] text-uz-indigo tracking-[0.2em] uppercase tabular-nums">
                        {b.code}
                      </div>
                      <div className="col-span-10 md:col-span-8 space-y-2">
                        <h4 className="font-display text-uz-white text-[clamp(18px,1.8vw,24px)] tracking-[-0.02em] leading-[1.1] group-hover:text-uz-indigo transition-colors duration-500">
                          {b.title}
                        </h4>
                        <p className="text-uz-silver text-[13px] md:text-[14px] leading-[1.5]">
                          {b.description}
                        </p>
                      </div>
                      <div className="col-span-12 md:col-span-3 md:text-right">
                        <div className="font-mono text-[9px] text-uz-slate tracking-[0.3em] uppercase mb-1">
                          VALUE
                        </div>
                        <div className="font-display text-uz-indigo text-[20px] tracking-[-0.02em] tabular-nums">
                          {b.value}
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 p-6 border border-uz-graphite bg-uz-indigo/5 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="font-mono text-[10px] text-uz-slate tracking-[0.3em] uppercase mb-1">
                    TOTAL_VALUE_OF_STACK
                  </div>
                  <div className="font-display text-uz-white text-[clamp(28px,3vw,40px)] tracking-[-0.02em] tabular-nums">
                    $73K+
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] text-uz-slate tracking-[0.3em] uppercase mb-1">
                    YOUR_PRICE
                  </div>
                  <div className="font-display text-uz-indigo text-[clamp(28px,3vw,40px)] tracking-[-0.02em] tabular-nums">
                    {offer.offerPrice}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
