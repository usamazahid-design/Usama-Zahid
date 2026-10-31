'use client';

import Link from 'next/link';
import { cv } from '@/lib/cv-data';

function pretty(s: string) {
  return s.replace(/_/g, ' ');
}

export default function CVSummary() {
  return (
    <section className="pad" id="cv-summary">
      <div className="sh">
        <span className="lab">Summary</span>
        <span className="lab">Fig. 01. Who you are hiring</span>
      </div>

      <div className="ab cv-summary">
        <div className="cv-summary-aside">
          <h2>Brand and product, brief to live URL.</h2>
          <dl className="cv-contact">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${cv.email}`}>{cv.email}</a>
              </dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:${cv.phone.replace(/\s/g, '')}`}>{cv.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>Lahore, PK · UTC+5</dd>
            </div>
            <div>
              <dt>Open to</dt>
              <dd>{cv.openTo}</dd>
            </div>
          </dl>
        </div>

        <div className="cv-summary-copy">
          <p className="cv-summary-lead">
            <b>Brand & Product Designer with seven years in practice.</b> Brand-to-URL systems,
            identities, and digital products for startups and agencies across Pakistan, Qatar, UAE,
            and Australia.
          </p>
          <p>{cv.summary}</p>
          <p className="ser cv-summary-open">Open to · {cv.openTo}</p>
          <div className="ab-actions">
            <a className="btn" href={cv.pdfUrl} download={cv.pdfLabel} data-cur="CV">
              Download PDF <span aria-hidden="true">&rarr;</span>
            </a>
            <Link className="btn btn-ghost" href="/portfolio/" data-cur="Work">
              View case studies <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <p className="ser cv-summary-links">
            Elsewhere:{' '}
            {cv.socials.map((s, i) => (
              <span key={s.label}>
                {i > 0 ? ' · ' : ''}
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {pretty(s.label)}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
