from flask import Blueprint, request, jsonify, current_app
from bson import ObjectId
from app.utils.jwt_helper import token_required

certificates_bp = Blueprint('certificates', __name__)

def format_cert(c):
    c['_id'] = str(c['_id'])
    return c

@certificates_bp.route('', methods=['GET'])
def get_certificates():
    try:
        db = current_app.config['DB']
        certs = list(db.certificates.find())
        return jsonify([format_cert(c) for c in certs]), 200
    except Exception as e:
        return jsonify({'message': f'Error fetching certificates: {str(e)}'}), 500

@certificates_bp.route('', methods=['POST'])
@token_required
def create_certificate():
    try:
        data = request.get_json() or {}
        if not data.get('title'):
            return jsonify({'message': 'Certificate title is required'}), 400
            
        db = current_app.config['DB']
        result = db.certificates.insert_one(data)
        data['_id'] = str(result.inserted_id)
        return jsonify(data), 201
    except Exception as e:
        return jsonify({'message': f'Error creating certificate: {str(e)}'}), 500

@certificates_bp.route('/<id>', methods=['PUT'])
@token_required
def update_certificate(id):
    try:
        data = request.get_json() or {}
        db = current_app.config['DB']
        query_filter = {'_id': id}
        if ObjectId.is_valid(id):
            query_filter = {'$or': [{'_id': ObjectId(id)}, {'_id': id}, {'id': id}]}
            
        result = db.certificates.update_one(query_filter, {'$set': data})
        if result.matched_count == 0:
            return jsonify({'message': 'Certificate not found'}), 404
        data['_id'] = id
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'message': f'Error updating certificate: {str(e)}'}), 400

@certificates_bp.route('/<id>', methods=['DELETE'])
@token_required
def delete_certificate(id):
    try:
        db = current_app.config['DB']
        query_filter = {'_id': id}
        if ObjectId.is_valid(id):
            query_filter = {'$or': [{'_id': ObjectId(id)}, {'_id': id}, {'id': id}]}
            
        result = db.certificates.delete_one(query_filter)
        if getattr(result, 'deleted_count', 0) == 0:
            result = db.certificates.delete_one({'id': id})
            
        return jsonify({'message': 'Certificate deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Error deleting certificate: {str(e)}'}), 400
