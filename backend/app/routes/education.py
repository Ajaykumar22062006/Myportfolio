from flask import Blueprint, request, jsonify, current_app
from bson import ObjectId
from app.utils.jwt_helper import token_required

education_bp = Blueprint('education', __name__)

DEFAULT_EDUCATION = [
    {
        'degree': 'B.Tech',
        'department': 'Artificial Intelligence and Data Science',
        'college': 'Jeppiaar Institute of Technology',
        'university': 'Affiliated to Anna University',
        'duration': '2023-2027',
        'graduationYear': '2027',
        'status': 'In Progress',
        'cgpa': '8.5 / 10',
        'percentage': '',
        'result': '',
        'highlights': [
            'Core coursework in Artificial Intelligence, Data Science & Machine Learning',
            'Database Management Systems, Computer Networks & Operating Systems',
            'Full-Stack Web Development projects & industry practicals'
        ]
    },
    {
        'degree': 'Higher Secondary Certificate (HSC / 12th Grade)',
        'department': 'Computer Science',
        'college': 'Anderson Higher Secondary School',
        'university': 'State Board of School Examinations',
        'duration': '2022-2023',
        'graduationYear': '2023',
        'status': 'Completed',
        'percentage': '90%'
    }
]

def format_doc(doc):
    doc['_id'] = str(doc['_id'])
    return doc

@education_bp.route('', methods=['GET'])
def get_education():
    try:
        db = current_app.config['DB']
        items = list(db.education.find())
        if not items:
            return jsonify(DEFAULT_EDUCATION), 200
        return jsonify([format_doc(i) for i in items]), 200
    except Exception as e:
        return jsonify(DEFAULT_EDUCATION), 200

@education_bp.route('', methods=['POST'])
@token_required
def create_education():
    try:
        data = request.get_json() or {}
        db = current_app.config['DB']
        res = db.education.insert_one(data)
        data['_id'] = str(res.inserted_id)
        return jsonify(data), 201
    except Exception as e:
        return jsonify({'message': f'Error adding education: {str(e)}'}), 500

@education_bp.route('/<id>', methods=['PUT'])
@token_required
def update_education(id):
    try:
        data = request.get_json() or {}
        db = current_app.config['DB']
        query_filter = {'_id': id}
        if ObjectId.is_valid(id):
            query_filter = {'$or': [{'_id': ObjectId(id)}, {'_id': id}, {'id': id}]}
        db.education.update_one(query_filter, {'$set': data})
        data['_id'] = id
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'message': f'Error updating education: {str(e)}'}), 400

@education_bp.route('/<id>', methods=['DELETE'])
@token_required
def delete_education(id):
    try:
        db = current_app.config['DB']
        query_filter = {'_id': id}
        if ObjectId.is_valid(id):
            query_filter = {'$or': [{'_id': ObjectId(id)}, {'_id': id}, {'id': id}]}
        db.education.delete_one(query_filter)
        return jsonify({'message': 'Education deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Error deleting education: {str(e)}'}), 400
