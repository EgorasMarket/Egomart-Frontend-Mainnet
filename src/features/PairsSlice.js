import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickers: [],
};

const TradeSlice = createSlice({
  name: "pairs",
  initialState,
  reducers: {
    setTickers: (state, action) => {
      // const newArr = [...action.payload];
      // newArr.sort((a, b) => {
      //   return new Date(b.createdAt) - new Date(a.createdAt);
      // });
      state.tickers = action.payload;
    },

    pushTicker: (state, action) => {
      state.trades.push(action.payload);
    },
    fetchTickerInfo: (state, action) => {
      // let awesome = state.tickers.filte((va) => va.pair !== action.payload);
    },
  },
});

export const { setTickers, pushTicker, fetchTickerInfo } = TradeSlice.actions;

export default TradeSlice.reducer;
