'use client';

import { useEffect, useState } from 'react';
import { submitWeb3Form } from '@/lib/web3forms';

interface ProductAccessPopupProps {
  productName: string;
  productSlug: string;
  triggerLabel?: string;
  deliveryMode?: 'link' | 'file' | 'email';
  deliveryUrl?: string;
  deliveryLabel?: string;
}

export default function ProductAccessPopup({
  productName,
  productSlug,
  triggerLabel = 'Get free access',
  deliveryMode = 'email',
  deliveryUrl,
  deliveryLabel,
}: ProductAccessPopupProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [bottleneck, setBottleneck] = useState<'launching' | 'launching-brand' | 'refreshing' | 'browsing'>('launching');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resultText, setResultText] = useState('');

  useEffect(() => {
    if (!success) return;
    const id = window.setTimeout(() => {
      setOpen(false);
      setSuccess(false);
      setName('');
      setEmail('');
      setWebsite('');
      setBottleneck('launching');
      setResultText('');
    }, 1800);
    return () => window.clearTimeout(id);
  }, [success]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setResultText('Sending...');

    const lead = {
      productName,
      productSlug,
      name,
      email,
      website,
      bottleneck,
      submittedAt: new Date().toISOString(),
    };

    try {
      const existing = window.localStorage.getItem('product_leads');
      const parsed = existing ? JSON.parse(existing) : [];
      const leads = Array.isArray(parsed) ? parsed : [];
      leads.push(lead);
      window.localStorage.setItem('product_leads', JSON.stringify(leads));
    } catch {
      // Keep submit flow resilient even when storage is unavailable.
    }

    const message = [
      `Product: ${productName}`,
      `Slug: ${productSlug}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Website URL: ${website}`,
      `Biggest bottleneck: ${
        bottleneck === 'launching'
          ? 'Launching a new product'
          : bottleneck === 'launching-brand'
            ? 'Launching a new brand'
          : bottleneck === 'refreshing'
            ? 'Refreshing an outdated brand/UI'
            : 'Just browsing'
      }`,
      `Delivery mode: ${deliveryMode}`,
      `Delivery label: ${deliveryLabel || 'N/A'}`,
      `Delivery URL: ${deliveryUrl || 'N/A'}`,
      '',
      'Free product access request.',
    ].join('\n');

    const response = await submitWeb3Form({
      name,
      email,
      message,
      subject: `PRODUCT_ACCESS_REQUEST · ${productSlug}`,
      fromName: 'Product Access Form',
    });

    setSubmitting(false);
    if (!response.success) {
      setResultText('Submission failed. Please try again.');
      return;
    }

    setResultText('Form submitted successfully.');
    setSuccess(true);

    if (!deliveryUrl) return;
    window.setTimeout(() => {
      if (deliveryMode === 'file') {
        const a = document.createElement('a');
        a.href = deliveryUrl;
        a.target = '_blank';
        a.rel = 'noopener';
        a.download = '';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return;
      }
      window.open(deliveryUrl, '_blank', 'noopener');
    }, 500);
  };

  return (
    <>
      <button className="btn" type="button" onClick={() => setOpen(true)} data-cur="Access">
        {triggerLabel} <span aria-hidden>→</span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.62)' }}
        >
          <div
            className="w-full max-w-[520px] p-6"
            style={{ background: 'var(--card)', border: '1px solid var(--line)' }}
          >
            {!success ? (
              <>
                <div className="sh">
                  <span className="lab">Free access request</span>
                  <button type="button" className="lab" onClick={() => setOpen(false)}>
                    Close
                  </button>
                </div>
                <h3 style={{ marginBottom: 12 }}>{productName}</h3>
                <p style={{ color: 'var(--mute)', marginBottom: 20 }}>
                  Add your details to unlock this free resource.
                </p>
                {deliveryUrl ? (
                  <p style={{ color: 'var(--mute)', marginBottom: 16, fontSize: 13 }}>
                    Delivery: {deliveryLabel || (deliveryMode === 'file' ? 'File download' : 'Open resource link')}
                  </p>
                ) : null}

                <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    style={{
                      height: 44,
                      border: '1px solid var(--line)',
                      background: 'transparent',
                      padding: '0 12px',
                    }}
                  />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Work email"
                    style={{
                      height: 44,
                      border: '1px solid var(--line)',
                      background: 'transparent',
                      padding: '0 12px',
                    }}
                  />
                  <input
                    required
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Website (example.com or https://example.com)"
                    inputMode="url"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                    style={{
                      height: 44,
                      border: '1px solid var(--line)',
                      background: 'transparent',
                      padding: '0 12px',
                    }}
                  />
                  <fieldset style={{ border: '1px solid var(--line)', padding: 12 }}>
                    <legend style={{ padding: '0 6px', fontSize: 12, color: 'var(--mute)' }}>
                      What is your biggest bottleneck right now?
                    </legend>
                    <label style={{ display: 'block', marginBottom: 8 }}>
                      <input
                        type="radio"
                        name="bottleneck"
                        value="launching"
                        checked={bottleneck === 'launching'}
                        onChange={() => setBottleneck('launching')}
                      />{' '}
                      Launching a new product
                    </label>
                    <label style={{ display: 'block', marginBottom: 8 }}>
                      <input
                        type="radio"
                        name="bottleneck"
                        value="launching-brand"
                        checked={bottleneck === 'launching-brand'}
                        onChange={() => setBottleneck('launching-brand')}
                      />{' '}
                      Launching a new brand
                    </label>
                    <label style={{ display: 'block', marginBottom: 8 }}>
                      <input
                        type="radio"
                        name="bottleneck"
                        value="refreshing"
                        checked={bottleneck === 'refreshing'}
                        onChange={() => setBottleneck('refreshing')}
                      />{' '}
                      Refreshing an outdated brand/UI
                    </label>
                    <label style={{ display: 'block' }}>
                      <input
                        type="radio"
                        name="bottleneck"
                        value="browsing"
                        checked={bottleneck === 'browsing'}
                        onChange={() => setBottleneck('browsing')}
                      />{' '}
                      Just browsing
                    </label>
                  </fieldset>
                  <button className="btn" type="submit">
                    {submitting ? 'Sending...' : 'Submit request'} <span aria-hidden>→</span>
                  </button>
                  {resultText ? (
                    <p style={{ color: 'var(--mute)', fontSize: 13 }}>{resultText}</p>
                  ) : null}
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <h3 style={{ marginBottom: 8 }}>Congratulations</h3>
                <p style={{ color: 'var(--mute)' }}>
                  Your request is submitted successfully.
                </p>
                {deliveryUrl ? (
                  <p style={{ color: 'var(--mute)', fontSize: 13, marginTop: 8 }}>
                    Opening your free resource...
                  </p>
                ) : null}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
