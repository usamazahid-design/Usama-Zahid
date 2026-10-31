import Link from 'next/link';
import type { ReactNode } from 'react';

const ENTITY_MAP: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': "'",
  '&#39;': "'",
  '&nbsp;': '\u00a0',
  '&rsquo;': '\u2019',
  '&lsquo;': '\u2018',
  '&rdquo;': '\u201d',
  '&ldquo;': '\u201c',
  '&mdash;': '\u2014',
  '&ndash;': '\u2013',
  '&hellip;': '\u2026',
  '&middot;': '\u00b7',
  '&rarr;': '\u2192',
  '&larr;': '\u2190',
  '&times;': '\u00d7',
  '&copy;': '\u00a9',
};

/** Decode common HTML entities to plain text (no DOM). */
export function decodeEntities(input: string): string {
  return input.replace(/&[#a-zA-Z0-9]+;/g, (entity) => {
    if (ENTITY_MAP[entity]) return ENTITY_MAP[entity];
    const num = entity.match(/^&#(\d+);$/);
    if (num) return String.fromCharCode(Number(num[1]));
    const hex = entity.match(/^&#x([0-9a-fA-F]+);$/);
    if (hex) return String.fromCharCode(parseInt(hex[1], 16));
    return entity;
  });
}

const TAG_RE =
  /<(a|strong|em|b|i|br)(\s[^>]*)?\/?>|<\/(a|strong|em|b|i)>/gi;

/**
 * Parse a small, trusted HTML subset used in content strings into React nodes.
 * Supports: a[href], strong/b, em/i, br, and HTML entities.
 */
export function parseRichText(html: string): ReactNode[] {
  const src = html || '';
  const nodes: ReactNode[] = [];
  let i = 0;
  let key = 0;

  const pushText = (raw: string) => {
    if (!raw) return;
    nodes.push(decodeEntities(raw));
  };

  while (i < src.length) {
    TAG_RE.lastIndex = i;
    const match = TAG_RE.exec(src);
    if (!match) {
      pushText(src.slice(i));
      break;
    }

    if (match.index > i) {
      pushText(src.slice(i, match.index));
    }

    const full = match[0];
    const openName = (match[1] || '').toLowerCase();

    if (full.startsWith('</')) {
      // Unmatched close — skip
      i = match.index + full.length;
      continue;
    }

    if (openName === 'br') {
      nodes.push(<br key={`br-${key++}`} />);
      i = match.index + full.length;
      continue;
    }

    const openEnd = match.index + full.length;
    const closeRe = new RegExp(`</${openName}>`, 'i');
    const rest = src.slice(openEnd);
    const closeMatch = closeRe.exec(rest);
    if (!closeMatch) {
      pushText(full);
      i = openEnd;
      continue;
    }

    const inner = rest.slice(0, closeMatch.index);
    const after = openEnd + closeMatch.index + closeMatch[0].length;

    if (openName === 'a') {
      const hrefMatch = full.match(/href=["']([^"']+)["']/i);
      const href = hrefMatch?.[1] || '#';
      const text = decodeEntities(inner.replace(/<[^>]+>/g, ''));
      const isInternal = href.startsWith('/') && !href.startsWith('//');
      const className =
        'text-uz-indigo underline underline-offset-4 hover:text-uz-white transition-colors';
      nodes.push(
        isInternal ? (
          <Link key={`a-${key++}`} href={href} className={className}>
            {text}
          </Link>
        ) : (
          <a
            key={`a-${key++}`}
            href={href}
            className={className}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {text}
          </a>
        )
      );
    } else if (openName === 'strong' || openName === 'b') {
      nodes.push(<strong key={`s-${key++}`}>{decodeEntities(inner)}</strong>);
    } else if (openName === 'em' || openName === 'i') {
      nodes.push(<em key={`e-${key++}`}>{decodeEntities(inner)}</em>);
    }

    i = after;
  }

  return nodes;
}

/** Convenience component for inline/block rich text strings. */
export function RichText({
  html,
  as: Tag = 'span',
  className,
}: {
  html: string;
  as?: 'span' | 'p' | 'div';
  className?: string;
}) {
  return <Tag className={className}>{parseRichText(html)}</Tag>;
}

/** Syntax highlight to React nodes — no HTML strings. */
export function highlightCodeNodes(code: string): ReactNode[] {
  const lines = code.split('\n');
  const out: ReactNode[] = [];

  lines.forEach((line, lineIdx) => {
    if (lineIdx > 0) out.push('\n');

    const commentIdx = line.indexOf('//');
    const codePart = commentIdx >= 0 ? line.slice(0, commentIdx) : line;
    const comment = commentIdx >= 0 ? line.slice(commentIdx) : '';

    let last = 0;
    const re = /('|")(.*?)\1|\b(import|from|const|let|var|function|return|if|else|export|default|async|await|use|useEffect|useState|useRef|useMemo|useCallback|new|class|extends|true|false|null|undefined)\b/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(codePart))) {
      if (m.index > last) out.push(codePart.slice(last, m.index));
      if (m[1]) {
        out.push(
          <span key={`str-${lineIdx}-${m.index}`} style={{ color: '#9A9A9A' }}>
            {m[0]}
          </span>
        );
      } else {
        out.push(
          <span key={`kw-${lineIdx}-${m.index}`} style={{ color: '#4B3FFF' }}>
            {m[0]}
          </span>
        );
      }
      last = m.index + m[0].length;
    }
    if (last < codePart.length) out.push(codePart.slice(last));

    if (comment) {
      out.push(
        <span key={`c-${lineIdx}`} style={{ color: '#9A9A9A' }}>
          {comment}
        </span>
      );
    }
  });

  return out;
}
