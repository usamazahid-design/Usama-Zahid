/**
 * Server-rendered first-paint shell. Exit handled by PreloaderDismiss.
 */
export default function Preloader() {
  return (
    <div
      className="pre"
      id="uz-pre"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading Usama Zahid"
    >
      <div className="pre-inner">
        <svg
          className="pre-mark"
          viewBox="0 0 540 458"
          width="72"
          height="61"
          aria-hidden="true"
        >
          <path
            className="pre-p pre-p-a"
            d="M117.295 0H0V340.435H117.295V0Z"
            fill="currentColor"
          />
          <path
            className="pre-p pre-p-b"
            d="M422.398 340.438C347.296 415.54 245.443 457.732 139.231 457.732H117.277V340.438H422.398Z"
            fill="currentColor"
          />
          <path
            className="pre-p pre-p-c"
            d="M539.693 0.00213623V57.2711C539.693 163.483 497.501 265.335 422.398 340.437V0.00213623H539.693Z"
            fill="currentColor"
          />
          <path
            className="pre-p pre-p-d"
            d="M539.693 340.438H422.398V457.732H539.693V340.438Z"
            fill="var(--ind, #4B3FFF)"
          />
        </svg>
        <div className="pre-copy">
          <span className="pre-name">Usama Zahid</span>
          <span className="pre-tag">Brand to URL</span>
        </div>
        <div className="pre-bar" aria-hidden="true">
          <i />
        </div>
      </div>
    </div>
  );
}
