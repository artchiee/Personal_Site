
from flask import Flask
import os
from validation.contact import Contact

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

# Setting secrte_key (Developpement)
app.secret_key = os.environ.get('Key')

# Register Blueprints
app.register_blueprint(Contact)

# Must be set/changed on Production Mode
if __name__ == "__main__":
    app.run(debug=True)