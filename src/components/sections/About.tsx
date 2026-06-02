'use client';

import Image from 'next/image';
import styles from './About.module.css';

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '1', label: 'Tech Society Led' },
  { value: '∞', label: 'Problems Solved' },
];

const skills = [
  { name: 'React / Next.js', level: 95 },
  { name: 'Node.js / Express', level: 90 },
  { name: 'MongoDB / Databases', level: 85 },
  { name: 'Three.js / WebGL', level: 80 },
  { name: 'System Architecture', level: 88 },
  { name: 'Technical Writing', level: 92 },
];

export default function About() {
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
                <span className={styles.badgeIcon}>◈</span>
                <div>
                  <div className={styles.badgeTitle}>Senior Engineer</div>
                  <div className={styles.badgeSub}>Full‑Stack Developer</div>
                </div>
              </div>

              {/* Leadership badge */}
              <div className={styles.leaderBadge} aria-label="Leadership achievement">
                <span style={{ color: 'var(--neon)' }}>★</span>
                <span>Society President</span>
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

            <h2 className={`text-h2 ${styles.title}`}>
              Not just a developer.<br />
              An <span className="gradient-violet">engineer</span> who ships.
            </h2>

            <div className={styles.bio}>
              <p>
                I&apos;m <strong>Abdullah Awais</strong> — a Full-Stack Developer specializing in
                building high-performance web applications that don&apos;t just function, they <em>captivate</em>.
              </p>
              <p>
                With deep expertise in the MERN stack and a passion for immersive 3D web experiences, I bridge
                the gap between complex engineering and elegant, intuitive design. Every project I take on is
                engineered to scale, crafted to convert, and built to last.
              </p>
              <p>
                Beyond code, I serve as <strong>President of my University&apos;s Technology Society</strong> —
                leading a team of engineers, organizing technical events, and driving the next generation of
                tech talent. Leadership isn&apos;t just a role; it&apos;s how I approach every collaboration.
              </p>
            </div>

            {/* Skill bars */}
            <div className={styles.skills} aria-label="Skill proficiency levels">
              <span className="text-label" style={{ marginBottom: '20px', display: 'block' }}>Core Proficiencies</span>
              {skills.map((skill, i) => (
                <div key={skill.name} className={styles.skillRow} style={{ '--delay': `${i * 0.08}s` } as React.CSSProperties}>
                  <div className={styles.skillMeta}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={styles.skillPct}>{skill.level}%</span>
                  </div>
                  <div className={styles.skillTrack} role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} proficiency`}>
                    <div
                      className={styles.skillFill}
                      style={{ '--w': `${skill.level}%` } as React.CSSProperties}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
