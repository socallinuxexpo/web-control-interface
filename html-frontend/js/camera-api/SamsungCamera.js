/**
 * "Constructor" for camera
 **/
var SamsungCamera = function(name, host, username, password, invertY)
{
    this.name = name;
    this.host = host;
    this.username = username;
    this.password = password;
    this.invertY = invertY;
    this.url = "http://" + 
      host + 
      "/stw-cgi/ptzcontrol.cgi";
};

//TODO: Error handling.  For Adam
SamsungCamera.prototype.sendMessage = function(msg, successCallback, errorCallback)
{
    $.ajax({
        type: "GET",
        url: "" + this.url + "?" + msg,
        username: this.username,
        password: this.password,
        success: function() {},
        error: function(e1,e2,e3) 
        {
            console.log(e1);
            console.log(e2);
            console.log(e3);
        }
        /*success: successCallback,
        error: errorCallback*/
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

SamsungCamera.prototype.stop = function(successCallback, errorCallback)
{
    this.sendMessage("msubmenu=stop&action=control&OperationType=All", 
        successCallback, errorCallback);
};

var cam1 = new SamsungCamera("name","localhost/video","admin","sCalAV13",false);
//           new SamsungCamera("Name",CONFIG["camera-control"],"admin","sCalAV13",false);
console.log(cam1);

