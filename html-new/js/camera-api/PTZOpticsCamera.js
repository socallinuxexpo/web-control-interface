import {ajax} from "../auth.js"

export class PTZOpticsCamera {
    /**
    * Constructor for PTZOpticsCamera
    **/
    constructor(name, path, username, password, invertY) {
        this.name = name;
        this.url = path + "/cgi-bin/";
        this.invertY = invertY;
        this.username = username;
        this.password = password;
        this.lock = false;
    }

    busy() {
        return this.lock;
    }

    callApi(query, successCallback, errorCallback){
        let url = this.url + query;
        this.lock = true;
        ajax(url, undefined, false, this.username, this.password, 500)
            .then(
                (data) => {
                    this.lock = false;
                    successCallback(data);
                }).catch(
                (error) => {
                    this.lock = false;
                    errorCallback(error);
                });
    }

    up(tiltSpeed, successCallback, errorCallback) {
        if (this.invertY) {
            var query = "ptzctrl.cgi?ptzcmd&down&0&" + tiltSpeed;
        } else {
            var query = "ptzctrl.cgi?ptzcmd&up&0&" + tiltSpeed;
        }
        this.callApi(query, successCallback, errorCallback);
    }

    down(tiltSpeed, successCallback, errorCallback) {
        if (this.invertY) {
            var query = "ptzctrl.cgi?ptzcmd&up&0&" + tiltSpeed;
        } else {
            var query = "ptzctrl.cgi?ptzcmd&down&0&" + tiltSpeed;
        }
        this.callApi(query, successCallback, errorCallback);
    }

    left(panSpeed, successCallback, errorCallback) {
        if (this.invertY) {
            var query = "ptzctrl.cgi?ptzcmd&right&" + panSpeed + "&0";
        } else {
            var query = "ptzctrl.cgi?ptzcmd&left&" + panSpeed + "&0";
        }
        this.callApi(query, successCallback, errorCallback);
    }

    right(panSpeed, successCallback, errorCallback) {
        if (this.invertY) {
            var query = "ptzctrl.cgi?ptzcmd&left&" + panSpeed + "&0";
        } else {
            var query = "ptzctrl.cgi?ptzcmd&right&" + panSpeed + "&0";
        }
        this.callApi(query, successCallback, errorCallback);
    }

    stop(successCallback, errorCallback) {
        var query = "ptzctrl.cgi?ptzcmd&ptzstop&0&0";
        this.callApi(query, successCallback, errorCallback);
    }

    zoomIn(zoomSpeed, successCallback, errorCallback) {
        var query = "ptzctrl.cgi?ptzcmd&zoomin&" + zoomSpeed;
        this.callApi(query, successCallback, errorCallback);
    }

    zoomOut(zoomSpeed, successCallback, errorCallback) {
        var query = "ptzctrl.cgi?ptzcmd&zoomout&" + zoomSpeed;
        this.callApi(query, successCallback, errorCallback);
    }

    zoomStop(successCallback, errorCallback) {
        var query = "ptzctrl.cgi?ptzcmd&zoomstop&0";
        this.callApi(query, successCallback, errorCallback);
    }

    setHome(successCallback, errorCallback) {
        // elect position 0 to be home position by harding code
        var query = "ptzctrl.cgi?ptzcmd&posset&0";
        this.callApi(query, successCallback, errorCallback);
    };

    moveToHome(successCallback, errorCallback) {
        var query = "ptzctrl.cgi?ptzcmd&poscall&0";
        this.callApi(query, successCallback, errorCallback);
    };
}

