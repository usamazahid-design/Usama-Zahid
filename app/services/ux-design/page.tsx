import { Metadata } from 'next';
import RedirectPage from '@/components/RedirectPage';

export const metadata: Metadata = {
  title: 'UX Design | Redirecting',
  robots: { index: false, follow: true },
};

export default function Page() {
  return <RedirectPage to="/services/product" />;
}
