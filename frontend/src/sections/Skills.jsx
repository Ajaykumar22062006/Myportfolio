import { useState, useEffect } from 'react';
import { getSkills } from '../services/api';
import { Code2, Server, Database, Network, Wrench } from 'lucide-react';

export default function Skills() {
  const [skillCategories, setSkillCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultCategories = [
    {
      category: 'Frontend Development',
      icon: <Code2 size={24} style={{ color: '#38bdf8' }} />,
      description: 'Building modern responsive user interfaces',
      skills: [
        { name: 'HTML5', tag: 'Standard' },
        { name: 'CSS3', tag: 'Styling & Flex/Grid' },
        { name: 'JavaScript', tag: 'ES6+ Logic' },
        { name: 'React.js', tag: 'Components & Hooks' },
      ],
    },
    {
      category: 'Backend Development',
      icon: <Server size={24} style={{ color: '#3b82f6' }} />,
      description: 'Server application engineering & API logic',
      skills: [
        { name: 'Python', tag: 'Core & Flask Web API' },
        { name: 'Node.js Express', tag: 'REST Services' },
      ],
    },
    {
      category: 'Databases',
      icon: <Database size={24} style={{ color: '#10b981' }} />,
      description: 'Data modeling, querying, and persistence',
      skills: [
        { name: 'MongoDB', tag: 'NoSQL Document Store' },
        { name: 'MySQL', tag: 'Relational Database' },
        { name: 'SQLite', tag: 'Embedded Database' },
      ],
    },
    {
      category: 'Networking & Protocols',
      icon: <Network size={24} style={{ color: '#6366f1' }} />,
      description: 'Network communication, simulation & routing',
      skills: [
        { name: 'Cisco Packet Tracer', tag: 'Network Simulation' },
        { name: 'IPv4 / IPv6', tag: 'IP Addressing' },
        { name: 'VLAN & Inter-VLAN Routing', tag: 'Layer 2/3 Switching' },
        { name: 'DHCP Protocol', tag: 'Dynamic IP Config' },
      ],
    },
    {
      category: 'Development Tools',
      icon: <Wrench size={24} style={{ color: '#f59e0b' }} />,
      description: 'Tooling, version control & API testing',
      skills: [
        { name: 'Git & GitHub', tag: 'Version Control' },
        { name: 'VS Code & Vite', tag: 'IDE Environment' },
        { name: 'Postman', tag: 'API Testing' },
      ],
    },
  ];

  useEffect(() => {
    const fetchSkillsData = async () => {
      setLoading(true);
      try {
        const data = await getSkills();
        if (Array.isArray(data) && data.length > 0) {
          // Group skills by category
          const grouped = {};
          data.forEach((s) => {
            const cat = s.category || 'General';
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push({ name: s.name, tag: s.level || 'Core' });
          });

          const getCatIcon = (cName) => {
            const lower = cName.toLowerCase();
            if (lower.includes('front')) return <Code2 size={24} style={{ color: '#38bdf8' }} />;
            if (lower.includes('back')) return <Server size={24} style={{ color: '#3b82f6' }} />;
            if (lower.includes('data')) return <Database size={24} style={{ color: '#10b981' }} />;
            if (lower.includes('net')) return <Network size={24} style={{ color: '#6366f1' }} />;
            return <Wrench size={24} style={{ color: '#f59e0b' }} />;
          };

          const formatted = Object.keys(grouped).map((catName) => ({
            category: catName,
            icon: getCatIcon(catName),
            description: `Core technologies in ${catName}`,
            skills: grouped[catName],
          }));
          setSkillCategories(formatted);
        } else {
          setSkillCategories(defaultCategories);
        }
      } catch (err) {
        console.error('Failed to load skills:', err);
        setSkillCategories(defaultCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillsData();
  }, []);

  return (
    <section id="skills">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Technical Competencies</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            A comprehensive overview of technologies I work with across full-stack development, database management, and network infrastructure.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            Loading skills...
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(56, 189, 248, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {cat.category}
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {cat.description}
                    </span>
                  </div>
                </div>

                <div style={{ margin: '1rem 0', height: '1px', background: 'var(--border-color)' }} />

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: 'auto' }}>
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '0.5rem',
                        padding: '0.45rem 0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s ease',
                        cursor: 'default',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--accent-cyan)',
                        }}
                      />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {skill.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                          {skill.tag}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
