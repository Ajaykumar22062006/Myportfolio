import { useState, useEffect } from 'react';
import { getProjects, DEFAULT_PROJECTS } from '../services/api';
import { ExternalLink, Award, CheckCircle, ShieldCheck } from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectsData = async () => {
      setLoading(true);
      try {
        const data = await getProjects();
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load projects:', err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectsData();
  }, []);

  const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'Networking'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Featured Work</span>
          <h2 className="section-title">Software & Network Projects</h2>
          <p className="section-subtitle">
            Practical full-stack web applications and network management engineering projects.
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '3rem',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: activeCategory === cat ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                backgroundColor: activeCategory === cat ? 'var(--accent-bg-alpha)' : 'var(--bg-card)',
                color: activeCategory === cat ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            Loading projects...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            No projects available in this category yet.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '2.5rem',
            }}
          >
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                }}
              >
                {/* Project Header Banner */}
                <div
                  style={{
                    background: 'transparent',
                    padding: '1.75rem',
                    borderBottom: '1px solid var(--border-color)',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <span
                      style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        backgroundColor: 'transparent',
                        color: 'var(--accent-cyan)',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      {project.type || project.category}
                    </span>

                    {project.organization && (
                      <span
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: 'var(--text-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        <ShieldCheck size={14} style={{ color: '#10b981' }} />
                        {project.organization}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                    {project.title}
                  </h3>

                  {project.period && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                      Period: {project.period} {project.duration ? `(${project.duration})` : ''}
                    </div>
                  )}
                </div>

                {/* Project Body */}
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {project.description}
                  </p>

                  {/* Key Features */}
                  {project.features && project.features.length > 0 && (
                    <div style={{ marginBottom: '1.25rem' }}>
                      <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.6rem', fontWeight: 700 }}>
                        Key Capabilities:
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {project.features.map((feat, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                            <CheckCircle size={15} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '3px' }} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}


                  {/* Tech Stack Badges */}
                  <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      {project.technologies?.map((tech, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            padding: '0.2rem 0.6rem',
                            borderRadius: '0.35rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      {(() => {
                        const effectiveGithubUrl = project.githubUrl && project.githubUrl !== '[ADD YOUR INFORMATION]'
                          ? project.githubUrl
                          : project.title?.toLowerCase().includes('hostel')
                          ? 'https://github.com/Ajaykumar22062006/hostel_management'
                          : project.title?.toLowerCase().includes('network') || project.category === 'Networking'
                          ? 'https://github.com/Ajaykumar22062006/Network-monitoring-analysis-system'
                          : null;

                        return (
                          <>
                            {effectiveGithubUrl && (
                              <a href={effectiveGithubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                                <GithubIcon size={16} />
                                <span>Code (GitHub)</span>
                              </a>
                            )}

                            {project.liveUrl && project.liveUrl !== '[ADD YOUR INFORMATION]' && project.liveUrl.trim() !== '' && (
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                                <ExternalLink size={16} />
                                <span>View Live</span>
                              </a>
                            )}
                          </>
                        );
                      })()}

                      {project.certificateTitle && (
                        <a href="#certificates" className="btn btn-outline btn-sm" style={{ color: 'var(--accent-amber)', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                          <Award size={16} />
                          <span>Certificate</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
