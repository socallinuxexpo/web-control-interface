/**
 * Constructor for PTZOpticsCamera
 */
function PTZOpticsCamera(name, path, username, password, invertY) {
  this.name = name;
  this.url = path + "/cgi-bin/";
  this.invertY = invertY;
  this.username = username;
  this.password = password;
}

PTZOpticsCamera.prototype.callPtzOpticsApi = function(query, successCallback, errorCallback) {
  $.ajax({
    type: "GET",
    url: this.url + query,
    username: this.username,
    password: this.password,
    success: successCallback,
    error: errorCallback
  });
}

PTZOpticsCamera.prototype.up = function(tiltSpeed, successCallback, errorCallback) {
  if (this.invertY) {
    var query = "ptzctrl.cgi?ptzcmd&down&0&" + tiltSpeed;
  } else {
    var query = "ptzctrl.cgi?ptzcmd&up&0&" + tiltSpeed;
  }
  
  this.callPtzOpticsApi(query, successCallback, errorCallback);
}

PTZOpticsCamera.prototype.down = function(tiltSpeed, successCallback, errorCallback) {
  if (this.invertY) {
    var query = "ptzctrl.cgi?ptzcmd&up&0&" + tiltSpeed;
  } else {
    var query = "ptzctrl.cgi?ptzcmd&down&0&" + tiltSpeed;
  }
  
  this.callPtzOpticsApi(query, successCallback, errorCallback);
}

PTZOpticsCamera.prototype.left = function(panSpeed, successCallback, errorCallback) {
  if (this.invertY) {
    var query = "ptzctrl.cgi?ptzcmd&right&" + panSpeed + "&0";
  } else {
    var query = "ptzctrl.cgi?ptzcmd&left&" + panSpeed + "&0";
  }
  
  this.callPtzOpticsApi(query, successCallback, errorCallback);
}

PTZOpticsCamera.prototype.right = function(panSpeed, successCallback, errorCallback) {
  if (this.invertY) {
    var query = "ptzctrl.cgi?ptzcmd&left&" + panSpeed + "&0";
  } else {
    var query = "ptzctrl.cgi?ptzcmd&right&" + panSpeed + "&0";
  }
  
  this.callPtzOpticsApi(query, successCallback, errorCallback);
}

PTZOpticsCamera.prototype.stop =  function(successCallback, errorCallback) {
  var query = "ptzctrl.cgi?ptzcmd&ptzstop&0&0";
  this.callPtzOpticsApi(query, successCallback, errorCallback);
}

PTZOpticsCamera.prototype.zoomIn = function(zoomSpeed, successCallback, errorCallback) {
  var query = "ptzctrl.cgi?ptzcmd&zoomin&" + zoomSpeed;
  this.callPtzOpticsApi(query, successCallback, errorCallback);
}

PTZOpticsCamera.prototype.zoomOut = function(zoomSpeed, successCallback, errorCallback) {
  var query = "ptzctrl.cgi?ptzcmd&zoomout&" + zoomSpeed;
  this.callPtzOpticsApi(query, successCallback, errorCallback);
}

PTZOpticsCamera.prototype.zoomStop = function(successCallback, errorCallback) {
  var query = "ptzctrl.cgi?ptzcmd&zoomstop&0";
  this.callPtzOpticsApi(query, successCallback, errorCallback);
}

PTZOpticsCamera.prototype.setHome = function(successCallback, errorCallback) {
  // elect position 0 to be home position by harding code
  var query = "ptzctrl.cgi?ptzcmd&posset&0";
  this.callPtzOpticsApi(query, successCallback, errorCallback);
};

PTZOpticsCamera.prototype.moveToHome = function(successCallback, errorCallback) {
  var query = "ptzctrl.cgi?ptzcmd&poscall&0";
  this.callPtzOpticsApi(query, successCallback, errorCallback);
};
