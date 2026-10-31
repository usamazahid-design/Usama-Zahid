import { cv } from '@/lib/cv-data';

export default function CVLanguages() {
  return (
    <section className="pad" id="cv-languages">
      <div className="sh">
        <span className="lab">Languages</span>
        <span className="lab">Fig. 04. How we communicate</span>
      </div>
      <div className="pf" style={{ marginTop: 0 }}>
        {cv.languages.map((lang) => (
          <div key={lang.code}>
            <b style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>{lang.name}</b>
            <span>{lang.level.toLowerCase()}</span>
            <em>{lang.flag === 'PK' ? 'Pakistan' : 'International work'}</em>
          </div>
        ))}
        <div>
          <b style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>Remote</b>
          <span>Ready</span>
          <em>PK · QA · UAE · AU</em>
        </div>
        <div>
          <b style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>UTC+5</b>
          <span>Timezone</span>
          <em>Lahore, Pakistan</em>
        </div>
      </div>
    </section>
  );
}
