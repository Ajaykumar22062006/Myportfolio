import { Layout, Server, Database, Network, CheckCircle2 } from 'lucide-react';

export default function About() {
  const whatIDoCards = [
    {
      title: 'Frontend Development',
      icon: <Layout size={28} style={{ color: 'var(--accent-cyan)' }} />,
      description: 'Designing and building responsive, user-centric interfaces using React.js, JavaScript (ES6+), HTML5, and CSS3.',
    },
    {
      title: 'Backend Development',
      icon: <Server size={28} style={{ color: 'var(--accent-cyan)' }} />,
      description: 'Creating structured server-side logic and RESTful web services using Python (Flask) and Node.js Express.',
    },
    {
      title: 'Database Management',
      icon: <Database size={28} style={{ color: '#10b981' }} />,
      description: 'Structuring and querying relational and NoSQL databases including MongoDB, MySQL, and SQLite for data persistence.',
    },
    {
      title: 'Network Applications',
      icon: <Network size={28} style={{ color: 'var(--accent-cyan)' }} />,
      description: 'Designing network topologies and implementing packet analysis, VLAN routing, IPv4/IPv6, and device connectivity in Cisco environments.',
    },
  ];

  const focusAreas = [
    'Frontend development with modern React components',
    'Backend development and REST API architectural patterns',
    'Database management and data modeling',
    'Networking principles, routing, and simulation',
    'Full-stack application development workflows',
  ];

  return (
    <section id="about" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">Aspiring Software & Full-Stack Engineer</h2>
          <p className="section-subtitle">
            Focused on building efficient full-stack web applications and robust network software solutions.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
            marginBottom: '4rem',
          }}
        >
          {/* Factual Narrative Card */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              My Background & Philosophy
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              I am an aspiring Full-Stack Developer with a practical mindset centered on software engineering fundamentals, database architecture, and network communications.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              My focus is on understanding core web principles from client-side rendering to server API handling and database persistence. Through industry project experience and hands-on network simulation work, I continuously refine my skills in constructing reliable, well-structured software systems.
            </p>
          </div>

          {/* Skill Focus Area Checklist */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Core Technical Focus
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {focusAreas.map((area, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.6 }}>
                    {area}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What I Do Area */}
        <h3
          style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: '2rem',
            color: 'var(--text-primary)',
          }}
        >
          What I Do
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {whatIDoCards.map((card, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '1.75rem', position: 'relative' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '12px',
                  background: 'rgba(56, 189, 248, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                {card.icon}
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.6rem', color: 'var(--text-primary)' }}>
                {card.title}
              </h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
