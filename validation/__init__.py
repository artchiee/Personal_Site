from flask import Flask, render_template
from .contact import Contact

# app initialazation
app = Flask(__name__)

# register static directory
app._static_folder = '../static'

# Register Blueprints
app.register_blueprint(Contact)