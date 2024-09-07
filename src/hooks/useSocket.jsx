// src/hooks/useSocket.js
import { useEffect } from "react";
import { subscribeToEvent } from "../services/socket";

const useSocket = (eventName, callback) => {
  useEffect(() => {
    subscribeToEvent(eventName, callback);
  }, [eventName, callback]);
};

export default useSocket;
