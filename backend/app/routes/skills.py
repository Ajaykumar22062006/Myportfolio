from flask import Blueprint, request, jsonify, current_app
from bson import ObjectId
from app.utils.jwt_helper import token_required

skills_bp = Blueprint('skills', __name__)

DEFAULT_SKILLS = [
    { 'category': 'Frontend', 'name': 'React.js', 'iconName': 'Code', 'level': 'Core' },
    { 'category': 'Frontend', 'name': 'JavaScript (ES6+)', 'iconName': 'Code', 'level': 'Core' },
    { 'category': 'Backend', 'name': 'Node.js Express', 'iconName': 'Server', 'level': 'Core' },
    { 'category': 'Backend', 'name': 'Python (Flask)', 'iconName': 'Server', 'level': 'Core' },
    { 'category': 'Database', 'name': 'MongoDB & Mongoose', 'iconName': 'Database', 'level': 'Core' },
    { 'category': 'Networking', 'name': 'Cisco Packet Tracer', 'iconName': 'Network', 'level': 'Core' },
]

def format_doc(doc):
    doc['_id'] = str(doc['_id'])
    return doc

@skills_bp.route('', methods=['GET'])
def get_skills():
    try:
        db = current_app.config['DB']
        items = list(db.skills.find())
        if not items:
            return jsonify(DEFAULT_SKILLS), 200
        return jsonify([format_doc(i) for i in items]), 200
    except Exception as e:
        return jsonify(DEFAULT_SKILLS), 200

@skills_bp.route('', methods=['POST'])
@token_required
def create_skill():
    try:
        data = request.get_json() or {}
        db = current_app.config['DB']
        res = db.skills.insert_one(data)
        data['_id'] = str(res.inserted_id)
        return jsonify(data), 201
    except Exception as e:
        return jsonify({'message': f'Error adding skill: {str(e)}'}), 500

@skills_bp.route('/<id>', methods=['PUT'])
@token_required
def update_skill(id):
    try:
        data = request.get_json() or {}
        db = current_app.config['DB']
        query_filter = {'_id': id}
        if ObjectId.is_valid(id):
            query_filter = {'$or': [{'_id': ObjectId(id)}, {'_id': id}, {'id': id}]}
        db.skills.update_one(query_filter, {'$set': data})
        data['_id'] = id
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'message': f'Error updating skill: {str(e)}'}), 400

@skills_bp.route('/<id>', methods=['DELETE'])
@token_required
def delete_skill(id):
    try:
        db = current_app.config['DB']
        query_filter = {'_id': id}
        if ObjectId.is_valid(id):
            query_filter = {'$or': [{'_id': ObjectId(id)}, {'_id': id}, {'id': id}]}
        db.skills.delete_one(query_filter)
        return jsonify({'message': 'Skill deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Error deleting skill: {str(e)}'}), 400
