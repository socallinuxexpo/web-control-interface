var CONFIG = { };
CONFIG["url"] = "/control";
CONFIG["config-url"] = CONFIG["url"] + "/config";

// This configuration is used by navigator to setup UI
// and from the controls to list potential streams
CONFIG["room"] = {
  "name" : "Lajolla",
  "cameraType" : "PTZOptics",
};

CONFIG["rooms"] = [ {
  "name" : "Lajolla",
  "url" : "http://Lajolla.scaleav.us/",
  "camera" : "http://Lajolla-cam.scaleav.us/",
  "cameraType" : "SamsungCamera",
}, {
  "name" : "Carmel",
  "url" : "http://Carmel.scaleav.us/",
  "camera" : "http://Carmel-cam.scaleav.us/",
  "cameraType" : "SamsungCamera",
}, {
  "name" : "LAa",
  "url" : "http://LAa.scaleav.us/",
  "camera" : "http://LAa-cam.scaleav.us/",
  "cameraType" : "SamsungCamera",
}, {
  "name" : "LAb",
  "url" : "http://LAb.scaleav.us/",
  "camera" : "http://LAb-cam.scaleav.us/",
  "cameraType" : "SamsungCamera",
}, {
  "name" : "LAc",
  "url" : "http://LAc.scaleav.us/",
  "camera" : "http://LAc-cam.scaleav.us/",
  "cameraType" : "SamsungCamera",
}, {
  "name" : "Marina",
  "url" : "http://Marina.scaleav.us/",
  "camera" : "http://Marina-cam.scaleav.us/",
  "cameraType" : "SamsungCamera",
}, {
  "name" : "CenturyAB",
  "url" : "http://CenturyAB.scaleav.us/",
  "camera" : "http://CenturyAB-cam.scaleav.us/",
  "cameraType" : "SamsungCamera",
}, {
  "name" : "CenturyCD",
  "url" : "http://CenturyCD.scaleav.us/",
  "camera" : "http://CenturyCD-cam.scaleav.us/",
  "cameraType" : "SamsungCamera",
}, {
  "name" : "PlazaBC",
  "url" : "http://PlazaBC.scaleav.us/",
  "camera" : "http://PlazaBC-cam.scaleav.us/",
  "cameraType" : "SamsungCamera",
}, {
  "name" : "plazaD",
  "url" : "http://plazaD.scaleav.us/",
  "camera" : "http://plazaD-cam.scaleav.us/",
  "cameraType" : "SamsungCamera",
} ];

// This configuration is used by camera exclusively
CONFIG["SamsungCamera"] = {
    "name": "Samsung Cam",
    "username": "admin",
    "password": "sCalAV13",
    "pan-delay": 250,
    "tilt-delay": 250,
    "zoom-delay": 500,
    "type": "SamsungCamera",
    "control": "/video",
    "pan-scale": 1.0,
    "tilt-scale": 1.0,
    "zoom-scale": 1.0,
    "pan-speed": 5,
    "tilt-speed": 5,
    "zoom-speed": 5
};

CONFIG["PTZOptics"] = {
    "name": "PTZ Optics Cam",
    "username": "admin",
    "password": "sCalAV13",
    "pan-delay": 250,
    "tilt-delay": 250,
    "zoom-delay": 500,
    "type": "PTZOptics",
    "control": "/video",
    "pan-scale": 1.0,
    "tilt-scale": 1.0,
    "zoom-scale": 1.0,
    "pan-speed": 20,
    "tilt-speed": 20,
    "zoom-speed": 7
};

CONFIG["poll-period"] = 500;

CONFIG["pan-min"] = 1;
CONFIG["pan-max"] = 100;

CONFIG["tilt-min"]= 1;
CONFIG["tilt-max"]= 100;

CONFIG["zoom-min"]= 1;
CONFIG["zoom-max"]= 100;

