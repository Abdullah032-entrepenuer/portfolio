'use client';

import { useState, useRef, useEffect } from 'react';
import { FiGithub, FiExternalLink, FiSend, FiCheck, FiMail, FiPhone } from 'react-icons/fi';
import { SiFiverr } from 'react-icons/si';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.css';
import { ContactData } from '@/lib/db';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

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
    <section ref={sectionRef} id="contact" className={`section ${styles.contact}`} aria-label="Contact section">
      <div className="container">
        <div className={styles.grid}>
          {/* ── Left: Info ── */}
          <div ref={headerRef} className={styles.leftCol}>
            <span className="text-label" style={{ opacity: 0 }}>Start a Conversation</span>
            <h2 className={`text-h2 ${styles.title}`} style={{ opacity: 0 }}>
              Let&apos;s build something<br />
              <span className="gradient-neon">extraordinary.</span>
            </h2>
            <p className={styles.desc} style={{ opacity: 0 }}>
              Whether you have a fully-formed idea or just a spark of inspiration, I&apos;m here to turn it into
              a production-ready, high-performance product. High-ticket projects welcome.
            </p>

            <div className={styles.chips} style={{ opacity: 0 }}>
              <a href={`mailto:${emailVal}`} className={styles.chip} aria-label="Email Abdullah Awais" id="link-email">
                <FiMail size={18} color="var(--neon)" />
                <span>{emailVal}</span>
              </a>
              <a href={`tel:+${phoneVal}`} className={styles.chip} aria-label="Call Abdullah Awais" id="link-phone">
                <FiPhone size={18} color="var(--violet)" />
                <span>{phoneDisplayVal}</span>
              </a>
              <a href="https://www.fiverr.com/users/abdu1lah_awais" target="_blank" rel="noopener noreferrer" className={styles.chip} aria-label="Hire me on Fiverr" id="link-fiverr">
                <SiFiverr size={18} color="#1DBF73" />
                <span>Fiverr Profile</span>
                <FiExternalLink size={14} style={{ opacity: 0.5 }} />
              </a>
              <a href="https://github.com/abdullah-032s" target="_blank" rel="noopener noreferrer" className={styles.chip} aria-label="View my GitHub profile" id="link-github">
                <FiGithub size={18} />
                <span>GitHub</span>
                <FiExternalLink size={14} style={{ opacity: 0.5 }} />
              </a>
            </div>

            <div className={styles.availability} style={{ opacity: 0 }}>
              <div className={styles.availDot} />
              <span>Currently accepting new projects for Q3 2025</span>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div ref={formRef} className={styles.formWrapper} style={{ opacity: 0 }}>
            {submitted ? (
              <div className={styles.successState} role="alert" aria-live="polite">
                <div className={styles.successIcon}>
                  <FiCheck size={28} />
                </div>
                <h3 className={styles.successTitle}>Message received!</h3>
                <p className={styles.successDesc}>
                  Thanks for reaching out. I&apos;ll review your project details and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form} noValidate aria-label="Contact form">
                <div className={styles.row}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-name" className={styles.label}>Your Name</label>
                    <input id="contact-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Abdullah Khan" className={`${styles.input} ${errors.name ? styles.inputError : ''}`} autoComplete="name" />
                    {errors.name && <span className={styles.error} role="alert">{errors.name}</span>}
                  </div>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-email" className={styles.label}>Email Address</label>
                    <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@company.com" className={`${styles.input} ${errors.email ? styles.inputError : ''}`} autoComplete="email" />
                    {errors.email && <span className={styles.error} role="alert">{errors.email}</span>}
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-type" className={styles.label}>Project Type</label>
                    <select id="contact-type" name="type" value={form.type} onChange={handleChange} className={styles.select}>
                      <option value="">Select a type…</option>
                      {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-budget" className={styles.label}>Budget Range</label>
                    <select id="contact-budget" name="budget" value={form.budget} onChange={handleChange} className={styles.select}>
                      <option value="">Select a range…</option>
                      {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-message" className={styles.label}>Project Brief</label>
                  <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project — what are you building, what problem does it solve, and what's your timeline?" className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`} rows={5} />
                  {errors.message && <span className={styles.error} role="alert">{errors.message}</span>}
                </div>

                <button
                  ref={submitBtnRef as React.RefObject<HTMLButtonElement | null>}
                  id="btn-send"
                  type="submit"
                  className={`btn btn-primary ${styles.submitBtn}`}
                  disabled={sending}
                  aria-label={sending ? 'Sending message…' : 'Send project brief'}
                >
                  {sending ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <FiSend size={16} aria-hidden="true" />
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
