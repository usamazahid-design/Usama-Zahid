import { Metadata } from 'next';
import Link from 'next/link';
import SimplePageHero from '@/components/SimplePageHero';
import BrandKitStudio from '@/components/brand-kit/BrandKitStudio';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import {
  JsonLd,
  BreadcrumbSchema,
  FAQPageSchema,
  SoftwareApplicationSchema,
  WebPageSchema,
} from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Free Brand Kit Generator from Logo — Brand Guidelines PDF, Colors & Mockups',
  description:
    'Upload your SVG or PNG logo to generate an instant brand kit in your browser: 7-factor logo scalability audit, WCAG color palette extractor, typography pairings, business card designer, 6 brand mockups, and a 6-page vector PDF brand book.',
  keywords: [
    'free brand kit generator',
    'logo to brand guidelines generator',
    'brand guidelines pdf generator',
    'svg logo contrast checker',
    'logo scalability test tool',
    'extract color palette from logo',
    'free business card generator with qr code',
    'brand identity system generator',
  ],
  openGraph: {
    title: 'Free Brand Kit Generator — Logo to Brand Guidelines PDF | Usama Zahid',
    description:
      'Turn any SVG or PNG logo into a complete brand identity kit in your browser: color palette extraction, 7-factor scalability audit, mockups, business card designer, and 6-page PDF brand book.',
    url: 'https://usamazahid.design/brand-kit/',
    type: 'website',
    images: [{ url: '/images/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Brand Kit Generator — Logo to Brand Guidelines PDF | Usama Zahid',
    description:
      'Turn any SVG or PNG logo into a complete brand identity system. 100% client-side, private, and free.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://usamazahid.design/brand-kit/',
  },
};

const brandKitFaqs = [
  {
    q: 'How does the free Brand Kit Generator create brand guidelines from a logo?',
    a: 'Drop an SVG, PNG, or WebP logo into the studio. The client-side Canvas engine analyzes your mark across 7 scalability factors, extracts dominant brand hues in perceptual color space, builds a 6-role WCAG-checked color system, pairs Google Fonts, renders 6 real-world mockups, and compiles a downloadable 6-page vector PDF brand book.',
  },
  {
    q: 'Does this tool automatically adapt dark SVG logos for dark and light backgrounds?',
    a: 'Yes. The contrast engine detects low-luminance SVG strokes and fills (such as black or deep charcoal marks) and automatically synthesizes a high-contrast light variant for dark backgrounds—while preserving vibrant brand accent colors—across the scalability grid, mockups, business card editor, and exported PDF.',
  },
  {
    q: 'Is my uploaded logo stored on a server?',
    a: 'No. Every step—from pixel clustering and SVG parsing to PDF brand book compilation—runs 100% locally inside your web browser using the HTML5 Canvas API. Your logo files never leave your device.',
  },
  {
    q: 'What is included in the exported Brand Kit ZIP and PDF Brand Book?',
    a: 'You can export a 6-page A4 Landscape Brand Guidelines PDF (cover, logo construction & clear-space rules, color architecture, typography scale, and print-ready business card specs), CSS & JSON design tokens (W3C DTCG format), standalone SVG color swatches, and high-resolution PNG business card fronts and backs.',
  },
  {
    q: 'What is a brand identity system and when do I need a custom build?',
    a: 'A brand identity system is the complete operating layer for how a company looks and communicates: positioning, logo lockups, color tokens, typography hierarchy, custom patterns, and production code. The free generator gives you an instant baseline; for a bespoke identity and production Next.js website built together in four weeks, explore the Brand-to-URL package.',
  },
];

export default function BrandKitPage() {
  return (
    <main
      id="main"
      className="relative w-full paper-surface"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd
        data={WebPageSchema({
          name: 'Free Brand Kit Generator — Logo to Brand Guidelines PDF',
          url: 'https://usamazahid.design/brand-kit/',
          description:
            'Upload any SVG or PNG logo to generate a complete brand kit: 7-factor scalability audit, color palette extraction, typography pairings, business card studio, and 6-page PDF brand guidelines.',
        })}
      />
      <JsonLd
        data={SoftwareApplicationSchema({
          name: 'Brand Kit Studio — Logo to Brand Guidelines Generator',
          description:
            'Free client-side web application that turns any SVG or PNG logo into a complete brand identity system with a 7-factor scalability audit, WCAG color palette extraction, typography pairings, 6 real-world mockups, dual-sided business card editor, and 6-page vector PDF brand book export.',
          url: 'https://usamazahid.design/brand-kit/',
          applicationCategory: 'DesignApplication',
          image: '/images/Products/Brandkit-Generator.webp',
          featureList: [
            '7-Factor Logo Scalability & Pixel Density Audit',
            'Automatic Dark/Light SVG & PNG Logo Contrast Adaptation',
            'Perceptual Color Palette Extraction & WCAG Contrast Matrix',
            'Curated Google Fonts Typography Pairings & Modular Type Scale',
            'Interactive Dual-Sided Business Card & QR Code Studio',
            '6 Real-World Brand Mockups (Signage, Apparel, Mobile UI, Stationery)',
            '6-Page A4 Vector PDF Brand Guidelines Book & CSS/JSON Design Tokens Export',
          ],
        })}
      />
      <JsonLd data={FAQPageSchema(brandKitFaqs)} />
      <JsonLd
        data={BreadcrumbSchema([
          { name: 'Home', url: 'https://usamazahid.design/' },
          { name: 'Tools', url: 'https://usamazahid.design/services/' },
          { name: 'Brand Kit Generator', url: 'https://usamazahid.design/brand-kit/' },
        ])}
      />
      <SeoBreadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Tools' },
          { name: 'Brand Kit Generator' },
        ]}
      />

      <SimplePageHero
        id="brand-kit-hero"
        eyebrow="Free Design System Tool"
        folioLeft="Brand Kit Generator"
        folioCenter="Logo to Brand Guidelines PDF"
        title="Logo to brand system. Live in your browser."
        description="Drop your SVG or PNG logo mark to generate a designer-grade brand identity kit. Real-time 7-factor scalability audit, extracted WCAG color palettes, adaptive light/dark logo variants, business card designer, and print-ready PDF guidelines."
        actions={[
          { label: 'Upload logo mark', href: '#studio', primary: true },
          { label: 'Explore Brand-to-URL', href: '/brand-to-url/' },
        ]}
        insights={[
          { label: 'Analysis', value: '7-Factor Canvas scalability & contrast audit.' },
          { label: 'Colors', value: 'Primary, secondary, accent, neutrals & WCAG.' },
          { label: 'Privacy', value: '100% client-side browser processing.' },
        ]}
        stats={[
          { label: 'Score', value: '/10' },
          { label: 'Privacy', value: '100%' },
          { label: 'Pages', value: '6-Pg PDF' },
          { label: 'Cost', value: 'Free' },
        ]}
      />

      <div className="pad" style={{ paddingBottom: 'clamp(48px, 6vw, 88px)' }}>
        <BrandKitStudio />
      </div>

      {/* Indexable SEO Guide & FAQ Section for Organic Search */}
      <section
        className="pad"
        aria-labelledby="brand-kit-guide-heading"
        style={{
          paddingTop: 'clamp(48px, 6vw, 88px)',
          paddingBottom: 'clamp(64px, 8vw, 112px)',
          borderTop: '1px solid var(--line)',
        }}
      >
        <div className="sh">
          <span className="lab">Documentation &amp; Methodology</span>
          <span className="lab">Logo to Brand System</span>
        </div>

        <h2
          id="brand-kit-guide-heading"
          className="bh"
          style={{ maxWidth: '22ch', marginBottom: '28px' }}
        >
          How to generate brand guidelines from your logo.
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            marginBottom: '64px',
          }}
        >
          <article
            style={{
              border: '1px solid var(--line)',
              background: 'var(--card)',
              padding: '24px',
            }}
          >
            <span className="mono" style={{ fontSize: '12px', color: 'var(--ind)' }}>
              01 / SCALABILITY &amp; POLARITY
            </span>
            <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '10px 0 8px' }}>
              Test logo legibility from 16px favicons to signage
            </h3>
            <p style={{ color: 'var(--mute)', fontSize: '15px', lineHeight: 1.6 }}>
              Most logos fail at small sizes or disappear on dark backgrounds. The studio runs a 7-factor pixel and vector audit across aspect ratio, stroke weight, internal detail density, and automatic dark/light background contrast inversion.
            </p>
          </article>

          <article
            style={{
              border: '1px solid var(--line)',
              background: 'var(--card)',
              padding: '24px',
            }}
          >
            <span className="mono" style={{ fontSize: '12px', color: 'var(--ind)' }}>
              02 / COLOR &amp; TYPOGRAPHY TOKENS
            </span>
            <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '10px 0 8px' }}>
              Extract WCAG-compliant palettes &amp; type scales
            </h3>
            <p style={{ color: 'var(--mute)', fontSize: '15px', lineHeight: 1.6 }}>
              Instead of random swatches, the color engine extracts your logo&apos;s dominant hues and synthesizes a 6-role UI &amp; brand palette (Primary, Secondary, Accent, Light Neutral, Dark Surface, and Semantic tokens) paired with production-ready Google Fonts.
            </p>
          </article>

          <article
            style={{
              border: '1px solid var(--line)',
              background: 'var(--card)',
              padding: '24px',
            }}
          >
            <span className="mono" style={{ fontSize: '12px', color: 'var(--ind)' }}>
              03 / MOCKUPS, CARDS &amp; PDF BOOK
            </span>
            <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '10px 0 8px' }}>
              Export a 6-page brand book &amp; design tokens
            </h3>
            <p style={{ color: 'var(--mute)', fontSize: '15px', lineHeight: 1.6 }}>
              Preview your identity on 6 real-world surfaces, customize a dual-sided business card with a live vCard QR code, and export a 6-page A4 vector PDF brand book alongside CSS variables and W3C JSON tokens. Need a custom system? See{' '}
              <Link href="/services/identity/" style={{ color: 'var(--ind)', textDecoration: 'underline' }}>
                Brand Identity Systems
              </Link>
              .
            </p>
          </article>
        </div>

        <h2 className="bh" style={{ fontSize: 'clamp(26px, 3.4vw, 44px)', marginBottom: '20px' }}>
          Frequently asked questions.
        </h2>

        <div>
          {brandKitFaqs.map((faq, idx) => (
            <details key={idx} className="fq">
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <CTA
        id="contact"
        title="Need a bespoke brand system?"
        subtitle={
          <>
            From initial strategy to code-ready design systems and web engineering.
            <br />
            Built and shipped in four weeks.
          </>
        }
        buttonText="Book 15-Min Call"
        buttonHref="https://cal.com/usama-zahid-haadwj/15min"
        marqueeItems={[
          'BRAND IDENTITY',
          'SCALABILITY AUDIT',
          'PRODUCT DESIGN',
          'FOUR WEEKS',
          'BRAND-TO-URL',
          'BRAND IDENTITY',
          'SCALABILITY AUDIT',
          'PRODUCT DESIGN',
        ]}
      />

      <Footer />
    </main>
  );
}
