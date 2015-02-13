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

