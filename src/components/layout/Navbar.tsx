'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import styles from './Navbar.module.css';
import { useLenis } from '@/providers/LenisProvider';
import { useScrollContext } from '@/providers/ScrollContext';


const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#vault' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScroll = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const { getInstance } = useLenis();
  const { subscribe } = useScrollContext();

  useEffect(() => {
    // Subscribe to scroll context for hide/show behavior
    const unsub = subscribe((state) => {
      setScrolled(state.scrollY > 60);
      setHidden(state.scrollY > lastScroll.current && state.scrollY > 200);
      lastScroll.current = state.scrollY;
    });

    // GSAP entrance
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 2.8 }
      );
    }

    return unsub;
  }, [subscribe]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const lenis = getInstance();
    const target = document.querySelector(href);
    if (lenis && target) {
      lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.2 });
    }
  };

  return (
    <>
      <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.navScrolled : ''} ${hidden ? styles.navHidden : ''}`} style={{ opacity: 0 }}>
        <div className={`container ${styles.navInner}`}>
          <Link href="/" className={styles.logo} aria-label="Abdullah Awais Portfolio">
            <span className={styles.logoAA}>AA</span>
            <span className={styles.logoDot}>.</span>
          </Link>

          <ul className={styles.links} role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  className={styles.link}
                  onClick={() => handleNavClick(link.href)}
                  aria-label={`Navigate to ${link.label}`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.rightGroup}>
            <button
              className={`btn btn-primary ${styles.ctaBtn}`}
              onClick={() => handleNavClick('#contact')}
              aria-label="Let's Build"
            >
              Let&apos;s Build
            </button>
          </div>

          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`} aria-hidden={!menuOpen}>
        <div className={styles.mobileToggleRow}>
        </div>
        <ul className={styles.mobileLinks} role="list">
          {navLinks.map((link, i) => (
            <li key={link.href} style={{ '--i': i } as React.CSSProperties}>
              <button
                className={styles.mobileLink}
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
                <span className={styles.mobileLinkArrow}>↗</span>
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.mobileFooter}>
          <span className="text-label">Abdullah Awais · Full-Stack Developer</span>
        </div>
      </div>
    </>
  );
}
