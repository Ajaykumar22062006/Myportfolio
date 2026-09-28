import { useState, useEffect } from 'react';
import { Star, GitFork, ExternalLink, Code2, AlertCircle } from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';

export default function GitHubActivity() {
  const GITHUB_USERNAME = 'Ajaykumar22062006';
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const FALLBACK_REPOS = [
    {
      id: 1,
      name: 'FoodRescue',
      html_url: `https://github.com/${GITHUB_USERNAME}/FoodRescue`,
      stargazers_count: 1,
      forks_count: 0,
      description: 'FoodRescue is a full-stack web platform that connects food providers with NGOs to reduce surplus food wastage. Features role-based auth, claim management, quantity tracking, and admin dashboard.',
    },
    {
      id: 2,
      name: 'Myportfolio',
      html_url: `https://github.com/${GITHUB_USERNAME}/Myportfolio`,
      stargazers_count: 1,
      forks_count: 0,
      description: 'Personal Full-Stack Developer Portfolio is a responsive web application designed to showcase my technical skills, academic background, projects, certifications, resume, and achievements.',
    },
    {
      id: 3,
      name: 'hostel_management',
      html_url: `https://github.com/${GITHUB_USERNAME}/hostel_management`,
      stargazers_count: 1,
      forks_count: 0,
      description: 'The University Hostel Management System is a web-based application that digitizes student registration, room allocation, fee management, and complaint tracking.',
    },
    {
      id: 4,
      name: 'Network-monitoring-analysis-system',
      html_url: `https://github.com/${GITHUB_USERNAME}/Network-monitoring-analysis-system`,
      stargazers_count: 1,
      forks_count: 0,
      description: 'Developed a Flask-based Network Monitoring and Analysis System with device inventory, connectivity testing, subnet calculation, ARP/MAC analysis, and system logging.',
    },
  ];

  useEffect(() => {
    const fetchGitHubData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        if (!response.ok) {
          throw new Error('GitHub API rate limit or user not found');
        }
        const data = await response.json();
        setRepos(data && data.length > 0 ? data : FALLBACK_REPOS);
      } catch (err) {
        console.warn('GitHub API unavailable, displaying structured placeholder state:', err);
        setRepos(FALLBACK_REPOS);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const customRepoDescriptions = {
    'FoodRescue':
      'FoodRescue is a full-stack web platform that connects food providers with NGOs to reduce surplus food wastage. Providers can list surplus food with quantity, expiry, and pickup details, while NGOs can search, claim, and manage food pickups. The system includes role-based authentication, claim management, quantity and shortage tracking, additional food updates, and an admin dashboard for monitoring users, listings, and claims.',
    'Food-rescue':
      'FoodRescue is a full-stack web platform that connects food providers with NGOs to reduce surplus food wastage. Providers can list surplus food with quantity, expiry, and pickup details, while NGOs can search, claim, and manage food pickups. The system includes role-based authentication, claim management, quantity and shortage tracking, additional food updates, and an admin dashboard for monitoring users, listings, and claims.',
    'food-rescue':
      'FoodRescue is a full-stack web platform that connects food providers with NGOs to reduce surplus food wastage. Providers can list surplus food with quantity, expiry, and pickup details, while NGOs can search, claim, and manage food pickups. The system includes role-based authentication, claim management, quantity and shortage tracking, additional food updates, and an admin dashboard for monitoring users, listings, and claims.',
    'foodrescue':
      'FoodRescue is a full-stack web platform that connects food providers with NGOs to reduce surplus food wastage. Providers can list surplus food with quantity, expiry, and pickup details, while NGOs can search, claim, and manage food pickups. The system includes role-based authentication, claim management, quantity and shortage tracking, additional food updates, and an admin dashboard for monitoring users, listings, and claims.',
    'Myportfolio':
      'Personal Full-Stack Developer Portfolio is a responsive web application designed to showcase my technical skills, academic background, projects, certifications, resume, and achievements. The portfolio provides an interactive and user-friendly interface with project showcases, certificate viewing, responsive design, dark/light mode, and a contact section. It demonstrates my practical knowledge of frontend and backend development, database management, REST APIs, and modern web technologies.',
    'Network-monitoring-analysis-system':
      'Developed a Flask-based Network Monitoring and Analysis System with device inventory, connectivity testing, subnet calculation, ARP/MAC analysis, and system logging.',
    'hostel_management':
      'The University Hostel Management System is a web-based application that digitizes student registration, room allocation, fee management, and complaint tracking. It reduces manual work, improves transparency, and makes hostel administration faster and more efficient.',
  };

  const getRepoDescription = (repo) => {
    if (!repo || !repo.name) return 'No description provided.';
    if (customRepoDescriptions[repo.name]) return customRepoDescriptions[repo.name];
    const norm = repo.name.toLowerCase().replace(/[-_]/g, '');
    for (const [key, desc] of Object.entries(customRepoDescriptions)) {
      if (key.toLowerCase().replace(/[-_]/g, '') === norm) {
        return desc;
      }
    }
    if (norm.includes('foodrescue') || norm.includes('foodrescue')) {
      return customRepoDescriptions['FoodRescue'];
    }
    return repo.description || 'No description provided.';
  };

  return (
    <section id="github" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Developer Activity</span>
          <h2 className="section-title">GitHub Repositories & Code</h2>
          <p className="section-subtitle">
            Live integration fetching public software repositories and code contributions.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
            Loading GitHub repositories...
          </div>
        ) : error || repos.length === 0 ? (
          <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}>
            <GithubIcon size={48} style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              GitHub Profile Integration
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Live public repositories for @{GITHUB_USERNAME}.
            </p>
            <div>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <GithubIcon size={18} />
                <span>Visit GitHub Profile</span>
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.75rem',
                marginBottom: '2.5rem',
              }}
            >
              {repos.map((repo) => (
                <div key={repo.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'var(--accent-cyan)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <Code2 size={18} />
                      <span>{repo.name}</span>
                    </a>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--text-muted)' }}
                      aria-label="View on GitHub"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      marginBottom: '1.25rem',
                      flexGrow: 1,
                    }}
                  >
                    {getRepoDescription(repo)}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', gap: '0.85rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Star size={14} />
                        {repo.stargazers_count}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <GitFork size={14} />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <GithubIcon size={18} />
                <span>Visit GitHub Profile</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
