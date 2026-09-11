import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getProfile,
  updateProfile,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  getSkills,
  createSkill,
  deleteSkill,
  getExperience,
  createExperience,
  deleteExperience,
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
  User,
  GraduationCap,
  Wrench,
  FolderPlus,
  Briefcase,
  Award,
  MessageSquare,
  LogOut,
  Plus,
  Trash2,
  Check,
  X,
  ArrowLeft,
  FileText,
  Upload,
  CheckCircle2,
  FileCheck,
  Pencil,
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);

  // States
  const [profileData, setProfileData] = useState({
    name: 'Ajay Kumar D',
    title: 'Aspiring Full-Stack Developer',
    subtitle: 'Available for Full-Stack Opportunities',
    bio: 'I build responsive web applications and practical software solutions using modern frontend, backend, database, and networking technologies.',
    email: 'ajay872072@gmail.com',
    githubUrl: 'https://github.com/Ajaykumar22062006',
    linkedinUrl:
      'https://www.linkedin.com/in/ajay-kumar-d-18377a292?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    statusText: 'Available for Full-Stack Opportunities',
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');

  const [educationList, setEducationList] = useState([]);
  const [showEduModal, setShowEduModal] = useState(false);
  const [editingEduId, setEditingEduId] = useState(null);
  const [newEdu, setNewEdu] = useState({
    degree: '',
    department: '',
    college: '',
    university: '',
    duration: '',
    graduationYear: '',
    status: 'In Progress',
    cgpa: '',
    percentage: '',
    result: '',
    highlights: '',
  });

  const [skillsList, setSkillsList] = useState([]);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'Frontend',
    level: 'Core',
  });

  const [experienceList, setExperienceList] = useState([]);
  const [showExpModal, setShowExpModal] = useState(false);
  const [newExp, setNewExp] = useState({
    role: '',
    company: '',
    location: '',
    period: '',
    type: 'Industry Internship',
    description: '',
    highlights: '',
    skills: '',
  });

  const [projectsList, setProjectsList] = useState([]);
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

  const [certificatesList, setCertificatesList] = useState([]);
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

  const [messagesList, setMessagesList] = useState([]);

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
      const [prof, edu, sk, exp, proj, cert, res] = await Promise.all([
        getProfile(),
        getEducation(),
        getSkills(),
        getExperience(),
        getProjects(),
        getCertificates(),
        getResume(),
      ]);

      if (prof && typeof prof === 'object' && prof.name) setProfileData(prof);
      setEducationList(Array.isArray(edu) ? edu : []);
      setSkillsList(Array.isArray(sk) ? sk : []);
      setExperienceList(Array.isArray(exp) ? exp : []);
      setProjectsList(Array.isArray(proj) ? proj : []);
      setCertificatesList(Array.isArray(cert) ? cert : []);
      setCurrentResume(res && typeof res === 'object' && !res.message ? res : null);

      try {
        const msgs = await getContactMessages();
        setMessagesList(Array.isArray(msgs) ? msgs : []);
      } catch (err) {
        setMessagesList([]);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin');
  };

  // Profile Update
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMsg('');
    try {
      await updateProfile(profileData);
      setProfileMsg('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile');
    } finally {
      setProfileSaving(false);
    }
  };

  // Education CRUD
  const handleOpenAddEduModal = () => {
    setEditingEduId(null);
    setNewEdu({
      degree: '',
      department: '',
      college: '',
      university: '',
      duration: '',
      graduationYear: '',
      status: 'In Progress',
      cgpa: '',
      percentage: '',
      result: '',
      highlights: '',
    });
    setShowEduModal(true);
  };

  const handleEditEducation = (edu) => {
    setEditingEduId(edu._id || edu.id);
    setNewEdu({
      degree: edu.degree || '',
      department: edu.department || '',
      college: edu.college || '',
      university: edu.university || '',
      duration: edu.duration || '',
      graduationYear: edu.graduationYear || '',
      status: edu.status || 'In Progress',
      cgpa: edu.cgpa || '',
      percentage: edu.percentage || '',
      result: edu.result || '',
      highlights: Array.isArray(edu.highlights) ? edu.highlights.join('\n') : edu.highlights || '',
    });
    setShowEduModal(true);
  };

  const handleSaveEducation = async (e) => {
    e.preventDefault();
    try {
      if (editingEduId) {
        await updateEducation(editingEduId, newEdu);
      } else {
        await createEducation(newEdu);
      }
      setShowEduModal(false);
      setEditingEduId(null);
      setNewEdu({ degree: '', department: '', college: '', university: '', duration: '', graduationYear: '', status: 'In Progress', cgpa: '', percentage: '', result: '', highlights: '' });
      loadDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save education record');
    }
  };

  const handleDeleteEducation = async (id) => {
    if (window.confirm('Delete this education entry?')) {
      try {
        await deleteEducation(id);
        loadDashboardData();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete education');
      }
    }
  };

  // Skill CRUD
  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      await createSkill(newSkill);
      setShowSkillModal(false);
      setNewSkill({ name: '', category: 'Frontend', level: 'Core' });
      loadDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add skill');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (window.confirm('Delete this skill?')) {
      try {
        await deleteSkill(id);
        loadDashboardData();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete skill');
      }
    }
  };

  // Experience CRUD
  const handleAddExperience = async (e) => {
    e.preventDefault();
    try {
      await createExperience(newExp);
      setShowExpModal(false);
      setNewExp({ role: '', company: '', location: '', period: '', type: 'Industry Internship', description: '', highlights: '', skills: '' });
      loadDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add experience');
    }
  };

  const handleDeleteExperience = async (id) => {
    if (window.confirm('Delete this experience entry?')) {
      try {
        await deleteExperience(id);
        loadDashboardData();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete experience');
      }
    }
  };

  // Project CRUD
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      await createProject(newProject);
      setShowProjectModal(false);
      setNewProject({ title: '', category: 'Full Stack', type: 'Software Project', organization: '', duration: '', period: '', description: '', technologies: '', githubUrl: '', liveUrl: '' });
      loadDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Delete this project?')) {
      try {
        await deleteProject(id);
        loadDashboardData();
      } catch (err) {
        alert('Failed to delete project');
      }
    }
  };

  // Certificate CRUD
  const handleAddCertificate = async (e) => {
    e.preventDefault();
    try {
      await createCertificate(newCert);
      setShowCertModal(false);
      setNewCert({ title: '', subtitle: '', organization: '', issueDate: '', type: 'cisco', skills: '', certificateImage: '' });
      loadDashboardData();
    } catch (err) {
      alert('Failed to add certificate');
    }
  };

  const handleDeleteCertificate = async (id) => {
    if (window.confirm('Delete this certificate?')) {
      try {
        await deleteCertificate(id);
        loadDashboardData();
      } catch (err) {
        alert('Failed to delete certificate');
      }
    }
  };

  // Messages CRUD
  const handleDeleteMessage = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        await deleteContactMessage(id);
        loadDashboardData();
      } catch (err) {
        alert('Failed to delete message');
      }
    }
  };

  // Resume Upload
  const handleResumeFileChange = (e) => {
    const file = e.target.files[0];
    setResumeSuccessMsg('');
    setResumeErrorMsg('');
    if (!file) return;

    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];
    if (!validTypes.includes(file.type)) {
      setResumeErrorMsg('Please select a valid PDF, DOCX, or TXT document');
      return;
    }

    setSelectedResumeFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setResumeBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadResumeSubmit = async (e) => {
    e.preventDefault();
    if (!selectedResumeFile || !resumeBase64) {
      setResumeErrorMsg('Please select a document file to upload');
      return;
    }
    setResumeUploading(true);
    setResumeErrorMsg('');
    try {
      const res = await uploadResume({
        filename: selectedResumeFile.name,
        fileType: selectedResumeFile.type,
        base64Content: resumeBase64,
      });
      setCurrentResume(res.resume || res);
      setResumeSuccessMsg('Resume updated & saved successfully!');
      setSelectedResumeFile(null);
      setResumeBase64('');
    } catch (err) {
      setResumeErrorMsg('Failed to upload resume document');
    } finally {
      setResumeUploading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)', padding: '2rem 1rem' }}>
      <div className="container">
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <a href="/" style={{ color: 'var(--accent-cyan)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>
              <ArrowLeft size={16} />
              <span>Back to Portfolio Website</span>
            </a>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Admin Management Portal</h1>
          </div>

          <button onClick={handleLogout} className="btn btn-outline" style={{ borderColor: 'rgba(244, 63, 94, 0.4)', color: '#f43f5e' }}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
          {[
            { id: 'profile', label: 'Profile & Bio', icon: <User size={18} /> },
            { id: 'education', label: 'Education', icon: <GraduationCap size={18} /> },
            { id: 'skills', label: 'Skills', icon: <Wrench size={18} /> },
            { id: 'projects', label: 'Projects', icon: <FolderPlus size={18} /> },
            { id: 'experience', label: 'Experience', icon: <Briefcase size={18} /> },
            { id: 'certificates', label: 'Courses & Certs', icon: <Award size={18} /> },
            { id: 'resume', label: 'Resume Document', icon: <FileText size={18} /> },
            { id: 'messages', label: `Messages (${messagesList.length})`, icon: <MessageSquare size={18} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '0.6rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: activeTab === tab.id ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                backgroundColor: activeTab === tab.id ? 'rgba(56, 189, 248, 0.15)' : 'var(--bg-card)',
                color: activeTab === tab.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Tabs */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>Loading management portal data...</div>
        ) : (
          <>
            {/* 1. Profile & Bio Tab */}
            {activeTab === 'profile' && (
              <div className="glass-card" style={{ padding: '2.5rem', maxWidth: '800px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <User size={22} style={{ color: 'var(--accent-cyan)' }} />
                  <span>Edit Profile & Bio Information</span>
                </h2>

                {profileMsg && (
                  <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#10b981', padding: '0.85rem 1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                    {profileMsg}
                  </div>
                )}

                <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem' }}>Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem' }}>Professional Title</label>
                    <input
                      type="text"
                      value={profileData.title}
                      onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem' }}>Status / Availability Badge</label>
                    <input
                      type="text"
                      value={profileData.statusText || profileData.subtitle}
                      onChange={(e) => setProfileData({ ...profileData, statusText: e.target.value, subtitle: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem' }}>Hero Bio Summary</label>
                    <textarea
                      rows="3"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem' }}>Email Address</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem' }}>GitHub Profile Link</label>
                      <input
                        type="url"
                        value={profileData.githubUrl}
                        onChange={(e) => setProfileData({ ...profileData, githubUrl: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.4rem' }}>LinkedIn Profile Link</label>
                      <input
                        type="url"
                        value={profileData.linkedinUrl}
                        onChange={(e) => setProfileData({ ...profileData, linkedinUrl: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                      />
                    </div>
                  </div>

                  <button type="submit" disabled={profileSaving} className="btn btn-primary" style={{ padding: '0.85rem', marginTop: '1rem' }}>
                    {profileSaving ? 'Saving...' : 'Save Profile Changes'}
                  </button>
                </form>
              </div>
            )}

            {/* 2. Education Tab */}
            {activeTab === 'education' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Manage Education Records</h2>
                  <button onClick={handleOpenAddEduModal} className="btn btn-primary btn-sm">
                    <Plus size={16} />
                    <span>Add Education</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {educationList.map((edu) => (
                    <div key={edu._id || edu.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{edu.degree}</h3>
                          {edu.cgpa && <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(16,185,129,0.2)', color: '#10b981', fontWeight: 700 }}>CGPA: {edu.cgpa}</span>}
                          {edu.percentage && <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(99,102,241,0.2)', color: '#818cf8', fontWeight: 700 }}>Percentage: {edu.percentage}</span>}
                          {edu.result && <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(245,158,11,0.2)', color: '#f59e0b', fontWeight: 700 }}>Result: {edu.result}</span>}
                        </div>
                        <div style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', marginTop: '0.2rem' }}>{edu.college} {edu.university ? `• ${edu.university}` : ''}</div>
                        {edu.department && <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Branch/Dept: {edu.department}</div>}
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Duration: {edu.duration} | Status: {edu.status}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleEditEducation(edu)} className="btn btn-outline btn-sm" style={{ color: 'var(--accent-cyan)', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
                          <Pencil size={15} />
                          <span>Edit</span>
                        </button>
                        <button onClick={() => handleDeleteEducation(edu._id || edu.id)} className="btn btn-outline btn-sm" style={{ color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.3)' }}>
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Skills Tab */}
            {activeTab === 'skills' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Manage Technical Skills</h2>
                  <button onClick={() => setShowSkillModal(true)} className="btn btn-primary btn-sm">
                    <Plus size={16} />
                    <span>Add Skill</span>
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {skillsList.map((skill) => (
                    <div key={skill._id || skill.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>{skill.category}</span>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{skill.name}</h4>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Level: {skill.level || 'Core'}</span>
                      </div>
                      <button onClick={() => handleDeleteSkill(skill._id || skill.id)} className="btn btn-outline btn-sm" style={{ color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.3)' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Projects Tab */}
            {activeTab === 'projects' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Manage Projects</h2>
                  <button onClick={() => setShowProjectModal(true)} className="btn btn-primary btn-sm">
                    <Plus size={16} />
                    <span>Add Project</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {projectsList.map((proj) => (
                    <div key={proj._id || proj.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>{proj.category}</span>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{proj.title}</h3>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>{proj.description}</p>
                      </div>
                      <button onClick={() => handleDeleteProject(proj._id || proj.id)} className="btn btn-outline btn-sm" style={{ color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.3)' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Experience Tab */}
            {activeTab === 'experience' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Manage Experience Records</h2>
                  <button onClick={() => setShowExpModal(true)} className="btn btn-primary btn-sm">
                    <Plus size={16} />
                    <span>Add Experience</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {experienceList.map((exp) => (
                    <div key={exp._id || exp.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{exp.role}</h3>
                        <div style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem' }}>{exp.company} • {exp.period}</div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>{exp.description}</p>
                      </div>
                      <button onClick={() => handleDeleteExperience(exp._id || exp.id)} className="btn btn-outline btn-sm" style={{ color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.3)' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Courses & Certificates Tab */}
            {activeTab === 'certificates' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Manage Courses & Certificates</h2>
                  <button onClick={() => setShowCertModal(true)} className="btn btn-primary btn-sm">
                    <Plus size={16} />
                    <span>Add Certificate</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {certificatesList.map((cert) => (
                    <div key={cert._id || cert.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>{cert.organization}</span>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{cert.subtitle || cert.title}</h3>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Issued: {cert.issueDate}</div>
                      </div>
                      <button onClick={() => handleDeleteCertificate(cert._id || cert.id)} className="btn btn-outline btn-sm" style={{ color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.3)' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. Resume Document Tab */}
            {activeTab === 'resume' && (
              <div className="glass-card" style={{ padding: '2.5rem', maxWidth: '750px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Upload size={22} style={{ color: 'var(--accent-cyan)' }} />
                  <span>Upload & Update Resume File</span>
                </h2>

                {resumeSuccessMsg && (
                  <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#10b981', padding: '0.85rem 1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                    {resumeSuccessMsg}
                  </div>
                )}

                <form onSubmit={handleUploadResumeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <input type="file" onChange={handleResumeFileChange} accept=".pdf,.docx,.txt" style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                  {selectedResumeFile && <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>Selected: {selectedResumeFile.name}</div>}
                  <button type="submit" disabled={resumeUploading} className="btn btn-primary" style={{ padding: '0.85rem' }}>
                    {resumeUploading ? 'Uploading...' : 'Save & Replace Resume'}
                  </button>
                </form>
              </div>
            )}

            {/* 8. Messages Tab */}
            {activeTab === 'messages' && (
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>Visitor Messages ({messagesList.length})</h2>
                {messagesList.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>No contact messages received yet.</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {messagesList.map((msg) => (
                      <div key={msg._id || msg.id} className="glass-card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                          <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{msg.name} ({msg.email})</h3>
                            <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>Subject: {msg.subject}</div>
                          </div>
                          <button onClick={() => handleDeleteMessage(msg._id || msg.id)} className="btn btn-outline btn-sm" style={{ color: '#f43f5e' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{msg.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Education Modal */}
      {showEduModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', zIndex: 100 }}>
          <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{editingEduId ? 'Edit Education Record' : 'Add New Education Record'}</h3>
              <button onClick={() => { setShowEduModal(false); setEditingEduId(null); }} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveEducation} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Degree / Level</label>
                <input type="text" placeholder="Degree (e.g. B.Tech / HSC / SSLC)" required value={newEdu.degree} onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', marginTop: '0.2rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Department / Branch</label>
                <input type="text" placeholder="Department / Branch (e.g. Artificial Intelligence and Data Science)" value={newEdu.department} onChange={(e) => setNewEdu({ ...newEdu, department: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', marginTop: '0.2rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>College / School Name</label>
                <input type="text" placeholder="College / School Name" required value={newEdu.college} onChange={(e) => setNewEdu({ ...newEdu, college: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', marginTop: '0.2rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>University Name / Board</label>
                <input type="text" placeholder="University Name" value={newEdu.university} onChange={(e) => setNewEdu({ ...newEdu, university: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', marginTop: '0.2rem' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Duration</label>
                  <input type="text" placeholder="Duration (e.g. 2023-2027)" required value={newEdu.duration} onChange={(e) => setNewEdu({ ...newEdu, duration: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', marginTop: '0.2rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Status</label>
                  <input type="text" placeholder="Status (e.g. In Progress / Completed)" value={newEdu.status} onChange={(e) => setNewEdu({ ...newEdu, status: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', marginTop: '0.2rem' }} />
                </div>
              </div>
              <div style={{ background: 'rgba(56, 189, 248, 0.05)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(56, 189, 248, 0.2)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>Academic Performance / Marks</div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>CGPA Box (for College / B.Tech)</label>
                  <input type="text" placeholder="e.g. 8.5 / 10" value={newEdu.cgpa} onChange={(e) => setNewEdu({ ...newEdu, cgpa: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '0.4rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', marginTop: '0.2rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Percentage Box (for 12th Grade / HSC)</label>
                  <input type="text" placeholder="e.g. 90%" value={newEdu.percentage} onChange={(e) => setNewEdu({ ...newEdu, percentage: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '0.4rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', marginTop: '0.2rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Result Box (for 10th Grade / SSLC)</label>
                  <input type="text" placeholder="e.g. Pass / First Class" value={newEdu.result} onChange={(e) => setNewEdu({ ...newEdu, result: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '0.4rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', marginTop: '0.2rem' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Highlights (one per line)</label>
                <textarea placeholder="Highlights (one per line)" rows="3" value={newEdu.highlights} onChange={(e) => setNewEdu({ ...newEdu, highlights: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', marginTop: '0.2rem' }} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem' }}>{editingEduId ? 'Update Education Record' : 'Save Education Record'}</button>
            </form>
          </div>
        </div>
      )}

      {/* Skill Modal */}
      {showSkillModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', zIndex: 100 }}>
          <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Add New Technical Skill</h3>
              <button onClick={() => setShowSkillModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddSkill} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Skill Name (e.g. React.js)" required value={newSkill.name} onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              <select value={newSkill.category} onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                <option value="Frontend">Frontend Development</option>
                <option value="Backend">Backend Development</option>
                <option value="Database">Database Management</option>
                <option value="Networking">Networking & Protocols</option>
                <option value="Tools">Development Tools</option>
              </select>
              <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem' }}>Save Skill</button>
            </form>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {showExpModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', zIndex: 100 }}>
          <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Add Experience / Internship</h3>
              <button onClick={() => setShowExpModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddExperience} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Role Title (e.g. Full-Stack Developer Intern)" required value={newExp.role} onChange={(e) => setNewExp({ ...newExp, role: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              <input type="text" placeholder="Company / Organization" required value={newExp.company} onChange={(e) => setNewExp({ ...newExp, company: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              <input type="text" placeholder="Period (e.g. Feb 2026 – May 2026)" required value={newExp.period} onChange={(e) => setNewExp({ ...newExp, period: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              <textarea placeholder="Description summary" rows="3" required value={newExp.description} onChange={(e) => setNewExp({ ...newExp, description: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              <textarea placeholder="Highlights (one bullet point per line)" rows="3" value={newExp.highlights} onChange={(e) => setNewExp({ ...newExp, highlights: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem' }}>Save Experience</button>
            </form>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {showProjectModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', zIndex: 100 }}>
          <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Add New Software / Network Project</h3>
              <button onClick={() => setShowProjectModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Project Title" required value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              <select value={newProject.category} onChange={(e) => setNewProject({ ...newProject, category: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                <option value="Full Stack">Full Stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Networking">Networking</option>
              </select>
              <textarea placeholder="Description" rows="3" required value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              <input type="text" placeholder="Technologies (comma separated)" value={newProject.technologies} onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              <input type="url" placeholder="GitHub Repository Link" value={newProject.githubUrl} onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem' }}>Save Project</button>
            </form>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {showCertModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', zIndex: 100 }}>
          <div className="glass-card" style={{ padding: '2rem', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Add Certificate / Course</h3>
              <button onClick={() => setShowCertModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddCertificate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Title (e.g. Certificate of Course Completion)" required value={newCert.title} onChange={(e) => setNewCert({ ...newCert, title: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              <input type="text" placeholder="Subtitle / Course Name" required value={newCert.subtitle} onChange={(e) => setNewCert({ ...newCert, subtitle: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              <input type="text" placeholder="Organization / Issuer" required value={newCert.organization} onChange={(e) => setNewCert({ ...newCert, organization: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              <input type="text" placeholder="Issue Date (e.g. 13 August 2026)" required value={newCert.issueDate} onChange={(e) => setNewCert({ ...newCert, issueDate: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem' }}>Save Certificate</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
