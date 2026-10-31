'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cv } from '@/lib/cv-data';
import CVSectionHeading from '@/components/cv/CVSectionHeading';

const easeOut = [0.16, 1, 0.3, 1] as const;

const sequence = [
  {
    code: '01',
    phase: 'RESEARCH',
    verb: 'Understand',
    detail: 'User interviews, usability testing, journey mapping. 200+ interviews on Petrozen ERP alone.',
  },
  {
    code: '02',
    phase: 'WIREFRAME',
    verb: 'Structure',
    detail: 'Information architecture, flows, and low-fi screens before a single pixel gets polished.',
  },
  {
    code: '03',
    phase: 'PROTOTYPE',
    verb: 'Validate',
    detail: 'Hi-fi prototypes, motion specs, and iterative fixes from live user feedback.',
  },
  {
    code: '04',
    phase: 'SYSTEM',
    verb: 'Scale',
    detail: 'Figma libraries, tokens, and guidelines, reduced new screen time by ~40% at Vieapps.',
  },
  {
    code: '05',
    phase: 'HANDOFF',
    verb: 'Ship',
    detail: 'Pixel-accurate dev partnership. Next.js builds when the project needs a URL, not just a file.',
  },
] as const;

export default function CVSequence() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="cv-sequence"
      className="relative w-full bg-uz-black border-t border-uz-graphite overflow-hidden"
      style={{ padding: '120px 0' }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(75,63,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(75,63,255,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="edge-marker tl" style={{ position: 'absolute' }} />
      <div className="edge-marker tr" style={{ position: 'absolute' }} />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <CVSectionHeading
            number="04"
            kicker="[ CV_04 / THE_SEQUENCE ]"
            title={
              <>
                One designer.
                <br />
                <span className="text-uz-indigo">One design process.</span>
              </>
            }
            subtitle={
              <>
                Research through handoff, the same sequence I run on ERP platforms, rental apps,
                brand systems, and marketing sites. Documented at every step.
              </>
            }
            className="mb-0"
          />
        </motion.div>

        {/* Pipeline, desktop horizontal, mobile vertical */}
        <div className="relative mb-16">
          <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-px bg-uz-graphite">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.4, ease: easeOut }}
              className="h-full bg-uz-indigo origin-left"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-px lg:gap-4 bg-uz-graphite lg:bg-transparent">
            {sequence.map((step, i) => {
              const isActive = active === i;
              return (
                <motion.button
                  key={step.phase}
                  type="button"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: easeOut }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  data-cursor="hover"
                  className={`group relative text-left bg-uz-black p-6 md:p-7 border transition-all duration-500 ${
                    isActive ? 'border-uz-indigo' : 'border-uz-graphite hover:border-uz-indigo/50'
                  }`}
                  style={{ borderRadius: 0 }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase">
                      [ {step.code} ]
                    </span>
                    <span
                      className={`w-2 h-2 transition-colors duration-300 ${
                        isActive ? 'bg-uz-indigo pulse-square' : 'bg-uz-graphite'
                      }`}
                    />
                  </div>

                  <div className="font-mono text-[9px] text-uz-slate tracking-[0.25em] uppercase mb-2">
                    PHASE_{String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-display text-uz-white text-[clamp(22px,2.2vw,28px)] tracking-[-0.03em] leading-none mb-1 group-hover:text-uz-indigo transition-colors duration-300">
                    {step.phase}
                  </h3>
                  <div className="font-mono text-[11px] text-uz-indigo tracking-[0.2em] uppercase mb-4">
                    → {step.verb}
                  </div>

                  <p
                    className={`text-[13px] leading-[1.6] transition-colors duration-300 ${
                      isActive ? 'text-uz-white' : 'text-uz-silver'
                    }`}
                  >
                    {step.detail}
                  </p>

                  <div className="mt-5 pt-4 border-t border-uz-graphite">
                    <span className="font-mono text-[9px] text-uz-slate tracking-[0.2em] uppercase">
                      Human-led decision gate
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Active phase readout */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: easeOut }}
          className="mb-16 p-6 md:p-8 border border-uz-graphite bg-uz-black/80 backdrop-blur-sm"
        >
          <div className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase mb-3">
            [ LIVE_READOUT · {sequence[active].phase} ]
          </div>
          <p className="font-display text-uz-white text-[clamp(20px,2.5vw,32px)] tracking-[-0.03em] leading-[1.15] max-w-3xl">
            {sequence[active].detail}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border border-uz-graphite bg-uz-black p-6 md:p-8"
        >
          <p className="font-mono text-[10px] text-uz-slate tracking-[0.3em] uppercase mb-4">
            [ EXECUTION_NOTE ]
          </p>
          <p className="text-uz-silver text-[15px] leading-[1.7] max-w-4xl">
            This sequence is shown as an operating framework rather than a benchmark chart. Performance deltas are intentionally
            omitted until each project has independently documented measurement definitions and source logs.
          </p>
        </motion.div>

        {/* Footer strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-8 border-t border-uz-graphite"
        >
          <p className="text-uz-silver text-[15px] leading-[1.6] max-w-xl">
            Cross-market delivery across Pakistan, Qatar, UAE, and Australia.
            {' '}Physics-trained. Design-led. Dev-capable when the project needs a URL.
          </p>
          <a
            href={cv.pdfUrl}
            download={cv.pdfLabel}
            data-cursor="hover"
            data-cursor-text="DL"
            className="group inline-flex items-center gap-3 h-11 px-5 border border-uz-indigo text-uz-white font-mono text-[11px] tracking-[0.15em] uppercase hover:bg-uz-indigo transition-colors duration-300 shrink-0"
            style={{ borderRadius: 0 }}
          >
            <span>Download CV PDF</span>
            <span className="inline-block group-hover:translate-y-0.5 transition-transform duration-300">↓</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
