'use client';

import { motion } from 'framer-motion';
import type { Product } from '@/lib/products-data';
import ProductVisual from './ProductVisual';

const easeOut = [0.16, 1, 0.3, 1] as const;

interface Props {
  product: Product;
  index: number;
  featured?: boolean;
}

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  available: { label: 'AVAILABLE', color: 'text-uz-silver' },
  new: { label: 'NEW_DROP', color: 'text-uz-indigo' },
  bestseller: { label: 'BESTSELLER', color: 'text-uz-indigo' },
  limited: { label: 'LIMITED', color: 'text-uz-white' },
};

export default function ProductCard({ product, index, featured = false }: Props) {
  const status = STATUS_LABEL[product.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: easeOut }}
      className={`group bg-uz-black border border-uz-graphite hover:border-uz-indigo transition-colors duration-500 flex flex-col ${
        featured ? 'md:flex-row' : ''
      }`}
      data-cursor="hover"
      data-cursor-text="OPEN"
    >
      {/* Preview */}
      <div
        className={`bg-uz-graphite/40 border-b border-uz-graphite group-hover:border-uz-indigo transition-colors duration-500 overflow-hidden relative ${
          featured ? 'md:w-3/5 md:border-b-0 md:border-r' : ''
        }`}
        style={{ aspectRatio: featured ? 'auto' : '4/3' }}
      >
        <ProductVisual product={product} />
        {/* Status badge */}
        <div className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.3em] uppercase flex items-center gap-2 bg-uz-black/80 px-2 py-1">
          <span className="w-1 h-1 bg-uz-indigo" />
          <span className={status.color}>{status.label}</span>
        </div>
        <div className="absolute top-4 right-4 font-mono text-[9px] text-uz-silver tracking-[0.2em] uppercase">
          FIG.0{index + 1}
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 md:p-8 flex flex-col flex-1 ${featured ? 'md:w-2/5' : ''}`}>
        {/* Top: number + code */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase">
            [ {product.code} ]
          </span>
          <span className="font-mono text-[9px] text-uz-slate tracking-[0.2em] uppercase">
            {product.typeLabel}
          </span>
        </div>

        {/* Name */}
        <h3
          className={`font-display text-uz-white tracking-[-0.03em] leading-[0.95] mb-3 group-hover:text-uz-indigo transition-colors duration-500 ${
            featured ? 'text-[clamp(32px,3.5vw,48px)]' : 'text-[clamp(24px,2.4vw,32px)]'
          }`}
        >
          {product.name}
        </h3>

        {/* Tagline */}
        <p className="text-uz-white text-[14px] md:text-[15px] leading-[1.5] mb-3 font-medium">
          {product.tagline}
        </p>

        {/* Description (only featured) */}
        {featured && (
          <p className="text-uz-silver text-[14px] leading-[1.65] mb-5">
            {product.description}
          </p>
        )}

        {/* Bullets (only featured) */}
        {featured && (
          <ul className="space-y-2 mb-6 flex-1">
            {product.bullets.slice(0, 4).map((b) => (
              <li key={b} className="flex items-baseline gap-2 text-[13px] text-uz-silver">
                <span className="w-1 h-1 bg-uz-indigo flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Price + CTA */}
        <div className="mt-auto pt-4 border-t border-uz-graphite flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            {product.compareAt && (
              <span className="font-mono text-[12px] text-uz-silver line-through tabular-nums">
                {product.compareAt}
              </span>
            )}
            <span className="font-display text-uz-indigo text-[clamp(20px,2vw,28px)] tracking-[-0.02em] tabular-nums">
              {product.price}
            </span>
          </div>
          <a
            href={`mailto:hello.usamazahid@gmail.com?subject=PRODUCT_LICENSE · ${product.slug}`}
            className="group/btn inline-flex items-center gap-2 font-mono text-[10px] text-uz-white group-hover:text-uz-indigo tracking-[0.2em] uppercase transition-colors"
          >
            <span className="border-b border-uz-white group-hover:border-uz-indigo">GET_IT</span>
            <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>

      {/* Corner ticks on hover */}
      <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-uz-indigo opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-uz-indigo opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-uz-indigo opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-uz-indigo opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
