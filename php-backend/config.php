<?php
    //Configuration settings
    $CONFIG = array(
            "ROOM-LIST" => "../test/rooms.json",
            "SIGN-URL" => "http://signs.expo.socallinuxexpo.org/signs/index.php?room=",
        );
    //Read in configured list and update configuration.
    try
    {
        $CONFIG["ROOMS"] = getRooms();
    }
    catch (Exception $e)
    {
        echo '{"error":"[ERROR] Failed to read room list:'.$e->getMessage().'."}';
        exit;
    }
    /**
     * Map rooms to their urls.
     */
    $map_stream = function($args) {
        global $CONFIG;
        if (count($args) != 1)
            throw new Exception("Not enough arguments.");
        //Find matching room
        foreach ($CONFIG["ROOMS"] as $room)
        {
            if (strcmp($room["name"],$args[0]) == 0)
                return $room["camera"];
        }
        throw new Exception("Cannot find room.");
    };
    $map_sign = function($args) {
        global $CONFIG;
        if (count($args) != 1)
            throw new Exception("Not enough arguments.");
        //Find matching room
        foreach ($CONFIG["ROOMS"] as $room)
        {
            if (strcmp($room["name"],$args[0]) == 0)
                return $room["name"];
        }
        throw new Exception("Cannot find room.");
     };
     $values_stream = function() {
        $ret = array();
        $val = array();
        foreach(getRooms() as $room) {
            if(strlen($room["camera"]) > 0) {
                $val[] = $room["name"];
            }
        }
        $ret[] = array("label" => "Select Room", "values" => $val);
        return $ret; 
    };
     $values_sign = function() {
        $ret = array();
        $ret[] = array("label" => "Enable Room's Schedule Sign", "hidden" => "true");
        return $ret; 
    };
    // Available commands:  COMMAND => (unix-command,number of args needed,function to map args to cmd-line args)
    $COMMANDS = array(
             "SIGN" => array("chromium-browser --incognito --kiosk ".$CONFIG["SIGN-URL"],1,$map_sign,$values_sign,true,"chromium-browser"),
             "STREAM" => array("cvlc --width=1024 --height=760 ",1,$map_stream,$values_stream,true,"vlc"),
             "SwitchKVM" => array("../kvm-switch/switch",0,null,null,false,"")
        );


    /**
     * Get the room list base on configuration, and
     * return the pairs of <room> and <url>.
     * @returns - rooms list.
     */
    function getRooms() {
        global $CONFIG;
        return json_decode(file_get_contents($CONFIG["ROOM-LIST"]),true);
    }
    /*function getRooms()
    {
        global $CONFIG;
        $ret = array();
        $url = $CONFIG["ROOM-LIST"];
        //Open up the room list
        if (($f = fopen($url,"r")) !== FALSE)
        {
            //Loop over all lines in the file.
            while( ($list = fgetcsv($f,0," ")) !== FALSE)
            {
                if (count($list) != 2)
                    throw new Exception("Malformed List");
                $ret[$list[0]] = $list[1];
            }
            fclose($f);
            return $ret;
        }
        throw new Exception("Could not open file.");
    }*/
?>
