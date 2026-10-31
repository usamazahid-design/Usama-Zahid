'use client';

const faqs = [
  {
    q: 'What role fit should this profile be considered for?',
    a: 'Brand & Product Designer. The profile combines product UX, brand systems, and delivery collaboration in one role.',
  },
  {
    q: 'Is this candidate available for remote and international collaboration?',
    a: 'Yes. Based in Lahore (UTC+5) with previous collaboration across Pakistan, Qatar, UAE, and Australia.',
  },
  {
    q: 'Can we start with a short screening call?',
    a: 'Yes. Use the booking CTA on this page to schedule a short intro call directly without leaving the site.',
  },
  {
    q: 'Where can we verify practical project outcomes quickly?',
    a: 'Portfolio highlights and full case studies are linked above, with role, scope, and measurable outcomes.',
  },
];

export default function HireFaqExact() {
  return (
    <section className="pad faqx" id="hire-faq">
      <div className="sh">
        <span className="lab">FAQ</span>
        <span className="lab">Questions recruiters ask first</span>
      </div>
      <div className="faq-grid">
        <div className="faq-aside">
          <h2>Recruiter FAQ.</h2>
          <p>Role fit, availability, screening, and where to verify shipped outcomes.</p>
          <div className="faq-cta-box">
            <span className="lab">Prefer email?</span>
            <a
              className="faq-mail-link"
              href="mailto:hello.usamazahid@gmail.com"
              data-cur="Write"
            >
              hello.usamazahid@gmail.com <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <details key={faq.q} className="faq-item" open={i === 0}>
              <summary>
                <span className="faq-num">[{String(i + 1).padStart(2, '0')}]</span>
                <span className="faq-q">{faq.q}</span>
                <span className="faq-icon" aria-hidden="true" />
              </summary>
              <div className="faq-ans">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
