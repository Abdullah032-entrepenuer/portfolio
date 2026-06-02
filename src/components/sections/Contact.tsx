'use client';

import { useState } from 'react';
import { FiGithub, FiExternalLink, FiSend, FiCheck, FiMail, FiPhone } from 'react-icons/fi';
import { SiFiverr } from 'react-icons/si';
import styles from './Contact.module.css';

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

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: '', budget: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

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

    // Construct WhatsApp message
    const phone = "923250995477";
    const text = `*New Project Inquiry from Portfolio*\n\n*Name:* ${form.name}\n*Email:* ${form.email}\n*Project Type:* ${form.type || 'Not specified'}\n*Budget:* ${form.budget || 'Not specified'}\n\n*Project Brief:*\n${form.message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedText}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    setSending(false);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => { const n = { ...prev }; delete n[e.target.name]; return n; });
  };

  return (
    <section id="contact" className={`section ${styles.contact}`} aria-label="Contact section">
      <div className="container">
        <div className={styles.grid}>
          {/* ── Left: Info ── */}
          <div className={styles.leftCol}>
            <span className="text-label">Start a Conversation</span>
            <h2 className={`text-h2 ${styles.title}`}>
              Let&apos;s build something<br />
              <span className="gradient-neon">extraordinary.</span>
            </h2>
            <p className={styles.desc}>
              Whether you have a fully-formed idea or just a spark of inspiration, I&apos;m here to turn it into
              a production-ready, high-performance product. High-ticket projects welcome.
            </p>

            {/* Contact chips */}
            <div className={styles.chips}>
              <a
                href="mailto:abdullahawais034@gmail.com"
                className={styles.chip}
                aria-label="Email Abdullah Awais"
                id="link-email"
              >
                <FiMail size={18} color="var(--neon)" />
                <span>abdullahawais034@gmail.com</span>
              </a>
              <a
                href="tel:+923250995477"
                className={styles.chip}
                aria-label="Call Abdullah Awais"
                id="link-phone"
              >
                <FiPhone size={18} color="var(--violet)" />
                <span>0325 099 5477</span>
              </a>
              <a
                href="https://www.fiverr.com/users/abdu1lah_awais"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.chip}
                aria-label="Hire me on Fiverr"
                id="link-fiverr"
              >
                <SiFiverr size={18} color="#1DBF73" />
                <span>Fiverr Profile</span>
                <FiExternalLink size={14} style={{ opacity: 0.5 }} />
              </a>
              <a
                href="https://github.com/abdullah-032s"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.chip}
                aria-label="View my GitHub profile"
                id="link-github"
              >
                <FiGithub size={18} />
                <span>GitHub</span>
                <FiExternalLink size={14} style={{ opacity: 0.5 }} />
              </a>
            </div>

            {/* Availability */}
            <div className={styles.availability}>
              <div className={styles.availDot} />
              <span>Currently accepting new projects for Q3 2025</span>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className={styles.formWrapper}>
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
              <form
                onSubmit={handleSubmit}
                className={styles.form}
                noValidate
                aria-label="Contact form"
              >
                {/* Row 1 */}
                <div className={styles.row}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-name" className={styles.label}>Your Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Abdullah Khan"
                      className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                      autoComplete="name"
                    />
                    {errors.name && <span className={styles.error} role="alert">{errors.name}</span>}
                  </div>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-email" className={styles.label}>Email Address</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      autoComplete="email"
                    />
                    {errors.email && <span className={styles.error} role="alert">{errors.email}</span>}
                  </div>
                </div>

                {/* Row 2 */}
                <div className={styles.row}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-type" className={styles.label}>Project Type</label>
                    <select
                      id="contact-type"
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      <option value="">Select a type…</option>
                      {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-budget" className={styles.label}>Budget Range</label>
                    <select
                      id="contact-budget"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      <option value="">Select a range…</option>
                      {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-message" className={styles.label}>Project Brief</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project — what are you building, what problem does it solve, and what's your timeline?"
                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                    rows={5}
                  />
                  {errors.message && <span className={styles.error} role="alert">{errors.message}</span>}
                </div>

                {/* Submit */}
                <button
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
