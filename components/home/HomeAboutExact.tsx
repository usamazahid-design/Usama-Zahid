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
          <p>I failed a physics exam, then passed by drawing the system first. That habit stuck: before I draw a logo or interface, I map the system the business actually runs on.</p>
          <p>Most teams split brand and product across separate people, leaving a gap customers feel. I design the identity, architect the product UX, and write the production Next.js code so nothing gets lost in handoff.</p>
          <p>Design is business infrastructure: cutting 6-step flows to 3, replacing spreadsheet chaos with clear ledgers, and shipping systems that hold.</p>
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
