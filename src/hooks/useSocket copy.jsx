import { useEffect, useRef } from "react";
import {
  initiateSocket,
  disconnectSocket,
  subscribeToEvent,
} from "../services/socket";

const useSocket = (event, cb) => {
  const isConnected = useRef(false);

  useEffect(() => {
    if (!isConnected.current) {
      initiateSocket();
      isConnected.current = true;
    }
    subscribeToEvent(event, cb);
    return () => {
      // disconnectSocket();
    };
  }, [event, cb]);
};

export default useSocket;
