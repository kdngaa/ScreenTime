from flask import Blueprint, session, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Comment
from app.forms.comment_form import CreateCommentForm, UpdateCommentForm
from datetime import datetime


comment_routes = Blueprint('comments', __name__)


# # GET ALL COMMENTS
# @comment_routes.route('/')
# def get_all_comments():
#   comments = Comment.query.all()
#   print(comments, "<==============")
#   return { 'comments': [comment.to_dict() for comment in comments] }


#GET SINGLE COMMENTS
@comment_routes.route('/<int:id>')
def get_comment(id):
  comments = Comment.query.filter(Comment.videoId == id).all()
  return { 'comments': [comment.to_dict() for comment in comments] }



#POST COMMENTS
@comment_routes.route('/<int:id>', methods=["POST"])
def create_comment(id):

    # user = current_user.to_dict()

    form = CreateCommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
      data = form.data

      comment = Comment(
          content = data['content'],
          userId =  data['userId'],
          videoId = id
        )

      db.session.add(comment)
      db.session.commit()

      return jsonify(comment.to_dict())
    return jsonify(form.errors)




#UPDATE COMMENTS
@comment_routes.route('/<int:id>', methods=["PUT"])
def edit_comment(id):
    form = UpdateCommentForm()
    comment = Comment.query.get(id)

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
      data= form.data
      comment.content = data['content']

      db.session.commit()

      return jsonify(comment.to_dict())
    return jsonify(form.errors)


#DELETE COMMENTS
@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
  comment = Comment.query.get(id)
  db.session.delete(comment)
  db.session.commit()
  return 'Comment Removed'
