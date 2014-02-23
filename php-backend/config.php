<?php
	/**
	 $COMMANDS:  A map that maps names of commands to a map with properties "command" and "types".
				 "command" is the path to the shell command to run.
				 "types" is a list of types, one for each needed argument.
					   valid types are: "ROOM=URL" representing a url.
	 */
	$CONFIG = array(
		// Log file - 
		"LOGDIR" =>  "../logs/", 
		"USER" =>    "ubuntu",
		"DISPLAY" => ":1",
		// Commands available - 
		$COMMANDS = array(
			"Restart Signs" => 
				array("command" => "../bin/start-signs"),
			"Stream Overflow" => 
				array("command" => "../bin/start-stream", "types" => array("ROOM-URL")),
			"Switch KVM Switch" => 
				array("command "=> "../kvm-switch/switch")
		)
	);
	$CONFIG["HOME"] = "/home/".$CONFIG["USER"];
?>
