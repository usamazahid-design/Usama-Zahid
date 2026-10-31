'use client';

import { useState } from 'react';

interface ProductLeadFormProps {
  productName: string;
  productSlug: string;
}

export default function ProductLeadForm({ productName, productSlug }: ProductLeadFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(`PRODUCT_ACCESS_REQUEST · ${productSlug}`);
    const body = encodeURIComponent(
      [
        `Product: ${productName}`,
        `Slug: ${productSlug}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || 'N/A'}`,
        '',
        'Please share the free product access details.',
      ].join('\n'),
    );

    setSubmitted(true);
    window.location.href = `mailto:hello.usamazahid@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block font-mono text-[10px] tracking-[0.2em] text-uz-slate uppercase mb-2">
          Full Name
        </label>
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full h-12 px-4 bg-transparent border border-uz-graphite text-uz-white focus:border-uz-indigo outline-none"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block font-mono text-[10px] tracking-[0.2em] text-uz-slate uppercase mb-2">
          Work Email
        </label>
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full h-12 px-4 bg-transparent border border-uz-graphite text-uz-white focus:border-uz-indigo outline-none"
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label className="block font-mono text-[10px] tracking-[0.2em] text-uz-slate uppercase mb-2">
          Company (optional)
        </label>
        <input
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="w-full h-12 px-4 bg-transparent border border-uz-graphite text-uz-white focus:border-uz-indigo outline-none"
          placeholder="Company name"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-3 h-12 px-6 bg-uz-indigo text-uz-white font-mono text-[11px] tracking-[0.15em] uppercase"
      >
        Get free access <span aria-hidden>→</span>
      </button>

      <p className="font-mono text-[10px] text-uz-slate tracking-[0.15em] uppercase">
        No payment required · Email request only
      </p>

      {submitted ? (
        <p className="text-uz-silver text-sm">
          If your email app did not open, send manually: hello.usamazahid@gmail.com
        </p>
      ) : null}
    </form>
  );
}
