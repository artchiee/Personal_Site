from flask import Flask,flash , render_template, make_response, jsonify, request, Blueprint, json
from .forms import ContactForm
from flask_wtf.csrf import CSRFProtect
from flask_mail import Mail
import os

# from json import JSONEncoder
# import datetime
import smtplib
from email.message import EmailMessage

Contact = Blueprint('contact',
                    __name__,
                    template_folder='../templates')

Portfolio = Flask(__name__)
mail = Mail(Portfolio)

# csrf to protect app
csrf = CSRFProtect(Portfolio)

mail_address = os.environ.get('Mail_Address')
mail_password = os.environ.get('Mail_Password')

@Contact.route('/', methods=['GET', 'POST'])
def contact():
    form = ContactForm()
    if request.method == 'POST' and form.validate_on_submit():

        # getting data entered
        name = request.form.get('name', None)
        user_email = request.form.get('user_mail', None)
        subject = request.form.get('subject', None)
        message = request.form.get('message', None)
    
          
        msg = EmailMessage()
        msg['Subject'] = subject
        msg['From'] = user_email  #sender
        msg['To'] = mail_address  #rec.ipients

        msg.set_content(
          "email : {} \n subject : {} \n message : {}".format(user_email, subject, message)
        )

        #gmail host/port(reqired)
        host = 'smtp.gmail.com'
        port = 465
      
        with smtplib.SMTP_SSL(host,port) as smtp:
           #setting login(required)
          smtp.login(mail_address, mail_password) 
          smtp.send_message(msg)

        category = "success"
        resp = {'feedback': user_email, 'category': category}
        if resp:
          print('got name : ', resp)
        print(Exception())
        
        # ajax will clear/ refresh the page on submit
        flash('Your Message has been sent', 'success')
        return make_response(jsonify(resp))

    # print('get')
    return render_template('index.html', form=form)


# #-----------#TODO: DElete
# # subclass JSONEncoder
# class DateTimeEncoder(JSONEncoder):
#   # Override the default method
#   def default(self, obj):
#     if isinstance(obj, (datetime.date, datetime.datetime)):
#         return obj.isoformat()


# @Contact.route('/testing')
# def testing():
#     with open('configs.json', 'w') as w:
#         configs = json.dump(Portfolio.config,w, indent=4, cls=DateTimeEncoder)
#         if configs:
#           return Exception()
#         return jsonify({'Status': 'OK'})
