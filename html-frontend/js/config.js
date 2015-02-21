var CONFIG = { };
CONFIG["url"] = "/control";
CONFIG["config-url"] = CONFIG["url"] + "/config";

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
CONFIG["rooms"] = [
{"name":"Lajolla","url" :"http://Lajolla.scaleav.us/html-frontend/operate.html"},{"name":"Carmel","url" :"http://Carmel.scaleav.us/html-frontend/operate.html"},{"name":"LAa","url" :"http://LAa.scaleav.us/html-frontend/operate.html"},{"name":"LAb","url" :"http://LAb.scaleav.us/html-frontend/operate.html"},{"name":"LAc","url" :"http://LAc.scaleav.us/html-frontend/operate.html"},{"name":"Marina","url" :"http://Marina.scaleav.us/html-frontend/operate.html"},{"name":"CenturyAB","url" :"http://CenturyAB.scaleav.us/html-frontend/operate.html"},{"name":"CenturyCD","url" :"http://CenturyCD.scaleav.us/html-frontend/operate.html"},{"name":"PlazaBC","url" :"http://PlazaBC.scaleav.us/html-frontend/operate.html"},{"name":"plazaD","url" :"http://plazaD.scaleav.us/html-frontend/operate.html"}];
CONFIG["camera-values"] = [
{"name":"Lajolla","url" :"http://Lajolla-cam.scaleav.us:8080/mixed"},{"name":"Carmel","url" :"http://Carmel-cam.scaleav.us:8080/mixed"},{"name":"LAa","url" :"http://LAa-cam.scaleav.us:8080/mixed"},{"name":"LAb","url" :"http://LAb-cam.scaleav.us:8080/mixed"},{"name":"LAc","url" :"http://LAc-cam.scaleav.us:8080/mixed"},{"name":"Marina","url" :"http://Marina-cam.scaleav.us:8080/mixed"},{"name":"CenturyAB","url" :"http://CenturyAB-cam.scaleav.us:8080/mixed"},{"name":"CenturyCD","url" :"http://CenturyCD-cam.scaleav.us:8080/mixed"},{"name":"PlazaBC","url" :"http://PlazaBC-cam.scaleav.us:8080/mixed"},{"name":"plazaD","url" :"http://plazaD-cam.scaleav.us:8080/mixed"}];
