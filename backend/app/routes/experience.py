from flask import Blueprint, request, jsonify, current_app
from bson import ObjectId
from app.utils.jwt_helper import token_required

experience_bp = Blueprint('experience', __name__)

DEFAULT_EXPERIENCE = [
    {
        'role': 'Full-Stack Developer Intern',
        'company': 'TCS iON Applied Industry Projects (AIP)',
        'location': 'Remote',
        'period': 'Feb 2026 – May 2026',
        'type': 'Industry Internship',
        'description': 'Developed and implemented the University Hostel Management System digitizing student allocation, room records, fee payment tracking, and admin dashboards.',
        'highlights': [
            'Engineered RESTful endpoints using Node.js, Express, and MongoDB Mongoose schemas.',
            'Built responsive React frontend dashboards with glassmorphism UI components and Redux Toolkit state.'
        ],
        'skills': ['React.js', 'Node.js', 'Express', 'MongoDB']
    }
]

def format_doc(doc):
    doc['_id'] = str(doc['_id'])
    return doc

@experience_bp.route('', methods=['GET'])
def get_experience():
    try:
        db = current_app.config['DB']
        items = list(db.experience.find())
        if not items:
            return jsonify(DEFAULT_EXPERIENCE), 200
        return jsonify([format_doc(i) for i in items]), 200
    except Exception as e:
        return jsonify(DEFAULT_EXPERIENCE), 200

@experience_bp.route('', methods=['POST'])
@token_required
def create_experience():
    try:
        data = request.get_json() or {}
        db = current_app.config['DB']
        res = db.experience.insert_one(data)
        data['_id'] = str(res.inserted_id)
        return jsonify(data), 201
    except Exception as e:
        return jsonify({'message': f'Error adding experience: {str(e)}'}), 500

@experience_bp.route('/<id>', methods=['PUT'])
@token_required
def update_experience(id):
    try:
        data = request.get_json() or {}
        db = current_app.config['DB']
        query_filter = {'_id': id}
        if ObjectId.is_valid(id):
            query_filter = {'$or': [{'_id': ObjectId(id)}, {'_id': id}, {'id': id}]}
        db.experience.update_one(query_filter, {'$set': data})
        data['_id'] = id
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'message': f'Error updating experience: {str(e)}'}), 400

@experience_bp.route('/<id>', methods=['DELETE'])
@token_required
def delete_experience(id):
    try:
        db = current_app.config['DB']
        query_filter = {'_id': id}
        if ObjectId.is_valid(id):
            query_filter = {'$or': [{'_id': ObjectId(id)}, {'_id': id}, {'id': id}]}
        db.experience.delete_one(query_filter)
        return jsonify({'message': 'Experience deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Error deleting experience: {str(e)}'}), 400
