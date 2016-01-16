var CONFIG = { };
CONFIG["url"] = "/control";
CONFIG["config-url"] = CONFIG["url"] + "/config";

// This configuration is used by navigator to setup UI
CONFIG["rooms"] = [ {
  "name" : "Lajolla",
  "url" : "http://Lajolla.scaleav.us/"
}, {
  "name" : "Carmel",
  "url" : "http://Carmel.scaleav.us/"
}, {
  "name" : "LAa",
  "url" : "http://LAa.scaleav.us/"
}, {
  "name" : "LAb",
  "url" : "http://LAb.scaleav.us/"
}, {
  "name" : "LAc",
  "url" : "http://LAc.scaleav.us/"
}, {
  "name" : "Marina",
  "url" : "http://Marina.scaleav.us/"
}, {
  "name" : "CenturyAB",
  "url" : "http://CenturyAB.scaleav.us/"
}, {
  "name" : "CenturyCD",
  "url" : "http://CenturyCD.scaleav.us/"
}, {
  "name" : "PlazaBC",
  "url" : "http://PlazaBC.scaleav.us/"
}, {
  "name" : "plazaD",
  "url" : "http://plazaD.scaleav.us/"
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
