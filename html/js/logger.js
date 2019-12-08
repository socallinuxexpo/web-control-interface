/**
 * logger.js:
 *
 * Exports the logger interface for the system. This allows log messages to be handled before being routed out to the
 * console.
 *
 * @author lestarch, pelmini
 */
export let logger = {
    error: (msg) => { console.error("[LCARS-II ERROR] " + msg); },
    log: (msg) => { console.log("[LCARS-II INFO] " + msg); },
    info: (msg) => { console.log("[LCARS-II INFO] " + msg); }
};
