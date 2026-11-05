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
    <section id="blog-list" style={{ paddingTop: '80px' }}>
      <div className="pad wh" style={{ alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.15, marginBottom: '10px' }}>
            {title || "SaaS Brand, Product & Web Engineering Essays"}
          </h1>
          <p style={{ color: 'var(--mute)', maxWidth: '640px', fontSize: '15px', lineHeight: 1.5, marginBottom: '14px' }}>
            {description || "Field notes, teardowns, and tactical guides on building high-trust brand systems, user-centric product UI/UX, and production Next.js websites for fast-moving startups."}
          </p>
          <span className="lab">
            {String(filtered.length).padStart(2, '0')} essays
            {activeService !== 'ALL'
              ? ` · ${activeService.replace(/-/g, ' ')}`
              : ' · filter by service'}
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
  );
}
