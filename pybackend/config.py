from flask.ext import restful

CONFIG = {
    "LOGDIR" :  "../logs/", 
    "USER" :    "ubuntu",
    "DISPLAY" : ":1",
    "PORT" : "/dev/ttyAMC0",

    "COMMANDS" : {
        "Restart Signs" : {"url":"restart-signs","cmd" : "../bin/reset-signs","args":[]},
        "Start Stream"  : {"url":"start-stream" ,"cmd" : "../bin/start-stream", "args" : ["room-url"]},
        "Stop Stream"   : {"url":"stop-stream"  ,"cmd" : "../bin/stop-stream","args":[]},
        "Wakeup X11"    : {"url":"wakeup-x11"   ,"cmd" : "../bin/wakeup","args":[]}
    },
    "PINS" : {
        "Switch KVM" : {"url":"switch-kvm", "pin":1},
        "Button 2"   : {"url":"button-2", "pin":2},
        "Button 3"   : {"url":"button-3", "pin":3},
        "Button 4"   : {"url":"button-4", "pin":4},
        "Button 5"   : {"url":"button-5", "pin":5},
        "Button 6"   : {"url":"button-6", "pin":6},
        "Button 7"   : {"url":"button-7", "pin":7},
        "KVM"        : {"url":"read-kvm", "pin":8,"ro":True}
    } 
}

class Config(restful.Resource):
    def get(self):
        '''
        Returns the configuration
        '''
        return CONFIG
