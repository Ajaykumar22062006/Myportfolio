# Ajay Kumar D - Full-Stack Developer Portfolio

A modern, production-quality full-stack developer portfolio application built for **Ajay Kumar D** (Aspiring Full-Stack Developer).

## 🚀 Key Features

- **Responsive Glassmorphism UI**: High-impact, modern design system built with React, CSS variables, and Redux state management.
- **Redux Dark/Light Theme**: Persisted theme preferences saved across sessions using `@reduxjs/toolkit`.
- **Dynamic Projects Section**: Showcases *University Hostel Management System* (TCS iON AIP) and *Network Monitoring System* with Cisco Packet Tracer simulation, with category filtering ([All], [Frontend], [Backend], [Full Stack], [Networking]).
- **Certificate Lightbox Gallery & Auto-Reader**: Verified credentials gallery featuring TCS iON AIP, Cisco Networking Academy (Networking Basics), Infosys Springboard (SQL), photo upload with auto-details extraction, and full-screen interactive lightbox modal with zoom and key accessibility.
- **Fact-Based Skill Matrix**: Skill badges for Frontend, Backend, Database, Networking, and Tools without artificial percentage bars.
- **Validated Contact Form**: Frontend form validation sending queries to Node Express REST API + MongoDB.
- **Base64 Resume Upload**: Admin dashboard tab allowing file uploads (PDF, DOCX, TXT), client-side Base64 conversion, and direct MongoDB document persistence.
- **GitHub Integration**: Live developer activity fetching public repositories.
- **Admin Dashboard (`/admin`)**: Protected portal with JWT authentication for full CRUD operations on Projects, Certificates, Resume, and Contact messages.
- **Node.js Express REST API & MongoDB**: Mongoose backend with CORS security, input sanitization, JWT authentication, and fallback support.

---

## 🛠️ Technology Stack

- **Frontend**: React.js, Redux Toolkit, React Router DOM, Axios, Lucide Icons, CSS3 Glassmorphism
- **Backend**: Node.js, Express.js, Mongoose, JsonWebToken, bcryptjs, dotenv, CORS
- **Database**: MongoDB (`portfolio_db`)
- **Networking**: Cisco Packet Tracer, IPv4/IPv6, VLANs, Inter-VLAN Routing, DHCP, ARP

---

## 💻 Setup & Installation Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally on port 27017 or MongoDB Atlas URI)

### 1. Backend Setup (Node.js Express)

```bash
cd backend

# Install dependencies
npm install

# Start Express REST API Server
npm start
# or for development mode:
npm run dev
```
The Express REST API server will run on `http://127.0.0.1:5000`.

### 2. Frontend Setup (React)

```bash
cd frontend

# Install dependencies
npm install

# Start Vite Development Server
npm run dev
```
The application will be accessible at `http://localhost:5173`.

---

## 🔒 Admin Credentials

- **Admin Login Route**: `http://localhost:5173/admin`
- **Default Username**: `admin`
- **Default Password**: `admin123` (Configurable via `.env`)

---

## 📄 License
© 2026 Ajay Kumar D. All rights reserved.
