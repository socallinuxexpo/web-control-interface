/**
 * Get room configuration
 * @returns - a list of room objects of form {name:"Room Name",webhost:<slide comp url>,camera:<camera url>}
 */
function getRooms()
{
	var rooms = [];
	$.ajax({
		dataType: "json",
		url: Config.ROOM_URL,
		async:false,
		success: function(data) 
				 { 
					 for (var i = 0; i < data.length; i++)
						 rooms.push(data[i]); 
				 },
		error: onError,
		});
	return rooms;
}
/**
 * Check if a given name is a valid room name.
 * @param room - name of room
 * @returns {Boolean} - is it valid (in the list) or not
 */
function isValidRoomName(room)
{
	var rooms = getRooms();
	for (var i = 0; i < rooms.length;i++)
	{
		if (rooms[i].name == room)
			return true;
	}
	return false;
}

/**
 * Display an error.
 * @param jqxhr - jqxhr request.
 * @param text - title of error.
 * @param error - error message.
 */
function onError(jqxhr,text,error)
{
	$("div#error").append("[ERROR]<em>"+text+"</em>:"+error);
}
