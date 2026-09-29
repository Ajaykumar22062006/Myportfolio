import datetime
from flask import Blueprint, request, jsonify, current_app
from app.utils.jwt_helper import token_required

resume_bp = Blueprint('resume', __name__)

@resume_bp.route('', methods=['GET'])
def get_resume():
    try:
        db = current_app.config['DB']
        resume_doc = db.resume.find_one({'isCurrent': True})
        if not resume_doc:
            resume_doc = db.resume.find_one({}, sort=[('uploadedAt', -1)])
        if not resume_doc:
            return jsonify({'message': 'No resume uploaded yet'}), 404
            
        resume_doc['_id'] = str(resume_doc['_id'])
        return jsonify(resume_doc), 200
    except Exception as e:
        return jsonify({'message': f'Error fetching resume: {str(e)}'}), 500

@resume_bp.route('', methods=['POST'])
@resume_bp.route('/upload', methods=['POST'])
@token_required
def upload_resume():
    try:
        data = request.get_json() or {}
        filename = data.get('filename')
        file_type = data.get('fileType')
        base64_content = data.get('base64Content')
        blob_url = data.get('blobUrl') or data.get('url') or ''

        if not filename or (not base64_content and not blob_url):
            return jsonify({'message': 'Filename and content (base64 or blobUrl) are required'}), 400

        db = current_app.config['DB']
        # Mark previous resumes as not current
        db.resume.update_many({}, {'$set': {'isCurrent': False}})

        doc = {
            'filename': filename,
            'fileType': file_type or 'application/pdf',
            'base64Content': base64_content or '',
            'url': blob_url,
            'blobUrl': blob_url,
            'isCurrent': True,
            'uploadedAt': datetime.datetime.utcnow().isoformat(),
            'updatedAt': datetime.datetime.utcnow().isoformat()
        }

        result = db.resume.insert_one(doc)
        doc['_id'] = str(result.inserted_id)

        return jsonify({'message': 'Resume uploaded and stored in database successfully!', 'data': doc}), 201

    except Exception as e:
        return jsonify({'message': f'Error uploading resume: {str(e)}'}), 500
