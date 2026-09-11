import datetime
from flask import Blueprint, request, jsonify, current_app
from app.utils.jwt_helper import token_required

resume_bp = Blueprint('resume', __name__)

@resume_bp.route('', methods=['GET'])
def get_resume():
    try:
        db = current_app.config['DB']
        resume_doc = db.resume.find_one({})
        if not resume_doc:
            return jsonify({'message': 'No resume uploaded yet'}), 404
            
        resume_doc['_id'] = str(resume_doc['_id'])
        return jsonify(resume_doc), 200
    except Exception as e:
        return jsonify({'message': f'Error fetching resume: {str(e)}'}), 500

@resume_bp.route('', methods=['POST'])
@token_required
def upload_resume():
    try:
        data = request.get_json() or {}
        filename = data.get('filename')
        file_type = data.get('fileType')
        base64_content = data.get('base64Content')

        if not filename or not base64_content:
            return jsonify({'message': 'Filename and base64 content are required'}), 400

        doc = {
            'filename': filename,
            'fileType': file_type or 'application/pdf',
            'base64Content': base64_content,
            'updatedAt': datetime.datetime.utcnow().isoformat()
        }

        db = current_app.config['DB']
        # Replace existing resume document or insert new
        db.resume.delete_many({})
        result = db.resume.insert_one(doc)
        doc['_id'] = str(result.inserted_id)

        return jsonify({'message': 'Resume uploaded and stored in database successfully!', 'data': doc}), 201

    except Exception as e:
        return jsonify({'message': f'Error uploading resume: {str(e)}'}), 500
