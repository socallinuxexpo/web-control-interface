/**
 * This module holds all of the generic camera code
 * @author starchmd
 */

/**
 * A class handling camera control
 * @param config - configuration to control the setup
 * @param dpad - directional pad element
 * @param zpad - zoom pad element
 * @param image- image element
 */
var CameraControl = function(config,dpad,zpad,image) {
    this.config = config;
    this.dpad$el = dpad;
    this.zpad$el = zpad;
    this.image$el = image;
    this.camera = this.makeCamera();
    this.camera.stop();
    
    //Setup the visual elements
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
    
    $(this.dpad$el).find("button").button();
    $(this.zpad$el).find("button").button();

    this.configureArrowKeys();
    
    var panSpeed = this.getPanSpeed.bind(this);
    var zoomSpeed = this.getZoomSpeed.bind(this);
    
    this.configureButton($(this.dpad$el).find("button.left"), leftFn, stopFn, panSpeed);
    this.configureButton($(this.dpad$el).find("button.right"), rightFn, stopFn, panSpeed);
    this.configureButton($(this.dpad$el).find("button.up"), upFn, stopFn, panSpeed);
    this.configureButton($(this.dpad$el).find("button.down"), downFn, stopFn, panSpeed);
    this.configureButton($(this.zpad$el).find("button.zoom_in"), zoomInFn, zoomStopFn, zoomSpeed);
    this.configureButton($(this.zpad$el).find("button.zoom_out"), zoomOutFn, zoomStopFn, zoomSpeed);

    $(this.zpad$el).find("button.move_home").click(this.camera.moveToHome.bind(this.camera));
    $(this.zpad$el).find("button.set_home").click(this.camera.setHome.bind(this.camera));
    
    //Attach image source
    $(this.image$el).attr("src", this.config.image);
};

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
          switch(event.which) {
              case 37:
                  self.camera.left(self.getPanSpeed());
                  break;
              case 38:
                  self.camera.up(self.getPanSpeed());
                  break;
              case 39:
                  self.camera.right(self.getPanSpeed());
                  break;
              case 40:
                  self.camera.down(self.getPanSpeed());
                  break;
          }
      }
  );
  
  $(document).keydown(
      function(event) {
          //Prevent defaults
          if (event.which < 37 || event.which > 40) {
              return;
          }
          event.preventDefault();
          
          stopFn();
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
            return new SamsungCamera("Samsung Cam 1","/video","admin","sCalAV13",false);
            break;
        case "PTZOptics":
            return new PTZOpticsCamera("PTZ Cam 1","/video","admin","sCalAV13",false);
            break;
        default:
            var message = "Problem detecting camera type:"+this.config.type;
            GlobalLogger.error(message);
            throw message;
            break;
    }
};

/**
 * Get the speed for camera movement
 * @returns current speed
 */
CameraControl.prototype.getPanSpeed = function() {
    return this.speed;
};

/**
 * Set the speed for camera movement
 * @param speed - speed for camera movement
 */
CameraControl.prototype.setPanSpeed = function(speed) {
    this.speed = speed;
};

/**
 * Get the speed for camera movement
 * @returns current speed
 */
CameraControl.prototype.getZoomSpeed = function() {
    return this.zoomSpeed;
};

/**
 * Set the speed for camera movement
 * @param speed - speed for camera movement
 */
CameraControl.prototype.setZoomSpeed = function(speed) {
    this.zoomSpeed = speed;
};
