'use client';

import { motion } from 'framer-motion';
import type { LegalDocument, LegalSection } from '@/lib/legal-data';
import LegalTOC from './LegalTOC';

const easeOut = [0.16, 1, 0.3, 1] as const;

interface Props {
  document: LegalDocument;
}

export default function LegalBody({ document: doc }: Props) {
  return (
    <article
      id="legal-body"
      className="relative w-full"
      style={{ padding: '80px 0 120px' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* TOC sidebar, 4 cols on lg+ */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <LegalTOC document={doc} />
          </aside>

          {/* Body, 8 cols on lg+ */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-20">
            {doc.sections.map((section, i) => (
              <LegalSectionBlock key={section.id} section={section} index={i} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function LegalSectionBlock({
  section,
  index,
}: {
  section: LegalSection;
  index: number;
}) {
  return (
    <motion.section
      id={section.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: Math.min(index, 5) * 0.04 }}
      className="scroll-mt-32"
    >
      {/* Section header */}
      <div className="flex items-baseline gap-4 mb-6 pb-4 border-b border-uz-graphite">
        <span className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase tabular-nums">
          [ {section.number} ]
        </span>
        <h2 className="font-display text-uz-white text-[clamp(28px,3.5vw,48px)] tracking-[-0.03em] leading-[1.05]">
          {section.title}
        </h2>
        <a
          href={`#${section.id}`}
          data-cursor="hover"
          aria-label={`Anchor to ${section.title}`}
          className="ml-auto font-mono text-[10px] text-uz-slate hover:text-uz-indigo tracking-[0.2em] uppercase transition-colors"
        >
          #
        </a>
      </div>

      {/* Body paragraphs */}
      <div className="space-y-4 mb-6">
        {section.body.map((p, i) => (
          <p
            key={i}
            className="text-uz-silver text-[15px] md:text-[16px] leading-[1.7] max-w-3xl"
          >
            {p}
          </p>
        ))}
      </div>

      {/* List */}
      {section.list && section.list.length > 0 && (
        <ul className="space-y-3 mb-6 pl-1">
          {section.list.map((item, i) => (
            <li
              key={i}
              className="grid grid-cols-12 gap-3 items-baseline"
            >
              <span className="col-span-1 font-mono text-[10px] text-uz-indigo tabular-nums tracking-[0.2em] uppercase">
                0{i + 1}
              </span>
              <span className="col-span-11 text-uz-white text-[14px] md:text-[15px] leading-[1.6]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Footnote */}
      {section.footnote && (
        <div className="mt-6 p-4 border-l-2 border-uz-indigo bg-uz-indigo/5">
          <div className="font-mono text-[9px] text-uz-indigo tracking-[0.3em] uppercase mb-2">
            [ NOTE ]
          </div>
          <p className="text-uz-silver text-[13px] md:text-[14px] leading-[1.6]">
            {section.footnote}
          </p>
        </div>
      )}
    </motion.section>
  );
}
