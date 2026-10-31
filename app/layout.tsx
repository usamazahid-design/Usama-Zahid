import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import './authentic-dark.css';
import Navigation from '@/components/Navigation';
import { JsonLd, OrganizationSchema } from '@/lib/seo';

import LenisProvider from '@/components/providers/LenisProvider';
import DeferredCustomCursor from '@/components/DeferredCustomCursor';
import DeferredAnalytics from '@/components/DeferredAnalytics';
import Preloader from '@/components/Preloader';
import PreloaderDismiss from '@/components/PreloaderDismiss';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  // Fewer weights = less font bytes on mobile critical path
  weight: ['400', '600', '700'],
  preload: true,
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400'],
  preload: false,
});

const baseUrl = 'https://usamazahid.design';
const ogImage = {
  url: '/images/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Usama Zahid, Brand & Product Designer | Brand-to-URL',
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Usama Zahid — Brand Identity, Product UI/UX & Next.js Designer (Live in 4 Weeks)',
    template: '%s | Usama Zahid',
  },
  description:
    'Independent Brand & Product Designer. Brand identity systems, UI/UX product design, and production Next.js websites built together in 4 weeks (127% brand lift, 58% fewer UX errors). Try the free Brand Kit Generator.',
  keywords: [
    'Brand & Product Designer',
    'Brand and Product Designer',
    'Brand & Product Design',
    'Brand Designer',
    'Product Designer',
    'Brand to URL',
    'Brand-to-URL',
    'brand identity designer',
    'product UX designer',
    'UI/UX designer',
    'website designer and developer',
    'brand strategy and identity',
    'design to code',
    'Next.js developer',
    'Usama Zahid',
    'freelance brand and product designer',
    'fractional product designer',
    'product design services',
  ],
  authors: [{ name: 'Usama Zahid', url: 'https://usamazahid.design/' }],
  creator: 'Usama Zahid',
  publisher: 'Usama Zahid',
  icons: {
    icon: [
      { url: '/images/favicon.ico', sizes: 'any' },
      { url: '/images/favicon.png', type: 'image/png' },
      { url: '/images/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: { url: '/images/favicon.svg', type: 'image/svg+xml' },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Usama Zahid',
    title: 'Usama Zahid — Brand & Product Designer | Brand-to-URL',
    description:
      'Brand & Product Designer. Strategy, brand identity, product UX, and production code built as one continuous system.',
    url: `${baseUrl}/`,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Usama Zahid — Brand & Product Designer | Brand-to-URL',
    description:
      'Brand & Product Designer. Strategy, brand identity, product UX, and production code built as one continuous system.',
    creator: '@usama2017a',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: `${baseUrl}/`,
    languages: {
      'en-US': `${baseUrl}/`,
      'x-default': `${baseUrl}/`,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#FDFDFD',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`authentic-route ready ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        <Script src="/theme-boot.js" strategy="beforeInteractive" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://us-assets.i.posthog.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://app.cal.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://us-assets.i.posthog.com" />
        <link rel="dns-prefetch" href="https://app.cal.com" />
        <link rel="alternate" type="text/plain" href="https://usamazahid.design/llms.txt" title="LLM Context (llms.txt)" />
      </head>
      <body suppressHydrationWarning>
        <Preloader />
        <PreloaderDismiss />
        <JsonLd data={OrganizationSchema()} />
        <div className="page-grid" aria-hidden="true" />
        <div className="atmospheric-noise" aria-hidden="true" />

        <div data-site-chrome>
          <Navigation />
        </div>

        <LenisProvider>
          <DeferredAnalytics />
          <DeferredCustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
