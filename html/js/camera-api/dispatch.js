
const STARCH = "I-AM-STARCH!!!!!!!!";

export class DispatchingQueue {
    constructor(camera, config) {
        this.queue = [];
        this.api = camera;
        this.config =  config;
        setInterval(this.dispatch.bind(this), (Number.isInteger(config["steptime"]) ? config["steptime"] : 50));
    }

    enqueue(command, speed) {
        const cmdPair = [command, speed];
        const noopPair = [STARCH, 0];
        const stopPair = [(command.indexOf("zoom") == 0) ? "zoomStop" : "stop", undefined];
        this.queue.push(cmdPair);
        let noops = 0;
        if (command == "up" || command == "down") {
             noops = this.config["tilt-delay"];
	}
        else if (command == "left" || command == "right") {
             noops = this.config["pan-delay"];  // With David Bowie?
	}
        else if (command == "zoomIn" || command == "zoomOut") {
             noops = this.config["zoom-delay"];
	}
        // Insert noops after command
        console.log("Noops:", noops);
        for (let i = 0; i < (Number.isInteger(noops) ? noops : 0); i++) {
             this.queue.push(noopPair);
        }

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
        if (commandPair[0] == STARCH ) {
            console.log("EXIT");
            return;
	}
        let callable = this.api[commandPair[0]].bind(this.api, () => {}, (error) => {console.error(error)});
        if (typeof(commandPair[1]) !== "undefined") {
            callable = this.api[commandPair[0]].bind(this.api, commandPair[1], () => {}, (error) => {console.error(error)});
        }
        callable();
    }
}
