/**
 * Display error message in the error div
 */
function error(msg) {
    $("div#error").append("[ERROR] "+msg+"<br/>");
}
/**
 * Display a message
 */
function message(msg) {
    $("div#message").append("[LOG] "+msg+"<br />");
}
/**
 * Returns the ID input in a clearner form.
 * @param id - potentially invalid id
 * @returns cleand up form of id
 */
function getValidId(id) {
    return id.replace(" ","_");
}


function ajax(loc,suc,err,tpe,run) {
    //Defaults
    if (err === undefined)
        err = function(){};
    if (tpe === undefined)
        tpe = "GET";
    if (run === undefined)
        run = function(){};
    //Load configuration and setup page
    $.ajax(
        {
            url: loc,
            success: function(resp) {
                    if ("error" in resp)
                        error(resp["error"]);
                    else 
                        suc(resp);
                },
            error: function(resp) {
                    error("Error loading: "+loc);
                    err(resp)
                },
            beforeSend: run,
            type: tpe,
            dataType: "json"
        }); 

}



