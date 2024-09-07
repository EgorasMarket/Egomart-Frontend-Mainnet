import { io } from "socket.io-client";
import { BASE_URL } from "../core/core";

// const SOCKET_URL = "http://your-server-url"; // Replace with your server URL
let socket;

export const initiateSocketConnection = () => {
  socket = io(BASE_URL);
  console.log("Socket connected:", socket);
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("Socket disconnected");
  }
};

export const subscribeToEvent = (eventName, callback) => {
  if (!socket) return;
  socket.on(eventName, callback);
};

export const emitEvent = (eventName, data) => {
  if (!socket) return;
  socket.emit(eventName, data);
};
