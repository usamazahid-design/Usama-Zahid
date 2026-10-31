'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BlogBlock } from '@/lib/blog-data';
import { slugifyHeading } from '@/lib/blog-utils';
import { highlightCodeNodes, parseRichText } from '@/lib/rich-text';

interface PostBodyProps {
  blocks: BlogBlock[];
}

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function PostBody({ blocks }: PostBodyProps) {
  return (
    <article className="space-y-8 md:space-y-10">
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} index={i} />
      ))}
    </article>
  );
}

function BlockRenderer({ block, index }: { block: BlogBlock; index: number }) {
  switch (block.type) {
    case 'p':
      return <Paragraph text={block.text} drop={block.drop} index={index} />;
    case 'h2':
      return <Heading level={2} text={block.text} id={block.id || slugifyHeading(block.text)} index={index} />;
    case 'h3':
      return <Heading level={3} text={block.text} id={block.id || slugifyHeading(block.text)} index={index} />;
    case 'ul':
      return <UnorderedList items={block.items} index={index} />;
    case 'ol':
      return <OrderedList items={block.items} index={index} />;
    case 'quote':
      return <PullQuote text={block.text} cite={block.cite} index={index} />;
    case 'code':
      return <CodeBlock code={block.code} language={block.language} filename={block.filename} index={index} />;
    case 'image':
      return <Figure src={block.src} alt={block.alt} caption={block.caption} index={index} />;
    case 'callout':
      return <Callout variant={block.variant} text={block.text} index={index} />;
    case 'table':
      return <DataTable headers={block.headers} rows={block.rows} index={index} />;
    case 'divider':
      return <Divider />;
    default:
      return null;
  }
}

function Paragraph({ text, drop, index }: { text: string; drop?: boolean; index: number }) {
  return (
    <motion.p
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.05, ease: easeOut }}
      className={`text-uz-silver text-[16px] md:text-[18px] leading-[1.8] ${
        drop ? 'first-letter:font-display first-letter:text-[clamp(56px,7vw,88px)] first-letter:float-left first-letter:mr-4 first-letter:mt-1 first-letter:leading-[0.85] first-letter:text-uz-white first-letter:tracking-[-0.04em]' : ''
      }`}
    >
      {parseRichText(text)}
    </motion.p>
  );
}

function Heading({ level, text, id, index }: { level: 2 | 3; text: string; id: string; index: number }) {
  const Tag = level === 2 ? 'h2' : 'h3';
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: easeOut }}
      id={id}
      className={level === 2 ? 'pt-12 md:pt-16 scroll-mt-32' : 'pt-6 scroll-mt-32'}
    >
      <div className="flex items-center gap-3 mb-4 font-mono text-[10px] tracking-[0.3em] uppercase">
        <span className="text-uz-indigo tabular-nums">
          [ H_{String(index).padStart(2, '0')} ]
        </span>
        <span className="text-uz-slate">·</span>
        <a
          href={`#${id}`}
          className="text-uz-slate hover:text-uz-indigo transition-colors"
        >
          #anchor
        </a>
      </div>
      <Tag
        className={`font-display text-uz-white tracking-[-0.04em] leading-[1.05] ${
          level === 2
            ? 'text-[clamp(36px,4.5vw,56px)]'
            : 'text-[clamp(24px,3vw,36px)]'
        }`}
      >
        {text}
      </Tag>
    </motion.div>
  );
}

function UnorderedList({ items, index }: { items: string[]; index: number }) {
  return (
    <motion.ul
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.05, ease: easeOut }}
      className="space-y-3 pl-0 list-none"
    >
      {items.map((item, i) => (
        <li key={i} className="flex items-baseline gap-4 text-uz-silver text-[16px] leading-[1.7]">
          <span className="font-mono text-[10px] text-uz-indigo tabular-nums flex-shrink-0 mt-1">
            0{i + 1}
          </span>
          <span>{parseRichText(item)}</span>
        </li>
      ))}
    </motion.ul>
  );
}

function OrderedList({ items, index }: { items: string[]; index: number }) {
  return (
    <motion.ol
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.05, ease: easeOut }}
      className="space-y-3 pl-0 list-none"
    >
      {items.map((item, i) => (
        <li key={i} className="flex items-baseline gap-4 text-uz-silver text-[16px] leading-[1.7]">
          <span className="font-mono text-[12px] text-uz-indigo tabular-nums flex-shrink-0">
            {String(i + 1).padStart(2, '0')}.
          </span>
          <span>{parseRichText(item)}</span>
        </li>
      ))}
    </motion.ol>
  );
}

