/**
 * Constructor for PTZOpticsCamera
 */
function PTZOpticsCamera(host, port, username, password, invertY) {
  this.url = "http://" + host + ":" + port + "/cgi-bin/ptzctrl.cgi";
  this.invertY = invertY;
  this.username = username;
  this.password = password;
}

PTZOpticsCamera.prototype.callPtzOpticsApi = function(query, successCallback, errorCallback) {
  $.ajax({
    type: "GET",
    url: this.url + "?" + query,
    username: this.username,
    password: this.password,
    success: successCallback,
    error: errorCallback
  });
}
  
PTZOpticsCamera.prototype.up = function(tiltSpeed, successCallback, errorCallback) {
  if (this.invertY) {
    var query = "ptzcmd&down&1&" + tiltSpeed;
  } else {
    var query = "ptzcmd&up&1&" + tiltSpeed;
  }
  
  this.callPtzOpticsApi(query, successCallback, errorCallback);
}

PTZOpticsCamera.prototype.down = function(tiltSpeed, successCallback, errorCallback) {
  if (this.invertY) {
    var query = "ptzcmd&up&1&" + tiltSpeed;
  } else {
    var query = "ptzcmd&down&1&" + tiltSpeed;
  }
  
  this.callPtzOpticsApi(query, successCallback, errorCallback);
}

PTZOpticsCamera.prototype.left = function(panSpeed, successCallback, errorCallback) {
  if (this.invertY) {
    var query = "ptzcmd&right&" + panSpeed + "&1";
  } else {
    var query = "ptzcmd&left&" + panSpeed + "&1";
  }
  
  this.callPtzOpticsApi(query, successCallback, errorCallback);
}

PTZOpticsCamera.prototype.right = function(panSpeed, successCallback, errorCallback) {
  if (this.invertY) {
    var query = "ptzcmd&left&" + panSpeed + "&1";
  } else {
    var query = "ptzcmd&right&" + panSpeed + "&1";
  }
  
  this.callPtzOpticsApi(query, successCallback, errorCallback);
}

PTZOpticsCamera.prototype.stop: function(successCallback, errorCallback) {
  var query = "ptzcmd&ptzstop&1&1";
  this.callPtzOpticsApi(query, successCallback, errorCallback);
}

PTZOpticsCamera.prototype.zoomIn: function(zoomSpeed, successCallback, errorCallback) {
  var query = "ptzcmd&zoomin&" + zoomSpeed;
  this.callPtzOpticsApi(query, successCallback, errorCallback);
}

PTZOpticsCamera.prototype.zoomOut: function(zoomSpeed, successCallback, errorCallback) {
  var query = "ptzcmd&zoomout&" + zoomSpeed;
  this.callPtzOpticsApi(query, successCallback, errorCallback);
}

PTZOpticsCamera.prototype.zoomStop: function(successCallback, errorCallback) {
  var query = "ptzcmd&zoomstop&0";
  this.callPtzOpticsApi(query, successCallback, errorCallback);
}
