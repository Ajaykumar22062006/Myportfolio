from flask import Blueprint, request, jsonify, current_app
from app.utils.jwt_helper import token_required

profile_bp = Blueprint('profile', __name__)

DEFAULT_PROFILE = {
    'name': 'Ajay Kumar D',
    'title': 'Aspiring Full-Stack Developer',
    'subtitle': 'Available for Full-Stack Opportunities',
    'bio': 'I build responsive web applications and practical software solutions using modern frontend, backend, database, and networking technologies.',
    'narrative': 'I am an aspiring Full-Stack Developer with a practical mindset centered on software engineering fundamentals, database architecture, and network communications.',
    'email': 'ajay872072@gmail.com',
    'githubUrl': 'https://github.com/Ajaykumar22062006',
    'linkedinUrl': 'https://www.linkedin.com/in/ajay-kumar-d-18377a292?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    'statusText': 'Available for Full-Stack Opportunities',
}

@profile_bp.route('', methods=['GET'])
def get_profile():
    try:
        db = current_app.config['DB']
        profile = db.profile.find_one({})
        if not profile:
            return jsonify(DEFAULT_PROFILE), 200
        profile['_id'] = str(profile['_id'])
        return jsonify(profile), 200
    except Exception as e:
        return jsonify(DEFAULT_PROFILE), 200

@profile_bp.route('', methods=['PUT', 'POST'])
@token_required
def update_profile():
    try:
        data = request.get_json() or {}
        db = current_app.config['DB']
        db.profile.delete_many({})
        res = db.profile.insert_one(data)
        data['_id'] = str(res.inserted_id)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'message': f'Error updating profile: {str(e)}'}), 500
