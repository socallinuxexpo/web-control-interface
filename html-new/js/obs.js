/**
 * obs.js:
 *
 * Module to handle the OBS functions specifically for this web control interface. This will wrap the following
 * functions of OBS:
 *
 *  - Setup websocket layer
 *  - List available scene names
 *  - Set current scene
 *
 * @author lestarch, pelmini
 */
import {obsauth} from "./auth.js";
import {obsconf} from "./config.js";
import {logger} from "./logger.js";

// Constant obs instance used to control the obs websocket layer, and a non-constant cache to store data to prevent
// repeat calling accross the websocket.
const obs = new OBSWebSocket();
let cache = {
    scenes: []
};

// Module wrapper for functions
export let obswrap = {
    /**
     * Setup the OBS instance, and return a promise for the list of scene names once the data is available. Note: this
     * function must be called before any other OBS functions are called. Otherwise data would not be avalable.
     *
     * ```
     * obswrap.setup.then(data => console.log(data));
     * ```
     * @return: promise of data or error
     */
    setup: function() {
        return new Promise((resolve, reject) => {
            obs.connect({address: obsconf.address, password: obsauth.password})
                .then(() => {
                    logger.log("OBS connected successfully.");
                    return obs.send('GetSceneList');
                })
                .then(data => {
                    logger.log(`OBS has ${data.scenes.length} scenes.`);
                    cache.scenes = data.scenes;
                    resolve(cache.scenes.map((scene) => scene.name));
                })
                .catch((err) => {
                    logger.error(err);
                    reject(err);
                });
        });
    },
    /**
     * Returns a list of scenes. This must be called after the `obswrap.setup` call to return valid data.
     * @return list of scene names
     */
    list: cache.scenes.map.bind(undefined, (scene) => scene.name),
    /**
     * Sets the active scene by name. This will take in a name, and send out the OBS call to set the active scene. This
     * returns a promise that represents the action.
     *
     * ```
     * obswrap.set("Scene XYZ").then(() => console.log("All done"));
     * ```
     * @return: promise of action completion
     */
    set: function (name) {
        return obs.send("SetCurrentScene", {"scene-name": name});
    }
};
