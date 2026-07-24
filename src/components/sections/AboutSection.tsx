'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AboutData } from '@/lib/db';

const HolographicGlobe = dynamic(() => import('@/components/3d/HolographicGlobe'), { ssr: false });

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
  const title = data?.title || 'Not just a developer.<br />An <span class="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-electric-gold">engineer</span> who ships.';
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
    <section ref={sectionRef} id="about" className="py-32 bg-obsidian-900 border-t border-white/5 relative z-10 overflow-hidden" aria-label="About Abdullah Awais">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── Left: Photo + 3D Holographic Globe + Stats ── */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="relative group rounded-3xl border border-white/10 bg-obsidian-800/40 backdrop-blur-xl p-6 overflow-hidden flex flex-col items-center" data-about-photo>
              {/* Background 3D Holographic Globe behind profile */}
              <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <HolographicGlobe />
              </div>

              {/* Profile Image Frame */}
              <div className="relative z-10 w-64 h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-6 bg-gradient-to-b from-white/5 to-obsidian-900/60 backdrop-blur-md flex items-center justify-center">
                <Image
                  src="/profile-nobg.png"
                  alt="Abdullah Awais — Full-Stack Developer & Senior Engineer"
                  fill
                  className="object-contain object-bottom group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_10px_25px_rgba(0,240,255,0.25)]"
                  priority
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Badge */}
              <div className="relative z-10 w-full bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md flex items-center gap-4">
                <span className="text-2xl text-electric-cyan">{floatingBadge.icon}</span>
                <div>
                  <div className="text-sm font-bold text-white">{floatingBadge.title}</div>
                  <div className="text-xs text-white/50">{floatingBadge.sub}</div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl border border-white/5 bg-obsidian-800/40 backdrop-blur-md flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-bold font-mono text-electric-cyan mb-1" data-stat-value>{stat.value}</span>
                  <span className="text-[11px] text-white/50 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Bio + Skills ── */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <span className="text-sm font-mono tracking-widest text-electric-cyan uppercase mb-3 block">
                The Person Behind the Code
              </span>
              <h2 ref={titleRef} className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: title }} style={{ opacity: 0 }} />

              <div ref={bioRef} className="space-y-4 text-white/60 text-base md:text-lg leading-relaxed font-light">
                {bioParagraphs.map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: para }} style={{ opacity: 0 }} />
                ))}
              </div>
            </div>

            {/* Enhanced Skills Section */}
            <div ref={skillsRef} className="space-y-5 pt-4 border-t border-white/5">
              <span className="text-xs font-mono tracking-widest text-white/70 uppercase block mb-4">
                Core Proficiencies & Technical Mastery
              </span>
              {skills.map((skill, i) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-mono">
                    <span className="text-white/80 font-medium">{skill.name}</span>
                    <span className="text-electric-cyan font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-obsidian-800 rounded-full border border-white/5 overflow-hidden shadow-inner">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-electric-cyan to-electric-gold shadow-[0_0_12px_rgba(0,240,255,0.6)]"
                      data-skill-fill
                      style={{ width: `${skill.level}%`, transformOrigin: 'left', transform: 'scaleX(0)' }}
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
