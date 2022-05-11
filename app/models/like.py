import datetime
from .db import db
from sqlalchemy import Column, ForeignKey


like = db.Table(
    'likes',


    db.Column(
        'userId',
        db.Integer,
        db.ForeignKey('users.id'),
        primary_key=True
    ),


    db.Column(
        'videoId',
        db.Integer,
        db.ForeignKey('videos.id'),
        primary_key=True
    )
)






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
