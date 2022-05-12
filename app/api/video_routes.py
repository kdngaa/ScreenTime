from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, Video, Comment

video_routes = Blueprint('videos', __name__)


# GET ALL VIDEOS
@video_routes.route('/')
def get_all_videos():
  videos = Video.query.all()
  print(videos, "<==============")
  return { 'videos': [video.to_dict() for video in videos] }


#GET SINGLE VIDEO
@video_routes.route('/<int:id>')
def get_video(id):
  video = Video.query.get(id)
  print(video, "<+==========")
  return {"video": video.to_dict()}


#GET COMMENTS ON SINGLE VIDEOS
@video_routes.route('/<int:id>/comments')
def get_comments_from_video(id):
  videos = Video.query.get(id)
  comments = videos.videos
  return { 'comments': [comment.to_dict() for comment in comments] }
