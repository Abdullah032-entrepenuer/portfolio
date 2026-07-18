'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Services.module.css';
import { ServiceItem } from '@/lib/db';

gsap.registerPlugin(ScrollTrigger);

function ServicePanel({ service, index }: { service: ServiceItem; index: number }) {
  const panelRef = useRef<HTMLDivElement>(null);

  const accentColor = service.accent === 'neon' ? 'var(--neon)' :
                      service.accent === 'violet' ? 'var(--violet)' :
                      service.accent === 'cyan' ? 'var(--cyan)' : service.accent || 'var(--cyan)';

  useEffect(() => {
    if (!panelRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(panelRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panelRef.current,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={panelRef}
      className={styles.card}
      data-cursor="pointer"
      style={{ opacity: 0 }}
    >
      {/* Glow */}
      <div className={styles.cardGlow} style={{ background: `radial-gradient(circle at 50% 0%, ${accentColor}18, transparent 70%)` }} />

      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon} style={{ color: accentColor }}>
          {service.icon}
        </div>
        <span className={`text-label ${styles.cardLabel}`}>{service.label}</span>
      </div>

      {/* Stat badge */}
      <div className={styles.statBadge} style={{ borderColor: `${accentColor}30`, color: accentColor }}>
        {service.stat}
      </div>

      <h3 className={`text-h3 ${styles.cardTitle}`}>{service.title}</h3>
      <p className={styles.cardDesc}>{service.desc}</p>

      {/* Tags */}
      <div className={styles.tags}>
        {service.tags.map((tag, i) => (
          <span
            key={tag}
            className={styles.tag}
            style={{ borderColor: `${accentColor}25` }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow */}
      <div className={styles.cardArrow} style={{ color: accentColor }}>↗</div>
    </div>
  );
}

export default function ServicesSection({ data }: { data: ServiceItem[] }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const servicesList = data || [];

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current!.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className={`section ${styles.services}`} aria-label="Services and expertise">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className={styles.header}>
          <span className="text-label" style={{ opacity: 0 }}>What I Build</span>
          <h2 className={`text-h2 ${styles.title}`} style={{ opacity: 0 }}>
            Services &amp; <span className="gradient-violet">Expertise</span>
          </h2>
          <p className={styles.subtitle} style={{ opacity: 0 }}>
            Not just code — complete, scalable business solutions engineered to perform.
          </p>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {servicesList.map((service, i) => (
            <ServicePanel key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
