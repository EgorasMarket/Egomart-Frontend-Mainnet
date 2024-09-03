import { Outlet, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Web3ModalProvider from "./constants/Web3ModalProvider";
import useSocket from "./hooks/useSocket";

function App() {
  useSocket();
  return (
    <Web3ModalProvider>
      <Outlet />
    </Web3ModalProvider>
  );
}

export default App;
