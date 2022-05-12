from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length




class CreateCommentForm(FlaskForm):
    content = StringField('Content', validators=[DataRequired(), Length(min=1, max=255)])
    userId = IntegerField('userId')
    videoId = IntegerField('videoId')


class UpdateCommentForm(FlaskForm):
    content = StringField('Content', validators=[DataRequired(), Length(min=1, max=255)])
    userId = IntegerField('userId')
    videoId = IntegerField('videoId')
