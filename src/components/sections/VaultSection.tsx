'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Vault.module.css';
import { ProjectItem as Project } from '@/lib/db';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────── Project Modal ─────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeImg, setActiveImg] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveImg(i => (i + 1) % project.images.length);
      if (e.key === 'ArrowLeft') setActiveImg(i => (i - 1 + project.images.length) % project.images.length);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    // GSAP entrance
    if (modalRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.92, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power4.out' }
      );
    }

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, project.images.length]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => { if (e.target === overlayRef.current) onClose(); },
    [onClose]
  );

  const prev = () => setActiveImg(i => (i - 1 + project.images.length) % project.images.length);
  const next = () => setActiveImg(i => (i + 1) % project.images.length);

  return (
    <div
      ref={overlayRef}
      className={styles.modalOverlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
    >
      <div
        ref={modalRef}
        className={styles.modal}
        style={{ '--accent': project.accent, '--accent-rgb': project.accentRgb } as React.CSSProperties}
      >
        {/* Close */}
        <button className={styles.modalClose} onClick={onClose} aria-label="Close modal">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M13.5 4.5L4.5 13.5M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        {/* ── Left: Gallery ── */}
        <div className={styles.modalLeft}>
          <div className={styles.modalMainImg}>
            <Image
              src={project.images[activeImg]}
              alt=""
              aria-hidden="true"
              fill
              className={styles.modalImgBg}
              sizes="80px"
            />
            <Image
              key={activeImg}
              src={project.images[activeImg]}
              alt={`${project.imageAlt} – view ${activeImg + 1}`}
              fill
              className={styles.modalImg}
              sizes="(max-width: 768px) 100vw, 55vw"
              priority
            />
            <div className={styles.modalImgVignette} />
            <div
              className={styles.modalImgGlow}
              style={{ background: `radial-gradient(ellipse 70% 40% at 50% 100%, rgba(${project.accentRgb},0.22), transparent 70%)` }}
            />

            {project.images.length > 1 && (
              <>
                <button className={`${styles.modalArrow} ${styles.modalArrowLeft}`} onClick={prev} aria-label="Previous image">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12.5 15L7.5 10l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className={`${styles.modalArrow} ${styles.modalArrowRight}`} onClick={next} aria-label="Next image">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className={styles.modalCounter}>
                  <span style={{ color: project.accent }}>{activeImg + 1}</span>
                  <span className={styles.modalCounterSep}>/</span>
                  <span>{project.images.length}</span>
                </div>
              </>
            )}
          </div>

          {project.images.length > 1 && (
            <div className={styles.modalThumbs}>
              {project.images.map((img, i) => (
                <button
                  key={i}
                  className={`${styles.modalThumb} ${i === activeImg ? styles.modalThumbActive : ''}`}
                  onClick={() => setActiveImg(i)}
                  style={i === activeImg ? { borderColor: project.accent, boxShadow: `0 0 0 1px ${project.accent}` } : {}}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    className={styles.modalThumbImg}
                    sizes="72px"
                  />
                  {i !== activeImg && <div className={styles.modalThumbDim} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Info ── */}
        <div className={styles.modalRight}>
          <div className={styles.modalBadge} style={{ color: project.accent, borderColor: `rgba(${project.accentRgb},0.25)`, background: `rgba(${project.accentRgb},0.07)` }}>
            <span className={styles.modalNum}>{project.num}</span>
            <span className={styles.modalLabel}>{project.label}</span>
          </div>

          <h3 className={styles.modalTitle}>{project.title}</h3>
          <p className={styles.modalTagline} style={{ color: project.accent }}>{project.tagline}</p>
          <p className={styles.modalDesc}>{project.desc}</p>

          <div className={styles.modalChips}>
            <div className={styles.modalChip}>
              <span className={styles.modalChipLabel}>Year</span>
              <span className={styles.modalChipValue}>{project.year}</span>
            </div>
            <div className={styles.modalChip}>
              <span className={styles.modalChipLabel}>Role</span>
              <span className={styles.modalChipValue}>{project.role}</span>
            </div>
            <div className={styles.modalChip}>
              <span className={styles.modalChipLabel}>Screenshots</span>
              <span className={styles.modalChipValue}>{project.images.length}</span>
            </div>
          </div>

          <div className={styles.modalTags}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={styles.modalTag}
                style={{ borderColor: `rgba(${project.accentRgb},0.3)`, color: project.accent, background: `rgba(${project.accentRgb},0.06)` }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className={styles.modalActions}>
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.modalCta}
                style={{ background: project.accent }}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M3 7.5h9M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Visit Live Site
              </a>
            ) : (
              <button className={styles.modalCtaGhost} onClick={onClose}>
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Project Card ─────────────────── */
function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 80, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 88%',
            end: 'top 55%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    setTilt({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${index === 0 ? styles.cardFeatured : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      onClick={onClick}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 ? 'transform 0.8s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease' : 'transform 0.08s linear',
        '--accent': project.accent,
        '--accent-rgb': project.accentRgb,
        opacity: 0,
      } as React.CSSProperties}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title} project details`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div
        className={styles.cardGlow}
        style={{ opacity: hovered ? 1 : 0, background: `radial-gradient(ellipse 100% 80% at 50% -10%, rgba(${project.accentRgb},0.15), transparent 70%)` }}
      />

      <div className={styles.cardImg}>
        <Image
          src={project.image}
          alt=""
          aria-hidden="true"
          fill
          className={styles.cardPhotoBg}
          sizes="40px"
        />
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className={styles.cardPhoto}
          sizes={index === 0
            ? '(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px'
            : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px'}
        />
        <div className={styles.cardImgFade} />
        <div
          className={styles.cardImgAccent}
          style={{ background: `linear-gradient(to top, rgba(${project.accentRgb},0.18) 0%, transparent 55%)` }}
        />
        {project.images.length > 1 && (
          <div className={styles.cardImgCount} style={{ color: project.accent, borderColor: `rgba(${project.accentRgb},0.35)` }}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <rect x="0.5" y="2.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.1"/>
              <path d="M3 2.5V1.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H8.5" stroke="currentColor" strokeWidth="1.1"/>
            </svg>
            {project.images.length}
          </div>
        )}
        <div className={styles.cardOverlay} style={{ opacity: hovered ? 1 : 0 }}>
          <div className={styles.cardOverlayBtn} style={{ borderColor: `rgba(${project.accentRgb},0.6)`, color: project.accent }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            View Project
          </div>
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardTopRow}>
          <span className={styles.cardNum} style={{ color: project.accent }}>{project.num}</span>
          <span className={styles.cardYear}>{project.year}</span>
        </div>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardTagline} style={{ color: project.accent }}>{project.tagline}</p>
        <div className={styles.cardTags}>
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={styles.cardTag}
              style={{ borderColor: `rgba(${project.accentRgb},0.28)`, color: project.accent, background: `rgba(${project.accentRgb},0.05)` }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className={styles.cardTag} style={{ borderColor: `rgba(${project.accentRgb},0.28)`, color: project.accent, background: `rgba(${project.accentRgb},0.05)` }}>
              +{project.tags.length - 3}
            </span>
          )}
        </div>
        <div className={styles.cardBottom}>
          <span className={styles.cardRole}>{project.role}</span>
          {project.link && (
            <span className={styles.cardLive} style={{ color: project.accent, borderColor: `rgba(${project.accentRgb},0.3)`, background: `rgba(${project.accentRgb},0.06)` }}>
              <span className={styles.cardLiveDot} style={{ background: project.accent }} />
              Live
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Vault Section ─────────────────── */
export default function VaultSection({ data }: { data: Project[] }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsList = data || [];

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
    <section id="vault" className={`section ${styles.vault}`} aria-label="Selected works">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className={styles.header}>
          <span className="text-label" style={{ opacity: 0 }}>Selected Works</span>
          <h2 className={`text-h2 ${styles.title}`} style={{ opacity: 0 }}>
            The <span className="gradient-neon">Vault</span>
          </h2>
          <p className={styles.subtitle} style={{ opacity: 0 }}>
            Projects that push the boundary between engineering and experience.
          </p>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {projectsList.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </div>

        {/* Footer divider */}
        <div className={styles.comingSoon}>
          <div className={styles.comingSoonLine} />
          <span className="text-label">More projects coming soon · Drop your project details below</span>
          <div className={styles.comingSoonLine} />
        </div>
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}
