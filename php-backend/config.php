<?php
    //Configuration settings
    $CONFIG = array(
            "ROOM-LIST" => "https://127.0.0.1/rooms.txt",
            "SIGN-URL" => "https://127.0.0.1/sign.html"
        );
    //Read in configured list and update configuration.
    try
    {
        $CONFIG["ROOMS"] = getRooms();
    }
    catch (Exception $e)
    {
        echo "{error:'[ERROR] Failed to read room list:'.$e->getMessage().'.'}";
        exit;
    }
    /**
     * Map rooms to their urls.
     */
    $map = function($args) {
        if (count($args) != 1)
            throw new Exception("Not enough arguments.");
        return $CONFIG["ROOMS"][$args[0]];
    };
    $values = function() {
        $ret = array();
        foreach(getRooms() as $room)
            $ret[] = $room["name"];
        return $ret; 
    };
    // Available commands:  COMMAND => (unix-command,number of args needed,function to map args to cmd-line args)
    $COMMANDS = array(
             "SIGN" => array("firefox ".$CONFIG["SIGN-URL"],0,null,null),
             "STREAM" => array("cvlc",1,$map,$values),
             "SWITCH" => array("./switch",0,null,null)
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
