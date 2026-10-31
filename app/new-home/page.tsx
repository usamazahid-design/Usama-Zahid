import RedirectPage from '@/components/RedirectPage';

/** Legacy alias — Authentic home now lives at `/`. */
export default function NewHomeRedirect() {
  return <RedirectPage to="/" />;
}
