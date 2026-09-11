import os
from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    mongo_uri = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/portfolio_db')
    
    try:
        client = MongoClient(mongo_uri, serverSelectionTimeoutMS=2000)
        # Verify connection
        client.admin.command('ping')
        db = client.get_database()
        app.config['DB'] = db
        print("[Database] Successfully connected to MongoDB.")
        
        # Seed default database items if collections are empty
        seed_default_data(db)
        
    except Exception as e:
        print(f"[Database Warning] MongoDB connection failed or offline: {e}")
        # Mock/In-memory fallback for local dev when MongoDB server is not running
        class MockCollection:
            def __init__(self, initial_data=None):
                self.docs = initial_data or []
            def find(self, query=None, **kwargs):
                return self.docs
            def find_one(self, query=None, **kwargs):
                return self.docs[0] if self.docs else None
            def insert_one(self, doc):
                doc['_id'] = f"mock_{len(self.docs)+1}"
                self.docs.append(doc)
                class Result: pass
                r = Result()
                r.inserted_id = doc['_id']
                return r
            def update_one(self, query, update):
                class Result: matched_count = 1
                return Result()
            def delete_one(self, query):
                class Result: deleted_count = 1
                return Result()
            def delete_many(self, query=None):
                self.docs = []
                class Result: deleted_count = len(self.docs)
                return Result()
                
        class MockDB:
            projects = MockCollection([])
            certificates = MockCollection([])
            messages = MockCollection([])
            resume = MockCollection([])

        app.config['DB'] = MockDB()

    # Register Blueprints
    from app.routes.auth import auth_bp
    from app.routes.projects import projects_bp
    from app.routes.certificates import certificates_bp
    from app.routes.contact import contact_bp
    from app.routes.resume import resume_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(projects_bp, url_prefix='/api/projects')
    app.register_blueprint(certificates_bp, url_prefix='/api/certificates')
    app.register_blueprint(contact_bp, url_prefix='/api/contact')
    app.register_blueprint(resume_bp, url_prefix='/api/resume')

    return app

def seed_default_data(db):
    if db.projects.count_documents({}) == 0:
        db.projects.insert_many([
            {
                'title': 'University Hostel Management System',
                'type': 'Industry Project',
                'organization': 'TCS iON Applied Industry Projects (AIP)',
                'duration': '90 Hours',
                'period': '27 March 2026 – 08 May 2026',
                'description': 'University Hostel Management System is an industry project focused on managing university hostel-related operations efficiently through a structured software system.',
                'category': 'Full Stack',
                'technologies': ['React.js', 'Node.js', 'Express', 'MongoDB'],
                'features': [
                    'Student hostel registration and room allocation',
                    'Fee status and grievance management system',
                    'Admin dashboard for hostel warden operations'
                ],
                'githubUrl': '[ADD YOUR INFORMATION]',
                'liveUrl': '[ADD YOUR INFORMATION]'
            },
            {
                'title': 'Network Monitoring and Analysis System with Cisco Network Simulation',
                'type': 'Software & Network Engineering',
                'organization': 'Portfolio Project',
                'duration': 'Comprehensive',
                'period': '2026',
                'description': 'Developed a network management system using Python, Flask, and SQLite with Cisco Packet Tracer for practical network simulation. Implemented device inventory, IP connectivity testing, subnet calculation, ARP/MAC address analysis, and system logging.',
                'category': 'Networking',
                'technologies': ['Python', 'Flask', 'SQLite', 'Cisco Packet Tracer'],
                'features': [
                    'Device inventory management',
                    'IP connectivity testing',
                    'Subnet calculation',
                    'ARP analysis',
                    'System logging'
                ],
                'githubUrl': '[ADD YOUR INFORMATION]',
                'liveUrl': '[ADD YOUR INFORMATION]'
            }
        ])
        print("[Seed] Initial projects seeded.")

    if db.certificates.count_documents({}) == 0:
        db.certificates.insert_many([
            {
                'title': 'Certificate of Industry Project',
                'subtitle': 'University Hostel Management System',
                'organization': 'TCS iON Applied Industry Projects (AIP)',
                'issueDate': '08 May 2026',
                'type': 'tcs_ion',
                'skills': ['Hostel Operations', 'Software System Architecture', 'Database Management']
            },
            {
                'title': 'Certificate of Course Completion',
                'subtitle': 'Networking Basics',
                'organization': 'Cisco Networking Academy',
                'issueDate': '13 August 2026',
                'type': 'cisco',
                'skills': ['Network communication', 'Ethernet', 'IPv4', 'IPv6', 'Routing', 'Network troubleshooting']
            },
            {
                'title': 'Certificate Placeholder',
                'subtitle': '[Add Certificate Title]',
                'organization': '[Add Organization Name]',
                'issueDate': '[Add Date]',
                'type': 'placeholder',
                'skills': ['[Add Skill 1]', '[Add Skill 2]']
            },
            {
                'title': 'Course Completion Certificate',
                'subtitle': 'Learn SQL For Oracle Databases – Using Toad From Scratch',
                'organization': 'Infosys Springboard',
                'issueDate': '11 June 2025',
                'type': 'infosys',
                'skills': ['SQL Query Writing', 'Oracle Database', 'Toad IDE', 'Schema Design']
            }
        ])
        print("[Seed] Initial certificates seeded.")
