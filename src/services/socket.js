import io from "socket.io-client";
import { BASE_URL } from "../core/core";

let socket;

export const initiateSocket = () => {
  try {
    if (!socket) {
      socket = io(BASE_URL, {});
      console.log(socket, "Web socket connected...");
    }
  } catch (err) {
    console.log(`An error occured ------ ${err}`);
  }
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};
export const subscribeToEvent = (event, cb) => {
  if (!socket) return true;
  socket.on(event, (msg) => {
    console.log("Websocket event received!", event, msg);
    return cb(null, msg);
  });
};

export const sendMessage = (event, data) => {
  if (socket) socket.emit(event, data);
};
