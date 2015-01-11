import subprocess
import uuid
from flask.ext.restful import reqparse
from flask.ext import restful

class ShellCommand(restful.Resource):
    def __init__(self):
        '''
        Initialize a command
        '''
        self.parser = reqparse.RequestParser()
        for arg in self.args:
            self.parser.add_argument(arg, type=str, help="Command line argument '"+arg+"'")
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
        proc = subprocess.Popen(args,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
        ret = {}
        try:
            sto,ste = proc.communicate(timeout=10)
            ret["sto"] = sto.decode()
            ret["ste"] = ste.decode()
        except TimeoutExpired:
            ret["error"] = "Timeout reached"
        if proc.returncode != 0:
           ret["error"] = "Program returned error: "+str(proc.returncode)
        ret["ret"] = proc.returncode
        return ret

