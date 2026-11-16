import Link from 'next/link';

export default function HomeFooterExact() {
  return (
    <footer className="ft">
      <div className="pad ft-hero-strip">
        <div className="ft-hero-left">
          <span className="ft-avail">
            <i className="hero-avail-dot" aria-hidden="true" />
            Open to Product Design roles &amp; select client builds
          </span>
          <h2 className="ft-headline">
            Let’s build something <em>that holds.</em>
          </h2>
        </div>
        <div className="ft-hero-actions">
          <a
            className="ft-btn-primary"
            href="https://cal.com/usama-zahid-haadwj/secret"
            target="_blank"
            rel="noopener noreferrer"
            data-cur="Calendar"
          >
            Book a 15-min call <span aria-hidden="true">→</span>
          </a>
          <Link className="ft-btn-ghost" href="/cv/" data-cur="CV">
            View CV <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="ft-rule" aria-hidden="true" />

      <div className="pad ft-top">
        <Link className="ft-brand" href="/">
          <svg
            className="mk"
            viewBox="0 328 4319 3662"
            aria-hidden={true}
            style={{ width: 42, height: 36, display: 'block', flexShrink: 0 }}
          >
            <rect x="0" y="328" width="938" height="2724" fill="currentColor" />
            <path d="M3380 328H4318V784.5A3206 3206 0 0 1 3380 3052Z" fill="currentColor" />
            <path d="M939 3052H3380A3206 3206 0 0 1 1112 3990H939Z" fill="currentColor" />
            <rect x="3380" y="3052" width="938" height="938" fill="#4B3FFF" />
          </svg>
          <span>Usama Zahid</span>
          <em>Brand &amp; Product Designer · Shipping systems from Figma to Next.js.</em>
        </Link>

        <nav className="ft-cols" aria-label="Footer">
          <div>
            <span className="lab">Work &amp; Profile</span>
            <Link href="/portfolio/">Selected Work</Link>
            <Link href="/branding/">Branding</Link>
            <Link href="/about/">About</Link>
            <Link href="/cv/">CV &amp; Resume</Link>
            <Link href="/blog/">Writing</Link>
            <Link href="/products/">Free Products</Link>
          </div>
          <div>
            <span className="lab">Capabilities</span>
            <Link href="/brand-to-url/">Brand-to-URL</Link>
            <Link href="/services/identity/">Brand Identity</Link>
            <Link href="/services/product/">Product &amp; UX</Link>
            <Link href="/services/engineering/">Web Engineering</Link>
            <Link href="/services/strategy/">Launch Strategy</Link>
          </div>
          <div>
            <span className="lab">Connect</span>
            <a href="https://www.linkedin.com/in/usamazahid-design/" target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            <a href="https://www.behance.net/usama-zahid-design" target="_blank" rel="noopener noreferrer">
              Behance ↗
            </a>
            <a href="https://dribbble.com/usamazahid-design" target="_blank" rel="noopener noreferrer">
              Dribbble ↗
            </a>
            <a href="mailto:hello.usamazahid@gmail.com">hello.usamazahid@gmail.com</a>
            <Link href="/contact/">Send a message →</Link>
          </div>
        </nav>
      </div>

      <div className="ft-rule" aria-hidden="true" />

      <div className="pad ft-bar">
        <span>© 2026 Usama Zahid · Lahore, Pakistan (UTC+5)</span>
        <span className="ft-bar-links">
          <Link href="/privacy-policy/">Privacy</Link>
          <Link href="/terms/">Terms</Link>
          <a href="#top">Back to top ↑</a>
        </span>
      </div>
    </footer>
  );
}
