import { io } from "socket.io-client";

export const studentSocket = io("http://138.68.100.215:3000", {
  transports: ["websocket"],
  autoConnect: false, // kerak bo‘lganda connect qilamiz
  reconnection: true,
});

export const teacherSocket = io("http://138.68.100.215:3000", {
  transports: ["websocket"],
  autoConnect: false, // kerak bo‘lganda connect qilamiz
  reconnection: true,
});
