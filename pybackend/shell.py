import os
import subprocess
import uuid
from flask_restful import reqparse
import flask_restful as restful

from config import CONFIG

class ShellCommand(restful.Resource):
    def __init__(self):
        '''
        Initialize a command
        '''
        self.parser = reqparse.RequestParser()
        for arg in self.args:
            self.parser.add_argument(arg["name"], type=str, help="Command line argument '"+arg["name"]+"'")
    def setArgs(self,cmd,args=[]):
        '''
        Sets args from baseclass
        '''
        self.args = args
        self.cmd = cmd
    def put(self):
        '''
        Runs a shell command
        ''' 
        print("Command:",self.cmd)
        args = [self.cmd]
        for name,value in self.parser.parse_args().items():
            args.append(value)
        print("Executing:",args)
        ret = {}
        try:
            env = os.environ.copy()
            env["DISPLAY"] = CONFIG["DISPLAY"]
            proc = subprocess.Popen(args,stdout=None,stderr=None,env=env)
            #sto,ste = proc.communicate(timeout=100)
            #ret["sto"] = sto.decode()
            #ret["ste"] = ste.decode()
            if proc.returncode != 0:
                ret["error"] = "Program returned error: "+str(proc.returncode)
            ret["ret"] = proc.returncode
        except subprocess.TimeoutExpired as t:
            ret["error"] = "Timeout reached"
        except Exception as e:
            ret["error"] = "Exception occured: "+str(e)
        return ret

