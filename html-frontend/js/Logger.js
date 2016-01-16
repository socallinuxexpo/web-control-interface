/**
 * Logging module
 * @author starchmd
 */

/**
 * Logger class, used to log errors, and messages to input element.
 * @param messageElement - a JQuery element used to print messages
 * @param errorElement - a JQuery element used to hold errors
 */
var Logger = function(messageElement,errorElement) {
    this.messageElement = messageElement;
    this.errorElement = errorElement;
};

/**
 * Log an info message to the message element
 * @param message - message string to log
 */
Logger.prototype.info = function(message) {
    this.messageElement.append("<em>[INFO]</em> "+message);
};

/**
 * Log an error message to the error element
 * @param message - message to log
 */
Logger.prototype.error = function(message) {
    this.errorElement.append("<em>[ERROR]</em> "+message);
};

/**
 * Error helper for ajax
 * @param subsystem - (optional, usually pre-bound) subsystem to print from
 * @param xhr - xhr (probably unused)
 * @param text - error text
 * @param error - exception thrown
 */
Logger.prototype.ajaxError = function(subsystem, xhr, text, error) {
    var message = error.toString()+"<br/>";
    if (text != null) {
        message = "("+text+") " + message;
    }
    if (typeof(subsystem) !== "undefined") {
        message = "["+subsystem+"] "+ message;
    }
    this.error(message);
};

//Global logger
var GlobalLogger = new Logger($("message"),$("error"));