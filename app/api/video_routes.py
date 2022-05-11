from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, Video

video_routes = Blueprint('videos', __name__)


# GET ALL VIDEOS
@video_routes.route('/')
def get_all_videos():
  videos = Video.query.all()
  print(videos, "<==============")
  return { 'videos': [video.to_dict() for video in videos] }



@video_routes.route('/<int:id>')
def get_video(id):
  video = Video.query.get(id)
  print(video, "<+==========")
  return {"video": video.to_dict()}
