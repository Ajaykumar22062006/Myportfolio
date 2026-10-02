import { useState, useEffect } from 'react';
import { getResume, getBlobUrlFromBase64 } from '../services/api';
import { FileText, Download, ExternalLink } from 'lucide-react';

export default function Resume() {
  const [dbResume, setDbResume] = useState(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let createdBlobUrl = null;

    const fetchDbResume = async () => {
      setLoading(true);
      try {
        const data = await getResume();
        const activeData = data || {
          filename: 'ajay-resume.pdf',
          fileType: 'application/pdf',
          url: '/ajay-resume.pdf',
        };

        setDbResume(activeData);

        // Priority 1: Convert base64Content to PDF Blob URL if available
        if (activeData.base64Content && typeof activeData.base64Content === 'string' && activeData.base64Content.trim() !== '') {
          const blobUrl = getBlobUrlFromBase64(activeData.base64Content, activeData.fileType || 'application/pdf');
          if (blobUrl) {
            createdBlobUrl = blobUrl;
            setPdfBlobUrl(blobUrl);
          } else {
            setPdfBlobUrl(activeData.url || activeData.blobUrl || '/ajay-resume.pdf');
          }
        } else {
          // Priority 2: Remote URL or Static PDF URL
          setPdfBlobUrl(activeData.url || activeData.blobUrl || '/ajay-resume.pdf');
        }
      } catch (err) {
        console.error('fetchDbResume error in Resume.jsx:', err);
        setDbResume({
          filename: 'ajay-resume.pdf',
          fileType: 'application/pdf',
          url: '/ajay-resume.pdf',
        });
        setPdfBlobUrl('/ajay-resume.pdf');
      } finally {
        setLoading(false);
      }
    };

    fetchDbResume();

    // Revoke object URL when component unmounts to prevent memory leaks
    return () => {
      if (createdBlobUrl && createdBlobUrl.startsWith('blob:')) {
        URL.revokeObjectURL(createdBlobUrl);
      }
    };
  }, []);

  const handleViewResume = () => {
    const targetUrl = pdfBlobUrl || dbResume?.url || dbResume?.blobUrl || '/ajay-resume.pdf';
    const win = window.open(targetUrl, '_blank');
    if (!win) window.location.href = targetUrl;
  };

  const handleDownloadResume = () => {
    const targetUrl = pdfBlobUrl || dbResume?.url || dbResume?.blobUrl || '/ajay-resume.pdf';
    const filename = dbResume?.filename || 'ajay-resume.pdf';
    const link = document.createElement('a');
    link.href = targetUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resume">
      <div className="container">
        <div
          className="glass-card"
          style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            background: 'var(--bg-card)',
            border: '1px solid var(--accent-border-alpha)',
            borderRadius: '1.25rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: 'none',
            }}
          >
            <FileText size={32} />
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Want to know more about me?
          </h2>

          <p
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              maxWidth: '650px',
              margin: '0 auto 2.25rem',
              lineHeight: 1.6,
            }}
          >
            Download my resume to explore my skills, projects, education, and certifications in detail.
          </p>

          {!loading && (
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="section-tag" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#10b981' }}>
                ✓ Resume Ready: {dbResume?.filename || 'ajay-resume.pdf'}
              </span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
            <button onClick={handleViewResume} className="btn btn-outline" disabled={loading}>
              <ExternalLink size={18} />
              <span>View Resume</span>
            </button>

            <button onClick={handleDownloadResume} className="btn btn-primary" disabled={loading}>
              <Download size={18} />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
