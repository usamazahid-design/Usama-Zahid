import { cv } from '@/lib/cv-data';

function pretty(s: string) {
  return s.replace(/_/g, ' ');
}

export default function CVEducation() {
  return (
    <section className="pad" id="cv-education">
      <div className="sh">
        <span className="lab">Education</span>
        <span className="lab">Fig. 02. Foundations</span>
      </div>

      <div className="paper-list">
        {cv.education.map((ed) => (
          <article key={ed.degree}>
            <span className="lab">
              {ed.year} · {pretty(ed.location)}
            </span>
            <h3>{pretty(ed.degree)}</h3>
            <p>
              {pretty(ed.institution)}. {ed.focus}. {ed.details}
            </p>
          </article>
        ))}
      </div>

      <div className="sh" style={{ marginTop: 48 }}>
        <span className="lab">Certifications</span>
        <span className="lab">{cv.certifications.length} credentials</span>
      </div>
      <div className="lens">
        {cv.certifications.map((c) => (
          <div key={c.title} className="lc">
            <span className="lab">{c.year}</span>
            <h3 style={{ fontSize: 'clamp(22px, 2.4vw, 32px)' }}>{c.title}</h3>
            <p>{pretty(c.issuer)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
