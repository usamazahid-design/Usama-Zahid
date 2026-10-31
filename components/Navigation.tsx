'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'portfolio' | 'services' | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    // Site chrome CSS is scoped to authentic-route; never let a page unmount strip it.
    html.classList.add('authentic-route', 'ready');

    let currentTheme: 'light' | 'dark' = 'light';
    try {
      const stored = localStorage.getItem('uz_theme');
      if (stored === 'dark' || stored === 'light') {
        currentTheme = stored;
      } else if (html.dataset.theme === 'dark' || html.dataset.theme === 'light') {
        currentTheme = html.dataset.theme as 'light' | 'dark';
      }
    } catch (_) {}

    setTheme(currentTheme);
    html.dataset.theme = currentTheme;
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const onDocumentClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', onDocumentClick);
    return () => document.removeEventListener('mousedown', onDocumentClick);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [pathname]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem('uz_theme', nextTheme);
    } catch (_) {}
  };

  const handleDropdownEnter = (name: 'portfolio' | 'services') => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setOpenDropdown(name);
  };

  const handleDropdownLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 180);
  };

  const openDropdownMenu = (name: 'portfolio' | 'services') => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    // Always open on click. Hover already opens; toggling closed here fights the hover path.
    setOpenDropdown(name);
  };

  const closeDropdownImmediately = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setOpenDropdown(null);
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const isHome = pathname === '/' || pathname === '';
  const isWorkActive = pathname?.startsWith('/portfolio') || pathname?.startsWith('/branding');
  const isServicesActive = pathname?.startsWith('/services') || pathname?.startsWith('/brand-to-url');
  const isAboutActive = pathname?.startsWith('/about');
  const isBlogActive = pathname?.startsWith('/blog');
  const isProductsActive = pathname?.startsWith('/products');

  return (
    <>
      <header className={`pad site-header${scrolled ? ' is-scrolled' : ''}`}>
        <Link href="/" className="br" aria-label="Usama Zahid, Home" onClick={closeDropdownImmediately}>
          <svg
            className="mk"
            viewBox="0 328 4319 3662"
            aria-hidden="true"
            style={{ width: 32, height: 28, display: 'block', flexShrink: 0 }}
          >
            <rect x="0" y="328" width="938" height="2724" fill="currentColor" />
            <path d="M3380 328H4318V784.5A3206 3206 0 0 1 3380 3052Z" fill="currentColor" />
            <path d="M939 3052H3380A3206 3206 0 0 1 1112 3990H939Z" fill="currentColor" />
            <rect x="3380" y="3052" width="938" height="938" style={{ fill: 'var(--ind, #4B3FFF)' }} />
          </svg>
          <span className="br-text">
            <strong>Usama Zahid</strong>
            <em>Brand to URL</em>
          </span>
        </Link>

        <nav ref={navRef} aria-label="Primary" className="nav-bar">
          <div className="nav-links">
            <div
              className={`nav-item-dd ${openDropdown === 'portfolio' ? 'is-open' : ''}`}
              onMouseEnter={() => handleDropdownEnter('portfolio')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                className={`nav-dd-trigger ${isWorkActive ? 'active-nav-link' : ''}`}
                aria-expanded={openDropdown === 'portfolio'}
                aria-haspopup="true"
                aria-controls="nav-dd-work"
                onClick={() => openDropdownMenu('portfolio')}
              >
                <span>Work</span>
                <svg className="nav-caret" viewBox="0 0 10 6" width="9" height="6" aria-hidden="true">
                  <path d="M1 1L5 5L9 1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div
                id="nav-dd-work"
                className={`nav-dropdown-menu ${openDropdown !== 'portfolio' ? 'is-closed' : ''}`}
              >
                <div className="dd-header"><span className="dd-label">Selected work</span></div>
                <Link href="/portfolio/" className="dd-item" onClick={closeDropdownImmediately}>
                  <div className="dd-text">
                    <span className="dd-title">Product &amp; UX</span>
                    <span className="dd-desc">Systems and shipped interfaces</span>
                  </div>
                  <span className="dd-arr" aria-hidden="true">&rarr;</span>
                </Link>
                <Link href="/branding/" className="dd-item" onClick={closeDropdownImmediately}>
                  <div className="dd-text">
                    <span className="dd-title">Branding</span>
                    <span className="dd-desc">Identity systems and guidelines</span>
                  </div>
                  <span className="dd-arr" aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>

            <div
              className={`nav-item-dd ${openDropdown === 'services' ? 'is-open' : ''}`}
              onMouseEnter={() => handleDropdownEnter('services')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                className={`nav-dd-trigger ${isServicesActive ? 'active-nav-link' : ''}`}
                aria-expanded={openDropdown === 'services'}
                aria-haspopup="true"
                aria-controls="nav-dd-services"
                onClick={() => openDropdownMenu('services')}
              >
                <span>Services</span>
                <svg className="nav-caret" viewBox="0 0 10 6" width="9" height="6" aria-hidden="true">
                  <path d="M1 1L5 5L9 1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div
                id="nav-dd-services"
                className={`nav-dropdown-menu ${openDropdown !== 'services' ? 'is-closed' : ''}`}
              >
                <div className="dd-header"><span className="dd-label">Four-week system</span></div>
                <Link href="/brand-to-url/" className="dd-item dd-featured" onClick={closeDropdownImmediately}>
                  <div className="dd-text">
                    <span className="dd-title">Brand-to-URL</span>
                    <span className="dd-desc">Brand and website, one system</span>
                  </div>
                  <span className="dd-arr" aria-hidden="true">&rarr;</span>
                </Link>
                <Link href="/services/identity/" className="dd-item" onClick={closeDropdownImmediately}>
                  <div className="dd-text">
                    <span className="dd-title">Brand identity</span>
                    <span className="dd-desc">Positioning, logo, and tokens</span>
                  </div>
                  <span className="dd-arr" aria-hidden="true">&rarr;</span>
                </Link>
                <Link href="/services/engineering/" className="dd-item" onClick={closeDropdownImmediately}>
                  <div className="dd-text">
                    <span className="dd-title">Website</span>
                    <span className="dd-desc">Production Next.js build</span>
                  </div>
                  <span className="dd-arr" aria-hidden="true">&rarr;</span>
                </Link>
                <Link href="/services/product/" className="dd-item" onClick={closeDropdownImmediately}>
                  <div className="dd-text">
                    <span className="dd-title">Product &amp; UX</span>
                    <span className="dd-desc">Interfaces and friction audits</span>
                  </div>
                  <span className="dd-arr" aria-hidden="true">&rarr;</span>
                </Link>
                <Link href="/services/" className="dd-item" onClick={closeDropdownImmediately}>
                  <div className="dd-text">
                    <span className="dd-title">All services</span>
                    <span className="dd-desc">Overview and ways of working</span>
                  </div>
                  <span className="dd-arr" aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>

            <Link
              href="/products/"
              className={isProductsActive ? 'active-nav-link' : undefined}
              onClick={closeDropdownImmediately}
            >
              Free Products
            </Link>
            <Link
              href="/about/"
              className={isAboutActive ? 'active-nav-link' : undefined}
              onClick={closeDropdownImmediately}
            >
              About
            </Link>
            <Link
              href="/blog/"
              className={isBlogActive ? 'active-nav-link' : undefined}
              onClick={closeDropdownImmediately}
            >
              Writing
            </Link>
          </div>

          <div className="nav-actions">
            <button
              className="tg"
              id="tg"
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="M4.93 4.93l1.41 1.41" />
                  <path d="M17.66 17.66l1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="M6.34 17.66l-1.41 1.41" />
                  <path d="M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>

            <Link className="hc" href="/contact/" onClick={closeDropdownImmediately}>
              Start a build <span aria-hidden="true">&rarr;</span>
            </Link>

            <button
              className="mn"
              id="mn"
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mo"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`mn-bars${menuOpen ? ' is-open' : ''}`} aria-hidden="true">
                <i /><i /><i />
              </span>
              <span className="mn-label">{menuOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </nav>
      </header>

      <div className={`mo ${menuOpen ? 'open' : ''}`} id="mo" aria-hidden={!menuOpen}>
        <div className="mo-track">
          <div className="mo-group">
            <span className="mo-label">Work</span>
            <Link href="/portfolio/" onClick={() => setMenuOpen(false)}>
              Product &amp; UX <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link href="/branding/" onClick={() => setMenuOpen(false)}>
              Branding <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="mo-group">
            <span className="mo-label">Services</span>
            <Link href="/brand-to-url/" onClick={() => setMenuOpen(false)}>
              Brand-to-URL <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link href="/services/" onClick={() => setMenuOpen(false)}>
              All services <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link href="/about/" onClick={() => setMenuOpen(false)}>
              About <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link href="/blog/" onClick={() => setMenuOpen(false)}>
              Writing <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link href="/products/" onClick={() => setMenuOpen(false)}>
              Free Products <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link href="/contact/" onClick={() => setMenuOpen(false)}>
              Contact <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="mo-group mo-meta">
            <button type="button" className="mo-theme" onClick={toggleTheme}>
              <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
          <div className="mo-footer">
            <Link className="hc mo-cta" href={isHome ? '/contact/' : '/contact/'} onClick={() => setMenuOpen(false)}>
              Start a build <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
