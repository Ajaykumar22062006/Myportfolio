import { useState, useEffect } from 'react';
import { getEducation, DEFAULT_EDUCATION } from '../services/api';
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
        setEducationItems([]);
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
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', boxSizing: 'border-box' }}>
            {educationItems.map((edu, idx) => (
              <div key={edu._id || edu.id || idx} className="glass-card edu-card">
                <div className="edu-card-content">
                  <div className="edu-icon-wrapper">
                    <GraduationCap size={28} />
                  </div>

                  <div className="edu-main-info">
                    <div className="edu-degree-row">
                      <h3 className="edu-degree-title">
                        {edu.degree}
                      </h3>
                      {edu.status && (
                        <span className="edu-badge">
                          {edu.status}
                        </span>
                      )}

                      {(edu.cgpa || edu.CGPA || edu.score) && String(edu.cgpa || edu.CGPA || edu.score).trim() !== '' && (
                        <span className="edu-badge">
                          {String(edu.cgpa || edu.CGPA || edu.score).toLowerCase().includes('cgpa')
                            ? (edu.cgpa || edu.CGPA || edu.score)
                            : `CGPA: ${edu.cgpa || edu.CGPA || edu.score}`}
                        </span>
                      )}

                      {(edu.percentage || edu.Percentage || edu.marks) && String(edu.percentage || edu.Percentage || edu.marks).trim() !== '' && (
                        <span className="edu-badge">
                          {String(edu.percentage || edu.Percentage || edu.marks).toLowerCase().includes('percentage')
                            ? (edu.percentage || edu.Percentage || edu.marks)
                            : `Percentage: ${edu.percentage || edu.Percentage || edu.marks}`}
                        </span>
                      )}

                      {(edu.result || edu.Result || edu.grade) && String(edu.result || edu.Result || edu.grade).trim() !== '' && (
                        <span className="edu-badge">
                          {String(edu.result || edu.Result || edu.grade).toLowerCase().includes('result')
                            ? (edu.result || edu.Result || edu.grade)
                            : `Result: ${edu.result || edu.Result || edu.grade}`}
                        </span>
                      )}
                    </div>

                    {edu.department && (
                      <div className="edu-dept-row">
                        <Book size={15} style={{ color: 'var(--accent-cyan)', marginTop: '3px', flexShrink: 0 }} />
                        <span className="edu-dept-text">Department / Branch: <strong style={{ color: 'var(--text-primary)' }}>{edu.department}</strong></span>
                      </div>
                    )}

                    <div className="edu-inst-row">
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
                        <Building size={16} style={{ flexShrink: 0 }} />
                        <span className="edu-college-name">{edu.college}</span>
                      </div>
                      {edu.university && (
                        <>
                          <span className="edu-univ-bullet">•</span>
                          <span className="edu-univ-name">{edu.university}</span>
                        </>
                      )}
                    </div>

                    <div className="edu-duration-row">
                      <Calendar size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span className="edu-duration-text">Duration: {edu.duration} {edu.graduationYear ? `(Graduation: ${edu.graduationYear})` : ''}</span>
                    </div>
                  </div>
                </div>

                {edu.highlights && edu.highlights.length > 0 && (
                  <div className="edu-highlights-container">
                    <div style={{ margin: '1rem 0', height: '1px', background: 'var(--border-color)', width: '100%' }} />
                    <div>
                      <h4 className="edu-highlights-title">
                        <BookOpen size={16} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }} />
                        Academic Highlights & Achievements:
                      </h4>
                      <ul className="edu-highlights-list">
                        {edu.highlights.map((h, hIdx) => (
                          <li key={hIdx}>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
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
