import Link from 'next/link';

export default function HomeCtaExact() {
  return (
    <section className="cta pad" id="contact">
            <div className="sh">
              <span className="lab">Work together</span>
              <span className="lab">Fig. 06. Roles &amp; client inquiries</span>
            </div>
            <div className="cta-grid">
              <div className="cta-copy">
                <h2>Hiring a designer, or need a sharper product?</h2>
                <p className="sub"><b>I’m Usama Zahid, open to Product &amp; Brand Design roles and select client builds.</b> Book a quick 15-minute intro call, or ask for a free 5-minute UX &amp; brand teardown of your product.</p>
                <div className="cta-actions">
                  <a className="btn" href="https://cal.com/usama-zahid-haadwj/secret" target="_blank" rel="noopener noreferrer" data-cur="Calendar">Book a 15-min call <span aria-hidden={true}>→</span></a>
                  <Link className="btn btn-ghost" href="/cv/" data-cur="CV">View CV &amp; resume <span aria-hidden={true}>→</span></Link>
                </div>
                <p className="rw">Or write directly: <a href="mailto:hello.usamazahid@gmail.com">hello.usamazahid@gmail.com</a> · <Link href="/contact/">Request a free UX teardown</Link></p>
              </div>
              <aside className="cta-plate" aria-label="Availability and response time">
                <svg className="mk" viewBox="0 328 4319 3662" aria-hidden={true}><use href="#logo"/></svg>
                <dl>
                  <div><dt>Roles</dt><dd>Full-time / Contract</dd></div>
                  <div><dt>Response</dt><dd>{'< 24h'}</dd></div>
                  <div><dt>Client Builds</dt><dd>4 weeks</dd></div>
                </dl>
                <p className="ser">Open to product teams &amp; select client projects.</p>
              </aside>
            </div>
          </section>
  );
}
