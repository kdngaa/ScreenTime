from .db import db
import datetime
from sqlalchemy import ForeignKey


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    videoId = db.Column(db.Integer, ForeignKey('videos.id'), nullable=False)
    userId = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    content = db.Column(db.String(255), nullable=False)
    created_at = db.Column('created_at', db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=datetime.datetime.now)

    user = db.relationship('User', back_populates='comments')
    video = db.relationship('Video', back_populates='comments', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'videoId': self.videoId,
            'userId': self.userId,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
