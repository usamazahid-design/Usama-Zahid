import Link from 'next/link';
import Image from 'next/image';

export default function HomeWorkExact() {
  return (
    <section id="work">
          <div className="pad wh">
            <div>
              <h2>Selected work</h2>
              <span className="lab">Four real projects, with the numbers</span>
            </div>
            <Link className="see-all-link" href="/portfolio/" data-cur="Portfolio">See all work <span aria-hidden={true}>→</span></Link>
          </div>
          <div className="stack">
          <Link className="panel is-ind" href="/portfolio/petrozen-erp/" data-cur="View Case">
            <div className="tx">
              <div className="tx-top">
                <span className="lab">Fig. 1. Product design · Enterprise ERP</span>
                <span className="view-tag">Case Study <span aria-hidden={true}>→</span></span>
              </div>
              <div>
                <h3>Petrozen ERP</h3>
                <p>Multi-tenant ledger replacing spreadsheet chaos for invoice entry and reconciliation.</p>
                <span className="meta-tag">Lead Product Designer · Shipped 2025</span>
              </div>
            </div>
            <div className="pa">
              <Image className="panel-img" src="/images/portfolio/Petrozen-ERP/hero.webp" alt="Petrozen ERP interface dashboard" width={1600} height={1000} sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
          </Link>
          
          <Link className="panel is-ink" href="/portfolio/stealth-humanizer-ai-app/" data-cur="View Case">
            <div className="tx">
              <div className="tx-top">
                <span className="lab">Fig. 2. AI Product Design · Mobile App</span>
                <span className="view-tag">Case Study <span aria-hidden={true}>→</span></span>
              </div>
              <div>
                <h3>Stealth Humanizer</h3>
                <p>Redesigned UX eliminating clutter for high-frequency AI text humanization.</p>
                <span className="meta-tag">Lead UI/UX Designer · Shipped 2026</span>
              </div>
            </div>
            <div className="pa">
              <Image className="panel-img" src="/images/portfolio/StealthApp/hero-stealthapp.webp" alt="Stealth Humanizer AI app interface" width={1600} height={1000} sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
          </Link>
          
          <Link className="panel is-ind" href="/branding/codestreaks/" data-cur="View Case">
            <div className="tx">
              <div className="tx-top">
                <span className="lab">Fig. 3. Brand Identity · Infrastructure</span>
                <span className="view-tag">Case Study <span aria-hidden={true}>→</span></span>
              </div>
              <div>
                <h3>CodeStreaks</h3>
                <p>Automation repositioned as infrastructure across web and print.</p>
                <span className="meta-tag">Brand Identity · Shipped 2025</span>
              </div>
            </div>
            <div className="pa">
              <Image className="panel-img" src="/images/branding/codestreaks/codestreaks-hero.webp" alt="CodeStreaks brand identity mark" width={1600} height={1000} sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
          </Link>
          
          <Link className="panel is-ink" href="/portfolio/begum-bridal-couture-website/" data-cur="View Case">
            <div className="tx">
              <div className="tx-top">
                <span className="lab">Fig. 4. Brand-to-URL · Luxury Couture</span>
                <span className="view-tag">Case Study <span aria-hidden={true}>→</span></span>
              </div>
              <div>
                <h3>Begum Couture</h3>
                <p>Mughal-inspired visual identity, 38-slide guidelines, artisan storytelling, and bespoke e-commerce store.</p>
                <span className="meta-tag">Brand-to-URL · Shipped 2026</span>
              </div>
            </div>
            <div className="pa">
              <Image className="panel-img" src="/images/portfolio/Begum/hero-begum.webp" alt="Begum bridal couture website design" width={1600} height={1000} sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
          </Link>
          </div>
          
          <div className="pad work-footer">
            <div className="work-footer-inner">
              <div>
                <span className="lab">Full Portfolio Archive</span>
                <p className="work-footer-sub">Explore all product case studies, SaaS systems, and brand transformations.</p>
              </div>
              <Link className="btn work-btn" href="/portfolio/" data-cur="All Work">
                <span>See all work</span>
                <span aria-hidden={true}>→</span>
              </Link>
            </div>
          </div>
          </section>
  );
}
