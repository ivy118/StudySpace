const { createServer } = require("http");
const { Server } = require("socket.io");

/* Initalize socket.io server  */
const socketPort = 8900;
// const httpServer = createServer(app);
const io = new Server(socketPort, { cors: { origin: "*" } });

module.exports = io;