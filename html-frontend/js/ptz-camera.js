/**
 * @param Config interface
 * @return Camera interface
 */
function PTZOpticsCamera(config) {
  
  this.config = config;
  this.zoomLevel = config["initial-zoom-level"] ? config["initial-zoom-level"] : 0;
  
  function callPtzOpticsApi(query, successCallback, errorCallback) {
    $.ajax({
      type: "GET",
      url: config["url"] + "?" + query,
      username: "admin",
      password: "sCalAV13",
      success: successCallback,
      error: errorCallback
    });
  }
  
  return {
    up: function(tiltSpeed, successCallback, errorCallback) {
      if (config.invertControl) {
        var query = "ptzcmd&down&1&" + tiltSpeed;
      } else {
        var query = "ptzcmd&up&1&" + tiltSpeed;
      }
      
      callPtzOpticsApi(query, successCallback, errorCallback);
    },
    down: function(tiltSpeed, successCallback, errorCallback) {
      if (config.invertControl) {
        var query = "ptzcmd&up&1&" + tiltSpeed;
      } else {
        var query = "ptzcmd&down&1&" + tiltSpeed;
      }
      
      callPtzOpticsApi(query, successCallback, errorCallback);
    },
    left: function(panSpeed, successCallback, errorCallback) {
      if (config.invertControl) {
        var query = "ptzcmd&right&" + panSpeed + "&1";
      } else {
        var query = "ptzcmd&left&" + panSpeed + "&1";
      }
      
      callPtzOpticsApi(query, successCallback, errorCallback);
    },
    right: function(panSpeed, successCallback, errorCallback) {
      if (config.invertControl) {
        var query = "ptzcmd&left&" + panSpeed + "&1";
      } else {
        var query = "ptzcmd&right&" + panSpeed + "&1";
      }
      
      callPtzOpticsApi(query, successCallback, errorCallback);
    },
    stop: function(successCallback, errorCallback) {
      var query = "ptzcmd&ptzstop&1&1";
      callPtzOpticsApi(query, successCallback, errorCallback);
    },
    zoomIn: function(zoomSpeed, successCallback, errorCallback) {
      var query = "ptzcmd&zoomin&" + zoomSpeed;
      callPtzOpticsApi(query, successCallback, errorCallback);
    },
    zoomOut: function(zoomSpeed, successCallback, errorCallback) {
      var query = "ptzcmd&zoomout&" + zoomSpeed;
      callPtzOpticsApi(query, successCallback, errorCallback);
    },
    zoomStop: function(successCallback, errorCallback) {
      var query = "ptzcmd&zoomstop&0";
      callPtzOpticsApi(query, successCallback, errorCallback);
    }
  };
}
