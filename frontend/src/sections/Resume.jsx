import { useState, useEffect } from 'react';
import { getResume } from '../services/api';
import { FileText, Download, ExternalLink, CheckCircle } from 'lucide-react';

export default function Resume() {
  const [dbResume, setDbResume] = useState(null);

  useEffect(() => {
    const fetchDbResume = async () => {
      try {
        const data = await getResume();
        if (data && data.base64Content) {
          setDbResume(data);
        }
      } catch (err) {
        console.warn('No custom DB resume found, using default resume handler:', err);
      }
    };
    fetchDbResume();
  }, []);

  const handleDownloadResume = () => {
    if (dbResume && dbResume.base64Content) {
      const link = document.createElement('a');
      link.href = dbResume.base64Content;
      link.download = dbResume.filename || 'Ajay_Kumar_D_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    alert('No resume uploaded yet. Please log into the Admin Control Panel (/admin) to upload your official resume document.');
  };

  const handleViewResume = () => {
    if (dbResume && dbResume.base64Content) {
      const win = window.open();
      if (win) {
        win.document.write(
          `<iframe src="${dbResume.base64Content}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
        );
        return;
      }
    }
    alert('No resume uploaded yet. Please log into the Admin Control Panel (/admin) to upload your official resume document.');
  };

  return (
    <section id="resume">
      <div className="container">
        <div
          className="glass-card"
          style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(37, 99, 235, 0.08))',
            border: '1px solid rgba(56, 189, 248, 0.25)',
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
              background: 'linear-gradient(135deg, #38bdf8, #2563eb)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 10px 25px rgba(56, 189, 248, 0.3)',
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

          {dbResume && (
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="section-tag" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#10b981' }}>
                Official Resume Available: {dbResume.filename}
              </span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
            <button onClick={handleViewResume} className="btn btn-outline">
              <ExternalLink size={18} />
              <span>View Resume</span>
            </button>

            <button onClick={handleDownloadResume} className="btn btn-primary">
              <Download size={18} />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
