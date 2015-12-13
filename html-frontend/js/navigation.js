/**
 * This module holds all of the generic camera code
 * @author starchmd
 */

/**
 * A class handling room navigation control
 * @param config - configuration to control the setup
 * @param buttonset - set to add navigation buttons to
 */
var RoomControl = function(config,buttonset) {
    this.config = config;
    this.buttonset$el = buttonset;
    //Setup the visual elements
    this.setup();
};
/**
 * Setup the visual and control elements
 */
RoomControl.prototype.setup = function() {
    var self = this;
    this.buttonset$el.buttonset();
    for (var i =0; i < this.config.rooms.length; i++)
    {
        var room = this.config.rooms[i];
        //Build a button with a nice label
        var button = $("<input/>").attr("id","nav-radio-"+room.name).attr("type","radio").attr("name","room-nav").attr("value",room.name);
        var label = $("<label></label>").attr("for","nav-radio-"+room.name).text(room.name);
        //Note: Javascript variables are function scoped always, so the variable is overwritten
        //      with each loop. Thus we need an extra function call to prevent our variables from
        //      being clobbered within the closure.
        var closure = function(url) {
            return function() {
                window.location.href=url;
            };}(room.url);
        button.click(closure);
        this.buttonset$el.append(button);
        this.buttonset$el.append(label);
        if (room.url.toLowerCase().indexOf(window.location.hostname.toLowerCase()) != -1)
        {
            button.addClass("ui-state-error");
            label.addClass("ui-state-error");
        }
    }
    this.buttonset$el.buttonset("refresh");
};