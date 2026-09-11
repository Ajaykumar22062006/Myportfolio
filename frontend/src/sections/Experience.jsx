import { useState, useEffect } from 'react';
import { getExperience } from '../services/api';
import { Briefcase, Calendar, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Experience() {
  const [experienceItems, setExperienceItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperienceData = async () => {
      setLoading(true);
      try {
        const data = await getExperience();
        setExperienceItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load experience:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperienceData();
  }, []);

  return (
    <section id="experience" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Career History</span>
          <h2 className="section-title">Work & Internship Experience</h2>
          <p className="section-subtitle">
            Practical software development and engineering industry experience.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            Loading experience details...
          </div>
        ) : experienceItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            No experience records added yet.
          </div>
        ) : (
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {experienceItems.map((exp) => (
              <div key={exp._id || exp.id} className="glass-card" style={{ padding: '2rem', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '12px',
                      background: 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-cyan)',
                      flexShrink: 0,
                    }}
                  >
                    <Briefcase size={26} />
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {exp.role}
                      </h3>

                      {exp.type && (
                        <span
                          style={{
                            padding: '0.2rem 0.65rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            backgroundColor: 'transparent',
                            color: 'var(--accent-cyan)',
                            border: '1px solid var(--accent-border-alpha)',
                          }}
                        >
                          {exp.type}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.98rem', marginBottom: '0.5rem' }}>
                      <ShieldCheck size={16} />
                      <span>{exp.company}</span>
                      {exp.location && (
                        <>
                          <span style={{ color: 'var(--text-muted)' }}>•</span>
                          <span style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                            <MapPin size={14} /> {exp.location}
                          </span>
                        </>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      <Calendar size={15} />
                      <span>Period: {exp.period}</span>
                    </div>
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  {exp.description}
                </p>

                {exp.highlights && exp.highlights.length > 0 && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {exp.highlights.map((h, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                          <CheckCircle2 size={16} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '3px' }} />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {exp.skills && exp.skills.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                    {exp.skills.map((s, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          padding: '0.15rem 0.55rem',
                          borderRadius: '0.35rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
