import type { Metadata } from 'next';
import NotFoundView from '@/components/NotFoundView';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '404 | Page not found',
  description: 'This route is not in the system. Return to the index or pick a live page.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="relative w-full bg-uz-black">
      <NotFoundView />
      <Footer />
    </main>
  );
}
