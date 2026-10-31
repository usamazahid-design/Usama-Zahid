import { Metadata } from 'next';
import RedirectPage from '@/components/RedirectPage';

export const metadata: Metadata = {
  title: 'Brand-to-URL | Redirecting',
  robots: { index: false, follow: true },
};

export default function Page() {
  return <RedirectPage to="/brand-to-url" />;
}
