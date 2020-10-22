
# import FlaskForm instead od Form to avoid errors
from flask_wtf import FlaskForm
from wtforms.fields.html5 import EmailField
from wtforms import (TextField, 
StringField,
 TextAreaField,
  SubmitField, validators)


class ContactForm(FlaskForm):
    name = StringField('Name', 
            [validators.DataRequired()])

    user_mail = EmailField('Email', [validators.DataRequired(message='Only gmail allowed here !!g')])

    subject = TextField("Subject")
    message = TextAreaField("Message",[validators.DataRequired()])
    submit = SubmitField("Send")