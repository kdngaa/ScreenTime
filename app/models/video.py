from .db import db
import datetime
from sqlalchemy import ForeignKey

class Video(db.Model):
    __tablename__ = 'videos'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    thumbnail = db.Column(db.String(255), nullable=False)
    uploadFile = db.Column(db.String(255), nullable=False)
    created_at = db.Column('created_at', db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=datetime.datetime.now)

    comments = db.relationship('Comment', back_populates='video', cascade="all, delete")
    playlists = db.relationship('Playlist', back_populates='videos', cascade="all, delete")

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
