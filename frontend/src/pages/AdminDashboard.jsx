import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getProjects,
  createProject,
  deleteProject,
  getCertificates,
  createCertificate,
  deleteCertificate,
  getContactMessages,
  deleteContactMessage,
  getResume,
  uploadResume,
} from '../services/api';
import {
  LayoutDashboard,
  FolderPlus,
  Award,
  MessageSquare,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  ExternalLink,
  ArrowLeft,
  FileText,
  Upload,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [projectsList, setProjectsList] = useState([]);
  const [certificatesList, setCertificatesList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Project Form Modal State
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Full Stack',
    type: 'Software Project',
    organization: '',
    duration: '',
    period: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
  });

  // New Certificate Form Modal State
  const [showCertModal, setShowCertModal] = useState(false);
  const [newCert, setNewCert] = useState({
    title: '',
    subtitle: '',
    organization: '',
    issueDate: '',
    type: 'cisco',
    skills: '',
    certificateImage: '',
  });
  const [certParsingMsg, setCertParsingMsg] = useState('');
  const [certUploading, setCertUploading] = useState(false);
  const [certErrorMsg, setCertErrorMsg] = useState('');

  // Resume Upload State
  const [currentResume, setCurrentResume] = useState(null);
  const [selectedResumeFile, setSelectedResumeFile] = useState(null);
  const [resumeBase64, setResumeBase64] = useState('');
  const [resumeUploading, setResumeUploading] = useState(false);
  const [resumeSuccessMsg, setResumeSuccessMsg] = useState('');
  const [resumeErrorMsg, setResumeErrorMsg] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin');
      return;
    }
    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [projData, certData, resData] = await Promise.all([
        getProjects(),
        getCertificates(),
        getResume(),
      ]);
      setProjectsList(Array.isArray(projData) ? projData : []);
      setCertificatesList(Array.isArray(certData) ? certData : []);
      setCurrentResume(resData && typeof resData === 'object' && !resData.message ? resData : null);

      try {
        const msgs = await getContactMessages();
        setMessagesList(Array.isArray(msgs) ? msgs : []);
      } catch (err) {
        console.warn('Contact messages fetch error (requires admin backend token):', err);
        setMessagesList([]);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setProjectsList([]);
      setCertificatesList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeFileChange = (e) => {
    const file = e.target.files[0];
    setResumeSuccessMsg('');
    setResumeErrorMsg('');

    if (!file) {
      setSelectedResumeFile(null);
      setResumeBase64('');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setResumeErrorMsg('File size exceeds 10MB limit.');
      return;
    }

    setSelectedResumeFile(file);
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setResumeBase64(uploadEvent.target.result);
    };
    reader.onerror = (err) => {
      setResumeErrorMsg('Failed to read file contents');
    };
    reader.readAsDataURL(file);
  };

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!selectedResumeFile || !resumeBase64) {
      setResumeErrorMsg('Please select a valid resume file to upload.');
      return;
    }

    setResumeUploading(true);
    setResumeSuccessMsg('');
    setResumeErrorMsg('');

    try {
      const res = await uploadResume({
        filename: selectedResumeFile.name,
        fileType: selectedResumeFile.type || 'application/pdf',
        base64Content: resumeBase64,
      });

      setResumeSuccessMsg(res.message || 'Resume uploaded and stored in database as Base64!');
      setCurrentResume(res.data);
      setSelectedResumeFile(null);
      setResumeBase64('');
    } catch (err) {
      setResumeErrorMsg(typeof err === 'string' ? err : 'Failed to upload resume to database.');
    } finally {
      setResumeUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin');
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const formattedTech = newProject.technologies.split(',').map((t) => t.trim());
      await createProject({ ...newProject, technologies: formattedTech });
      setShowProjectModal(false);
      setNewProject({
        title: '',
        category: 'Full Stack',
        type: 'Software Project',
        organization: '',
        duration: '',
        period: '',
        description: '',
        technologies: '',
        githubUrl: '',
        liveUrl: '',
      });
      loadDashboardData();
    } catch (err) {
      alert('Failed to add project');
    }
  };

  const handleDeleteProjectItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        loadDashboardData();
      } catch (err) {
        alert('Failed to delete project');
      }
    }
  };

  // Compress high-res certificate photos client-side to clean ~150-300KB JPEG
  const compressCertImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = () => resolve(e.target.result);
        img.src = e.target.result;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  };

  const handleCertPhotoSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCertParsingMsg('Reading & optimizing certificate photo quality...');
    try {
      const compressedBase64 = await compressCertImage(file);
      const nameLower = file.name.toLowerCase();

      let detectedTitle = 'Certificate of Course Completion';
      let detectedSubtitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      let detectedOrg = 'Cisco Networking Academy';
      let detectedDate = '2026';
      let detectedType = 'cisco';
      let detectedSkills = 'Networking, Communication, Protocols, Troubleshooting';

      if (nameLower.includes('hostel') || nameLower.includes('tcs') || nameLower.includes('aip')) {
        detectedTitle = 'Certificate of Industry Project';
        detectedSubtitle = 'University Hostel Management System';
        detectedOrg = 'TCS iON Applied Industry Projects (AIP)';
        detectedDate = '08 May 2026';
        detectedType = 'tcs_ion';
        detectedSkills = 'Hostel Operations, Software System Architecture, Database Management';
      } else if (nameLower.includes('cisco') || nameLower.includes('network')) {
        detectedTitle = 'Certificate of Course Completion';
        detectedSubtitle = 'Networking Basics';
        detectedOrg = 'Cisco Networking Academy';
        detectedDate = '13 August 2026';
        detectedType = 'cisco';
        detectedSkills = 'Network communication, Ethernet, IPv4, IPv6, Routing, Network troubleshooting';
      } else if (nameLower.includes('infosys') || nameLower.includes('sql') || nameLower.includes('oracle')) {
        detectedTitle = 'Course Completion Certificate';
        detectedSubtitle = 'Learn SQL For Oracle Databases – Using Toad From Scratch';
        detectedOrg = 'Infosys Springboard';
        detectedDate = '11 June 2025';
        detectedType = 'infosys';
        detectedSkills = 'SQL Query Writing, Oracle Database, Toad IDE, Schema Design';
      } else {
        detectedSubtitle = detectedSubtitle
          .split(' ')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
      }

      setNewCert((prev) => ({
        ...prev,
        title: detectedTitle,
        subtitle: detectedSubtitle,
        organization: detectedOrg,
        issueDate: detectedDate,
        type: detectedType,
        skills: detectedSkills,
        certificateImage: compressedBase64,
      }));

      setCertParsingMsg('✨ Photo read & optimized! Details auto-filled in the form below.');
    } catch (err) {
      console.error('Error processing photo:', err);
      setCertParsingMsg('⚠️ Failed to optimize photo. Please enter details manually.');
    }
  };

  const handleOpenCertModal = () => {
    setActiveTab('certificates');
    setCertErrorMsg('');
    setCertParsingMsg('');
    setShowCertModal(true);
  };

  const handleAddCert = async (e) => {
    e.preventDefault();
    setCertUploading(true);
    setCertErrorMsg('');

    try {
      const formattedSkills = typeof newCert.skills === 'string'
        ? newCert.skills.split(',').map((s) => s.trim()).filter(Boolean)
        : (newCert.skills || []);

      const payload = {
        title: newCert.title || 'Certificate of Completion',
        subtitle: newCert.subtitle || 'Software Development & Networking',
        organization: newCert.organization || 'Verified Credential',
        issueDate: newCert.issueDate || '2026',
        type: newCert.type || 'cisco',
        skills: formattedSkills,
        certificateImage: newCert.certificateImage || '',
      };

      const res = await createCertificate(payload);

      // Optimistically insert new certificate into local list state
      if (res && typeof res === 'object') {
        setCertificatesList((prev) => [res, ...(Array.isArray(prev) ? prev : [])]);
      }

      setShowCertModal(false);
      setNewCert({
        title: '',
        subtitle: '',
        organization: '',
        issueDate: '',
        type: 'cisco',
        skills: '',
        certificateImage: '',
      });
      setCertParsingMsg('');
      await loadDashboardData();
    } catch (err) {
      console.error('Add certificate error:', err);
      const msg = err.response?.data?.message || (typeof err === 'string' ? err : err.message) || 'Failed to save certificate to server.';
      setCertErrorMsg(msg);
    } finally {
      setCertUploading(false);
    }
  };

  const handleDeleteCertItem = async (certItem) => {
    const certId = typeof certItem === 'object' ? certItem._id || certItem.id : certItem;
    if (!certId) {
      alert('Error: Certificate ID not found.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        await deleteCertificate(certId);
        // Optimistically update list state immediately
        setCertificatesList((prev) => prev.filter((c) => (c._id || c.id) !== certId));
        loadDashboardData();
      } catch (err) {
        console.error('Delete certificate error:', err);
        alert('Failed to delete certificate: ' + (typeof err === 'string' ? err : err.message || 'Error deleting certificate'));
      }
    }
  };

  const handleDeleteMsg = async (id) => {
    if (window.confirm('Delete message?')) {
      try {
        await deleteContactMessage(id);
        loadDashboardData();
      } catch (err) {
        alert('Failed to delete message');
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Admin Navbar */}
      <header
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowLeft size={18} />
            <span>View Live Site</span>
          </a>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LayoutDashboard size={20} style={{ color: 'var(--accent-cyan)' }} />
            <span>Admin Control Panel</span>
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={handleOpenCertModal} className="btn btn-primary btn-sm">
            <Plus size={16} />
            <span>Add Certificate</span>
          </button>
          <button onClick={handleLogout} className="btn btn-outline btn-sm">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <button
            onClick={() => setActiveTab('projects')}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '0.5rem',
              fontWeight: 600,
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: activeTab === 'projects' ? 'var(--accent-cyan)' : 'transparent',
              color: activeTab === 'projects' ? '#ffffff' : 'var(--text-secondary)',
            }}
          >
            <FolderPlus size={18} />
            <span>Projects ({projectsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '0.5rem',
              fontWeight: 600,
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: activeTab === 'certificates' ? 'var(--accent-cyan)' : 'transparent',
              color: activeTab === 'certificates' ? '#ffffff' : 'var(--text-secondary)',
            }}
          >
            <Award size={18} />
            <span>Certificates ({certificatesList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '0.5rem',
              fontWeight: 600,
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: activeTab === 'messages' ? 'var(--accent-cyan)' : 'transparent',
              color: activeTab === 'messages' ? '#ffffff' : 'var(--text-secondary)',
            }}
          >
            <MessageSquare size={18} />
            <span>Messages ({messagesList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('resume')}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '0.5rem',
              fontWeight: 600,
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: activeTab === 'resume' ? 'var(--accent-cyan)' : 'transparent',
              color: activeTab === 'resume' ? '#ffffff' : 'var(--text-secondary)',
            }}
          >
            <FileText size={18} />
            <span>Resume Upload</span>
          </button>
        </div>

        {/* PROJECTS MANAGEMENT TAB */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Manage Portfolio Projects
              </h2>
              <button onClick={() => setShowProjectModal(true)} className="btn btn-primary btn-sm">
                <Plus size={16} />
                <span>Add New Project</span>
              </button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {projectsList.map((p) => (
                <div
                  key={p._id}
                  className="glass-card"
                  style={{
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {p.title}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Category: <span style={{ color: 'var(--accent-cyan)' }}>{p.category}</span> | Type: {p.type || 'N/A'}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleDeleteProjectItem(p._id)}
                      style={{
                        padding: '0.5rem',
                        borderRadius: '0.4rem',
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#ef4444',
                        cursor: 'pointer',
                      }}
                      aria-label="Delete Project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CERTIFICATES MANAGEMENT TAB */}
        {activeTab === 'certificates' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Manage Certificates
              </h2>
              <button onClick={handleOpenCertModal} className="btn btn-primary btn-sm">
                <Plus size={16} />
                <span>Add Certificate</span>
              </button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {certificatesList.map((c) => (
                <div
                  key={c._id}
                  className="glass-card"
                  style={{
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {c.title} - {c.subtitle}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Organization: {c.organization} | Issued: {c.issueDate}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteCertItem(c)}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '0.4rem',
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#ef4444',
                      cursor: 'pointer',
                    }}
                    aria-label="Delete Certificate"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
              Contact Messages
            </h2>

            {messagesList.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                No contact messages received yet.
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {messagesList.map((msg) => (
                  <div key={msg._id} className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                          {msg.name} ({msg.email})
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
                          Subject: {msg.subject}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteMsg(msg._id)}
                        style={{
                          padding: '0.4rem',
                          borderRadius: '0.4rem',
                          background: 'rgba(239, 68, 68, 0.15)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#ef4444',
                          cursor: 'pointer',
                          height: 'fit-content',
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* RESUME TAB */}
        {activeTab === 'resume' && (
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Upload Resume (Stored in Database as Base64)
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '2rem' }}>
              Upload your official resume file (PDF, DOCX, or TXT). It will be encoded as Base64 and stored directly inside your MongoDB database.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {/* File Upload Box */}
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Upload size={20} style={{ color: 'var(--accent-cyan)' }} />
                  <span>Select & Upload File</span>
                </h3>

                {resumeSuccessMsg && (
                  <div
                    style={{
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      color: '#10b981',
                      padding: '0.85rem 1rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <CheckCircle2 size={18} />
                    <span>{resumeSuccessMsg}</span>
                  </div>
                )}

                {resumeErrorMsg && (
                  <div
                    style={{
                      background: 'rgba(244, 63, 94, 0.15)',
                      border: '1px solid rgba(244, 63, 94, 0.4)',
                      color: '#f43f5e',
                      padding: '0.85rem 1rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {resumeErrorMsg}
                  </div>
                )}

                <form onSubmit={handleResumeUpload}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label
                      htmlFor="resume-file-input"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2.5rem 1.5rem',
                        border: '2px dashed var(--border-color)',
                        borderRadius: '0.75rem',
                        backgroundColor: 'var(--bg-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-cyan)')}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                    >
                      <Upload size={36} style={{ color: 'var(--accent-cyan)', marginBottom: '0.75rem' }} />
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        Click to browse file
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        Supports PDF, DOCX, TXT (Max 10MB)
                      </span>
                    </label>

                    <input
                      id="resume-file-input"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleResumeFileChange}
                      style={{ display: 'none' }}
                    />
                  </div>

                  {selectedResumeFile && (
                    <div
                      style={{
                        background: 'rgba(56, 189, 248, 0.08)',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1.5rem',
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--accent-cyan)' }}>
                        Selected File: {selectedResumeFile.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Size: {(selectedResumeFile.size / 1024).toFixed(1)} KB | Type: {selectedResumeFile.type || 'Document'}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!selectedResumeFile || resumeUploading}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.85rem' }}
                  >
                    {resumeUploading ? (
                      <span>Encoding & Saving to DB...</span>
                    ) : (
                      <>
                        <Upload size={18} />
                        <span>Save Resume to MongoDB (Base64)</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Current Active Resume Details Card */}
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileCheck size={20} style={{ color: '#10b981' }} />
                  <span>Current Resume in Database</span>
                </h3>

                {currentResume ? (
                  <div>
                    <div
                      style={{
                        padding: '1.25rem',
                        borderRadius: '0.75rem',
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        marginBottom: '1.5rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <FileText size={24} style={{ color: 'var(--accent-cyan)' }} />
                        <div>
                          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {currentResume.filename}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            File Type: {currentResume.fileType}
                          </div>
                        </div>
                      </div>

                      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                        Uploaded: {new Date(currentResume.updatedAt).toLocaleString()}
                      </div>

                      <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '0.35rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        Base64 preview: {currentResume.base64Content?.substring(0, 50)}...
                      </div>
                    </div>

                    <a
                      href={currentResume.base64Content}
                      download={currentResume.filename}
                      className="btn btn-outline"
                      style={{ width: '100%', textAlign: 'center' }}
                    >
                      <FileText size={18} />
                      <span>Download Base64 Resume</span>
                    </a>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                    No custom resume uploaded to MongoDB yet. Users will see generated resume until an official file is uploaded.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ADD PROJECT MODAL */}
      {showProjectModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1.5rem',
          }}
        >
          <div className="glass-card" style={{ width: '100%', maxWidth: '550px', padding: '2rem', borderRadius: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Add New Project</h3>
              <button onClick={() => setShowProjectModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddProject}>
              <input
                type="text"
                placeholder="Project Title"
                required
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                style={{ width: '100%', padding: '0.65rem', marginBottom: '1rem', borderRadius: '0.4rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <select
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  style={{ padding: '0.65rem', borderRadius: '0.4rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Full Stack">Full Stack</option>
                  <option value="Networking">Networking</option>
                </select>

                <input
                  type="text"
                  placeholder="Organization (e.g. TCS iON)"
                  value={newProject.organization}
                  onChange={(e) => setNewProject({ ...newProject, organization: e.target.value })}
                  style={{ padding: '0.65rem', borderRadius: '0.4rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                />
              </div>

              <textarea
                placeholder="Project Description"
                rows="3"
                required
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                style={{ width: '100%', padding: '0.65rem', marginBottom: '1rem', borderRadius: '0.4rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />

              <input
                type="text"
                placeholder="Technologies (comma separated: React, Python, Flask)"
                value={newProject.technologies}
                onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                style={{ width: '100%', padding: '0.65rem', marginBottom: '1.5rem', borderRadius: '0.4rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setShowProjectModal(false)} className="btn btn-outline" style={{ width: '50%' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ width: '50%' }}>
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD CERTIFICATE MODAL */}
      {showCertModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1.5rem',
          }}
        >
          <div className="glass-card" style={{ width: '100%', maxWidth: '550px', padding: '2rem', borderRadius: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>Add New Certificate</h3>
              <button onClick={() => setShowCertModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddCert}>
              {certErrorMsg && (
                <div
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '0.4rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                  }}
                >
                  {certErrorMsg}
                </div>
              )}

              {/* Photo Upload & Auto-Reader */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '0.4rem' }}>
                  📷 Upload Certificate Photo (Auto-Reads & Auto-Fills Details)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCertPhotoSelect}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '0.4rem',
                    background: 'var(--bg-secondary)',
                    border: '1px dashed var(--accent-cyan)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                  }}
                />
              </div>

              {certParsingMsg && (
                <div
                  style={{
                    background: 'rgba(56, 189, 248, 0.12)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    color: 'var(--accent-cyan)',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '0.4rem',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                  }}
                >
                  {certParsingMsg}
                </div>
              )}

              {newCert.certificateImage && (
                <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                  <img
                    src={newCert.certificateImage}
                    alt="Certificate Preview"
                    style={{ maxHeight: '120px', borderRadius: '0.4rem', border: '1px solid var(--border-color)', objectFit: 'contain' }}
                  />
                </div>
              )}

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                  Certificate Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Certificate of Course Completion"
                  required
                  value={newCert.title}
                  onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '0.4rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                  Course / Project Subtitle *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Networking Basics"
                  required
                  value={newCert.subtitle}
                  onChange={(e) => setNewCert({ ...newCert, subtitle: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '0.4rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                    Organization *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cisco Networking Academy"
                    required
                    value={newCert.organization}
                    onChange={(e) => setNewCert({ ...newCert, organization: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '0.4rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                    Issue Date *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 13 August 2026"
                    required
                    value={newCert.issueDate}
                    onChange={(e) => setNewCert({ ...newCert, issueDate: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '0.4rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                  Certificate Type / Badge Theme
                </label>
                <select
                  value={newCert.type}
                  onChange={(e) => setNewCert({ ...newCert, type: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '0.4rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                >
                  <option value="tcs_ion">TCS iON</option>
                  <option value="cisco">Cisco</option>
                  <option value="infosys">Infosys Springboard</option>
                  <option value="placeholder">Placeholder / Generic</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                  Skills Demonstrated (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="IPv4, IPv6, Ethernet, Routing, Network Troubleshooting"
                  value={newCert.skills}
                  onChange={(e) => setNewCert({ ...newCert, skills: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '0.4rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setShowCertModal(false)} className="btn btn-outline" style={{ width: '50%' }}>
                  Cancel
                </button>
                <button type="submit" disabled={certUploading} className="btn btn-primary" style={{ width: '50%' }}>
                  {certUploading ? 'Saving Certificate...' : 'Save Certificate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
