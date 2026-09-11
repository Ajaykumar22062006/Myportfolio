import { useState, useEffect } from 'react';
import { getCertificates, DEFAULT_CERTIFICATES } from '../services/api';
import tcsCertImg from '../assets/tcs_ion_cert.png';
import ciscoCertImg from '../assets/cisco_cert.png';
import infosysCertImg from '../assets/infosys_cert.png';
import { Award, Eye, X, ZoomIn, ZoomOut, ShieldCheck, Calendar, CheckCircle2 } from 'lucide-react';

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const data = await getCertificates();
        setCertificates(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load certificates:', err);
        setCertificates([]);
      }
    };
    fetchCerts();
  }, []);

  const getCertImage = (cert) => {
    if (typeof cert === 'object' && cert.certificateImage) {
      return cert.certificateImage;
    }
    const type = typeof cert === 'object' ? cert.type : cert;
    switch (type) {
      case 'tcs_ion':
        return tcsCertImg;
      case 'cisco':
        return ciscoCertImg;
      case 'infosys':
        return infosysCertImg;
      default:
        return null;
    }
  };

  const handleOpenModal = (cert) => {
    setSelectedCert(cert);
    setZoomLevel(1);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
    setZoomLevel(1);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="certificates">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Verified Credentials</span>
          <h2 className="section-title">Certifications & Industry Credentials</h2>
          <p className="section-subtitle">
            Formal course completions and industry-sponsored project credentials.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {certificates.map((cert) => {
            const certImage = getCertImage(cert);
            const isPlaceholder = cert.type === 'placeholder';

            return (
              <div
                key={cert._id}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {/* Certificate Image Preview */}
                <div
                  style={{
                    height: '210px',
                    backgroundColor: 'var(--bg-secondary)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid var(--border-color)',
                  }}
                >
                  {certImage ? (
                    <img
                      src={certImage}
                      alt={cert.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        padding: '2rem',
                        textAlign: 'center',
                        color: 'var(--text-muted)',
                        border: '2px dashed var(--border-color)',
                        borderRadius: '0.75rem',
                        margin: '1.5rem',
                        width: 'calc(100% - 3rem)',
                      }}
                    >
                      <Award size={36} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }} />
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>[Add Certificate Image]</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Placeholder for future certificate</div>
                    </div>
                  )}

                  {certImage && (
                    <button
                      onClick={() => handleOpenModal(cert)}
                      aria-label="Preview Certificate"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(10, 15, 29, 0.65)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        color: '#ffffff',
                        opacity: 0,
                        transition: 'opacity 0.25s ease',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                    >
                      <Eye size={32} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>View Full Certificate</span>
                    </button>
                  )}
                </div>

                {/* Certificate Details */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <ShieldCheck size={16} style={{ color: 'var(--accent-cyan)' }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>
                      {cert.organization}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    {cert.title}
                  </h3>

                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    {cert.subtitle}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <Calendar size={14} />
                    <span>Issued / Completed: {cert.issueDate}</span>
                  </div>

                  {/* Skills Demonstrated */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        Skills Demonstrated:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {cert.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: '0.75rem',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '0.25rem',
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid var(--border-color)',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Trigger */}
                  <div style={{ marginTop: '1.25rem' }}>
                    {certImage ? (
                      <button
                        onClick={() => handleOpenModal(cert)}
                        className="btn btn-outline btn-sm"
                        style={{ width: '100%' }}
                      >
                        <Eye size={15} />
                        <span>View Certificate</span>
                      </button>
                    ) : (
                      <span className="badge-placeholder" style={{ display: 'block', textAlign: 'center', width: '100%', padding: '0.5rem' }}>
                        Certificate placeholder - update via Admin
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Screen Lightbox Modal */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Certificate Modal Preview"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={handleCloseModal}
        >
          {/* Controls Bar */}
          <div
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              zIndex: 110,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
              aria-label="Zoom In"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ZoomIn size={20} />
            </button>

            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
              aria-label="Zoom Out"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ZoomOut size={20} />
            </button>

            <button
              onClick={handleCloseModal}
              aria-label="Close Lightbox"
              style={{
                background: 'rgba(239, 68, 68, 0.8)',
                border: 'none',
                color: '#ffffff',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Modal Content */}
          <div
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              overflow: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${zoomLevel})`,
              transition: 'transform 0.2s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getCertImage(selectedCert)}
              alt={selectedCert.title}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                borderRadius: '0.5rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
                objectFit: 'contain',
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              color: '#ffffff',
              textAlign: 'center',
              fontSize: '0.95rem',
              fontWeight: 600,
            }}
          >
            {selectedCert.title} - {selectedCert.organization}
          </div>
        </div>
      )}
    </section>
  );
}
