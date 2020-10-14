import os

class Config(object):
    DEBUG = False
    SECRET_KEY = os.environ.get('Key')


class ProductionConfig(Config):
    DEBUG = False
    
class DevelopmentConfig(Config):
    DEBUG = True
 