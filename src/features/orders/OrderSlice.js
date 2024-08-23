import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // setTickers: (state, action) => {
    //   const newArr = [...action.payload];
    //   newArr.sort((a, b) => {
    //     return new Date(b.createdAt) - new Date(a.createdAt);
    //   });
    //   state.tickers = newArr;
    // },
    // pushTicker: (state, action) => {
    //   state.trades.push(action.payload);
    // },
  },
});

// export const { setTickers, pushTicker } = OrderSlice.actions;

export default OrderSlice.reducer;
