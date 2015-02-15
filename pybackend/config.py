from flask.ext import restful

CONFIG = {
    "LOGDIR" :  "../logs/", 
    "USER" :    "ubuntu",
    "DISPLAY" : ":0",
    "PORT" : "/dev/ttyACM0",
    "COMMANDS-PATH":"/commands",
    "PINS-PATH":"/pins",
    "CYCLE-TIME":0.01
}
CONFIG.update({
    "COMMANDS" : [
        {"name" : "Restart Signs",
         "url"  : CONFIG["COMMANDS-PATH"]+"/restart-signs",
         "cmd"  : "/http/web-control-interface/bin/reset-signs",
         "type" : "button",
         "group": "Signs",
         "args" : [{"name":"room-url","hidden":True}]},
        {"name" : "Start Stream",
         "url"  : CONFIG["COMMANDS-PATH"]+"/start-stream",
         "cmd"  : "/http/web-control-interface/bin/start-stream",
         "group": "Overflow Streaming",
         "type" : "select","args" : [{"name":"camera-url","label":"Camera URL"}]},
        {"name" : "Stop Stream",
         "url"  : CONFIG["COMMANDS-PATH"]+"/stop-stream",
         "cmd"  : "/http/web-control-interface/bin/stop-stream",
         "group": "Overflow Streaming",
         "type" : "button"},
        {"name" : "Start Recording",
         "url"  : CONFIG["COMMANDS-PATH"]+"/record-start",
         "cmd"  : "/http/web-control-interface/bin/start-record",
         "group": "Recording",
         "type" : "button"},
        {"name" : "Stop Recording",
         "url"  : CONFIG["COMMANDS-PATH"]+"/record-stop",
         "cmd"  : "/http/web-control-interface/bin/stop-record",
         "group": "Recording",
         "type" :"button"}
    ],
    "PINS" : [
        {"name" : "Scan Leff",
         "url"  : CONFIG["PINS-PATH"]+"/scan-left",
         "pin"  : 5,
         "type" : "button",
         "group": "Scan",
         "args" : [{"name":"set","value":"cycle","hidden":True}]},
        {"name" : "Scan Right",
         "url"  : CONFIG["PINS-PATH"]+"/scan-right",
         "pin"  : 6,
         "type" : "button",
         "group": "Scan",
         "args" : [{"name":"set","value":"cycle","hidden":True}]},
        {"name" : "Scan Down",
         "url"  : CONFIG["PINS-PATH"]+"/scan-down",
         "pin"  : 4,
         "type" : "button",
         "group": "Scan",
         "args" : [{"name":"set","value":"cycle","hidden":True}]},
        {"name" : "Scan Up",
         "url"  : CONFIG["PINS-PATH"]+"/scan-up",
         "pin"  : 3,
         "type" : "button",
         "group": "Scan",
         "args" : [{"name":"set","value":"cycle","hidden":True}]},
        {"name" : "Scan Menu",
         "url"  : CONFIG["PINS-PATH"]+"/scan-menu",
         "pin"  : 2,
         "type" : "button",
         "group": "Scan",
         "args" : [{"name":"set","value":"cycle","hidden":True}]},
        {"name" : "Scan Zoom",
         "url"  : CONFIG["PINS-PATH"]+"/scan-zoom",
         "pin"  : 1,
         "type" : "button",
         "group": "Scan",
         "args" : [{"name":"set","value":"cycle","hidden":True}]},
        {"name" : "Current",
         "url"  : CONFIG["PINS-PATH"]+"/kvm-read",
         "pin"  : 7,
         "type" : "read",
         "group": "KVM"},
        {"name" : "Switch KVM",
         "url"  : CONFIG["PINS-PATH"]+"/kvm-switch",
         "pin"  : 0,
         "type" : "button",
         "group": "KVM",
         "args" : [{"name":"set","value":"cycle","hidden":True}]}
    ]
})

class Config(restful.Resource):
    def get(self):
        '''
        Returns the configuration
        '''
        return CONFIG
