'use client';

import Image from 'next/image';
import styles from './About.module.css';
import { AboutData } from '@/lib/db';

export default function About({ data }: { data: AboutData }) {
  const bioParagraphs = data?.bioParagraphs || [];
  const stats = data?.stats || [];
  const skills = data?.skills || [];
  const title = data?.title || 'Not just a developer.<br />An <span class="gradient-violet">engineer</span> who ships.';
  const floatingBadge = data?.floatingBadge || { icon: '◈', title: 'Senior Engineer', sub: 'Full‑Stack Developer' };

  return (
    <section id="about" className={`section ${styles.about}`} aria-label="About Abdullah Awais">
      <div className="container">
        <div className={styles.grid}>
          {/* ── Left: Photo + Stats ── */}
          <div className={styles.leftCol}>
            {/* Photo frame */}
            <div className={styles.photoFrame} aria-label="Abdullah Awais professional headshot">
              {/* Glow rings */}
              <div className={styles.ring1} aria-hidden="true" />
              <div className={styles.ring2} aria-hidden="true" />
              <div className={styles.ring3} aria-hidden="true" />

              {/* Decorative corner accents */}
              <div className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
              <div className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

              {/* Photo */}
              <div className={styles.photo}>
                <Image
                  src="/profile.jpg"
                  alt="Abdullah Awais — Full-Stack Developer & Senior Engineer"
                  fill
                  className={styles.photoImg}
                  priority
                  sizes="(max-width: 768px) 100vw, 480px"
                />
                <div className={styles.photoOverlay} />
              </div>

              {/* Floating badge */}
              <div className={styles.floatingBadge} aria-label="Role badge">
                <span className={styles.badgeIcon}>{floatingBadge.icon}</span>
                <div>
                  <div className={styles.badgeTitle}>{floatingBadge.title}</div>
                  <div className={styles.badgeSub}>{floatingBadge.sub}</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className={styles.stats} role="list" aria-label="Key statistics">
              {stats.map((stat) => (
                <div key={stat.label} className={styles.stat} role="listitem">
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Bio + Skills ── */}
          <div className={styles.rightCol}>
            <span className="text-label">The Person Behind the Code</span>

            <h2 className={`text-h2 ${styles.title}`} dangerouslySetInnerHTML={{ __html: title }} />

            <div className={styles.bio}>
              {bioParagraphs.map((para, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
