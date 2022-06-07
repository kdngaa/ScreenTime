from flask import Blueprint, session, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Like
from datetime import datetime


like_routes = Blueprint('likes', __name__)
