from .db import db
import datetime
from sqlalchemy import ForeignKey
from .videojoinplaylist import video_playlist

class Video(db.Model):
    __tablename__ = 'videos'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(255), nullable=True)
    description = db.Column(db.String(255), nullable=False)
    thumbnail = db.Column(db.String(255), nullable=True)
    uploadFile = db.Column(db.String(255), nullable=False)
    created_at = db.Column('created_at', db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=datetime.datetime.now)

    comments = db.relationship('Comment', back_populates='video', cascade="all, delete")
    playlists = db.relationship('Playlist', back_populates='videos', secondary=video_playlist)
    user = db.relationship('User', back_populates='videos')

    def video_comments_to_dict(self):
        return{'comment':[comment.to_dict() for comment in self.comments]}


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'title': self.title,
            'description': self.description,
            'thumbnail': self.thumbnail,
            'uploadFile': self.uploadFile,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
