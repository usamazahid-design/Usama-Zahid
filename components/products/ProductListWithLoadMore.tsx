'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import ProductVisual from '@/components/products/ProductVisual';
import type { Product } from '@/lib/products-data';

interface ProductListWithLoadMoreProps {
  products: Product[];
}

const INITIAL_COUNT = 6;
const LOAD_STEP = 6;

export default function ProductListWithLoadMore({ products }: ProductListWithLoadMoreProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visibleProducts = useMemo(
    () => products.slice(0, visibleCount),
    [products, visibleCount],
  );

  const hasMore = visibleCount < products.length;
  const canLoad = products.length > INITIAL_COUNT && hasMore;

  return (
    <>
      <div className="blog-grid">
        {visibleProducts.map((product) => {
          const href =
            product.slug === 'brand-kit-generator'
              ? '/brand-kit/'
              : `/products/${product.slug}/`;
          return (
          <Link
            key={product.slug}
            href={href}
            className="blog-card"
            data-cur="Product"
          >
            <div className="blog-card-media">
              <ProductVisual product={product} className="w-full h-full" />
              <span className="blog-card-cat">{product.typeLabel}</span>
            </div>
            <div className="blog-card-body">
              <div className="blog-card-meta">
                <span>{product.code}</span>
                <span>{product.status.toUpperCase()}</span>
              </div>
              <h3>{product.name}</h3>
              <p>{product.tagline}</p>
              <span className="blog-card-cta">
                {product.slug === 'brand-kit-generator' ? 'Launch free web tool' : 'View details & get free access'}{' '}
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
          );
        })}
      </div>

      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
        <button
          type="button"
          className="btn"
          disabled={!canLoad}
          aria-disabled={!canLoad}
          onClick={() => setVisibleCount((count) => Math.min(count + LOAD_STEP, products.length))}
          style={!canLoad ? { opacity: 0.55, cursor: 'not-allowed' } : undefined}
        >
          {hasMore ? 'Load more products' : 'All products loaded'}
        </button>
      </div>
    </>
  );
}
