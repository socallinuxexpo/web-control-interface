from flask import Flask
from flask.ext import restful
#Import config
from config import CONFIG
from config import Config
from shell import ShellCommand
from pin import Pin

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
    for name,keys in CONFIG["COMMANDS"].items():
        clazz = classGenerator(ShellCommand,keys["url"].title().replace("-",""),cmd=keys["cmd"],args=keys["args"])
        api.add_resource(clazz, "/commands/"+keys["url"]) 
    for name,keys in CONFIG["PINS"].items():
        clazz = classGenerator(Pin,keys["url"].title().replace("-",""),port=CONFIG["PORT"],pin=keys["pin"],ro=("ro" in keys and keys["ro"]))
        api.add_resource(clazz,"/pins/"+keys["url"]) 
    api.add_resource(Config,"/config") 
setup()
#import subprocess
#@app.route("/")
#def doit():
#   subprocess.Popen(["ls"])
#   return "" 
if __name__ == "__main__":
   app.run(debug=True)
