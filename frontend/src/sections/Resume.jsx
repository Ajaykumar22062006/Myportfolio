import { useState, useEffect } from 'react';
import { getResume, getBlobUrlFromBase64 } from '../services/api';
import { FileText, Download, ExternalLink, AlertCircle } from 'lucide-react';

export default function Resume() {
  const [dbResume, setDbResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchDbResume = async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const data = await getResume();
        if (data && (data.base64Content || data.url || data.blobUrl || data.filename)) {
          setDbResume(data);
          setErrorMsg(null);
        } else {
          setDbResume(null);
          setErrorMsg('No active resume document found on the production backend.');
        }
      } catch (err) {
        console.error('getResume failed in Resume.jsx:', err);
        setDbResume(null);
        setErrorMsg('Failed to retrieve active resume from production backend (GET /api/resume).');
      } finally {
        setLoading(false);
      }
    };
    fetchDbResume();
  }, []);

  const openOrDownloadResume = (isDownload = false) => {
    if (!dbResume) {
      alert(errorMsg || 'No active resume available from the production backend.');
      return;
    }

    const content = dbResume.base64Content;
    const filename = dbResume.filename || 'ajay-resume.pdf';
    const remoteUrl = dbResume.url || dbResume.blobUrl;

    // 1. Convert Base64Content to PDF Blob URL if available
    if (content && typeof content === 'string' && content.trim() !== '') {
      if (content.startsWith('data:text/html')) {
        const htmlText = decodeURIComponent(content.replace('data:text/html;charset=utf-8,', ''));
        const win = window.open('', '_blank');
        if (win) {
          win.document.open();
          win.document.write(htmlText);
          win.document.close();
          if (isDownload) setTimeout(() => win.print(), 500);
          return;
        }
      }

      const blobUrl = getBlobUrlFromBase64(content, dbResume.fileType || 'application/pdf');
      if (blobUrl) {
        if (isDownload) {
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
        } else {
          const win = window.open(blobUrl, '_blank');
          if (!win) window.location.href = blobUrl;
        }
        return;
      }
    }

    // 2. Fallback to direct remote URL if backend provided one
    if (remoteUrl && typeof remoteUrl === 'string' && remoteUrl.trim() !== '' && !remoteUrl.includes('/ajay-resume.pdf')) {
      if (isDownload) {
        const link = document.createElement('a');
        link.href = remoteUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const win = window.open(remoteUrl, '_blank');
        if (!win) window.location.href = remoteUrl;
      }
      return;
    }

    alert('Resume content is currently unavailable.');
  };

  const handleDownloadResume = () => {
    openOrDownloadResume(true);
  };

  const handleViewResume = () => {
    openOrDownloadResume(false);
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

          {!loading && dbResume && (
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="section-tag" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#10b981' }}>
                ✓ Resume Loaded from Backend: {dbResume.filename || 'ajay-resume.pdf'}
              </span>
            </div>
          )}

          {!loading && errorMsg && (
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <AlertCircle size={18} color="#ef4444" />
              <span style={{ color: '#ef4444', fontSize: '0.95rem' }}>{errorMsg}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
            <button onClick={handleViewResume} className="btn btn-outline" disabled={loading || !dbResume}>
              <ExternalLink size={18} />
              <span>View Resume</span>
            </button>

            <button onClick={handleDownloadResume} className="btn btn-primary" disabled={loading || !dbResume}>
              <Download size={18} />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
