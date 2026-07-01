'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FiLock, FiLogOut, FiGlobe, FiPlus, FiTrash2, 
  FiArrowUp, FiArrowDown, FiEdit, FiSave, FiAlertTriangle 
} from 'react-icons/fi';
import { PortfolioData, ServiceItem, ProjectItem, AboutStat, AboutSkill } from '@/lib/db';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isDefaultPassword, setIsDefaultPassword] = useState(false);

  // Portfolio State
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'services' | 'projects' | 'about' | 'contact'>('hero');
  
  // Editor States for lists
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  
  // Status feedback
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveErrorMsg, setSaveErrorMsg] = useState('');

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check');
      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
        fetchPortfolioData();
      } else {
        setIsLoggedIn(false);
        setLoading(false);
      }
    } catch (err) {
      console.error('Auth check failed', err);
      setLoading(false);
    }
  };

  const fetchPortfolioData = async () => {
    try {
      const res = await fetch('/api/portfolio');
      const data = await res.json();
      setPortfolio(data);
      // Basic check if they use default password (heuristic for local alert)
      setIsDefaultPassword(true); // default local flag
    } catch (err) {
      console.error('Failed to load portfolio data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
        setLoading(true);
        fetchPortfolioData();
      } else {
        setLoginError(data.error || 'Login failed');
      }
    } catch (err) {
      setLoginError('Server communication error');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsLoggedIn(false);
      setPassword('');
      setPortfolio(null);
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const handleSaveAll = async () => {
    if (!portfolio) return;
    setSaveStatus('saving');
    setSaveErrorMsg('');
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(portfolio),
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 4000);
      } else {
        setSaveStatus('error');
        setSaveErrorMsg(data.error || 'Failed to update file');
      }
    } catch (err) {
      setSaveStatus('error');
      setSaveErrorMsg('Server communication error');
    }
  };

  // Helper change functions
  const updateHero = (key: string, value: any) => {
    if (!portfolio) return;
    setPortfolio({
      ...portfolio,
      hero: {
        ...portfolio.hero,
        [key]: value
      }
    });
  };

  const updateContact = (key: string, value: any) => {
    if (!portfolio) return;
    setPortfolio({
      ...portfolio,
      contact: {
        ...portfolio.contact,
        [key]: value
      }
    });
  };

  const updateAbout = (key: string, value: any) => {
    if (!portfolio) return;
    setPortfolio({
      ...portfolio,
      about: {
        ...portfolio.about,
        [key]: value
      }
    });
  };

  // -------------------------------------------------------------
  // SERVICES HANDLERS
  // -------------------------------------------------------------
  const moveService = (index: number, direction: 'up' | 'down') => {
    if (!portfolio) return;
    const services = [...portfolio.services];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= services.length) return;
    
    // Swap
    const temp = services[index];
    services[index] = services[targetIndex];
    services[targetIndex] = temp;
    
    setPortfolio({ ...portfolio, services });
  };

  const removeService = (id: string) => {
    if (!portfolio) return;
    if (confirm('Are you sure you want to delete this service?')) {
      const services = portfolio.services.filter(s => s.id !== id);
      setPortfolio({ ...portfolio, services });
      if (editingServiceId === id) setEditingServiceId(null);
    }
  };

  const saveServiceEdit = (updatedService: ServiceItem) => {
    if (!portfolio) return;
    const services = portfolio.services.map(s => s.id === updatedService.id ? updatedService : s);
    setPortfolio({ ...portfolio, services });
    setEditingServiceId(null);
  };

  const addEmptyService = () => {
    if (!portfolio) return;
    const newId = `service-${Date.now()}`;
    const newService: ServiceItem = {
      id: newId,
      icon: '⚡',
      label: 'New Category',
      title: 'New Service Title',
      desc: 'Short descriptive details of this expertise.',
      tags: ['React', 'Next.js'],
      accent: 'neon',
      stat: 'Expert'
    };
    setPortfolio({
      ...portfolio,
      services: [...portfolio.services, newService]
    });
    setEditingServiceId(newId);
  };

  // -------------------------------------------------------------
  // PROJECTS HANDLERS
  // -------------------------------------------------------------
  const moveProject = (index: number, direction: 'up' | 'down') => {
    if (!portfolio) return;
    const projects = [...portfolio.projects];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;
    
    // Swap
    const temp = projects[index];
    projects[index] = projects[targetIndex];
    projects[targetIndex] = temp;
    
    // Recalculate string serials (01, 02, etc.)
    const updatedProjects = projects.map((p, i) => ({
      ...p,
      num: String(i + 1).padStart(2, '0')
    }));
    
    setPortfolio({ ...portfolio, projects: updatedProjects });
  };

  const removeProject = (id: string) => {
    if (!portfolio) return;
    if (confirm('Are you sure you want to remove this project?')) {
      const filtered = portfolio.projects.filter(p => p.id !== id);
      // Re-number
      const projects = filtered.map((p, i) => ({
        ...p,
        num: String(i + 1).padStart(2, '0')
      }));
      setPortfolio({ ...portfolio, projects });
      if (editingProjectId === id) setEditingProjectId(null);
    }
  };

  const saveProjectEdit = (updatedProject: ProjectItem) => {
    if (!portfolio) return;
    const projects = portfolio.projects.map(p => p.id === updatedProject.id ? updatedProject : p);
    setPortfolio({ ...portfolio, projects });
    setEditingProjectId(null);
  };

  const addEmptyProject = () => {
    if (!portfolio) return;
    const newId = `project-${Date.now()}`;
    const nextNum = String(portfolio.projects.length + 1).padStart(2, '0');
    const newProject: ProjectItem = {
      id: newId,
      num: nextNum,
      label: 'Full-Stack · Design',
      title: 'New Project Title',
      tagline: 'Short tagline overview.',
      desc: 'Longer project description that details challenges and solutions.',
      image: '/coursecraft-1.jpeg',
      images: ['/coursecraft-1.jpeg'],
      imageAlt: 'New Project visual showcase',
      tags: ['Next.js', 'React'],
      accent: '#8B5CF6',
      accentRgb: '139,92,246',
      year: String(new Date().getFullYear()),
      role: 'Lead Developer',
      link: null
    };
    setPortfolio({
      ...portfolio,
      projects: [...portfolio.projects, newProject]
    });
    setEditingProjectId(newId);
  };

  // -------------------------------------------------------------
  // RENDERS
  // -------------------------------------------------------------
  if (loading) {
    return (
      <div className="admin-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="logo"><span>AA</span>.</div>
          <div className="subtitle" style={{ marginTop: 10 }}>Loading Admin Console...</div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="admin-root">
        <div className="glow-bg" />
        <div className="login-container">
          <div className="card">
            <div className="title-area">
              <div className="logo"><span>AA</span>.</div>
              <h2 style={{ fontSize: '1.25rem', marginTop: 10 }}>Portfolio Admin Site</h2>
              <p className="subtitle">Enter the password configured in your environment to continue.</p>
            </div>
            
            {loginError && (
              <div className="alert alert-error">
                <FiLock style={{ marginRight: 8, verticalAlign: 'middle' }} />
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="password">Admin Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Unlock Console
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-root">
      <div className="glow-bg" />
      <div className="container">
        
        {/* Header */}
        <header className="dashboard-header">
          <div className="dashboard-title">
            <h1>Admin Control Panel</h1>
            <span>Abdullah Awais Portfolio Configuration</span>
          </div>
          <div className="header-actions">
            <a href="/" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <FiGlobe /> View Site
            </a>
            <button onClick={handleLogout} className="btn-secondary btn-logout">
              <FiLogOut /> Logout
            </button>
          </div>
        </header>

        {isDefaultPassword && (
          <div className="warning-box">
            <FiAlertTriangle size={18} />
            <span>Note: Configure the <strong>ADMIN_PASSWORD</strong> key in your <strong>.env.local</strong> file for enhanced production security. Default password is <strong>Abdullah@1122</strong>.</span>
          </div>
        )}

        <div className="dashboard-grid">
          {/* Tab Sidebar */}
          <aside className="tabs-nav">
            <button 
              className={`tab-btn ${activeTab === 'hero' ? 'active' : ''}`}
              onClick={() => setActiveTab('hero')}
            >
              <span>◈</span> Hero Area
            </button>
            <button 
              className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              <span>⚡</span> Services ({portfolio?.services.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <span>📁</span> Work Vault ({portfolio?.projects.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              <span>✎</span> About &amp; Skills
            </button>
            <button 
              className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveTab('contact')}
            >
              <span>✉</span> Contact Info
            </button>
          </aside>

          {/* Editor Panels */}
          <main className="tab-content">
            
            {/* HERO SECTION TAB */}
            {activeTab === 'hero' && portfolio && (
              <div>
                <div className="tab-header">
                  <h2>Hero Header Area</h2>
                  <span className="subtitle">Interactive headline and tech labels</span>
                </div>
                
                <div className="form-group">
                  <label>Title Words (Comma Separated)</label>
                  <input
                    type="text"
                    value={portfolio.hero.words.join(', ')}
                    onChange={(e) => updateHero('words', e.target.value.split(',').map(s => s.trim()))}
                    className="input-field"
                  />
                  <p className="subtitle" style={{ marginTop: 5 }}>Words forming the first line of the main landing screen (e.g. Engineering, Digital, Luxury.)</p>
                </div>

                <div className="form-group">
                  <label>Headline Sub-Words (Comma Separated)</label>
                  <input
                    type="text"
                    value={portfolio.hero.subWords.join(', ')}
                    onChange={(e) => updateHero('subWords', e.target.value.split(',').map(s => s.trim()))}
                    className="input-field"
                  />
                  <p className="subtitle" style={{ marginTop: 5 }}>Words forming the second line subtitle stagger sequence</p>
                </div>

                <div className="form-group">
                  <label>Hero Description</label>
                  <textarea
                    value={portfolio.hero.sub}
                    onChange={(e) => updateHero('sub', e.target.value)}
                    className="input-field textarea-field"
                  />
                </div>

                <div className="form-group">
                  <label>Technology List (Comma Separated)</label>
                  <input
                    type="text"
                    value={portfolio.hero.tech.join(', ')}
                    onChange={(e) => updateHero('tech', e.target.value.split(',').map(s => s.trim()))}
                    className="input-field"
                  />
                  <p className="subtitle" style={{ marginTop: 5 }}>Tags scrolling on the bottom strip of the Hero area</p>
                </div>
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && portfolio && (
              <div>
                <div className="tab-header">
                  <h2>Expertise &amp; Services</h2>
                  <button onClick={addEmptyService} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                    <FiPlus /> Add Service
                  </button>
                </div>

                <div className="items-list">
                  {portfolio.services.map((service, index) => {
                    const isEditing = editingServiceId === service.id;
                    return (
                      <div key={service.id} className={`item-row ${isEditing ? 'item-editor-card' : ''}`}>
                        {isEditing ? (
                          // Service Card Editor
                          <ServiceEditorForm 
                            service={service} 
                            onCancel={() => setEditingServiceId(null)} 
                            onSave={saveServiceEdit} 
                          />
                        ) : (
                          // Service Row Preview
                          <>
                            <div className="item-info">
                              <span className="item-title">{service.icon} {service.title}</span>
                              <div className="item-meta">
                                <span>Label: {service.label}</span>
                                <span>Accent: {service.accent}</span>
                                <span>Stat: {service.stat}</span>
                              </div>
                            </div>
                            <div className="item-actions">
                              <button onClick={() => moveService(index, 'up')} disabled={index === 0} className="btn-icon">
                                <FiArrowUp size={16} />
                              </button>
                              <button onClick={() => moveService(index, 'down')} disabled={index === portfolio.services.length - 1} className="btn-icon">
                                <FiArrowDown size={16} />
                              </button>
                              <button onClick={() => setEditingServiceId(service.id)} className="btn-icon">
                                <FiEdit size={16} />
                              </button>
                              <button onClick={() => removeService(service.id)} className="btn-icon btn-icon-danger">
                                <FiTrash2 size={16} />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && portfolio && (
              <div>
                <div className="tab-header">
                  <h2>Work Vault Projects</h2>
                  <button onClick={addEmptyProject} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                    <FiPlus /> Add Project
                  </button>
                </div>

                <div className="items-list">
                  {portfolio.projects.map((project, index) => {
                    const isEditing = editingProjectId === project.id;
                    return (
                      <div key={project.id} className={`item-row ${isEditing ? 'item-editor-card' : ''}`}>
                        {isEditing ? (
                          <ProjectEditorForm 
                            project={project} 
                            onCancel={() => setEditingProjectId(null)} 
                            onSave={saveProjectEdit} 
                          />
                        ) : (
                          <>
                            <div className="item-info">
                              <span className="item-title">{project.num}. {project.title}</span>
                              <div className="item-meta">
                                <span>Tagline: {project.tagline}</span>
                                <span>Role: {project.role}</span>
                                <span>Year: {project.year}</span>
                                {project.link && <span style={{ color: 'var(--neon)' }}>Live link set</span>}
                              </div>
                            </div>
                            <div className="item-actions">
                              <button onClick={() => moveProject(index, 'up')} disabled={index === 0} className="btn-icon">
                                <FiArrowUp size={16} />
                              </button>
                              <button onClick={() => moveProject(index, 'down')} disabled={index === portfolio.projects.length - 1} className="btn-icon">
                                <FiArrowDown size={16} />
                              </button>
                              <button onClick={() => setEditingProjectId(project.id)} className="btn-icon">
                                <FiEdit size={16} />
                              </button>
                              <button onClick={() => removeProject(project.id)} className="btn-icon btn-icon-danger">
                                <FiTrash2 size={16} />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ABOUT TAB */}
            {activeTab === 'about' && portfolio && (
              <div>
                <div className="tab-header">
                  <h2>About Abdullah &amp; Skills</h2>
                  <span className="subtitle">Biography details and skill percentages</span>
                </div>

                <div className="form-group">
                  <label>Title Headline (Supports HTML tags)</label>
                  <input
                    type="text"
                    value={portfolio.about.title}
                    onChange={(e) => updateAbout('title', e.target.value)}
                    className="input-field"
                  />
                  <p className="subtitle" style={{ marginTop: 5 }}>HTML structure accepted. e.g. An &lt;span class=&quot;gradient-violet&quot;&gt;engineer&lt;/span&gt; who ships.</p>
                </div>

                <div className="form-group">
                  <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Biography Paragraphs</span>
                    <button 
                      type="button" 
                      onClick={() => {
                        const bio = [...portfolio.about.bioParagraphs, ''];
                        updateAbout('bioParagraphs', bio);
                      }}
                      className="btn-secondary"
                      style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                    >
                      + Add Paragraph
                    </button>
                  </label>
                  
                  {portfolio.about.bioParagraphs.map((pText, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                      <textarea
                        value={pText}
                        onChange={(e) => {
                          const bio = [...portfolio.about.bioParagraphs];
                          bio[i] = e.target.value;
                          updateAbout('bioParagraphs', bio);
                        }}
                        className="input-field"
                        style={{ minHeight: 80 }}
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          const bio = portfolio.about.bioParagraphs.filter((_, idx) => idx !== i);
                          updateAbout('bioParagraphs', bio);
                        }}
                        className="btn-icon btn-icon-danger"
                        style={{ height: 'auto', alignSelf: 'stretch' }}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <hr style={{ borderColor: 'var(--border)', margin: '30px 0' }} />

                <div className="form-group">
                  <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Core Statistics</span>
                    <button 
                      type="button" 
                      onClick={() => {
                        const stats = [...portfolio.about.stats, { value: '0', label: 'Metric' }];
                        updateAbout('stats', stats);
                      }}
                      className="btn-secondary"
                      style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                    >
                      + Add Stat
                    </button>
                  </label>

                  <div className="items-list" style={{ marginTop: 10 }}>
                    {portfolio.about.stats.map((stat, i) => (
                      <div key={i} style={{ display: 'flex', gap: 15 }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ fontSize: '0.7rem' }}>Value (e.g. 50+)</label>
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => {
                              const stats = [...portfolio.about.stats];
                              stats[i] = { ...stat, value: e.target.value };
                              updateAbout('stats', stats);
                            }}
                            className="input-field"
                          />
                        </div>
                        <div style={{ flex: 2 }}>
                          <label style={{ fontSize: '0.7rem' }}>Label (e.g. Projects Delivered)</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => {
                              const stats = [...portfolio.about.stats];
                              stats[i] = { ...stat, label: e.target.value };
                              updateAbout('stats', stats);
                            }}
                            className="input-field"
                          />
                        </div>
                        <button 
                          type="button" 
                          onClick={() => {
                            const stats = portfolio.about.stats.filter((_, idx) => idx !== i);
                            updateAbout('stats', stats);
                          }}
                          className="btn-icon btn-icon-danger"
                          style={{ alignSelf: 'flex-end', height: 45 }}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <hr style={{ borderColor: 'var(--border)', margin: '30px 0' }} />

                <div className="form-group">
                  <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Core Skills &amp; Competencies</span>
                    <button 
                      type="button" 
                      onClick={() => {
                        const skills = [...portfolio.about.skills, { name: 'New Skill', level: 80 }];
                        updateAbout('skills', skills);
                      }}
                      className="btn-secondary"
                      style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                    >
                      + Add Skill
                    </button>
                  </label>

                  <div className="items-list" style={{ marginTop: 10 }}>
                    {portfolio.about.skills.map((skill, i) => (
                      <div key={i} style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                        <div style={{ flex: 2 }}>
                          <label style={{ fontSize: '0.7rem' }}>Skill Name</label>
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => {
                              const skills = [...portfolio.about.skills];
                              skills[i] = { ...skill, name: e.target.value };
                              updateAbout('skills', skills);
                            }}
                            className="input-field"
                          />
                        </div>
                        <div style={{ flex: 3, display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ flex: 1 }}>
                            <label style={{ fontSize: '0.7rem' }}>Level ({skill.level}%)</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={skill.level}
                              onChange={(e) => {
                                const skills = [...portfolio.about.skills];
                                skills[i] = { ...skill, level: parseInt(e.target.value) };
                                updateAbout('skills', skills);
                              }}
                              style={{ width: '100%', height: 6 }}
                            />
                          </div>
                          <span style={{ fontSize: '0.85rem', width: 35, textAlign: 'right', fontWeight: 'bold' }}>{skill.level}%</span>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => {
                            const skills = portfolio.about.skills.filter((_, idx) => idx !== i);
                            updateAbout('skills', skills);
                          }}
                          className="btn-icon btn-icon-danger"
                          style={{ alignSelf: 'flex-end', height: 45 }}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <hr style={{ borderColor: 'var(--border)', margin: '30px 0' }} />

                <div className="form-group">
                  <label>Floating Info Badge</label>
                  <div className="row-fields">
                    <div>
                      <label style={{ fontSize: '0.7rem' }}>Icon (Character/Emoji)</label>
                      <input
                        type="text"
                        value={portfolio.about.floatingBadge.icon}
                        onChange={(e) => {
                          updateAbout('floatingBadge', {
                            ...portfolio.about.floatingBadge,
                            icon: e.target.value
                          });
                        }}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.7rem' }}>Badge Title</label>
                      <input
                        type="text"
                        value={portfolio.about.floatingBadge.title}
                        onChange={(e) => {
                          updateAbout('floatingBadge', {
                            ...portfolio.about.floatingBadge,
                            title: e.target.value
                          });
                        }}
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <label style={{ fontSize: '0.7rem' }}>Badge Subtitle</label>
                    <input
                      type="text"
                      value={portfolio.about.floatingBadge.sub}
                      onChange={(e) => {
                        updateAbout('floatingBadge', {
                          ...portfolio.about.floatingBadge,
                          sub: e.target.value
                        });
                      }}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* CONTACT TAB */}
            {activeTab === 'contact' && portfolio && (
              <div>
                <div className="tab-header">
                  <h2>Contact Information</h2>
                  <span className="subtitle">Email, phone, and WhatsApp configurations</span>
                </div>

                <div className="form-group">
                  <label>Contact Email</label>
                  <input
                    type="email"
                    value={portfolio.contact.email}
                    onChange={(e) => updateContact('email', e.target.value)}
                    className="input-field"
                    placeholder="name@domain.com"
                  />
                </div>

                <div className="form-group">
                  <label>WhatsApp Integration Number (No spaces/special chars)</label>
                  <input
                    type="text"
                    value={portfolio.contact.phone}
                    onChange={(e) => updateContact('phone', e.target.value.replace(/[^0-9]/g, ''))}
                    className="input-field"
                    placeholder="923250995477"
                  />
                  <p className="subtitle" style={{ marginTop: 5 }}>Include country code, no + or spaces. (Used directly to open wa.me link)</p>
                </div>

                <div className="form-group">
                  <label>Contact Phone Display Text</label>
                  <input
                    type="text"
                    value={portfolio.contact.phoneDisplay}
                    onChange={(e) => updateContact('phoneDisplay', e.target.value)}
                    className="input-field"
                    placeholder="0325 099 5477"
                  />
                  <p className="subtitle" style={{ marginTop: 5 }}>Human readable format displayed on page chips</p>
                </div>
              </div>
            )}

            {/* SAVE FLOATER */}
            <div className="save-bar">
              <div>
                {saveStatus === 'saving' && <span style={{ color: 'var(--violet)' }}>Saving modifications...</span>}
                {saveStatus === 'success' && <span style={{ color: '#34d399' }}>✓ Portfolio data successfully updated!</span>}
                {saveStatus === 'error' && <span style={{ color: '#f87171' }}>✗ Error: {saveErrorMsg}</span>}
                {saveStatus === 'idle' && <span style={{ color: 'var(--white-muted)' }}>Make sure to save after edits are complete.</span>}
              </div>
              <button onClick={handleSaveAll} className="save-btn" disabled={saveStatus === 'saving'}>
                <FiSave style={{ marginRight: 8, verticalAlign: 'middle' }} />
                Save Changes
              </button>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// COMPONENT FOR SERVICE EDITOR FORM
// --------------------------------------------------------------------------
interface ServiceEditorFormProps {
  service: ServiceItem;
  onCancel: () => void;
  onSave: (service: ServiceItem) => void;
}

function ServiceEditorForm({ service, onCancel, onSave }: ServiceEditorFormProps) {
  const [formData, setFormData] = useState<ServiceItem>({ ...service });

  const handleChange = (key: keyof ServiceItem, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleTagsChange = (val: string) => {
    const arr = val.split(',').map(s => s.trim()).filter(Boolean);
    handleChange('tags', arr);
  };

  return (
    <div style={{ width: '100%', textAlign: 'left', padding: '10px 0' }}>
      <div className="row-fields" style={{ marginBottom: 15 }}>
        <div>
          <label className="form-group label" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Service Icon (Emoji/Char)</label>
          <input 
            type="text" 
            value={formData.icon} 
            onChange={(e) => handleChange('icon', e.target.value)} 
            className="input-field" 
          />
        </div>
        <div>
          <label className="form-group label" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Category Tagline</label>
          <input 
            type="text" 
            value={formData.label} 
            onChange={(e) => handleChange('label', e.target.value)} 
            className="input-field" 
          />
        </div>
      </div>

      <div className="form-group">
        <label>Service Title</label>
        <input 
          type="text" 
          value={formData.title} 
          onChange={(e) => handleChange('title', e.target.value)} 
          className="input-field" 
        />
      </div>

      <div className="form-group">
        <label>Service Description</label>
        <textarea 
          value={formData.desc} 
          onChange={(e) => handleChange('desc', e.target.value)} 
          className="input-field textarea-field" 
        />
      </div>

      <div className="row-fields" style={{ marginBottom: 15 }}>
        <div>
          <label className="form-group label" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Accent Color Theme</label>
          <select 
            value={formData.accent} 
            onChange={(e) => handleChange('accent', e.target.value)} 
            className="input-field"
            style={{ background: 'rgba(10, 10, 12, 0.8)', border: '1px solid var(--border)' }}
          >
            <option value="neon">Neon Lime (Primary)</option>
            <option value="violet">Violet Purple (Secondary)</option>
            <option value="cyan">Cyan Blue (Tertiary)</option>
          </select>
        </div>
        <div>
          <label className="form-group label" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Status Badge</label>
          <input 
            type="text" 
            value={formData.stat} 
            onChange={(e) => handleChange('stat', e.target.value)} 
            className="input-field" 
          />
        </div>
      </div>

      <div className="form-group">
        <label>Service Tech Tags (Comma Separated)</label>
        <input 
          type="text" 
          value={formData.tags.join(', ')} 
          onChange={(e) => handleTagsChange(e.target.value)} 
          className="input-field" 
        />
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
        <button type="button" onClick={onCancel} className="btn-secondary" style={{ padding: '8px 16px' }}>Cancel</button>
        <button 
          type="button" 
          onClick={() => onSave(formData)} 
          className="save-btn" 
          style={{ padding: '8px 16px', background: 'var(--violet)', color: 'white' }}
        >
          Keep Changes
        </button>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// COMPONENT FOR PROJECT EDITOR FORM
// --------------------------------------------------------------------------
interface ProjectEditorFormProps {
  project: ProjectItem;
  onCancel: () => void;
  onSave: (project: ProjectItem) => void;
}

function ProjectEditorForm({ project, onCancel, onSave }: ProjectEditorFormProps) {
  const [formData, setFormData] = useState<ProjectItem>({ ...project });

  const handleChange = (key: keyof ProjectItem, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleTagsChange = (val: string) => {
    const arr = val.split(',').map(s => s.trim()).filter(Boolean);
    handleChange('tags', arr);
  };

  const handleImagesChange = (val: string) => {
    const arr = val.split(',').map(s => s.trim()).filter(Boolean);
    handleChange('images', arr);
    // Auto set the primary cover image to the first in array if not empty
    if (arr.length > 0) {
      handleChange('image', arr[0]);
    }
  };

  // Convert Hex to RGB for layout opacity overlays
  const updateAccentColor = (hex: string) => {
    handleChange('accent', hex);
    // Basic hex-to-rgb conversion
    const hexClean = hex.replace('#', '');
    const r = parseInt(hexClean.substring(0, 2), 16) || 0;
    const g = parseInt(hexClean.substring(2, 4), 16) || 0;
    const b = parseInt(hexClean.substring(4, 6), 16) || 0;
    handleChange('accentRgb', `${r},${g},${b}`);
  };

  return (
    <div style={{ width: '100%', textAlign: 'left', padding: '10px 0' }}>
      
      <div className="row-fields" style={{ marginBottom: 15 }}>
        <div>
          <label className="form-group label" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Project Title</label>
          <input 
            type="text" 
            value={formData.title} 
            onChange={(e) => handleChange('title', e.target.value)} 
            className="input-field" 
          />
        </div>
        <div>
          <label className="form-group label" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Label category (e.g. EdTech · Full-Stack)</label>
          <input 
            type="text" 
            value={formData.label} 
            onChange={(e) => handleChange('label', e.target.value)} 
            className="input-field" 
          />
        </div>
      </div>

      <div className="form-group">
        <label>Project Tagline</label>
        <input 
          type="text" 
          value={formData.tagline} 
          onChange={(e) => handleChange('tagline', e.target.value)} 
          className="input-field" 
        />
      </div>

      <div className="form-group">
        <label>Long Description</label>
        <textarea 
          value={formData.desc} 
          onChange={(e) => handleChange('desc', e.target.value)} 
          className="input-field textarea-field" 
          style={{ minHeight: 120 }}
        />
      </div>

      <div className="row-fields" style={{ marginBottom: 15 }}>
        <div>
          <label className="form-group label" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Year</label>
          <input 
            type="text" 
            value={formData.year} 
            onChange={(e) => handleChange('year', e.target.value)} 
            className="input-field" 
          />
        </div>
        <div>
          <label className="form-group label" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Your Role</label>
          <input 
            type="text" 
            value={formData.role} 
            onChange={(e) => handleChange('role', e.target.value)} 
            className="input-field" 
          />
        </div>
      </div>

      <div className="row-fields" style={{ marginBottom: 15 }}>
        <div>
          <label className="form-group label" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Accent Color Code (Hex)</label>
          <div style={{ display: 'flex', gap: 10 }}>
            <input 
              type="text" 
              value={formData.accent} 
              onChange={(e) => updateAccentColor(e.target.value)} 
              className="input-field" 
              placeholder="#8B5CF6"
            />
            <input 
              type="color" 
              value={formData.accent.startsWith('#') && formData.accent.length === 7 ? formData.accent : '#8b5cf6'} 
              onChange={(e) => updateAccentColor(e.target.value)} 
              style={{ width: 45, height: 45, border: '1px solid var(--border)', background: 'none', borderRadius: '4px', cursor: 'pointer' }}
            />
          </div>
        </div>
        <div>
          <label className="form-group label" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Live Project Link (Optional)</label>
          <input 
            type="text" 
            value={formData.link || ''} 
            onChange={(e) => handleChange('link', e.target.value.trim() || null)} 
            className="input-field" 
            placeholder="https://auto-care.me"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Gallery Image Paths (Comma Separated, first will be used as cover)</label>
        <input 
          type="text" 
          value={formData.images.join(', ')} 
          onChange={(e) => handleImagesChange(e.target.value)} 
          className="input-field" 
          placeholder="/coursecraft-1.jpeg, /coursecraft-2.jpeg"
        />
      </div>

      <div className="form-group">
        <label>Tech Tags (Comma Separated)</label>
        <input 
          type="text" 
          value={formData.tags.join(', ')} 
          onChange={(e) => handleTagsChange(e.target.value)} 
          className="input-field" 
          placeholder="Next.js, WebSockets, PHP"
        />
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
        <button type="button" onClick={onCancel} className="btn-secondary" style={{ padding: '8px 16px' }}>Cancel</button>
        <button 
          type="button" 
          onClick={() => onSave(formData)} 
          className="save-btn" 
          style={{ padding: '8px 16px', background: 'var(--violet)', color: 'white' }}
        >
          Keep Changes
        </button>
      </div>
    </div>
  );
}
