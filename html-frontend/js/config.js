var CONFIG = { };
CONFIG["url"] = "/control";
CONFIG["config-url"] = CONFIG["url"] + "/config";

// This configuration is used by navigator to setup UI
// and from the controls to list potential streams
CONFIG["room"] = {
	"name" : "room-104",
  "cameraType" : "PTZOptics",
};
CONFIG["rooms"] = [{
  "name":"room-101",
  "url":"http://room-101.scaleav.us/html-frontend/operate.html",
  "camera": "http://room-101.scaleav.us:8080/mixed",
  "cameraType": "SamsungCamera",
},{
  "name":"room-103",
  "url":"http://room-103.scaleav.us/html-frontend/operate.html",
  "camera": "http://room-103.scaleav.us:8080/mixed",
  "cameraType": "SamsungCamera",
},{
  "name":"room-104",
  "url":"http://room-104.scaleav.us/html-frontend/operate.html",
  "camera": "http://room-104.scaleav.us:8080/mixed",
  "cameraType": "SamsungCamera",
},{
  "name":"room-106",
  "url":"http://room-106.scaleav.us/html-frontend/operate.html",
  "camera": "http://room-106.scaleav.us:8080/mixed",
  "cameraType": "SamsungCamera",
},{
  "name":"room-107",
  "url":"http://room-107.scaleav.us/html-frontend/operate.html",
  "camera": "http://room-107.scaleav.us:8080/mixed",
  "cameraType": "SamsungCamera",
},{
  "name":"room-209",
  "url":"http://room-209.scaleav.us/html-frontend/operate.html",
  "camera": "http://room-209.scaleav.us:8080/mixed",
  "cameraType": "SamsungCamera",
},{
  "name":"room-211",
  "url":"http://room-211.scaleav.us/html-frontend/operate.html",
  "camera": "http://room-211.scaleav.us:8080/mixed",
  "cameraType": "SamsungCamera",
},{
  "name":"room-212",
  "url":"http://room-212.scaleav.us/html-frontend/operate.html",
  "camera": "http://room-212.scaleav.us:8080/mixed",
  "cameraType": "SamsungCamera",
},{
  "name":"ballroom-a",
  "url":"http://ballroom-a.scaleav.us/html-frontend/operate.html",
  "camera": "http://ballroom-a.scaleav.us:8080/mixed",
  "cameraType": "SamsungCamera",
},{
  "name":"ballroom-b",
  "url":"http://ballroom-b.scaleav.us/html-frontend/operate.html",
  "camera": "http://ballroom-b.scaleav.us:8080/mixed",
  "cameraType": "SamsungCamera",
},{
  "name":"ballroom-c",
  "url":"http://ballroom-c.scaleav.us/html-frontend/operate.html",
  "camera": "http://ballroom-c.scaleav.us:8080/mixed",
  "cameraType": "SamsungCamera",
},{
  "name":"ballroom-de",
  "url":"http://ballroom-de.scaleav.us/html-frontend/operate.html",
  "camera": "http://ballroom-de.scaleav.us:8080/mixed",
  "cameraType": "SamsungCamera",
},{
  "name":"ballroom-f",
  "url":"http://ballroom-f.scaleav.us/html-frontend/operate.html",
  "camera": "http://ballroom-f.scaleav.us:8080/mixed",
  "cameraType": "SamsungCamera",
},{
  "name":"ballroom-g",
  "url":"http://ballroom-g.scaleav.us/html-frontend/operate.html",
  "camera": "http://ballroom-g.scaleav.us:8080/mixed",
  "cameraType": "SamsungCamera",
},{
  "name":"ballroom-h",
  "url":"http://ballroom-h.scaleav.us/html-frontend/operate.html",
  "camera": "http://ballroom-h.scaleav.us:8080/mixed",
  "cameraType": "SamsungCamera",
}];

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
    "zoom-speed": 5,
    "steptime": 400
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
    "zoom-speed": 7,
    "steptime": 400
};

CONFIG["poll-period"] = 500;

CONFIG["pan-min"] = 1;
CONFIG["pan-max"] = 100;

CONFIG["tilt-min"]= 1;
CONFIG["tilt-max"]= 100;

CONFIG["zoom-min"]= 1;
CONFIG["zoom-max"]= 100;

