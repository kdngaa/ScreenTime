from .db import db
import datetime
from sqlalchemy import ForeignKey
from .videojoinplaylist import video_playlist

class Playlist(db.Model):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    userId = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    playlistImg = db.Column(db.String(255), nullable=False)
    created_at = db.Column('created_at', db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=datetime.datetime.now)

    videos = db.relationship('Video', back_populates='playlists',secondary=video_playlist)
    user = db.relationship('User', back_populates='playlists')


    def playlist_videos_to_dict(self):
        return{'video':[video.to_dict() for video in self.videos]}


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'userId': self.userId,
            'playlistImg': self.playlistImg,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
