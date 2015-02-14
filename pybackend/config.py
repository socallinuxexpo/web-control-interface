from flask.ext import restful

CONFIG = {
    "LOGDIR" :  "../logs/", 
    "USER" :    "ubuntu",
    "DISPLAY" : ":1",
    "PORT" : "/dev/ttyACM0",

    "COMMANDS" : {
        "Restart Signs" : {"url"  : "restart-signs",
                           "cmd"  : "../bin/reset-signs",
                           "type" : "button",
                           "group": "Commands",
                           "args" : [{"name":"room-url","label":"Room URL","hidden":True}]},
        "Start Stream"  : {"url"  : "start-stream",
                           "cmd"  : "../bin/start-stream",
                           "group": "Commands",
                           "type" : "select","args" : [{"name":"camera-url","label":"Camera URL"}]},
        "Stop Stream"   : {"url"  : "stop-stream",
                           "cmd"  : "../bin/stop-stream",
                           "group": "Commands",
                           "type" : "button"},
        "Start Recording":{"url"  : "record-start",
                           "cmd"  : "../bin/start-record",
                           "group": "Commands",
                           "type" : "buuton"},
        "Stop Recording" :{"url"  : "record-stop",
                           "cmd"  : "../bin/stop-record",
                           "group": "Commands",
                           "type" :"buuton"}
    },
    "PINS" : {
        "Scan Left Adjust" : {"url"  :"scan-left",
                              "pin"  :5,
                              "type" :"button",
                           "group": "Commands",
                              "args" :[{"name":"cycle","hidden":True}]},
        "Scan Right Adjust": {"url"  :"scan-right",
                              "pin"  :6,
                              "type" :"button",
                           "group": "Commands",
                              "args" :[{"name":"cycle","hidden":True}]},
        "Scan Down Adjust" : {"url"  :"scan-down",
                              "pin"  :4,
                              "type" :"button",
                              "group": "Scan",
                              "args" :[{"name":"cycle","hidden":True}]},
        "Scan Up Adjust"   : {"url"  :"scan-up",
                              "pin"  :3,
                              "type" :"button",
                              "group": "Scan",
                              "args" :[{"name":"cycle","hidden":True}]},
        "Scan Menu"        : {"url"  :"scan-menu",
                              "pin"  :2,
                              "type" :"button",
                              "group": "Scan",
                              "args" :[{"name":"cycle","hidden":True}]},
        "Scan Zoom"        : {"url"  :"scan-zoom",
                              "pin"  :1,
                              "type" :"button",
                              "group": "Scan",
                              "args" :[{"name":"cycle","hidden":True}]},
        "KVM Switch Input" : {"url"  :"kvm-switch",
                              "pin"  :0,
                              "type" :"button",
                              "group": "KVM",
                              "args" :[{"name":"cycle","hidden":True}]},
        "KVM Side"         : {"url"  :"kvm-read",
                              "pin"  :7,
                              "type" :"read",
                              "group":"KVM"}
    } 
}

class Config(restful.Resource):
    def get(self):
        '''
        Returns the configuration
        '''
        return CONFIG
