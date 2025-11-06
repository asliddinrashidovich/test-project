// socket.js
import { io } from "socket.io-client";

export const socket = io("http://138.68.100.215:3000", {
  transports: ["websocket"],
  autoConnect: false, // manual connect qilamiz
});
