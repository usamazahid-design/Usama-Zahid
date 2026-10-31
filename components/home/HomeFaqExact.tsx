export default function HomeFaqExact() {
  return (
    <section className="pad faqx" id="faq">
          <div className="sh"><span className="lab">FAQ</span><span className="lab">Questions founders ask before briefing</span></div>
          <div className="faq-grid">
          <div className="faq-aside">
          <h2>Frequently asked questions.</h2>
          <p>Everything you need to know about the four-week sprint, deliverables, pricing, and how we collaborate.</p>
          <div className="faq-cta-box">
            <span className="lab">Have a specific question?</span>
            <a className="faq-mail-link" href="mailto:hello.usamazahid@gmail.com" data-cur="Write">hello.usamazahid@gmail.com <span aria-hidden={true}>→</span></a>
          </div>
          </div>
          <div className="faq-list">
          <details className="faq-item" open>
            <summary><span className="faq-num">[01]</span><span className="faq-q">How does the four-week timeline work?</span><span className="faq-icon" aria-hidden={true}></span></summary>
            <div className="faq-ans"><p>Week 1 is Strategy & Positioning (founder interview, competitor audit, sitemap). Week 2 is Identity (logo system, visual language, type, guidelines). Week 3 is Interface (responsive layouts, UX flows, component kit). Week 4 is Production Engineering (clean Next.js/Tailwind code, testing, and deployment to a live URL). One system, one invoice, zero handoff gap.</p></div>
          </details>
          <details className="faq-item">
            <summary><span className="faq-num">[02]</span><span className="faq-q">What is included in the Brand-to-URL delivery?</span><span className="faq-icon" aria-hidden={true}></span></summary>
            <div className="faq-ans"><p>You receive a comprehensive visual identity system (Figma library and documented guidelines), production-ready responsive website codebase deployed on your infrastructure, complete SEO metadata, social launch assets, and 30 days of post-launch iteration support.</p></div>
          </details>
          <details className="faq-item">
            <summary><span className="faq-num">[03]</span><span className="faq-q">Do you design and code, or just design?</span><span className="faq-icon" aria-hidden={true}></span></summary>
            <div className="faq-ans"><p>Both. I design in Figma and engineer production code using Next.js, React, TypeScript, and modern CSS/Tailwind. Because the same person architects the system from brief to code, the design on your screen never gets compromised or lost in translation between separate teams.</p></div>
          </details>
          <details className="faq-item">
            <summary><span className="faq-num">[04]</span><span className="faq-q">How are projects priced and invoiced?</span><span className="faq-icon" aria-hidden={true}></span></summary>
            <div className="faq-ans"><p>Fixed scope, fixed price, milestone invoicing. Engagements start with clear terms and transparent deliverables. No surprise change orders, no unpredictable hourly billing. You know exactly what ships and when it goes live.</p></div>
          </details>
          <details className="faq-item">
            <summary><span className="faq-num">[05]</span><span className="faq-q">Can we collaborate if we already have an existing brand or app?</span><span className="faq-icon" aria-hidden={true}></span></summary>
            <div className="faq-ans"><p>Yes. Many engagements begin with a friction and UX audit of an existing product or website. We pinpoint where users drop off, preserve your established brand equity, and rebuild the interface and design system to scale.</p></div>
          </details>
          <details className="faq-item">
            <summary><span className="faq-num">[06]</span><span className="faq-q">What happens after launch?</span><span className="faq-icon" aria-hidden={true}></span></summary>
            <div className="faq-ans"><p>Every project includes a 30-day warranty and post-launch iteration window for fine-tuning. For ongoing needs, flexible monthly retainers are available covering new feature UI/UX, conversion rate optimization, and brand asset expansions.</p></div>
          </details>
          </div>
          </div>
          </section>
  );
}
