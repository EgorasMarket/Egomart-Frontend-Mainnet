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
        return b.id - a.id;
        // return new Date(b.createdAt) - new Date(a.createdAt);
      });
      state.trades = newArr;
    },

    updateTrade: (state, action) => {
      state.trades.unshift(action.payload);
    },

    changeTradeState: (state, action) => {
      let actualTrade = state.trades.find(
        (trade) =>
          trade.address === action.payload.address &&
          trade?.orderId === action.payload.orderId &&
          trade.type === action.payload.type &&
          trade.price === action.payload.price
      );
      console.log("actual trade object ", actualTrade);

      state.trades[actualTrade.id].status = "COMPLETED";
    },

    cancelTrade: (state, action) => {
      let actualTrade = state.trades.find(
        (trade) => trade.type === action.payload.type
      );

      if (actualTrade == undefined) {
        console.log("it  came here");
      } else {
        console.log(actualTrade.id, "actual trade ID");
        state.trades[actualTrade.id].status = "COMPLETED";
      }

      console.log("actual trade object ", actualTrade);
    },
  },
});

export const { setTrade, updateTrade, changeTradeState, cancelTrade } =
  TradeSlice.actions;

export default TradeSlice.reducer;

//   (trade.address === action.payload.type) === "BUY"
//     ? action.payload.seller
//     : action.payload.buyer &&
//       // trade?.orderId === action.payload.orderId &&
//       trade.type === action.payload.type &&
//       trade.price === action.payload.price
// // trade.amount === action.payload.amount
