import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store.js";
import { PersistGate } from "redux-persist/integration/react";
import Web3ModalProvider from "./constants/Web3ModalProvider";

import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootRoute from "./Routes/RootRoute.jsx";
import Exchange from "./Exchange/Exchange.jsx";
import ExchangeMarket from "./Exchange/ExchangePages/ExchangeMarket/ExchangeMarket";
import ExchangeTrade from "./Exchange/ExchangePages/ExchangeTrade/ExchangeTrade";
import ExchangePortfolio from "./Exchange/ExchangePages/ExchangePortfolio/ExchangePortfolio";
import Overview from "./Exchange/ExchangePages/ExchangePortfolio/Pages/Overview";
import Home from "./Pages/Home/Home";
import Earn from "./Exchange/ExchangePages/Earn/Earn";
import useSocket from "./hooks/useSocket.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootRoute />}>
        {" "}
        <Route path="" element={<Home />} />
      </Route>
      <Route path="/app" element={<Exchange />}>
        <Route path="market" element={<ExchangeMarket />} />
        <Route path="earn" element={<Earn />} />
        <Route path="portfolio" element={<ExchangePortfolio />}>
          <Route path="overview" element={<Overview />} />
        </Route>
        <Route path="trade/spot/" element={<ExchangeTrade />}>
          <Route path=":ticker" element={<ExchangeTrade />} />
        </Route>
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Web3ModalProvider>
          <RouterProvider router={router} />
        </Web3ModalProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
