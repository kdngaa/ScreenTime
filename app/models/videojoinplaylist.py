from .db import db
from sqlalchemy import Column, ForeignKey


video_playlist = db.Table(
    'video_playlist',


    db.Column(
        'videoId',
        db.Integer,
        db.ForeignKey('videos.id'),
        primary_key=True
    ),


    db.Column(
        'playlistId',
        db.Integer,
        db.ForeignKey('playlists.id'),
        primary_key=True
    )
)

# class VideoPlaylist(db.Model):
#     __tablename__ = 'videoPlaylists'

#     id = db.Column(db.Integer, primary_key=True)
#     videoId = db.Column(db.Integer, ForeignKey('videos.id'), nullable=False)
#     playlistId = db.Column(db.Integer, ForeignKey('playlists.id'), nullable=False)
#     created_at = db.Column('created_at', db.DateTime, default=datetime.datetime.now, nullable=False)
#     updated_at = db.Column(db.DateTime(timezone=True), onupdate=datetime.datetime.now)

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'videoId': self.videoId,
#             'playlistId': self.playlistId,
#             'created_at': self.created_at,
#             'updated_at': self.updated_at
#         }
