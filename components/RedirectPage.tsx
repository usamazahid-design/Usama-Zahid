'use client';

import { useEffect } from 'react';

export default function RedirectPage({ to }: { to: string }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.replace(to);
    }
  }, [to]);

  return (
    <main className="relative w-full min-h-screen bg-uz-black flex items-center justify-center">
      <div className="text-center px-6">
        <p className="font-mono text-[11px] text-uz-indigo tracking-[0.3em] uppercase mb-4">
          REDIRECTING
        </p>
        <p className="text-uz-silver text-[15px]">
          Taking you to{' '}
          <a href={to} className="text-uz-white underline">
            {to}
          </a>
          …
        </p>
        <meta httpEquiv="refresh" content={`0; url=${to}`} />
      </div>
    </main>
  );
}
