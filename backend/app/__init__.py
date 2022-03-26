# Import flask
from flask import Flask

# Define the WSGI application object
app = Flask(__name__)

# Import a module / component using its blueprint handler variable (mod_auth)
# from app.mod_auth.controllers import mod_auth as auth_module

# Register blueprint(s)
# app.register_blueprint(auth_module)
# app.register_blueprint(xyz_module)
# ..

# Build the database:
# This will create the database file using SQLAlchemy
# db.create_all()