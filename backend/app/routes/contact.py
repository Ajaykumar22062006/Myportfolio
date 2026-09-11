import datetime
from flask import Blueprint, request, jsonify, current_app
from bson import ObjectId
from app.utils.jwt_helper import token_required

contact_bp = Blueprint('contact', __name__)

def format_msg(m):
    m['_id'] = str(m['_id'])
    return m

@contact_bp.route('', methods=['POST'])
def submit_contact():
    try:
        data = request.get_json() or {}
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        subject = data.get('subject', '').strip()
        message = data.get('message', '').strip()

        if not name or not email or not subject or not message:
            return jsonify({'message': 'All fields are required'}), 400

        if len(message) < 10:
            return jsonify({'message': 'Message must be at least 10 characters'}), 400

        contact_doc = {
            'name': name,
            'email': email,
            'subject': subject,
            'message': message,
            'createdAt': datetime.datetime.utcnow().isoformat(),
            'read': False
        }

        db = current_app.config['DB']
        result = db.messages.insert_one(contact_doc)
        contact_doc['_id'] = str(result.inserted_id)

        return jsonify({'message': 'Message sent successfully!', 'data': contact_doc}), 201

    except Exception as e:
        return jsonify({'message': f'Error submitting message: {str(e)}'}), 500

@contact_bp.route('', methods=['GET'])
@token_required
def get_messages():
    try:
        db = current_app.config['DB']
        messages = list(db.messages.find().sort('createdAt', -1))
        return jsonify([format_msg(m) for m in messages]), 200
    except Exception as e:
        return jsonify({'message': f'Error retrieving messages: {str(e)}'}), 500

@contact_bp.route('/<id>', methods=['DELETE'])
@token_required
def delete_message(id):
    try:
        db = current_app.config['DB']
        result = db.messages.delete_one({'_id': ObjectId(id)})
        if result.deleted_count == 0:
            return jsonify({'message': 'Message not found'}), 404
        return jsonify({'message': 'Message deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Error deleting message: {str(e)}'}), 400
