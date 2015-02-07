from flask.ext import restful

CONFIG = {
    "LOGDIR" :  "../logs/", 
    "USER" :    "ubuntu",
    "DISPLAY" : ":1",
    "PORT" : "/dev/ttyAMC0",

    "COMMANDS" : {
        "Restart Signs" : {"url":"restart-signs","cmd" : "../bin/reset-signs","type":"button","args":[{"name":"room-url","label":"Room URL","hidden":True}]},
        "Start Stream"  : {"url":"start-stream" ,"cmd" : "../bin/start-stream","type":"select","args" : [{"name":"camera-url","label":"Camera URL"}]},
        "Stop Stream"   : {"url":"stop-stream"  ,"cmd" : "../bin/stop-stream","type":"button"},
        "Start Recording":{"url":"record-start","cmd": "../bin/start-record","type":"buuton"},
        "Stop Recording" :{"url":"record-start","cmd": "../bin/stop-record","type":"buuton"}
    },
    "PINS" : {
        "Scan Left Adjust" : {"url":"scan-left", "pin":1,"type":"button","args":[{"name":"cycle","hidden":True}]},
        "Scan Right Adjust": {"url":"scan-right","pin":2,"type":"button","args":[{"name":"cycle","hidden":True}]},
        "Scan Down Adjust" : {"url":"scan-down", "pin":3,"type":"button","args":[{"name":"cycle","hidden":True}]},
        "Scan Up Adjust"   : {"url":"scan-up",   "pin":4,"type":"button","args":[{"name":"cycle","hidden":True}]},
        "Scan Menu"        : {"url":"scan-menu", "pin":5,"type":"button","args":[{"name":"cycle","hidden":True}]},
        "Scan Zoom"        : {"url":"scan-zoom", "pin":6,"type":"button","args":[{"name":"cycle","hidden":True}]},
        "KVM Switch Input" : {"url":"kvm-switch","pin":0,"type":"button","args":[{"name":"cycle","hidden":True}]},
        "KVM Side"         : {"url":"kvm-read",  "pin":7,"type":"read"}
    } 
}

class Config(restful.Resource):
    def get(self):
        '''
        Returns the configuration
        '''
        return CONFIG
