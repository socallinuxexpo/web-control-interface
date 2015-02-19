var CONFIG = { };
CONFIG["url"] = "/control";
CONFIG["config-url"] = CONFIG["url"] + "/config";
CONFIG["rooms"] = [
{"name":"Lajolla","url" :"http://Lajolla.scaleav.us/"},{"name":"Carmel","url" :"http://Carmel.scaleav.us/"},{"name":"LAa","url" :"http://LAa.scaleav.us/"},{"name":"LAb","url" :"http://LAb.scaleav.us/"},{"name":"LAc","url" :"http://LAc.scaleav.us/"},{"name":"Marina","url" :"http://Marina.scaleav.us/"},{"name":"CenturyAB","url" :"http://CenturyAB.scaleav.us/"},{"name":"CenturyCD","url" :"http://CenturyCD.scaleav.us/"},{"name":"PlazaBC","url" :"http://PlazaBC.scaleav.us/"},{"name":"plazaD","url" :"http://plazaD.scaleav.us/"}];
CONFIG["camera-values"] = [
{"name":"Lajolla","url" :"http://Lajolla-cam.scaleav.us/"},{"name":"Carmel","url" :"http://Carmel-cam.scaleav.us/"},{"name":"LAa","url" :"http://LAa-cam.scaleav.us/"},{"name":"LAb","url" :"http://LAb-cam.scaleav.us/"},{"name":"LAc","url" :"http://LAc-cam.scaleav.us/"},{"name":"Marina","url" :"http://Marina-cam.scaleav.us/"},{"name":"CenturyAB","url" :"http://CenturyAB-cam.scaleav.us/"},{"name":"CenturyCD","url" :"http://CenturyCD-cam.scaleav.us/"},{"name":"PlazaBC","url" :"http://PlazaBC-cam.scaleav.us/"},{"name":"plazaD","url" :"http://plazaD-cam.scaleav.us/"}];
CONFIG["camera-image"]="/mjpeg/mjpeg_stream";
CONFIG["camera-control"]="/video/cgi-bin/ptz.cgi";

CONFIG["poll-period"] = 500;

CONFIG["pan-min"] = 0;
CONFIG["pan-max"] = 360;
CONFIG["tilt-min"]= 0;
CONFIG["tilt-max"]= 90;
CONFIG["zoom-min"]= 1;
CONFIG["zoom-max"]= 20;
CONFIG["step-min"]= 1;
CONFIG["step-max"]= 30;

CONFIG["pan-step"] = 5;
CONFIG["tilt-step"]= 5; 
CONFIG["zoom-step"]= 1; 
