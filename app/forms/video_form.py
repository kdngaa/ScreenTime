from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class UploadVideoForm(FlaskForm):
    title= StringField('title', validators=[Length(min=1, max=255)])
    description= StringField('description', validators=[Length(min=1, max=255)])
    userId = IntegerField('userId')
    uploadFile = StringField('uploadFile')

class UpdateVideoForm(FlaskForm):
    title= StringField('title', validators=[Length(min=1, max=255)])
    description= StringField('description', validators=[Length(min=1, max=255)])
    userId = IntegerField('userId')
