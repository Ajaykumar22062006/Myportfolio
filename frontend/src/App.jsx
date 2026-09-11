import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Certificates from './sections/Certificates';
import Resume from './sections/Resume';
import GitHubActivity from './sections/GitHubActivity';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function MainPortfolio() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Certificates />
        <Resume />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const themeMode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
