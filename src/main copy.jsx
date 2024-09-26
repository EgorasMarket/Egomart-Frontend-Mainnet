import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store.js";
import { PersistGate } from "redux-persist/integration/react";
import Web3ModalProvider from "./constants/Web3ModalProvider.jsx";
import PortfolioOpenOrders from "./Exchange/ExchangePages/ExchangePortfolio/Pages/PortfolioOpenOrders.jsx";
import History from "./Exchange/ExchangePages/ExchangePortfolio/Pages/History.jsx";

import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootRoute from "./Routes/RootRoute.jsx";
import Exchange from "./Exchange/Exchange.jsx";
import ExchangeMarket from "./Exchange/ExchangePages/ExchangeMarket/ExchangeMarket.jsx";
import ExchangeTrade from "./Exchange/ExchangePages/ExchangeTrade/ExchangeTrade.jsx";
import ExchangePortfolio from "./Exchange/ExchangePages/ExchangePortfolio/ExchangePortfolio.jsx";
import Overview from "./Exchange/ExchangePages/ExchangePortfolio/Pages/Overview.jsx";
import Home from "./Pages/Home/Home.jsx";
import Earn from "./Exchange/ExchangePages/Earn/Earn.jsx";
import Bond from "./Exchange/ExchangePages/Bond/Bond.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {},
    queries: {},
  },
});
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
        <Route path="bond" element={<Bond />} />
        <Route path="portfolio" element={<ExchangePortfolio />}>
          <Route path="overview" element={<Overview />} />
          <Route path="openOrder" element={<PortfolioOpenOrders />} />
          <Route path="history" element={<History />} />
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
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </Web3ModalProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
