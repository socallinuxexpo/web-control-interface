from flask.ext.restful import reqparse
from flask.ext import restful
import uuid 
class Pin(restful.Resource):
    '''
    Represents a serial io pin
    '''
    def __init__(self):
        '''
        Init this pin
        @param port - open serial port
        @param pin - pin number of pin
        '''
        self.parser = reqparse.RequestParser()
        self.parser.add_argument("set", type=str, help="Set 'on','off', 'toggle', or 'cycle'")
    def setArgs(self,port,pin,ro):
        '''
        Set args
        '''
        self.port = port
        self.pin = pin
        self.ro = ro
    def get(self):
        '''
        Read a pin
        '''
        tmp="on"
        #self.port.write("gpio read "+str(pin)+"\r")
        #tmp = self.port.read(25)
        return {"value":tmp == "on"}
    def put(self):
        '''
        Set a pin to value
        '''
        if self.ro:
            return {"error":"Wrting to read only pin"}
        args = self.parser.parse_args()
        if args["set"] == "on":
            self.output(True)
        elif args["set"] == "off":
            self.output(False)
        elif args["set"] == "toggle":
            self.toggle()
        elif args["set"] == "cycle":
            self.output(True)
            time.sleep(0.25)
            self.output(False)
    def toggle(self):
        '''
        Toggle a pin
        '''
        self.output(not self.read)
    def output(self,value):
        '''
        Output a value to the pin
        @param value - true to turn pin on, false off
        '''
        cmd = "set" if value else "clear"
        self.port.write("gpio "+cmd+" "+str(pin)+"\r")
