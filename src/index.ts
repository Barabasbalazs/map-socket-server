import express from "express";
import { createServer } from "http";
import morgan from "morgan";
import { createWebSocketServer } from "./websocket/server";
import configProvider from "./config/config-provider";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = createServer(app);

createWebSocketServer(server);

const { port } = configProvider;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});