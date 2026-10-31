import Link from 'next/link';
import Image from 'next/image';

export default function HomeAboutExact() {
  return (
    <section className="pad abx" id="about">
          <div className="sh"><span className="lab">About</span><span className="lab">Solo practice, founder-facing</span></div>
          <h2 className="lit" id="lit">I read the system before I draw anything. Brand and product, drawn as one system, so customers never feel the gap between them.</h2>
          <div className="abg">
          <aside className="fn">
            <div className="box"><Image src="/images/usamazahidPic.webp" alt="Usama Zahid, Brand and Product Designer" width={800} height={800} sizes="(max-width: 900px) 100vw, 40vw" /></div>
            <dl>
              <dt>Based in</dt><dd>Lahore, Pakistan</dd>
              <dt>Works with</dt><dd>Founders, startups, and growing brands</dd>
              <dt>Practice</dt><dd>Independent Brand &amp; Product Designer (brief the builder directly)</dd>
              <dt>Delivery</dt><dd>Brand identity and website, in four weeks</dd>
              <dt>Background</dt><dd>Physics</dd>
            </dl>
            <Link className="fn-link" href="/about/" data-cur="Story">Explore full story & daily rhythm <span aria-hidden={true}>→</span></Link>
          </aside>
          <div className="body">
          <p>I failed a physics exam. Then I passed by drawing the system first. That habit never left: before I design a logo or a layout, I draw the system the business actually runs on.</p>
          <p>Most founders share one problem: the brand was made by one agency and the product or website by another, and customers feel the gap between them. As a solo Brand &amp; Product Designer, I deliver the identity and a production-ready Next.js website together, as one system and one invoice, with no handoff between the two.</p>
          <p>I treat design as business infrastructure. The work I value most removes friction nobody reported: six booking steps cut to three, ledger work that no longer lives in spreadsheets, brands that read as systems.</p>
          <div className="facts"><div><b data-n="50" data-s="+">50+</b><span className="mono">projects</span></div><div><b data-n="30" data-s="+">30+</b><span className="mono">clients</span></div><div><b data-n="4">4</b><span className="mono">weeks per build</span></div></div>
          <div className="ab-actions" style={{ marginTop: '36px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link className="btn" href="/about/" data-cur="About">Read full story & method <span aria-hidden={true}>→</span></Link>
            <Link className="btn btn-ghost" href="/cv/" data-cur="CV">View credentials & CV <span aria-hidden={true}>→</span></Link>
          </div>
          </div>
          </div>
          </section>
  );
}
