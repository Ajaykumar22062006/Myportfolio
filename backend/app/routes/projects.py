from flask import Blueprint, request, jsonify, current_app
from bson import ObjectId
from app.utils.jwt_helper import token_required

projects_bp = Blueprint('projects', __name__)

def format_project(p):
    p['_id'] = str(p['_id'])
    return p

@projects_bp.route('', methods=['GET'])
def get_projects():
    try:
        db = current_app.config['DB']
        projects = list(db.projects.find())
        return jsonify([format_project(p) for p in projects]), 200
    except Exception as e:
        return jsonify({'message': f'Error fetching projects: {str(e)}'}), 500

@projects_bp.route('/<id>', methods=['GET'])
def get_project(id):
    try:
        db = current_app.config['DB']
        project = db.projects.find_one({'_id': ObjectId(id)})
        if not project:
            return jsonify({'message': 'Project not found'}), 404
        return jsonify(format_project(project)), 200
    except Exception as e:
        return jsonify({'message': f'Invalid ID or error: {str(e)}'}), 400

@projects_bp.route('', methods=['POST'])
@token_required
def create_project():
    try:
        data = request.get_json() or {}
        if not data.get('title') or not data.get('description'):
            return jsonify({'message': 'Title and description are required'}), 400
            
        db = current_app.config['DB']
        result = db.projects.insert_one(data)
        data['_id'] = str(result.inserted_id)
        return jsonify(data), 201
    except Exception as e:
        return jsonify({'message': f'Error creating project: {str(e)}'}), 500

@projects_bp.route('/<id>', methods=['PUT'])
@token_required
def update_project(id):
    try:
        data = request.get_json() or {}
        db = current_app.config['DB']
        query_filter = {'_id': id}
        if ObjectId.is_valid(id):
            query_filter = {'$or': [{'_id': ObjectId(id)}, {'_id': id}, {'id': id}]}
            
        result = db.projects.update_one(query_filter, {'$set': data})
        if result.matched_count == 0:
            return jsonify({'message': 'Project not found'}), 404
        data['_id'] = id
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'message': f'Error updating project: {str(e)}'}), 400

@projects_bp.route('/<id>', methods=['DELETE'])
@token_required
def delete_project(id):
    try:
        db = current_app.config['DB']
        query_filter = {'_id': id}
        if ObjectId.is_valid(id):
            query_filter = {'$or': [{'_id': ObjectId(id)}, {'_id': id}, {'id': id}]}
            
        result = db.projects.delete_one(query_filter)
        if getattr(result, 'deleted_count', 0) == 0:
            result = db.projects.delete_one({'id': id})
            
        return jsonify({'message': 'Project deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Error deleting project: {str(e)}'}), 400
