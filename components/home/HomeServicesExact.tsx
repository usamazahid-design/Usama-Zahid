import Link from 'next/link';

export default function HomeServicesExact() {
  return (
    <section className="pad" id="services">
          <div className="sv">
          <div className="sv-l">
          <h2>Services</h2>
          <p>The brand and the website it lives on, designed and built as one system.</p>
          <span className="big" data-n="4">4</span><span className="mono">weeks from brief to live URL</span>
          <Link className="btn svc-all-btn" href="/services/" data-cur="Services">
            <span>Explore all services</span>
            <span aria-hidden={true}>→</span>
          </Link>
          </div>
          <div>
          <Link className="svc" href="/services/identity/" data-cur="Identity">
          <div><svg viewBox="0 0 100 100" aria-hidden={true}><path className="r" d="M0 100V0A100 100 0 0 1 100 100Z" fill="currentColor"/></svg><h3>Systemized Visual Infrastructure</h3></div>
          <div><p>We don’t just design logos; we build a documented visual infrastructure so your entire internal team and external contractors stay 100% consistent across every touchpoint.</p>
          <ul><li>Positioning &amp; messaging</li><li>Scalable logo systems</li><li>Figma token kits</li></ul>
          <span className="pr">Begum &amp; CodeStreaks: 38-slide guidelines, custom marks, and Figma token kits.</span>
          <div className="svc-action"><span>View Brand Systems service</span> <span aria-hidden={true}>→</span></div>
          </div>
          </Link>
          
          <Link className="svc" href="/services/engineering/" data-cur="Web Build">
          <div><svg viewBox="0 0 100 100" aria-hidden={true}><rect x="0" y="0" width="60" height="60" fill="currentColor"/><rect className="r" x="60" y="60" width="40" height="40" fill="#4B3FFF"/></svg><h3>High-Performance Conversion Engine</h3></div>
          <div><p>A brand-aligned digital home engineered from the ground up for sub-second speeds, flawless UX architecture, and zero brand drift.</p>
          <ul><li>UX information architecture</li><li>High-speed Next.js build</li><li>Conversion-optimized metadata</li></ul>
          <span className="pr">Begum &amp; Petrozen: booking cut from 6 steps to 3; sub-second page loads.</span>
          <div className="svc-action"><span>View Web Engineering service</span> <span aria-hidden={true}>→</span></div>
          </div>
          </Link>
          
          <Link className="svc" href="/services/product/" data-cur="Product UX">
          <div><svg viewBox="0 0 100 100" aria-hidden={true}><path className="r" d="M0 100A100 100 0 0 1 100 0V40A60 60 0 0 0 40 100Z" fill="currentColor"/></svg><h3>Frictionless Product Architecture (OOUX)</h3></div>
          <div><p>Eliminating the silent UX friction that frustrates users and drains customer support. We map complex B2B SaaS and AI workflows into intuitive, scalable design systems.</p>
          <ul><li>Mental model &amp; flow audits</li><li>Object-Oriented UX (OOUX) mapping</li><li>Modular UI component libraries</li></ul>
          <span className="pr">Petrozen ERP &amp; Stealth App: ledger clarity and high-frequency product UX, shipped.</span>
          <div className="svc-action"><span>View Product Design service</span> <span aria-hidden={true}>→</span></div>
          </div>
          </Link>
          
          <Link className="svc" href="/services/strategy/" data-cur="Strategy">
          <div><svg viewBox="0 0 100 100" aria-hidden={true}><circle className="r" cx="50" cy="50" r="50" fill="currentColor"/><rect x="50" y="50" width="50" height="50" fill="#4B3FFF"/></svg><h3>Market Positioning &amp; Launch GTM</h3></div>
          <div><p>Equipping your startup with the exact strategic messaging, investor collaterals, and launch assets needed to capture market share from day one.</p>
          <ul><li>Category positioning</li><li>High-stakes investor pitch decks</li><li>Multi-channel launch collateral</li></ul>
          <span className="pr">CodeStreaks &amp; Begum: identity, web, social, and decks in one delivery sequence.</span>
          <div className="svc-action"><span>View Launch Strategy service</span> <span aria-hidden={true}>→</span></div>
          </div>
          </Link>
          </div>
          </div>
          </section>
  );
}
