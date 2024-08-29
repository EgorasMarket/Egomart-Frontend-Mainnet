import React from "react";
import { Outlet } from "react-router-dom";
import ExchangeFooter from "../Exchange/ExchangeFooter/ExchangeFooter";
import ExchangeHeader from "../Exchange/ExchangeHeader/ExchangeHeader";
import Web3ModalProvider from "../constants/Web3ModalProvider";
import NewHeader from "../Pages/Header/NewHeader";
import NewFooter from "../Pages/Footer/NewFooter";
const RootRoute = ({ children }) => {
  return (
    <div className="HomeDiv">
      <Web3ModalProvider>
        <NewHeader />
        {/* <div className="HomeBody"> */}
        <Outlet />
        {/* </div> */}
        <NewFooter />
      </Web3ModalProvider>
    </div>
  );
};
export default RootRoute;
