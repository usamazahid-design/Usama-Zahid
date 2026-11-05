export default function HomeQuoteExact() {
  return (
    <section className="pad pq" id="quote">
            <div className="pq-inner">
              <div className="pq-badge">
                <span className="pq-badge-dot"></span>
                <span className="pq-badge-label">CORE THESIS</span>
              </div>
              <blockquote className="pq-quote">
                “Design is business infrastructure, not aesthetics.”
              </blockquote>
              <div className="pq-author">
                <div className="pq-avatar" style={{ overflow: 'hidden' }}>
                  <img
                    src="/images/usamazahidPic.webp"
                    alt="Usama Zahid"
                    width={46}
                    height={46}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div className="pq-author-info">
                  <span className="pq-name">Usama Zahid</span>
                  <span className="pq-title">Founder · Brand & Product Designer</span>
                </div>
              </div>
            </div>
          </section>
  );
}
