import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import PairsSlice from "../features/PairsSlice";
import OrderSlice from "../features/orders/OrderSlice";
import TradeSlice from "../features/trades/TradeSlice";
import createIndexedDBStorage from "redux-persist-indexeddb-storage";
import socketMiddleware from "../features/socket/socket.middleware";
import socketSlice from "../features/socket/socketSlice";
// import productSlice from "../features/products/productSlice";
// import offerSlice from "../features/Offers/offerSlice";
// import TradeSlice from "../features/Trades/TradeSlice";

const pairsConfig = {
  key: "pairs",
  storage: createIndexedDBStorage("exchange"),
};

const orderConfig = {
  key: "orders",
  storage: createIndexedDBStorage("exchange"),
};

const tradeConfig = {
  key: "trades",
  storage: createIndexedDBStorage("exchange"),
};

const persistPairs = persistReducer(pairsConfig, PairsSlice);
const persistOrders = persistReducer(orderConfig, OrderSlice);
const persistTrades = persistReducer(tradeConfig, TradeSlice);

// const persistedReducer = persistReducer(persistConfig, initSlice);
// const productPersisted = persistReducer(productConfig, productSlice);
// const persistOffer = persistReducer(offerConfig, offerSlice);

export const store = configureStore({
  reducer: {
    pairs: persistPairs,
    orders: persistOrders,
    trades: persistTrades,
    socket: socketSlice,
  },
  // devTools: false, // add this flag in production
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }).concat(socketMiddleware),
});

export const persistor = persistStore(store);
