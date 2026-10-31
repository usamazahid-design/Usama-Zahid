'use client';

/**
 * Static mark only — no framer-motion.
 * Keeps Footer / 404 out of the heavy motion shared chunk.
 */
export default function UMarkLogo({
  size = 24,
  animated: _animated = false,
  className = '',
}: {
  size?: number;
  animated?: boolean;
  className?: string;
}) {
  const w = 540;
  const h = 458;
  const autoH = Math.round((h / w) * size);
  const svgClass = ['flex-shrink-0', className].filter(Boolean).join(' ');

  return (
    <svg
      width={size}
      height={autoH}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={svgClass}
      style={{ color: 'var(--ink)' }}
      aria-hidden="true"
    >
      <path d="M539.693 340.438H422.398V457.732H539.693V340.438Z" fill="var(--ind, #4B3FFF)" />
      <path d="M117.295 0H0V340.435H117.295V0Z" fill="currentColor" />
      <path
        d="M422.398 340.438C347.296 415.54 245.443 457.732 139.231 457.732H117.277V340.438H422.398Z"
        fill="currentColor"
      />
      <path
        d="M539.693 0.00213623V57.2711C539.693 163.483 497.501 265.335 422.398 340.437V0.00213623H539.693Z"
        fill="currentColor"
      />
    </svg>
  );
}
