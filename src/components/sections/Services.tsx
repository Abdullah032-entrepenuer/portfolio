'use client';

import { useRef, useState } from 'react';
import styles from './Services.module.css';
import { ServiceItem } from '@/lib/db';

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY = ((x - cx) / cx) * 8;
    const rotX = -((y - cy) / cy) * 8;
    setTiltStyle({
      transform: `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`,
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTiltStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
    });
    setTimeout(() => setTiltStyle({}), 500);
  };

  const accentColor = service.accent === 'neon' ? 'var(--neon)' :
                      service.accent === 'violet' ? 'var(--violet)' : 
                      service.accent === 'cyan' ? 'var(--cyan)' : service.accent || 'var(--cyan)';

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${styles[`card-${service.accent}`] || ''} ${hovered ? styles.cardHovered : ''}`}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-cursor="pointer"
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

      {/* Tags — revealed on hover */}
      <div className={`${styles.tags} ${hovered ? styles.tagsVisible : ''}`}>
        {service.tags.map((tag, i) => (
          <span
            key={tag}
            className={styles.tag}
            style={{
              transitionDelay: `${i * 0.04}s`,
              borderColor: `${accentColor}25`,
              color: hovered ? accentColor : 'var(--white-muted)',
            }}
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

export default function Services({ data }: { data: ServiceItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const servicesList = data || [];

  return (
    <section ref={sectionRef} id="services" className={`section ${styles.services}`} aria-label="Services and expertise">
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className="text-label">What I Build</span>
          <h2 className={`text-h2 ${styles.title}`}>
            Services &amp; <span className="gradient-violet">Expertise</span>
          </h2>
          <p className={styles.subtitle}>
            Not just code — complete, scalable business solutions engineered to perform.
          </p>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {servicesList.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
