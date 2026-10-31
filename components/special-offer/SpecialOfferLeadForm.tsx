'use client';

import { useState } from 'react';
import { submitWeb3Form } from '@/lib/web3forms';

export default function SpecialOfferLeadForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [timeline, setTimeline] = useState('2-4 weeks');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');

    const payload = [
      `Offer: Brand-to-URL Sprint`,
      `Name: ${name}`,
      `Work Email: ${email}`,
      `Company: ${company || 'N/A'}`,
      `Website: ${website || 'N/A'}`,
      `Preferred timeline: ${timeline}`,
      '',
      `Project context:`,
      message || '(not provided)',
    ].join('\n');

    const response = await submitWeb3Form({
      name,
      email,
      subject: 'SPECIAL_OFFER_LEAD · Brand-to-URL Sprint',
      fromName: 'Special Offer Form',
      message: payload,
    });

    if (!response.success) {
      setStatus('error');
      return;
    }

    setStatus('success');
    setName('');
    setEmail('');
    setCompany('');
    setWebsite('');
    setTimeline('2-4 weeks');
    setMessage('');
  };

  return (
    <section className="pad" id="offer-form">
      <div className="wh">
        <h2>Apply for this offer</h2>
        <span className="lab">Client information form</span>
      </div>

      <div style={{ border: '1px solid var(--line)', background: 'var(--card)', padding: 'clamp(16px,2.5vw,28px)' }}>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            style={{ height: 46, border: '1px solid var(--line)', background: 'transparent', padding: '0 12px' }}
          />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Work email"
            style={{ height: 46, border: '1px solid var(--line)', background: 'transparent', padding: '0 12px' }}
          />
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company / startup"
            style={{ height: 46, border: '1px solid var(--line)', background: 'transparent', padding: '0 12px' }}
          />
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Website URL (https://...)"
            style={{ height: 46, border: '1px solid var(--line)', background: 'transparent', padding: '0 12px' }}
          />

          <select
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            style={{ height: 46, border: '1px solid var(--line)', background: 'transparent', padding: '0 12px' }}
          >
            <option value="2-4 weeks">Timeline: 2-4 weeks</option>
            <option value="1-2 months">Timeline: 1-2 months</option>
            <option value="2+ months">Timeline: 2+ months</option>
            <option value="just exploring">Just exploring</option>
          </select>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="btn" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Submit application'} <span aria-hidden>→</span>
            </button>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What are you building and what do you need help with?"
            className="md:col-span-2"
            style={{ minHeight: 120, border: '1px solid var(--line)', background: 'transparent', padding: 12 }}
          />
        </form>

        <p style={{ marginTop: 10, color: 'var(--mute)', fontSize: 13 }}>
          {status === 'success' && 'Application sent successfully. I will reply with next steps.'}
          {status === 'error' && 'Submission failed. Please try again.'}
          {status === 'idle' && 'This goes directly to the offer lead inbox.'}
          {status === 'sending' && 'Submitting your details...'}
        </p>
      </div>
    </section>
  );
}
