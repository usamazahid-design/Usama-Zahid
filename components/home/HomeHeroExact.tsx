import React from 'react';
import Link from 'next/link';
import { sx } from './sx';

export interface BrandLogoItem {
  name: string;
  /** Path to local SVG/PNG in `public/` (e.g. '/images/brands/codestreaks.svg') */
  src?: string;
  /** Optional alias for `src` — renders the icon next to `name` text */
  iconSrc?: string;
  /** Optional separate SVG/PNG specifically for Dark Mode */
  darkSrc?: string;
  /** Use editorial italic serif font (`var(--serif)`) for the brand name text */
  serif?: boolean;
  /** Set to true only if your SVG already includes the full horizontal wordmark and you want to hide the HTML text */
  hideName?: boolean;
  /**
   * How a local SVG file adapts to the website color system (`--ink` + `#4B3FFF`):
   * - 'web' (default): Automatically maps SVG colors to website `--ink` (#040404 / #F6F6F6) + `#4B3FFF` indigo across Light & Dark modes
   * - 'dark': SVG has dark paths -> inverts in Dark Mode
   * - 'light': SVG has white paths -> inverts in Light Mode
   * - 'color': Keep exact original SVG colors without filtering
   */
  svgPolarity?: 'web' | 'dark' | 'light' | 'color';
  /** Optional fallback inline SVG nodes if `src` / `iconSrc` is not used */
  mark?: React.ReactNode;
}

const brandLogos: BrandLogoItem[] = [
  {
    name: 'Codestreaks',
    src: '/images/brands/codestreaks.svg',
    svgPolarity: 'web',
  },
  {
    name: 'Petrozen',
    src: '/images/brands/petrozen.svg',
    svgPolarity: 'web',
  },
  {
    name: 'Laila Majnu',
    src: '/images/brands/laila-majnu.svg',
    serif: true,
    svgPolarity: 'web',
  },
  {
    name: 'Begum Retails',
    src: '/images/brands/begum-retails.svg',
    serif: true,
    svgPolarity: 'web',
  },
  {
    name: 'TaxDoctors',
    src: '/images/brands/taxdoctors.svg',
    svgPolarity: 'web',
  },
  {
    name: 'IOP Digital',
    src: '/images/brands/iop-digital.svg',
    svgPolarity: 'web',
  },
];

function renderBrandLogo(brand: BrandLogoItem) {
  const logoSrc = brand.iconSrc || brand.src;

  if (logoSrc) {
    if (brand.hideName) {
      if (brand.darkSrc) {
        return (
          <>
            <img
              src={logoSrc}
              alt={brand.name}
              loading="lazy"
              decoding="async"
              className="brand-logo-img brand-logo-for-light"
            />
            <img
              src={brand.darkSrc}
              alt={brand.name}
              loading="lazy"
              decoding="async"
              className="brand-logo-img brand-logo-for-dark"
            />
          </>
        );
      }

      return (
        <img
          src={logoSrc}
          alt={brand.name}
          loading="lazy"
          decoding="async"
          data-svg-polarity={brand.svgPolarity ?? 'web'}
          className="brand-logo-img"
        />
      );
    }

    return (
      <span className="brand-icon-lockup">
        <span className="brand-logo-icon-box" aria-hidden="true">
          {brand.darkSrc ? (
            <>
              <img
                src={logoSrc}
                alt=""
                loading="lazy"
                decoding="async"
                className="brand-logo-icon brand-logo-for-light"
              />
              <img
                src={brand.darkSrc}
                alt=""
                loading="lazy"
                decoding="async"
                className="brand-logo-icon brand-logo-for-dark"
              />
            </>
          ) : (
            <img
              src={logoSrc}
              alt=""
              loading="lazy"
              decoding="async"
              data-svg-polarity={brand.svgPolarity ?? 'web'}
              className="brand-logo-icon"
            />
          )}
        </span>
        <span
          className="brand-logo-name"
          data-serif={brand.serif ? 'true' : undefined}
        >
          {brand.name}
        </span>
      </span>
    );
  }

  return (
    <svg
      viewBox="0 0 140 36"
      fill="none"
      role="img"
      aria-label={brand.name}
      xmlns="http://www.w3.org/2000/svg"
    >
      {brand.mark}
    </svg>
  );
}

