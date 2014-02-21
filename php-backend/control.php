<?php
    require_once('config.php');
    $messages = array();
    #$_POST = $_GET;
    //If no command sent, list available commands.
    if (!isset($_POST["command"]))
    {
        $commands = getCommands();
        echo json_encode($commands);
        exit;
    }
    //Grab commands and if a possible command, error.
    $command = preg_replace("/[^-a-zA-Z]/","",$_POST["command"]);
    if (!isset($COMMANDS[$command]))
    {
        echo '{"error": "[ERROR] Invalid command:'.$command.'."}';
        exit;
    }
    $args = array();
    $runnable = $COMMANDS[$command];
    //Loop through count of arguments reading: arg0 ... argn 
    for($i = 0; $i < $runnable[1]; $i++)
    {
        $index = "arg".strval($i);
        //Check arguments
        if (!isset($_POST[$index]))
        {
            echo '{"error": "[ERROR] Not enough arguments"}';
            exit;
        }
        $args[] = preg_replace("/[^-a-zA-Z]/","",$_POST[$index]);
    }
    try
    {
        $tmp = null;
        if ($runnable[2] != null)
            $tmp = call_user_func($runnable[2],$args);
        $parm = ($tmp != null)?$tmp:"";
        $run = $runnable[0].$parm;
        $kill_grep = $runnable[5];
        //Run, testing for errors.
        $pid = -1;
        if (!$runnable[4])
        {
            $var = 'DISPLAY=:1 HOME=/home/ubuntu/ sudo -u ubuntu '.$runnable[0];
	    $messages[] = "[INFO] Ran: " . $var;
            $messages[] = "[INFO] while running: ".shell_exec($var).".";
        }
        else {
            session_start();
            if (isset($_SESSION["PID"]) && intval($_SESSION["PID"]) > 0) {
		foreach(explode(" ", $_SESSION["PID"]) as $pid) {
                    $messages[] = "[INFO] Killing pid: ".$pid.".";
                    kill($pid, $messages);
		}
                unset($_SESSION["PID"]);
                sleep(1);
            }
            session_write_close();
            $pid = run($run,$kill_grep,$messages);
            if (intval($pid) > 0) {
                session_start();
                $_SESSION["PID"] = $pid;
                session_write_close();
                $messages[] = "[INFO] Ran '".$run."' with pid: $pid";
            }
        }
    }
    catch (Exception $e)
    {
        echo '{"error":"[ERROR] Failed to run program.'.$e->getMessage().'." "messages":'.json_encode($messages).'}';
        exit;
    }
    echo '{"messages":'.json_encode($messages).'}';
    /**
     * KILL a pid
     */
    function kill($pid,&$messages) {
        
        #$var = "sudo -u ubuntu kill -KILL $pid 2>&1";
	
        $kill_cmd1 = "kill -KILL $pid 2>&1";
	$messages[] = "[INFO] Running kill: " . $kill_cmd1;
        $messages[] = "[INFO] While killing: ".shell_exec($kill_cmd1).".";

        $kill_cmd2 = "sudo -u ubuntu kill -KILL $pid 2>&1";
	$messages[] = "[INFO] Running kill: " . $kill_cmd2;
        $messages[] = "[INFO] While killing: ".shell_exec($kill_cmd2).".";
        sleep(1);
    }

    /**
     * Run command in background. Ignore output.
     * @return - pid
     */
    function run($command,$kill_grep,&$messages) 
    {
        $command = trim($command);
        $pid = pcntl_fork();
        if ($pid == -1)
            throw Exception("Failed to fork process.");
        else if ($pid) {
            sleep(2);
            $var = "pgrep -f '$kill_grep' | xargs";
            $messages[] = "[INFO] Grepping processes: " . $var;
            $pid = shell_exec($var);
            return $pid;
        }
        $var = 'DISPLAY=:1 HOME=/home/ubuntu/ sudo -u ubuntu '.$command.' 2>&1 1> /home/ubuntu/logs/log.lo';
        $messages[] = "[INFO] while running: ".shell_exec($var).".";
        return -3;
    }
 
    /**
     * List all commands.
     * @return - map of array to number of args.
     */
    function getCommands()
    {
        global $COMMANDS;
        $ret = array();
        foreach ( $COMMANDS as $key => $val )
            $ret[] = array("name" => $key, "args" => ($val[3] != null)?call_user_func($val[3]):array());
        return $ret;
    }
?>
