/**
 * app.js:
 *
 * Application entry point. This should be treated as a module. This will setup the JavaScript for use with the web
 * control interface. In addition it will render the Vue JS components, and start-up services like OBS and matrix.
 *
 * @author lestarch, pelmini
 */
import {logger} from "./logger.js";
import {matwrap} from "./matrix.js";
import {obswrap} from "./obs.js";
import {rooms} from "./config.js";
import "./vuewrap.js" // Must import to get registrations

function onload() {
    logger.log("Starting up LCARS-II. All your base are belong to...");
    // Global data cache for Vue.js
    let data = {
        obs: {
            name: "Select Scene",
            scenes: [],
            selected: "Unknown",
            set: obswrap.set
        },
        matrix: {
            name: "HDMI Input",
            inputs: [],
            selected: "Unkmown",
            set: matwrap.set
        },
        rooms:{
            name: "Room Selection",
            list: rooms,
            selected: location.hostname.split(".")[0],
            go: (data) => {alert(data);}
        }
    };
    // Vue application
    let app = new Vue({
        // Element to render to
        el: "#app",
        data: data
    });

    // Setup obs, and matrix
    obswrap.setup().then((scenes) => {data.obs.scenes = scenes});
    matwrap.list().then((inputs) => {
        data.matrix.inputs = inputs;
        matwrap.get().then((selected) => {data.matrix.selected = selected;});
    });
}
// Setup the on-load function
document.addEventListener("DOMContentLoaded", onload);