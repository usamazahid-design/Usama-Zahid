import { cv } from '@/lib/cv-data';

export default function CVSkills() {
  return (
    <section className="pad" id="cv-skills">
      <div className="sh">
        <span className="lab">Capabilities</span>
        <span className="lab">Fig. 03. How the work gets done</span>
      </div>

      <div className="sv" style={{ marginTop: 0 }}>
        <div className="sv-l">
          <h2>Skills</h2>
          <p>Research, brand, product UI, and enough engineering to ship without a handoff gap.</p>
          <span className="big">{cv.skills.length}</span>
          <span className="mono">capability groups</span>
        </div>
        <div>
          {cv.skills.map((group) => (
            <article key={group.code} className="paper-card">
              <span className="lab">
                {group.code} · {group.full}
              </span>
              <h3 style={{ fontSize: 'clamp(26px, 3vw, 40px)', marginTop: 8 }}>{group.full}</h3>
              <ul className="cv-skill-list">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <b>{item.name}</b>
                    <span>
                      {item.level.toLowerCase()} · {item.years}y
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
