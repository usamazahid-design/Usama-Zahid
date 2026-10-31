'use client';

import Script from 'next/script';
export default function CalProvider() {
  return (
    <Script id="cal-embed-script" src="https://app.cal.com/embed/embed.js" strategy="lazyOnload" />
  );
}
