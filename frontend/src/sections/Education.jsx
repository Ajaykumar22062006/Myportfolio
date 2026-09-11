import { GraduationCap, Calendar, MapPin, Building, BookOpen } from 'lucide-react';

export default function Education() {
  const educationItems = [
    {
      degree: 'Bachelor of Technology (B.Tech)',
      college: 'Jeppiaar Institute of Technology',
      university: 'Anna University',
      duration: '2023 – 2027',
      graduationYear: '2027',
      status: 'In Progress',
      highlights: [
        'Core coursework in Computer Science, Software Engineering & Data Structures',
        'Database Management Systems, Computer Networks & Operating Systems',
        'Full-Stack Web Development projects & industry practicals',
      ],
    },
  ];

  return (
    <section id="education" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Academic Background</span>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            Formal education foundation in Computer Science and Engineering.
          </p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {educationItems.map((edu, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '12px',
                    background: 'rgba(56, 189, 248, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)',
                    flexShrink: 0,
                  }}
                >
                  <GraduationCap size={28} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {edu.degree}
                    </h3>
                    <span
                      style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        backgroundColor: 'rgba(56, 189, 248, 0.15)',
                        color: 'var(--accent-cyan)',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                      }}
                    >
                      {edu.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>
                    <Building size={16} />
                    <span>{edu.college}</span>
                    <span style={{ color: 'var(--text-muted)' }}>•</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{edu.university}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    <Calendar size={15} />
                    <span>Duration: {edu.duration} (Expected Graduation: {edu.graduationYear})</span>
                  </div>
                </div>
              </div>

              <div style={{ margin: '1.25rem 0', height: '1px', background: 'var(--border-color)' }} />

              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <BookOpen size={16} style={{ color: 'var(--accent-cyan)' }} />
                  Academic Focus & Learning:
                </h4>
                <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  {edu.highlights.map((h, hIdx) => (
                    <li key={hIdx} style={{ marginBottom: '0.35rem' }}>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
