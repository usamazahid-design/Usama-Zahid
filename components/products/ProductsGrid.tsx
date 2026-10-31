'use client';

import { motion } from 'framer-motion';
import { getFeaturedProduct, getNonFeaturedProducts } from '@/lib/products-data';
import ProductCard from './ProductCard';

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function ProductsGrid() {
  const featured = getFeaturedProduct();
  const rest = getNonFeaturedProducts();

  return (
    <>
      {/* Featured product */}
      {featured && (
        <section
          id="products-featured"
          className="relative w-full bg-uz-black overflow-hidden border-t border-uz-graphite"
          style={{ padding: '120px 0 80px' }}
        >
          <div className="edge-marker tl" style={{ position: 'absolute' }} />
          <div className="edge-marker tr" style={{ position: 'absolute' }} />

          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-uz-indigo" />
                  <span className="font-mono text-[10px] text-uz-slate tracking-[0.3em] uppercase">
                    [ PRODUCTS_01 / THE_FEATURED_DROP ]
                  </span>
                </div>
                <div className="font-mono text-[10px] text-uz-silver tracking-[0.2em] uppercase flex items-center gap-3">
                  <span>FEATURED</span>
                  <span className="w-1 h-1 bg-uz-indigo" />
                  <span className="text-uz-indigo">01 / 05</span>
                </div>
              </div>

              <h2 className="font-display text-uz-white text-[clamp(40px,6vw,88px)] tracking-[-0.04em] max-w-4xl leading-[0.95]">
                This month&rsquo;s
                <br />
                <span className="text-uz-indigo">featured drop.</span>
              </h2>
            </motion.div>

            <ProductCard product={featured} index={0} featured />
          </div>
        </section>
      )}

      {/* Grid */}
      <section
        id="products-grid"
        className="relative w-full bg-uz-black overflow-hidden"
        style={{ padding: '80px 0 160px' }}
      >
        <div className="edge-marker tl" style={{ position: 'absolute' }} />
        <div className="edge-marker tr" style={{ position: 'absolute' }} />
        <div className="edge-marker bl" style={{ position: 'absolute' }} />
        <div className="edge-marker br" style={{ position: 'absolute' }} />

        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-uz-indigo" />
                <span className="font-mono text-[10px] text-uz-slate tracking-[0.3em] uppercase">
                  [ PRODUCTS_02 / THE_CATALOG ]
                </span>
              </div>
              <div className="font-mono text-[10px] text-uz-silver tracking-[0.2em] uppercase flex items-center gap-3">
                <span>{String(rest.length).padStart(2, '0')} PRODUCTS</span>
                <span className="w-1 h-1 bg-uz-indigo" />
                <span>FROM $39</span>
              </div>
            </div>

            <h2 className="font-display text-uz-white text-[clamp(40px,6vw,80px)] tracking-[-0.04em] max-w-4xl leading-[0.95]">
              The full
              <br />
              <span className="text-uz-indigo">catalog.</span>
            </h2>
          </motion.div>

          {/* 2-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-uz-graphite">
            {rest.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i + 1} />
            ))}
          </div>

          {/* Bottom note */}
          <div className="mt-12 flex items-center justify-between flex-wrap gap-4 font-mono text-[10px] text-uz-slate tracking-[0.2em] uppercase">
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-uz-indigo" />
              <span>INSTANT_LICENSE · EMAIL_DELIVERY</span>
            </div>
            <div className="flex items-center gap-2">
              <span>FROM $39 · ALL FORMATS</span>
              <span className="w-1 h-1 bg-uz-indigo" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
