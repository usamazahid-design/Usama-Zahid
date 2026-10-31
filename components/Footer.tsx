'use client';

import Link from 'next/link';
import UMarkLogo from './UMarkLogo';

export default function Footer() {
  return (
    <footer className="ft">
      <div className="pad ft-top">
        <Link className="ft-brand" href="/">
          <UMarkLogo size={36} className="mk" />
          <span>Usama Zahid</span>
          <em>Brand and product, drawn as one system.</em>
        </Link>
        <nav className="ft-cols" aria-label="Footer">
          <div>
            <span className="lab">Navigate</span>
            <Link href="/portfolio/">Work</Link>
            <Link href="/branding/">Branding</Link>
            <Link href="/services/">Services</Link>
            <Link href="/about/">About</Link>
            <Link href="/blog/">Writing</Link>
            <Link href="/products/">Free Products</Link>
            <Link href="/brand-kit/">Brand Kit Generator</Link>
            <Link href="/hire/">Hire</Link>
            <Link href="/contact/">Contact</Link>
          </div>
          <div>
            <span className="lab">Services</span>
            <Link href="/brand-to-url/">Brand-to-URL</Link>
            <Link href="/services/identity/">Brand identity</Link>
            <Link href="/services/engineering/">Website</Link>
            <Link href="/services/product/">Product design</Link>
            <Link href="/services/strategy/">Launch assets</Link>
          </div>
          <div>
            <span className="lab">Elsewhere</span>
            <a
              href="https://www.linkedin.com/in/usamazahid-design/"
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </a>
            <a href="https://www.behance.net/usama-zahid-design" target="_blank" rel="noopener">
              Behance
            </a>
            <a href="https://dribbble.com/usamazahid-design" target="_blank" rel="noopener">
              Dribbble
            </a>
            <a href="mailto:hello.usamazahid@gmail.com">hello.usamazahid@gmail.com</a>
          </div>
        </nav>
      </div>
      <div className="ft-rule" aria-hidden="true" />
      <div className="pad ft-bar">
        <span>© 2026 Usama Zahid · Lahore</span>
        <span>
          <Link href="/privacy-policy/">Privacy</Link>
          <Link href="/terms/">Terms</Link>
        </span>
      </div>
    </footer>
  );
}
