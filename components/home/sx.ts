import type { CSSProperties } from 'react';

/** CSS custom-property friendly style helper for home Exact sections. */
export function sx(styles: CSSProperties & Record<string, string | number>): CSSProperties {
  return styles as CSSProperties;
}
