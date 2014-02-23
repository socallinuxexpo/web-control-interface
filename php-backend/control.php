<?php
    require_once('config.php');
    #$_POST = $_GET;
    //If no command sent, list available commands, and exit.
    if (!isset($_POST["command"]))
    {
        echo json_encode($CONFIG["COMMANDS"]);
        exit;
    }
    // Set up the global logger.
    global $LOGGER;
    $LOGGER = KLogger::instance($CONFIG["LOGDIR"]);

    //Grab commands and if a possible command, error.
    $command = preg_replace("/[^-a-zA-Z ]/","",$_POST["command"]);
    if (!isset($CONFIG["COMMAND"][$command]))
    {
        exitError("Invalid command: '$command'.");
    }
  
    $args = array();
    $runnable = $CONFIG["COMMANDS"][$command];
    //Loop through count of arguments reading: arg0 ... argn 
    for($i = 0; $i < count($runnable["types"]); $i++)
    {
        $index = "arg".strval($i);
        //Check arguments
        if (!isset($_POST[$index]))
        {
            exitError("Argument '$i' undefined for '$command'.");
        }
        $args[] = preg_replace("/[;><!]/","",$_POST[$index]);
    }
    //Build command to run
    $params = implode(" ",$args);
    $run = $runnable["command"]." ".$parms;
    try
    {
        $pid = run($run);
    }catch ($exception)
    {
        exitError("Exception while running. ".$exception->getMessage());
    }
    
    /**
     * Exit on error.  Print messagae.
     * $message - Message to append before exiting.
     */
    function exitError($message)
    {
        global $LOGGER;
        $LOGGER->logFatal($message);
        exitMessage();
    }

    /**
     * Print messages in JSON format and exit.
     */
    function exitMessage()
    {
        global $LOGGER;
        echo json_encode($LOGGER->getMessages() as $line);
        exit;
    }

    /**
     * Run command in background. Ignore output.
     * @return - pid
     */
    function run($command,$kill_grep,&$messages) 
    {
        global $CONFIG; 
        $command = trim($command);
        $pid = pcntl_fork();
        if ($pid == -1)
        {
            throw Exception("Failed to fork process.");
        }
        $display = $CONFIG["DISPLAY"];
        $home = $CONFIG["HOME"];
        $user = $CONFIG["USER"]; 
        $var = "DISPLAY=$display HOME=$home sudo -u $user $command 2>&1 1>> ../logs/backend-php.log";
        return -3;
    }
?>
