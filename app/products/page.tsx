import { Metadata } from 'next';
import Link from 'next/link';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import ProductListWithLoadMore from '@/components/products/ProductListWithLoadMore';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import { JsonLd, BreadcrumbSchema, ProductSchema, WebPageSchema } from '@/lib/seo';
import { products } from '@/lib/products-data';

export const metadata: Metadata = {
  title: 'Free Design Systems, UI Kits & Figma Templates',
  description:
    'Free Figma design systems, Next.js starter templates, Notion OS kits, and brand strategy workbooks built by Usama Zahid, Brand & Product Designer.',
  openGraph: {
    title: 'Free Design Systems, UI Kits & Figma Templates | Usama Zahid',
    description:
      'Free Figma design systems, Next.js starter templates, Notion OS kits, and brand strategy workbooks.',
    url: 'https://usamazahid.design/products/',
    type: 'website',
    images: [{ url: '/images/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Design Systems, UI Kits & Figma Templates | Usama Zahid',
    description: 'Free Figma design systems, Next.js templates, and brand workbooks.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://usamazahid.design/products/',
  },
};

export default function ProductsPage() {
  return (
    <main
      id="main"
      className="relative w-full paper-surface"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd data={WebPageSchema({
        name: 'Digital Products | Catalog',
        url: 'https://usamazahid.design/products/',
      })} />
      <JsonLd data={BreadcrumbSchema([
        { name: 'Home', url: 'https://usamazahid.design/' },
        { name: 'Products', url: 'https://usamazahid.design/products/' },
      ])} />
      <SeoBreadcrumbs items={[
        { name: 'Home', url: '/' },
        { name: 'Products' },
      ]} />
      {products.map((product) => (
        <JsonLd key={product.slug} data={ProductSchema({
          name: product.name,
          description: product.tagline,
          url: `https://usamazahid.design/products/${product.slug}/`,
          price: '0',
          image: product.thumbnail,
          category: product.typeLabel,
        })} />
      ))}
      <section className="hero pad" style={{ paddingTop: '110px' }}>
        <div className="fo"><span>Products catalog</span><span>Free access by email</span><span>{products.length} products</span></div>
        <div className="hg">
          <div className="ht">
            <h1><span className="ln"><span>Digital products,</span></span><span className="ln"><span>ready to use</span></span><span className="ln it2"><span>in your workflow.</span></span></h1>
            <p className="sub"><b>Home-style curated catalog.</b> Browse details, review previews, and request free access by email. No payment checkout.</p>
            <Link className="btn" href="#products-grid" data-cur="Products">Browse all products <span aria-hidden={true}>→</span></Link>
            <p className="rw">Formats: Figma, Next.js, Notion, Motion, and PDF workbooks.</p>
          </div>
        </div>
      </section>

      <section className="pad" id="products-grid">
        <div className="wh">
          <h2>Product library</h2>
          <span className="lab">{products.length} products · free access request</span>
        </div>
        <ProductListWithLoadMore products={products} />
      </section>

      <CTA
        id="products-cta"
        label="Get Product Access"
        figLabel="Fig. P1. Product delivery workflow"
        title="Get free product access by email."
        subtitle={
          <>
            <b>No payment wall.</b> Pick a product, submit your details, and get access instructions by email.
          </>
        }
        buttonText="Request free access"
        buttonHref="/products/#products-grid"
        secondaryText="Send product request"
        secondaryHref="/contact/"
        statusText="Product access requests reviewed daily."
      />

      <Footer />
    </main>
  );
}
