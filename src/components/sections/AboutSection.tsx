'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';
import { AboutData } from '@/lib/db';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection({ data }: { data: AboutData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const bioParagraphs = data?.bioParagraphs || [];
  const stats = data?.stats || [];
  const skills = data?.skills || [];
  const title = data?.title || 'Not just a developer.<br />An <span class="gradient-violet">engineer</span> who ships.';
  const floatingBadge = data?.floatingBadge || { icon: '◈', title: 'Senior Engineer', sub: 'Full‑Stack Developer' };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Photo and title entrance
      gsap.fromTo('[data-about-photo]',
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      );

      // Title
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: titleRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
          }
        );
      }

      // Bio paragraphs stagger
      if (bioRef.current) {
        gsap.fromTo(bioRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: bioRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
          }
        );
      }

      // Stats — count up effect
      if (statsRef.current) {
        const statEls = statsRef.current.querySelectorAll('[data-stat-value]');
        statEls.forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 20, scale: 0.8 },
            {
              opacity: 1, y: 0, scale: 1,
              duration: 0.8, ease: 'back.out(2)',
              scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
            }
          );
        });
      }

      // Skills — animated fill bars
      if (skillsRef.current) {
        const fills = skillsRef.current.querySelectorAll('[data-skill-fill]');
        fills.forEach((fill) => {
          gsap.fromTo(fill,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.2, ease: 'power3.out',
              scrollTrigger: { trigger: fill, start: 'top 90%', toggleActions: 'play none none reverse' },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className={`section ${styles.about}`} aria-label="About Abdullah Awais">
      <div className="container">
        <div className={styles.grid}>
          {/* ── Left: Photo + Stats ── */}
          <div className={styles.leftCol}>
            <div className={styles.photoFrame} data-about-photo aria-label="Abdullah Awais professional headshot">
              <div className={styles.ring1} aria-hidden="true" />
              <div className={styles.ring2} aria-hidden="true" />
              <div className={styles.ring3} aria-hidden="true" />
              <div className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
              <div className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

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

              <div className={styles.floatingBadge} aria-label="Role badge">
                <span className={styles.badgeIcon}>{floatingBadge.icon}</span>
                <div>
                  <div className={styles.badgeTitle}>{floatingBadge.title}</div>
                  <div className={styles.badgeSub}>{floatingBadge.sub}</div>
                </div>
              </div>
            </div>

            <div ref={statsRef} className={styles.stats} role="list" aria-label="Key statistics">
              {stats.map((stat) => (
                <div key={stat.label} className={styles.stat} role="listitem">
                  <span className={styles.statValue} data-stat-value>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Bio + Skills ── */}
          <div className={styles.rightCol}>
            <span className="text-label">The Person Behind the Code</span>
            <h2 ref={titleRef} className={`text-h2 ${styles.title}`} dangerouslySetInnerHTML={{ __html: title }} style={{ opacity: 0 }} />

            <div ref={bioRef} className={styles.bio}>
              {bioParagraphs.map((para, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: para }} style={{ opacity: 0 }} />
              ))}
            </div>

            <div ref={skillsRef} className={styles.skills} aria-label="Skill proficiency levels">
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
                      data-skill-fill
                      style={{ '--w': `${skill.level}%`, transformOrigin: 'left', transform: 'scaleX(0)' } as React.CSSProperties}
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