function PullQuote({ text, cite, index }: { text: string; cite?: string; index: number }) {
  return (
    <motion.blockquote
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: easeOut }}
      className="relative my-12 md:my-16 pl-6 md:pl-10 border-l-2 border-uz-indigo"
    >
      <span className="absolute -top-3 -left-3 font-display text-uz-indigo text-[48px] leading-none select-none">
        &ldquo;
      </span>
      <p className="font-display text-uz-white text-[clamp(24px,3vw,40px)] tracking-[-0.03em] leading-[1.2] mb-4">
        {parseRichText(text)}
      </p>
      {cite && (
        <cite className="not-italic font-mono text-[11px] text-uz-slate tracking-[0.2em] uppercase block">
         , {cite}
        </cite>
      )}
    </motion.blockquote>
  );
}

function CodeBlock({ code, language, filename, index }: { code: string; language: string; filename?: string; index: number }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="border border-uz-graphite my-10"
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-uz-graphite bg-uz-graphite/30">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase">
          <span className="text-uz-indigo">[{language}]</span>
          {filename && (
            <>
              <span className="text-uz-slate">·</span>
              <span className="text-uz-silver">{filename}</span>
            </>
          )}
        </div>
        <button
          onClick={handleCopy}
          data-cursor="hover"
          className="font-mono text-[10px] text-uz-slate hover:text-uz-indigo tracking-[0.2em] uppercase transition-colors"
        >
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>
      <pre className="p-5 overflow-x-auto bg-uz-black">
        <code className="font-mono text-[12px] md:text-[13px] text-uz-silver leading-[1.7] whitespace-pre">
          {highlightCodeNodes(code)}
        </code>
      </pre>
    </motion.div>
  );
}

function Figure({ src, alt, caption, index }: { src: string; alt: string; caption?: string; index: number }) {
  return (
    <motion.figure
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: easeOut }}
      className="my-12 md:my-16 group"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden border border-uz-graphite bg-uz-graphite">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 768px"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          unoptimized
        />
      </div>
      {caption && (
        <figcaption className="mt-4 flex items-baseline gap-3">
          <span className="mt-[2px] font-mono text-[11px] text-uz-indigo">→</span>
          <span className="text-uz-slate text-[13px] leading-[1.6]">
            {parseRichText(caption)}
          </span>
        </figcaption>
      )}
    </motion.figure>
  );
}

function Callout({ variant, text, index }: { variant: 'note' | 'warning' | 'success'; text: string; index: number }) {
  const styles = {
    note: {
      border: 'border-uz-indigo',
      label: 'NOTE',
      bg: 'rgba(75, 63, 255, 0.04)',
    },
    warning: {
      border: 'border-yellow-500',
      label: 'WARNING',
      bg: 'rgba(234, 179, 8, 0.04)',
    },
    success: {
      border: 'border-green-500',
      label: 'CONFIRMED',
      bg: 'rgba(34, 197, 94, 0.04)',
    },
  };

  const s = styles[variant];

  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: easeOut }}
      className={`border-l-2 ${s.border} p-5 md:p-6 my-8`}
      style={{ background: s.bg }}
    >
      <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-3 text-uz-indigo">
        [ {s.label} ]
      </div>
      <p className="text-uz-white text-[16px] md:text-[17px] leading-[1.7]">
        {parseRichText(text)}
      </p>
    </motion.div>
  );
}

function DataTable({ headers, rows, index }: { headers: string[]; rows: string[][]; index: number }) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: easeOut }}
      className="my-10 border border-uz-graphite overflow-x-auto"
    >
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 font-mono text-[10px] text-uz-indigo tracking-[0.2em] uppercase border-b border-uz-graphite"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="odd:bg-uz-black even:bg-uz-graphite/20">
              {row.map((cell, c) => (
                <td
                  key={c}
                  className="px-4 py-3 text-uz-silver text-[14px] leading-[1.6] align-top border-b border-uz-graphite/60 last:border-b-0"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

function Divider() {
  return (
    <motion.div
      initial={false}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: easeOut }}
      className="my-12 md:my-16 flex items-center justify-center gap-4"
    >
      <div className="h-[1px] w-16 bg-uz-graphite" />
      <div className="w-1.5 h-1.5 bg-uz-indigo" />
      <div className="h-[1px] w-16 bg-uz-graphite" />
    </motion.div>
  );
}
