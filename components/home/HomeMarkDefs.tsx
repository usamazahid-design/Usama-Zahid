import { sx } from './sx';

export default function HomeMarkDefs() {
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <g id="logo">
            <rect x="0" y="328" width="938" height="2724" fill="currentColor" />
            <path d="M3380 328H4318V784.5A3206 3206 0 0 1 3380 3052Z" fill="currentColor" />
            <path d="M939 3052H3380A3206 3206 0 0 1 1112 3990H939Z" fill="currentColor" />
            <rect x="3380" y="3052" width="938" height="938" style={sx({ fill: 'var(--sq,#4B3FFF)' })} />
          </g>
        </defs>
      </svg>
      <div className="prog" id="prog" />
      <a className="skip" href="#services">
        Skip to content
      </a>
    </>
  );
}
