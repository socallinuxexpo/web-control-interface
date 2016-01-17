var CONFIG = { };
CONFIG["url"] = "/control";
CONFIG["config-url"] = CONFIG["url"] + "/config";

// This configuration is used by navigator to setup UI
// and from the controls to list potential streams
CONFIG["rooms"] = [ {
  "name" : "Lajolla",
  "url" : "http://Lajolla.scaleav.us/",
  "camera" : "http://Lajolla-cam.scaleav.us/",
}, {
  "name" : "Carmel",
  "url" : "http://Carmel.scaleav.us/",
  "camera" : "http://Carmel-cam.scaleav.us/",
}, {
  "name" : "LAa",
  "url" : "http://LAa.scaleav.us/",
  "camera" : "http://LAa-cam.scaleav.us/",
}, {
  "name" : "LAb",
  "url" : "http://LAb.scaleav.us/",
  "camera" : "http://LAb-cam.scaleav.us/",
}, {
  "name" : "LAc",
  "url" : "http://LAc.scaleav.us/",
  "camera" : "http://LAc-cam.scaleav.us/",
}, {
  "name" : "Marina",
  "url" : "http://Marina.scaleav.us/",
  "camera" : "http://Marina-cam.scaleav.us/",
}, {
  "name" : "CenturyAB",
  "url" : "http://CenturyAB.scaleav.us/",
  "camera" : "http://CenturyAB-cam.scaleav.us/",
}, {
  "name" : "CenturyCD",
  "url" : "http://CenturyCD.scaleav.us/",
  "camera" : "http://CenturyCD-cam.scaleav.us/",
}, {
  "name" : "PlazaBC",
  "url" : "http://PlazaBC.scaleav.us/",
  "camera" : "http://PlazaBC-cam.scaleav.us/",
}, {
  "name" : "plazaD",
  "url" : "http://plazaD.scaleav.us/",
  "camera" : "http://plazaD-cam.scaleav.us/",
} ];

// This configuration is used by camera exclusively
CONFIG["camera"] = {
    "name": "Samsung Cam",
    "username": "admin",
    "password": "sCalAV13",
    "pan-delay": 250,
    "tilt-delay": 250,
    "zoom-delay": 500,
    "type": "PTZOptics",
    "control": "/video",
    "pan-scale": 1.0,
    "tilt-scale": 1.0,
    "zoom-scale": 1.0
};

CONFIG["poll-period"] = 500;

CONFIG["pan-min"] = 0;
CONFIG["pan-max"] = 360;

CONFIG["tilt-min"]= 0;
CONFIG["tilt-max"]= 90;

CONFIG["zoom-min"]= 1;
CONFIG["zoom-max"]= 20;

CONFIG["pan-initial"] = 5;
CONFIG["tilt-initial"]= 5;
CONFIG["zoom-initial"]= 1;
