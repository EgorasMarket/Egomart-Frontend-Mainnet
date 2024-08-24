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
  },
});

export const { setTrade, updateTrade } = TradeSlice.actions;

export default TradeSlice.reducer;
