import { Metadata } from 'next';
import RedirectPage from '@/components/RedirectPage';

export const metadata: Metadata = {
  title: 'Website | Redirecting',
  robots: { index: false, follow: true },
};

export default function Page() {
  return <RedirectPage to="/services/engineering" />;
}
