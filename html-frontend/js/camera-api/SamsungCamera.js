/**
 * "Constructor" for camera
 **/
var SamsungCamera = function(name, host, username, password, invertY)
{
    this.name = name;
    this.step = step;
    this.host = host;
    this.username = username;
    this.password = password;
    this.invertY = invertY;
    this.url = "http://" + 
      host + 
      "/stw-cgi/ptzcontrol.cgi"
}


SamsungCamera.prototype.sendMessage = function(msg, successCallback, errorCallback)
{
    $.ajax({
        type: "GET",
        url: "" + host + "?" + msg,
        username: this.username,
        password: this.password,
        success: successCallback,
        error: errorCallback
    });
}

SamsungCamera.prototype.pan = function(speed, successCallback, errorCallback)
{
    this.sendMessage("?msubmenu=continuous&action=control&Pan=" + speed, 
        successCallback, errorCallback);
}

SamsungCamera.prototype.left = function(speed, successCallback, errorCallback)
{
    this.pan(-speed, successCallback, errorCallback);
}

SamsungCamera.prototype.right = function(speed, successCallback, errorCallback)
{
    this.pan(speed, successCallback, errorCallback);
}

SamsungCamera.prototype.tilt = function(speed, successCallback, errorCallback)
{
    this.sendMessage("?msubmenu=continuous&action=control&Tilt=" + speed, 
        successCallback, errorCallback);
}

SamsungCamera.prototype.zoom = function(speed, successCallback, errorCallback)
{
    this.sendMessage("?msubmenu=continuous&action=control&Zoom=" + speed, 
        successCallback, errorCallback);
}

SamsungCamera.prototype.stop = function(successCallback, errorCallback)
{
    this.sendMessage("?msubmenu=stop&action=control&OperationType=All", 
        successCallback, errorCallback);
}
