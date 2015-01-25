$(document).ready(setup);

/**
 * Setup the page by reading configuration
 */
function setup() {
    $.ajax(
        {
            url: CONFIG["config-url"],
            success: load,
            error: function() {
                       error("Failed to load configuration from: "+url);
                   },
            dataType: "json"
        }); 
}
/**
 * Display error message
 */
function error(msg) {
    $("div#error").append("[ERROR] "+msg);
}
/**
 * Loads page given configuration
 */
function load(cfg) {
    for (var command in cfg["COMMANDS"]) {
        var tmp = cfg["COMMANDS"][command];
        tmp.name = command;
        add(tmp); 
    }
    for (pin in cfg["PINS"])
        console.log(pin);
    $('input:text, input:password').addClass("ui-widget-content");
    $("div#content").accordion();
}

function add(command) {
    //Add in button to submit command
    var div = $("<div></div>");
    div.attr("id",command.name.replace(" ","_"));
    var button = $("<button></button>");
    button.attr("id",command.name.replace(" ","_"));
    button.addClass("control");
    button.addClass("ctrlbutton");
    button.val(command.name);
    button.text(command.name);
    button.click(sendCommand);
    var tmp = $("div#system-controls");
    div.append(button.button());
    //Add in new control div
    tmp.append(div); 
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
			room_name = decodeURIComponent(window.location.search).replace("?","");
			item.val(room_name);
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
