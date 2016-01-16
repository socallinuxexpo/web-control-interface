/**
 * This module holds all of the generic camera code
 * @author starchmd
 */

/**
 * A class handling camera control
 * @param config - configuration to control the setup
 * @param dpad - directional pad element
 * @param zpad - zoom pad element
 * @param pan - pan function returns a value when called
 * @param tilt - tilt function returns a value when called
 * @param zoom - zoom function returns a value when called
 */
var CameraControl = function(config, dpad, zpad, pan, tilt, zoom) {
    this.config = config;
    this.dpad$el = dpad;
    this.zpad$el = zpad;
    this.pan = pan;
    this.tilt = tilt;
    this.zoom = zoom;
    this.camera = this.makeCamera();
    this.camera.stop();
    
    // setup control
    this.setup();
};
/**
 * Setup the visual and control elements
 */
CameraControl.prototype.setup = function() {
    var stopFn = this.camera.stop.bind(this.camera);
    var upFn = this.camera.up.bind(this.camera);
    var downFn = this.camera.down.bind(this.camera);
    var leftFn = this.camera.left.bind(this.camera);
    var rightFn = this.camera.right.bind(this.camera);
    var zoomInFn = this.camera.zoomIn.bind(this.camera);
    var zoomOutFn = this.camera.zoomOut.bind(this.camera);
    var zoomStopFn = this.camera.zoomStop.bind(this.camera);
    
    this.configureArrowKeys();
    
    this.configureButton($(this.dpad$el).find("button.left"), leftFn, stopFn, this.pan);
    this.configureButton($(this.dpad$el).find("button.right"), rightFn, stopFn, this.pan);
    this.configureButton($(this.dpad$el).find("button.up"), upFn, stopFn, this.tilt);
    this.configureButton($(this.dpad$el).find("button.down"), downFn, stopFn, this.tilt);
    this.configureButton($(this.zpad$el).find("button.zoom_in"), zoomInFn, zoomStopFn, this.zoom);
    this.configureButton($(this.zpad$el).find("button.zoom_out"), zoomOutFn, zoomStopFn, this.zoom);

    $(this.zpad$el).find("button.move_home").click(this.camera.moveToHome.bind(this.camera));
    $(this.zpad$el).find("button.set_home").click(this.camera.setHome.bind(this.camera));
};

// TODO: keyup and keydown is too sensitive
CameraControl.prototype.configureArrowKeys = function() {
  var self = this;

  //Key bindings
  $(document).keydown(
      function(event) {
          //Prevent defaults
          if (event.which < 37 || event.which > 40) {
              return;
          }
          event.preventDefault();
          
          var stopFn = self.camera.stop.bind(self.camera);
          switch(event.which) {
              case 37:
                  self.camera.left(self.pan());
                  setTimeout(stopFn, self.config["pan-delay"]);
                  break;
              case 38:
                  self.camera.up(self.tilt());
                  setTimeout(stopFn, self.config["tilt-delay"]);
                  break;
              case 39:
                  self.camera.right(self.pan());
                  setTimeout(stopFn, self.config["pan-delay"]);
                  break;
              case 40:
                  self.camera.down(self.tilt());
                  setTimeout(stopFn, self.config["tilt-delay"]);
                  break;
          }
      }
  );
};

CameraControl.prototype.configureButton = function(button, moveFn, stopFn, speed) {
  button.mousedown(function() {
    moveFn(speed());
  }).mouseup(function() {
    stopFn();
  });
};

/**
 * Constructs a new camera
 * @returns {SamsungCamera} or {PTZOptics}
 */
CameraControl.prototype.makeCamera = function() {
    switch (this.config.type)
    {
        case "SamsungCamera":
            return new SamsungCamera(this.config.name, this.config.control, this.config.username, this.config.password, false);
            break;
        case "PTZOptics":
            return new PTZOpticsCamera(this.config.name, this.config.control, this.config.username, this.config.password, false);
            break;
        default:
            var message = "Problem detecting camera type:"+this.config.type;
            GlobalLogger.error(message);
            throw message;
            break;
    }
};
