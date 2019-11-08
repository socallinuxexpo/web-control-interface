/**
 * config.js:
 *
 * Module used to export various configuration objects to the rest of the system. This file will be imported in pieces
 * in various parts of the system in order to support static constant configuration.
 *
 * @author lestarch, pelmini
 */

/**
 * OBS configuration providing for the obs address key. This is derived from the current hostname, and a port
 */
export const obsconf = {
    address: location.hostname + ":4444" // OBS webserver address
};
/**
 * Matrix switch configuration. Sets the primary output, and how many inputs are allowed.
 */
export const matconf = {
    output: 1, // Output configuration
    maxinputs: 2, // Limit to the maximum number of inputs displayed
    endpoint: "/matrix"
};
/**
 * A list of room-names. These will be fed to the links for moving to different rooms.
 */
export const rooms = ["localhost", "room1", "room2", "room3"];