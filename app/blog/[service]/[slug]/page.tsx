import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import SimplePageHero from '@/components/SimplePageHero';
import PostBody from '@/components/blog/PostBody';
import PostTOC from '@/components/blog/PostTOC';
import PostFooter from '@/components/blog/PostFooter';
import RelatedResources from '@/components/blog/RelatedResources';
import PostFAQ from '@/components/blog/PostFAQ';
import SectionDivider from '@/components/SectionDivider';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import { allServices, BlogService } from '@/lib/blog-data';
import {
  getAllPosts,
  getPostByServiceAndSlug,
  getTableOfContents,
  toIsoDate,
} from '@/lib/blog-utils';
import {
  JsonLd,
  ArticleSchema,
  BreadcrumbSchema,
  FAQPageSchema,
  WebPageSchema,
} from '@/lib/seo';

interface PostPageProps {
  params: { service: string; slug: string };
}

const fallbackFaqs = [
  {
    q: 'What does a Brand & Product Designer do?',
    a: 'A Brand & Product Designer aligns positioning, visual identity, UX flows, and implementation priorities so the brand and product communicate clearly and convert with less friction.',
  },
  {
    q: 'Where does Brand-to-URL fit in a project?',
    a: 'Brand-to-URL turns strategy into a production-ready identity and website, connecting positioning, interface design, and code decisions into one sequence.',
  },
  {
    q: 'Can this approach support existing products and websites?',
    a: 'Yes. Existing products and websites are audited for friction, visual consistency, and user control, then redesigned and engineered as one system.',
  },
];

const isService = (value: string): value is BlogService =>
  allServices.some((service) => service.value === value);

const toServiceLabel = (service: BlogService): string =>
  allServices.find((entry) => entry.value === service)?.label ?? service;

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    service: post.service,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  if (!isService(params.service)) return {};

  const post = getPostByServiceAndSlug(params.service, params.slug);
  if (!post) return {};

  const url = `https://usamazahid.design/blog/${post.service}/${post.slug}/`;
  const publishedTime = toIsoDate(post.date);
  const updatedTime = post.lastUpdated ? toIsoDate(post.lastUpdated) : undefined;

  const metaTitle = post.seoTitle ?? post.title;
  const metaDescription =
    post.excerpt.length > 155
      ? `${post.excerpt.slice(0, 152).trim()}...`
      : post.excerpt;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      type: 'article',
      publishedTime,
      modifiedTime: updatedTime,
      tags: post.tags,
      images: [{ url: post.coverImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [post.coverImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function PostPage({ params }: PostPageProps) {
  if (!isService(params.service)) notFound();
  const post = getPostByServiceAndSlug(params.service, params.slug);
  if (!post) notFound();

  const toc = getTableOfContents(post.content);
  const url = `https://usamazahid.design/blog/${post.service}/${post.slug}/`;
  const datePublished = toIsoDate(post.date);
  const dateModified = post.lastUpdated ? toIsoDate(post.lastUpdated) : undefined;
  const faqs = post.faqs && post.faqs.length > 0 ? post.faqs : fallbackFaqs;
  const serviceLabel = toServiceLabel(post.service);

  return (
    <main
      id="main"
      className="relative w-full paper-surface"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd data={WebPageSchema({
        name: post.title,
        url,
      })} />
      <JsonLd data={BreadcrumbSchema([
        { name: 'Home', url: 'https://usamazahid.design/' },
        { name: 'Writing', url: 'https://usamazahid.design/blog/' },
        { name: serviceLabel, url: `https://usamazahid.design/blog/${post.service}/` },
        { name: post.title, url },
      ])} />
      <JsonLd data={ArticleSchema({
        headline: post.title,
        description: post.excerpt,
        datePublished,
        dateModified,
        author: 'Usama Zahid',
        url,
        image: post.coverImage,
        category: serviceLabel,
        tags: post.tags,
      })} />
      <SeoBreadcrumbs items={[
        { name: 'Home', url: '/' },
        { name: 'Writing', url: '/blog/' },
        { name: serviceLabel, url: `/blog/${post.service}/` },
        { name: post.title },
      ]} />
      <SimplePageHero
        id="post-hero"
        eyebrow={`[ ${serviceLabel} / ISSUE_${post.number} ]`}
        title={post.title}
        description={post.subtitle}
        meta={`${post.readingTime} min read`}
        actions={[
          { label: 'Book Strategy Call', href: '/contact/', primary: true },
          { label: `Back to ${serviceLabel}`, href: `/blog/${post.service}/` },
        ]}
        insights={[
          { label: 'Service', value: serviceLabel },
          { label: 'Published', value: post.date },
          { label: 'Core Focus', value: post.excerpt },
        ]}
        stats={[
          { label: 'Reading Time', value: `${post.readingTime} min` },
          { label: 'Tags', value: String(post.tags.length) },
          { label: 'Issue', value: post.number },
          { label: 'Format', value: 'Dispatch' },
        ]}
      />

      <article className="relative w-full">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-8 lg:max-w-3xl">
              <PostBody blocks={post.content} />

              {/* Contextual Service Bridge Card */}
              <div className="mt-16 p-8 border border-uz-graphite bg-uz-surface/50 rounded-none">
                <span className="font-mono text-[10px] text-uz-indigo uppercase tracking-[0.2em] block mb-2">
                  [ HOW_THIS_IS_SOLVED_IN_PRACTICE ]
                </span>
                <h4 className="font-display text-uz-white text-[20px] md:text-[24px] mb-3">
                  Need this shipped for your product?
                </h4>
                <p className="text-uz-silver text-[14px] leading-relaxed mb-6">
                  {post.service === 'identity' &&
                    "Usama Zahid engineers complete brand identity systems, mathematical logo lockups, and design token libraries in 2–3 weeks, or as part of the 4-week Brand-to-URL sprint."}
                  {post.service === 'product' &&
                    "Usama Zahid audits product friction and architects user-centric SaaS UI/UX workflows and component libraries designed to eliminate onboarding churn."}
                  {(post.service === 'engineering' || post.service === 'website') &&
                    "Usama Zahid designs and builds production Next.js websites with 95+ Core Web Vitals, accessible semantics, and zero agency handoff gap."}
                  {(post.service === 'strategy' || post.service === 'marketing') &&
                    "Usama Zahid shapes category positioning, narrative architecture, and investor launch assets that tie brand strategy directly to the live product."}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={
                      post.service === 'identity'
                        ? '/services/identity/'
                        : post.service === 'product'
                        ? '/services/product/'
                        : post.service === 'engineering' || post.service === 'website'
                        ? '/services/engineering/'
                        : '/services/strategy/'
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 bg-uz-indigo text-uz-white font-mono text-[11px] tracking-wider uppercase hover:bg-uz-indigo/90 transition-colors"
                  >
                    View Matching Service Track →
                  </Link>
                  <Link
                    href="/brand-to-url/"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-uz-graphite text-uz-white font-mono text-[11px] tracking-wider uppercase hover:border-uz-indigo transition-colors"
                  >
                    4-Week Brand-to-URL Sprint →
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4">
              <PostTOC items={toc} />
            </div>
          </div>
        </div>
      </article>

      <SectionDivider label="END_OF_DISPATCH" index="* *" variant="ascii" />

      <JsonLd data={FAQPageSchema(faqs)} />
      <PostFAQ items={faqs} post={post} />

      <PostFooter post={post} />

      <RelatedResources post={post} />

      <Footer />
    </main>
  );
}
