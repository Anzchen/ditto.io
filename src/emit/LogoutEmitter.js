// emitter.js
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const LogoutEmitter = new MyEmitter();

module.exports = LogoutEmitter;
