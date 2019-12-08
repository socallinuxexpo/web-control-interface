
import {camera} from "./config.js";
import {DispatchingQueue} from "./camera-api/dispatch.js";
import {PTZOpticsCamera} from "./camera-api/PTZOpticsCamera.js";

let caminst = null;
if (camera.type == "Samsung") {
    caminst = new SamsungCamera(camera.name, camera.control,
        camera.username, camera.password, false);
} else {
    caminst = new PTZOpticsCamera(camera.name, camera.control,
        camera.username, camera.password, false);
}
let dispatcher = new DispatchingQueue(caminst);
// Maps the camctrl UI functions to the camera instance functions below
export let camctrl = {
    up: dispatcher.enqueue.bind(dispatcher, "up", camera["tilt-speed"]),
    down: dispatcher.enqueue.bind(dispatcher, "down", camera["tilt-speed"]),
    left: dispatcher.enqueue.bind(dispatcher, "left", camera["pan-speed"]),
    right: dispatcher.enqueue.bind(dispatcher, "right", camera["pan-speed"]),
    zoomin: dispatcher.enqueue.bind(dispatcher, "zoomIn", camera["zoom-speed"]),
    zoomout: dispatcher.enqueue.bind(dispatcher, "zoomOut", camera["zoom-speed"]),
    sethome: dispatcher.enqueue.bind(dispatcher, "setHome"),
    returnhome: dispatcher.enqueue.bind(dispatcher, "moveToHome")
}