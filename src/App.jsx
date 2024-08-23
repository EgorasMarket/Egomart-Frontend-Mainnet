import { Outlet, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Web3ModalProvider from "./constants/Web3ModalProvider";

function App() {
  return (
    <Web3ModalProvider>
      <Outlet />
    </Web3ModalProvider>
  );
}

export default App;
