'use client';

import styles from './Footer.module.css';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { SiFiverr } from 'react-icons/si';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        {/* Left */}
        <div className={styles.left}>
          <div className={styles.logo}>
            <span>AA</span>
            <span className={styles.logoDot}>.</span>
          </div>
          <p className={styles.tagline}>
            Engineering Digital Luxury.<br />
            <span>Full‑Stack Developer &amp; Tech Lead</span>
          </p>
        </div>

        {/* Center: Nav */}
        <nav className={styles.nav} aria-label="Footer navigation">
          {[
            { label: 'Services', href: '#services' },
            { label: 'Work', href: '#vault' },
            { label: 'About', href: '#about' },
            { label: 'Contact', href: '#contact' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.navLink}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Social */}
        <div className={styles.social}>
          <a
            href="https://github.com/abdullah-032s"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub profile"
          >
            <FiGithub size={18} />
          </a>
          <a
            href="https://www.fiverr.com/users/abdu1lah_awais"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Fiverr profile"
          >
            <SiFiverr size={18} />
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className="container">
          <span>© {year} Abdullah Awais · All rights reserved</span>
          <span>Built with Next.js · React Three Fiber · GSAP</span>
        </div>
      </div>
    </footer>
  );
}
