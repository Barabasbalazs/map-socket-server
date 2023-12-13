"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebSocketServer = void 0;
const socket_io_1 = require("socket.io");
const config_provider_1 = __importDefault(require("./config/config-provider"));
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
    io.on("connection", (socket) => {
        console.log("New connection: ", socket.id);
        socket.on("chat message", (msg) => {
            console.log("Message:", msg);
            io.emit("chat message", msg);
        });
        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
    return io;
}
exports.createWebSocketServer = createWebSocketServer;
//# sourceMappingURL=websocket.js.map