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
        "Wakeup X11"    : {"url":"wakeup-x11"   ,"cmd" : "../bin/wakeup","type":"button"}
    },
    "PINS" : {
        "Switch KVM" : {"url":"switch-kvm", "pin":1,"type":"button","args":[{"name":"cycle","hidden":True}]},
        "Button 2"   : {"url":"button-2", "pin":2,"type":"button","args":[{"name":"cycle","hidden":True}]},
        "Button 3"   : {"url":"button-3", "pin":3,"type":"button","args":[{"name":"cycle","hidden":True}]},
        "Button 4"   : {"url":"button-4", "pin":4,"type":"button","args":[{"name":"cycle","hidden":True}]},
        "Button 5"   : {"url":"button-5", "pin":5,"type":"button","args":[{"name":"cycle","hidden":True}]},
        "Button 6"   : {"url":"button-6", "pin":6,"type":"button","args":[{"name":"cycle","hidden":True}]},
        "Button 7"   : {"url":"button-7", "pin":7,"type":"button","args":[{"name":"cycle","hidden":True}]},
        "KVM"        : {"url":"read-kvm", "pin":8,"type":"read"}
    } 
}

class Config(restful.Resource):
    def get(self):
        '''
        Returns the configuration
        '''
        return CONFIG
