<?php
    require_once('config.php');
    require_once('KLogger.php');
    //Uncomment to allow for debugging with url query strings.
    $_POST = $_GET;


    main();
    exit;
 
    /**
     * Main function.
     */
	function main()
	{
		global $CONFIG;
		global $LOGGER;
		//If no command sent, list available commands, and exit.
		if (!isset($_POST["command"]))
		{
			echo json_encode($CONFIG["COMMANDS"]);
			exit;
		}
		// Set up the global logger.
		$LOGGER = KLogger::instance($CONFIG["LOGDIR"]);

		//Grab commands and if a possible command, error.
		$command = preg_replace("/[^-a-zA-Z ]/","",$_POST["command"]);
		if (!isset($CONFIG["COMMANDS"][$command]))
		{
			exitError("Invalid command: '$command'.");
		}
	  
		$args = array();
		$runnable = $CONFIG["COMMANDS"][$command];
		//Loop through count of arguments reading: arg0 ... argn 
		if (isset($runnable["types"]))
		{
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
		}
		//Build command to run
		$parms = implode(" ",$args);
		$run = $runnable["command"]." ".$parms;
		try
		{
			$pid = run($run);
		}catch (Exception $exception)
		{
			exitError("Exception while running. ".$exception->getMessage());
		}
		exitMessage();   
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
        echo json_encode($LOGGER->getMessages());
        exit;
    }

    /**
     * Run command in background. Ignore output.
     * @return - pid
     */
    function run($command) 
    {
        global $CONFIG; 
        global $LOGGER;
        $command = trim($command);
		$LOGGER->logInfo("Running: $command");
        $pid = pcntl_fork();
        if ($pid == -1)
        {
            throw Exception("Failed to fork process.");
        }
        else if($pid)
        {
            return;
        }
        $display = $CONFIG["DISPLAY"];
        $home = $CONFIG["HOME"];
        $user = $CONFIG["USER"]; 
        $var = "DISPLAY=$display HOME=$home sudo -u $user $command 2>&1 1>> ../logs/backend-php.log";
        shell_exec($var);
        return -3;
    }
?>
