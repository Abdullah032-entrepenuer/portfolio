'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FiGithub, FiExternalLink, FiSend, FiCheck, FiMail, FiPhone } from 'react-icons/fi';
import { SiFiverr } from 'react-icons/si';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContactData } from '@/lib/db';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

const BeaconMesh = dynamic(() => import('@/components/3d/BeaconMesh'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const budgetOptions = [
  'Under $500',
  '$500 – $2,000',
  '$2,000 – $5,000',
  '$5,000 – $10,000',
  '$10,000+',
  'Let\'s Discuss',
];

const projectTypes = [
  'Full-Stack Web App',
  '3D / WebGL Experience',
  'E-Commerce Platform',
  'Technical Documentation',
  'Consultation',
  'Other',
];

export default function ContactSection({ data }: { data: ContactData }) {
  const emailVal = data?.email || 'abdullahawais034@gmail.com';
  const phoneVal = data?.phone || '923250995477';
  const phoneDisplayVal = data?.phoneDisplay || '0325 099 5477';

  const [form, setForm] = useState({ name: '', email: '', type: '', budget: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const submitBtnRef = useMagneticEffect({ strength: 0.3, radius: 70 });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 1, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
          }
        );
      }

      // Form entrance
      if (formRef.current) {
        gsap.fromTo(formRef.current,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email required';
    if (!form.message.trim() || form.message.length < 20) errs.message = 'Tell me more about your project (20+ chars)';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);

    const phone = phoneVal;
    const text = `*New Project Inquiry from Portfolio*\n\n*Name:* ${form.name}\n*Email:* ${form.email}\n*Project Type:* ${form.type || 'Not specified'}\n*Budget:* ${form.budget || 'Not specified'}\n\n*Project Brief:*\n${form.message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');

    setSending(false);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => { const n = { ...prev }; delete n[e.target.name]; return n; });
  };

  return (
    <section ref={sectionRef} id="contact" className="py-32 bg-obsidian-900 border-t border-white/5 relative z-10 overflow-hidden" aria-label="Contact section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── Left: Info + 3D Beacon ── */}
          <div ref={headerRef} className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <span className="text-sm font-mono tracking-widest text-electric-cyan uppercase mb-3 block" style={{ opacity: 0 }}>
                Start a Conversation
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight" style={{ opacity: 0 }}>
                Let&apos;s build something <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-electric-gold">extraordinary.</span>
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed font-light mb-8" style={{ opacity: 0 }}>
                Whether you have a fully-formed idea or just a spark of inspiration, I&apos;m here to turn it into
                a production-ready, high-performance product. High-ticket projects welcome.
              </p>
            </div>

            {/* Embedded 3D Beacon Scene */}
            <div className="relative rounded-2xl border border-white/10 bg-obsidian-800/30 backdrop-blur-md p-4 overflow-hidden flex items-center justify-center min-h-[220px]">
              <div className="absolute inset-0 pointer-events-none z-0">
                <BeaconMesh />
              </div>
              <div className="relative z-10 text-center">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-electric-cyan animate-ping" />
                  Signal Active · Ready to Build
                </span>
              </div>
            </div>

            {/* Direct Contact Chips */}
            <div className="flex flex-col gap-3" style={{ opacity: 0 }}>
              <a href={`mailto:${emailVal}`} className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-obsidian-800/40 hover:border-electric-cyan/30 transition-all text-white/80 hover:text-white" id="link-email">
                <FiMail size={18} className="text-electric-cyan" />
                <span className="text-sm font-mono">{emailVal}</span>
              </a>
              <a href={`tel:+${phoneVal}`} className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-obsidian-800/40 hover:border-electric-gold/30 transition-all text-white/80 hover:text-white" id="link-phone">
                <FiPhone size={18} className="text-electric-gold" />
                <span className="text-sm font-mono">{phoneDisplayVal}</span>
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a href="https://www.fiverr.com/users/abdu1lah_awais" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-obsidian-800/40 hover:border-green-500/30 transition-all text-white/80 hover:text-white text-xs font-mono" id="link-fiverr">
                  <div className="flex items-center gap-2">
                    <SiFiverr size={18} className="text-green-500" />
                    <span>Fiverr</span>
                  </div>
                  <FiExternalLink size={12} className="opacity-50" />
                </a>
                <a href="https://github.com/abdullah-032s" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-obsidian-800/40 hover:border-white/20 transition-all text-white/80 hover:text-white text-xs font-mono" id="link-github">
                  <div className="flex items-center gap-2">
                    <FiGithub size={18} />
                    <span>GitHub</span>
                  </div>
                  <FiExternalLink size={12} className="opacity-50" />
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div ref={formRef} className="lg:col-span-7 rounded-3xl border border-white/10 bg-obsidian-800/40 backdrop-blur-xl p-8 md:p-10 shadow-2xl relative" style={{ opacity: 0 }}>
            {submitted ? (
              <div className="py-16 text-center space-y-4" role="alert" aria-live="polite">
                <div className="w-16 h-16 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan flex items-center justify-center mx-auto">
                  <FiCheck size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white">Message received!</h3>
                <p className="text-white/60 max-w-md mx-auto text-sm">
                  Thanks for reaching out. I&apos;ll review your project details and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-label="Contact form">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-xs font-mono text-white/60 uppercase tracking-wider block">Your Name</label>
                    <input id="contact-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Abdullah Khan" className={`w-full bg-obsidian-900 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-electric-cyan transition-colors ${errors.name ? 'border-red-500' : ''}`} autoComplete="name" />
                    {errors.name && <span className="text-red-400 text-xs font-mono block">{errors.name}</span>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-xs font-mono text-white/60 uppercase tracking-wider block">Email Address</label>
                    <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@company.com" className={`w-full bg-obsidian-900 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-electric-cyan transition-colors ${errors.email ? 'border-red-500' : ''}`} autoComplete="email" />
                    {errors.email && <span className="text-red-400 text-xs font-mono block">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-type" className="text-xs font-mono text-white/60 uppercase tracking-wider block">Project Type</label>
                    <select id="contact-type" name="type" value={form.type} onChange={handleChange} className="w-full bg-obsidian-900 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-electric-cyan transition-colors">
                      <option value="">Select a type…</option>
                      {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-budget" className="text-xs font-mono text-white/60 uppercase tracking-wider block">Budget Range</label>
                    <select id="contact-budget" name="budget" value={form.budget} onChange={handleChange} className="w-full bg-obsidian-900 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-electric-cyan transition-colors">
                      <option value="">Select a range…</option>
                      {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-xs font-mono text-white/60 uppercase tracking-wider block">Project Brief</label>
                  <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project — what are you building, what problem does it solve, and what's your timeline?" className={`w-full bg-obsidian-900 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-electric-cyan transition-colors ${errors.message ? 'border-red-500' : ''}`} rows={5} />
                  {errors.message && <span className="text-red-400 text-xs font-mono block">{errors.message}</span>}
                </div>

                <button
                  ref={submitBtnRef as React.RefObject<HTMLButtonElement | null>}
                  id="btn-send"
                  type="submit"
                  className="w-full py-4 rounded-xl bg-electric-cyan text-obsidian-900 font-bold text-sm tracking-wide uppercase hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                  disabled={sending}
                  aria-label={sending ? 'Sending message…' : 'Send project brief'}
                >
                  {sending ? (
                    <>Sending…</>
                  ) : (
                    <>
                      <FiSend size={16} />
                      Send Project Brief
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
