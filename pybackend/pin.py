from flask.ext.restful import reqparse
from flask.ext import restful
import serial
import uuid 
import time

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
        self.device = port
        self.pin = pin
        self.ro = ro
    def get(self):
        '''
        Read a pin
        '''
        try:
            with serial.Serial(self.device, 19200, timeout=1) as self.port:
                self.port.read(1000)
                self.port.write(("gpio read "+str(self.pin)+"\r").encode())
                tmp = self.port.read(250).decode()
        except Exception as e:
            return {"error":"Exception occurred: "+str(e)}
        return {"value":tmp[13] == "1"}
    def put(self):
        '''
        Set a pin to value
        '''
        try:
            with serial.Serial(self.device, 19200, timeout=1) as self.port:
                if self.ro:
                    return {"error":"Wrting to read only pin"}
                args = self.parser.parse_args()
                if args["set"] == "on":
                    self.output(True)
                elif args["set"] == "off":
                    self.output(False)
                elif args["set"] == "cycle":
                    self.output(True)
                    time.sleep(0.25)
                    self.output(False)
        except Exception as e:
            return {"error":"Exception Occured: "+str(e)}
    def output(self,value):
        '''
        Output a value to the pin
        @param value - true to turn pin on, false off
        '''
        cmd = "set" if value else "clear"
        self.port.read(1000)
        self.port.write(("gpio "+cmd+" "+str(self.pin)+"\r").encode())
        self.port.read(1000)
