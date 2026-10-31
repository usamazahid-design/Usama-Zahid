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
          <div><svg viewBox="0 0 100 100" aria-hidden={true}><path className="r" d="M0 100V0A100 100 0 0 1 100 100Z" fill="currentColor"/></svg><h3>Brand identity</h3></div>
          <div><p>Positioning, logo system, color, type and a custom pattern, documented so any team can use it.</p>
          <ul><li>Positioning and messaging</li><li>Logo and visual system</li><li>Brand guidelines & Figma library</li></ul>
          <span className="pr">Begum & CodeStreaks: 38-slide guidelines, custom marks, and Figma token kits.</span>
          <div className="svc-action"><span>View Brand Systems service</span> <span aria-hidden={true}>→</span></div>
          </div>
          </Link>
          
          <Link className="svc" href="/services/engineering/" data-cur="Web Build">
          <div><svg viewBox="0 0 100 100" aria-hidden={true}><rect x="0" y="0" width="60" height="60" fill="currentColor"/><rect className="r" x="60" y="60" width="40" height="40" fill="#4B3FFF"/></svg><h3>Production-ready website</h3></div>
          <div><p>Designed from the identity and built to launch in Next.js, so the site never drifts away from the brand.</p>
          <ul><li>Structure, IA and copy direction</li><li>Responsive Next.js development</li><li>SEO metadata and speed optimization</li></ul>
          <span className="pr">Begum & Strong Rental: booking cut from 6 steps to 3; sub-second page loads.</span>
          <div className="svc-action"><span>View Web Engineering service</span> <span aria-hidden={true}>→</span></div>
          </div>
          </Link>
          
          <Link className="svc" href="/services/product/" data-cur="Product UX">
          <div><svg viewBox="0 0 100 100" aria-hidden={true}><path className="r" d="M0 100A100 100 0 0 1 100 0V40A60 60 0 0 0 40 100Z" fill="currentColor"/></svg><h3>Product &amp; UX design</h3></div>
          <div><p>Interfaces for web and mobile products that remove the friction users never report.</p>
          <ul><li>Flow, friction and mental model audit</li><li>Interface design system in Figma</li><li>Interaction patterns &amp; mobile UX</li></ul>
          <span className="pr">Petrozen ERP &amp; Stealth App: ledger clarity and high-frequency product UX, shipped.</span>
          <div className="svc-action"><span>View Product Design service</span> <span aria-hidden={true}>→</span></div>
          </div>
          </Link>
          
          <Link className="svc" href="/services/strategy/" data-cur="Strategy">
          <div><svg viewBox="0 0 100 100" aria-hidden={true}><circle className="r" cx="50" cy="50" r="50" fill="currentColor"/><rect x="50" y="50" width="50" height="50" fill="#4B3FFF"/></svg><h3>Brand strategy & launch</h3></div>
          <div><p>Strategic positioning, launch narrative, and marketing collateral built from the same unified system.</p>
          <ul><li>Positioning workshop & competitor audit</li><li>Social media launch templates</li><li>Print and investor presentation collateral</li></ul>
          <span className="pr">CodeStreaks & Begum: identity, web, social, and decks in one delivery sequence.</span>
          <div className="svc-action"><span>View Brand Strategy service</span> <span aria-hidden={true}>→</span></div>
          </div>
          </Link>
          </div>
          </div>
          </section>
  );
}
