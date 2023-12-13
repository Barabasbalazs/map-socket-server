import { Server } from "socket.io";
import configProvider from "../config/config-provider";
import { Server as HttpServer } from "http";

const { clientUrl } = configProvider;

const webSocketCors = {
  origin: clientUrl,
  methods: ["GET", "POST"],
  allowHeaders: ["Content-Type", "Authorization"],
};

function createWebSocketServer(server: HttpServer) {
  console.log('creating websocket server, allowed origin: ', webSocketCors.origin);
  const io = new Server(server, {
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

export { createWebSocketServer };
