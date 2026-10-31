import { cv } from '@/lib/cv-data';

export default function CVPrint() {
  return (
    <section className="pad" id="cv-print">
      <div className="paper-sh">
        <div>
          <h2>Take the PDF</h2>
          <p className="ser" style={{ marginTop: 10, maxWidth: '36ch' }}>
            Same profile, printable. Or book a call if you already know the fit.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a className="btn" href={cv.pdfUrl} download={cv.pdfLabel} data-cur="CV">
            Download CV <span aria-hidden="true">&rarr;</span>
          </a>
          <a
            className="btn btn-ghost"
            href="https://cal.com/usama-zahid-haadwj/15min"
            target="_blank"
            rel="noopener noreferrer"
            data-cur="Calendar"
          >
            Book intro call <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
