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
export const rooms = ["room-101","room-103","room-104","room-105","room-106","room-107","room-209","room-211","room-212","ballroom-a","ballroom-b","ballroom-c","ballroom-de","ballroom-f","ballroom-g","ballroom-h"]; 

/**
 * Camera configuration for used with the webinterface
 */
export const camera = {
    "name": "Samsung Cam",
    "username": "admin",
    "password": "sCalAV13",
    "pan-delay": 2,  // Appropriate delays in counts of "steptime"
    "tilt-delay": 2,
    "zoom-delay": 5,
    "type": "SamsungCamera",
    "control": "/video",
    "pan-scale": 1.0,
    "tilt-scale": 1.0,
    "zoom-scale": 1.0,
    "pan-speed": 5,
    "tilt-speed": 5,
    "zoom-speed": 5,
    "steptime": 50 // 50ms count
};


