$(document).ready(setup);

/**
 * Setup the page by reading configuration
 */
function setup() {
    //Setup the directional pad
    $("#dpad button").button();
    $("#dpad").dialog({resizable: false});
    $(".ui-dialog-titlebar-close").css("display", "none")
    //Setup the image.  If we DO NOT use proxy, set camera proxy below to IP of camera
    $("#video").attr("src",CONFIG["camera-proxy"]+CONFIG["camera-image"]);
    vidsetup();
    //Setup room navigation
    var set = $("#room-navigation").buttonset();
    for (var i =0; i < CONFIG["rooms"].length; i++)
    {
        var room = CONFIG["rooms"][i];
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
        set.append(button);
        set.append(label);
        if (room.url.indexOf(window.location.hostname) != -1)
        {
            button.attr("checked","true");
        }
    }
    $("#room-navigation").buttonset("refresh");
    ajax(CONFIG["config-url"],load,function() {
        //$("div#controls-content").accordion()
    });
    $('input:text, input:password').addClass("ui-widget-content");
    $("div#messages-content").accordion();
}
/**
 * Loads page given configuration
 */
function load(cfg) {
    var cmds = [].concat(cfg["COMMANDS"]).concat(cfg["PINS"]);
    for (var i =0; i < cmds.length; i++) {
        add(cmds[i],"system-controls"); 
    }
    var height = 0;
    $("div.controls-group").each(function() {
             height = Math.max(height,$(this).height());
        });
    $("div.controls-group").height(height);
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
            error("Invalid control format:"+spec.type);
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
    error(err);
    disableControls(false);
}
/**
 * Functions to perform when a command is running.
 */
function complete(data,text,jqxhr) {
    //Errors sent
    if ("error" in data)
        error(data.error);
    //Messages printing
    if ("messages" in data)
    {
        for (var i = 0; i < data.messages.length; i++)
            message(data.messages[i]);
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
