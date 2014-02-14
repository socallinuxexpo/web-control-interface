$(document).ready(setup);

function setup() {
	var hosts = $("#hosts");
	var rooms = getRooms(); //Blocking
	for (var i = 0; i < rooms.length;i++)
	{
		//Make a closure for the room to goto if the new button is clicked
		//Note: Javascript closures are functional based, not scope based so 
		//      we must add in an extra function call to preserve the loop-changing var url.
		var closure = function(url,name) {
			              return function() {
		                      //Load new webpage here
                              window.location = url+"?"+name;
			                     };
                      }(rooms[i].webhost,rooms[i].name);
		//Build a button and append
		var button = $("<button></button>");
		button.text(rooms[i].name);
		button.click(closure);
		hosts.append(button.button());
	}
	hosts.buttonset();
	$("#help").accordion();
}