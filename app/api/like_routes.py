from flask import Blueprint, session, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Like
from datetime import datetime


like_routes = Blueprint('likes', __name__)

#GET ALL LIKES
@like_routes.route('/', methods=['GET'])
# @login_required
def get_likes():
  likes = Like.query.all()
  print(likes,'<============')
  return { 'likes': [ like.to_dict() for like in likes] }




#POST LIKES
@like_routes.route('/', methods=['POST'])
@login_required
def post_likes():

  videoId = request.json['videoId']

  new_like = Like(
    userId = current_user.id,
    videoId = videoId,
  )

  db.session.add(new_like)
  db.session.commit()

  return new_like.to_dict()



#UNLIKE
@like_routes.route('/<int:id>', methods=['DELETE'])
def delete_like(id):
  like = Like.query.get(id)
  db.session.delete(like)
  db.session.commit()
  return 'Like Removed'
