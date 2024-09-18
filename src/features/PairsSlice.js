import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickers: [],
};

const TradeSlice = createSlice({
  name: "pairs",
  initialState,
  reducers: {
    setTickers: (state, action) => {
      state.tickers = action.payload;
    },

    pushTicker: (state, action) => {
      state.trades.push(action.payload);
    },

    updateTicker: (state, action) => {
      let pair = state.tickers.find(
        (tick) => tick.pair === action.payload.pair
      );
      let pairIndex = state.tickers.findIndex((tick) => tick.id === pair?.id);

      //  state.tickers[pairIndex]
      if (pairIndex !== -1) {
        state.tickers[pairIndex] = {
          ...state.tickers[pairIndex],
          ...action.payload.data,
        };
      }
    },
    updateTickerTwo: (state, action) => {
      let pair = state.tickers.find(
        (tick) => tick.pair === action.payload.pair
      );
      let pairIndex = state.tickers.findIndex((tick) => tick.id === pair?.id);

      //  state.tickers[pairIndex]
      if (pairIndex !== -1) {
        state.tickers[pairIndex] = {
          ...state.tickers[pairIndex],
          ...action.payload.data,
        };
      }
    },
    fetchTickerInfo: (state, action) => {
      // let awesome = state.tickers.filte((va) => va.pair !== action.payload);
    },
  },
});

export const {
  setTickers,
  pushTicker,
  fetchTickerInfo,
  updateTicker,
  updateTickerTwo,
} = TradeSlice.actions;

export default TradeSlice.reducer;
