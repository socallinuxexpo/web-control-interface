/**
 * "Constructor" for camera
 * 
 * @param name -
 *          name for the camera
 * @param path -
 *          /path portion pointing to camera
 * @param username -
 *          username for logging into camera
 * @param password -
 *          password for camera
 * @param invertY -
 *          invert the Y-axis for the camera
 */
var SamsungCamera = function(name, path, username, password, invertY) {
  this.name = name;
  this.username = username;
  this.password = password;
  this.invertY = invertY;
  this.url = path + "/stw-cgi/";
};

SamsungCamera.prototype.sendMessage = function(msg, successCallback,
    errorCallback) {
  $.ajax({
    type : "GET",
    url : "" + this.url + msg,
    username : this.username,
    password : this.password,
    success : function(data, text, xhr) {
      var duration = Date.now() - start;
      GlobalLogger.info("Ajax query=[" + query + "] response=[" + data + "] have latency=[" + duration + "ms]");
      if (successCallback) {
        successCallback();
      }
    },
    error : function(xhr, text, error) {
      var duration = Date.now() - start;
      GlobalLogger.info("Ajax query=[" + query + "] error=[" + error + "] have latency=[" + duration + "ms]");
      if (errorCallback) {
        errorCallback();
      }
    }
  });
};

SamsungCamera.prototype.pan = function(speed, successCallback, errorCallback) {
  this.sendMessage("ptzcontrol.cgi?msubmenu=continuous&action=control&Pan="
      + speed, successCallback, errorCallback);
};

SamsungCamera.prototype.left = function(speed, successCallback, errorCallback) {
  this.pan(-speed, successCallback, errorCallback);
};

SamsungCamera.prototype.right = function(speed, successCallback, errorCallback) {
  this.pan(speed, successCallback, errorCallback);
};

SamsungCamera.prototype.tilt = function(speed, successCallback, errorCallback) {
  if (this.invertY) {
    speed = -speed;
  }
  this.sendMessage("ptzcontrol.cgi?msubmenu=continuous&action=control&Tilt="
      + speed, successCallback, errorCallback);
};

SamsungCamera.prototype.up = function(speed, successCallback, errorCallback) {
  this.tilt(speed, successCallback, errorCallback);
};

SamsungCamera.prototype.down = function(speed, successCallback, errorCallback) {
  this.tilt(-speed, successCallback, errorCallback);
};

SamsungCamera.prototype.zoom = function(speed, successCallback, errorCallback) {
  this.sendMessage("ptzcontrol.cgi?msubmenu=continuous&action=control&Zoom="
      + speed, successCallback, errorCallback);
};

SamsungCamera.prototype.zoomIn = function(speed, successCallback, errorCallback) {
  this.zoom(speed, successCallback, errorCallback);
};

SamsungCamera.prototype.zoomOut = function(speed, successCallback,
    errorCallback) {
  this.zoom(-speed, successCallback, errorCallback);
};

SamsungCamera.prototype.zoomStop = function(successCallback, errorCallback) {
  this.stop(successCallback, errorCallback);
};

SamsungCamera.prototype.setHome = function(successCallback, errorCallback) {
  this.sendMessage("ptzconfig.cgi?msubmenu=home&action=set&Channel=0",
      successCallback, errorCallback);
};

SamsungCamera.prototype.moveToHome = function(successCallback, errorCallback) {
  this.sendMessage("ptzcontrol.cgi?msubmenu=home&action=control&Channel=0",
      successCallback, errorCallback);
};

/**
 * Stop the camera
 * 
 * @param successCallback
 * @param errorCallback
 */
SamsungCamera.prototype.stop = function(successCallback, errorCallback) {
  this.sendMessage(
      "ptzcontrol.cgi?msubmenu=stop&action=control&OperationType=All",
      successCallback, errorCallback);
};
