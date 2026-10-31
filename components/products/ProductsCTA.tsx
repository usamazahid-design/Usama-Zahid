'use client';

import { motion } from 'framer-motion';
import Marquee from '../Marquee';

const easeOut = [0.16, 1, 0.3, 1] as const;

const ctaMarqueeItems = [
  'INSTANT LICENSE',
  'EMAIL DELIVERY',
  'NO MIDDLEMEN',
  'INSTANT LICENSE',
  'EMAIL DELIVERY',
  'NO MIDDLEMEN',
  'INSTANT LICENSE',
  'EMAIL DELIVERY',
];

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-mono text-[10px] text-uz-white/60 tracking-[0.2em] uppercase">
        {label}
      </span>
      <span className="font-mono text-[12px] text-uz-white tracking-[0.05em] tabular-nums">
        {value}
      </span>
    </div>
  );
}

export default function ProductsCTA() {
  return (
    <section
      id="products-cta"
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
              [ PRODUCTS_03 / THE_FINAL_CUE ]
            </span>
          </div>
          <div className="font-mono text-[10px] text-uz-black/60 tracking-[0.2em] uppercase flex items-center gap-3">
            <span>EMAIL_DELIVERY · INSTANT</span>
            <span className="w-1.5 h-1.5 bg-uz-black pulse-square" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.0, ease: easeOut }}
              className="font-display text-uz-white text-[clamp(56px,9vw,144px)] leading-[0.92] tracking-[-0.045em] mb-8"
            >
              License
              <br />
              today.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-uz-white/80 text-[18px] md:text-[20px] leading-[1.5] max-w-xl mb-12"
            >
              Email the order.
              <br />
              Receive the file in minutes.
              <br />
              <span className="text-uz-white">Ship by Friday.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <a
                href="mailto:hello.usamazahid@gmail.com?subject=PRODUCT_ORDER · CATALOG"
                data-cursor="hover"
                data-cursor-text="ORDER"
                className="group relative flex items-center gap-3 h-14 px-8 bg-uz-black text-uz-white font-mono text-[12px] tracking-[0.15em] uppercase border border-uz-black overflow-hidden magnetic"
                style={{ borderRadius: 0, transition: 'color 300ms ease' }}
              >
                <span className="relative z-10 group-hover:text-uz-black transition-colors duration-500">
                  Order a product
                </span>
                <span className="relative z-10 group-hover:text-uz-black transition-colors duration-500 inline-block group-hover:translate-x-1">
                  →
                </span>
                <span
                  className="absolute inset-0 bg-uz-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
              </a>

              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-uz-black/60 tracking-[0.2em] uppercase mb-1">
                  OR REACH DIRECTLY
                </span>
                <a
                  href="mailto:hello.usamazahid@gmail.com"
                  className="font-mono text-[13px] text-uz-black tracking-[0.1em] hover:underline"
                >
hello.usamazahid@gmail.com
                </a>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-mono text-[11px] text-uz-white/50 tracking-[0.15em] uppercase mt-8"
            >
              New drops every quarter. Operators get a 25% repeat-customer discount.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-4 border border-uz-white/30 p-6"
            style={{ background: 'rgba(4,4,4,0.18)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="font-mono text-[10px] text-uz-white/70 tracking-[0.3em] uppercase">
                [ DELIVERY_STATE ]
              </div>
              <span className="w-1.5 h-1.5 bg-uz-white pulse-square-soft" />
            </div>

            <div className="space-y-4">
              <StatusRow label="ORDER_CHANNEL" value="EMAIL" />
              <div className="h-[1px] bg-uz-white/15" />
              <StatusRow label="DELIVERY_TIME" value="< 30 MIN" />
              <div className="h-[1px] bg-uz-white/15" />
              <StatusRow label="FILE_FORMATS" value="05 TYPES" />
              <div className="h-[1px] bg-uz-white/15" />
              <StatusRow label="LICENSE_TERM" value="PERPETUAL" />
            </div>

            <div className="mt-6 pt-6 border-t border-uz-white/15 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-uz-white" />
              <span className="font-mono text-[10px] text-uz-white tracking-[0.2em] uppercase">
                OPERATIONAL · ACCEPTING_ORDERS
              </span>
            </div>

            <div className="mt-6 space-y-2">
              <div className="font-mono text-[9px] text-uz-white/60 tracking-[0.2em] uppercase">
                CATALOG_SIZE
              </div>
              <div className="font-mono text-[11px] text-uz-white tracking-[0.05em]">
                [█████████░] 90% UTILIZED
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
            {ctaMarqueeItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-6 whitespace-nowrap"
              >
                <span className="font-display text-uz-white text-[clamp(28px,4vw,48px)] tracking-[-0.03em]">
                  {item}
                </span>
                <span className="text-uz-white/60 text-2xl">●</span>
              </div>
            ))}
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
}
