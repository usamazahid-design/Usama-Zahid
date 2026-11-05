'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/blog-data';
import { formatDate, getRelatedPosts } from '@/lib/blog-utils';

interface PostFooterProps {
  post: BlogPost;
}

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function PostFooter({ post }: PostFooterProps) {
  const related = getRelatedPosts(post.slug, 3);

  return (
    <>
      {/* Author bio + share */}
      <section
        id="post-author"
        className="relative w-full bg-uz-black border-t border-uz-graphite"
        style={{ padding: '100px 0' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
          >
            <div className="md:col-span-8">
              <div className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase mb-4">
                [ THE_OPERATOR ]
              </div>
              <h3 className="font-display text-uz-white text-[clamp(32px,4vw,48px)] tracking-[-0.04em] leading-[0.95] mb-6">
                Usama Zahid.
              </h3>
              <p className="text-uz-silver text-[15px] md:text-[16px] leading-[1.7] max-w-2xl mb-8">
                Twenty-eight. Lahore. One operator. I run strategy, identity, product, and code as a single continuous sequence. B.Sc. Physics, COMSATS University Islamabad, Lahore Campus. Working since 2019. Available for 2 new projects this quarter.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-uz-graphite mb-8">
                <BioStat label="BASED" value="LAHORE · PK" />
                <BioStat label="TEAM" value="ONE" />
                <BioStat label="OPERATING" value="SINCE_2019" />
                <BioStat label="NEXT_SLOT" value="Q3_2026" />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/about"
                  data-cursor="hover"
                  className="group inline-flex items-center gap-3 h-11 px-5 bg-uz-white text-uz-black font-mono text-[11px] tracking-[0.15em] uppercase magnetic overflow-hidden relative"
                  style={{ borderRadius: 0, transition: 'color 300ms ease' }}
                >
                  <span className="relative z-10 group-hover:text-uz-white transition-colors duration-500">
                    Read the full bio
                  </span>
                  <span className="relative z-10 group-hover:text-uz-white transition-colors duration-500 inline-block group-hover:translate-x-1">
                    →
                  </span>
                  <span
                    className="absolute inset-0 bg-uz-indigo -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                  />
                </Link>
                <a
                  href="mailto:hello.usamazahid@gmail.com"
                  data-cursor="hover"
                  className="inline-flex items-center gap-3 h-11 px-5 border border-uz-graphite hover:border-uz-indigo text-uz-white font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-300"
                  style={{ borderRadius: 0 }}
                >
                  Start a project
                </a>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-5 font-mono text-[10px] text-uz-slate tracking-[0.2em] uppercase">
                <Link href="/services" className="hover:text-uz-indigo transition-colors border-b border-uz-graphite hover:border-uz-indigo">
                  EXPLORE_SERVICES →
                </Link>
                <Link href="/brand-to-url" className="hover:text-uz-indigo transition-colors border-b border-uz-graphite hover:border-uz-indigo">
                  BRAND_TO_URL_SPRINT →
                </Link>
              </div>
            </div>

            {/* Share */}
            <div className="md:col-span-4">
              <div className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase mb-4">
                [ SHARE ]
              </div>
              <div className="space-y-2">
                <ShareLink
                  label="TWITTER"
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://usamazahid.design/blog/${post.service}/${post.slug}/`)}`}
                />
                <ShareLink
                  label="LINKEDIN"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://usamazahid.design/blog/${post.service}/${post.slug}/`)}`}
                />
                <ShareLink
                  label="COPY_LINK"
                  href={`/blog/${post.service}/${post.slug}/`}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section
          id="post-related"
          className="relative w-full bg-uz-black border-t border-uz-graphite"
          style={{ padding: '100px 0 160px' }}
        >
          <div className="edge-marker tl" style={{ position: 'absolute' }} />
          <div className="edge-marker tr" style={{ position: 'absolute' }} />

          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-uz-indigo" />
                  <span className="font-mono text-[10px] text-uz-slate tracking-[0.3em] uppercase">
                    [ READ_NEXT · {String(related.length).padStart(2, '0')} ]
                  </span>
                </div>
                <Link
                  href="/blog"
                  className="font-mono text-[10px] text-uz-slate hover:text-uz-indigo tracking-[0.2em] uppercase transition-colors"
                >
                  ALL_POSTS →
                </Link>
              </div>

              <h2 className="font-display text-uz-white text-[clamp(40px,6vw,72px)] tracking-[-0.04em] leading-[0.95]">
                Continue
                <br />
                <span className="text-uz-indigo">the log.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-uz-graphite">
              {related.map((rel, i) => (
                <RelatedCard key={rel.slug} post={rel} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function BioStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-uz-black p-4">
      <div className="font-mono text-[9px] text-uz-slate tracking-[0.3em] uppercase mb-2">
        {label}
      </div>
      <div className="font-mono text-[12px] text-uz-white tracking-[0.05em]">
        {value}
      </div>
    </div>
  );
}

function ShareLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      data-cursor="hover"
      className="group flex items-center justify-between gap-3 px-3 h-11 border border-uz-graphite hover:border-uz-indigo transition-colors duration-300"
      style={{ borderRadius: 0 }}
    >
      <span className="font-mono text-[10px] text-uz-slate group-hover:text-uz-indigo tracking-[0.2em] uppercase transition-colors">
        [{label}]
      </span>
      <span className="font-mono text-uz-slate group-hover:text-uz-white transition-colors">
        →
      </span>
    </a>
  );
}

function RelatedCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: easeOut }}
      className="group relative bg-uz-black p-8 md:p-10 min-h-[420px] flex flex-col hover:bg-uz-graphite transition-colors duration-500"
      data-cursor="hover"
      data-cursor-text="READ"
    >
      <Link href={`/blog/${post.service}/${post.slug}/`} className="flex flex-col flex-1">
        <div className="relative -mx-8 md:-mx-10 -mt-8 md:-mt-10 mb-6 aspect-[16/9] overflow-hidden border-b border-uz-graphite bg-uz-graphite">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            unoptimized
          />
          <div className="absolute inset-0 bg-uz-black/40" />
        </div>
        <div className="flex items-center gap-3 mb-6 font-mono text-[10px] tracking-[0.2em] uppercase">
          <span className="text-uz-indigo">[{post.category}]</span>
          <span className="text-uz-slate">·</span>
          <span className="text-uz-slate tabular-nums">{post.readingTime} MIN</span>
        </div>

        <h3 className="font-display text-uz-white text-[clamp(22px,2.4vw,32px)] tracking-[-0.03em] leading-[1.05] mb-4 group-hover:text-uz-indigo transition-colors duration-500 flex-1">
          {post.title}
        </h3>

        <div className="pt-6 border-t border-uz-graphite flex items-center justify-between">
          <span className="font-mono text-[10px] text-uz-slate tracking-[0.2em] uppercase">
            #{post.number} · {formatDate(post.date)}
          </span>
          <span className="font-mono text-[10px] text-uz-indigo tracking-[0.2em] uppercase inline-flex items-center gap-2">
            <span className="border-b border-uz-indigo">Read</span>
            <span>→</span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
