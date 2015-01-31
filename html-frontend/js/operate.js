$(document).ready(setup);

/**
 * Setup the page by reading configuration
 */
function setup() {
    $("#dpad button").button();
    $("#dpad").dialog({resizable: false});
    $(".ui-dialog-titlebar-close").css("display", "none")
    $.ajax(
        {
            url: CONFIG["config-url"],
            success: load,
            error: function() {
                       error("Failed to load configuration from: "+CONFIG["config-url"]);
                   },
            dataType: "json"
        }); 
}
/**
 * Returns a function that will read a pin and update
 * a given div.
 * @param span - span id to update
 * @param pin - pin to read
 * @return function to call and read pin
 **/
function getReadFunction(span,pin,fun) {
    var ret = function() {
        var url = CONFIG["pins-url"]+"/"+pin;
        $.ajax(
            {
                url: url,
                success: function(resp) {
                        $("#"+span).text(resp.value?"On":"Off");
                        $("#"+span).css("background-color",(resp.value?"green":"red"));
                    },
                error: function() {
                    error("Failed read pin at: "+url);
                },
	        dataType: "json"
            });
        window.requestAnimationFrame(ret);
    }
    return ret;
}
/**
 * Display error message in the error div
 */
function error(msg) {
    $("div#error").append("[ERROR] "+msg+"<br/>");
}
/**
 * Loads page given configuration
 */
function load(cfg) {
    for (var command in cfg["COMMANDS"]) {
        var tmp = cfg["COMMANDS"][command];
        tmp.name = command;
        add(tmp,"system-controls"); 
    }
    for (var pin in cfg["PINS"]) {
        var tmp = cfg["PINS"][pin];
        tmp.name = pin;
        add(tmp,"io-pins");
    }
    $('input:text, input:password').addClass("ui-widget-content");
    $("div#content").accordion();
}
/**
 * Add in a div representing the given control
 * @param spec - an object representing the configuration for this command
 * @param section - id of the div to put this control into
 */
function add(spec,section) {
    var id = spec.name.replace(" ","_");
    var html = null;
    // Div to put our command
    var div = $("<div></div>");
    div.attr("id",id);
    // Add any argument controls
    if ("args" in spec)
        addArguments(div,spec.args);
    // Switch based on spec type
    switch (spec.type) {
        case "read":
            html = $("<label>"+spec.name+":</label>");
            var span = $("<span></span>").addClass("ui-corner-all");
            span.attr("id",id+"-span");
            html.append(span);
            window.requestAnimationFrame(getReadFunction(id+"-span",spec.url));
            break;
        case "select":
        case "button":
        default:
            html = $("<button></button>").button();
            html.addClass("ctrlbutton").addClass("control");
            html.click(sendCommand);
            html.attr("id",id);
            html.val(spec.name);
            html.text(spec.name);
            break;    
    }
    div.append(html);
    //Add in button to submit command
    $("div#"+section).append(div);
}
/**
 */
function expand(name) {
    switch(name) {
        case "room-url":
            return [decodeURIComponent(window.location.search).replace("?","")];
        case "camera-url":
            return ["camera1","camera2","camera3"];
        default:
            return [name];
    }
}

function addArguments(div,args) {
    for (var i = 0; i < args.length; i++)
    {
        var arg = args[i];
        var values = expand(arg.name);
        
        var item = null;
        if ("hidden" in arg) {
            item = $("<input type=\"hidden\"></input>");
            item.val(values[0]);
         }
        else
        {
            item = $("<select></select>");
            item.addClass("ui-widget-content").addClass("rounded-fix-padding");
            for (var j = 0; j < values.length; j++)
            {
                var opt = $("<option></option>");
                opt.val(values[j]);
                opt.text(values[j]);
                item.append(opt);
            }
        }
        item.attr("id","arg"+i.toString());
        item.addClass("arg").addClass("control");
        //Add label, and arg selection
        if ("label" in arg)
        {
        	var label = $("<label></label>");
        	label.text(arg.label+":");
        	div.append(label);
        }
        div.append(item.addClass("ui-corner-all"));
    }
}

/**
 * Add a command div.
 * @param command - command of form: {name:"Name",args:[{label:"Label", values:[<list of possible values or empty for any>}]}
 */
function addCommand(command)
{
    var div = $("<div></div>");
    div.attr("id",command.name.replace(" ","_"));
    var count = 0;
    for (var i = 0; "args" in command && i< command.args.length; i++)
    {
        var arg = command.args[i];
        //Add in text field if no "possible values" otherwise a drop-down
        var item = null;
        if ("hidden" in arg) {
            item = $("<input type=\"hidden\"></input>");
            item.attr("id","arg"+count.toString());
            item.addClass("arg").addClass("control");
            item.val(room_namei);
        }
        else if (!("values" in arg) || arg.values.length == 0)
        {
            item = $("<input type=\"text\"></input>");
            item.attr("id","arg"+count.toString());
            item.addClass("arg");
            item.addClass("control").addClass("rounded-fix-padding");
        }
        else
        {
            item = $("<select></select>");
            item.attr("id","arg"+count.toString());
            item.addClass("arg");
            item.addClass("control").addClass("ui-widget-content").addClass("rounded-fix-padding");
            for (var j = 0; j < arg.values.length; j++)
            {
                var opt = $("<option></option>");
                opt.val(arg.values[j]);
                opt.text(arg.values[j]);
                item.append(opt);
            }
        }
        //Add label, and arg selection
        var label = $("<label></label>");
        label.text(arg.label+":");
        div.append(label);
        div.append(item.addClass("ui-corner-all"));

        count++;
    }
    //Add in button to submit command
    var button = $("<button></button>");
    button.attr("id",command.name.replace(" ","_"));
    button.addClass("control");
    button.addClass("ctrlbutton");
    button.val(command.name);
    button.text(command.name);
    button.click(sendCommand);
    div.append(button.button());
    //Add in new control div
    var tmp = $("div#system-controls");
    tmp.append(div);
}
/**
 * Send a command to the control interface.
 */
function sendCommand() {
    var data = {"command":this.value};
    //Get values for every arg
    var bad = false;
    var args = $(".arg", $("#"+this.id));
    args.each(
        function()
        {
            var val = $(this).val();
            if (val == "")
            {
                $(this).addClass("ui-state-error");
                bad = true;
                return;
            }
            $(this).removeClass("ui-state-error");
            data[$(this).attr("id")]= val;
        }
    );
    //Invalid data
    if (bad)
        return;
    
    //Call web command with args
    $.ajax({
        url: Config.URL,
        data:data,
        beforeSend: commandRunning,
        success: commandComplete,
        error: commandError,
        type: "POST",
        dataType: "json",
    });    
}
/**
 * Functions to perform when a command is running.
 */
function commandRunning() {
    //Disable commands
    $(".control").attr("disabled","disabled").addClass("ui-state-disabled");
    $(".ctrlbutton").button("disable");
}
