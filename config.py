import os

class Config(object):
    DEBUG = False
    SECRET_KEY = os.environ.get('Key')
    
    # check secret key
    if not SECRET_KEY:
        raise ValueError('No SEcret key for this app')
    print('secrte key set !!')

class ProductionConfig(Config):
    DEBUG = False
    
class DevelopmentConfig(Config):
    DEBUG = True
 