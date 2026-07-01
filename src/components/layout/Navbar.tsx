'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import ThemeToggle from '@/components/ui/ThemeToggle';

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

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 60);
      setHidden(current > lastScroll.current && current > 200);
      lastScroll.current = current;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''} ${hidden ? styles.navHidden : ''}`}>
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
            <ThemeToggle />
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
          <ThemeToggle />
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
