import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../context/themeSlice';
import { Sun, Moon, Menu, X, FileText, Code2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const themeMode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active section
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    if (location.pathname !== '/') {
      return; // Will use router link if on /admin page
    }
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--glass-bg)] backdrop-blur-md shadow-lg border-b border-[var(--border-color)] py-3'
          : 'bg-transparent py-5'
      }`}
      style={{
        backgroundColor: isScrolled ? 'var(--glass-bg)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-color)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo / Name */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontWeight: 800,
            fontSize: '1.25rem',
            letterSpacing: '-0.02em',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'var(--btn-primary-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--btn-primary-text)',
              boxShadow: 'none',
            }}
          >
            <Code2 size={22} />
          </div>
          <span>
            Ajay <span style={{ color: 'var(--accent-cyan)' }}>Kumar D</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.75rem',
          }}
          className="desktop-nav"
        >
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.92rem',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    padding: '0.25rem 0',
                  }}
                >
                  {link.name}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: '0',
                        right: '0',
                        height: '2px',
                        borderRadius: '2px',
                        background: 'linear-gradient(90deg, #38bdf8, #2563eb)',
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '0.5rem' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={() => dispatch(toggleTheme())}
              aria-label="Toggle Dark/Light theme"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: 'var(--accent-cyan)',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {themeMode === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            {/* Resume CTA Button */}
            <a
              href="#resume"
              onClick={(e) => handleNavClick(e, '#resume')}
              className="btn btn-outline btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <FileText size={16} />
              <span>Resume</span>
            </a>
          </div>
        </nav>

        {/* Mobile Controls */}
        <div className="mobile-controls" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle Dark/Light theme"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--accent-cyan)',
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {themeMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'var(--bg-primary)',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            zIndex: 40,
            borderTop: '1px solid var(--border-color)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: activeSection === link.href.substring(1) ? 'var(--accent-cyan)' : 'var(--text-primary)',
                textDecoration: 'none',
              }}
            >
              {link.name}
            </a>
          ))}

          <a
            href="#resume"
            onClick={(e) => handleNavClick(e, '#resume')}
            className="btn btn-primary"
            style={{ marginTop: '1rem', width: '100%', textAlign: 'center' }}
          >
            <FileText size={18} />
            <span>Download Resume</span>
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 991px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-controls {
            display: flex !important;
          }
        }
        @media (min-width: 992px) {
          .mobile-controls {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
