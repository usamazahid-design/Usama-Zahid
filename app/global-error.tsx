'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    void import('posthog-js')
      .then(({ default: posthog }) => {
        posthog.captureException(error);
      })
      .catch(() => {
        // ignore analytics failures on the error boundary
      });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main>
          <h1>Something went wrong</h1>
          <button type="button" onClick={() => reset()}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
