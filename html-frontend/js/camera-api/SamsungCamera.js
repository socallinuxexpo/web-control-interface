/**
 * "Constructor" for camera
 * @param name - name for the camera
 * @param host - url portion pointing to camera
 * @param username - username for logging into camera
 * @param password - password for camera
 * @param invertY - invert the Y-axis for the camera
 */
var SamsungCamera = function(name, host, username, password, invertY)
{
    this.name = name;
    this.host = host;
    this.username = username;
    this.password = password;
    this.invertY = invertY;
    this.url = "http://" + host + "/stw-cgi/ptzcontrol.cgi";
};

//TODO: add comments!
SamsungCamera.prototype.sendMessage = function(msg, successCallback, errorCallback)
{
    $.ajax({
        type: "GET",
        url: "" + this.url + "?" + msg,
        username: this.username,
        password: this.password,
        success: function() {},
        error: GlobalLogger.ajaxError.bind(GlobalLogger,"[SamsungCamera-"+this.name+"]")
    });
};

SamsungCamera.prototype.pan = function(speed, successCallback, errorCallback)
{
    this.sendMessage("msubmenu=continuous&action=control&Pan=" + speed, 
        successCallback, errorCallback);
};

SamsungCamera.prototype.left = function(speed, successCallback, errorCallback)
{
    this.pan(-speed, successCallback, errorCallback);
};

SamsungCamera.prototype.right = function(speed, successCallback, errorCallback)
{
    this.pan(speed, successCallback, errorCallback);
};

SamsungCamera.prototype.tilt = function(speed, successCallback, errorCallback)
{
    if(this.invertY)
    {
        speed = -speed;
    }
    this.sendMessage("msubmenu=continuous&action=control&Tilt=" + speed, 
        successCallback, errorCallback);
};

SamsungCamera.prototype.up = function(speed, successCallback, errorCallback)
{
    this.tilt(speed, successCallback, errorCallback);
};

SamsungCamera.prototype.down = function(speed, successCallback, errorCallback)
{
    this.tilt(-speed, successCallback, errorCallback);
};

SamsungCamera.prototype.zoom = function(speed, successCallback, errorCallback)
{
    this.sendMessage("msubmenu=continuous&action=control&Zoom=" + speed, 
        successCallback, errorCallback);
};

SamsungCamera.prototype.zoomIn = function(speed, successCallback, errorCallback)
{
    this.zoom(speed, successCallback, errorCallback);
};

SamsungCamera.prototype.zoomOut = function(speed, successCallback, errorCallback)
{
    this.zoom(-speed, successCallback, errorCallback);
};

/**
 * Stop the camera
 * @param successCallback
 * @param errorCallback
 */
SamsungCamera.prototype.stop = function(successCallback, errorCallback)
{
    this.sendMessage("msubmenu=stop&action=control&OperationType=All", 
        successCallback, errorCallback);
};
