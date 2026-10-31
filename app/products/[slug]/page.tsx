import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import ProductAccessPopup from '@/components/products/ProductAccessPopup';
import ProductVisual from '@/components/products/ProductVisual';
import { JsonLd, BreadcrumbSchema, ProductSchema, WebPageSchema } from '@/lib/seo';
import {
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProducts,
} from '@/lib/products-data';

interface ProductDetailProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ProductDetailProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};

  const canonicalUrl =
    product.slug === 'brand-kit-generator'
      ? 'https://usamazahid.design/brand-kit/'
      : `https://usamazahid.design/products/${product.slug}/`;

  return {
    title: `${product.name} | Free Design Resource`,
    description: product.tagline,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} | Usama Zahid`,
      description: product.tagline,
      url: canonicalUrl,
      images: [{ url: product.thumbnail }],
      type: 'website',
    },
  };
}

export default function ProductDetailPage({ params }: ProductDetailProps) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  const related = getRelatedProducts(product.slug, 3);
  const shouldShowGallery = product.showGallery !== false && product.gallery.length > 0;

  return (
    <main
      id="main"
      className="relative w-full paper-surface"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd data={WebPageSchema({
        name: `${product.name} | Product`,
        url: `https://usamazahid.design/products/${product.slug}/`,
      })} />
      <JsonLd data={BreadcrumbSchema([
        { name: 'Home', url: 'https://usamazahid.design/' },
        { name: 'Products', url: 'https://usamazahid.design/products/' },
        { name: product.name, url: `https://usamazahid.design/products/${product.slug}/` },
      ])} />
      <JsonLd data={ProductSchema({
        name: product.name,
        description: product.description,
        url: `https://usamazahid.design/products/${product.slug}/`,
        price: '0',
        image: product.thumbnail,
        category: product.typeLabel,
      })} />

      <SeoBreadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Products', url: '/products/' },
          { name: product.name },
        ]}
      />

      <section className="pad" style={{ paddingTop: '110px' }}>
        <div className="fo">
          <span>Free resource</span>
          <span>{product.code}</span>
          <span>{product.typeLabel}</span>
        </div>
        <h1
          style={{
            fontSize: 'clamp(34px,5.5vw,72px)',
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            margin: '18px 0 14px',
          }}
        >
          {product.name}
        </h1>
        <div style={{ height: 1, background: 'var(--ink)', opacity: 0.4, marginBottom: 28 }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-start">
          <div style={{ border: '1px solid var(--line)', background: 'var(--card)', minHeight: 360 }}>
            <ProductVisual product={product} className="w-full h-full" />
          </div>

          <div>
            <p className="sub" style={{ marginBottom: 10 }}>
              <b>{product.tagline}</b>
            </p>
            <p style={{ color: 'var(--mute)', lineHeight: 1.6, margin: '0 0 16px' }}>
              The {product.typeLabel.toLowerCase()} kit includes ready-to-use files so your team can launch faster
              with consistent quality across design and build.
            </p>
            <ul style={{ margin: '0 0 20px', paddingLeft: 22, color: 'var(--mute)', lineHeight: 1.55 }}>
              {product.bullets.slice(0, 4).map((bullet) => (
                <li key={bullet} style={{ marginBottom: 10 }}>
                  {bullet}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 18, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <ProductAccessPopup
                productName={product.name}
                productSlug={product.slug}
                triggerLabel="Send me this resource"
                deliveryMode={product.deliveryMode}
                deliveryUrl={product.deliveryUrl}
                deliveryLabel={product.deliveryLabel}
              />
              <Link className="btn btn-ghost" href="/products/" data-cur="Products">
                Back to products <span aria-hidden>→</span>
              </Link>
            </div>
            <p style={{ marginTop: 12, color: 'var(--mute)', fontSize: 13 }}>
              Free access by email. No payment required.
            </p>
          </div>
        </div>
      </section>

      {shouldShowGallery ? (
        <section className="pad" id="gallery">
          <div className="wh">
            <h2>Preview gallery</h2>
            <span className="lab">Static grid showcase</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {product.gallery.map((src, index) => (
              <article key={src} style={{ border: '1px solid var(--line)', background: 'var(--card)' }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10' }}>
                  <Image
                    src={src}
                    alt={`${product.name} preview ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '12px 14px', borderTop: '1px solid var(--line)' }}>
                  <span style={{ fontSize: 12, color: 'var(--mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Preview {index + 1}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="pad" id="details">
        <div className="sv">
          <div className="sv-l">
            <h2>What you get</h2>
            <p>Everything listed below is included in the free access request package.</p>
          </div>
          <div>
            <article className="svc">
              <h3>Included files</h3>
              <ul>
                {product.files.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="svc">
              <h3>Compatibility</h3>
              <ul>
                {product.compatibility.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="svc">
              <h3>Highlights</h3>
              <ul>
                {product.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="svc">
              <h3>Access type</h3>
              <ul>
                <li>Pricing: Free resource</li>
                <li>
                  Delivery: {product.deliveryMode === 'file' ? 'Auto file download' : product.deliveryMode === 'link' ? 'Open external link' : 'Email delivery'}
                </li>
                <li>{product.deliveryLabel || 'Resource is delivered after email submit'}</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="pad" id="get-product">
        <div className="wh">
          <h2>Get this product for free</h2>
          <span className="lab">Email capture · no payment</span>
        </div>
        <div
          style={{
            border: '1px solid var(--line)',
            background: 'var(--card)',
            padding: 'clamp(18px, 2.5vw, 30px)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <p style={{ color: 'var(--mute)', lineHeight: 1.65, marginBottom: 16 }}>
                No checkout, no payment wall. Submit your name and email and get this resource
                shared directly in your inbox.
              </p>
              <ul style={{ color: 'var(--mute)', lineHeight: 1.55, paddingLeft: 20 }}>
                <li>Name and email only</li>
                <li>Instant success confirmation</li>
                <li>Clean popup flow, then auto-close</li>
              </ul>
              <div style={{ marginTop: 18 }}>
                <ProductAccessPopup
                  productName={product.name}
                  productSlug={product.slug}
                  triggerLabel="Get free access now"
                  deliveryMode={product.deliveryMode}
                  deliveryUrl={product.deliveryUrl}
                  deliveryLabel={product.deliveryLabel}
                />
              </div>
            </div>

            <div
              style={{
                border: '1px solid var(--line)',
                background: 'var(--bg)',
                padding: 18,
              }}
            >
              <h3 style={{ marginBottom: 10 }}>Delivery details</h3>
              <ul style={{ color: 'var(--mute)', lineHeight: 1.6, paddingLeft: 20 }}>
                <li>Popup form with name + email</li>
                <li>Success confirmation message</li>
                <li>Popup auto closes after submit</li>
                <li>No payment required</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="pad">
        <div className="wh">
          <h2>Related products</h2>
        </div>
        <div className="blog-grid">
          {related.map((item) => (
            <Link key={item.slug} href={`/products/${item.slug}/`} className="blog-card" data-cur="Product">
              <div className="blog-card-media">
                <ProductVisual product={item} className="w-full h-full" />
                <span className="blog-card-cat">{item.typeLabel}</span>
              </div>
              <div className="blog-card-body">
                <h3>{item.name}</h3>
                <p>{item.tagline}</p>
                <span className="blog-card-cta">View details →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTA
        id="product-detail-cta"
        label="Free Product Access"
        figLabel="Fig. P2. Access request route"
        title="Request this product and get it in your inbox."
        subtitle={
          <>
            <b>Simple lead capture flow.</b> Your client submits name and email, sees a success message, and the popup closes automatically.
          </>
        }
        buttonText="Get free access"
        buttonHref="#get-product"
        secondaryText="Explore all products"
        secondaryHref="/products/"
        statusText="Delivery and response handled by email."
      />

      <Footer />
    </main>
  );
}
