from flask import Flask, render_template, make_response,jsonify , request, Blueprint
from .forms import ContactForm
from flask_wtf.csrf import CSRFProtect

Contact = Blueprint('contact',
                __name__,
                template_folder='../templates')

Portfolio = Flask(__name__)

# protecting our app 
csrf = CSRFProtect(Portfolio)

@Contact.route('/', methods=['GET', 'POST'])
def contact():
  form = ContactForm()
  if request.method == 'POST' and form.validate_on_submit():
    #print('form is on post')

    # getting data entered
    name = request.form.get('name', None)
    category = "success"
    resp = {'feedback': name, 'category': category}
    print('got name : ', resp)
    # ajax will clear/ refresh the page on submit
    return make_response(jsonify(resp))
 
  #print('get')  
  return render_template('index.html', form=form)