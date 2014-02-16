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
    //Loop through count of arguments reading: arg0 ... argn 
    for($i = 0; $i < $COMMANDS[$command][1]; $i++)
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
    $tmp = null;
    if ($COMMANDS[$command][2] != null)
        $tmp = call_user_func($COMMANDS[$command][2],$args);
    $parm = ($tmp != null)?$tmp:"";
    $run = $COMMANDS[$command][0]." ".$parm;
    //Run, testing for errors.
    $pid = -1;
    try
    {
        session_start();
        if (isset($_SESSION["PID"]) && intval($_SESSION["PID"]) > 0) {
            $messages[] = "[INFO] Killing pid: ".$_SESSION["PID"].".";
            kill($_SESSION["PID"],$messages);
            unset($_SESSION["PID"]);
            sleep(1);
        }
        session_write_close();
        $pid = run($run,$messages);
        if (intval($pid) > 0) {
            session_start();
            $_SESSION["PID"] = $pid;
            session_write_close();
            $messages[] = "[INFO] Ran ".$COMMANDS[$command][0]." with pid: $pid";
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
        
        $var = "sudo -u scaleav kill -KILL $pid 2>&1";
        $messages[] = "[INFO] While killing: ".shell_exec($var).".";
        sleep(1);
    }

    /**
     * Run command in background. Ignore output.
     * @return - pid
     */
    function run($command,&$messages) 
    {
        $command = trim($command);
        $pid = pcntl_fork();
        if ($pid == -1)
            throw Exception("Failed to fork process.");
        else if ($pid) {
            sleep(1);
            $var = "ps -fu scaleav | grep '$command' | grep -v grep | awk '{print $2}'";
            $pid = shell_exec($var);
            return $pid;
        }
        $var = 'DISPLAY=:0 HOME=/home/scaleav/ sudo -u scaleav '.$command.' 2>&1 1> /home/scaleav/logs/log.lo';
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
