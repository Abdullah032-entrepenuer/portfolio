'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Vault.module.css';

const projects = [
  {
    id: 'dhaba3d',
    num: '01',
    label: 'E‑Commerce · 3D Web · Frontend',
    title: 'Dhaba‑3D',
    tagline: 'Where products come alive.',
    desc: 'An innovative e-commerce platform for 3D-printed items, featuring a fully interactive 3D product viewer built with React Three Fiber. Customers can rotate, inspect, and configure products in real time before purchase — a first-of-its-kind experience in the 3D printing retail space.',
    image: '/dhaba3d.png',
    imageAlt: 'Dhaba-3D e-commerce platform with interactive 3D product viewer',
    tags: ['React Three Fiber', 'WebGL', 'Node.js', 'MongoDB', 'Stripe'],
    accent: '#C8FF00',
    accentDim: 'rgba(200, 255, 0, 0.08)',
    device: 'laptop',
    year: '2024',
    role: 'Full‑Stack Developer',
  },
  {
    id: 'rivaan',
    num: '02',
    label: 'Brand Identity · Full‑Stack · Strategy',
    title: 'Rivaan',
    tagline: 'Premium water. Digital presence redefined.',
    desc: 'A complete digital transformation project for a premium consumer water brand. Encompassing brand identity design, full-stack website development, and social media content strategy — transforming Rivaan from concept to a market-ready premium product with a cohesive digital presence.',
    image: '/rivaan.png',
    imageAlt: 'Rivaan premium water brand website and digital identity',
    tags: ['Next.js', 'Framer Motion', 'Brand Identity', 'Social Media', 'Content Strategy'],
    accent: '#06B6D4',
    accentDim: 'rgba(6, 182, 212, 0.08)',
    device: 'laptop',
    year: '2024',
    role: 'Tech Lead & Brand Strategist',
  },
  {
    id: 'dairy-farm',
    num: '03',
    label: 'AgriTech · Full‑Stack',
    title: 'Dairy Farm Management',
    tagline: 'Modernizing agriculture with tech.',
    desc: 'A comprehensive management system for dairy farms to track livestock, monitor production, and manage daily operations through an intuitive dashboard.',
    image: '/dairy-farm.png',
    imageAlt: 'Dairy Farm Management Dashboard',
    tags: ['React', 'Node.js', 'MongoDB', 'Dashboard'],
    accent: '#10B981',
    accentDim: 'rgba(16, 185, 129, 0.08)',
    device: 'laptop',
    year: '2025',
    role: 'Full‑Stack Developer',
  },
  {
    id: 'car-bidding',
    num: '04',
    label: 'Marketplace · Auctions',
    title: 'Car Bidding Platform',
    tagline: 'Find your ultimate ride.',
    desc: 'A real-time auction marketplace for prestigious vehicles. Features transparent bidding, secure payments, and verified ownership records for a seamless buying experience.',
    image: '/car-bidding.jpeg',
    imageAlt: 'Car Bidding Platform Homepage',
    tags: ['Next.js', 'WebSockets', 'Payment Gateway'],
    accent: '#3B82F6',
    accentDim: 'rgba(59, 130, 246, 0.08)',
    device: 'laptop',
    year: '2025',
    role: 'Full‑Stack Developer',
  },
  {
    id: 'auto-care',
    num: '05',
    label: 'E‑Commerce · Auto Parts',
    title: 'Auto Care',
    tagline: 'Your one-stop shop for quality auto parts.',
    desc: 'An e-commerce platform connecting users to a vast network of trusted auto parts vendors, offering competitive prices and reliable shipping.',
    image: '/auto-care.jpeg',
    imageAlt: 'Auto Care E-Commerce Store',
    tags: ['React', 'E-Commerce', 'Logistics'],
    accent: '#1DBF73',
    accentDim: 'rgba(29, 191, 115, 0.08)',
    device: 'laptop',
    year: '2025',
    role: 'Full‑Stack Developer',
  },
];

type Project = typeof projects[0];

function LaptopMockup({ project }: { project: Project }) {
  const mockupRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = mockupRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={mockupRef}
      className={styles.mockupWrapper}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 ? 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)' : 'transform 0.1s ease-out',
      }}
      aria-label={`Device mockup showing ${project.title}`}
    >
      {/* Glow */}
      <div className={styles.mockupGlow} style={{ background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${project.accent}30, transparent 70%)` }} />

      {/* Laptop body */}
      <div className={styles.laptop}>
        {/* Screen */}
        <div className={styles.laptopScreen}>
          <div className={styles.laptopBezel}>
            {/* Camera */}
            <div className={styles.laptopCamera} />
            {/* Screenshot */}
            <div className={styles.laptopDisplay}>
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                className={styles.projectImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Screen glare */}
              <div className={styles.screenGlare} />
            </div>
          </div>
        </div>
        {/* Base */}
        <div className={styles.laptopBase}>
          <div className={styles.laptopHinge} />
          <div className={styles.laptopBottom} />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <article
      className={`${styles.project} ${isEven ? styles.projectEven : styles.projectOdd}`}
      aria-label={`Project: ${project.title}`}
    >
      {/* Text Content */}
      <div className={styles.projectContent}>
        <div className={styles.projectMeta}>
          <span className={styles.projectNum} style={{ color: project.accent }}>{project.num}</span>
          <span className="text-label">{project.label}</span>
        </div>

        <h3 className={`text-h2 ${styles.projectTitle}`}>
          {project.title}
        </h3>

        <p className={styles.tagline} style={{ color: project.accent }}>
          {project.tagline}
        </p>

        <p className={styles.projectDesc}>{project.desc}</p>

        {/* Meta chips */}
        <div className={styles.projectInfoRow}>
          <div className={styles.infoChip}>
            <span className={styles.infoLabel}>Year</span>
            <span>{project.year}</span>
          </div>
          <div className={styles.infoChip}>
            <span className={styles.infoLabel}>Role</span>
            <span>{project.role}</span>
          </div>
        </div>

        {/* Tags */}
        <div className={styles.projectTags}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={styles.projectTag}
              style={{ borderColor: `${project.accent}30`, color: project.accent }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Mockup */}
      <div className={styles.projectMockup}>
        <LaptopMockup project={project} />
      </div>
    </article>
  );
}

export default function Vault() {
  return (
    <section id="vault" className={`section ${styles.vault}`} aria-label="Selected works">
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className="text-label">Selected Works</span>
          <h2 className={`text-h2 ${styles.title}`}>
            The <span className="gradient-neon">Vault</span>
          </h2>
          <p className={styles.subtitle}>
            Projects that push the boundary between engineering and experience.
          </p>
        </div>

        {/* Projects */}
        <div className={styles.projects}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Coming soon note */}
        <div className={styles.comingSoon}>
          <div className={styles.comingSoonLine} />
          <span className="text-label">More projects coming soon · Drop your project details below</span>
          <div className={styles.comingSoonLine} />
        </div>
      </div>
    </section>
  );
}
