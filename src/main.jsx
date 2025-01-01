import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store.js";
import { PersistGate } from "redux-persist/integration/react";
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
import { MyWagmiProvider } from "./constants/WagmiProvider.jsx";
import Web3ModalProvider from "./constants/Web3ModalProvider.jsx";
import WhitePaper from "./Components/WhitePaper/WhitePaper.jsx";
import RoadMapItem from "./Components/RoadMapComponent/RoadMapItem.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootRoute />}>
        <Route path="" element={<Home />} />
        <Route path="whitepaper" element={<WhitePaper />} />
        <Route path="roadmap" element={<RoadMapItem />} />
      </Route>
      <Route path="/app" element={<Exchange />}>
        <Route path="market" element={<ExchangeMarket />} />
        <Route path="earn" element={<Earn />} />
        {/* <Route path="bond" element={<Bond />} /> */}
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
    <Web3ModalProvider>
      {/* <MyWagmiProvider> */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
      {/* </MyWagmiProvider> */}
    </Web3ModalProvider>
  </StrictMode>
);
