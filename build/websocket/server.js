"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebSocketServer = void 0;
const socket_io_1 = require("socket.io");
const config_provider_1 = __importDefault(require("../config/config-provider"));
const { clientUrl } = config_provider_1.default;
const webSocketCors = {
    origin: clientUrl,
    methods: ["GET", "POST"],
    allowHeaders: ["Content-Type", "Authorization"],
};
function createWebSocketServer(server) {
    const io = new socket_io_1.Server(server, {
        cors: webSocketCors,
    });
    io.of("/markers").on("connection", (socket) => {
        console.log("New connection on /markers: ", socket.id);
        socket.on("track", (id) => {
            console.log("track", id); //do something with the id
        });
        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
    io.of("/updates").on("connection", (socket) => {
        console.log("New update connection", socket.id);
        socket.on("update-location", (data) => {
            console.log("update-location", data);
            io.of("/markers").emit("update-location", data);
        });
    });
    return io;
}
exports.createWebSocketServer = createWebSocketServer;
//# sourceMappingURL=server.js.map