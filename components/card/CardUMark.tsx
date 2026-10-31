/** Simplified 40×40 U mark for the visiting card */
export default function CardUMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <rect x="4" y="4" width="10" height="32" fill="#F6F6F6" />
      <path
        d="M 14 36 L 14 14 A 12 12 0 0 1 26 4 L 36 4 L 36 14 A 12 12 0 0 0 26 26 L 26 36 Z"
        fill="#F6F6F6"
      />
      <rect x="20" y="20" width="20" height="20" fill="#4B3FFF" />
    </svg>
  );
}
