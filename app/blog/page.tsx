import { Metadata } from 'next';
import BlogIndexExact from '@/components/blog/BlogIndexExact';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import { getFeaturedPost, getNonFeaturedPosts } from '@/lib/blog-utils';
import { JsonLd, BreadcrumbSchema, WebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Brand & Product Design Blog — Essays & Field Notes',
  description:
    'Essays on brand identity, product UX design, Brand-to-URL systems, and the craft of shipping. Field notes from Usama Zahid, Brand & Product Designer.',
  openGraph: {
    title: 'Brand & Product Design Blog | Usama Zahid',
    description:
      'Essays on brand identity, product UX design, Brand-to-URL systems, and the craft of shipping.',
    url: 'https://usamazahid.design/blog/',
    type: 'website',
    images: [{ url: '/images/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand & Product Design Blog | Usama Zahid',
    description: 'Field notes from Usama Zahid, Brand & Product Designer.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://usamazahid.design/blog/',
  },
};

export default function BlogPage() {
  const featured = getFeaturedPost();
  const posts = getNonFeaturedPosts();

  return (
    <main
      id="main"
      className="relative w-full"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd
        data={WebPageSchema({
          name: 'Brand & Product Design Blog | Usama Zahid',
          url: 'https://usamazahid.design/blog/',
        })}
      />
      <JsonLd
        data={BreadcrumbSchema([
          { name: 'Home', url: 'https://usamazahid.design/' },
          { name: 'Writing', url: 'https://usamazahid.design/blog/' },
        ])}
      />
      <SeoBreadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Writing' },
        ]}
      />

      <BlogIndexExact featured={featured} posts={posts} />

      <CTA
        id="contact"
        title="Four weeks from brand to live URL."
        subtitle="Brand identity and a production-ready website, delivered together as one system."
        buttonText="Book Strategy Call"
        buttonHref="https://cal.com/usama-zahid-haadwj/15min"
        statusText="Available for 2 new projects this quarter"
      />

      <Footer />
    </main>
  );
}
