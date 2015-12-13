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
    var self = this;
    var stopfn = self.camera.stop.bind(self.camera);
    $(this.dpad$el).find("button").button();
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
                //Stop camera after given increment of time
                setTimeout(stopfn,self.config.pan_delay);
            }        
        );
    //Click bindings for buttons
    $(this.dpad$el).find("button.left").click(function() {
        self.camera.left(self.getPanSpeed());
        setTimeout(stopfn,self.config.pan_delay);
    });
    $(this.dpad$el).find("button.right").click(function() {
        self.camera.right(self.getPanSpeed());
        setTimeout(stopfn,self.config.pan_delay);
    });
    $(this.dpad$el).find("button.up").click(function() {
        self.camera.up(self.getPanSpeed());
        setTimeout(stopfn,self.config.tilt_delay);
    });
    $(this.dpad$el).find("button.down").click(function() {
        self.camera.down(self.getPanSpeed());
        setTimeout(stopfn,self.config.tilt_delay);
    });
    $(this.zpad$el).find("button.zoom_in").click(function() {
        self.camera.zoomIn(self.getPanSpeed());
        setTimeout(stopfn,self.config.zoom_delay);
    });
    $(this.zpad$el).find("button.zoom_out").click(function() {
        self.camera.zoomOut(self.getPanSpeed());
        setTimeout(stopfn,self.config.zoom_delay);
    });
    $(this.zpad$el).find("button.move_home").click(function() {
        self.camera.moveToHome();
    });
    $(this.zpad$el).find("button.set_home").click(function() {
        self.camera.setHome();
    });
    //Attach image source
    $(this.image$el).attr("src",this.config.image);
};
/**
 * Constructs a new camera
 * @returns {SamsungCamera} or {PTZOptics}
 */
CameraControl.prototype.makeCamera = function() {
    switch (this.config.type)
    {
        case "SamsungCamera":
            return new SamsungCamera("Samsung Cam 1","localhost/video","admin","sCalAV13",false);
            break;
        //case "PTZOptics":
        //    return new PTZOpticsCamera("PTZ Cam 1","localhost/video","admin","sCalAV13",false);
        //    break;
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
