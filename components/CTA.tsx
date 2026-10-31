'use client';

import React from 'react';
import Link from 'next/link';
import UMarkLogo from './UMarkLogo';

interface CTAProps {
  id?: string;
  label?: string;
  figLabel?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  buttonText?: string;
  buttonHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  statusText?: string;
  availabilityText?: string;
  marqueeItems?: string[];
  socialProof?: React.ReactNode;
}

export default function CTA({
  id = 'contact',
  label = 'Start a project',
  figLabel = 'Fig. 06. Direct with the founder',
  title = 'Four weeks from brand to live URL.',
  subtitle = (
    <>
      <b>Brand identity and a production-ready website, built together as one system.</b> You
      brief the person who designs it and writes the code. One invoice, no handoff.
    </>
  ),
  buttonText = 'Book a strategy call',
  buttonHref = 'https://cal.com/usama-zahid-haadwj/15min',
  secondaryText = 'Send a brief',
  secondaryHref = '/contact/',
  statusText,
  availabilityText = 'Available for two new projects this quarter.',
}: CTAProps) {
  const plateNote = statusText || availabilityText;
  const isExternal = buttonHref.startsWith('http');

  return (
    <section className="cta pad" id={id}>
      <div className="sh">
        <span className="lab">{label}</span>
        <span className="lab">{figLabel}</span>
      </div>
      <div className="cta-grid">
        <div className="cta-copy">
          <h2>{title}</h2>
          <p className="sub">{subtitle}</p>
          <div className="cta-actions">
            <a
              className="btn"
              href={buttonHref}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener' : undefined}
              data-cur="Calendar"
            >
              {buttonText} <span aria-hidden="true">&rarr;</span>
            </a>
            <Link className="btn btn-ghost" href={secondaryHref} data-cur="Contact">
              {secondaryText} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <p className="rw">
            Or write directly:{' '}
            <a href="mailto:hello.usamazahid@gmail.com">hello.usamazahid@gmail.com</a>
          </p>
        </div>
        <aside className="cta-plate" aria-label="How a project starts">
          <UMarkLogo size={72} className="mk" />
          <dl>
            <div>
              <dt>Diagnosis</dt>
              <dd>15 min</dd>
            </div>
            <div>
              <dt>Response</dt>
              <dd>&lt; 24h</dd>
            </div>
            <div>
              <dt>Live URL</dt>
              <dd>4 weeks</dd>
            </div>
          </dl>
          <p className="ser">{plateNote}</p>
        </aside>
      </div>
    </section>
  );
}
