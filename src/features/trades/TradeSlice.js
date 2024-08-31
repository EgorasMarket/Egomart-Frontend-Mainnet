import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trades: [],
};

const TradeSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    setTrade: (state, action) => {
      const newArr = [...action.payload];
      newArr.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      state.trades = newArr;
    },

    updateTrade: (state, action) => {
      state.trades.push(action.payload);
    },

    changeTradeState: (state, action) => {
      const actualTrade = state.trades.filter(
        (trade) =>
          trade.address === action.payload.address &&
          trade?.orderId === action.payload.orderId &&
          trade.type === action.payload.type &&
          trade.price === action.payload.price &&
          trade.amount === action.payload.amount
      );
      console.log("actual trade object ", actualTrade);
    },

    cancelTrade: (state, action) => {
      const actualTrade = state.trades.find(
        (trade) =>
          trade.address === action.payload.address &&
          trade?.orderId === parseInt(action.payload.orderId) &&
          trade.type === action.payload.type &&
          trade.price === action.payload.price &&
          trade.amount === action.payload.amount
      );

      console.log("actual trade object ", actualTrade);
    },
  },
});

export const { setTrade, updateTrade, changeTradeState, cancelTrade } =
  TradeSlice.actions;

export default TradeSlice.reducer;
