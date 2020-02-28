/**
 * matrix.js:
 *
 * Module to handle the matrix switching functions. This allows the web-control-interface to control the hdmi matrix
 * switch. This supports the following functions:
 *
 *  - List available settings
 *  - Set matrix output
 *
 * @author lestarch, pelmini
 */
import {matconf} from "./config.js";
import {logger} from "./logger.js";
import {ajax} from "./auth.js";


// Module wrapper for functions
export let matwrap = {
    /**
     * Lists the number of inputs available to the matrix, This returns a promise on future data, a list of inputs.
     */
    list: () => {
        return new Promise((resolve, reject) => {
            ajax(matconf.endpoint + "/inputs")
                // Handle results of the call
                .then((data) => {
                    // Return list of inputs determined from max inputs, and actual inputs
                    let inhuman_indicies = Array.from(Array(Math.min(data, matconf.maxinputs)).keys());
		    let human_indicies = inhuman_indicies.map(x => x + 1);
		    resolve(human_indicies);
                })
                .catch((err) => {
                    logger.error(err);
                    reject(err);
                });
        });
    },
    /**
     * Get the output's specified input.
     * @return: promise input number
     */
    get: function () {
        return new Promise((resolve, reject) => 
	    ajax(matconf.endpoint +"/output/" + matconf.output).then(data =>
                {
                    resolve(data + 1);
                }).catch(e => reject(e)));
    },
    /**
     * Set the ouput to the specified input.
     * @return: promise of action completion
     */
    set: function (input) {
        return ajax(matconf.endpoint +"/output/" + matconf.output, {"input": input - 1});
    }
};
