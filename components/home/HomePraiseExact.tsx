import Link from 'next/link';

export default function HomePraiseExact() {
  return (
    <section className="tsx" id="praise">
      <div className="pad">
        <div className="sh">
          <span className="lab">From the founders</span>
          <span className="lab" id="tc">
            Fig. 01 / 05
          </span>
        </div>

        <div className="tv" aria-live="polite">
          <figure className="tsq on" data-index="0">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
              <Link href="/branding/codestreaks/" className="lab" style={{ textDecoration: 'underline' }}>
                Brand assets · CodeStreaks ↗
              </Link>
              <a
                href="https://codestreaks.com"
                target="_blank"
                rel="noopener noreferrer"
                className="lab"
                style={{ color: 'var(--ind)', textDecoration: 'underline' }}
              >
                Verified founder review ↗
              </a>
            </div>
            <blockquote className="tsq-text">
              <span aria-hidden="true" style={{ fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1, color: 'var(--ind)', display: 'block', marginBottom: 10 }}>“</span>
              Usama Zahid designed the brand assets for CodeStreaks and the result was outstanding.
              He listened carefully, challenged rough ideas with the right questions, and delivered
              work that was better than what I had in mind. Feedback rounds were fast, collaborative,
              and ego-free. If you want design done properly, work with Usama.
            </blockquote>
            <figcaption>
              <b>Syed Arsalan Amin</b>
              <span>Founder of CodeStreaks</span>
            </figcaption>
          </figure>

          <figure className="tsq" data-index="1">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
              <Link href="/portfolio/begum-bridal-couture-website/" className="lab" style={{ textDecoration: 'underline' }}>
                Brand identity & platform · Begum ↗
              </Link>
              <a
                href="https://begumretails.com"
                target="_blank"
                rel="noopener noreferrer"
                className="lab"
                style={{ color: 'var(--ind)', textDecoration: 'underline' }}
              >
                Verified founder review ↗
              </a>
            </div>
            <blockquote className="tsq-text">
              <span aria-hidden="true" style={{ fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1, color: 'var(--ind)', display: 'block', marginBottom: 10 }}>“</span>
              Usama Zahid played a key role in shaping Begum&apos;s brand identity and digital platform.
              From logo and packaging to web execution, every deliverable was professional and highly
              polished. What impressed us most was his balance of visual quality with practical usability.
              The final outcome exceeded expectations, and we are looking forward to working with him again.
            </blockquote>
            <figcaption>
              <b>Sherjeel Mukhlis</b>
              <span>Founder of Begum</span>
            </figcaption>
          </figure>

          <figure className="tsq" data-index="2">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
              <span className="lab">Clean, modern design · Code Cross</span>
              <span className="lab" style={{ color: 'var(--ind)' }}>Verified client review</span>
            </div>
            <blockquote className="tsq-text">
              <span aria-hidden="true" style={{ fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1, color: 'var(--ind)', display: 'block', marginBottom: 10 }}>“</span>
              Usama has strong design skills with a sharp eye for detail. His work is clean,
              modern, and consistently creative.
            </blockquote>
            <figcaption>
              <b>Arsalan Jafer</b>
              <span>Business Developer, Code Cross</span>
            </figcaption>
          </figure>

          <figure className="tsq" data-index="3">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
              <span className="lab">UI/UX · Vieapps</span>
              <span className="lab" style={{ color: 'var(--ind)' }}>Verified client review</span>
            </div>
            <blockquote className="tsq-text">
              <span aria-hidden="true" style={{ fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1, color: 'var(--ind)', display: 'block', marginBottom: 10 }}>“</span>
              Usama Zahid is an exceptional UI/UX designer. He delivered top-notch work with
              clear user-first thinking and smooth interfaces. Highly recommended for any project
              needing modern, functional UI/UX.
            </blockquote>
            <figcaption>
              <b>Farhan</b>
              <span>Sr Developer at Vieapps</span>
            </figcaption>
          </figure>

          <figure className="tsq" data-index="4">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
              <Link href="/portfolio/the-laila-majnu-gifting/" className="lab" style={{ textDecoration: 'underline' }}>
                Graphic & UI/UX · The Laila Majnu ↗
              </Link>
              <a
                href="https://thelailamajnu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="lab"
                style={{ color: 'var(--ind)', textDecoration: 'underline' }}
              >
                Verified founder review ↗
              </a>
            </div>
            <blockquote className="tsq-text">
              <span aria-hidden="true" style={{ fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1, color: 'var(--ind)', display: 'block', marginBottom: 10 }}>“</span>
              Outstanding graphic designer and UI/UX expert. Delivered pixel-perfect designs on time
              with creative clarity that improved engagement. Highly recommended for modern, intuitive
              interfaces.
            </blockquote>
            <figcaption>
              <b>Agha Hanzala</b>
              <span>Founder of The Laila Majnu</span>
            </figcaption>
          </figure>
        </div>

        <div className="tcn">
          <div className="tbar">
            <i id="tp" />
          </div>
          <div className="t-pills" role="group" aria-label="Testimonial slides">
            <button className="t-pill on" type="button" data-q="0" aria-label="01, CodeStreaks">
              01
            </button>
            <button className="t-pill" type="button" data-q="1" aria-label="02, Begum">
              02
            </button>
            <button className="t-pill" type="button" data-q="2" aria-label="03, Code Cross">
              03
            </button>
            <button className="t-pill" type="button" data-q="3" aria-label="04, Vieapps">
              04
            </button>
            <button className="t-pill" type="button" data-q="4" aria-label="05, The Laila Majnu">
              05
            </button>
          </div>
          <div className="tbs">
            <button id="tpv" type="button" aria-label="Previous quote">
              ←
            </button>
            <button id="tnx" type="button" aria-label="Next quote">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
