import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogIndexExact from '@/components/blog/BlogIndexExact';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import { allServices, BlogService } from '@/lib/blog-data';
import { getPostsByService } from '@/lib/blog-utils';
import { JsonLd, BreadcrumbSchema, WebPageSchema } from '@/lib/seo';

interface ServicePageProps {
  params: { service: string };
}

const isService = (value: string): value is BlogService =>
  allServices.some((service) => service.value === value);

const getServiceLabel = (service: BlogService): string =>
  allServices.find((entry) => entry.value === service)?.label ?? service;

export async function generateStaticParams() {
  return allServices
    .filter((service) => service.value !== 'ALL')
    .map((service) => ({ service: service.value }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  if (!isService(params.service)) return {};
  const serviceLabel = getServiceLabel(params.service);
  const canonical = `https://usamazahid.design/blog/${params.service}/`;

  return {
    title: `${serviceLabel} Insights | Writing`,
    description: `${serviceLabel} essays and field notes from Usama Zahid.`,
    openGraph: {
      title: `${serviceLabel} Insights | Writing`,
      description: `${serviceLabel} essays and field notes from Usama Zahid.`,
      url: canonical,
      type: 'website',
      images: [{ url: '/images/og-image.jpg' }],
    },
    alternates: { canonical },
  };
}

export default function BlogServicePage({ params }: ServicePageProps) {
  if (!isService(params.service)) notFound();
  const serviceLabel = getServiceLabel(params.service);
  const servicePosts = getPostsByService(params.service);
  if (servicePosts.length === 0) notFound();

  const [featured, ...rest] = servicePosts;
  const canonical = `https://usamazahid.design/blog/${params.service}/`;

  return (
    <main
      id="main"
      className="relative w-full"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd data={WebPageSchema({
        name: `${serviceLabel} Insights`,
        url: canonical,
      })} />
      <JsonLd
        data={BreadcrumbSchema([
          { name: 'Home', url: 'https://usamazahid.design/' },
          { name: 'Writing', url: 'https://usamazahid.design/blog/' },
          { name: serviceLabel, url: canonical },
        ])}
      />
      <SeoBreadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Writing', url: '/blog/' },
          { name: serviceLabel },
        ]}
      />

      <BlogIndexExact featured={featured} posts={rest} />

      <CTA
        id="contact"
        title={`Build your ${serviceLabel.toLowerCase()} system`}
        subtitle="Brand identity and a production-ready website, delivered together as one system."
        buttonText="Book Strategy Call"
        buttonHref="https://cal.com/usama-zahid-haadwj/15min"
        statusText="Available for 2 new projects this quarter"
      />

      <Footer />
    </main>
  );
}
