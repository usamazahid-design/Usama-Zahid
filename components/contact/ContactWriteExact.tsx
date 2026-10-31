'use client';

import React, { useState, useEffect, useRef } from 'react';
import { submitWeb3Form } from '@/lib/web3forms';

const SERVICE_OPTIONS = [
  'Brand identity',
  'Website',
  'Product design',
  'Brand and website together',
];

export default function ContactWriteExact() {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(['Brand and website together']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resultText, setResultText] = useState('');

  const toggleNeed = (need: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(need) ? prev.filter((item) => item !== need) : [...prev, need]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    setResultText('Sending...');

    const picked = selectedNeeds.join(', ') || 'Not specified';
    const body = `Name: ${name.trim()}
Email: ${email.trim()}
Needs: ${picked}

Message:
${message.trim()}`;
    const response = await submitWeb3Form({
      name: name.trim(),
      email: email.trim(),
      message: body,
      subject: `Project enquiry from ${name.trim()}`,
      fromName: 'Contact Write Form',
    });

    setSubmitting(false);
    if (!response.success) {
      setResultText('Submission failed. Please try again.');
      return;
    }

    setResultText('Form submitted successfully.');
    setName('');
    setEmail('');
    setMessage('');
    setSelectedNeeds(['Brand and website together']);
  };

  // Scroll reveal setup
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const rvs = Array.from(el.querySelectorAll<HTMLElement>('.sh, .wr > *'));
    rvs.forEach((item, i) => {
      item.classList.add('rv');
      item.style.setProperty('--d', `${(i % 3) * 0.08}s`);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('vis');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );

    rvs.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="pad"
      id="write"
      style={{ paddingTop: 'clamp(80px, 12vw, 170px)' }}
    >
      <div className="sh">
        <span className="lab">Write to me</span>
        <span className="lab">If you prefer a note</span>
      </div>

      <div className="wr">
        {/* Left Column: Context & Metadata */}
        <div>
          <h2>Tell me what you are building.</h2>
          <p className="dek">
            Say what exists today, what you need and when. I read every message myself.
          </p>
          <dl className="info">
            <dt>Email</dt>
            <dd>
              <a href="mailto:hello.usamazahid@gmail.com">hello.usamazahid@gmail.com</a>
            </dd>
            <dt>Based in</dt>
            <dd>Lahore, Pakistan</dd>
            <dt>Works with</dt>
            <dd>Pre-seed to Series A SaaS and AI founders</dd>
            <dt>Delivery</dt>
            <dd>Brand identity and website, in four weeks</dd>
          </dl>
        </div>

        {/* Right Column: Direct Note Form */}
        <form className="cf" onSubmit={handleSubmit}>
          <fieldset>
            <legend>What do you need?</legend>
            <div className="chips" role="group" aria-label="Project scope needs">
              {SERVICE_OPTIONS.map((opt) => {
                const isSelected = selectedNeeds.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    className="chip"
                    aria-pressed={isSelected}
                    onClick={() => toggleNeed(opt)}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="fld">
            Your name
            <input
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
            />
          </label>

          <label className="fld">
            Your email
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
            />
          </label>

          <label className="fld">
            Your message
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What exists today, what you need and your timeline"
            />
          </label>

          <button className="pbtn" type="submit" data-cur="Write">
            {submitting ? 'Sending...' : 'Send the message'}
          </button>

          <p className="cnote">
            {resultText || 'Submissions are sent directly from this form.'}
          </p>
        </form>
      </div>
    </section>
  );
}
