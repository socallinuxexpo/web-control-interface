$(document).ready(setup);

/**
 * Launch initial requests to build webpage.
 */
function setup() {
	//Get requested room, and fail if not valid
	var name = decodeURIComponent(window.location.search).replace("?","");
	if (!isValidRoomName(name))
	{
		onError(null,"Invalid Room Name","Room name requested is invalid.");
		return;
	}
	//Valid, so request commands available
	var header = $("h2");
	header.text(header.text()+" "+name);
	$.ajax({
		url: Config.URL,
		success: init,
		error: onError,
		type:"GET",
		dataType: "json",
	});
}

/**
 * Init this webpage
 * @param data - data from "blank" request.  Contains command list, or error.
 * @param text - "SUCCESS"
 * @param jqxhr - jqxhr request used.
 */
function init(data,text,jqxhr)
{
	//Error returned from a functioning server
	if ("error" in data)
		onError(jqxhr,"Server Error",data.error);
	//Add in all commands
	for (var i = 0; i < data.length; i++) {
		var command = data[i];
		addCommand(command);
	}
	$('input:text, input:password').addClass("ui-widget-content");
    $("div#content").accordion();
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
/**
 * A command errors out.
 */
function commandError(jqxhr,text,error) {
    onError(jqxhr,text,error);
    $(".control").removeAttr("disabled").removeClass("ui-state-disabled");
    $(".ctrlbutton").button("enable");
}
/**
 * Functions to perform when a command completes.
 */
function commandComplete(data,text,jqxhr) {
        //Errors sent
        if ("error" in data)
            onError(jqxhr,"Error running",data.error);
        //Messages printing
        if ("messages" in data)
        {
            for (var i = 0; i < data.messages.length; i++)
                $("#messages").prepend(data.messages[i]+"<br />");
        }
	$(".control").removeAttr("disabled").removeClass("ui-state-disabled");
	$(".ctrlbutton").button("enable");
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
		if (!("values" in arg) || arg.values.length == 0)
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
