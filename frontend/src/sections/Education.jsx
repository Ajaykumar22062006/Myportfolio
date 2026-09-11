import { useState, useEffect } from 'react';
import { getEducation } from '../services/api';
import { GraduationCap, Calendar, Building, BookOpen, Book } from 'lucide-react';

export default function Education() {
  const [educationItems, setEducationItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducationData = async () => {
      setLoading(true);
      try {
        const data = await getEducation();
        setEducationItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load education:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEducationData();
  }, []);

  return (
    <section id="education" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Academic Background</span>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            Formal academic qualification & education background.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            Loading education details...
          </div>
        ) : educationItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            No education records added yet.
          </div>
        ) : (
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {educationItems.map((edu, idx) => (
              <div key={edu._id || edu.id || idx} className="glass-card" style={{ padding: '2rem', position: 'relative' }}>
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
                    <GraduationCap size={28} />
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {edu.degree}
                      </h3>
                      {edu.status && (
                        <span
                          style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            backgroundColor: 'transparent',
                            color: 'var(--accent-cyan)',
                            border: '1px solid var(--accent-border-alpha)',
                          }}
                        >
                          {edu.status}
                        </span>
                      )}

                      {(edu.cgpa || edu.CGPA || edu.score) && String(edu.cgpa || edu.CGPA || edu.score).trim() !== '' && (
                        <span
                          style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            backgroundColor: 'transparent',
                            color: 'var(--accent-cyan)',
                            border: '1px solid var(--accent-border-alpha)',
                          }}
                        >
                          {String(edu.cgpa || edu.CGPA || edu.score).toLowerCase().includes('cgpa')
                            ? (edu.cgpa || edu.CGPA || edu.score)
                            : `CGPA: ${edu.cgpa || edu.CGPA || edu.score}`}
                        </span>
                      )}

                      {(edu.percentage || edu.Percentage || edu.marks) && String(edu.percentage || edu.Percentage || edu.marks).trim() !== '' && (
                        <span
                          style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            backgroundColor: 'transparent',
                            color: 'var(--accent-cyan)',
                            border: '1px solid var(--accent-border-alpha)',
                          }}
                        >
                          {String(edu.percentage || edu.Percentage || edu.marks).toLowerCase().includes('percentage')
                            ? (edu.percentage || edu.Percentage || edu.marks)
                            : `Percentage: ${edu.percentage || edu.Percentage || edu.marks}`}
                        </span>
                      )}

                      {(edu.result || edu.Result || edu.grade) && String(edu.result || edu.Result || edu.grade).trim() !== '' && (
                        <span
                          style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            backgroundColor: 'transparent',
                            color: 'var(--accent-cyan)',
                            border: '1px solid var(--accent-border-alpha)',
                          }}
                        >
                          {String(edu.result || edu.Result || edu.grade).toLowerCase().includes('result')
                            ? (edu.result || edu.Result || edu.grade)
                            : `Result: ${edu.result || edu.Result || edu.grade}`}
                        </span>
                      )}
                    </div>

                    {edu.department && (
                      <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Book size={15} style={{ color: 'var(--accent-cyan)' }} />
                        <span>Department / Branch: <strong style={{ color: 'var(--text-primary)' }}>{edu.department}</strong></span>
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                      <Building size={16} />
                      <span>{edu.college}</span>
                      {edu.university && (
                        <>
                          <span style={{ color: 'var(--text-muted)' }}>•</span>
                          <span style={{ color: 'var(--text-secondary)' }}>{edu.university}</span>
                        </>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      <Calendar size={15} />
                      <span>Duration: {edu.duration} {edu.graduationYear ? `(Graduation: ${edu.graduationYear})` : ''}</span>
                    </div>
                  </div>
                </div>

                {edu.highlights && edu.highlights.length > 0 && (
                  <>
                    <div style={{ margin: '1.25rem 0', height: '1px', background: 'var(--border-color)' }} />
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <BookOpen size={16} style={{ color: 'var(--accent-cyan)' }} />
                        Academic Highlights & Achievements:
                      </h4>
                      <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                        {edu.highlights.map((h, hIdx) => (
                          <li key={hIdx} style={{ marginBottom: '0.35rem' }}>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
