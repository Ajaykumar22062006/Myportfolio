import { ArrowDown, Mail, Code, Terminal, Database, Server, Download, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';

export default function Hero() {
  return (
    <section id="home" style={{ paddingTop: '8.5rem', paddingBottom: '6rem', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
          }}
        >
          {/* Left Hero Content */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: 'var(--accent-cyan)',
                fontSize: '0.88rem',
                fontWeight: 600,
                marginBottom: '1.25rem',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 10px #10b981',
                }}
              />
              Available for Full-Stack Opportunities
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.1rem, 4.2vw, 3.6rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
              }}
            >
              Hi, I'm <span className="gradient-text" style={{ whiteSpace: 'nowrap' }}>Ajay Kumar D</span>
            </h1>

            <h2
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span style={{ color: 'var(--accent-cyan)' }}>&gt;</span> Aspiring Full-Stack Developer
            </h2>

            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                maxWidth: '560px',
                marginBottom: '2.25rem',
              }}
            >
              I build responsive web applications and practical software solutions using modern frontend, backend, database, and networking technologies.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <a href="#projects" className="btn btn-primary">
                <span>View My Projects</span>
                <ExternalLink size={18} />
              </a>

              <a href="#resume" className="btn btn-outline">
                <Download size={18} />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                Connect with me:
              </span>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a
                  href="https://github.com/Ajaykumar22062006"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                    e.currentTarget.style.color = 'var(--accent-cyan)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <GithubIcon size={20} />
                </a>

                <a
                  href="https://www.linkedin.com/in/ajay-kumar-d-18377a292?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                    e.currentTarget.style.color = 'var(--accent-cyan)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <LinkedinIcon size={20} />
                </a>

                <a
                  href="mailto:ajay872072@gmail.com"
                  aria-label="Email Contact"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                    e.currentTarget.style.color = 'var(--accent-cyan)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Developer Terminal & Interactive Card Visual */}
          <div style={{ position: 'relative' }}>
            <div
              className="glass-card"
              style={{
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-color)',
              }}
            >
              {/* Terminal Titlebar */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.9)',
                  padding: '0.85rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border-color)',
                }}
              >
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  developer_profile.json
                </span>
                <Terminal size={16} style={{ color: 'var(--text-muted)' }} />
              </div>

              {/* Code Editor Body */}
              <div
                style={{
                  padding: '1.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  lineHeight: '1.65',
                  background: 'rgba(10, 15, 29, 0.95)',
                }}
              >
                <span style={{ color: '#c678dd' }}>const</span> <span style={{ color: '#61afef' }}>developer</span> = &#123;<br />
                &nbsp;&nbsp;<span style={{ color: '#e06c75' }}>name</span>: <span style={{ color: '#98c379' }}>"Ajay Kumar D"</span>,<br />
                &nbsp;&nbsp;<span style={{ color: '#e06c75' }}>role</span>: <span style={{ color: '#98c379' }}>"Aspiring Full-Stack Developer"</span>,<br />
                &nbsp;&nbsp;<span style={{ color: '#e06c75' }}>techStack</span>: &#123;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#e06c75' }}>frontend</span>: [<span style={{ color: '#98c379' }}>"React.js"</span>, <span style={{ color: '#98c379' }}>"JavaScript"</span>, <span style={{ color: '#98c379' }}>"CSS3"</span>],<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#e06c75' }}>backend</span>: [<span style={{ color: '#98c379' }}>"Python (Flask)"</span>, <span style={{ color: '#98c379' }}>"Node Express"</span>],<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#e06c75' }}>databases</span>: [<span style={{ color: '#98c379' }}>"MongoDB"</span>, <span style={{ color: '#98c379' }}>"MySQL"</span>, <span style={{ color: '#98c379' }}>"SQLite"</span>],<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#e06c75' }}>networking</span>: [<span style={{ color: '#98c379' }}>"Cisco Packet Tracer"</span>, <span style={{ color: '#98c379' }}>"VLANs"</span>, <span style={{ color: '#98c379' }}>"IPv4/IPv6"</span>]<br />
                &nbsp;&nbsp;&#125;,<br />
                &nbsp;&nbsp;<span style={{ color: '#e06c75' }}>status</span>: <span style={{ color: '#98c379' }}>"Building Production-Ready Apps"</span><br />
                &#125;;
              </div>
            </div>

            {/* Floating Tech Skill Cards */}
            <div
              className="animate-float"
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                background: 'var(--bg-card)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border-color)',
                padding: '0.6rem 1rem',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              <Code size={18} style={{ color: '#38bdf8' }} />
              <span>Frontend & Backend</span>
            </div>

            <div
              className="animate-float"
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                background: 'var(--bg-card)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border-color)',
                padding: '0.6rem 1rem',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                fontSize: '0.85rem',
                fontWeight: 600,
                animationDelay: '2.5s',
              }}
            >
              <Server size={18} style={{ color: '#10b981' }} />
              <span>Networking & Databases</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
