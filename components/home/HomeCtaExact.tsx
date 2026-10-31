import Link from 'next/link';

export default function HomeCtaExact() {
  return (
    <section className="cta pad" id="contact">
            <div className="sh">
              <span className="lab">Start a project</span>
              <span className="lab">Fig. 06. Direct with the founder</span>
            </div>
            <div className="cta-grid">
              <div className="cta-copy">
                <h2>Four weeks from brand to live URL.</h2>
                <p className="sub"><b>Brand identity and a production-ready website, built together as one system.</b> You brief the person who designs it and writes the code. One invoice, no handoff.</p>
                <div className="cta-actions">
                  <a className="btn" href="https://cal.com/usama-zahid-haadwj/15min" target="_blank" rel="noopener" data-cur="Calendar">Book a strategy call <span aria-hidden={true}>→</span></a>
                  <Link className="btn btn-ghost" href="/contact/" data-cur="Contact">Send a brief <span aria-hidden={true}>→</span></Link>
                </div>
                <p className="rw">Or write directly: <a href="mailto:hello.usamazahid@gmail.com">hello.usamazahid@gmail.com</a></p>
              </div>
              <aside className="cta-plate" aria-label="How a project starts">
                <svg className="mk" viewBox="0 328 4319 3662" aria-hidden={true}><use href="#logo"/></svg>
                <dl>
                  <div><dt>Diagnosis</dt><dd>15 min</dd></div>
                  <div><dt>Response</dt><dd>{'< 24h'}</dd></div>
                  <div><dt>Live URL</dt><dd>4 weeks</dd></div>
                </dl>
                <p className="ser">Available for two new projects this quarter.</p>
              </aside>
            </div>
          </section>
  );
}