export default function HomeHeroExact() {
  return (
    <section className="hero pad" style={{ paddingTop: '110px' }}>
      <div className="fo"><span>Usama Zahid · Brand &amp; Product Designer</span><span>Brand and website, four weeks</span><span>usamazahid.design</span></div>
      <div className="hg">
        <div className="ht">
          <h1><span className="ln"><span style={sx({ '--d': '.05s' })}>Brand &amp; Product</span></span><span className="ln"><span style={sx({ '--d': '.15s' })}>Designer.</span></span><span className="ln it2"><span style={sx({ '--d': '.25s' })}>Live in four weeks.</span></span></h1>
          <p className="sub"><b>Usama Zahid is an independent Brand &amp; Product Designer.</b> Strategy, identity, UI/UX interface design, and production Next.js code as one continuous sequence with zero handoff gap.</p>
          <Link className="btn" href="/contact/" data-cur="Contact">Start your four-week build <span aria-hidden={true}>→</span></Link>
          <p className="rw">Recent work: Petrozen ERP, Stealth Humanizer, CodeStreaks, Begum, and The Laila Majnu.</p>
        </div>
        <div className="hl in" style={sx({ '--fx': '0px', '--fy': '60px', '--d': '.3s' })}>
          <div className="stg" id="stg" data-scene="logo">
            <div className="stg-t"><button className="tb on" type="button" data-s="logo">Logo</button><button className="tb" type="button" data-s="app">App</button><button className="tb" type="button" data-s="web">Website</button><span className="stg-p" id="stp">Grid</span></div>
            <svg viewBox="0 0 400 420" role="img" aria-label="Animation of a logo being constructed from a grid, then an app screen and a website being designed from wireframe to interface">
              <g className="sc sc-logo">
                <g className="gl"><line style={sx({ '--i': '0' })} x1="86.9" y1="30" x2="86.9" y2="410" pathLength="1" /><line style={sx({ '--i': '1' })} x1="103" y1="30" x2="103" y2="410" pathLength="1" /><line style={sx({ '--i': '2' })} x1="313" y1="30" x2="313" y2="410" pathLength="1" /><line style={sx({ '--i': '3' })} x1="0" y1="52" x2="400" y2="52" pathLength="1" /><line style={sx({ '--i': '4' })} x1="0" y1="94.3" x2="400" y2="94.3" pathLength="1" /><line style={sx({ '--i': '5' })} x1="0" y1="304.3" x2="400" y2="304.3" pathLength="1" /><line style={sx({ '--i': '6' })} x1="0" y1="391" x2="400" y2="391" pathLength="1" /><circle className="arc" cx="103" cy="94.3" r="296.9" pathLength="1" /></g>
                <g transform="translate(0,52) scale(.0926) translate(0,-328)"><rect className="pc pA" pathLength="1" x="0" y="328" width="938" height="2724" /><path className="pc pB" pathLength="1" d="M3380 328H4318V784.5A3206 3206 0 0 1 3380 3052Z" /><path className="pc pC" pathLength="1" d="M939 3052H3380A3206 3206 0 0 1 1112 3990H939Z" /><rect className="pc pD" pathLength="1" x="3380" y="3052" width="938" height="938" /></g>
                <g className="pts"><rect x="-3" y="49" width="6" height="6" /><rect x="83.9" y="49" width="6" height="6" /><rect x="310" y="49" width="6" height="6" /><rect x="397" y="49" width="6" height="6" /><rect x="-3" y="301.3" width="6" height="6" /><rect x="83.9" y="301.3" width="6" height="6" /><rect x="310" y="301.3" width="6" height="6" /><rect x="397" y="388" width="6" height="6" /><rect x="310" y="388" width="6" height="6" /><rect x="100" y="388" width="6" height="6" /></g>
              </g>
              <g className="sc sc-app">
                <rect className="ph" pathLength="1" x="118" y="24" width="164" height="372" rx="20" />
                <rect className="wf" style={sx({ '--i': '0', fill: 'var(--ink)' })} pathLength="1" x="134" y="56" width="64" height="10" rx="5" /><circle className="wf" style={sx({ '--i': '1', fill: '#4B3FFF' })} pathLength="1" cx="254" cy="61" r="10" /><rect className="wf" style={sx({ '--i': '2', fill: '#4B3FFF' })} pathLength="1" x="134" y="82" width="132" height="100" rx="8" /><circle className="wf" style={sx({ '--i': '3', fill: '#fff' })} pathLength="1" cx="172" cy="132" r="24" /><rect className="wf" style={sx({ '--i': '4', fill: '#fff' })} pathLength="1" x="206" y="116" width="46" height="8" rx="4" /><rect className="wf" style={sx({ '--i': '5', fill: '#fff' })} pathLength="1" x="206" y="132" width="34" height="6" rx="3" /><rect className="wf" style={sx({ '--i': '6', fill: 'var(--ink)' })} pathLength="1" x="134" y="198" width="26" height="26" rx="0" /><rect className="wf" style={sx({ '--i': '7', fill: 'var(--ink)' })} pathLength="1" x="170" y="202" width="86" height="9" rx="4" /><rect className="wf" style={sx({ '--i': '8', fill: '#A0A0AA' })} pathLength="1" x="170" y="217" width="54" height="6" rx="3" /><path className="wf" style={sx({ '--i': '9', fill: '#4B3FFF' })} pathLength="1" d="M134 258V232A26 26 0 0 1 160 258Z" /><rect className="wf" style={sx({ '--i': '10', fill: 'var(--ink)' })} pathLength="1" x="170" y="236" width="86" height="9" rx="4" /><rect className="wf" style={sx({ '--i': '11', fill: '#A0A0AA' })} pathLength="1" x="170" y="251" width="54" height="6" rx="3" /><circle className="wf" style={sx({ '--i': '12', fill: 'var(--ink)' })} pathLength="1" cx="147" cy="279" r="13" /><rect className="wf" style={sx({ '--i': '13', fill: 'var(--ink)' })} pathLength="1" x="170" y="270" width="86" height="9" rx="4" /><rect className="wf" style={sx({ '--i': '14', fill: '#A0A0AA' })} pathLength="1" x="170" y="285" width="54" height="6" rx="3" /><rect className="wf bt" style={sx({ '--i': '15', fill: '#4B3FFF' })} pathLength="1" x="134" y="332" width="132" height="40" rx="8" /><rect className="wf" style={sx({ '--i': '16', fill: '#fff' })} pathLength="1" x="170" y="348" width="60" height="8" rx="4" />
                <g className="ptr"><path d="M0 0L0 18L5 14L9 22L12 20L8 13L15 13Z" style={sx({ fill: 'var(--ink)', stroke: 'var(--bg)' })} strokeWidth="1.2" /></g>
              </g>
              <g className="sc sc-web"><rect className="ph" pathLength="1" x="30" y="34" width="340" height="348" rx="6" /><rect className="wf" style={sx({ '--i': '0', fill: 'var(--ink)' })} pathLength="1" x="42" y="45" width="7" height="7" /><rect className="wf" style={sx({ '--i': '1', fill: 'var(--ink)' })} pathLength="1" x="54" y="45" width="7" height="7" /><rect className="wf" style={sx({ '--i': '2', fill: '#4B3FFF' })} pathLength="1" x="66" y="45" width="7" height="7" /><rect className="wf" style={sx({ '--i': '3', fill: 'var(--mute)' })} pathLength="1" x="86" y="43" width="198" height="14" rx="7" /><rect className="wf" style={sx({ '--i': '4', fill: 'var(--ink)' })} pathLength="1" x="46" y="76" width="14" height="14" /><rect className="wf" style={sx({ '--i': '5', fill: '#4B3FFF' })} pathLength="1" x="60" y="90" width="8" height="8" /><rect className="wf" style={sx({ '--i': '6', fill: 'var(--mute)' })} pathLength="1" x="250" y="80" width="28" height="6" rx="3" /><rect className="wf" style={sx({ '--i': '7', fill: 'var(--mute)' })} pathLength="1" x="286" y="80" width="28" height="6" rx="3" /><rect className="wf" style={sx({ '--i': '8', fill: 'var(--mute)' })} pathLength="1" x="322" y="80" width="28" height="6" rx="3" /><rect className="wf" style={sx({ '--i': '9', fill: 'var(--ink)' })} pathLength="1" x="46" y="118" width="150" height="16" rx="2" /><rect className="wf" style={sx({ '--i': '10', fill: 'var(--ink)' })} pathLength="1" x="46" y="142" width="120" height="16" rx="2" /><rect className="wf" style={sx({ '--i': '11', fill: 'var(--ink)' })} pathLength="1" x="46" y="166" width="80" height="16" rx="2" /><rect className="wf" style={sx({ '--i': '12', fill: 'var(--mute)' })} pathLength="1" x="46" y="196" width="140" height="6" rx="3" /><rect className="wf" style={sx({ '--i': '13', fill: 'var(--mute)' })} pathLength="1" x="46" y="208" width="110" height="6" rx="3" /><rect className="wf bt" style={sx({ '--i': '14', fill: '#4B3FFF' })} pathLength="1" x="46" y="228" width="96" height="30" rx="0" /><rect className="wf" style={sx({ '--i': '15', fill: '#fff' })} pathLength="1" x="62" y="240" width="50" height="6" rx="3" /><path className="wf" style={sx({ '--i': '16', fill: 'var(--ink)' })} pathLength="1" d="M212 258V108A150 150 0 0 1 362 258Z" /><rect className="wf" style={sx({ '--i': '17', fill: '#4B3FFF' })} pathLength="1" x="320" y="218" width="42" height="40" /><rect className="wf" style={sx({ '--i': '18', fill: 'var(--ink)' })} pathLength="1" x="46" y="292" width="96" height="70" rx="4" /><rect className="wf" style={sx({ '--i': '19', fill: '#4B3FFF' })} pathLength="1" x="152" y="292" width="96" height="70" rx="4" /><rect className="wf" style={sx({ '--i': '20', fill: 'var(--ink)' })} pathLength="1" x="258" y="292" width="96" height="70" rx="4" /><g className="ptr ptr2"><path d="M0 0L0 18L5 14L9 22L12 20L8 13L15 13Z" style={sx({ fill: 'var(--ink)', stroke: 'var(--bg)' })} strokeWidth="1.2" /></g></g>
            </svg>
            <div className="stg-b"><span id="stc">Fig. A. Logo construction</span><i className="bar" id="bar"></i></div>
          </div>
        </div>
      </div>
      <div className="pf brands" aria-label="Brands and clients">
        <svg className="brand-svg-filters" width="0" height="0" aria-hidden="true" focusable="false">
          <defs>
            {/* Light mode: maps dark or white primary shapes -> #040404 (--ink) and mid/colored accents -> #4B3FFF (--ind) */}
            <filter id="brand-web-palette-light" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="0.2126 0.7152 0.0722 0 0
                        0.2126 0.7152 0.0722 0 0
                        0.2126 0.7152 0.0722 0 0
                        0      0      0      1 0"
              />
              <feComponentTransfer>
                <feFuncR type="table" tableValues="0.016 0.294 0.294 0.294 0.016" />
                <feFuncG type="table" tableValues="0.016 0.247 0.247 0.247 0.016" />
                <feFuncB type="table" tableValues="0.016 1.000 1.000 1.000 0.016" />
              </feComponentTransfer>
            </filter>
            {/* Dark mode: maps dark or white primary shapes -> #F6F6F6 (--ink) and mid/colored accents -> #4B3FFF (--ind) */}
            <filter id="brand-web-palette-dark" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="0.2126 0.7152 0.0722 0 0
                        0.2126 0.7152 0.0722 0 0
                        0.2126 0.7152 0.0722 0 0
                        0      0      0      1 0"
              />
              <feComponentTransfer>
                <feFuncR type="table" tableValues="0.965 0.294 0.294 0.294 0.965" />
                <feFuncG type="table" tableValues="0.965 0.247 0.247 0.247 0.965" />
                <feFuncB type="table" tableValues="0.965 1.000 1.000 1.000 0.965" />
              </feComponentTransfer>
            </filter>
          </defs>
        </svg>
        <div className="brands-head">
          <span className="brands-label">Selected operators, teams, and product founders</span>
          <span className="brands-note">Identity + Product + Web Engineering</span>
        </div>
        <div className="brands-stage">
          <div className="brands-row brands-row-a">
            {brandLogos.slice(0, 3).map((brand, idx) => (
              <article key={brand.name} className="brand-card" style={sx({ '--i': String(idx) })}>
                <span className="brand-dot" aria-hidden="true" />
                {renderBrandLogo(brand)}
              </article>
            ))}
          </div>
          <div className="brands-row brands-row-b">
            {brandLogos.slice(3).map((brand, idx) => (
              <article key={brand.name} className="brand-card" style={sx({ '--i': String(idx + 3) })}>
                <span className="brand-dot" aria-hidden="true" />
                {renderBrandLogo(brand)}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
