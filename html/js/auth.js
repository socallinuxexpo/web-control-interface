

export let obsauth = {
    password: 'starchmd1' // TODO: replace with real passwording
};
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
export function ajax(url, data, json, username, password, timeout) {
    // Default params code
    let method = "GET";
    if (typeof(data) !== "undefined") {
        method = "PUT";
    }
    // Create a promise to return data for the request
    return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        let timeid = setTimeout(() => xhttp.abort(), (typeof(timeout) !== "undefined") ? timeout : 60000);
        xhttp.onreadystatechange = function () {
            // State 4 is the end of request, return either way
            if (this.readyState == 4) {
                clearInterval(timeid);
                if (this.status == 200 && (typeof (json) === "undefined" || json)) {
                    resolve(JSON.parse(this.responseText));
                } else if (this.status == 200) {
                    resolve(this.responseText);
                } else {
                    reject(this.responseText, this.status);
                }
            }
        };
        // Open and send request, without caching
        xhttp.open(method, url + "?_=" + new Date().getTime(), true);
        if(typeof (username) !== "undefined" && typeof (password) !== "undefined")
        {
            let tok = username + ':' + password;
            let hash = btoa(tok);
            xhttp.setRequestHeader('Authorization', "Basic " + hash);
        }
        // Prevent non-json responses
        if (typeof(json) === "undefined" || json) {
            xhttp.setRequestHeader("Content-Type", "application/json");
        }
        xhttp.send(JSON.stringify(data));
    });
}
