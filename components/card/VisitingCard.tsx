'use client';

import CardPageTransition from './CardPageTransition';
import CardCursor from './CardCursor';
import BusinessCard from './BusinessCard';
import CardShareButton from './CardShareButton';

export default function VisitingCard() {
  return (
    <>
      <CardPageTransition />
      <CardCursor />

      <div className="relative flex min-h-svh min-h-[100dvh] items-center justify-center overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 35%, rgba(75,63,255,0.12) 0%, transparent 70%)',
          }}
        />
        <div className="hero-grid-overlay pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />

        <BusinessCard />
      </div>

      <CardShareButton />
    </>
  );
}
