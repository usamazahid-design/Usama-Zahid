'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost, BlogService, allServices } from '@/lib/blog-data';
import { formatDate } from '@/lib/blog-utils';

interface BlogIndexExactProps {
  featured: BlogPost;
  posts: BlogPost[];
  title?: string;
  description?: string;
}

const PAGE_SIZE = 6;

export default function BlogIndexExact({ featured, posts, title, description }: BlogIndexExactProps) {
  const [activeService, setActiveService] = useState<BlogService | 'ALL'>('ALL');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const all = useMemo(
    () => [featured, ...posts.filter((p) => p.slug !== featured.slug)],
    [featured, posts]
  );

  const filtered = useMemo(() => {
    if (activeService === 'ALL') return all;
    return all.filter((p) => p.service === activeService);
  }, [activeService, all]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeService]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <>
      <section className="hero pad blog-hero" style={{ paddingTop: '110px', paddingBottom: 'clamp(40px, 5vw, 72px)' }}>
        <div className="fo">
          <span>Usama Zahid · Writing</span>
          <span className="hero-avail">
            <i className="hero-avail-dot" aria-hidden="true" />
            {String(all.length).padStart(2, '0')} essays · Field notes &amp; teardowns
          </span>
          <span>usamazahid.design</span>
        </div>

        <div className="hg">
          <div className="ht">
            <h1>
              {title ? (
                <span className="ln">
                  <span style={{ '--d': '.05s' } as React.CSSProperties}>{title}</span>
                </span>
              ) : (
                <>
                  <span className="ln">
                    <span style={{ '--d': '.05s' } as React.CSSProperties}>Design,</span>
                  </span>
                  <span className="ln">
                    <span style={{ '--d': '.15s' } as React.CSSProperties}>Systems &amp;</span>
                  </span>
                  <span className="ln it2">
                    <span style={{ '--d': '.25s' } as React.CSSProperties}>Shipping.</span>
                  </span>
                </>
              )}
            </h1>
            <p className="sub">
              {description ||
                'Field notes, UX teardowns, and tactical guides on brand systems, product UI/UX, and production Next.js engineering.'}
            </p>
            <div className="hero-actions">
              <Link
                className="btn"
                href={`/blog/${featured.service}/${featured.slug}/`}
                data-cur="Read"
              >
                Read featured essay <span aria-hidden="true">&rarr;</span>
              </Link>
              <a className="btn btn-ghost" href="#blog-list" data-cur="Browse">
                Browse all essays <span aria-hidden="true">&darr;</span>
              </a>
            </div>
          </div>

          <div className="hl in">
            <Link
              href={`/blog/${featured.service}/${featured.slug}/`}
              className="stg blog-feat-stage"
              data-cur="Read"
            >
              <div className="stg-t">
                <span className="nf-stage-title">Featured Essay</span>
                <span className="stg-p">{featured.readingTime} min read</span>
              </div>
              <div className="blog-feat-media">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                  className="blog-card-img"
                  unoptimized
                />
              </div>
              <div className="blog-feat-body">
                <span className="lab">
                  {featured.category.replace(/_/g, ' ')} · {formatDate(featured.date)}
                </span>
                <h3>{featured.title}</h3>
                <p>{featured.excerpt}</p>
              </div>
              <div className="stg-b">
                <span>Read full essay</span>
                <span aria-hidden="true">→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section id="blog-list" style={{ paddingTop: 'clamp(36px, 5vw, 64px)' }}>
        <div className="pad wh">
          <div>
            <h2>All essays</h2>
            <span className="lab">
              {String(filtered.length).padStart(2, '0')} essays
              {activeService !== 'ALL'
                ? ` · ${activeService.replace(/-/g, ' ')}`
                : ' · filter by discipline'}
            </span>
          </div>
          <Link className="see-all-link" href="/contact/" data-cur="Contact">
            Start a project <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

      <div className="pad pf-filters">
        <div className="t-pills" role="tablist" aria-label="Filter by service">
          {allServices.map((service) => {
            const label = service.value === 'ALL' ? 'All' : service.label;
            const on = activeService === service.value;
            return (
              <button
                key={service.value}
                type="button"
                role="tab"
                aria-selected={on}
                className={`t-pill${on ? ' on' : ''}`}
                onClick={() => setActiveService(service.value)}
                data-cur={label}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pad">
        {filtered.length > 0 ? (
          <>
            <div className="blog-grid">
              {filtered.map((post, idx) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.service}/${post.slug}/`}
                  className="blog-card"
                  data-cur="Read"
                  style={idx >= visibleCount ? { display: 'none' } : undefined}
                >
                  <div className="blog-card-media">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      className="blog-card-img"
                      unoptimized
                    />
                    <span className="blog-card-cat">{post.category.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span>{formatDate(post.date)}</span>
                      <span>{post.readingTime} min</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="blog-card-cta">
                      Read essay <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {hasMore ? (
              <div className="blog-load">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                  data-cur="More"
                >
                  Load more <span aria-hidden="true">&rarr;</span>
                </button>
                <span className="lab">
                  Showing {visible.length} of {filtered.length}
                </span>
              </div>
            ) : (
              <div className="blog-load">
                <span className="lab">
                  Showing all {filtered.length} essays
                  {activeService !== 'ALL' ? ` in ${activeService.replace(/-/g, ' ')}` : ''}
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="pf-empty">
            <p className="ser">No essays in this category yet.</p>
          </div>
        )}
      </div>
    </section>
    </>
  );
}
