from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Video, Comment
from app.forms.video_form import UploadVideoForm, UpdateVideoForm
from app.awsUpload import (upload_file_to_s3, allowed_file, get_unique_filename)



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
# @video_routes.route('/<int:id>/comments')
# def get_comments_from_video(id):
#   videos = Video.query.get(id)
#   comments = videos.videos
#   return { 'comments': [comment.to_dict() for comment in comments] }



# #UPLOAD VIDEOS
# @video_routes.route('/<int:id>', methods=["POST"])
# def upload_video(id):

#     # user = current_user.to_dict()

#     form = UploadVideoForm()

#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#       data = form.data

#       video = Video(
#           description = data['description'],
#           userId =  data['userId'],
#           videoUrl="url"
#         )

#       db.session.add(video)
#       db.session.commit()

#       return jsonify(video.to_dict())
#     return jsonify(form.errors)





# #UPDATE VIDEOS
# @video_routes.route('/<int:id>', methods=["PUT"])
# def edit_video(id):
#     form = UpdateVideoForm()
#     video = Video.query.get(id)

#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#       data= form.data
#       video.content = data['content']

#       db.session.commit()

#       return jsonify(video.to_dict())
#     return jsonify(form.errors)



# DELETE VIDEOS
@video_routes.route('/<int:id>', methods=['DELETE'])
def delete_video(id):
  video = Video.query.get(id)
  db.session.delete(video)
  db.session.commit()
  return 'Video Removed'




# UPLOAD VIDEOS
@video_routes.route('/new', methods=['GET', 'POST'])
def upload_video():
  form = UploadVideoForm()

  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    if "uploadFile" not in request.files:
      return {"errors": "video required"}, 400

    uploadFile = request.files["uploadFile"]
    print(uploadFile, "<==============")
    if not allowed_file(uploadFile.filename):
        return {"errors": "file type not permitted"}, 400
    print(uploadFile.filename, "<<<====>>>>>>>>>")
    uploadFile.filename = get_unique_filename(uploadFile.filename)
    print(uploadFile, "<<<<<<<<<<<<<>>>>>>========")
    upload = upload_file_to_s3(uploadFile)
    print(upload, "<<<<<<<============")
    if "url" not in upload:
      # if the dictionary doesn't have a url key
      # it means that there was an error when we tried to upload
      # so we send back that error message
      return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_video = Video(userId=current_user.id, uploadFile=url, description=form.data['description'])
    db.session.add(new_video)
    db.session.commit()

    return {"uploadFile": video.to_dict()}

  return form.errors


# #UPLOAD VIDEOS
# @video_routes.route('/new', methods=["POST"])
# def create_video():

#     # user = current_user.to_dict()

#     form = UploadVideoForm()

#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#       data = form.data

#       newVideo = Video(
#           description = data['description'],
#           userId =  data['userId'],
#           uploadFile= data['uploadFile']
#         )

#       db.session.add(newVideo)
#       db.session.commit()

#       return jsonify(newVideo.to_dict())
#     return jsonify(form.errors)
