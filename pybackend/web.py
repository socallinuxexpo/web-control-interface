from flask import Flask
import flask_restful as restful
#Import config
from config import CONFIG
from config import Config
from shell import ShellCommand
from pin import Pin

import traceback

app = Flask(__name__)
api = restful.Api(app)


def classGenerator(clazz,name,**kwargs):
    '''
    Generates a new base class from parent class.  __init__ calls set args with
    the closure captured arguments
    @param clazz - base class to sub class
    @param name - name for base class
    @param kwargs - key word args
    '''
    def __init__(self):
        self.setArgs(**kwargs)
        clazz.__init__(self)
    return type(name,(clazz,),{"__init__":__init__})
def setup():
    '''
    Sets up the URLs for Restful
    '''
    for keys in CONFIG["COMMANDS"]:
        clazz = classGenerator(ShellCommand,keys["url"].title().replace("-",""),cmd=keys["cmd"],args=([] if not "args" in keys else keys["args"]))
        api.add_resource(clazz,keys["url"]) 
    for keys in CONFIG["PINS"]:
        clazz = classGenerator(Pin,keys["url"].title().replace("-",""),port=CONFIG["PORT"],pin=keys["pin"],ro=("type" in keys and keys["type"] == "read"))
        api.add_resource(clazz,keys["url"]) 
    api.add_resource(Config,"/config") 
#APP

import logging
from logging import FileHandler
flog = FileHandler("/tmp/python.log")
flog.setLevel(logging.WARNING)
app.logger.addHandler(flog)
setup()
if __name__ == "__main__":
    app.run(debug=True)
