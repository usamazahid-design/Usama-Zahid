'use client';

import { useEffect } from 'react';

export default function CardLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add('card-route');
    return () => document.documentElement.classList.remove('card-route');
  }, []);

  return children;
}
