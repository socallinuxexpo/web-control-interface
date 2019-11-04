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

/**
 * An AJAX wrapper function. This will set a GET to the given url, unless data is supplied. If data is supplied a PUT is
 * done to the url supplying that data. It returns a promise with the data to this request.
 *
 * ```
 * ajax("http://example.com").then((data) => {console.log(data)});
 * ```
 * @param url: URL to access
 * @param data: (optional) PUT data to send. Default: no data, GET request.
 * @return: promise of data to come
 */
function ajax(url, data) {
    // Default params code
    let method = "GET";
    if (typeof(data) !== "undefined") {
        method = "PUT";
    }
    // Create a promise to return data for the request
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            // State 4 is the end of request, return either way
            if (this.readyState == 4 && this.status == 200) {
                resolve(JSON.parse(this.responseText));
            } else if (this.readyState == 4) {
                reject(this.responseText, this.status);
            }
        };
        // Open and send request
        xhttp.open(method, url, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(data));
    });
}

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
                    // Return data filtered down to max allowed count
                    resolve(data.filter((item, index) => {
                        return index < matconf.maxinputs;
                    }));
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
        return ajax(matconf.endpoint +"/output/" + matconf.output);
    },
    /**
     * Set the ouput to the specified input.
     * @return: promise of action completion
     */
    set: function (input) {
        return ajax(matconf.endpoint +"/output/" + matconf.output, {"input": input});
    }
};
