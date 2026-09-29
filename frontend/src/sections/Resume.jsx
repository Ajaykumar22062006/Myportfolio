import { useState, useEffect } from 'react';
import { getResume, DEFAULT_RESUME } from '../services/api';
import { FileText, Download, ExternalLink } from 'lucide-react';

export default function Resume() {
  const [dbResume, setDbResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDbResume = async () => {
      try {
        const data = await getResume();
        // Only set if we got valid data back (with base64 content from MongoDB)
        if (data && (data.base64Content || data.url || data.filename)) {
          setDbResume(data);
        } else {
          setDbResume(DEFAULT_RESUME);
        }
      } catch (err) {
        console.warn('getResume failed, using DEFAULT_RESUME:', err);
        setDbResume(DEFAULT_RESUME);
      } finally {
        setLoading(false);
      }
    };
    fetchDbResume();
  }, []);

  const openOrDownloadResume = (isDownload = false) => {
    const resumeToUse = dbResume || DEFAULT_RESUME;
    // base64Content from MongoDB is the PRIMARY source.
    // Only fall back to staticUrl if MongoDB returned no base64Content.
    const content = resumeToUse.base64Content;
    const filename = resumeToUse.filename || 'ajay-resume.pdf';
    const staticUrl = resumeToUse.url || '/ajay-resume.pdf';

    // ─── PRIORITY 1: MongoDB base64Content ───────────────────────────────────
    if (content) {
      // HTML resume
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

      // PDF / binary data URI
      try {
        const parts = content.split(',');
        if (parts.length === 2) {
          const mimeMatch = parts[0].match(/:(.*?);/);
          const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
          const bstr = atob(parts[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) u8arr[n] = bstr.charCodeAt(n);
          const blob = new Blob([u8arr], { type: mime });
          const blobUrl = URL.createObjectURL(blob);

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
      } catch (e) {
        console.warn('base64 decode failed, falling back to static URL:', e);
      }
    }

    // ─── PRIORITY 2: Static /ajay-resume.pdf (only when no MongoDB base64) ──
    if (staticUrl) {
      if (isDownload) {
        const link = document.createElement('a');
        link.href = staticUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const win = window.open(staticUrl, '_blank');
        if (!win) window.location.href = staticUrl;
      }
      return;
    }

    alert('Resume is currently unavailable. Please try again later.');
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

          {!loading && dbResume && dbResume.base64Content && dbResume.base64Content !== '' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="section-tag" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#10b981' }}>
                ✓ Resume Loaded from Database: {dbResume.filename}
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
