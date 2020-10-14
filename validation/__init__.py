from flask import Flask, render_template
from .contact import Contact

# app initialazation
app = Flask(__name__)


# setting with "ENV" to run
if app.config["ENV"] == "production":
    app.config.from_object("config.ProductionConfig")
else:
    app.config.from_object("config.DevelopmentConfig")

# check wich ENV running whene server starts
print(f'ENV is set to: {app.config["ENV"]}')

# register static directory
app._static_folder = '../static'
 
# Register Blueprints
app.register_blueprint(Contact)