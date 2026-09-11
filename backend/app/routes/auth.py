import os
from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from app.utils.jwt_helper import generate_token

auth_bp = Blueprint('auth', __name__)

ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD_HASH = generate_password_hash(os.environ.get('ADMIN_PASSWORD', 'admin123'))

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    if username == ADMIN_USERNAME and check_password_hash(ADMIN_PASSWORD_HASH, password):
        token = generate_token(username)
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': {'username': username, 'role': 'admin'}
        }), 200

    return jsonify({'message': 'Invalid username or password'}), 401
