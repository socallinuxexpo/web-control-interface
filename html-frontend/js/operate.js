$(document).ready(setup);

/**
 * Setup the page by reading configuration
 */
function setup() {
    //Setup the directional pad
    $("#dpad button").button();
    $("#dpad").dialog({resizable: false});
    $(".ui-dialog-titlebar-close").css("display", "none")
    //Setup room navigation
    var set = $("#room-navigation").buttonset();
    for (var room in CONFIG["rooms"])
    {
        //Build a button with a nice label
        var button = $("<input id='nav-radio-"+room+"' type='radio' name='room-nav' value='"+room+"' /><label for='nav-radio-"+room+"'>"+room+"</label>");
        //Note: Javascript variables are function scoped always, so the variable is overwritten
        //      with each loop. Thus we need an extra function call to prevent our variables from
        //      being clobbered within the closure.
        var closure = function(url) {
            return function() {
                window.location.href=url;
            };}(CONFIG["rooms"][room]);
        button.click(closure);
        set.append(button);
        if (CONFIG["rooms"][room].indexOf(window.location.hostname) != -1)
        {
            button.attr("checked","true");
        }
    }
    $("#room-navigation").buttonset("refresh");
    ajax(CONFIG["url"]+"/config",load)


}
/**
 * Returns a function that will read a pin and update
 * a given div.
 * @param span - span id to update
 * @param pin - pin to read
 * @return function to call and read pin
 **/
function getReadFunction(ra, rb,pin,fun) {
    var ret = function() {
        var url = CONFIG["pins-url"]+"/"+pin;
        ajax(url,
            function(resp) {
                ra.prop("checked", resp.value);
                rb.prop("checked", !resp.value);
            },
            function() {
                ra.prop("checked", false);
                rb.prop("checked", false);
                error("Failed read pin at: "+url);
            });
    };
    return ret;
}
/**
 * Loads page given configuration
 */
function load(cfg) {
    var cmds = [].concat(cfg["COMMANDS"]).concat(cfg["PINS"]);
    for (var i =0; i < cmds.length; i++) {
        add(cmds[i],"system-controls"); 
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
    var id = getValidId(spec.name);
    var html = null;
    // Div to put our command
    var div = $("<div></div>");
    // Add any argument controls
    if ("args" in spec)
        addArguments(div,spec.args);
    // Switch based on spec type
    switch (spec.type) {
        case "read":
            div = readable(spec);
            /*$("<div></div>").attr("id",id);
            container = $("<div id='"+spec.name+"'></div>");
            var ra = $("<input type='radio' name='"+spec.name+"' id='"+spec.name+"-a'>");
            var rb = $("<input type='radio' name='"+spec.name+"' id='"+spec.name+"-b'>");
            var la = $("<label for='"+spec.name+"-a'>Side A</label>");
            var lb = $("<label for='"+spec.name+"-b'>Side B</label>");
            var ll = $("<label>"+spec.name+":</label>");
            html.append(ll).append("<br/>").append(ra).append(la).append(rb).append(lb);
            var fun = getReadFunction(ra,rb,spec.url); 
            ra.on("click",fun);
            rb.on("click",fun);
            setInterval(fun,500);*/
            break;
        case "select":
        case "button":
        default:
            break;    
    }
    var res = $("div#" + spec.group);
    if (res.length == 0)
    {
       res = $("<div id='" + spec.group + "'></div>");
       res.addClass("control-element").addClass("ui-corner-all").addClass("ui-widget-content");
    }
    div.append(html);
    res.append(div);
    //Add in button to submit command
    $("div#"+section).append(res);
}
/**
 * Returns possible values for an argument based upon its name.
 * @param name - name of argument
 * @return - possible values for argument
 */
function options(name) {
    switch(name) {
        case "room-url":
            return [decodeURIComponent(window.location.search)];
        case "camera-url":
            return ["camera1","camera2","camera3"];
        default:
            return [name];
    }
}
/**
 * Add argument specification
 */
function addArguments(div,args) {
    for (var i = 0; i < args.length; i++)
    {
        var arg = args[i];
        var values = options(arg.name);
        
        var item = null;
        if ("hidden" in arg) {
            item = $("<input type='hidden' class='arg' name='"+arg.name+"'></input>");
            item.val(values[0]);
        }
        else {
            item = $("<select class='arg' name='"+arg.name+"'></select>");
            item.addClass("ui-widget-content").addClass("rounded-fix-padding");
            for (var j = 0; j < values.length; j++)
            {
                var opt = $("<option></option>");
                opt.val(values[j]);
                opt.text(values[j]);
                item.append(opt);
            }
        }
        //Add label, and arg selection
        if ("label" in arg)
        {
        	var label = $("<label>"+arg.label+":</label>");
        	div.append(label);
        }
        div.append(item.addClass("ui-corner-all"));
    }
}
/**
 * Send a command to the control interface.
 */
function send(url) {
    //TODO: Make data object
    var data = {};
    //Call web command with args
    ajax(Config.URL +"/"+url,complete,failed,"PUT",data,running);
}
/**
 * Functions to perform when a command is running.
 */
function running() {
    disableContols(true);
}
/**
* A command errors out.
*/
function failed(jqxhr,text,error) {
    error(error);
    disableContols(false);
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
    disableContols(false);
}
/**
 * Disable/enable controls
 */
function disableControl(disable) {
    if (disable) {
        $(".control").attr("disabled","disabled").addClass("ui-state-disabled");
        $(".ctrlbutton").button("disable");
    } else {
        $(".control").removeAttr("disabled").removeClass("ui-state-disabled");
        $(".ctrlbutton").button("enable");
   }
}
