'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGithub,
  FiSend,
  FiCheck,
  FiMail,
  FiCopy,
  FiDownload,
  FiBriefcase,
  FiCpu,
} from 'react-icons/fi';
import { ContactData } from '@/lib/db';
import SpotlightCard from '@/components/ui/SpotlightCard';

const BeaconMesh = dynamic(() => import('@/components/3d/BeaconMesh'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[220px] flex items-center justify-center">
      <div className="w-20 h-20 rounded-full border border-dashed border-[#10B981]/30 animate-spin" />
    </div>
  ),
});

type FunnelMode = 'hiring' | 'consulting';

const budgetOptions = ['$2,000 – $5,000', '$5,000 – $10,000', '$10,000+'];

const projectTypes = [
  'Full-Stack AI / RAG Pipeline',
  '3D Spatial Web / R3F',
  'E-Commerce / MedusaJS',
  'System Architecture & Docs-as-Code',
];

export default function ContactSection({ data }: { data?: ContactData }) {
  const emailVal = data?.email || 'abdullahawais034@gmail.com';
  const phoneVal = data?.phone || '923250995477';

  const [mode, setMode] = useState<FunnelMode>('hiring');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Fast-track Hiring Form State
  const [hireForm, setHireForm] = useState({
    nameCompany: '',
    workEmail: '',
    challengeOrCalendly: '',
  });

  // High-Ticket Project Commission Form State
  const [projectForm, setProjectForm] = useState({
    name: '',
    email: '',
    type: projectTypes[0],
    budget: budgetOptions[1],
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailVal);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleHiringSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!hireForm.nameCompany.trim()) errs.nameCompany = 'Name & Company is required';
    if (!hireForm.workEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(hireForm.workEmail)) {
      errs.workEmail = 'Valid work email required';
    }
    if (!hireForm.challengeOrCalendly.trim()) {
      errs.challengeOrCalendly = 'Please share the role details or a scheduling link';
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const text = `*Engineering Role / Hiring Inquiry*\n\n*Name & Company:* ${hireForm.nameCompany}\n*Work Email:* ${hireForm.workEmail}\n*Role / Challenge / Calendly:* ${hireForm.challengeOrCalendly}`;
    const whatsappUrl = `https://wa.me/${phoneVal}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!projectForm.name.trim()) errs.name = 'Name is required';
    if (!projectForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(projectForm.email)) {
      errs.email = 'Valid email required';
    }
    if (!projectForm.message.trim() || projectForm.message.length < 15) {
      errs.message = 'Please share your project architecture brief (15+ chars)';
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const text = `*High-Ticket Architecture / Project Inquiry*\n\n*Name:* ${projectForm.name}\n*Email:* ${projectForm.email}\n*Architecture Scope:* ${projectForm.type}\n*Budget:* ${projectForm.budget}\n\n*Project Brief:*\n${projectForm.message}`;
    const whatsappUrl = `https://wa.me/${phoneVal}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-28 md:py-36 bg-[#050507] border-t border-white/[0.07] relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-12 items-start">
          {/* Left Column: Positioning, 3D Beacon & One-Click Quick Actions */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-[#10B981] mb-4">
                <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                <span>03 // START A CONVERSATION</span>
              </div>
              <h2
                id="contact-heading"
                className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-[1.1]"
              >
                Ready for Immediate{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-[#6366F1] to-[#8B5CF6]">
                  Systems Impact.
                </span>
              </h2>
              <p className="text-white/65 text-sm sm:text-base leading-relaxed">
                Whether you are hiring a Founding / Staff Full-Stack AI &amp; Spatial Web Engineer
                or commissioning an end-to-end production platform, select your track to connect
                directly.
              </p>
            </div>

            {/* Embedded 3D Beacon Scene */}
            <div className="relative rounded-2xl border border-white/[0.07] bg-[#0B0C10] p-4 overflow-hidden flex items-center justify-center min-h-[220px]">
              <div className="absolute inset-0 pointer-events-none z-0">
                <BeaconMesh />
              </div>
              <div className="relative z-10 text-center mt-28">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#050507]/90 border border-[#10B981]/30 text-[#10B981] text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                  TELEMETRY ACTIVE · RESPONSE &lt; 4 HOURS
                </span>
              </div>
            </div>

            {/* One-Click Quick Actions */}
            <div className="space-y-2.5 font-mono text-xs">
              <div className="text-white/40 uppercase tracking-widest text-[11px] mb-1">
                One-Click Quick Actions
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-white/[0.08] bg-[#0B0C10] hover:border-[#10B981]/50 transition-all text-white/90 hover:text-white text-left"
              >
                <span className="flex items-center gap-3 truncate">
                  <FiMail size={16} className="text-[#10B981] shrink-0" />
                  <span className="truncate">Copy Direct Email ({emailVal})</span>
                </span>
                {copiedEmail ? (
                  <span className="inline-flex items-center gap-1 text-[#10B981] font-semibold shrink-0">
                    <FiCheck size={14} /> Copied
                  </span>
                ) : (
                  <FiCopy size={14} className="text-white/50 shrink-0" />
                )}
              </button>

              <a
                href="/abdullah_awais_resume.pdf"
                download="Abdullah_Awais_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-4 rounded-xl border border-white/[0.08] bg-[#0B0C10] hover:border-[#10B981]/50 transition-all text-white/90 hover:text-white"
              >
                <span className="flex items-center gap-3">
                  <FiDownload size={16} className="text-[#10B981] shrink-0" />
                  <span>Download ATS Resume (PDF)</span>
                </span>
                <span className="text-[11px] text-[#10B981]">PDF ↗</span>
              </a>

              <a
                href="https://github.com/abdullah-032s"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-4 rounded-xl border border-white/[0.08] bg-[#0B0C10] hover:border-[#6366F1]/50 transition-all text-white/90 hover:text-white"
              >
                <span className="flex items-center gap-3">
                  <FiGithub size={16} className="text-[#6366F1] shrink-0" />
                  <span>View GitHub Profile</span>
                </span>
                <span className="text-[11px] text-[#A5B4FC]">@abdullah-032s ↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Dual-Mode Segmented Switcher & Dynamic Form */}
          <div className="lg:col-span-7">
            <SpotlightCard
              className="p-6 sm:p-8 md:p-10"
              spotlightColor={
                mode === 'hiring' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(99, 102, 241, 0.14)'
              }
              borderColor={
                mode === 'hiring' ? 'rgba(16, 185, 129, 0.45)' : 'rgba(99, 102, 241, 0.45)'
              }
            >
              {/* Animated Segmented Mode Switcher */}
              <div
                role="tablist"
                aria-label="Conversion Funnel Mode Switcher"
                className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 rounded-2xl bg-[#050507] border border-white/10 mb-8"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'hiring'}
                  onClick={() => {
                    setMode('hiring');
                    setSubmitted(false);
                    setErrors({});
                  }}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-mono text-xs transition-all duration-200 ${
                    mode === 'hiring'
                      ? 'bg-[#10B981] text-[#050507] font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                      : 'text-white/65 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FiBriefcase size={14} className="shrink-0" />
                  <span>Hire Full-Time / Remote Engineering Role</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'consulting'}
                  onClick={() => {
                    setMode('consulting');
                    setSubmitted(false);
                    setErrors({});
                  }}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-mono text-xs transition-all duration-200 ${
                    mode === 'consulting'
                      ? 'bg-[#6366F1] text-white font-bold shadow-[0_0_20px_rgba(99,102,241,0.35)]'
                      : 'text-white/65 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FiCpu size={14} className="shrink-0" />
                  <span>Commission High-Ticket Project / Architecture Consulting</span>
                </button>
              </div>

              {submitted ? (
                <div className="py-14 text-center space-y-4" role="alert" aria-live="polite">
                  <div className="w-14 h-14 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] flex items-center justify-center mx-auto">
                    <FiCheck size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Transmission Dispatched</h3>
                  <p className="text-white/65 max-w-md mx-auto text-sm">
                    Thank you for reaching out. Your inquiry has been routed directly—I will respond
                    within a few hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-white/10 text-xs font-mono text-white hover:bg-white/15"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {mode === 'hiring' ? (
                    <motion.div
                      key="hiring-tab"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Immediate Hiring Telemetry Strip */}
                      <div className="mb-7 p-4 rounded-xl bg-[#050507] border border-[#10B981]/25 space-y-2 font-mono text-xs">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/85">
                          <span className="inline-flex items-center gap-1.5 text-[#10B981] font-semibold">
                            <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                            Role Readiness: Immediate
                          </span>
                          <span className="text-white/30">|</span>
                          <span>Time Zone: UTC+5 (Flexible EU &amp; US-East Overlap)</span>
                        </div>
                        <div className="text-white/65 text-[11px]">
                          Engagement: Full-Time Remote / Founding Engineer / Contractor
                        </div>
                      </div>

                      {/* Streamlined 3-Field Fast-Track Input */}
                      <form
                        onSubmit={handleHiringSubmit}
                        className="space-y-5"
                        noValidate
                        aria-label="Fast-Track Engineering Hiring Form"
                      >
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label
                              htmlFor="hire-name-company"
                              className="text-xs font-mono text-white/70 uppercase tracking-wider block"
                            >
                              Your Name &amp; Company
                            </label>
                            <input
                              id="hire-name-company"
                              type="text"
                              value={hireForm.nameCompany}
                              onChange={(e) =>
                                setHireForm((s) => ({ ...s, nameCompany: e.target.value }))
                              }
                              placeholder="Alex Rivera · CTO @ Acme AI"
                              className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#10B981] transition-colors"
                            />
                            {errors.nameCompany && (
                              <span className="text-red-400 text-xs font-mono block">
                                {errors.nameCompany}
                              </span>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label
                              htmlFor="hire-work-email"
                              className="text-xs font-mono text-white/70 uppercase tracking-wider block"
                            >
                              Work Email
                            </label>
                            <input
                              id="hire-work-email"
                              type="email"
                              value={hireForm.workEmail}
                              onChange={(e) =>
                                setHireForm((s) => ({ ...s, workEmail: e.target.value }))
                              }
                              placeholder="alex@company.com"
                              className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#10B981] transition-colors"
                            />
                            {errors.workEmail && (
                              <span className="text-red-400 text-xs font-mono block">
                                {errors.workEmail}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="hire-challenge"
                            className="text-xs font-mono text-white/70 uppercase tracking-wider block"
                          >
                            Role / Engineering Challenge (or calendly link)
                          </label>
                          <textarea
                            id="hire-challenge"
                            rows={4}
                            value={hireForm.challengeOrCalendly}
                            onChange={(e) =>
                              setHireForm((s) => ({ ...s, challengeOrCalendly: e.target.value }))
                            }
                            placeholder="Share role details, tech stack focus (Next.js / Multi-Agent RAG / R3F / WebGPU), or paste your Calendly link for an immediate 10-min intro..."
                            className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#10B981] transition-colors"
                          />
                          {errors.challengeOrCalendly && (
                            <span className="text-red-400 text-xs font-mono block">
                              {errors.challengeOrCalendly}
                            </span>
                          )}
                        </div>

                        <button
                          type="submit"
                          className="w-full py-4 rounded-xl bg-[#10B981] text-[#050507] font-mono font-bold text-xs sm:text-sm tracking-wide uppercase hover:bg-[#34D399] transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.3)]"
                        >
                          <FiSend size={15} />
                          <span>Fast-Track Technical Intro</span>
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="consulting-tab"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <form
                        onSubmit={handleProjectSubmit}
                        className="space-y-5"
                        noValidate
                        aria-label="Commission High-Ticket Project Form"
                      >
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label
                              htmlFor="proj-name"
                              className="text-xs font-mono text-white/70 uppercase tracking-wider block"
                            >
                              Your Name
                            </label>
                            <input
                              id="proj-name"
                              type="text"
                              value={projectForm.name}
                              onChange={(e) =>
                                setProjectForm((s) => ({ ...s, name: e.target.value }))
                              }
                              placeholder="Jordan Vance"
                              className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#6366F1] transition-colors"
                            />
                            {errors.name && (
                              <span className="text-red-400 text-xs font-mono block">
                                {errors.name}
                              </span>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label
                              htmlFor="proj-email"
                              className="text-xs font-mono text-white/70 uppercase tracking-wider block"
                            >
                              Email Address
                            </label>
                            <input
                              id="proj-email"
                              type="email"
                              value={projectForm.email}
                              onChange={(e) =>
                                setProjectForm((s) => ({ ...s, email: e.target.value }))
                              }
                              placeholder="jordan@enterprise.io"
                              className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#6366F1] transition-colors"
                            />
                            {errors.email && (
                              <span className="text-red-400 text-xs font-mono block">
                                {errors.email}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label
                              htmlFor="proj-type"
                              className="text-xs font-mono text-white/70 uppercase tracking-wider block"
                            >
                              System Architecture Track
                            </label>
                            <select
                              id="proj-type"
                              value={projectForm.type}
                              onChange={(e) =>
                                setProjectForm((s) => ({ ...s, type: e.target.value }))
                              }
                              className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#6366F1] transition-colors"
                            >
                              {projectTypes.map((t) => (
                                <option key={t} value={t}>
                                  {t}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label
                              htmlFor="proj-budget"
                              className="text-xs font-mono text-white/70 uppercase tracking-wider block"
                            >
                              Allocated Budget
                            </label>
                            <select
                              id="proj-budget"
                              value={projectForm.budget}
                              onChange={(e) =>
                                setProjectForm((s) => ({ ...s, budget: e.target.value }))
                              }
                              className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#6366F1] transition-colors"
                            >
                              {budgetOptions.map((b) => (
                                <option key={b} value={b}>
                                  {b}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="proj-message"
                            className="text-xs font-mono text-white/70 uppercase tracking-wider block"
                          >
                            Project Brief &amp; Target SLA
                          </label>
                          <textarea
                            id="proj-message"
                            rows={4}
                            value={projectForm.message}
                            onChange={(e) =>
                              setProjectForm((s) => ({ ...s, message: e.target.value }))
                            }
                            placeholder="Describe your product architecture, AI/RAG or 3D spatial web requirements, and target launch timeline..."
                            className="w-full bg-[#050507] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#6366F1] transition-colors"
                          />
                          {errors.message && (
                            <span className="text-red-400 text-xs font-mono block">
                              {errors.message}
                            </span>
                          )}
                        </div>

                        <button
                          type="submit"
                          className="w-full py-4 rounded-xl bg-[#6366F1] text-white font-mono font-bold text-xs sm:text-sm tracking-wide uppercase hover:bg-[#8B5CF6] transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(99,102,241,0.35)]"
                        >
                          <FiSend size={15} />
                          <span>Submit Architecture Brief</span>
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
