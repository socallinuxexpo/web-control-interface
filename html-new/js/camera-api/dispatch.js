

const DISPATCH_CLOCK_INTERVAL = 300;

export class DispatchingQueue {
    constructor(camera) {
        this.queue = [];
        this.api = camera;
        setInterval(this.dispatch.bind(this), DISPATCH_CLOCK_INTERVAL);
    }

    enqueue(command, speed) {
        const cmdPair = [command, speed];
        const stopPair = [(command.indexOf("zoom") == 0)? "zoomStop" : "stop", undefined];
        this.queue.push(cmdPair);
        // Auto stop for continuous move commands
        if (["up", "down", "left", "right", "zoomIn", "zoomOut"].indexOf(command) != -1) {
            this.queue.push(stopPair);
        }
    }

    dispatch() {
        // Bail out early if the queue is empty
        if (this.queue.length == 0 || this.api.busy()) {
            return;
        }
        let commandPair = this.queue.shift();
        let callable = this.api[commandPair[0]].bind(this.api, () => {}, (error) => {console.error(error)});
        if (typeof(commandPair[1]) !== "undefined") {
            callable = this.api[commandPair[0]].bind(this.api, commandPair[1], () => {}, (error) => {console.error(error)});
        }
        callable();
    }
}