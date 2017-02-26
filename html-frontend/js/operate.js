$(document).ready(setup);
$(document).tooltip();
/**
 * Setup the page by reading configuration
 */
function setup() {
    var roomConfig = CONFIG["room"];
    var cameraConfig = CONFIG[roomConfig["cameraType"]];
    var dpad = $("#dpad");
    var zpad = $("#zpad");

    var camcon = new CameraControl(cameraConfig, dpad, zpad);

    //Setup room navigation
    var setcon = new RoomControl(CONFIG, $("#room-navigation"));
    //Misc setup

    dpad.find("button").button();
    zpad.find("button").button();

    ajax(CONFIG["config-url"],load,function() {
        //$("div#controls-content").accordion()
    });

    $("div#messages-content")
      .accordion({active: false, collapsible: true});
}

/**
 * Loads page given configuration
 */
function load(cfg) {
    var cmds = [].concat(cfg["COMMANDS"]).concat(cfg["PINS"]);
    for (var i =0; i < cmds.length; i++) {
        add(cmds[i],"system-controls");
    }
    // var height = 0;
    // $("div.controls-group").each(function() {
    //          height = Math.max(height,$(this).height());
    //     });
    // $("div.controls-group").height(height);
//    $("div#controls-content").accordion();
}
/**
 * Add in a div representing the given control
 * @param spec - an object representing the configuration for this command
 * @param section - id of the div to put this control into
 */
function add(spec,section) {
    var id = getValidId(spec.name);
    var cont = null;
    // Switch based on spec type
    switch (spec.type) {
        case "read":
            cont = readable(spec);
            break;
        case "select":
            cont = button(spec,send);
            break;
        case "button":
            cont = button(spec,send);
            break;
        default:
            GlobalLogger.error("Invalid control format:"+spec.type);
            break;
    }
    var grp = group(spec.group,cont);
    //Add in button to submit command
    $("div#"+section).append(grp);
}
/**
 * Send a command to the control interface.
 */
function send() {
    var data = {};
    var id = $(this).attr("id");
    var params = $(this).data("args");
    var url = $(this).data("url");
    for (var i = 0; i < params.length; i++)
    {
        var name=params[i].name;
        var value = $("#"+id+"-arg-"+name+".arg").val();
        data[name] = value;
    }
    //Call web command with args
    ajax(CONFIG.url+url,complete,failed,"PUT",data,running);
}
/**
 * Functions to perform when a command is running.
 */
function running() {
    disableControls(true);
}
/**
* A command errors out.
*/
function failed(jqxhr,text,err) {
    GlobalLogger.error(err);
    disableControls(false);
}
/**
 * Functions to perform when a command is running.
 */
function complete(data,text,jqxhr) {
    //Errors sent
    if ("error" in data)
        GlobalLogger.error(data.error);
    //Messages printing
    if ("messages" in data)
    {
        for (var i = 0; i < data.messages.length; i++)
            GlobalLogger.message(data.messages[i]);
    }
    disableControls(false);
}
/**
 * Disable/enable controls
 */
function disableControls(disable) {
    if (disable) {
        $(".control").attr("disabled","disabled").addClass("ui-state-disabled");
        $(".ctrlbutton").button("disable");
    } else {
        $(".control").removeAttr("disabled").removeClass("ui-state-disabled");
        $(".ctrlbutton").button("enable");
   }
}
