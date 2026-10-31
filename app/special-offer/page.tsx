import { Metadata } from 'next';
import Link from 'next/link';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import SpecialOfferLeadForm from '@/components/special-offer/SpecialOfferLeadForm';
import { JsonLd, BreadcrumbSchema, FAQPageSchema, WebPageSchema } from '@/lib/seo';
import { offer } from '@/lib/offer-data';

export const metadata: Metadata = {
  title: 'Special Offer | Brand-to-URL Sprint',
  description:
    'Two spots. $24K fixed. The full Brand-to-URL sequence, strategy, identity, product, and code, bundled into one sprint. Q3 2026 only.',
  openGraph: {
    title: 'Special Offer | Brand-to-URL Sprint',
    description:
      'Two spots. $24K fixed. Full Brand-to-URL sprint. Q3 2026 only.',
    url: 'https://usamazahid.design/special-offer/',
    type: 'website',
    images: [{ url: '/images/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Special Offer | Brand-to-URL Sprint',
    description: 'Two spots. $24K fixed. Full Brand-to-URL sprint.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://usamazahid.design/special-offer/',
  },
  robots: { index: false, follow: true },
};

export default function SpecialOfferPage() {
  const takenSpots = offer.spotsTotal - offer.spotsRemaining;
  const isOfferActive = offer.spotsRemaining > 0;

  return (
    <main
      id="main"
      className="relative w-full paper-surface"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd data={WebPageSchema({
        name: 'Special Offer | Brand-to-URL Sprint',
        url: 'https://usamazahid.design/special-offer/',
      })} />
      <JsonLd data={BreadcrumbSchema([
        { name: 'Home', url: 'https://usamazahid.design/' },
        { name: 'Special Offer', url: 'https://usamazahid.design/special-offer/' },
      ])} />
      <JsonLd data={FAQPageSchema(offer.faqs)} />
      <SeoBreadcrumbs items={[
        { name: 'Home', url: '/' },
        { name: 'Special Offer' },
      ]} />

      <section className="hero pad" style={{ paddingTop: '110px' }}>
        <div className="fo">
          <span>{offer.heroLabel}</span>
          <span>{offer.spotsRemaining} of {offer.spotsTotal} spots open</span>
          <span>{offer.savingsPercent}% OFF · {offer.offerPrice} fixed</span>
        </div>
        <div className="hg">
          <div className="ht">
            <h1>
              <span className="ln"><span>Brand-to-URL sprint.</span></span>
              <span className="ln"><span>Fixed scope.</span></span>
              <span className="ln it2"><span>Fixed outcome.</span></span>
            </h1>
            <p className="sub">
              <b>{offer.bundle.title}</b> in {offer.bundle.duration}. Strategy, identity, product design,
              and engineering delivered as one clean sequence.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link className="btn" href="/contact/" data-cur="Offer">
                Book your sprint <span aria-hidden>→</span>
              </Link>
              <a className="btn btn-ghost" href="#offer-stack" data-cur="Stack">
                See what is included <span aria-hidden>→</span>
              </a>
            </div>
            <p className="rw">
              Status: {isOfferActive ? 'Active' : 'Not Active'} · {offer.anchorPrice} standard value → {offer.offerPrice} offer price ({offer.savingsPercent}% off, {offer.savings} saved).
            </p>
          </div>
        </div>
      </section>

      <section className="pad" id="offer-status">
        <div className="wh">
          <h2>Offer status</h2>
          <span className="lab">{offer.deadline} window</span>
        </div>
        <div style={{ border: '1px solid var(--line)', background: 'var(--card)', padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
            <span className="lab">Spots taken: {takenSpots}</span>
            <span className="lab">Spots remaining: {offer.spotsRemaining}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
            <span className="lab">Discount: {offer.savingsPercent}% OFF ({offer.savings})</span>
            <span className="lab">Status: {isOfferActive ? 'ACTIVE' : 'NOT ACTIVE'}</span>
          </div>
          <div style={{ height: 8, background: 'var(--line)', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: `${(takenSpots / offer.spotsTotal) * 100}%`,
                background: 'var(--ind)',
              }}
            />
          </div>
        </div>
      </section>

      <section className="pad" id="offer-stack">
        <div className="wh">
          <h2>What you get</h2>
          <span className="lab">4-track delivery stack</span>
        </div>
        <div className="blog-grid">
          {offer.deliverables.map((item) => (
            <article key={item.code} className="blog-card">
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span>Track {item.code}</span>
                  <span>{item.fromValue} standalone</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pad" id="offer-fit">
        <div className="sv">
          <div className="sv-l">
            <h2>Who this is for</h2>
            <p>High-conviction teams that need one operator from concept to deploy.</p>
          </div>
          <div>
            <article className="svc">
              <h3>Best fit</h3>
              <ul>
                {offer.whoFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="svc">
              <h3>Not ideal for</h3>
              <ul>
                {offer.whoNotFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="pad" id="offer-faq">
        <div className="wh">
          <h2>Offer FAQ</h2>
          <span className="lab">{offer.faqs.length} key answers</span>
        </div>
        <div className="sv">
          <div className="sv-l">
            <p>Clear answers before you book. No hidden scope, no hidden pricing.</p>
          </div>
          <div>
            {offer.faqs.slice(0, 4).map((faq) => (
              <article key={faq.q} className="svc">
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SpecialOfferLeadForm />

      <CTA
        id="contact"
        title="Claim your Brand-to-URL sprint."
        subtitle="High-conversion, clean execution, and direct founder collaboration from strategy to live product."
        buttonText="Book Your Sprint"
        buttonHref="/contact/"
        statusText={`${offer.spotsRemaining} of ${offer.spotsTotal} spots open`}
      />

      <Footer />
    </main>
  );
}
