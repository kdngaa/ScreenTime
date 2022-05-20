from flask_wtf import FlaskForm
from wtforms import StringField, validators, ValidationError
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(),Length(min=3, max=15) ,username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists,Length(min=6, max=25), Email("Please include an @ and a valid email in the field")],)
    password = StringField('password', validators=[DataRequired(),Length(min=6, max=25)])
