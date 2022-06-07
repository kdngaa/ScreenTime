from .db import db
from sqlalchemy.sql import func

class Like(db.Model):
  __tablename__ = 'likes'

  id = db.Column(db.Integer, primary_key=True)
  videoId = db.Column(db.Integer, ForeignKey('videos.id'), nullable=False)
  userId = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
  createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
  updatedAt = db.Column(db.DateTime(timezone=True), server_onupdate=func.now(), server_default=func.now())

  user = db.relationship('User', back_populates='likes')
  video = db.relationship('Video', back_populates='likes')

  def to_dict(self):
    return {
      'id':self.id,
      'videoId': self.videoId,
      'userId': self.userId,
      'user': self.user.to_dict(),
      'createdAt': self.createdAt,
      'updatedAt': self.updatedAt
    }






# class Like(db.Model):
#     __tablename__ = 'likes'

#     id = db.Column(db.Integer, primary_key=True)
#     userId = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
#     videoId = db.Column(db.Integer, ForeignKey('videos.id'), nullable=False)
#     created_at = db.Column('created_at', db.DateTime, default=datetime.datetime.now, nullable=False)

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'userId': self.user_id,
#             'videoId': self.stock_id,
#             'created_at': self.created_at,
#         }
